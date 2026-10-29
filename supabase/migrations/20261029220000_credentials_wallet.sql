-- Credentials wallet (issue #253): certificates a learner earned elsewhere,
-- beside the SydCrest certificates and verified skills they already hold.
--
--   public.external_credentials   one certificate from another issuer, typed
--                                 in by the learner or imported from an Open
--                                 Badge; private until the learner makes it
--                                 public
--   storage bucket credentials    an optional PDF or image of the certificate,
--                                 private, read through short lived signed URLs
--
-- Honesty rule: SydCrest never checks an external certificate itself. A row
-- reads "Verified by the issuer" only when the server confirmed an Open Badge
-- against its issuer (a hosted assertion fetched again from the issuer, or a
-- signature checked with the issuer's published key) and recorded it with the
-- secret key through record_credential_import. Learners cannot write the
-- verification columns, and any later change to what the certificate says
-- drops it back to "Added by the learner".
--
-- Visibility: the owner sees and edits everything; anyone may read a row only
-- when the learner made it public, the profile is public and no admin has
-- hidden it. Organisations browsing the talent directory see public rows of
-- listed learners through the view (definer, like verified skills).

-- Table -------------------------------------------------------------------------

create table public.external_credentials (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  title               text not null check (char_length(btrim(title)) between 1 and 200),
  issuer_name         text not null check (char_length(btrim(issuer_name)) between 1 and 200),
  issued_on           date,
  expires_on          date,
  credential_id       text check (char_length(credential_id) between 1 and 200),
  verification_url    text check (char_length(verification_url) <= 2000 and verification_url ~ '^https://[^\s]+$'),
  file_path           text,
  visibility          text not null default 'private' check (visibility in ('private', 'public')),
  source              text not null default 'manual' check (source in ('manual', 'open_badges')),
  verification        text not null default 'learner' check (verification in ('learner', 'issuer')),
  verified_at         timestamptz,
  verification_method text check (verification_method in ('ob2_hosted', 'ob3_jwt')),
  verification_note   text check (char_length(verification_note) <= 500),
  ob_version          text check (ob_version in ('2.0', '3.0')),
  ob_document         jsonb,
  hidden_at           timestamptz,
  hidden_by           uuid references public.profiles (id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  constraint external_credentials_dates check (expires_on is null or issued_on is null or expires_on >= issued_on),
  -- A file always sits in the owner's own folder, named by a uuid.
  constraint external_credentials_file_path check (
    file_path is null
    or file_path ~ ('^' || profile_id::text || '/[0-9a-f-]{36}\.(pdf|png|jpg|webp)$')
  ),
  -- Issuer verification always says how and when.
  constraint external_credentials_verified check (
    verification = 'learner' or (verified_at is not null and verification_method is not null)
  ),
  constraint external_credentials_document_size check (ob_document is null or pg_column_size(ob_document) <= 65536)
);

comment on table public.external_credentials is
  'Certificates from other issuers in a learner''s wallet. verification = issuer only when the server checked an Open Badge against its issuer (record_credential_import, secret key). SydCrest never checks these itself.';

create index external_credentials_profile_idx on public.external_credentials (profile_id, created_at desc);
create index external_credentials_hidden_by_idx on public.external_credentials (hidden_by) where hidden_by is not null;

alter table public.external_credentials enable row level security;

create trigger external_credentials_set_updated_at
  before update on public.external_credentials
  for each row execute function private.set_updated_at();

-- Changing what a verified certificate says makes it the learner's word
-- again. Writes with no caller (the secret key) keep the verification.
create function private.external_credential_reset_verification()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is not null
     and old.verification = 'issuer'
     and (new.title, new.issuer_name, new.issued_on, new.expires_on, new.credential_id, new.verification_url)
         is distinct from
         (old.title, old.issuer_name, old.issued_on, old.expires_on, old.credential_id, old.verification_url) then
    new.verification := 'learner';
    new.verified_at := null;
    new.verification_method := null;
    new.verification_note := 'Edited after the issuer check, so it shows as added by the learner.';
  end if;
  return new;
end;
$$;

revoke execute on function private.external_credential_reset_verification() from public, anon, authenticated;

create trigger external_credentials_reset_verification
  before update on public.external_credentials
  for each row execute function private.external_credential_reset_verification();

-- Policies ----------------------------------------------------------------------

create policy "Owners manage their credentials"
  on public.external_credentials for all
  to authenticated
  using ((select auth.uid()) = profile_id)
  with check ((select auth.uid()) = profile_id);

create policy "Anyone reads public credentials of public profiles"
  on public.external_credentials for select
  to anon, authenticated
  using (visibility = 'public' and hidden_at is null and private.is_public_profile(profile_id));

create policy "Admins read credentials"
  on public.external_credentials for select
  to authenticated
  using ((select private.is_admin()));

-- Learners write only what they can know; verification, the Open Badge
-- snapshot and moderation are written by functions.
revoke all on public.external_credentials from anon, authenticated;
grant select on public.external_credentials to anon, authenticated;
grant insert (profile_id, title, issuer_name, issued_on, expires_on, credential_id, verification_url, file_path, visibility)
  on public.external_credentials to authenticated;
grant update (title, issuer_name, issued_on, expires_on, credential_id, verification_url, file_path, visibility)
  on public.external_credentials to authenticated;
grant delete on public.external_credentials to authenticated;
grant select, insert, update, delete on public.external_credentials to service_role;

-- Rate limits -------------------------------------------------------------------

-- Adds: 30 a day per person, the same trigger as reports and outcomes.
create trigger external_credentials_rate_limit
  before insert on public.external_credentials
  for each row execute function private.rate_limit_insert('external_credentials', '30', '86400');

-- Open Badge imports fetch from other servers before anything is saved, so
-- each attempt is counted on its own: 20 an hour per person. The exposed
-- function is security invoker; the definer part stays in private.
create function private.take_credential_import_limit()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  return private.take_rate_limit('credential_imports', v_uid::text, 20, interval '1 hour');
end;
$$;

revoke execute on function private.take_credential_import_limit() from public, anon;
grant execute on function private.take_credential_import_limit() to authenticated, service_role;

create function public.take_credential_import_limit()
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
begin
  return private.take_credential_import_limit();
end;
$$;

comment on function public.take_credential_import_limit() is
  'Counts one Open Badge import attempt for the signed in person (20 an hour). False when over the limit.';

revoke execute on function public.take_credential_import_limit() from public, anon;
grant execute on function public.take_credential_import_limit() to authenticated, service_role;

-- Recording an import (secret key only) -----------------------------------------

-- The server calls this after it fetched and checked an Open Badge. p_verified
-- true is the only way a row becomes "Verified by the issuer".
create function public.record_credential_import(
  p_credential_id uuid,
  p_ob_version text,
  p_verified boolean,
  p_method text,
  p_note text,
  p_document jsonb
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.external_credentials
     set source = 'open_badges',
         ob_version = p_ob_version,
         ob_document = p_document,
         verification = case when p_verified then 'issuer' else 'learner' end,
         verified_at = case when p_verified then now() end,
         verification_method = case when p_verified then p_method end,
         verification_note = left(p_note, 500)
   where id = p_credential_id;
  if not found then
    raise exception 'No such credential' using errcode = 'P0002';
  end if;
end;
$$;

revoke execute on function public.record_credential_import(uuid, text, boolean, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.record_credential_import(uuid, text, boolean, text, text, jsonb) to service_role;

-- Moderation --------------------------------------------------------------------

create function public.admin_set_credential_hidden(p_credential_id uuid, p_hidden boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  update public.external_credentials
     set hidden_at = case when p_hidden then coalesce(hidden_at, now()) end,
         hidden_by = case when p_hidden then (select auth.uid()) end,
         visibility = case when p_hidden then 'private' else visibility end
   where id = p_credential_id;
  if not found then
    raise exception 'No such credential' using errcode = 'P0002';
  end if;
end;
$$;

revoke execute on function public.admin_set_credential_hidden(uuid, boolean) from public, anon;
grant execute on function public.admin_set_credential_hidden(uuid, boolean) to authenticated, service_role;

-- A hidden credential stays private: the owner cannot make it public again.
create function private.external_credential_keep_hidden()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.hidden_at is not null and new.visibility = 'public' and not private.is_admin()
     and (select auth.uid()) is not null then
    raise exception 'This credential was hidden by our team' using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke execute on function private.external_credential_keep_hidden() from public, anon, authenticated;

create trigger external_credentials_keep_hidden
  before update on public.external_credentials
  for each row execute function private.external_credential_keep_hidden();

-- Reports: people can report a public credential. Keeps every value allowed
-- before (20261028100100_chapters_community.sql).
alter table public.reports drop constraint reports_target_type_check;
alter table public.reports add constraint reports_target_type_check check (target_type in (
  'profile', 'achievement', 'roadmap_node', 'node_resource', 'other',
  'expert_profile', 'offer', 'expert_review', 'booking_message', 'brief', 'pitch',
  'organisation', 'opportunity', 'talent_listing',
  'community_post', 'community_reply', 'chapter', 'community_event', 'event_recording',
  'external_credential'
));

-- Storage -----------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('credentials', 'credentials', false, 5242880, array['application/pdf', 'image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do nothing;

-- Anyone may read a file attached to a credential they may read: the owner,
-- admins, or anyone for a public credential of a public profile.
create function private.can_read_credential_file(p_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.external_credentials c
    where c.file_path = p_name
      and (
        c.profile_id = (select auth.uid())
        or private.is_admin()
        or (c.visibility = 'public' and c.hidden_at is null and private.is_public_profile(c.profile_id))
      )
  );
$$;

revoke execute on function private.can_read_credential_file(text) from public;
grant execute on function private.can_read_credential_file(text) to anon, authenticated, service_role;

-- Uploads per person: 30 a day and 200 files in all, counted in the bucket
-- itself so a direct API caller meets the same limit as the app.
create function private.credential_upload_allowed()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select count(*) from storage.objects o
           where o.bucket_id = 'credentials'
             and (storage.foldername(o.name))[1] = (select auth.uid())::text
             and o.created_at > now() - interval '1 day') < 30
     and (select count(*) from storage.objects o
           where o.bucket_id = 'credentials'
             and (storage.foldername(o.name))[1] = (select auth.uid())::text) < 200;
$$;

revoke execute on function private.credential_upload_allowed() from public, anon;
grant execute on function private.credential_upload_allowed() to authenticated, service_role;

create policy "Learners upload credential files to their own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'credentials'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and private.credential_upload_allowed()
  );

create policy "Credential files follow their credential"
  on storage.objects for select
  to anon, authenticated
  using (
    bucket_id = 'credentials'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or private.can_read_credential_file(name)
    )
  );

create policy "Learners delete their own credential files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'credentials'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- Talent directory --------------------------------------------------------------

-- Public, not hidden external credentials of one person, for organisations
-- browsing the directory: the learner chose to show them. Each carries its
-- verification so the card can label it honestly.
create function private.external_credentials_json(p_profile_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', c.id, 'title', c.title, 'issuer_name', c.issuer_name,
           'issued_on', c.issued_on, 'expires_on', c.expires_on,
           'verification', c.verification, 'verification_url', c.verification_url)
         order by c.issued_on desc nulls last, c.created_at desc), '[]'::jsonb)
  from public.external_credentials c
  where c.profile_id = p_profile_id and c.visibility = 'public' and c.hidden_at is null;
$$;

revoke execute on function private.external_credentials_json(uuid) from public;
grant execute on function private.external_credentials_json(uuid) to authenticated, service_role;

-- New column last, so the view keeps every column it had.
create or replace view public.talent_directory
  with (security_invoker = true)
as
  select d.*, private.verified_skills_json(d.profile_id) as verified_skills,
         private.external_credentials_json(d.profile_id) as external_credentials
  from private.talent_directory_rows() d;

comment on view public.talent_directory is
  'Listed, eligible learners (a live certificate or a verified skill) with name, avatar, live certificates, verified skills and the external credentials they made public, for verified organisations and admins (and the learner''s own preview). Never add phone or email.';
