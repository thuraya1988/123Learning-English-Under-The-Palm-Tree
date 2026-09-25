create table if not exists public.multaqa_homework (
  id uuid primary key default gen_random_uuid(),
  class_name text not null,
  subject text,
  description text not null,
  homework_date date not null default current_date,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  created_at timestamptz not null default now()
);

create index if not exists idx_homework_class_date
  on public.multaqa_homework (class_name, homework_date desc);

alter table public.multaqa_homework enable row level security;
revoke all on public.multaqa_homework from anon, authenticated;
