
alter table public.multaqa_content
  drop constraint if exists multaqa_content_content_type_check;

alter table public.multaqa_content
  add constraint multaqa_content_content_type_check
  check (content_type = any (array[
    'announcement'::text,'news'::text,'event'::text,'gallery'::text,
    'video'::text,'rules'::text,'magazine'::text
  ]));
