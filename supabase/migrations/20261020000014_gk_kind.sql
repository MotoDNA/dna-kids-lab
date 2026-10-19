-- 상식 놀이터 기록 허용
alter table public.study_logs drop constraint if exists study_logs_kind_check;
alter table public.study_logs add constraint study_logs_kind_check check (kind in ('session','lesson','quiz','activity','typing','gk'));
