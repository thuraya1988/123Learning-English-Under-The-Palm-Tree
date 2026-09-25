create table if not exists public.multaqa_book_loans (
  id uuid primary key default gen_random_uuid(),
  student_school_id text not null,
  student_name text not null,
  class_name text not null,
  book_title text not null,
  borrowed_at timestamptz not null default now(),
  due_at date not null,
  returned_at timestamptz,
  borrowed_by_employee_id text not null references public.multaqa_employees(employee_id),
  created_at timestamptz not null default now()
);

create index if not exists idx_book_loans_class
  on public.multaqa_book_loans (class_name, returned_at);
create index if not exists idx_book_loans_student
  on public.multaqa_book_loans (student_school_id, returned_at);

alter table public.multaqa_book_loans enable row level security;
revoke all on public.multaqa_book_loans from anon, authenticated;
