
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
