insert into storage.buckets (id, name)
  values ('user-files', 'user-files') ON CONFLICT DO NOTHING;

-- Policy for SELECT
create policy "User id matching root folder can select"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'user-files'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));

-- Policy for UPDATE
create policy "User id matching root folder can update"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'user-files'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));

-- Policy for INSERT
create policy "User id matching root folder can insert"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'user-files'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));

-- Policy for DELETE
create policy "User id matching root folder can delete"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'user-files'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));