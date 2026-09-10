begin;

create table if not exists public.multaqa_broadcasts (
  id uuid primary key default gen_random_uuid(),
  broadcast_date date not null default ((now() at time zone 'Asia/Muscat')::date),
  title text not null check (char_length(title) between 2 and 220),
  teacher_employee_id text references public.multaqa_employees(employee_id) on update cascade on delete set null,
  participants text[] not null default '{}',
  event_status text not null default 'planned' check (event_status in ('planned','live','completed','cancelled')),
  video_path text,
  rating smallint check (rating between 1 and 5),
  evaluation_note text,
  created_by_employee_id text not null references public.multaqa_employees(employee_id) on update cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists multaqa_broadcasts_date_idx
  on public.multaqa_broadcasts (broadcast_date desc, created_at desc);
create index if not exists multaqa_broadcasts_teacher_idx
  on public.multaqa_broadcasts (teacher_employee_id);
create index if not exists multaqa_broadcasts_created_by_idx
  on public.multaqa_broadcasts (created_by_employee_id);

alter table public.multaqa_broadcasts enable row level security;
revoke all on public.multaqa_broadcasts from anon, authenticated;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'school-broadcasts',
  'school-broadcasts',
  false,
  262144000,
  array['video/webm','video/mp4','video/quicktime']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

commit;
