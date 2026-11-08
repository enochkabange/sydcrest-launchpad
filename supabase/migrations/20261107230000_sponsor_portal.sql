-- Sponsor portal (#307).
--
-- Founder decision, 7 Nov 2026: sponsors see totals, plus stories learners
-- agree to. An admin records a sponsorship (an organisation funds a
-- programme, one cohort or a chapter, at a tier, with seats); the sponsor's
-- owners and admins see its impact under /org/[slug]/impact.
--
-- Totals only, and any count under 5 comes back as null ("fewer than 5") so
-- nobody can be picked out. Names appear only for learners who wrote a story
-- and chose to be featured by name; an admin can hide a story.

create table public.sponsorships (
  id              uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations (id) on delete cascade,
  scope           text not null check (scope in ('programme', 'cohort', 'chapter')),
  program_id      uuid references public.programs (id) on delete cascade,
  cohort_id       uuid references public.cohorts (id) on delete cascade,
  chapter_id      uuid references public.chapters (id) on delete cascade,
  tier            text not null check (tier in ('gold', 'silver', 'bronze', 'partner')),
  seats           integer check (seats between 0 and 10000),
  starts_on       date not null,
  ends_on         date,
  note            text check (char_length(note) <= 500),
  created_by      uuid default auth.uid() references public.profiles (id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  check ((scope = 'programme') = (program_id is not null)),
  check ((scope = 'cohort') = (cohort_id is not null)),
  check ((scope = 'chapter') = (chapter_id is not null)),
  check (ends_on is null or ends_on >= starts_on)
);

comment on table public.sponsorships is
  'An organisation funding a programme, a cohort or a chapter (#307). Admins record them; the organisation''s members read their own and see totals through sponsorship_impact.';

create index sponsorships_organisation_idx on public.sponsorships (organisation_id);
create index sponsorships_program_idx on public.sponsorships (program_id);
create index sponsorships_cohort_idx on public.sponsorships (cohort_id);
create index sponsorships_chapter_idx on public.sponsorships (chapter_id);
create index sponsorships_created_by_idx on public.sponsorships (created_by);

alter table public.sponsorships enable row level security;

create trigger sponsorships_set_updated_at
  before update on public.sponsorships
  for each row execute function private.set_updated_at();

create policy "Sponsors read their own sponsorships; admins read all"
  on public.sponsorships for select
  to authenticated
  using ((select private.is_admin()) or private.org_role(organisation_id) is not null);

create policy "Admins record sponsorships"
  on public.sponsorships for insert to authenticated with check ((select private.is_admin()));
create policy "Admins edit sponsorships"
  on public.sponsorships for update to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete sponsorships"
  on public.sponsorships for delete to authenticated using ((select private.is_admin()));

revoke all on public.sponsorships from anon, authenticated;
grant select, insert, update, delete on public.sponsorships to authenticated;
grant select, insert, update, delete on public.sponsorships to service_role;

-- Learner stories --------------------------------------------------------------

create table public.learner_stories (
  profile_id  uuid primary key default auth.uid() references public.profiles (id) on delete cascade,
  story       text not null check (char_length(btrim(story)) between 40 and 1500),
  show_name   boolean not null default false,
  hidden_at   timestamptz,
  hidden_by   uuid references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.learner_stories is
  'A learner''s own story for sponsors (#307). Shown only to sponsors of a programme, cohort or chapter the learner belongs to, by name only with show_name. Deleting it withdraws it; admins can hide it.';

create index learner_stories_hidden_by_idx on public.learner_stories (hidden_by);

alter table public.learner_stories enable row level security;

create trigger learner_stories_set_updated_at
  before update on public.learner_stories
  for each row execute function private.set_updated_at();

create policy "Learners and admins read stories"
  on public.learner_stories for select
  to authenticated
  using (profile_id = (select auth.uid()) or (select private.is_admin()));
create policy "Learners write their own story"
  on public.learner_stories for insert
  to authenticated
  with check (profile_id = (select auth.uid()));
create policy "Learners edit their own story; admins hide"
  on public.learner_stories for update
  to authenticated
  using (profile_id = (select auth.uid()) or (select private.is_admin()))
  with check (profile_id = (select auth.uid()) or (select private.is_admin()));
create policy "Learners delete their own story"
  on public.learner_stories for delete
  to authenticated
  using (profile_id = (select auth.uid()));

revoke all on public.learner_stories from anon, authenticated;
grant select, delete on public.learner_stories to authenticated;
grant insert (story, show_name), update (story, show_name, hidden_at, hidden_by) on public.learner_stories to authenticated;
grant select, insert, update, delete on public.learner_stories to service_role;

-- Only admins hide or unhide; a learner editing their story cannot unhide it.
create function private.guard_story_hiding()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (new.hidden_at is distinct from old.hidden_at or new.hidden_by is distinct from old.hidden_by)
     and not private.is_admin() then
    raise exception 'Only admins hide stories' using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke execute on function private.guard_story_hiding() from public, anon, authenticated;

create trigger learner_stories_guard_hiding
  before update on public.learner_stories
  for each row execute function private.guard_story_hiding();

-- Impact -----------------------------------------------------------------------

-- The learners a sponsorship covers: programme or cohort learners (cohort
-- members with the learner role), or chapter members.
create function private.sponsorship_learners(p_sponsorship_id uuid)
returns table (profile_id uuid, member_status text)
language sql
stable
security definer
set search_path = ''
as $$
  select m.profile_id, m.status
  from public.sponsorships s
  join public.cohorts c on (s.scope = 'cohort' and c.id = s.cohort_id) or (s.scope = 'programme' and c.program_id = s.program_id)
  join public.cohort_members m on m.cohort_id = c.id and m.role = 'learner'
  where s.id = p_sponsorship_id
  union
  select m.profile_id, 'active'
  from public.sponsorships s
  join public.chapter_members m on s.scope = 'chapter' and m.chapter_id = s.chapter_id
  where s.id = p_sponsorship_id;
$$;

revoke execute on function private.sponsorship_learners(uuid) from public, anon, authenticated;
grant execute on function private.sponsorship_learners(uuid) to service_role;

create function private.can_view_sponsorship(p_sponsorship_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin() or exists (
    select 1 from public.sponsorships s
    where s.id = p_sponsorship_id and private.org_role(s.organisation_id) in ('owner', 'admin')
  );
$$;

revoke execute on function private.can_view_sponsorship(uuid) from public;
grant execute on function private.can_view_sponsorship(uuid) to authenticated, service_role;

-- Counts under 5 come back as null, so a small group cannot be picked out.
create function private.at_least_five(p_count bigint)
returns integer
language sql
immutable
set search_path = ''
as $$
  select case when p_count >= 5 then p_count::integer end;
$$;

revoke execute on function private.at_least_five(bigint) from public, anon, authenticated;
grant execute on function private.at_least_five(bigint) to service_role;

create function public.sponsorship_impact(p_sponsorship_id uuid)
returns table (
  learners          integer,
  active            integer,
  finished          integer,
  certificates      integer,
  verified_outcomes integer,
  stories           integer
)
language sql
stable
security definer
set search_path = ''
as $$
  with people as (
    select distinct profile_id, member_status from private.sponsorship_learners(p_sponsorship_id)
  )
  select
    private.at_least_five((select count(distinct profile_id) from people)),
    private.at_least_five((select count(distinct profile_id) from people where member_status = 'active')),
    private.at_least_five((select count(distinct profile_id) from people where member_status = 'completed')),
    private.at_least_five((
      select count(*) from public.certificates cert
      join public.sponsorships s on s.id = p_sponsorship_id
      where cert.profile_id in (select profile_id from people) and cert.revoked_at is null
        and (s.scope = 'chapter' or cert.program_id = coalesce(s.program_id, (select c.program_id from public.cohorts c where c.id = s.cohort_id)))
    )),
    private.at_least_five((
      select count(*) from public.outcomes o
      where o.profile_id in (select profile_id from people) and o.verification_status = 'verified'
    )),
    (select count(*)::integer from public.learner_stories st where st.profile_id in (select profile_id from people) and st.hidden_at is null)
  where private.can_view_sponsorship(p_sponsorship_id);
$$;

revoke execute on function public.sponsorship_impact(uuid) from public, anon;
grant execute on function public.sponsorship_impact(uuid) to authenticated, service_role;

-- Stories from the learners a sponsorship covers. A name only when the
-- learner chose to show it.
create function public.sponsorship_stories(p_sponsorship_id uuid)
returns table (display_name text, story text, updated_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select case when st.show_name then p.display_name end, st.story, st.updated_at
  from public.learner_stories st
  join public.profiles p on p.id = st.profile_id
  where st.hidden_at is null
    and st.profile_id in (select profile_id from private.sponsorship_learners(p_sponsorship_id))
    and private.can_view_sponsorship(p_sponsorship_id)
  order by st.updated_at desc
  limit 50;
$$;

revoke execute on function public.sponsorship_stories(uuid) from public, anon;
grant execute on function public.sponsorship_stories(uuid) to authenticated, service_role;
