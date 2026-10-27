-- Market and Earn, part 1 (issue #148): shared helpers, organisations and
-- organisation members.
--
-- One account, several modes. Nobody gets a "seller" or "business" role on
-- profiles: a person is a seller while they hold an approved expert profile,
-- and acts for a business through an active organisation membership. The
-- learner and mentor modes stay where they are (profiles.role, cohorts).
--
-- No money moves through SydCrest (never custody funds, PRODUCT_ENRICHMENT
-- §5.3 and §8): these tables carry no balances, no payment state and no
-- payout details. Where a price or budget appears it is an indicative number
-- for display only.

-- Shared helpers ------------------------------------------------------------------

-- Adults only for selling, buying from experts, organisations and the talent
-- directory. Under 18s are already refused at sign up; this keeps the database
-- consistent with that gate. The date of birth is the one the sign up form
-- (options.data) or the /welcome step (updateUser) stored in the auth user's
-- metadata as YYYY-MM-DD. Missing or unreadable means not an adult. The
-- metadata is user writable through updateUser, so this is a consistency guard
-- with the sign up gate, not proof of age.
create function private.is_adult(p_profile_id uuid)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_raw text;
  v_dob date;
begin
  if p_profile_id is null then
    return false;
  end if;
  select u.raw_user_meta_data ->> 'date_of_birth' into v_raw
  from auth.users u where u.id = p_profile_id;
  if v_raw is null or v_raw !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then
    return false;
  end if;
  begin
    v_dob := v_raw::date;
  exception when others then
    return false;
  end;
  return v_dob <= ((now() at time zone 'Africa/Accra')::date - interval '18 years')::date;
end;
$$;

revoke execute on function private.is_adult(uuid) from public;
grant execute on function private.is_adult(uuid) to authenticated, service_role;

-- Links people type in (portfolio, website, apply link, evidence) must be
-- plain http(s) URLs, so a stored link can never become javascript: in a page.
create function private.url_ok(p_url text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select p_url is null
      or (char_length(p_url) <= 2000 and p_url ~* '^https?://[^[:space:]<>"]+$');
$$;

create function private.urls_ok(p_urls text[])
returns boolean
language sql
immutable
set search_path = ''
as $$
  select coalesce(bool_and(private.url_ok(u) and u is not null), true) from unnest(p_urls) as u;
$$;

revoke execute on function private.url_ok(text) from public;
revoke execute on function private.urls_ok(text[]) from public;
grant execute on function private.url_ok(text) to anon, authenticated, service_role;
grant execute on function private.urls_ok(text[]) to anon, authenticated, service_role;

-- organisations -------------------------------------------------------------------

create table public.organisations (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique
                        check (slug ~ '^[a-z0-9][a-z0-9-]{1,58}[a-z0-9]$'),
  name                text not null check (char_length(name) between 1 and 120),
  kind                text not null default 'business'
                        check (kind in ('business', 'nonprofit', 'school', 'government', 'other')),
  description         text check (char_length(description) <= 3000),
  website             text check (private.url_ok(website)),
  region              text check (region in (
                        'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
                        'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
                        'upper_east', 'upper_west', 'volta', 'western', 'western_north'
                      )),
  logo_url            text check (private.url_ok(logo_url)),
  registration_number text check (char_length(registration_number) <= 60),
  verification_status text not null default 'unverified'
                        check (verification_status in ('unverified', 'pending', 'verified', 'rejected', 'suspended')),
  verification_note   text check (char_length(verification_note) <= 1000),
  verified_at         timestamptz,
  verified_by         uuid references public.profiles (id) on delete set null,
  created_by          uuid default auth.uid() references public.profiles (id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.organisations is
  'Business accounts (and schools, nonprofits, government). Members act for it; admins verify it. Public only when verified, through public_organisations.';
comment on column public.organisations.registration_number is
  'Registrar of Companies or similar number, for verification only. Members and admins read it; never public.';
comment on column public.organisations.verification_status is
  'unverified, pending (asked for review), verified, rejected, suspended. Only verified organisations post opportunities, job briefs and see the talent directory. Changed by request_organisation_verification and admin_set_organisation_verification.';

create index organisations_verification_idx on public.organisations (verification_status, created_at);
create index organisations_verified_by_idx on public.organisations (verified_by);
create index organisations_created_by_idx on public.organisations (created_by);

alter table public.organisations enable row level security;

create trigger organisations_set_updated_at
  before update on public.organisations
  for each row execute function private.set_updated_at();

-- organisation_members --------------------------------------------------------------

create table public.organisation_members (
  organisation_id uuid not null references public.organisations (id) on delete cascade,
  profile_id      uuid not null references public.profiles (id) on delete cascade,
  role            text not null default 'recruiter'
                    check (role in ('owner', 'admin', 'recruiter')),
  status          text not null default 'invited'
                    check (status in ('invited', 'active')),
  invited_by      uuid default auth.uid() references public.profiles (id) on delete set null,
  joined_at       timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  primary key (organisation_id, profile_id),
  check ((status = 'active') = (joined_at is not null))
);

comment on table public.organisation_members is
  'Who acts for an organisation. owner: everything; admin: members and posts; recruiter: posts opportunities and briefs, contacts talent. Invited members accept with accept_organisation_invite (adults only).';

create index organisation_members_profile_idx on public.organisation_members (profile_id);
create index organisation_members_invited_by_idx on public.organisation_members (invited_by);

alter table public.organisation_members enable row level security;

create trigger organisation_members_set_updated_at
  before update on public.organisation_members
  for each row execute function private.set_updated_at();

-- Organisation helpers (definer so policies do not recurse through members RLS).

-- The caller's role in an organisation through an active membership, else null.
create function private.org_role(p_organisation_id uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select m.role from public.organisation_members m
  where m.organisation_id = p_organisation_id
    and m.profile_id = (select auth.uid())
    and m.status = 'active';
$$;

-- Any membership row of the caller, invited or active.
create function private.is_org_invitee_or_member(p_organisation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.organisation_members m
    where m.organisation_id = p_organisation_id and m.profile_id = (select auth.uid())
  );
$$;

create function private.is_verified_org(p_organisation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.organisations o
    where o.id = p_organisation_id and o.verification_status = 'verified'
  );
$$;

-- The caller may post opportunities and job briefs, and contact talent, for
-- this organisation: it is verified and they are an active owner, admin or
-- recruiter.
create function private.can_post_for_org(p_organisation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_verified_org(p_organisation_id)
     and coalesce(private.org_role(p_organisation_id) in ('owner', 'admin', 'recruiter'), false);
$$;

-- The caller is an active member of at least one verified organisation (the
-- talent directory audience).
create function private.is_verified_org_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.organisation_members m
    join public.organisations o on o.id = m.organisation_id
    where m.profile_id = (select auth.uid()) and m.status = 'active'
      and o.verification_status = 'verified'
  );
$$;

revoke execute on function private.org_role(uuid) from public;
revoke execute on function private.is_org_invitee_or_member(uuid) from public;
revoke execute on function private.is_verified_org(uuid) from public;
revoke execute on function private.can_post_for_org(uuid) from public;
revoke execute on function private.is_verified_org_member() from public;
grant execute on function private.org_role(uuid) to anon, authenticated, service_role;
grant execute on function private.is_org_invitee_or_member(uuid) to anon, authenticated, service_role;
grant execute on function private.is_verified_org(uuid) to anon, authenticated, service_role;
grant execute on function private.can_post_for_org(uuid) to anon, authenticated, service_role;
grant execute on function private.is_verified_org_member() to anon, authenticated, service_role;

-- Organisation policies ---------------------------------------------------------------

create policy "Members, invitees, the creator and admins read an organisation"
  on public.organisations for select
  to authenticated
  using (
    created_by = (select auth.uid())
    or private.is_org_invitee_or_member(id)
    or private.is_admin()
  );

create policy "Adults create organisations as themselves"
  on public.organisations for insert
  to authenticated
  with check (created_by = (select auth.uid()) and private.is_adult((select auth.uid())));

create policy "Owners and admins of the organisation edit it"
  on public.organisations for update
  to authenticated
  using (private.org_role(id) in ('owner', 'admin'))
  with check (private.org_role(id) in ('owner', 'admin'));

revoke all on public.organisations from anon, authenticated;
grant select on public.organisations to authenticated;
grant insert (slug, name, kind, description, website, region, logo_url, registration_number, created_by)
  on public.organisations to authenticated;
grant update (slug, name, kind, description, website, region, logo_url, registration_number)
  on public.organisations to authenticated;
grant select, insert, update, delete on public.organisations to service_role;

-- The creator becomes the active owner.
create function private.add_organisation_owner()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.created_by is not null then
    insert into public.organisation_members (organisation_id, profile_id, role, status, invited_by, joined_at)
    values (new.id, new.created_by, 'owner', 'active', new.created_by, now());
  end if;
  return new;
end;
$$;

revoke execute on function private.add_organisation_owner() from public, anon, authenticated;

create trigger organisations_add_owner
  after insert on public.organisations
  for each row execute function private.add_organisation_owner();

-- A verified organisation that changes its name or registration number goes
-- back to pending review, so the badge always matches what was checked.
create function private.organisation_reverify()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.verification_status = 'verified'
     and (new.name is distinct from old.name or new.registration_number is distinct from old.registration_number)
     and not private.is_admin()
     and current_user = 'authenticated' then
    new.verification_status := 'pending';
    new.verified_at := null;
    new.verified_by := null;
  end if;
  return new;
end;
$$;

revoke execute on function private.organisation_reverify() from public, anon, authenticated;

create trigger organisations_reverify
  before update on public.organisations
  for each row execute function private.organisation_reverify();

-- Member policies -------------------------------------------------------------------

create policy "Members see their organisation's members; people see their own invites"
  on public.organisation_members for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or private.org_role(organisation_id) is not null
    or private.is_admin()
  );

-- Owners invite anyone at any role; admins invite admins and recruiters.
create policy "Owners and admins invite members"
  on public.organisation_members for insert
  to authenticated
  with check (
    invited_by = (select auth.uid())
    and (
      private.org_role(organisation_id) = 'owner'
      or (private.org_role(organisation_id) = 'admin' and role <> 'owner')
    )
  );

create policy "Owners and admins change roles"
  on public.organisation_members for update
  to authenticated
  using (
    private.org_role(organisation_id) = 'owner'
    or (private.org_role(organisation_id) = 'admin' and role <> 'owner')
  )
  with check (
    private.org_role(organisation_id) = 'owner'
    or (private.org_role(organisation_id) = 'admin' and role <> 'owner')
  );

create policy "People leave or decline; owners and admins remove members"
  on public.organisation_members for delete
  to authenticated
  using (
    profile_id = (select auth.uid())
    or private.org_role(organisation_id) = 'owner'
    or (private.org_role(organisation_id) = 'admin' and role <> 'owner')
  );

revoke all on public.organisation_members from anon, authenticated;
grant select, delete on public.organisation_members to authenticated;
grant insert (organisation_id, profile_id, role, invited_by) on public.organisation_members to authenticated;
grant update (role) on public.organisation_members to authenticated;
grant select, insert, update, delete on public.organisation_members to service_role;

-- Every organisation keeps at least one active owner, except when the last
-- owner deletes their account (admins then reassign or remove it).
create function private.keep_an_owner()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.role = 'owner' and old.status = 'active'
     and (tg_op = 'DELETE' or new.role <> 'owner')
     -- Deleting the organisation or the person's account cascades here;
     -- neither is blocked (an account can always be deleted).
     and exists (select 1 from public.organisations o where o.id = old.organisation_id)
     and exists (select 1 from public.profiles p where p.id = old.profile_id)
     and not exists (
       select 1 from public.organisation_members m
       where m.organisation_id = old.organisation_id and m.role = 'owner'
         and m.status = 'active' and m.profile_id <> old.profile_id
     ) then
    raise exception 'An organisation needs at least one owner' using errcode = '23514';
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

revoke execute on function private.keep_an_owner() from public, anon, authenticated;

create trigger organisation_members_keep_owner
  before update or delete on public.organisation_members
  for each row execute function private.keep_an_owner();

-- Functions ---------------------------------------------------------------------------

-- The invited person accepts (adults only). Declining is deleting the row.
create function public.accept_organisation_invite(p_organisation_id uuid)
returns public.organisation_members
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.organisation_members;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if not private.is_adult((select auth.uid())) then
    raise exception 'Organisations are for adults only' using errcode = '42501';
  end if;
  update public.organisation_members
     set status = 'active', joined_at = now()
   where organisation_id = p_organisation_id
     and profile_id = (select auth.uid())
     and status = 'invited'
  returning * into v_row;
  if v_row.profile_id is null then
    raise exception 'No invitation to accept' using errcode = 'P0002';
  end if;
  return v_row;
end;
$$;

revoke execute on function public.accept_organisation_invite(uuid) from public, anon;
grant execute on function public.accept_organisation_invite(uuid) to authenticated, service_role;

-- An owner or admin asks for verification (from unverified or rejected).
create function public.request_organisation_verification(p_organisation_id uuid)
returns public.organisations
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_org public.organisations;
begin
  if coalesce(private.org_role(p_organisation_id) not in ('owner', 'admin'), true) then
    raise exception 'Only owners and admins of the organisation can ask' using errcode = '42501';
  end if;
  update public.organisations
     set verification_status = 'pending'
   where id = p_organisation_id and verification_status in ('unverified', 'rejected')
  returning * into v_org;
  if v_org.id is null then
    raise exception 'This organisation is already verified, pending or suspended' using errcode = '22023';
  end if;
  return v_org;
end;
$$;

revoke execute on function public.request_organisation_verification(uuid) from public, anon;
grant execute on function public.request_organisation_verification(uuid) to authenticated, service_role;

create function public.admin_set_organisation_verification(
  p_organisation_id uuid,
  p_status text,
  p_note text default null
)
returns public.organisations
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_org public.organisations;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_status not in ('unverified', 'pending', 'verified', 'rejected', 'suspended') then
    raise exception 'Unknown verification status %', p_status using errcode = '22023';
  end if;
  update public.organisations
     set verification_status = p_status,
         verification_note = p_note,
         verified_at = case when p_status = 'verified' then now() end,
         verified_by = case when p_status = 'verified' then (select auth.uid()) end
   where id = p_organisation_id
  returning * into v_org;
  if v_org.id is null then
    raise exception 'Organisation not found' using errcode = 'P0002';
  end if;
  return v_org;
end;
$$;

revoke execute on function public.admin_set_organisation_verification(uuid, text, text) from public, anon;
grant execute on function public.admin_set_organisation_verification(uuid, text, text) to authenticated, service_role;

-- Views ---------------------------------------------------------------------------------

-- Verified organisations, public columns only (never the registration number
-- or the admin note).
create function private.public_organisation_rows()
returns table (
  id          uuid,
  slug        text,
  name        text,
  kind        text,
  description text,
  website     text,
  region      text,
  logo_url    text,
  verified_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select o.id, o.slug, o.name, o.kind, o.description, o.website, o.region, o.logo_url, o.verified_at
  from public.organisations o
  where o.verification_status = 'verified';
$$;

revoke execute on function private.public_organisation_rows() from public;
grant execute on function private.public_organisation_rows() to anon, authenticated, service_role;

create view public.public_organisations
  with (security_invoker = true)
as
  select * from private.public_organisation_rows();

comment on view public.public_organisations is
  'Verified organisations, public columns only. Readable by anyone. Never add registration_number or verification_note.';

revoke all on public.public_organisations from anon, authenticated;
grant select on public.public_organisations to anon, authenticated, service_role;

-- Members with their names, for the organisation's team page. Active members
-- of the organisation and admins; everyone else gets zero rows.
create function private.organisation_roster_rows()
returns table (
  organisation_id uuid,
  profile_id      uuid,
  display_name    text,
  avatar_url      text,
  role            text,
  status          text,
  joined_at       timestamptz,
  created_at      timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select m.organisation_id, m.profile_id, p.display_name, p.avatar_url, m.role, m.status,
         m.joined_at, m.created_at
  from public.organisation_members m
  join public.profiles p on p.id = m.profile_id
  where private.org_role(m.organisation_id) is not null or private.is_admin();
$$;

revoke execute on function private.organisation_roster_rows() from public;
grant execute on function private.organisation_roster_rows() to authenticated, service_role;

create view public.organisation_roster
  with (security_invoker = true)
as
  select * from private.organisation_roster_rows();

comment on view public.organisation_roster is
  'Organisation members with name and avatar, for active members of that organisation and admins. Never add phone or email.';

revoke all on public.organisation_roster from anon, authenticated;
grant select on public.organisation_roster to authenticated, service_role;
