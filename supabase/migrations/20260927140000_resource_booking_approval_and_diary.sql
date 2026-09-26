alter table public.multaqa_resource_bookings
  add column if not exists status text not null default 'confirmed' check (status in ('pending','confirmed'));

create table if not exists public.multaqa_resource_diary (
  id uuid primary key default gen_random_uuid(),
  resource_key text not null,
  caption text not null,
  photo_path text,
  media_url text,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  created_at timestamptz not null default now()
);

create index if not exists idx_resource_diary_key
  on public.multaqa_resource_diary (resource_key, created_at desc);

alter table public.multaqa_resource_diary enable row level security;
revoke all on public.multaqa_resource_diary from anon, authenticated;

insert into storage.buckets (id, name, public)
values ('resource-diary-media', 'resource-diary-media', false)
on conflict (id) do nothing;
