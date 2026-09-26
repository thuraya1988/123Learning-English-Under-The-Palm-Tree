begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery-art','gallery-art',false,8388608,array['image/png','image/jpeg'])
on conflict (id) do update set
  public=false,
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;

commit;
