-- Market and Earn, part 4 (issue #148): the opportunities board, saved and
-- applied markers, and learner reported outcomes for the North Star metric
-- (a verifiable opportunity within 6 months of a cohort).
--
-- Opportunities link out: people apply on the poster's own site or by the
-- instructions given. SydCrest records only that a learner saved or applied.

-- opportunities ---------------------------------------------------------------------

create table public.opportunities (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique
                       check (slug ~ '^[a-z0-9][a-z0-9-]{1,78}[a-z0-9]$'),
  kind               text not null check (kind in ('job', 'internship', 'scholarship', 'grant', 'gig')),
  title              text not null check (char_length(title) between 1 and 140),
  summary            text check (char_length(summary) <= 300),
  description        text not null check (char_length(description) between 1 and 8000),
  organisation_id    uuid references public.organisations (id) on delete cascade,
  organisation_name  text not null check (char_length(organisation_name) between 1 and 120),
  posted_by          uuid default auth.uid() references public.profiles (id) on delete set null,
  apply_url          text check (private.url_ok(apply_url)),
  apply_instructions text check (char_length(apply_instructions) <= 1000),
  location           text check (char_length(location) <= 120),
  region             text check (region in (
                       'ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern',
                       'greater_accra', 'north_east', 'northern', 'oti', 'savannah',
                       'upper_east', 'upper_west', 'volta', 'western', 'western_north'
                     )),
  is_remote          boolean not null default false,
  deadline           date,
  eligibility        text check (char_length(eligibility) <= 2000),
  fields             text[] not null default '{}' check (cardinality(fields) <= 5),
  skills             text[] not null default '{}' check (cardinality(skills) <= 20),
  tracks             text[] not null default '{}' check (cardinality(tracks) <= 10),
  compensation_note  text check (char_length(compensation_note) <= 200),
  source_url         text check (private.url_ok(source_url)),
  status             text not null default 'draft' check (status in ('draft', 'open', 'closed')),
  published_at       timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table public.opportunities is
  'Jobs, internships, scholarships, grants and gigs. Posted by admins (organisation_id null, organisation_name typed) or by a verified organisation''s owner, admin or recruiter. Public while open and before the deadline (Africa/Accra date).';
comment on column public.opportunities.organisation_name is
  'Shown as the poster. For an organisation''s own post the database copies the organisation''s name, so nobody can post as someone else.';
comment on column public.opportunities.tracks is
  'Roadmap track slugs this suits, for matching against a learner''s path.';
comment on column public.opportunities.compensation_note is
  'Display text such as "Paid internship" or "Fully funded". No payment happens on SydCrest.';
comment on column public.opportunities.source_url is
  'Where an admin found an external opportunity, for checking it is real.';

create index opportunities_board_idx on public.opportunities (status, deadline);
create index opportunities_kind_idx on public.opportunities (kind, status);
create index opportunities_organisation_idx on public.opportunities (organisation_id);
create index opportunities_posted_by_idx on public.opportunities (posted_by);
create index opportunities_tracks_idx on public.opportunities using gin (tracks);
create index opportunities_skills_idx on public.opportunities using gin (skills);

alter table public.opportunities enable row level security;

create trigger opportunities_set_updated_at
  before update on public.opportunities
  for each row execute function private.set_updated_at();

create function private.prepare_opportunity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.organisation_id is not null then
    select o.name into new.organisation_name from public.organisations o where o.id = new.organisation_id;
  end if;
  if new.status = 'open' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;

revoke execute on function private.prepare_opportunity() from public, anon, authenticated;

create trigger opportunities_prepare
  before insert or update on public.opportunities
  for each row execute function private.prepare_opportunity();

create policy "Open opportunities before their deadline are public; posters and admins see all"
  on public.opportunities for select
  to anon, authenticated
  using (
    (status = 'open' and (deadline is null or deadline >= (now() at time zone 'Africa/Accra')::date))
    or private.is_admin()
    or (organisation_id is not null and private.org_role(organisation_id) is not null)
  );

create policy "Admins and verified organisations post opportunities"
  on public.opportunities for insert
  to authenticated
  with check (
    posted_by = (select auth.uid())
    and (
      private.is_admin()
      or (organisation_id is not null
          and private.can_post_for_org(organisation_id)
          and private.is_adult((select auth.uid())))
    )
  );

create policy "Admins and the posting organisation edit opportunities"
  on public.opportunities for update
  to authenticated
  using (private.is_admin() or (organisation_id is not null and private.can_post_for_org(organisation_id)))
  with check (private.is_admin() or (organisation_id is not null and private.can_post_for_org(organisation_id)));

create policy "Admins delete; organisations delete their drafts"
  on public.opportunities for delete
  to authenticated
  using (
    private.is_admin()
    or (organisation_id is not null and status = 'draft' and private.can_post_for_org(organisation_id))
  );

revoke all on public.opportunities from anon, authenticated;
grant select on public.opportunities to anon, authenticated;
grant insert (slug, kind, title, summary, description, organisation_id, organisation_name, posted_by,
              apply_url, apply_instructions, location, region, is_remote, deadline, eligibility,
              fields, skills, tracks, compensation_note, source_url, status)
  on public.opportunities to authenticated;
grant update (slug, kind, title, summary, description, organisation_name, apply_url,
              apply_instructions, location, region, is_remote, deadline, eligibility,
              fields, skills, tracks, compensation_note, source_url, status)
  on public.opportunities to authenticated;
grant delete on public.opportunities to authenticated;
grant select, insert, update, delete on public.opportunities to service_role;

-- opportunity_saves --------------------------------------------------------------------

create table public.opportunity_saves (
  profile_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  opportunity_id uuid not null references public.opportunities (id) on delete cascade,
  status         text not null default 'saved' check (status in ('saved', 'applied')),
  applied_at     timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  primary key (profile_id, opportunity_id),
  check ((status = 'applied') = (applied_at is not null))
);

comment on table public.opportunity_saves is
  'A learner''s private saved or applied marker. Only the learner (and admins) see it; posters never do.';

create index opportunity_saves_opportunity_idx on public.opportunity_saves (opportunity_id);

alter table public.opportunity_saves enable row level security;

create trigger opportunity_saves_set_updated_at
  before update on public.opportunity_saves
  for each row execute function private.set_updated_at();

create function private.stamp_applied()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status = 'applied' then
    new.applied_at := coalesce(case when tg_op = 'UPDATE' then old.applied_at end, now());
  else
    new.applied_at := null;
  end if;
  return new;
end;
$$;

revoke execute on function private.stamp_applied() from public, anon, authenticated;

create trigger opportunity_saves_stamp_applied
  before insert or update on public.opportunity_saves
  for each row execute function private.stamp_applied();

create policy "Learners read their own saves; admins read all"
  on public.opportunity_saves for select
  to authenticated
  using (profile_id = (select auth.uid()) or private.is_admin());

create policy "Learners save as themselves"
  on public.opportunity_saves for insert
  to authenticated
  with check (profile_id = (select auth.uid()));

create policy "Learners change their own saves"
  on public.opportunity_saves for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

create policy "Learners remove their own saves"
  on public.opportunity_saves for delete
  to authenticated
  using (profile_id = (select auth.uid()));

revoke all on public.opportunity_saves from anon, authenticated;
grant select, delete on public.opportunity_saves to authenticated;
grant insert (profile_id, opportunity_id, status) on public.opportunity_saves to authenticated;
grant update (status) on public.opportunity_saves to authenticated;
grant select, insert, update, delete on public.opportunity_saves to service_role;

-- outcomes ---------------------------------------------------------------------------------

create table public.outcomes (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  type                text not null check (type in (
                        'job', 'internship', 'freelance_contract', 'scholarship', 'grant'
                      )),
  title               text check (char_length(title) <= 140),
  organisation_name   text not null check (char_length(organisation_name) between 1 and 120),
  organisation_id     uuid references public.organisations (id) on delete set null,
  opportunity_id      uuid references public.opportunities (id) on delete set null,
  started_on          date not null check (started_on >= date '2020-01-01'),
  evidence_url        text check (private.url_ok(evidence_url)),
  evidence_note       text check (char_length(evidence_note) <= 1000),
  show_on_profile     boolean not null default false,
  verification_status text not null default 'pending'
                        check (verification_status in ('pending', 'verified', 'rejected')),
  verification_note   text check (char_length(verification_note) <= 1000),
  verified_by         uuid references public.profiles (id) on delete set null,
  verified_at         timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  check ((verification_status = 'verified') = (verified_at is not null))
);

comment on table public.outcomes is
  'A learner reported result (job, internship, freelance contract, scholarship, grant) with evidence. Counts toward the North Star and the impact page only once an admin verifies it (admin_verify_outcome).';
comment on column public.outcomes.started_on is
  'The date the outcome began (start date or award date); the North Star window is measured on it.';
comment on column public.outcomes.show_on_profile is
  'The learner''s choice to show a verified outcome on their profile. Off by default.';

create index outcomes_profile_idx on public.outcomes (profile_id);
create index outcomes_queue_idx on public.outcomes (verification_status, created_at);
create index outcomes_organisation_idx on public.outcomes (organisation_id);
create index outcomes_opportunity_idx on public.outcomes (opportunity_id);
create index outcomes_verified_by_idx on public.outcomes (verified_by);

alter table public.outcomes enable row level security;

create trigger outcomes_set_updated_at
  before update on public.outcomes
  for each row execute function private.set_updated_at();

-- Learners edit pending or rejected outcomes (an edit to a rejected one sends
-- it back for review). Once verified, only show_on_profile changes, so a
-- verified fact cannot be quietly rewritten. Admin functions run as the
-- owner and are not limited.
create function private.guard_outcome_edit()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if current_user <> 'authenticated' then
    return new;
  end if;
  if old.verification_status = 'verified' then
    if (to_jsonb(new) - 'show_on_profile' - 'updated_at') <> (to_jsonb(old) - 'show_on_profile' - 'updated_at') then
      raise exception 'A verified outcome cannot be changed; report a new one instead' using errcode = '42501';
    end if;
  elsif old.verification_status = 'rejected'
        and (to_jsonb(new) - 'show_on_profile' - 'updated_at') <> (to_jsonb(old) - 'show_on_profile' - 'updated_at') then
    new.verification_status := 'pending';
    new.verification_note := null;
  end if;
  return new;
end;
$$;

revoke execute on function private.guard_outcome_edit() from public, anon, authenticated;

create trigger outcomes_guard_edit
  before update on public.outcomes
  for each row execute function private.guard_outcome_edit();

create policy "Learners read their own outcomes; admins read all"
  on public.outcomes for select
  to authenticated
  using (profile_id = (select auth.uid()) or private.is_admin());

create policy "Learners report outcomes as themselves"
  on public.outcomes for insert
  to authenticated
  with check (profile_id = (select auth.uid()));

create policy "Learners edit their own outcomes"
  on public.outcomes for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

create policy "Learners delete their own outcomes"
  on public.outcomes for delete
  to authenticated
  using (profile_id = (select auth.uid()));

revoke all on public.outcomes from anon, authenticated;
grant select, delete on public.outcomes to authenticated;
grant insert (profile_id, type, title, organisation_name, organisation_id, opportunity_id,
              started_on, evidence_url, evidence_note, show_on_profile)
  on public.outcomes to authenticated;
grant update (type, title, organisation_name, organisation_id, opportunity_id,
              started_on, evidence_url, evidence_note, show_on_profile)
  on public.outcomes to authenticated;
grant select, insert, update, delete on public.outcomes to service_role;

create function public.admin_verify_outcome(
  p_outcome_id uuid,
  p_status text,
  p_note text default null
)
returns public.outcomes
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.outcomes;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_status not in ('pending', 'verified', 'rejected') then
    raise exception 'Unknown verification status %', p_status using errcode = '22023';
  end if;
  update public.outcomes
     set verification_status = p_status, verification_note = p_note,
         verified_at = case when p_status = 'verified' then now() end,
         verified_by = case when p_status = 'verified' then (select auth.uid()) end
   where id = p_outcome_id
  returning * into v_row;
  if v_row.id is null then
    raise exception 'Outcome not found' using errcode = 'P0002';
  end if;
  return v_row;
end;
$$;

revoke execute on function public.admin_verify_outcome(uuid, text, text) from public, anon;
grant execute on function public.admin_verify_outcome(uuid, text, text) to authenticated, service_role;

-- North Star: per cohort, how many learners had a verified outcome that began
-- between the cohort start and p_months after its last week. A cohort ends
-- starts_on + 7 x (its programme's highest week number) days, the due date of
-- the last week (cohorts store no end date). Admins only.
create function public.admin_cohort_outcomes(p_months integer default 6)
returns table (
  cohort_id      uuid,
  program_id     uuid,
  program_title  text,
  cohort_name    text,
  cohort_status  text,
  starts_on      date,
  ends_on        date,
  window_ends_on date,
  learners       integer,
  completed      integer,
  certified      integer,
  placed         integer
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_months is null or p_months not between 1 and 36 then
    raise exception 'Months must be between 1 and 36' using errcode = '22023';
  end if;
  return query
  with c as (
    select co.id, co.program_id, pr.title, co.name, co.status, co.starts_on,
           (co.starts_on + 7 * coalesce((select max(w.week_number) from public.program_weeks w
                                          where w.program_id = co.program_id), 0))::date as ends_on
    from public.cohorts co
    join public.programs pr on pr.id = co.program_id
  )
  select c.id, c.program_id, c.title, c.name, c.status, c.starts_on, c.ends_on,
         (c.ends_on + make_interval(months => p_months))::date,
         (select count(*)::integer from public.cohort_members m
            where m.cohort_id = c.id and m.role = 'learner'),
         (select count(*)::integer from public.cohort_members m
            where m.cohort_id = c.id and m.role = 'learner' and m.status = 'completed'),
         (select count(*)::integer from public.certificates ce
            where ce.cohort_id = c.id and ce.revoked_at is null),
         (select count(distinct m.profile_id)::integer
            from public.cohort_members m
            join public.outcomes o on o.profile_id = m.profile_id
            where m.cohort_id = c.id and m.role = 'learner'
              and o.verification_status = 'verified'
              and o.started_on between c.starts_on and (c.ends_on + make_interval(months => p_months))::date)
  from c
  order by c.starts_on desc;
end;
$$;

revoke execute on function public.admin_cohort_outcomes(integer) from public, anon;
grant execute on function public.admin_cohort_outcomes(integer) to authenticated, service_role;

-- Public impact numbers: verified outcomes only, by type. Counts, never names.
create function private.public_outcome_stat_rows()
returns table (
  type             text,
  verified_count   integer,
  verified_people  integer
)
language sql
stable
security definer
set search_path = ''
as $$
  select o.type, count(*)::integer, count(distinct o.profile_id)::integer
  from public.outcomes o
  where o.verification_status = 'verified'
  group by o.type;
$$;

revoke execute on function private.public_outcome_stat_rows() from public;
grant execute on function private.public_outcome_stat_rows() to anon, authenticated, service_role;

create view public.public_outcome_stats
  with (security_invoker = true)
as
  select * from private.public_outcome_stat_rows();

comment on view public.public_outcome_stats is
  'Verified outcomes counted by type, for the public impact page. No rows until something is verified. Never add names or organisations.';

revoke all on public.public_outcome_stats from anon, authenticated;
grant select on public.public_outcome_stats to anon, authenticated, service_role;

-- Admin verification queue with the learner's name.
create function private.outcome_queue_rows()
returns table (
  id                  uuid,
  profile_id          uuid,
  display_name        text,
  avatar_url          text,
  region              text,
  type                text,
  title               text,
  organisation_name   text,
  organisation_id     uuid,
  opportunity_id      uuid,
  started_on          date,
  evidence_url        text,
  evidence_note       text,
  verification_status text,
  verification_note   text,
  verified_at         timestamptz,
  created_at          timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select o.id, o.profile_id, p.display_name, p.avatar_url, p.region, o.type, o.title,
         o.organisation_name, o.organisation_id, o.opportunity_id, o.started_on,
         o.evidence_url, o.evidence_note, o.verification_status, o.verification_note,
         o.verified_at, o.created_at
  from public.outcomes o
  join public.profiles p on p.id = o.profile_id
  where private.is_admin();
$$;

revoke execute on function private.outcome_queue_rows() from public;
grant execute on function private.outcome_queue_rows() to authenticated, service_role;

create view public.outcome_queue
  with (security_invoker = true)
as
  select * from private.outcome_queue_rows();

comment on view public.outcome_queue is
  'Reported outcomes with the learner''s name, for the admin verification queue. Admins only. Never add phone or email.';

revoke all on public.outcome_queue from anon, authenticated;
grant select on public.outcome_queue to authenticated, service_role;
