-- 가족 계정, 부모님 비밀번호, 학습 기록
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  login_id text unique not null,
  child_name text not null,
  band text check (band in ('3~4','5~6')),
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "내 프로필 읽기" on public.profiles for select using (auth.uid() = user_id);
create policy "내 프로필 만들기" on public.profiles for insert with check (auth.uid() = user_id);
create policy "내 프로필 고치기" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 부모님 비밀번호: 정책이 없어서 앱에서 직접 읽을 수 없고, 아래 함수로만 확인한다.
create table if not exists public.parent_pins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  pin_hash text not null,
  fail_count int not null default 0,
  locked_until timestamptz,
  updated_at timestamptz default now()
);
alter table public.parent_pins enable row level security;
revoke all on public.parent_pins from anon, authenticated;

create or replace function public.has_parent_pin() returns boolean
language sql security definer set search_path = public, extensions as $$
  select exists(select 1 from public.parent_pins where user_id = auth.uid());
$$;

create or replace function public.set_parent_pin(new_pin text, old_pin text default null) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
declare h text;
begin
  if auth.uid() is null then raise exception '로그인이 필요해요'; end if;
  if new_pin !~ '^[0-9]{4,6}$' then raise exception '부모님 비밀번호는 숫자 4~6자리로 정해 주세요'; end if;
  select pin_hash into h from public.parent_pins where user_id = auth.uid();
  if h is not null and (old_pin is null or extensions.crypt(old_pin, h) <> h) then return false; end if;
  insert into public.parent_pins(user_id, pin_hash) values (auth.uid(), extensions.crypt(new_pin, extensions.gen_salt('bf')))
  on conflict (user_id) do update set pin_hash = excluded.pin_hash, fail_count = 0, locked_until = null, updated_at = now();
  return true;
end $$;

-- 5번 틀리면 10분 동안 잠김
create or replace function public.verify_parent_pin(pin text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare r public.parent_pins%rowtype;
begin
  if auth.uid() is null then return 'login'; end if;
  select * into r from public.parent_pins where user_id = auth.uid();
  if not found then return 'none'; end if;
  if r.locked_until is not null and r.locked_until > now() then return 'locked'; end if;
  if extensions.crypt(pin, r.pin_hash) = r.pin_hash then
    update public.parent_pins set fail_count = 0, locked_until = null where user_id = auth.uid();
    return 'ok';
  end if;
  update public.parent_pins
     set fail_count = case when r.fail_count + 1 >= 5 then 0 else r.fail_count + 1 end,
         locked_until = case when r.fail_count + 1 >= 5 then now() + interval '10 minutes' else null end
   where user_id = auth.uid();
  return case when r.fail_count + 1 >= 5 then 'locked' else 'wrong' end;
end $$;

revoke execute on function public.has_parent_pin() from anon;
revoke execute on function public.set_parent_pin(text, text) from anon;
revoke execute on function public.verify_parent_pin(text) from anon;
grant execute on function public.has_parent_pin() to authenticated;
grant execute on function public.set_parent_pin(text, text) to authenticated;
grant execute on function public.verify_parent_pin(text) to authenticated;

create table if not exists public.study_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind text not null check (kind in ('session','lesson','quiz','activity','typing')),
  ref text,
  title text,
  score int,
  total int,
  detail jsonb default '{}'::jsonb,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_sec int not null default 0
);
create index if not exists study_logs_user_time on public.study_logs (user_id, started_at desc);
alter table public.study_logs enable row level security;
create policy "내 기록 읽기" on public.study_logs for select using (auth.uid() = user_id);
create policy "내 기록 남기기" on public.study_logs for insert with check (auth.uid() = user_id);
create policy "내 기록 시간 고치기" on public.study_logs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
revoke all on public.study_logs from anon;
revoke all on public.profiles from anon;
