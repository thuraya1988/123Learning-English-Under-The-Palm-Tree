
create table if not exists public.multaqa_end_of_day_reviews (
  id uuid primary key default gen_random_uuid(),
  review_date date not null default ((now() at time zone 'Asia/Muscat')::date),
  admin_employee_id text not null references public.multaqa_employees(employee_id) on update cascade on delete restrict,
  admin_name text not null,
  day_rating text not null default 'good' check (day_rating in ('excellent','good','needs_attention')),
  work_summary text,
  notes text,
  new_rules text,
  change_request text,
  change_reason text,
  liked_most text,
  compiled_message text not null,
  push_sent integer not null default 0,
  whatsapp_targets integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (review_date, admin_employee_id)
);

alter table public.multaqa_end_of_day_reviews enable row level security;

create index if not exists idx_multaqa_end_of_day_reviews_date
  on public.multaqa_end_of_day_reviews(review_date desc, created_at desc);
