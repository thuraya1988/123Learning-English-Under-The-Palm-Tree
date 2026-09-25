create table if not exists public.multaqa_lost_found (
  id uuid primary key default gen_random_uuid(),
  item_desc text not null,
  found_location text,
  photo_path text,
  status text not null default 'open' check (status in ('open','claimed')),
  claimed_by text,
  claimed_at timestamptz,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  created_at timestamptz not null default now()
);

create index if not exists idx_lost_found_status
  on public.multaqa_lost_found (status, created_at desc);

alter table public.multaqa_lost_found enable row level security;
revoke all on public.multaqa_lost_found from anon, authenticated;

insert into storage.buckets (id, name, public)
values ('lost-found-photos', 'lost-found-photos', false)
on conflict (id) do nothing;
