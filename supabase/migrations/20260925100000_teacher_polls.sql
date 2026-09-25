create table if not exists public.multaqa_polls (
  id uuid primary key default gen_random_uuid(),
  question text not null check (char_length(question) between 2 and 300),
  options text[] not null,
  created_by_employee_id text not null references public.multaqa_employees(employee_id),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists public.multaqa_poll_votes (
  poll_id uuid not null references public.multaqa_polls(id) on delete cascade,
  employee_id text not null references public.multaqa_employees(employee_id) on delete cascade,
  option_index smallint not null,
  voted_at timestamptz not null default now(),
  primary key (poll_id, employee_id)
);

create index if not exists idx_polls_active on public.multaqa_polls (active, created_at desc);

alter table public.multaqa_polls enable row level security;
alter table public.multaqa_poll_votes enable row level security;
revoke all on public.multaqa_polls from anon, authenticated;
revoke all on public.multaqa_poll_votes from anon, authenticated;
