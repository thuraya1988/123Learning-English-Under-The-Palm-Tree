create table if not exists public.multaqa_equipment_inventory (
  id uuid primary key default gen_random_uuid(),
  item_name text not null,
  category text,
  resource_key text,
  total_qty integer not null default 1 check (total_qty >= 0),
  working_qty integer not null default 1 check (working_qty >= 0),
  damaged_qty integer not null default 0 check (damaged_qty >= 0),
  notes text,
  updated_by_employee_id text not null references public.multaqa_employees(employee_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_equipment_category
  on public.multaqa_equipment_inventory (category);

alter table public.multaqa_equipment_inventory enable row level security;
revoke all on public.multaqa_equipment_inventory from anon, authenticated;
