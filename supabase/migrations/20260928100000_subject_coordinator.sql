begin;

alter table public.multaqa_employee_profiles
  add column if not exists is_coordinator boolean not null default false;

commit;
