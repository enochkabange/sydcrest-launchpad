-- Market and Earn (issue #148): booking requests, the message thread,
-- reviews after a completed booking, briefs and pitches.
begin;
create extension if not exists pgtap with schema extensions;
select plan(69);

-- Abdul-Rahman and Adisa are approved experts, Zakaria is pending; Wumpini
-- buys; Ayishetu owns a verified business; Sumaila is a bystander; Fuseini
-- is 16; Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', dob), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '1999-03-14'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah', '1992-05-20'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu', '1990-07-01'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama',
     to_char(now() - interval '16 years', 'YYYY-MM-DD')),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu', '1998-02-02'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari', '1988-11-30'),
  ('77777777-7777-7777-7777-777777777777', 'adisa@example.test', 'Adisa Iddrisu', '1995-01-09'),
  ('88888888-8888-8888-8888-888888888888', 'zakaria@example.test', 'Zakaria Alhassan', '1994-04-04'),
  ('99999999-9999-9999-9999-999999999999', 'habiba@example.test', 'Habiba Mohammed', '1993-08-08')
) as u(id, email, name, dob);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';

insert into public.expert_profiles (profile_id, slug, headline, status, approved_at, accepting_requests) values
  ('22222222-2222-2222-2222-222222222222', 'abdul-rahman', 'Facebook ads', 'approved', now(), true),
  ('77777777-7777-7777-7777-777777777777', 'adisa', 'Content plans', 'approved', now(), false),
  ('88888888-8888-8888-8888-888888888888', 'zakaria', 'Photography', 'pending', null, true);
insert into public.offers (id, expert_id, kind, title, description, duration_minutes, is_active) values
  ('0f000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'one_to_one', 'Ads review', 'A call', 45, true),
  ('0f000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'one_to_one', 'Old offer', 'A call', 45, false),
  ('0f000000-0000-0000-0000-000000000007', '77777777-7777-7777-7777-777777777777', 'one_to_one', 'Content call', 'A call', 30, true);
insert into public.organisations (id, slug, name, verification_status, verified_at, created_by) values
  ('0a000000-0000-0000-0000-000000000001', 'tamale-shea', 'Tamale Shea Collective', 'verified', now(), '66666666-6666-6666-6666-666666666666'),
  ('0a000000-0000-0000-0000-000000000002', 'bolga-baskets', 'Bolga Baskets', 'unverified', null, '66666666-6666-6666-6666-666666666666');
-- Habiba recruits for the Tamale Shea Collective alongside Ayishetu.
insert into public.organisation_members (organisation_id, profile_id, role, status, joined_at) values
  ('0a000000-0000-0000-0000-000000000001', '99999999-9999-9999-9999-999999999999', 'recruiter', 'active', now());

-- Booking requests ----------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.booking_requests (expert_id, offer_id, message)
     values ('22222222-2222-2222-2222-222222222222', '0f000000-0000-0000-0000-000000000001', 'Hello') $$,
  '42501', null, 'under 18s cannot book experts');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.booking_requests (expert_id, offer_id, message, preferred_times)
     values ('77777777-7777-7777-7777-777777777777', '0f000000-0000-0000-0000-000000000001',
             'Please review my shea butter ads', 'Weekday evenings') $$,
  'an adult requests a booking from an offer');
select set_config('test.booking', (select id::text from public.booking_requests), true);
select is((select expert_id from public.booking_requests), '22222222-2222-2222-2222-222222222222'::uuid,
  'the offer decides the expert, whatever the client sent');
select throws_ok(
  $$ insert into public.booking_requests (expert_id, message) values ('22222222-2222-2222-2222-222222222222', 'Again') $$,
  '23505', null, 'one open request per expert at a time');
select throws_ok(
  $$ insert into public.booking_requests (expert_id, message) values ('88888888-8888-8888-8888-888888888888', 'Hi') $$,
  '22023', null, 'pending experts cannot be booked');
select throws_ok(
  $$ insert into public.booking_requests (expert_id, message) values ('77777777-7777-7777-7777-777777777777', 'Hi') $$,
  '22023', null, 'experts who are not taking requests cannot be booked');
