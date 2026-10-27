-- Market and Earn, part 5 (issue #148): the talent directory, contact
-- requests from organisations, and report targets for the new surfaces.
--
-- The directory is opt in and vouched for (PRODUCT_ENRICHMENT §7.5):
-- only adults who are certified (a live programme certificate) or hold a
-- verified skill can list. Eligibility is checked by the database on every
-- write and every read, so a revoked certificate hides the listing at once.
-- Verified organisations browse it; contact goes through the platform and
-- the learner decides what contact detail, if any, to share.

-- Eligibility -------------------------------------------------------------------------

-- The one place "may be listed" is decided. Today: a live certificate.
-- Issue #158 (verified skills) extends it with
--   create or replace function private.talent_eligible(p_profile_id uuid) returns boolean ...
-- adding "or exists a verified skill for p_profile_id", keeping the signature,
-- language sql, stable, security definer and search_path = ''.
create function private.talent_eligible(p_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.certificates c
    where c.profile_id = p_profile_id and c.revoked_at is null
  );
$$;

revoke execute on function private.talent_eligible(uuid) from public;
grant execute on function private.talent_eligible(uuid) to authenticated, service_role;

-- For the opt in screen: may the caller list themselves?
create function public.talent_eligibility()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'eligible', private.is_adult(v_uid) and private.talent_eligible(v_uid),
    'is_adult', private.is_adult(v_uid),
    'certificates', (select count(*) from public.certificates c
                      where c.profile_id = v_uid and c.revoked_at is null)
  );
end;
$$;

revoke execute on function public.talent_eligibility() from public, anon;
grant execute on function public.talent_eligibility() to authenticated, service_role;

-- talent_listings -----------------------------------------------------------------------

create table public.talent_listings (
  profile_id    uuid primary key default auth.uid() references public.profiles (id) on delete cascade,
  headline      text not null check (char_length(headline) between 1 and 120),
  summary       text check (char_length(summary) <= 2000),
  skills        text[] not null default '{}' check (cardinality(skills) <= 30),
  tracks        text[] not null default '{}' check (cardinality(tracks) <= 10),
  region        text check (region in (
                  'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
                  'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
                  'upper_east', 'upper_west', 'volta', 'western', 'western_north'
                )),
  availability  text not null default 'open_to_work'
                  check (availability in ('open_to_work', 'open_to_internships', 'open_to_gigs')),
  open_to_remote boolean not null default true,
  portfolio_url text check (private.url_ok(portfolio_url)),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.talent_listings is
  'Opt in talent directory entry. Writable only while the learner is an adult and private.talent_eligible; read by verified organisations through talent_directory.';

create index talent_listings_active_idx on public.talent_listings (is_active, region);
create index talent_listings_skills_idx on public.talent_listings using gin (skills);
create index talent_listings_tracks_idx on public.talent_listings using gin (tracks);

alter table public.talent_listings enable row level security;

create trigger talent_listings_set_updated_at
  before update on public.talent_listings
  for each row execute function private.set_updated_at();

-- The listing is visible to organisations: active, and the learner still
-- eligible.
create function private.talent_is_listed(p_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.talent_listings t
    where t.profile_id = p_profile_id and t.is_active
  ) and private.talent_eligible(p_profile_id);
$$;

revoke execute on function private.talent_is_listed(uuid) from public;
grant execute on function private.talent_is_listed(uuid) to authenticated, service_role;

create policy "Learners, verified organisations and admins read listings"
  on public.talent_listings for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or private.is_admin()
    or (is_active and private.is_verified_org_member() and private.talent_eligible(profile_id))
  );

create policy "Eligible adults opt in"
  on public.talent_listings for insert
  to authenticated
  with check (
    profile_id = (select auth.uid())
    and private.is_adult((select auth.uid()))
    and private.talent_eligible((select auth.uid()))
  );

