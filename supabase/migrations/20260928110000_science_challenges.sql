begin;

create table if not exists public.multaqa_science_challenges (
  id bigint primary key,
  kind text not null check (kind in ('quiz','lab')),
  level smallint,
  title text not null,
  subject text,
  tools text,
  materials text,
  steps text,
  questions jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  sort_order bigint not null default 0,
  created_by_employee_id text references public.multaqa_employees(employee_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_science_challenges_kind
  on public.multaqa_science_challenges (kind, published, sort_order);

alter table public.multaqa_science_challenges enable row level security;
revoke all on public.multaqa_science_challenges from anon, authenticated;

create table if not exists public.multaqa_science_attempts (
  id bigint primary key,
  challenge_id bigint not null references public.multaqa_science_challenges(id) on delete cascade,
  student_school_id text not null,
  student_name text not null,
  class_name text,
  score smallint not null default 0,
  total smallint not null default 0,
  passed boolean not null default false,
  submitted_at timestamptz not null default now()
);

create index if not exists idx_science_attempts_student
  on public.multaqa_science_attempts (student_school_id, challenge_id);
create index if not exists idx_science_attempts_challenge
  on public.multaqa_science_attempts (challenge_id);

alter table public.multaqa_science_attempts enable row level security;
revoke all on public.multaqa_science_attempts from anon, authenticated;

commit;
