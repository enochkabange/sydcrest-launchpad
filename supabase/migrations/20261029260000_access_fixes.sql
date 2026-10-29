-- Access fixes from the #240 audit and the founder's access decisions
-- (docs/founder-decisions.md, accepted 28 Oct 2026). One migration for:
--
-- 1. follows (#246, D7): a follow is visible to its two people, and to every
--    signed in user only when both ends are public profiles.
-- 2. events and waitlist (#247): no direct inserts from the publishable key.
--    Analytics go through record_events (already rate limited); the waitlist
--    goes through join_waitlist, which counts the form limit in the same
--    transaction as the insert.
-- 3. expert profiles (#249): created only together with an application,
--    through apply_as_expert, so every pending expert is in the admin queue.
-- 4. cohort roster (#250): classmates no longer see each other's status or
--    deferral; staff and admins still do.
-- 5. skill reviewers (#248, D3): admins appoint them with
--    admin_set_skill_reviewer; is_skill_reviewer reads the new flag.
-- 6. consents (D1): a new kind, age_confirmation, for the "I confirm I am 18
--    or over" tick at sign up and on /welcome.

-- 1. follows ------------------------------------------------------------------------

-- Public follower counts come from public_profile_stats (a definer), so this
-- only narrows what a direct read returns.
alter policy "Signed in users can see follows"
  on public.follows
  using (
    follower_id = (select auth.uid())
    or following_id = (select auth.uid())
    or (private.is_public_profile(follower_id) and private.is_public_profile(following_id))
  );

comment on table public.follows is
  'Who follows whom. Each person sees their own follows and followers; everyone signed in sees follows between two public profiles.';

-- 2a. events ---------------------------------------------------------------------------

-- public.record_events (a definer with per person, per visitor and global
-- limits) is the only write path; the app never inserts directly.
revoke insert on public.events from anon, authenticated;

comment on table public.events is
  'Analytics events. Written only through record_events (rate limited); admins read.';

-- 2b. waitlist --------------------------------------------------------------------------

-- p_key is the sha256 of the visitor's address that the server action makes
-- (take_form_rate_limit's rules). The form limit and the insert share one
-- transaction, and the direct insert grant is gone, so the only way onto the
-- list is through the limit. A repeat address is not an error: the caller
-- learns nothing about whether an email is already on the list. The global
-- ceiling trigger (waitlist_ceiling) still bounds every caller together.
create function private.join_waitlist(
  p_key      text,
  p_email    text,
  p_name     text default null,
  p_region   text default null,
  p_interest text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.take_form_rate_limit('waitlist', p_key) then
    return false;
  end if;
  insert into public.waitlist (email, name, region, interest)
  values (trim(p_email), nullif(trim(p_name), ''), nullif(p_region, ''), nullif(trim(p_interest), ''))
  on conflict ((lower(email))) do nothing;
  return true;
end;
$$;

revoke execute on function private.join_waitlist(text, text, text, text, text) from public;
grant execute on function private.join_waitlist(text, text, text, text, text) to anon, authenticated, service_role;

-- Security invoker entry point (signed out visitors may not run a definer in
-- public), as with take_form_rate_limit.
create function public.join_waitlist(
  p_key      text,
  p_email    text,
  p_name     text default null,
  p_region   text default null,
  p_interest text default null
)
returns boolean
language sql
security invoker
set search_path = ''
as $$
  select private.join_waitlist(p_key, p_email, p_name, p_region, p_interest);
$$;

comment on function public.join_waitlist(text, text, text, text, text) is
  'Adds an address to the waitlist, counting one waitlist form submission for the hashed visitor address. False when that address is over the limit; true otherwise, also for an address already on the list.';

revoke execute on function public.join_waitlist(text, text, text, text, text) from public;
grant execute on function public.join_waitlist(text, text, text, text, text) to anon, authenticated, service_role;

revoke insert on public.waitlist from anon, authenticated;

comment on table public.waitlist is
  'Marketing site sign ups, added only through join_waitlist (rate limited per visitor). Only admins read the list.';

-- 3. expert profiles --------------------------------------------------------------------

-- Creates the caller's pending expert profile (or refreshes a pending or
-- delisted one) and the application an admin reviews, in one transaction.
-- Errors the app maps to messages:
--   42501 not signed in or under 18
--   23505 the link name (slug) is taken
--   55000 an application is already in review, or the caller is already approved
create function public.apply_as_expert(
  p_slug           text,
  p_headline       text,
  p_skills         text[],
  p_categories     text[],
  p_links          text[],
  p_motivation     text,
  p_experience     text,
  p_evidence_links text[]
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid    uuid := (select auth.uid());
  v_status text;
  v_app    uuid;
begin
  if v_uid is null then
    raise exception 'Sign in to apply' using errcode = '42501';
  end if;
  if not private.is_adult(v_uid) then
    raise exception 'Adults only' using errcode = '42501';
  end if;

  select status into v_status from public.expert_profiles where profile_id = v_uid for update;
  if v_status = 'approved' then
    raise exception 'Already an approved expert' using errcode = '55000';
  end if;
  if exists (select 1 from public.expert_applications where profile_id = v_uid and status = 'submitted') then
    raise exception 'An application is already in review' using errcode = '55000';
  end if;

  if v_status is null then
    insert into public.expert_profiles (profile_id, slug, headline, skills, categories, links)
    values (v_uid, p_slug, p_headline, coalesce(p_skills, '{}'), coalesce(p_categories, '{}'), coalesce(p_links, '{}'));
  else
    update public.expert_profiles
       set slug = p_slug,
           headline = p_headline,
           skills = coalesce(p_skills, '{}'),
           categories = coalesce(p_categories, '{}'),
           links = coalesce(p_links, '{}')
     where profile_id = v_uid;
  end if;

  insert into public.expert_applications (profile_id, motivation, experience, evidence_links)
  values (v_uid, p_motivation, nullif(trim(p_experience), ''), coalesce(p_evidence_links, '{}'))
  returning id into v_app;
  return v_app;
end;
$$;

comment on function public.apply_as_expert(text, text, text[], text[], text[], text, text, text[]) is
  'The one way to become a (pending) expert: creates or refreshes the caller''s expert profile and submits the application together, so the admin queue sees every pending expert.';

revoke execute on function public.apply_as_expert(text, text, text[], text[], text[], text, text, text[]) from public, anon;
grant execute on function public.apply_as_expert(text, text, text[], text[], text[], text, text, text[]) to authenticated, service_role;

-- No direct insert: a profile without an application could sell (can_sell)
-- and switch the nav to the expert dashboard while no admin ever saw it.
revoke insert on public.expert_profiles from authenticated;

comment on table public.expert_profiles is
  'Seller mode: one per account, created only by apply_as_expert. Public on /experts while approved. Status, verified and featured change only through admin functions.';

-- 4. cohort roster -----------------------------------------------------------------------

-- The table itself: a learner reads their own memberships; staff of the
-- cohort and admins read every row. Classmates' names come through
-- cohort_roster below, without status or deferral.
alter policy "Members see their cohort's members; admins see all"
  on public.cohort_members
  using (
    profile_id = (select auth.uid())
    or private.is_cohort_staff(cohort_id)
    or private.is_admin()
  );

-- Same columns as before. For a learner looking at classmates, status and
-- deferred_to are null and deferred classmates are left out (whether someone
-- was deferred is pastoral information for staff). Own rows keep both.
create or replace function private.cohort_roster_rows()
returns table (
  member_id      uuid,
  cohort_id      uuid,
  profile_id     uuid,
  display_name   text,
  avatar_url     text,
  public_slug    text,
  role           text,
  specialization text,
  status         text,
  deferred_to    uuid
)
language sql
stable
security definer
set search_path = ''
as $$
  with seen as (
    select m.*,
           (private.is_admin() or private.is_cohort_staff(m.cohort_id)
            or m.profile_id = (select auth.uid())) as full_view
    from public.cohort_members m
    where private.is_admin()
       or exists (
         select 1 from public.cohort_members me
         where me.cohort_id = m.cohort_id and me.profile_id = (select auth.uid())
       )
  )
  select s.id, s.cohort_id, s.profile_id, p.display_name, p.avatar_url,
         case when p.is_public then p.public_slug end,
         s.role, s.specialization,
         case when s.full_view then s.status end,
         case when s.full_view then s.deferred_to end
  from seen s
  join public.profiles p on p.id = s.profile_id
  where s.full_view or s.status <> 'deferred';
$$;

comment on view public.cohort_roster is
  'Members of the caller''s cohorts with name and avatar (admins: every cohort). Status and deferral only for staff, admins and the member themselves; learners do not see deferred classmates. Never add phone or email here.';

-- 5. skill reviewers ------------------------------------------------------------------------

alter table public.profiles
  add column is_skill_reviewer boolean not null default false;

comment on column public.profiles.is_skill_reviewer is
  'Appointed by an admin (admin_set_skill_reviewer) to review verified skill portfolios. Not granted to users.';

create index profiles_skill_reviewer_idx on public.profiles (id) where is_skill_reviewer;

-- Admins, appointed reviewers, and the legacy profiles.role = 'mentor'
-- (nothing sets it today; kept so no existing reviewer loses access).
create or replace function private.is_skill_reviewer()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid())
      and (is_skill_reviewer or role in ('mentor', 'admin'))
  );
$$;

create function public.admin_set_skill_reviewer(p_profile_id uuid, p_reviewer boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_reviewer is null then
    raise exception 'Say yes or no' using errcode = '22023';
  end if;
  update public.profiles set is_skill_reviewer = p_reviewer where id = p_profile_id;
  if not found then
    raise exception 'Profile not found' using errcode = 'P0002';
  end if;
end;
$$;

comment on function public.admin_set_skill_reviewer(uuid, boolean) is
  'Admins appoint or remove a skill portfolio reviewer.';

revoke execute on function public.admin_set_skill_reviewer(uuid, boolean) from public, anon;
grant execute on function public.admin_set_skill_reviewer(uuid, boolean) to authenticated, service_role;

-- The reviewer list for /admin/skills: names only, never email.
create function private.admin_skill_reviewer_rows()
returns table (profile_id uuid, display_name text, public_slug text)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query
    select p.id, p.display_name, case when p.is_public then p.public_slug end
    from public.profiles p
    where p.is_skill_reviewer
    order by p.display_name;
end;
$$;

revoke execute on function private.admin_skill_reviewer_rows() from public;
grant execute on function private.admin_skill_reviewer_rows() to authenticated, service_role;

create function public.admin_skill_reviewers()
returns table (profile_id uuid, display_name text, public_slug text)
language sql
stable
security invoker
set search_path = ''
as $$
  select * from private.admin_skill_reviewer_rows();
$$;

revoke execute on function public.admin_skill_reviewers() from public, anon;
grant execute on function public.admin_skill_reviewers() to authenticated, service_role;

-- 6. consents: age confirmation --------------------------------------------------------------

alter table public.consents drop constraint consents_kind_check;
alter table public.consents
  add constraint consents_kind_check check (kind in ('terms', 'privacy', 'whatsapp', 'age_confirmation'));

comment on table public.consents is
  'Append only consent log (terms, privacy, WhatsApp messaging, and the "I confirm I am 18 or over" age confirmation). Revoking stamps revoked_at.';