select throws_ok(
  $$ insert into public.booking_requests (expert_id, offer_id, message)
     values ('22222222-2222-2222-2222-222222222222', '0f000000-0000-0000-0000-000000000002', 'Hi') $$,
  '22023', null, 'inactive offers cannot be booked');
select throws_ok(
  $$ insert into public.booking_requests (expert_id, message, status) values ('22222222-2222-2222-2222-222222222222', 'Hi', 'accepted') $$,
  '42501', null, 'requesters cannot set the status');
select throws_ok(
  $$ update public.booking_requests set status = 'completed' $$,
  '42501', null, 'nobody updates a booking directly');
select throws_ok(
  $$ select public.set_booking_status(current_setting('test.booking')::uuid, 'accepted') $$,
  '42501', null, 'the requester cannot accept their own request');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.booking_requests (expert_id, offer_id, message)
     values ('22222222-2222-2222-2222-222222222222', '0f000000-0000-0000-0000-000000000001', 'Me') $$,
  '23514', null, 'experts cannot book themselves');

-- The thread --------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.booking_messages (booking_id, body) values (current_setting('test.booking')::uuid, 'Here is my page link') $$,
  'the requester writes in the thread');
select throws_ok(
  $$ insert into public.expert_reviews (booking_id, rating) values (current_setting('test.booking')::uuid, 5) $$,
  '42501', null, 'no review before the booking is completed');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.booking_requests), 0, 'bystanders cannot see the booking');
select is((select count(*)::int from public.booking_messages), 0, 'bystanders cannot read the thread');
select is((select count(*)::int from public.booking_threads), 0, 'bystanders get no booking threads');
select throws_ok(
  $$ insert into public.booking_messages (booking_id, body) values (current_setting('test.booking')::uuid, 'Hi') $$,
  '42501', null, 'bystanders cannot write in the thread');
select throws_ok(
  $$ select public.set_booking_status(current_setting('test.booking')::uuid, 'cancelled') $$,
  '42501', null, 'bystanders cannot cancel');

-- The expert accepts and the booking completes.
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.booking_messages), 1, 'the expert reads the thread');
select results_eq(
  $$ select requester_name, expert_name, offer_title from public.booking_threads $$,
  $$ values ('Wumpini Alhassan'::text, 'Abdul-Rahman Issah'::text, 'Ads review'::text) $$,
  'booking threads carry both names and the offer');
select is((select status from public.set_booking_status(current_setting('test.booking')::uuid, 'accepted')),
  'accepted', 'the expert accepts');
select ok((select responded_at is not null from public.booking_requests), 'accepting records the response time');
select throws_ok(
  $$ select public.set_booking_status(current_setting('test.booking')::uuid, 'declined') $$,
  '22023', null, 'an accepted booking cannot be declined');
select is((select status from public.set_booking_status(current_setting('test.booking')::uuid, 'completed')),
  'completed', 'a party marks it completed');
select throws_ok(
  $$ insert into public.expert_reviews (booking_id, rating) values (current_setting('test.booking')::uuid, 5) $$,
  '42501', null, 'experts cannot review their own booking');

-- Reviews ---------------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.expert_reviews (booking_id, expert_id, rating)
     values (current_setting('test.booking')::uuid, '77777777-7777-7777-7777-777777777777', 5) $$,
  '42501', null, 'reviewers cannot pick the expert');
select lives_ok(
  $$ insert into public.expert_reviews (booking_id, rating, body) values (current_setting('test.booking')::uuid, 5, 'Clear and practical') $$,
  'the requester reviews a completed booking');
select is((select expert_id from public.expert_reviews), '22222222-2222-2222-2222-222222222222'::uuid,
  'the review is tied to the booking''s expert');
select throws_ok(
  $$ insert into public.expert_reviews (booking_id, rating) values (current_setting('test.booking')::uuid, 1) $$,
  '23505', null, 'one review per booking');
