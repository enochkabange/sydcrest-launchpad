-- Phase 1, part 1: shared helpers and public profile fields.
--
-- Profiles gain the fields a learner can choose to show on a public page
-- (slug, headline, skills, goals). Public reads never touch the base table:
-- column grants are per role, not per row, so an "is_public" policy on
-- profiles would hand every signed in user the phone numbers of public
-- profiles. Instead the public path is the public_profiles view, which can
-- only ever return the public columns.

-- Policies run as the caller, so anon and authenticated need to reach the
-- handful of private helpers that policies call. Every private function is
-- revoked from public below and granted one by one.
grant usage on schema private to anon, authenticated, service_role;

-- Opening the schema means tightening what is already in it. Trigger
-- functions need no execute grant to fire (it is checked when the trigger is
-- created, by the owner).
revoke execute on function private.set_updated_at() from public;

-- Admin role is profiles.role = 'admin'. Security definer so the check works
-- inside policies on other tables without depending on profiles RLS.
create function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke execute on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated, service_role;

-- New profile fields. All nullable or defaulted so the sign up trigger keeps
-- working unchanged.
alter table public.profiles
  add column public_slug text unique
    check (public_slug ~ '^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$'),
  add column is_public boolean not null default false,
  add column headline text check (char_length(headline) <= 120),
  add column skills text[] not null default '{}'
    check (cardinality(skills) <= 30),
  add column goals text check (char_length(goals) <= 500),
  add column datacamp_license_slot text,
  add constraint profiles_public_needs_slug
    check (not is_public or public_slug is not null);

comment on column public.profiles.public_slug is
  'Lowercase URL slug for the public profile page (3 to 40 chars, a-z 0-9 and hyphens).';
comment on column public.profiles.is_public is
  'Opt in. When true the public columns appear in public_profiles; phone never does.';
comment on column public.profiles.datacamp_license_slot is
  'Placeholder for the DataCamp Donates seat assigned by staff. Not user editable.';

-- Users edit their own public fields; role and datacamp_license_slot stay
-- staff only (service role).
grant update (public_slug, is_public, headline, skills, goals)
  on public.profiles to authenticated;

-- Server code with the secret key assigns license slots and similar staff
-- fields. Tables are not auto exposed, so the grant is explicit.
grant select, insert, update, delete on public.profiles to service_role;

-- The public read path. A security definer function projects only the public
-- columns of opted in profiles; the view over it is security_invoker, so the
-- database advisor has no definer view to flag and the API gets a normal
-- relation to filter (public_profiles?public_slug=eq.wumpini).
create function private.public_profile_rows()
returns table (
  id           uuid,
  public_slug  text,
  display_name text,
  headline     text,
  region       text,
  avatar_url   text,
  skills       text[],
  goals        text,
  created_at   timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select p.id, p.public_slug, p.display_name, p.headline, p.region,
         p.avatar_url, p.skills, p.goals, p.created_at
  from public.profiles p
  where p.is_public;
$$;

revoke execute on function private.public_profile_rows() from public;
grant execute on function private.public_profile_rows() to anon, authenticated, service_role;

create view public.public_profiles
  with (security_invoker = true)
as
  select * from private.public_profile_rows();

comment on view public.public_profiles is
  'Opted in profiles, public columns only. Never add phone, role or email here.';

revoke all on public.public_profiles from anon, authenticated;
grant select on public.public_profiles to anon, authenticated, service_role;

-- Used by policies on tables whose rows are public when the owner's profile
-- is (achievements). Definer so anon does not need to read profiles.
create function private.is_public_profile(p_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles where id = p_profile_id and is_public
  );
$$;

revoke execute on function private.is_public_profile(uuid) from public;
grant execute on function private.is_public_profile(uuid) to anon, authenticated, service_role;
