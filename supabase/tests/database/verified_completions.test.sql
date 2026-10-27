-- Quiz verified completions (issue #128). A topic marked done by hand is the
-- learner's own tracking: it shows as done to them, but it never reaches the
-- leaderboards, the streak or an achievement, and a learner cannot forge the
-- verification.
begin;
create extension if not exists pgtap with schema extensions;
select plan(24);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now());
update public.profiles set public_slug = 'wumpini', is_public = true, region = 'northern'
  where id = '11111111-1111-1111-1111-111111111111';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true);
-- q: has a quiz. s: outline topic, no quiz. l: no quiz yet, one is added later.
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position) values
  ('bbbbbbbb-0000-0000-0000-00000000000a', 'aaaaaaaa-0000-0000-0000-000000000001', 'quiz-topic', 'Quiz topic', 1),
  ('bbbbbbbb-0000-0000-0000-00000000000b', 'aaaaaaaa-0000-0000-0000-000000000001', 'self-topic', 'Self topic', 2),
  ('bbbbbbbb-0000-0000-0000-00000000000c', 'aaaaaaaa-0000-0000-0000-000000000001', 'later-topic', 'Later quiz topic', 3);
insert into public.node_quiz (id, node_id, questions, pass_threshold) values
  ('cccccccc-0000-0000-0000-00000000000a', 'bbbbbbbb-0000-0000-0000-00000000000a',
   '[{"id":"q1","prompt":"?","options":["a","b"]}]', 100);
insert into public.node_quiz_answers (quiz_id, answer_key) values
  ('cccccccc-0000-0000-0000-00000000000a', '{"q1": 1}');

-- The database rejects a verification on a node that is not done.
select throws_ok(
  $$ insert into public.roadmap_progress (profile_id, node_id, status, verified_at)
     values ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-00000000000b', 'in_progress', now()) $$,
  '23514', null, 'verified_at requires status done');

-- Act as Wumpini (public profile)
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

-- Self marking an outline topic
select lives_ok($$ select public.set_node_status('bbbbbbbb-0000-0000-0000-00000000000b', 'done') $$,
  'a learner can mark a topic without a quiz as done');
select results_eq(
  $$ select status, completed_at is not null, verified_at from public.roadmap_progress
     where node_id = 'bbbbbbbb-0000-0000-0000-00000000000b' $$,
  $$ values ('done', true, null::timestamptz) $$,
  'it shows as done to the learner but is not verified');
select is((select count(*)::int from public.achievements), 0,
  'a self marked topic mints no achievement');
select is((select nodes_completed from public.public_profile_stats where public_slug = 'wumpini'), 0,
  'a self marked topic does not count on the topics board');
select is((select current_streak from public.public_profile_stats where public_slug = 'wumpini'), 0,
  'a self marked topic does not start a streak');

-- Forging attempts
select throws_ok(
  $$ update public.roadmap_progress set verified_at = now() $$,
  '42501', null, 'a learner cannot set verified_at directly');
select throws_ok(
  $$ insert into public.roadmap_progress (profile_id, node_id, status, completed_at, verified_at)
     values ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-00000000000c', 'done', now(), now()) $$,
  '42501', null, 'a learner cannot insert a verified completion');
select throws_ok(
  $$ select public.mint_achievement('11111111-1111-1111-1111-111111111111', 'roadmap_node_completed',
       'bbbbbbbb-0000-0000-0000-00000000000b') $$,
  '42501', null, 'a learner cannot mint the achievement themselves');
select lives_ok($$ select public.set_node_status('bbbbbbbb-0000-0000-0000-00000000000b', 'done') $$,
  'marking it done again is harmless');
select is((select verified_at from public.roadmap_progress where node_id = 'bbbbbbbb-0000-0000-0000-00000000000b'),
  null, 'and still does not verify it');
select throws_ok(
  $$ select * from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-00000000000b', '{"q1": 1}') $$,
  'P0002', null, 'a topic without a quiz cannot be verified through the grader');

-- Passing a quiz verifies and counts
select results_eq(
  $$ select passed from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-00000000000a', '{"q1": 1}') $$,
  $$ values (true) $$, 'passing the quiz');
select is((select verified_at is not null from public.roadmap_progress where node_id = 'bbbbbbbb-0000-0000-0000-00000000000a'),
  true, 'a quiz pass is verified');
select is((select nodes_completed from public.public_profile_stats where public_slug = 'wumpini'), 1,
  'only the verified topic counts on the board');
select is((select current_streak from public.public_profile_stats where public_slug = 'wumpini'), 1,
  'the verified topic starts a streak');
select results_eq(
  $$ select type, ref_id from public.achievements order by type, ref_id $$,
  $$ values ('roadmap_node_completed', 'bbbbbbbb-0000-0000-0000-00000000000a') $$,
  'the pass mints the node achievement, and the roadmap is not complete while a required topic is only self marked');

-- A topic marked done by hand, then given a quiz, is verified when passed
select lives_ok($$ select public.set_node_status('bbbbbbbb-0000-0000-0000-00000000000c', 'done') $$,
  'self mark the topic before it has a quiz');
reset role;
insert into public.node_quiz (id, node_id, questions, pass_threshold) values
  ('cccccccc-0000-0000-0000-00000000000c', 'bbbbbbbb-0000-0000-0000-00000000000c',
   '[{"id":"q1","prompt":"?","options":["a","b"]}]', 100);
insert into public.node_quiz_answers (quiz_id, answer_key) values
  ('cccccccc-0000-0000-0000-00000000000c', '{"q1": 0}');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select results_eq(
  $$ select passed from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-00000000000c', '{"q1": 1}') $$,
  $$ values (false) $$, 'failing the new quiz');
select results_eq(
  $$ select status, verified_at from public.roadmap_progress where node_id = 'bbbbbbbb-0000-0000-0000-00000000000c' $$,
  $$ values ('done', null::timestamptz) $$,
  'a failed attempt keeps the personal done mark but does not verify it');
select results_eq(
  $$ select passed from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-00000000000c', '{"q1": 0}') $$,
  $$ values (true) $$, 'passing the new quiz');
select is(
  (select count(*)::int from public.achievements where ref_id = 'bbbbbbbb-0000-0000-0000-00000000000c'), 1,
  'the first verification mints the achievement even though the topic was already done');

-- Resetting a verified topic removes it from the board
select lives_ok($$ select public.set_node_status('bbbbbbbb-0000-0000-0000-00000000000a', 'in_progress') $$,
  'reset the quiz topic');
select is((select nodes_completed from public.public_profile_stats where public_slug = 'wumpini'), 1,
  'a reset topic loses its verification and leaves the board');

select * from finish();
rollback;
