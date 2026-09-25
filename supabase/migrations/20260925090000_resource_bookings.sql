create table if not exists public.multaqa_resource_bookings (
  id uuid primary key default gen_random_uuid(),
  resource_key text not null,
  resource_label text not null,
  booking_date date not null,
  period smallint not null check (period between 1 and 7),
  note text,
  booked_by_employee_id text not null references public.multaqa_employees(employee_id) on delete cascade,
  notified_to text,
  created_at timestamptz not null default now(),
  unique(resource_key, booking_date, period)
);

create index if not exists idx_resource_bookings_date
  on public.multaqa_resource_bookings (booking_date, resource_key);

alter table public.multaqa_resource_bookings enable row level security;
revoke all on public.multaqa_resource_bookings from anon, authenticated;
