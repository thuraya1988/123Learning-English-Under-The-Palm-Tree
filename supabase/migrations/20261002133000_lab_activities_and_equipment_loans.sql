
create table if not exists public.multaqa_lab_activities (
  id uuid primary key default gen_random_uuid(),
  activity_type text not null default 'activity' check (activity_type in ('activity','initiative')),
  title text not null,
  activity_date date not null default ((now() at time zone 'Asia/Muscat')::date),
  description text,
  participants text,
  outcomes text,
  photo_path text,
  created_by_employee_id text not null references public.multaqa_employees(employee_id) on update cascade on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_multaqa_lab_activities_date on public.multaqa_lab_activities(activity_date desc);
alter table public.multaqa_lab_activities enable row level security;
revoke all on public.multaqa_lab_activities from anon, authenticated;

create table if not exists public.multaqa_lab_loans (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.multaqa_equipment_inventory(id) on update cascade on delete restrict,
  borrower_employee_id text not null references public.multaqa_employees(employee_id) on update cascade on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  purpose text,
  due_at date not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected','returned','cancelled')),
  admin_note text,
  approved_by_employee_id text references public.multaqa_employees(employee_id) on update cascade on delete set null,
  approved_at timestamptz,
  returned_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_multaqa_lab_loans_item_status on public.multaqa_lab_loans(item_id,status);
create index if not exists idx_multaqa_lab_loans_borrower on public.multaqa_lab_loans(borrower_employee_id,created_at desc);
alter table public.multaqa_lab_loans enable row level security;
revoke all on public.multaqa_lab_loans from anon, authenticated;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('lab-media','lab-media',false,15728640,array['image/jpeg','image/png','image/webp']::text[])
on conflict (id) do update set
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;
