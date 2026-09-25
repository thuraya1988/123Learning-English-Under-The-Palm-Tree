alter table public.multaqa_web_requests
  add column if not exists reminder_sent_at timestamptz;
