-- 뚝딱랩 데이터베이스 구조
create table if not exists public.activities (
  id bigint generated always as identity primary key,
  slug text unique not null,
  subject text not null check (subject in ('과학','수학','영어')),
  band text not null check (band in ('3~4','5~6')),
  topic text not null,
  title text not null,
  summary text,
  difficulty text,
  duration text,
  caution text[] default '{}',
  tags text[] default '{}',
  hero_image text,
  hero_is_doc boolean default false,
  template_pdf text,
  content jsonb not null default '[]'::jsonb,
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists public.topics (
  id bigint generated always as identity primary key,
  band text not null check (band in ('3~4','5~6')),
  subject text not null check (subject in ('과학','수학','영어')),
  name text not null,
  sort_order int default 0,
  activity_slug text references public.activities(slug) on update cascade on delete set null
);
create table if not exists public.kits (
  id bigint generated always as identity primary key,
  name text not null,
  activity_slug text references public.activities(slug) on update cascade on delete set null,
  parts jsonb default '[]'::jsonb,
  price int,
  buy_url text,
  status text default 'planned' check (status in ('planned','affiliate','own','hidden')),
  created_at timestamptz default now()
);
alter table public.activities enable row level security;
alter table public.topics enable row level security;
alter table public.kits enable row level security;
create policy "누구나 공개 활동 읽기" on public.activities for select using (published);
create policy "누구나 진도표 읽기" on public.topics for select using (true);
create policy "누구나 키트 읽기" on public.kits for select using (status <> 'hidden');
