-- Shared, persistent storage for the "نجوم الفصل" (class stars) tracker at
-- miss-thuraya/stars/index.html. One row per student per class, holding the
-- full history of star/loss timestamps. Row Level Security is enabled with
-- no policies: only the service-role key (used inside the class-stars edge
-- function) can read or write this table, so parents and students can only
-- reach it through that function's public "list" action and PIN-gated
-- "save"/"reset" actions.
create table if not exists public.class_stars_students (
  id bigint generated always as identity primary key,
  cls text not null,
  name text not null,
  stars jsonb not null default '[]'::jsonb,
  losses jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  unique (cls, name)
);

alter table public.class_stars_students enable row level security;
