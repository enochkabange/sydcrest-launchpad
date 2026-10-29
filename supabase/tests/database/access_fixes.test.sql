-- Access fixes from the #240 audit (20261029260000_access_fixes.sql):
-- follows visibility (#246, D7), no direct waitlist or analytics inserts and
-- the waitlist form limit in the database (#247), appointed skill reviewers
-- (#248, D3) and the age confirmation consent (D1). Expert profiles (#249)
-- are in earn_experts.test.sql and the roster (#250) in phase2_cohorts.test.sql.
begin;
create extension if not exists pgtap with schema extensions;
select plan(27);

-- Wumpini and Mariama have public profiles; Fuseini's is private; Ayishetu
-- is a bystander; Abdul-Rahman is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', '1998-04-02'), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'mariama@example.test', 'Mariama Seidu'),
  ('33333333-3333-3333-3333-333333333333', 'fuseini@example.test', 'Fuseini Mahama'),
  ('44444444-4444-4444-4444-444444444444', 'ayishetu@example.test', 'Ayishetu Abukari'),
  ('55555555-5555-5555-5555-555555555555', 'abdul@example.test', 'Abdul-Rahman Yakubu')
) as u(id, email, name);
update public.profiles set is_public = true, public_slug = 'wumpini' where id = '11111111-1111-1111-1111-111111111111';
update public.profiles set is_public = true, public_slug = 'mariama' where id = '22222222-2222-2222-2222-222222222222';
update public.profiles set role = 'admin' where id = '55555555-5555-5555-5555-555555555555';

-- Wumpini follows Mariama (both public); Fuseini (private) follows Wumpini.
insert into public.follows (follower_id, following_id) values
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'),
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111');

-- Follows (#246, D7) ---------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select results_eq(
  $$ select follower_id, following_id from public.follows $$,
  $$ values ('11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid) $$,
  'a bystander sees follows between two public profiles only');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.follows), 2, 'the followed public person sees a private follower');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.follows where follower_id = '33333333-3333-3333-3333-333333333333'), 1,
  'a private person sees their own follows');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.follows where follower_id = '33333333-3333-3333-3333-333333333333'), 0,
  'another public person does not see a private person''s follows');
reset role;

-- Hiding a profile hides its follows from bystanders straight away.
update public.profiles set is_public = false where id = '22222222-2222-2222-2222-222222222222';
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.follows), 0, 'a profile made private takes its follows out of view');
reset role;
update public.profiles set is_public = true where id = '22222222-2222-2222-2222-222222222222';

select is(
  (select followers_count from public.public_profile_stats where public_slug = 'mariama'),
  1, 'public follower counts still count');

-- Waitlist and analytics (#247) ---------------------------------------------------
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select throws_ok(
  $$ insert into public.waitlist (email) values ('direct@example.test') $$,
  '42501', null, 'the waitlist takes no direct inserts');
select throws_ok(
  $$ insert into public.events (name, anonymous_id) values ('page_view', 'script') $$,
  '42501', null, 'analytics take no direct inserts');
select is(public.join_waitlist(repeat('b', 64), 'rahinatu@example.test', 'Rahinatu Alhassan', 'northern', null), true,
  'join_waitlist adds a visitor');
select throws_ok(
  $$ select public.join_waitlist('not-a-hash', 'sumaila@example.test') $$,
  '22023', null, 'join_waitlist needs the hashed address');
select ok(
  (select bool_and(public.join_waitlist(repeat('d', 64), 'visitor' || n || '@example.test')) from generate_series(1, 20) n),
  'twenty sign ups an hour from one address are fine');
select is(public.join_waitlist(repeat('d', 64), 'one-more@example.test'), false,
  'the twenty first sign up from that address is refused');
reset role;
select is((select count(*)::int from public.waitlist where email = 'one-more@example.test'), 0,
  'a refused sign up adds nothing');
select is((select count(*)::int from public.waitlist), 21, 'every allowed sign up was added once');

-- Skill reviewers (#248, D3) --------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is(private.is_skill_reviewer(), false, 'a learner is not a skill reviewer');
select throws_ok(
  $$ update public.profiles set is_skill_reviewer = true where id = '44444444-4444-4444-4444-444444444444' $$,
  '42501', null, 'nobody appoints themselves');
select throws_ok(
  $$ select public.admin_set_skill_reviewer('44444444-4444-4444-4444-444444444444', true) $$,
  '42501', null, 'learners cannot appoint reviewers');
select throws_ok($$ select * from public.admin_skill_reviewers() $$, '42501', null, 'learners cannot list reviewers');
select is((select count(*)::int from public.portfolio_review_queue), 0, 'a learner gets nothing from the review queue');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select lives_ok(
  $$ select public.admin_set_skill_reviewer('44444444-4444-4444-4444-444444444444', true) $$,
  'an admin appoints a reviewer');
select results_eq(
  $$ select profile_id, display_name from public.admin_skill_reviewers() $$,
  $$ values ('44444444-4444-4444-4444-444444444444'::uuid, 'Ayishetu Abukari'::text) $$,
  'the admin list names the reviewer');
select throws_ok(
  $$ select public.admin_set_skill_reviewer(gen_random_uuid(), true) $$,
  'P0002', null, 'appointing an unknown profile fails');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is(private.is_skill_reviewer(), true, 'an appointed reviewer reviews portfolios');
select is((select is_skill_reviewer from public.profiles where id = '44444444-4444-4444-4444-444444444444'), true,
  'the reviewer can see their own flag');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select public.admin_set_skill_reviewer('44444444-4444-4444-4444-444444444444', false);
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is(private.is_skill_reviewer(), false, 'a removed reviewer no longer reviews');

-- Age confirmation consent (D1) ----------------------------------------------------
select lives_ok(
  $$ insert into public.consents (kind, version) values ('age_confirmation', '2026-10-draft') $$,
  'a person records "I confirm I am 18 or over"');
select throws_ok(
  $$ insert into public.consents (kind, version) values ('made_up', '1') $$,
  '23514', null, 'consent kinds come from the fixed list');
reset role;

select * from finish();
rollback;
