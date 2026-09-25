create table if not exists public.multaqa_meeting_slots (
  id uuid primary key default gen_random_uuid(),
  employee_id text not null references public.multaqa_employees(employee_id) on delete cascade,
  slot_date date not null,
  slot_time text not null,
  status text not null default 'open' check (status in ('open','booked','cancelled')),
  booked_student_school_id text,
  booked_student_name text,
  booked_guardian_phone text,
  note text,
  created_at timestamptz not null default now(),
  unique(employee_id, slot_date, slot_time)
);

create index if not exists idx_meeting_slots_employee
  on public.multaqa_meeting_slots (employee_id, slot_date, slot_time);

alter table public.multaqa_meeting_slots enable row level security;
revoke all on public.multaqa_meeting_slots from anon, authenticated;