select throws_ok(
  $$ insert into public.expert_reviews (booking_id, rating) values (gen_random_uuid(), 5) $$,
  '42501', null, 'no review without a booking');

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select completed_bookings, review_count, average_rating from public.public_experts where slug = 'abdul-rahman' $$,
  $$ values (1, 1, 5.00::numeric) $$, 'trust signals count the real booking and review');
select results_eq(
  $$ select rating, body, reviewer_name, offer_kind from public.public_expert_reviews $$,
  $$ values (5::smallint, 'Clear and practical'::text, null::text, 'one_to_one'::text) $$,
  'reviews are public; a private reviewer stays unnamed');
select throws_ok($$ select * from public.booking_requests $$, '42501', null, 'anon cannot read bookings');
select throws_ok($$ select * from public.booking_messages $$, '42501', null, 'anon cannot read threads');
select throws_ok($$ select * from public.expert_reviews $$, '42501', null, 'anon cannot read the reviews table');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
update public.expert_reviews set is_hidden = true;
select is((select count(*)::int from public.public_expert_reviews), 1, 'experts cannot hide their reviews');
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
update public.expert_reviews set is_hidden = true;
select is((select count(*)::int from public.public_expert_reviews), 0, 'admins hide a review');
select throws_ok(
  $$ update public.expert_reviews set rating = 1 $$,
  '42501', null, 'even admins cannot change a rating');

-- A declined booking closes its thread.
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
insert into public.booking_requests (expert_id, message) values ('22222222-2222-2222-2222-222222222222', 'Can you help?');
select set_config('test.booking2', (select id::text from public.booking_requests), true);
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select status from public.set_booking_status(current_setting('test.booking2')::uuid, 'declined', 'Fully booked')),
  'declined', 'the expert declines');
select throws_ok(
  $$ insert into public.booking_messages (booking_id, body) values (current_setting('test.booking2')::uuid, 'Sorry') $$,
  '42501', null, 'a declined booking takes no more messages');

-- Briefs -------------------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.briefs (title, description) values ('Help', 'Help me') $$,
  '42501', null, 'under 18s cannot post briefs');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.briefs (title, description, skills, indicative_budget_ghs)
     values ('Plan my first month of posts', 'I sell shea butter in Tamale', '{content planning}', 300) $$,
  'an adult posts an advice brief');
select set_config('test.brief', (select id::text from public.briefs), true);
select throws_ok(
  $$ insert into public.briefs (kind, title, description) values ('job', 'A job', 'Work') $$,
  '23514', null, 'a job brief needs an organisation');
select throws_ok(
  $$ insert into public.briefs (kind, organisation_id, title, description)
     values ('job', '0a000000-0000-0000-0000-000000000001', 'A job', 'Work') $$,
  '42501', null, 'only the organisation''s people post for it');

select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.briefs (kind, organisation_id, title, description)
     values ('job', '0a000000-0000-0000-0000-000000000001', 'Product photos for 40 items', 'White background shots') $$,
  'a verified organisation posts a job brief');
select throws_ok(
  $$ insert into public.briefs (kind, organisation_id, title, description)
     values ('job', '0a000000-0000-0000-0000-000000000002', 'Basket photos', 'Shots') $$,
  '42501', null, 'unverified organisations cannot post job briefs');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.briefs), 0, 'learners who are not experts do not see briefs');
select set_config('request.jwt.claims', '{"sub":"88888888-8888-8888-8888-888888888888","role":"authenticated"}', true);
select is((select count(*)::int from public.briefs), 0, 'pending experts do not see briefs');
select throws_ok(
  $$ insert into public.pitches (brief_id, message) values (current_setting('test.brief')::uuid, 'Me please') $$,
  '42501', null, 'pending experts cannot pitch');

-- Pitches ------------------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.briefs where status = 'open'), 2, 'approved experts see open briefs');
select results_eq(
  $$ select poster_name, organisation_name from public.brief_board where kind = 'job' $$,
  $$ values ('Ayishetu Abukari'::text, 'Tamale Shea Collective'::text) $$,
  'the brief board names the poster and organisation');
select throws_ok(
  $$ insert into public.pitches (brief_id, offer_id, message)
     values (current_setting('test.brief')::uuid, '0f000000-0000-0000-0000-000000000007', 'Borrowed offer') $$,
  '22023', null, 'a pitch cannot include someone else''s offer');
