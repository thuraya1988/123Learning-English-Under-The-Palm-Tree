create table if not exists public.multaqa_student_badges (
  id uuid primary key default gen_random_uuid(),
  student_school_id text not null,
  student_name text not null,
  class_name text not null,
  badge_key text not null,
  badge_label text not null,
  note text,
  awarded_by_employee_id text not null references public.multaqa_employees(employee_id),
  awarded_at timestamptz not null default now()
);

create index if not exists idx_student_badges_student
  on public.multaqa_student_badges (student_school_id, awarded_at desc);
create index if not exists idx_student_badges_class
  on public.multaqa_student_badges (class_name, awarded_at desc);

alter table public.multaqa_student_badges enable row level security;
revoke all on public.multaqa_student_badges from anon, authenticated;
