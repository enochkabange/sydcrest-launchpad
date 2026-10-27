-- Schema B (issue #158): events, RSVPs with capacity and waitlist, check in by
-- code (verified server side), feedback and recordings.
begin;
create extension if not exists pgtap with schema extensions;
select plan(51);

-- People: Wumpini and Abdul-Rahman RSVP; Mariama leads Tamale; Fuseini is an
-- admin; Adisa never RSVPs; Zulaiha leads Bolgatanga.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama'),
  ('77777777-7777-7777-7777-777777777777', 'adisa@example.test', 'Adisa Iddrisu'),
  ('88888888-8888-8888-8888-888888888888', 'zulaiha@example.test', 'Zulaiha Abdulai')
) as u(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.chapters (id, slug, name, region, city, status) values
  ('c1000000-0000-0000-0000-000000000001', 'tamale', 'Tamale', 'northern', 'Tamale', 'active'),
  ('c1000000-0000-0000-0000-000000000002', 'bolgatanga', 'Bolgatanga', 'upper_east', 'Bolgatanga', 'active');
insert into public.chapter_members (chapter_id, profile_id, role) values
  ('c1000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'lead'),
  ('c1000000-0000-0000-0000-000000000002', '88888888-8888-8888-8888-888888888888', 'lead');

-- A Tamale Skillshop happening now with one seat, a draft, and a future webinar.
insert into public.community_events (id, slug, kind, title, format, starts_at, ends_at, venue_name, city, region, chapter_id, capacity, status) values
  ('e0000000-0000-0000-0000-000000000001', 'tamale-skillshop', 'skillshop', 'Tamale Skillshop', 'in_person',
   now() - interval '30 minutes', now() + interval '2 hours', 'Tamale hub', 'Tamale', 'northern',
   'c1000000-0000-0000-0000-000000000001', 1, 'published'),
  ('e0000000-0000-0000-0000-000000000002', 'tamale-draft', 'skillshop', 'Draft Skillshop', 'in_person',
   now() + interval '30 days', now() + interval '30 days 3 hours', null, 'Tamale', 'northern',
   'c1000000-0000-0000-0000-000000000001', null, 'draft');
insert into public.community_events (id, slug, kind, title, format, starts_at, ends_at, status) values
  ('e0000000-0000-0000-0000-000000000003', 'become-a-data-analyst', 'webinar', 'How to become a data analyst', 'online',
   now() + interval '7 days', now() + interval '7 days 1 hour', 'published');
update public.event_access set join_url = 'https://meet.example.test/webinar' where event_id = 'e0000000-0000-0000-0000-000000000003';
insert into public.event_recordings (event_id, title, video_url, is_published) values
  ('e0000000-0000-0000-0000-000000000003', 'Webinar recording', 'https://video.example.test/1', true),
  ('e0000000-0000-0000-0000-000000000003', 'Unedited cut', 'https://video.example.test/2', false);
select set_config('t.code', (select checkin_code from public.event_access where event_id = 'e0000000-0000-0000-0000-000000000001'), true);

select ok((select count(*) = 3 from public.event_access), 'every event gets an access row');
select matches(current_setting('t.code'), '^[A-HJ-NP-Z2-9]{8}$', 'check in codes are eight readable characters');
select throws_ok(
  $$ update public.community_events set status = 'published' where id = 'e0000000-0000-0000-0000-000000000002' $$,
  '23514', null, 'an in person event needs a venue before it is published');

-- Signed out ------------------------------------------------------------------
set local role anon;
select results_eq(
  $$ select slug from public.community_events order by slug $$,
  $$ values ('become-a-data-analyst'), ('tamale-skillshop') $$, 'anon reads published events, not drafts');
select throws_ok($$ select * from public.event_access $$, '42501', null, 'anon cannot read join links or codes');
select throws_ok($$ select * from public.event_rsvps $$, '42501', null, 'anon cannot read RSVPs');
select throws_ok($$ select public.rsvp_event('e0000000-0000-0000-0000-000000000001') $$, '42501', null, 'anon cannot RSVP');
select results_eq(
  $$ select title from public.event_recordings $$,
  $$ values ('Webinar recording') $$, 'anon reads published recordings only');
select results_eq(
  $$ select going_count, seats_left from public.event_attendance where event_id = 'e0000000-0000-0000-0000-000000000001' $$,
  $$ values (0, 1) $$, 'anon reads real attendance counts');

-- Wumpini takes the only seat --------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select is(public.rsvp_event('e0000000-0000-0000-0000-000000000001'), 'going', 'the first RSVP gets the seat');
select is(public.rsvp_event('e0000000-0000-0000-0000-000000000001'), 'going', 'repeating an RSVP keeps it');
select throws_ok(
  $$ insert into public.event_rsvps (event_id, profile_id, status) values ('e0000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'going') $$,
  '42501', null, 'nobody writes RSVPs directly');
select throws_ok(
  $$ select public.rsvp_event('e0000000-0000-0000-0000-000000000002') $$,
  'P0002', null, 'nobody RSVPs to a draft');
select is((select count(*)::int from public.event_access), 0, 'learners cannot read codes or links');
select is((select count(*)::int from public.community_events where status = 'draft'), 0, 'learners cannot see drafts');
select throws_ok(
  $$ insert into public.event_checkins (event_id, profile_id, method) values ('e0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'code') $$,
  '42501', null, 'nobody writes check ins directly');
select throws_ok(
  $$ select public.check_in_event('e0000000-0000-0000-0000-000000000001', 'WRONG234') $$,
  '22023', 'Wrong code', 'cannot check in with the wrong code');
select throws_ok(
  $$ select public.check_in_event('e0000000-0000-0000-0000-000000000001', null) $$,
  '22023', 'Wrong code', 'cannot check in without the code');
select throws_ok(
  $$ select public.check_in_event('e0000000-0000-0000-0000-000000000003', 'ABCDEFGH') $$,
  '22023', 'Check in is not open', 'cannot check in before the event');
select throws_ok(
  $$ insert into public.event_feedback (event_id, usefulness) values ('e0000000-0000-0000-0000-000000000001', 5) $$,
  '42501', null, 'no feedback without checking in');
select throws_ok(
  $$ select public.rotate_event_checkin_code('e0000000-0000-0000-0000-000000000001') $$,
  '42501', null, 'learners cannot rotate the code');
select throws_ok(
  $$ insert into public.event_recordings (event_id, title, video_url) values ('e0000000-0000-0000-0000-000000000003', 'Mine', 'https://video.example.test/x') $$,
  '42501', null, 'learners cannot add recordings');

-- Abdul-Rahman joins the waitlist -------------------------------------------
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is(public.rsvp_event('e0000000-0000-0000-0000-000000000001'), 'waitlisted', 'past capacity, RSVPs are waitlisted');
select results_eq(
  $$ select going_count, waitlist_count, seats_left from public.event_attendance where event_id = 'e0000000-0000-0000-0000-000000000001' $$,
  $$ values (1, 1, 0) $$, 'counts show the waitlist');
select is((select count(*)::int from public.event_rsvps), 1, 'people read only their own RSVPs');
select is((select count(*)::int from public.event_attendees), 0, 'learners cannot read the attendee list');

-- Wumpini cancels: Abdul-Rahman moves up and is told
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select lives_ok($$ select public.cancel_rsvp('e0000000-0000-0000-0000-000000000001') $$, 'a learner cancels');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select status from public.event_rsvps where event_id = 'e0000000-0000-0000-0000-000000000001'),
  'going', 'the first waitlisted person gets the freed seat');
select is((select count(*)::int from public.notifications where kind = 'event_waitlist_promoted'), 1,
  'and is notified');
select lives_ok(
  $$ select public.check_in_event('e0000000-0000-0000-0000-000000000001', lower(substr(current_setting('t.code'), 1, 4)) || ' ' || substr(current_setting('t.code'), 5)) $$,
  'checking in with the code ignores case and spaces');
select is((select method from public.event_checkins where event_id = 'e0000000-0000-0000-0000-000000000001'), 'code',
  'the check in is recorded');
select lives_ok(
  $$ insert into public.event_feedback (event_id, confidence, usefulness, recommend, attend_again, comment, quote_consent)
     values ('e0000000-0000-0000-0000-000000000001', 4, 5, 9, true, 'Clear and practical', true) $$,
  'attendees give feedback');
select throws_ok(
  $$ insert into public.event_feedback (event_id, profile_id, usefulness) values ('e0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 1) $$,
  '42501', null, 'nobody gives feedback as someone else');
select throws_ok(
  $$ select public.event_join_link('e0000000-0000-0000-0000-000000000003') $$,
  '42501', null, 'the join link needs an RSVP');
select is(public.rsvp_event('e0000000-0000-0000-0000-000000000003'), 'going', 'unlimited events always have a seat');
select is(public.event_join_link('e0000000-0000-0000-0000-000000000003'), 'https://meet.example.test/webinar',
  'people going get the join link');

-- Mariama hosts Tamale events -------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.community_events where status = 'draft'), 1, 'a lead sees their chapter''s drafts');
select is((select checkin_code from public.event_access where event_id = 'e0000000-0000-0000-0000-000000000001'),
  current_setting('t.code'), 'a lead reads the check in code for their event');
select is((select count(*)::int from public.event_access where event_id = 'e0000000-0000-0000-0000-000000000003'), 0,
  'but not for events they do not host');
select results_eq(
  $$ select display_name, rsvp_status, checked_in_at is not null from public.event_attendees order by display_name $$,
  $$ values ('Abdul-Rahman Issah', 'going', true), ('Wumpini Alhassan', 'cancelled', false) $$,
  'a host sees who came');
select results_eq(
  $$ select responses, checked_in, avg_usefulness, attend_again_rate from public.event_feedback_summary('e0000000-0000-0000-0000-000000000001') $$,
  $$ values (1, 1, 5.00::numeric, 1.00::numeric) $$, 'a host reads the impact snapshot');
select isnt(public.rotate_event_checkin_code('e0000000-0000-0000-0000-000000000001'), current_setting('t.code'),
  'a host rotates the code');
select lives_ok(
  $$ insert into public.community_events (slug, kind, title, format, starts_at, ends_at, chapter_id)
     values ('tamale-next', 'skillshop', 'Next Skillshop', 'in_person', now() + interval '60 days', now() + interval '60 days 2 hours',
             'c1000000-0000-0000-0000-000000000001') $$,
  'a lead creates an event for their chapter');
select throws_ok(
  $$ insert into public.community_events (slug, kind, title, format, starts_at, ends_at, chapter_id)
     values ('bolga-sneaky', 'skillshop', 'Sneaky', 'in_person', now() + interval '60 days', now() + interval '60 days 2 hours',
             'c1000000-0000-0000-0000-000000000002') $$,
  '42501', null, 'a lead cannot create events for another chapter');
select throws_ok(
  $$ insert into public.community_events (slug, kind, title, format, starts_at, ends_at)
     values ('national', 'flagship', 'Flagship', 'in_person', now() + interval '60 days', now() + interval '60 days 2 hours') $$,
  '42501', null, 'only admins create events outside a chapter');
select throws_ok(
  $$ update public.community_events set chapter_id = 'c1000000-0000-0000-0000-000000000002' where slug = 'tamale-next' $$,
  '42501', null, 'a lead cannot move an event to another chapter');

-- Zulaiha (Bolgatanga lead) cannot host Tamale's event
select set_config('request.jwt.claims', '{"sub":"88888888-8888-8888-8888-888888888888","role":"authenticated"}', true);
select throws_ok(
  $$ select public.host_check_in('e0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'another chapter''s lead cannot check people in');
select is((select count(*)::int from public.event_feedback), 0, 'nor read its feedback');

-- Admin raises capacity: the waitlist fills
set local role postgres;
insert into public.event_rsvps (event_id, profile_id, status, responded_at) values
  ('e0000000-0000-0000-0000-000000000001', '77777777-7777-7777-7777-777777777777', 'waitlisted', now());
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
update public.community_events set capacity = 5 where id = 'e0000000-0000-0000-0000-000000000001';
select is(
  (select rsvp_status from public.event_attendees where profile_id = '77777777-7777-7777-7777-777777777777'),
  'going', 'more seats move the waitlist up');
select lives_ok(
  $$ select public.host_check_in('e0000000-0000-0000-0000-000000000001', '77777777-7777-7777-7777-777777777777') $$,
  'admins check people in by hand');
update public.community_events set status = 'cancelled' where id = 'e0000000-0000-0000-0000-000000000003';
set local role postgres;
select is(
  (select count(*)::int from public.notifications where kind = 'event_update' and recipient_id = '22222222-2222-2222-2222-222222222222'),
  1, 'cancelling an event tells the people going');

select * from finish();
rollback;
