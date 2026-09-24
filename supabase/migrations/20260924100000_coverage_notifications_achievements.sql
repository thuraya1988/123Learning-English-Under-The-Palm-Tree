
alter table public.multaqa_employee_profiles
  add column if not exists work_email text,
  add column if not exists phone text,
  add column if not exists contact_phone text,
  add column if not exists class_labels text[] not null default '{}',
  add column if not exists achievements text[] not null default '{}';

alter table public.multaqa_substitute_assignments
  add column if not exists notified_at timestamptz,
  add column if not exists reminder_sent_at timestamptz,
  add column if not exists completed_at timestamptz,
  add column if not exists achievement_recorded_at timestamptz;

create index if not exists idx_multaqa_coverage_reminders
  on public.multaqa_substitute_assignments (coverage_date, reminder_sent_at)
  where replacement_employee_id is not null
    and status in ('assigned','accepted');

create index if not exists idx_multaqa_coverage_achievements
  on public.multaqa_substitute_assignments (coverage_date, achievement_recorded_at)
  where replacement_employee_id is not null
    and status in ('assigned','accepted','completed');


create table if not exists public.multaqa_teacher_projects (
  id uuid primary key default gen_random_uuid(),
  employee_id text not null references public.multaqa_employees(employee_id) on delete cascade,
  title text not null,
  project_type text not null default 'school' check (project_type in ('school','students','initiative')),
  description text,
  status text not null default 'active' check (status in ('planned','active','completed','paused')),
  start_date date,
  end_date date,
  achievements text,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists idx_teacher_projects_employee on public.multaqa_teacher_projects(employee_id, created_at desc);
alter table public.multaqa_teacher_projects enable row level security;
revoke all on public.multaqa_teacher_projects from anon, authenticated;
