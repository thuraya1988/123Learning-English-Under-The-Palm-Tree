alter table public.multaqa_class_observations
  add column if not exists notified_employee_id text references public.multaqa_employees(employee_id) on delete set null,
  add column if not exists acknowledged_at timestamptz,
  add column if not exists acknowledged_by_employee_id text references public.multaqa_employees(employee_id) on delete set null;

create index if not exists idx_class_observations_notified
  on public.multaqa_class_observations (notified_employee_id, acknowledged_at);
