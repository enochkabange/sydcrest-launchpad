-- Market and Earn, part 2 (issue #148): expert profiles, applications and
-- offers (including fixed scope gigs).
--
-- Anyone adult can apply to sell (open marketplace, PRODUCT_ENRICHMENT §7.5);
-- an admin spot checks and approves. Approval makes the expert's profile,
-- name and avatar public on /experts whatever profiles.is_public says: being
-- listed is the expert's choice to be found. Offers carry no payment terms:
-- nothing is charged during the soft launch, and indicative_price_ghs is a
-- display number only.

-- expert_profiles ---------------------------------------------------------------------

create table public.expert_profiles (
  profile_id         uuid primary key default auth.uid() references public.profiles (id) on delete cascade,
  slug               text not null unique
                       check (slug ~ '^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$'),
  headline           text not null check (char_length(headline) between 1 and 120),
  bio                text check (char_length(bio) <= 3000),
  skills             text[] not null default '{}' check (cardinality(skills) <= 30),
  categories         text[] not null default '{}' check (cardinality(categories) <= 5),
  links              text[] not null default '{}'
                       check (cardinality(links) <= 10 and private.urls_ok(links)),
  languages          text[] not null default '{}' check (cardinality(languages) <= 10),
  region             text check (region in (
                       'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
                       'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
                       'upper_east', 'upper_west', 'volta', 'western', 'western_north'
                     )),
  availability_note  text check (char_length(availability_note) <= 300),
  accepting_requests boolean not null default true,
  offers_free_intro  boolean not null default false,
  status             text not null default 'pending'
                       check (status in ('pending', 'approved', 'delisted')),
  status_reason      text check (char_length(status_reason) <= 1000),
  approved_at        timestamptz,
  is_verified        boolean not null default false,
  verified_at        timestamptz,
  is_featured        boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  check (status <> 'approved' or approved_at is not null),
  check (is_verified = (verified_at is not null))
);

comment on table public.expert_profiles is
  'Seller mode: one per account. Public on /experts while approved. Status, verified and featured change only through admin functions.';
comment on column public.expert_profiles.is_verified is
  'Admin identity and background check badge (PRODUCT_ENRICHMENT §5.5). Not the verified SydCrest skill badge, which comes from verified_skills (#158).';
comment on column public.expert_profiles.categories is
  'Browse categories as slugs; the app owns the list.';
comment on column public.expert_profiles.status_reason is
  'Why an admin delisted (or held back) the expert. Cleared on approval, since approved rows are public.';
comment on column public.expert_profiles.offers_free_intro is
  'The expert offers a free intro call (a trust signal on the page).';

create index expert_profiles_status_idx on public.expert_profiles (status, is_featured);
create index expert_profiles_skills_idx on public.expert_profiles using gin (skills);
create index expert_profiles_categories_idx on public.expert_profiles using gin (categories);

alter table public.expert_profiles enable row level security;

create trigger expert_profiles_set_updated_at
  before update on public.expert_profiles
  for each row execute function private.set_updated_at();

create function private.is_approved_expert(p_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.expert_profiles e
    where e.profile_id = p_profile_id and e.status = 'approved'
  );
$$;

-- The caller can prepare offers: an adult with an expert profile that is not
-- delisted (pending experts can draft offers; they show once approved).
create function private.can_sell()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_adult((select auth.uid()))
     and exists (
       select 1 from public.expert_profiles e
       where e.profile_id = (select auth.uid()) and e.status <> 'delisted'
     );
$$;

revoke execute on function private.is_approved_expert(uuid) from public;
revoke execute on function private.can_sell() from public;
grant execute on function private.is_approved_expert(uuid) to anon, authenticated, service_role;
grant execute on function private.can_sell() to authenticated, service_role;

create policy "Approved experts are public; owners and admins see all"
  on public.expert_profiles for select
  to anon, authenticated
  using (
    status = 'approved'
    or profile_id = (select auth.uid())
    or private.is_admin()
  );

create policy "Adults create their own expert profile"
  on public.expert_profiles for insert
  to authenticated
  with check (profile_id = (select auth.uid()) and private.is_adult((select auth.uid())));

create policy "Experts edit their own profile"
  on public.expert_profiles for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

revoke all on public.expert_profiles from anon, authenticated;
grant select on public.expert_profiles to anon, authenticated;
grant insert (profile_id, slug, headline, bio, skills, categories, links, languages, region,
              availability_note, accepting_requests, offers_free_intro)
  on public.expert_profiles to authenticated;
grant update (slug, headline, bio, skills, categories, links, languages, region,
              availability_note, accepting_requests, offers_free_intro)
  on public.expert_profiles to authenticated;
grant select, insert, update, delete on public.expert_profiles to service_role;

-- expert_applications ------------------------------------------------------------------

create table public.expert_applications (
  id             uuid primary key default gen_random_uuid(),
  profile_id     uuid not null default auth.uid() references public.expert_profiles (profile_id) on delete cascade,
  motivation     text not null check (char_length(motivation) between 1 and 2000),
  experience     text check (char_length(experience) <= 3000),
  evidence_links text[] not null default '{}'
                   check (cardinality(evidence_links) <= 10 and private.urls_ok(evidence_links)),
  fast_track     boolean not null default false,
  status         text not null default 'submitted'
                   check (status in ('submitted', 'approved', 'rejected', 'withdrawn')),
  decision_note  text check (char_length(decision_note) <= 1000),
  decided_by     uuid references public.profiles (id) on delete set null,
  decided_at     timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table public.expert_applications is
  'The review record for becoming an expert. Create the expert profile first, then apply. Admins decide with decide_expert_application.';
comment on column public.expert_applications.fast_track is
  'Set by the database: the applicant is a mentor (profiles.role) or a cohort mentor or coordinator. Sorts first in the queue; an admin still approves.';

create unique index expert_applications_one_open
  on public.expert_applications (profile_id) where status = 'submitted';
create index expert_applications_queue_idx on public.expert_applications (status, fast_track desc, created_at);
create index expert_applications_decided_by_idx on public.expert_applications (decided_by);

alter table public.expert_applications enable row level security;

create trigger expert_applications_set_updated_at
  before update on public.expert_applications
  for each row execute function private.set_updated_at();

create function private.set_expert_fast_track()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.fast_track := exists (
      select 1 from public.profiles p where p.id = new.profile_id and p.role = 'mentor'
    ) or exists (
      select 1 from public.cohort_members m
      where m.profile_id = new.profile_id and m.role in ('mentor', 'coordinator')
    );
  return new;
end;
$$;

revoke execute on function private.set_expert_fast_track() from public, anon, authenticated;

create trigger expert_applications_fast_track
  before insert on public.expert_applications
  for each row execute function private.set_expert_fast_track();

create policy "Applicants and admins read applications"
  on public.expert_applications for select
  to authenticated
  using (profile_id = (select auth.uid()) or private.is_admin());

create policy "Adults apply as themselves"
  on public.expert_applications for insert
  to authenticated
  with check (profile_id = (select auth.uid()) and private.is_adult((select auth.uid())));

-- The only change an applicant makes is withdrawing an open application.
create policy "Applicants withdraw an open application"
  on public.expert_applications for update
  to authenticated
  using (profile_id = (select auth.uid()) and status = 'submitted')
  with check (profile_id = (select auth.uid()) and status = 'withdrawn');

revoke all on public.expert_applications from anon, authenticated;
grant select on public.expert_applications to authenticated;
grant insert (profile_id, motivation, experience, evidence_links) on public.expert_applications to authenticated;
grant update (status) on public.expert_applications to authenticated;
grant select, insert, update, delete on public.expert_applications to service_role;

-- offers ---------------------------------------------------------------------------------

create table public.offers (
  id                   uuid primary key default gen_random_uuid(),
  expert_id            uuid not null default auth.uid() references public.expert_profiles (profile_id) on delete cascade,
  kind                 text not null check (kind in (
                         'one_to_one', 'group', 'async_review', 'project', 'recurring', 'gig'
                       )),
  title                text not null check (char_length(title) between 1 and 120),
  description          text not null check (char_length(description) between 1 and 4000),
  scope                text check (char_length(scope) <= 4000),
  duration_minutes     smallint check (duration_minutes between 15 and 480),
  delivery_days        smallint check (delivery_days between 1 and 180),
  max_participants     smallint check (max_participants between 2 and 500),
  cadence              text check (cadence in ('weekly', 'fortnightly', 'monthly')),
  revisions_included   smallint check (revisions_included between 0 and 10),
  skills               text[] not null default '{}' check (cardinality(skills) <= 20),
  indicative_price_ghs integer check (indicative_price_ghs between 0 and 1000000),
  is_active            boolean not null default true,
  position             smallint not null default 0,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  constraint offers_gig_has_scope check (kind <> 'gig' or (scope is not null and delivery_days is not null)),
  constraint offers_group_has_size check (kind <> 'group' or max_participants is not null),
  constraint offers_recurring_has_cadence check (kind <> 'recurring' or cadence is not null),
  constraint offers_session_has_duration check (kind not in ('one_to_one', 'group') or duration_minutes is not null)
);

comment on table public.offers is
  'What an expert offers: 1:1 or group sessions, async reviews, projects, recurring mentorship, and fixed scope gigs (Phase 4). Public while active and the expert is approved.';
comment on column public.offers.scope is
  'What is delivered. Required for gigs (fixed scope), with delivery_days.';
comment on column public.offers.indicative_price_ghs is
  'Display only, in whole cedis. Never charged, no payment state: SydCrest never custodies funds. Offers show as free during the soft launch.';

create index offers_expert_idx on public.offers (expert_id, position);
create index offers_kind_idx on public.offers (kind) where is_active;

alter table public.offers enable row level security;

create trigger offers_set_updated_at
  before update on public.offers
  for each row execute function private.set_updated_at();

create policy "Active offers of approved experts are public; owners and admins see all"
  on public.offers for select
  to anon, authenticated
  using (
    (is_active and private.is_approved_expert(expert_id))
    or expert_id = (select auth.uid())
    or private.is_admin()
  );

create policy "Experts create their own offers"
  on public.offers for insert
  to authenticated
  with check (expert_id = (select auth.uid()) and private.can_sell());

create policy "Experts edit their own offers; admins can too"
  on public.offers for update
  to authenticated
  using (expert_id = (select auth.uid()) or private.is_admin())
  with check (expert_id = (select auth.uid()) or private.is_admin());

create policy "Experts delete their own offers"
  on public.offers for delete
  to authenticated
  using (expert_id = (select auth.uid()));

revoke all on public.offers from anon, authenticated;
grant select on public.offers to anon, authenticated;
grant insert (expert_id, kind, title, description, scope, duration_minutes, delivery_days,
              max_participants, cadence, revisions_included, skills, indicative_price_ghs,
              is_active, position)
  on public.offers to authenticated;
grant update (kind, title, description, scope, duration_minutes, delivery_days,
              max_participants, cadence, revisions_included, skills, indicative_price_ghs,
              is_active, position)
  on public.offers to authenticated;
grant delete on public.offers to authenticated;
grant select, insert, update, delete on public.offers to service_role;

-- Admin functions -------------------------------------------------------------------------

-- Approve or reject an open application. Approval lists the expert.
create function public.decide_expert_application(
  p_application_id uuid,
  p_decision text,
  p_note text default null
)
returns public.expert_applications
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_app public.expert_applications;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_decision not in ('approved', 'rejected') then
    raise exception 'Decision must be approved or rejected' using errcode = '22023';
  end if;
  update public.expert_applications
     set status = p_decision, decision_note = p_note,
         decided_by = (select auth.uid()), decided_at = now()
   where id = p_application_id and status = 'submitted'
  returning * into v_app;
  if v_app.id is null then
    raise exception 'No open application with that id' using errcode = 'P0002';
  end if;
  if p_decision = 'approved' then
    update public.expert_profiles
       set status = 'approved', status_reason = null,
           approved_at = coalesce(approved_at, now())
     where profile_id = v_app.profile_id;
  end if;
  return v_app;
end;
$$;

revoke execute on function public.decide_expert_application(uuid, text, text) from public, anon;
grant execute on function public.decide_expert_application(uuid, text, text) to authenticated, service_role;

-- List again, or delist (repeat offenders, a failed spot check).
create function public.admin_set_expert_status(
  p_profile_id uuid,
  p_status text,
  p_reason text default null
)
returns public.expert_profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.expert_profiles;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_status not in ('pending', 'approved', 'delisted') then
    raise exception 'Unknown expert status %', p_status using errcode = '22023';
  end if;
  update public.expert_profiles
     set status = p_status,
         -- Approved rows are public, so a reason is kept only off the list.
         status_reason = case when p_status = 'approved' then null else p_reason end,
         approved_at = case when p_status = 'approved' then coalesce(approved_at, now()) else approved_at end
   where profile_id = p_profile_id
  returning * into v_row;
  if v_row.profile_id is null then
    raise exception 'Expert not found' using errcode = 'P0002';
  end if;
  return v_row;
end;
$$;

revoke execute on function public.admin_set_expert_status(uuid, text, text) from public, anon;
grant execute on function public.admin_set_expert_status(uuid, text, text) to authenticated, service_role;

-- Verified (identity checked) and featured badges. Null leaves a flag as is.
create function public.admin_set_expert_flags(
  p_profile_id uuid,
  p_is_verified boolean default null,
  p_is_featured boolean default null
)
returns public.expert_profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.expert_profiles;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  update public.expert_profiles
     set is_verified = coalesce(p_is_verified, is_verified),
         verified_at = case
           when p_is_verified is null then verified_at
           when p_is_verified then coalesce(verified_at, now())
         end,
         is_featured = coalesce(p_is_featured, is_featured)
   where profile_id = p_profile_id
  returning * into v_row;
  if v_row.profile_id is null then
    raise exception 'Expert not found' using errcode = 'P0002';
  end if;
  return v_row;
end;
$$;

revoke execute on function public.admin_set_expert_flags(uuid, boolean, boolean) from public, anon;
grant execute on function public.admin_set_expert_flags(uuid, boolean, boolean) to authenticated, service_role;

-- Admin queue ------------------------------------------------------------------------------

create function private.expert_application_queue_rows()
returns table (
  application_id uuid,
  profile_id     uuid,
  display_name   text,
  avatar_url     text,
  slug           text,
  headline       text,
  skills         text[],
  links          text[],
  expert_status  text,
  motivation     text,
  experience     text,
  evidence_links text[],
  fast_track     boolean,
  status         text,
  decision_note  text,
  decided_at     timestamptz,
  created_at     timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, a.profile_id, p.display_name, p.avatar_url, e.slug, e.headline, e.skills, e.links,
         e.status, a.motivation, a.experience, a.evidence_links, a.fast_track, a.status,
         a.decision_note, a.decided_at, a.created_at
  from public.expert_applications a
  join public.expert_profiles e on e.profile_id = a.profile_id
  join public.profiles p on p.id = a.profile_id
  where private.is_admin();
$$;

revoke execute on function private.expert_application_queue_rows() from public;
grant execute on function private.expert_application_queue_rows() to authenticated, service_role;

create view public.expert_application_queue
  with (security_invoker = true)
as
  select * from private.expert_application_queue_rows();

comment on view public.expert_application_queue is
  'Expert applications with the applicant''s name and expert profile, for the admin queue. Admins only. Never add phone or email.';

revoke all on public.expert_application_queue from anon, authenticated;
grant select on public.expert_application_queue to authenticated, service_role;
