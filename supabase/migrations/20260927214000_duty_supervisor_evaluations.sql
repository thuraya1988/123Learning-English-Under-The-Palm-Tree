
alter table public.multaqa_duty_evaluations
  add column if not exists evaluated_by_employee_id text references public.multaqa_employees(employee_id) on update cascade on delete set null,
  add column if not exists evaluated_by_name text,
  add column if not exists evaluated_at timestamptz,
  add column if not exists evaluation_source text not null default 'self'
    check (evaluation_source in ('self','supervisor'));

comment on table public.multaqa_duty_evaluations is
  'Duty evaluation. Official supervisor evaluations are saved through the secure staff endpoint; legacy self-evaluations remain distinguishable by evaluation_source.';
