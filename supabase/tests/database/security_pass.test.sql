-- Security pass (issue #193): cross user reads and writes on the riskiest
-- tables added from 27 Oct, beyond what each feature's own test covers.
-- Organisation role escalation, invitees before they accept, contact
-- requests, consents, notifications, hidden replies, and bookings, pitches
-- and reviews between the two parties only.
begin;
create extension if not exists pgtap with schema extensions;
select plan(28);

-- Wumpini is a learner, Abdul-Rahman an approved expert, Sumaila a bystander.
-- Ayishetu owns a verified business; Habiba is its admin, Zakaria its
-- recruiter, and Adisa has been invited but has not accepted.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', '1995-06-15'), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah'),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari'),
  ('77777777-7777-7777-7777-777777777777', 'adisa@example.test', 'Adisa Iddrisu'),
  ('88888888-8888-8888-8888-888888888888', 'zakaria@example.test', 'Zakaria Alhassan'),
  ('99999999-9999-9999-9999-999999999999', 'habiba@example.test', 'Habiba Mohammed')
) as u(id, email, name);

insert into public.organisations (id, slug, name, verification_status, verified_at, created_by) values
  ('0a000000-0000-0000-0000-000000000001', 'tamale-shea', 'Tamale Shea Collective', 'verified', now(),
   '66666666-6666-6666-6666-666666666666');
insert into public.organisation_members (organisation_id, profile_id, role, status, joined_at) values
  ('0a000000-0000-0000-0000-000000000001', '99999999-9999-9999-9999-999999999999', 'admin', 'active', now()),
  ('0a000000-0000-0000-0000-000000000001', '88888888-8888-8888-8888-888888888888', 'recruiter', 'active', now());
insert into public.organisation_members (organisation_id, profile_id, role, status) values
  ('0a000000-0000-0000-0000-000000000001', '77777777-7777-7777-7777-777777777777', 'recruiter', 'invited');

insert into public.talent_contact_requests (id, organisation_id, profile_id, requested_by, message) values
  ('7c000000-0000-0000-0000-000000000001', '0a000000-0000-0000-0000-000000000001',
   '11111111-1111-1111-1111-111111111111', '88888888-8888-8888-8888-888888888888', 'We would like to talk about a sales role');

insert into public.consents (profile_id, kind, version, phone) values
  ('11111111-1111-1111-1111-111111111111', 'whatsapp', '2026-10', '+233200000001');
insert into public.notifications (id, recipient_id, kind, payload) values
  ('a0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'system', '{}');

insert into public.expert_profiles (profile_id, slug, headline, status, approved_at, accepting_requests) values
  ('22222222-2222-2222-2222-222222222222', 'abdul-rahman', 'Facebook ads', 'approved', now(), true);
insert into public.booking_requests (id, requester_id, expert_id, message, status, completed_at) values
  ('b0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111',
   '22222222-2222-2222-2222-222222222222', 'Please review my ads', 'completed', now());
insert into public.briefs (id, poster_id, kind, title, description) values
  ('bf000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'advice',
   'Logo for my shea shop', 'A simple logo');
insert into public.pitches (id, brief_id, expert_id, message) values
  ('ac000000-0000-0000-0000-000000000001', 'bf000000-0000-0000-0000-000000000001',
   '22222222-2222-2222-2222-222222222222', 'I can do this in a week');
insert into public.outcomes (id, profile_id, type, title, organisation_name, started_on) values
  ('0c000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'job',
   'Sales assistant', 'Tamale Shea Collective', current_date);

insert into public.chapters (id, slug, name, region, city, status) values
  ('c1000000-0000-0000-0000-000000000001', 'tamale', 'Tamale', 'northern', 'Tamale', 'active');
insert into public.chapter_members (chapter_id, profile_id) values
  ('c1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111'),
  ('c1000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555');
insert into public.community_posts (id, author_id, scope, chapter_id, body) values
  ('d0000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'chapter',
   'c1000000-0000-0000-0000-000000000001', 'Who is coming to the Skillshop?');
insert into public.community_replies (id, post_id, author_id, body, hidden_at, hidden_reason) values
  ('d1000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001',
   '11111111-1111-1111-1111-111111111111', 'Buy cheap followers here', now(), 'Spam');

set local role authenticated;

-- Organisation roles ------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"99999999-9999-9999-9999-999999999999","role":"authenticated"}', true);
select throws_ok(
  $$ update public.organisation_members set role = 'owner'
     where profile_id = '99999999-9999-9999-9999-999999999999' $$,
  '42501', null, 'an organisation admin cannot make themselves owner');
select throws_ok(
  $$ insert into public.organisation_members (organisation_id, profile_id, role, invited_by)
     values ('0a000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'owner',
             '99999999-9999-9999-9999-999999999999') $$,
  '42501', null, 'an organisation admin cannot invite an owner');
update public.organisation_members set role = 'recruiter' where profile_id = '66666666-6666-6666-6666-666666666666';
delete from public.organisation_members where profile_id = '66666666-6666-6666-6666-666666666666';
select is(
  (select role from public.organisation_members where profile_id = '66666666-6666-6666-6666-666666666666'),
  'owner', 'an organisation admin can neither demote nor remove the owner');
