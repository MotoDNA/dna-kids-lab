-- 학습 포인트와 부모님 보상 약속
-- 포인트는 따로 저장하지 않고, 학습 기록(study_logs)으로 서버에서 계산한다.
-- 날짜는 한국 시간 기준. 하루 최대 100점(연속 출석 보너스는 따로).

create or replace function public.points_daily(uid uuid)
returns table(d date, base int, att int, lesson int, quiz int, activity int, gk int, typing int)
language sql stable security definer set search_path = public as $$
  with l as (
    select kind, ref, score, total, duration_sec,
           (started_at at time zone 'Asia/Seoul')::date as d
    from public.study_logs where user_id = uid
  ),
  att as (select d, 2 as p from l where kind = 'session' group by d),
  les as (select d, count(distinct ref) * 10 as p from l where kind = 'lesson' and duration_sec >= 60 group by d),
  qz as (
    select d, sum(p) as p from (
      select d, ref, max(coalesce(score, 0) + case when total > 0 and score >= total then 5 else 0 end) as p
      from l where kind = 'quiz' group by d, ref
    ) x group by d
  ),
  act as (select d, count(distinct ref) * 15 as p from l where kind = 'activity' and duration_sec >= 90 group by d),
  gkq as (
    select d, sum(p) as p from (
      select d, ref, max(5 + case when score >= total then 3 else 0 end) as p
      from l where kind = 'gk' and total > 0 and score is not null group by d, ref
    ) x group by d
  ),
  gkt as (select d, 5 as p from l where kind = 'gk' and score is null group by d having sum(duration_sec) >= 120),
  ty as (select d, least(count(*), 3) * 5 as p from l where kind = 'typing' and ref <> 'typing' group by d),
  days as (select distinct d from l)
  select days.d,
         least(100, coalesce(att.p,0) + coalesce(les.p,0) + coalesce(qz.p,0) + coalesce(act.p,0) + coalesce(gkq.p,0) + coalesce(gkt.p,0) + coalesce(ty.p,0))::int,
         coalesce(att.p,0)::int, coalesce(les.p,0)::int, coalesce(qz.p,0)::int, coalesce(act.p,0)::int,
         (coalesce(gkq.p,0) + coalesce(gkt.p,0))::int, coalesce(ty.p,0)::int
  from days
  left join att on att.d = days.d left join les on les.d = days.d left join qz on qz.d = days.d
  left join act on act.d = days.d left join gkq on gkq.d = days.d left join gkt on gkt.d = days.d
  left join ty on ty.d = days.d;
$$;
revoke execute on function public.points_daily(uuid) from public, anon, authenticated;

-- 내 포인트 요약: 합계, 오늘, 연속 출석, 최근 14일
create or replace function public.my_points() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  today date := (now() at time zone 'Asia/Seoul')::date;
  res jsonb;
begin
  if uid is null then return null; end if;
  with dd as (select * from public.points_daily(uid)),
  a as (select d from dd where att > 0),
  g as (select d, d - (row_number() over (order by d))::int as grp from a),
  s as (select d, row_number() over (partition by grp order by d) as streak from g),
  b as (
    select dd.*, coalesce(s.streak, 0) as streak,
           case when s.streak > 0 and s.streak % 7 = 0 then 20 when s.streak > 0 and s.streak % 3 = 0 then 5 else 0 end as bonus
    from dd left join s on s.d = dd.d
  )
  select jsonb_build_object(
    'total', coalesce(sum(base + bonus), 0),
    'today', coalesce(sum(base + bonus) filter (where d = today), 0),
    'today_base', coalesce(sum(base) filter (where d = today), 0),
    'cap', 100,
    'streak', coalesce((select streak from b where d = today), (select streak from b where d = today - 1), 0),
    'days', coalesce((select jsonb_agg(jsonb_build_object('d', d, 'p', base + bonus, 'bonus', bonus, 'att', att, 'lesson', lesson, 'quiz', quiz, 'activity', activity, 'gk', gk, 'typing', typing) order by d)
                      from b where d > today - 14), '[]'::jsonb)
  ) into res from b;
  return res;
end $$;
revoke execute on function public.my_points() from public, anon;
grant execute on function public.my_points() to authenticated;

-- 부모님 보상 약속
create table if not exists public.reward_goals (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 40),
  target int not null check (target between 10 and 100000),
  start_total int not null default 0,
  created_at timestamptz not null default now(),
  claimed_at timestamptz
);
create index if not exists reward_goals_user on public.reward_goals (user_id, created_at desc);
alter table public.reward_goals enable row level security;
drop policy if exists "내 보상 약속 읽기" on public.reward_goals;
create policy "내 보상 약속 읽기" on public.reward_goals for select using (auth.uid() = user_id);
revoke insert, update, delete on public.reward_goals from anon, authenticated;
revoke all on public.reward_goals from anon;

-- 부모님 비밀번호가 틀려도 오류를 내지 않고 결과 글자를 돌려준다
-- (오류를 내면 틀린 횟수 기록까지 취소되므로). 결과: ok, wrong, locked, none, limit
create or replace function public.reward_add(pin text, p_title text, p_target int) returns text
language plpgsql security definer set search_path = public as $$
declare v text; t int;
begin
  if auth.uid() is null then return 'login'; end if;
  v := public.verify_parent_pin(pin); if v <> 'ok' then return v; end if;
  if (select count(*) from public.reward_goals where user_id = auth.uid() and claimed_at is null) >= 10 then return 'limit'; end if;
  t := coalesce((public.my_points() ->> 'total')::int, 0);
  insert into public.reward_goals(user_id, title, target, start_total) values (auth.uid(), trim(p_title), p_target, t);
  return 'ok';
end $$;

create or replace function public.reward_claim(pin text, p_id bigint) returns text
language plpgsql security definer set search_path = public as $$
declare v text;
begin
  v := public.verify_parent_pin(pin); if v <> 'ok' then return v; end if;
  update public.reward_goals set claimed_at = now() where id = p_id and user_id = auth.uid() and claimed_at is null;
  return 'ok';
end $$;

create or replace function public.reward_delete(pin text, p_id bigint) returns text
language plpgsql security definer set search_path = public as $$
declare v text;
begin
  v := public.verify_parent_pin(pin); if v <> 'ok' then return v; end if;
  delete from public.reward_goals where id = p_id and user_id = auth.uid();
  return 'ok';
end $$;

revoke execute on function public.reward_add(text, text, int) from public, anon;
revoke execute on function public.reward_claim(text, bigint) from public, anon;
revoke execute on function public.reward_delete(text, bigint) from public, anon;
grant execute on function public.reward_add(text, text, int) to authenticated;
grant execute on function public.reward_claim(text, bigint) to authenticated;
grant execute on function public.reward_delete(text, bigint) to authenticated;
