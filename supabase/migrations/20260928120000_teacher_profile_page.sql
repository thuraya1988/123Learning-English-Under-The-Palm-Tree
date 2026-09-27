begin;

alter table public.multaqa_teacher_projects drop constraint if exists multaqa_teacher_projects_project_type_check;
alter table public.multaqa_teacher_projects add constraint multaqa_teacher_projects_project_type_check
  check (project_type in ('school','students','initiative','competition'));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('teacher-profile-files','teacher-profile-files',false,10485760,array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set
  public=false,
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;

create table if not exists public.multaqa_teacher_profile_media (
  id uuid primary key default gen_random_uuid(),
  employee_id text not null references public.multaqa_employees(employee_id) on delete cascade,
  media_type text not null check (media_type in ('certificate','workshop','gallery')),
  title text,
  year smallint,
  storage_path text not null,
  sort_order bigint not null default 0,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  created_at timestamptz not null default now()
);
create index if not exists idx_teacher_profile_media_employee
  on public.multaqa_teacher_profile_media (employee_id, media_type, created_at desc);
alter table public.multaqa_teacher_profile_media enable row level security;
revoke all on public.multaqa_teacher_profile_media from anon, authenticated;

create table if not exists public.multaqa_teacher_profile_notes (
  id uuid primary key default gen_random_uuid(),
  employee_id text not null references public.multaqa_employees(employee_id) on delete cascade,
  note_type text not null check (note_type in ('top_student','needs_plan','note')),
  title text,
  body text,
  sort_order bigint not null default 0,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists idx_teacher_profile_notes_employee
  on public.multaqa_teacher_profile_notes (employee_id, note_type, created_at desc);
alter table public.multaqa_teacher_profile_notes enable row level security;
revoke all on public.multaqa_teacher_profile_notes from anon, authenticated;

create table if not exists public.multaqa_teacher_ijada_goals (
  id uuid primary key default gen_random_uuid(),
  employee_id text not null references public.multaqa_employees(employee_id) on delete cascade,
  domain text not null,
  unit text,
  goal_text text not null,
  status text not null default 'planned' check (status in ('planned','in_progress','done')),
  note text,
  attachment_path text,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists idx_teacher_ijada_goals_employee
  on public.multaqa_teacher_ijada_goals (employee_id, domain, created_at desc);
alter table public.multaqa_teacher_ijada_goals enable row level security;
revoke all on public.multaqa_teacher_ijada_goals from anon, authenticated;

commit;