-- Anyone can switch their listing off; switching on or editing an active
-- listing needs eligibility.
create policy "Learners edit their own listing"
  on public.talent_listings for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (
    profile_id = (select auth.uid())
    and (not is_active or (private.is_adult((select auth.uid())) and private.talent_eligible((select auth.uid()))))
  );

create policy "Learners remove their own listing"
  on public.talent_listings for delete
  to authenticated
  using (profile_id = (select auth.uid()));

revoke all on public.talent_listings from anon, authenticated;
grant select, delete on public.talent_listings to authenticated;
grant insert (profile_id, headline, summary, skills, tracks, region, availability, open_to_remote,
              portfolio_url, is_active)
  on public.talent_listings to authenticated;
grant update (headline, summary, skills, tracks, region, availability, open_to_remote,
              portfolio_url, is_active)
  on public.talent_listings to authenticated;
grant select, insert, update, delete on public.talent_listings to service_role;

-- talent_contact_requests ------------------------------------------------------------------

create table public.talent_contact_requests (
  id              uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations (id) on delete cascade,
  profile_id      uuid not null references public.profiles (id) on delete cascade,
  requested_by    uuid default auth.uid() references public.profiles (id) on delete set null,
  opportunity_id  uuid references public.opportunities (id) on delete set null,
  message         text not null check (char_length(message) between 1 and 2000),
  status          text not null default 'pending'
                    check (status in ('pending', 'accepted', 'declined', 'withdrawn')),
  shared_contact  text check (char_length(shared_contact) <= 300),
  responded_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  check (shared_contact is null or status = 'accepted')
);

comment on table public.talent_contact_requests is
  'An organisation asks to contact a listed learner. Nothing about the learner beyond the directory is shared until they accept; then shared_contact holds only what they chose to give.';
comment on column public.talent_contact_requests.shared_contact is
  'Typed by the learner when accepting (an email, a phone number, or nothing). SydCrest never hands over account email or phone.';

create unique index talent_contact_one_pending
  on public.talent_contact_requests (organisation_id, profile_id) where status = 'pending';
create index talent_contact_profile_idx on public.talent_contact_requests (profile_id, status);
create index talent_contact_requested_by_idx on public.talent_contact_requests (requested_by);
create index talent_contact_opportunity_idx on public.talent_contact_requests (opportunity_id);

alter table public.talent_contact_requests enable row level security;

create trigger talent_contact_requests_set_updated_at
  before update on public.talent_contact_requests
  for each row execute function private.set_updated_at();

create policy "The learner, the organisation's members and admins read requests"
  on public.talent_contact_requests for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or private.org_role(organisation_id) is not null
    or private.is_admin()
  );

create policy "Verified organisations ask listed learners"
  on public.talent_contact_requests for insert
  to authenticated
  with check (
    requested_by = (select auth.uid())
    and private.can_post_for_org(organisation_id)
    and private.is_adult((select auth.uid()))
    and private.talent_is_listed(profile_id)
    and profile_id <> (select auth.uid())
  );

revoke all on public.talent_contact_requests from anon, authenticated;
grant select on public.talent_contact_requests to authenticated;
grant insert (organisation_id, profile_id, requested_by, opportunity_id, message)
  on public.talent_contact_requests to authenticated;
grant select, insert, update, delete on public.talent_contact_requests to service_role;

-- The learner accepts (optionally sharing a contact detail) or declines.
create function public.respond_talent_contact(
  p_request_id uuid,
  p_accept boolean,
  p_shared_contact text default null
)
returns public.talent_contact_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.talent_contact_requests;
begin
  if p_accept is null then
    raise exception 'Say yes or no' using errcode = '22023';
  end if;
  update public.talent_contact_requests
     set status = case when p_accept then 'accepted' else 'declined' end,
         shared_contact = case when p_accept then nullif(trim(p_shared_contact), '') end,
         responded_at = now()
   where id = p_request_id and profile_id = (select auth.uid()) and status = 'pending'
  returning * into v_row;
  if v_row.id is null then
    raise exception 'No pending request for you with that id' using errcode = 'P0002';
  end if;
  return v_row;