select throws_ok(
  $$ update public.organisation_members set status = 'active'
     where profile_id = '77777777-7777-7777-7777-777777777777' $$,
  '42501', null, 'nobody activates an invitation by editing the row');

select set_config('request.jwt.claims', '{"sub":"88888888-8888-8888-8888-888888888888","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.organisation_members (organisation_id, profile_id, role, invited_by)
     values ('0a000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'recruiter',
             '88888888-8888-8888-8888-888888888888') $$,
  '42501', null, 'a recruiter cannot invite anyone');
update public.organisation_members set role = 'admin' where profile_id = '88888888-8888-8888-8888-888888888888';
select is(
  (select role from public.organisation_members where profile_id = '88888888-8888-8888-8888-888888888888'),
  'recruiter', 'a recruiter cannot promote themselves');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.organisation_members (organisation_id, profile_id, role, invited_by)
     values ('0a000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'recruiter',
             '55555555-5555-5555-5555-555555555555') $$,
  '42501', null, 'an outsider cannot add themselves to an organisation');

-- Invitees before they accept ---------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}', true);
select is((select count(*)::int from public.talent_contact_requests), 0,
  'an invitee who has not accepted cannot read the organisation''s contact requests');
select throws_ok(
  $$ insert into public.talent_contact_requests (organisation_id, profile_id, requested_by, message)
     values ('0a000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555',
             '77777777-7777-7777-7777-777777777777', 'Hello') $$,
  '42501', null, 'an invitee cannot ask learners for their contact');

-- Contact requests --------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"88888888-8888-8888-8888-888888888888","role":"authenticated"}', true);
select is((select count(*)::int from public.talent_contact_requests), 1, 'the recruiter sees their organisation''s request');
select throws_ok(
  $$ select public.respond_talent_contact('7c000000-0000-0000-0000-000000000001', true, 'call me') $$,
  'P0002', null, 'the organisation cannot accept on the learner''s behalf');
select throws_ok(
  $$ update public.talent_contact_requests set status = 'accepted', shared_contact = '+233200000001' $$,
  '42501', null, 'nobody changes a contact request directly');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.talent_contact_requests), 0, 'other learners cannot see the request');

-- Consents ----------------------------------------------------------------------
select throws_ok(
  $$ insert into public.consents (profile_id, kind, version)
     values ('11111111-1111-1111-1111-111111111111', 'whatsapp', '2026-10') $$,
  '42501', null, 'nobody records consent for someone else');
select is((select count(*)::int from public.consents), 0, 'nobody reads someone else''s consents');
select is(public.revoke_consent('whatsapp'), 0, 'revoking touches only the caller''s own consents');

-- Notifications -----------------------------------------------------------------
update public.notifications set read_at = now() where id = 'a0000000-0000-0000-0000-000000000001';
select is(public.mark_notifications_read(array['a0000000-0000-0000-0000-000000000001'::uuid]), 0,
  'nobody marks someone else''s notification read');
delete from public.notifications where id = 'a0000000-0000-0000-0000-000000000001';

-- Hidden replies ----------------------------------------------------------------
select is((select count(*)::int from public.community_replies), 0,
  'other members do not see a hidden reply');
select is((select count(*)::int from public.community_thread('d0000000-0000-0000-0000-000000000001')), 0,
  'the thread leaves a hidden reply out for other members');
select throws_ok(
  $$ select public.moderate_community_content('community_reply', 'd1000000-0000-0000-0000-000000000001', false) $$,
  '42501', null, 'members cannot unhide a reply');

-- Bookings, pitches and reviews -------------------------------------------------
select throws_ok(
  $$ insert into public.booking_messages (booking_id, body) values ('b0000000-0000-0000-0000-000000000001', 'Hi') $$,
  '42501', null, 'a bystander cannot write in someone else''s booking');
select throws_ok(
  $$ select public.set_booking_status('b0000000-0000-0000-0000-000000000001', 'cancelled') $$,
  '42501', null, 'a bystander cannot change someone else''s booking');
update public.pitches set message = 'Pick me instead' where id = 'ac000000-0000-0000-0000-000000000001';
update public.outcomes set title = 'Manager' where id = '0c000000-0000-0000-0000-000000000001';
delete from public.outcomes where id = '0c000000-0000-0000-0000-000000000001';

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
update public.pitches set message = 'Changed by the poster' where id = 'ac000000-0000-0000-0000-000000000001';
select is((select count(*)::int from public.community_replies), 1, 'the author still sees their hidden reply');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.expert_reviews (booking_id, rating) values ('b0000000-0000-0000-0000-000000000001', 5) $$,
  '42501', null, 'an expert cannot review their own booking');
select is((select message from public.pitches where id = 'ac000000-0000-0000-0000-000000000001'),
  'I can do this in a week', 'only the expert edits their pitch; the poster and bystanders cannot');

reset role;
select set_config('request.jwt.claims', '', true);
select is((select read_at from public.notifications where id = 'a0000000-0000-0000-0000-000000000001'), null,
  'the notification is still unread and still there');
select is((select revoked_at from public.consents where profile_id = '11111111-1111-1111-1111-111111111111'), null,
  'the learner''s consent is still in force');
select is((select title from public.outcomes where id = '0c000000-0000-0000-0000-000000000001'), 'Sales assistant',
  'a bystander can neither edit nor delete someone else''s outcome');

select * from finish();
rollback;
