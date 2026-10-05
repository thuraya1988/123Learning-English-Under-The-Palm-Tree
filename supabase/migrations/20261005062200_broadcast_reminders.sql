alter table public.multaqa_broadcasts add column if not exists deleted_at timestamptz;
create table if not exists public.multaqa_attendance_reminder_runs (
 reminder_date date not null,
 reminder_stage text not null,
 created_at timestamptz not null default now(),
 primary key(reminder_date,reminder_stage)
);
alter table public.multaqa_attendance_reminder_runs enable row level security;
