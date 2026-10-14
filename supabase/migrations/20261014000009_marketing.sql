-- 유입 경로·방문 집계 (개인 식별 정보 없음)
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  visitor text,            -- 브라우저에 저장한 무작위 번호 (개인 정보 아님)
  path text,
  src text,                -- 처음 들어온 경로(utm_source 또는 referrer 도메인)
  medium text,
  campaign text,
  is_member boolean default false,
  created_at timestamptz not null default now()
);
create index if not exists page_views_time on public.page_views (created_at desc);
alter table public.page_views enable row level security;
create policy "누구나 방문 기록 남기기" on public.page_views for insert to anon, authenticated with check (length(coalesce(path,'')) < 200 and length(coalesce(src,'')) < 100);
revoke select, update, delete on public.page_views from anon, authenticated;

alter table public.profiles add column if not exists signup_src text;
alter table public.profiles add column if not exists signup_campaign text;
alter table public.profiles add column if not exists agreed_at timestamptz;

-- 운영자용 요약 (DB 비밀번호로만 조회: select * from public.mkt_summary;)
create or replace view public.mkt_summary as
select date_trunc('day', created_at at time zone 'Asia/Seoul')::date as day,
       count(distinct visitor) as visitors, count(*) as views,
       count(distinct visitor) filter (where is_member) as member_visitors
from public.page_views group by 1 order by 1 desc;
revoke all on public.mkt_summary from anon, authenticated;
