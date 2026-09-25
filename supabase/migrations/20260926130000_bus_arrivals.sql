create table if not exists public.multaqa_bus_arrivals (
  id uuid primary key default gen_random_uuid(),
  route_name text not null,
  arrival_date date not null default current_date,
  arrived_at timestamptz not null default now(),
  recorded_by_employee_id text not null references public.multaqa_employees(employee_id),
  unique(route_name, arrival_date)
);

alter table public.multaqa_bus_arrivals enable row level security;
revoke all on public.multaqa_bus_arrivals from anon, authenticated;
