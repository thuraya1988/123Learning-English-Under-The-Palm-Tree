create table if not exists public.multaqa_meeting_minutes (
  id uuid primary key default gen_random_uuid(),
  meeting_date date not null,
  title text not null,
  decisions text,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  created_at timestamptz not null default now()
);

create table if not exists public.multaqa_meeting_tasks (
  id uuid primary key default gen_random_uuid(),
  minutes_id uuid not null references public.multaqa_meeting_minutes(id) on delete cascade,
  task text not null,
  assignee_employee_id text references public.multaqa_employees(employee_id),
  assignee_name text,
  due_date date,
  done boolean not null default false,
  reminder_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_meeting_minutes_date
  on public.multaqa_meeting_minutes (meeting_date desc);
create index if not exists idx_meeting_tasks_assignee
  on public.multaqa_meeting_tasks (assignee_employee_id, done);
create index if not exists idx_meeting_tasks_minutes
  on public.multaqa_meeting_tasks (minutes_id);

alter table public.multaqa_meeting_minutes enable row level security;
alter table public.multaqa_meeting_tasks enable row level security;
revoke all on public.multaqa_meeting_minutes from anon, authenticated;
revoke all on public.multaqa_meeting_tasks from anon, authenticated;
