-- follows, events, reports, waitlist: who can write, who can read back.
begin;
create extension if not exists pgtap with schema extensions;
select plan(27);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

-- Signed out visitor
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select lives_ok($$ insert into public.events (name, anonymous_id, props) values ('page_view', 'anon-1', '{"path":"/"}') $$,
  'anon records an event');
select throws_ok($$ insert into public.events (name) values ('made_up_event') $$, '23514', null,
  'event names come from the fixed list');
select throws_ok(
  $$ insert into public.events (name, profile_id) values ('page_view', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'anon cannot attribute events to a user');
select throws_ok($$ select * from public.events $$, '42501', null, 'anon cannot read events');
select lives_ok(
  $$ insert into public.waitlist (email, name, region, interest) values ('abdul.rahman@example.test', 'Abdul-Rahman Issah', 'northern', 'Data') $$,
  'anon joins the waitlist');
select throws_ok($$ insert into public.waitlist (email) values ('not-an-email') $$, '23514', null,
  'waitlist emails must look like emails');
select throws_ok($$ insert into public.waitlist (email) values ('Abdul.Rahman@Example.test') $$, '23505', null,
  'one waitlist entry per address, ignoring case');
select throws_ok($$ select * from public.waitlist $$, '42501', null, 'anon cannot read the waitlist');
select throws_ok($$ select * from public.follows $$, '42501', null, 'anon cannot read follows');
select throws_ok(
  $$ insert into public.reports (reporter_id, target_type, target_id, reason) values ('11111111-1111-1111-1111-111111111111', 'profile', 'x', 'spam') $$,
  '42501', null, 'anon cannot file reports');
reset role;

-- Wumpini
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok($$ insert into public.follows (following_id) values ('22222222-2222-2222-2222-222222222222') $$,
  'a user follows someone');
select throws_ok($$ insert into public.follows (following_id) values ('11111111-1111-1111-1111-111111111111') $$,
  '23514', null, 'a user cannot follow themselves');
select throws_ok(
  $$ insert into public.follows (follower_id, following_id) values ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444') $$,
  '42501', null, 'a user cannot create follows for someone else');
select lives_ok(
  $$ insert into public.events (name, profile_id) values ('node_opened', '11111111-1111-1111-1111-111111111111') $$,
  'a user records their own event');
select throws_ok(
  $$ insert into public.events (name, profile_id) values ('node_opened', '22222222-2222-2222-2222-222222222222') $$,
  '42501', null, 'a user cannot record events as someone else');
select is((select count(*)::int from public.events), 0, 'a learner cannot read events back');
select lives_ok(
  $$ insert into public.reports (target_type, target_id, reason) values ('profile', '22222222-2222-2222-2222-222222222222', 'Spam links') $$,
  'a user files a report');
select throws_ok(
  $$ insert into public.reports (reporter_id, target_type, target_id, reason) values ('22222222-2222-2222-2222-222222222222', 'profile', 'x', 'framed') $$,
  '42501', null, 'a user cannot file a report as someone else');
select is((select count(*)::int from public.reports), 0, 'a learner cannot read reports');
select is((select count(*)::int from public.waitlist), 0, 'a learner cannot read the waitlist');
reset role;

-- Mariama sees the graph and cannot remove Wumpini's follow
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.follows), 1, 'signed in users can see follows');
delete from public.follows where follower_id = '11111111-1111-1111-1111-111111111111';
select is((select count(*)::int from public.follows), 1, 'a user cannot delete someone else''s follow');
reset role;

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
delete from public.follows where following_id = '22222222-2222-2222-2222-222222222222';
select is((select count(*)::int from public.follows), 0, 'a user unfollows');
reset role;

-- Fuseini (admin)
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.events), 2, 'an admin reads events');
select is((select count(*)::int from public.waitlist), 1, 'an admin reads the waitlist');
select lives_ok($$ update public.reports set status = 'actioned' $$, 'an admin triages a report');
select throws_ok($$ update public.reports set reason = 'edited' $$, '42501', null,
  'a report''s reason cannot be edited after filing');
reset role;

select * from finish();
rollback;
