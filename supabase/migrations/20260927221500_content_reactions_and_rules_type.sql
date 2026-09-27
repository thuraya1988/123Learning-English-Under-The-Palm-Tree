
alter table public.multaqa_content
  drop constraint if exists multaqa_content_content_type_check;

alter table public.multaqa_content
  add constraint multaqa_content_content_type_check
  check (content_type = any (array['announcement'::text,'news'::text,'event'::text,'gallery'::text,'video'::text,'rules'::text]));

create table if not exists public.multaqa_content_reactions (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('article','rules')),
  target_key text not null check (char_length(target_key) between 1 and 220),
  employee_id text not null references public.multaqa_employees(employee_id) on update cascade on delete cascade,
  liked boolean not null default false,
  rating smallint check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (target_type,target_key,employee_id)
);

alter table public.multaqa_content_reactions enable row level security;

create index if not exists idx_multaqa_content_reactions_target
  on public.multaqa_content_reactions(target_type,target_key);

comment on table public.multaqa_content_reactions is
  'Authenticated staff likes and 1-5 ratings for magazine articles and school rules. Accessed through secure Edge Functions.';
