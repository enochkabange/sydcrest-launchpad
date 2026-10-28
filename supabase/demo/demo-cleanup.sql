-- Removes the SydCrest STAGING demo data loaded by demo-seed.sql, and nothing
-- else. Run in the Supabase SQL editor (postgres role). Safe to run twice.
--
-- What counts as demo: auth users whose email ends @demo.sydcrest.test (their
-- profiles and everything they own cascade), and rows whose id starts
-- de000000-. Real accounts' own rows that point at demo things go with them
-- through the foreign keys (for example a real person's RSVP to a demo event
-- or membership of a demo chapter), because the thing they point at is gone.

begin;

-- Organisations first: the "keep an owner" rule allows removing members only
-- once the organisation itself is going. Cascades members, their briefs,
-- opportunities and talent contact requests.
delete from public.organisations where id::text like 'de000000-%';

-- Opportunities posted without an organisation.
delete from public.opportunities where id::text like 'de000000-%';

-- Events (RSVPs, check ins, feedback and access codes cascade).
delete from public.community_events where id::text like 'de000000-%';

-- Demo people. Profiles cascade from auth.users, and from profiles every row a
-- demo person owns: progress, achievements, submissions, peer reviews,
-- bookings, reviews, offers, pitches, briefs, certificates, cohort places,
-- applications, posts, replies, reactions, follows, consents, notifications,
-- verified skills, talent listings, saves, outcomes and reports.
delete from auth.users where email like '%@demo.sydcrest.test';

-- Cohorts (after the people, because their submissions block deletion).
delete from public.cohorts where id::text like 'de000000-%';

-- Chapters (members and chapter posts cascade).
delete from public.chapters where id::text like 'de000000-%';

-- Demo skills, only ever created when the catalogue was empty (assessments,
-- attempts, verified skills and roadmap links cascade).
delete from public.skills where id::text like 'de000000-%';

-- Anything else with a demo id that did not cascade.
delete from public.notifications where id::text like 'de000000-%';
delete from public.reports where id::text like 'de000000-%';

-- Fail loudly if anything demo is left.
do $$
declare
  v_left text;
begin
  select string_agg(t || ': ' || n, ', ') into v_left from (
    select 'auth.users' as t, count(*) as n from auth.users where email like '%@demo.sydcrest.test'
    union all select 'profiles', count(*) from public.profiles where id::text like 'de000000-%'
    union all select 'organisations', count(*) from public.organisations where id::text like 'de000000-%'
    union all select 'opportunities', count(*) from public.opportunities where id::text like 'de000000-%'
    union all select 'community_events', count(*) from public.community_events where id::text like 'de000000-%'
    union all select 'cohorts', count(*) from public.cohorts where id::text like 'de000000-%'
    union all select 'chapters', count(*) from public.chapters where id::text like 'de000000-%'
    union all select 'skills', count(*) from public.skills where id::text like 'de000000-%'
    union all select 'submissions', count(*) from public.submissions where id::text like 'de000000-%'
    union all select 'community_posts', count(*) from public.community_posts where id::text like 'de000000-%'
    union all select 'booking_requests', count(*) from public.booking_requests where id::text like 'de000000-%'
    union all select 'certificates', count(*) from public.certificates where id::text like 'de000000-%'
  ) x where n > 0;
  if v_left is not null then
    raise exception 'Demo rows left behind: %', v_left;
  end if;
end $$;

commit;