end;
$$;

revoke execute on function public.respond_talent_contact(uuid, boolean, text) from public, anon;
grant execute on function public.respond_talent_contact(uuid, boolean, text) to authenticated, service_role;

-- The organisation withdraws a pending request.
create function public.withdraw_talent_contact(p_request_id uuid)
returns public.talent_contact_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.talent_contact_requests;
begin
  select * into v_row from public.talent_contact_requests where id = p_request_id;
  if v_row.id is null or coalesce(private.org_role(v_row.organisation_id) not in ('owner', 'admin', 'recruiter'), true) then
    raise exception 'Not your organisation''s request' using errcode = '42501';
  end if;
  update public.talent_contact_requests
     set status = 'withdrawn', responded_at = now()
   where id = p_request_id and status = 'pending'
  returning * into v_row;
  if v_row.id is null then
    raise exception 'Only a pending request can be withdrawn' using errcode = '22023';
  end if;
  return v_row;
end;
$$;

revoke execute on function public.withdraw_talent_contact(uuid) from public, anon;
grant execute on function public.withdraw_talent_contact(uuid) to authenticated, service_role;

-- talent_directory view ---------------------------------------------------------------------

-- Listed learners with name, avatar and their live certificates, for members
-- of verified organisations and admins; a learner also sees their own row
-- (a preview). Issue #158 can append a verified_skills column with
-- create or replace view (new columns go last).
create function private.talent_directory_rows()
returns table (
  profile_id     uuid,
  display_name   text,
  avatar_url     text,
  public_slug    text,
  headline       text,
  summary        text,
  skills         text[],
  tracks         text[],
  region         text,
  availability   text,
  open_to_remote boolean,
  portfolio_url  text,
  certificates   jsonb,
  updated_at     timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select t.profile_id, p.display_name, p.avatar_url,
         case when p.is_public then p.public_slug end,
         t.headline, t.summary, t.skills, t.tracks, t.region, t.availability, t.open_to_remote,
         t.portfolio_url,
         coalesce((
           select jsonb_agg(jsonb_build_object(
                    'program_title', c.program_title,
                    'specialization_label', c.specialization_label,
                    'verification_id', c.verification_id,
                    'issued_at', c.issued_at) order by c.issued_at)
           from public.certificates c
           where c.profile_id = t.profile_id and c.revoked_at is null
         ), '[]'::jsonb),
         t.updated_at
  from public.talent_listings t
  join public.profiles p on p.id = t.profile_id
  where (t.is_active and private.talent_eligible(t.profile_id)
         and (private.is_verified_org_member() or private.is_admin()))
     or t.profile_id = (select auth.uid());
$$;

revoke execute on function private.talent_directory_rows() from public;
grant execute on function private.talent_directory_rows() to authenticated, service_role;

create view public.talent_directory
  with (security_invoker = true)
as
  select * from private.talent_directory_rows();

comment on view public.talent_directory is
  'Listed, eligible learners with name, avatar and live certificates, for verified organisations and admins (and the learner''s own preview). Never add phone or email.';

revoke all on public.talent_directory from anon, authenticated;
grant select on public.talent_directory to authenticated, service_role;

-- Reports -------------------------------------------------------------------------------------

-- People can report the new public surfaces. Issue #158 swaps this constraint
-- again for community targets and must keep every value listed here.
alter table public.reports drop constraint reports_target_type_check;
alter table public.reports add constraint reports_target_type_check check (target_type in (
  'profile', 'achievement', 'roadmap_node', 'node_resource', 'other',
  'expert_profile', 'offer', 'expert_review', 'booking_message', 'brief', 'pitch',
  'organisation', 'opportunity', 'talent_listing'
));