select lives_ok(
  $$ insert into public.pitches (brief_id, offer_id, message, proposed_timeline)
     values (current_setting('test.brief')::uuid, '0f000000-0000-0000-0000-000000000001', 'I can plan it in a call', 'This week') $$,
  'an approved expert pitches');
select set_config('test.pitch', (select id::text from public.pitches), true);
select throws_ok(
  $$ update public.pitches set status = 'accepted' $$,
  '42501', null, 'experts cannot accept their own pitch by update');
select throws_ok(
  $$ select public.accept_pitch(current_setting('test.pitch')::uuid) $$,
  '42501', null, 'experts cannot accept their own pitch');

select set_config('request.jwt.claims', '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}', true);
insert into public.pitches (brief_id, message) values (current_setting('test.brief')::uuid, 'I write content plans');
select is((select count(*)::int from public.pitches), 1, 'experts see only their own pitch');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.pitches), 0, 'bystanders see no pitches');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.pitches), 2, 'the poster sees every pitch');
select is((select status from public.accept_pitch(current_setting('test.pitch')::uuid)), 'accepted',
  'accepting a pitch opens an accepted booking');
select results_eq(
  $$ select requester_id, expert_id, brief_id from public.booking_requests where pitch_id = current_setting('test.pitch')::uuid $$,
  $$ values ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, current_setting('test.brief')::uuid) $$,
  'between the poster and the expert, for the brief');
select results_eq(
  $$ select (select status from public.briefs where id = current_setting('test.brief')::uuid),
            (select string_agg(status, ',' order by status) from public.pitches) $$,
  $$ values ('awarded'::text, 'accepted,declined'::text) $$,
  'the brief is awarded and the other pitch declined');
update public.briefs set title = 'Changed after award' where id = current_setting('test.brief')::uuid;
select is((select title from public.briefs where id = current_setting('test.brief')::uuid), 'Plan my first month of posts',
  'an awarded brief cannot be edited');

select set_config('request.jwt.claims', '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}', true);
select is((select status from public.briefs where id = current_setting('test.brief')::uuid), 'awarded', 'an expert who pitched still sees the awarded brief');

-- A job brief's booking belongs to the organisation's side.
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
insert into public.pitches (brief_id, message)
select id, 'I shoot product photos' from public.briefs where kind = 'job';
select set_config('test.jobpitch', (select id::text from public.pitches where status = 'submitted'), true);
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select set_config('test.jobbooking', (select id::text from public.accept_pitch(current_setting('test.jobpitch')::uuid)), true);
select is((select organisation_id from public.booking_requests where id = current_setting('test.jobbooking')::uuid),
  '0a000000-0000-0000-0000-000000000001'::uuid, 'a booking from a job brief records the organisation');

select set_config('request.jwt.claims', '{"sub":"99999999-9999-9999-9999-999999999999","role":"authenticated"}', true);
select results_eq(
  $$ select requester_name, organisation_name from public.booking_threads $$,
  $$ values ('Ayishetu Abukari'::text, 'Tamale Shea Collective'::text) $$,
  'other members of the organisation see its booking');
select lives_ok(
  $$ insert into public.booking_messages (booking_id, body) values (current_setting('test.jobbooking')::uuid, 'Photos are ready for pickup') $$,
  'and write in its thread');
select is((select status from public.set_booking_status(current_setting('test.jobbooking')::uuid, 'completed')), 'completed',
  'and a recruiter can mark it completed');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.booking_requests where id = current_setting('test.jobbooking')::uuid), 0,
  'people outside the organisation still cannot see it');

reset role;
select ok(
  not has_function_privilege('anon', 'public.set_booking_status(uuid, text, text)', 'execute')
  and not has_function_privilege('anon', 'public.accept_pitch(uuid)', 'execute')
  and not has_function_privilege('anon', 'public.decline_pitch(uuid)', 'execute'),
  'signed out visitors cannot call the booking and pitch functions');

select * from finish();
rollback;
