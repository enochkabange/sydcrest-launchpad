-- Learning loop (issue #232): weekly goals and 5 minute reviews are owner
-- only (admins read), the learner sets only the current week's goal, a review
-- is graded by the database from quizzes the learner passed, and a review
-- never changes verified completions or the leaderboards.
begin;
create extension if not exists pgtap with schema extensions;
select plan(30);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at) values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'fuseini@example.test', '{"full_name":"Fuseini Iddrisu"}', now(), now()),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now());
update public.profiles set public_slug = 'wumpini', is_public = true where id = '11111111-1111-1111-1111-111111111111';
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true);
-- a: passed by Wumpini (two questions). b: has a quiz, not passed.
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position) values
  ('bbbbbbbb-0000-0000-0000-00000000000a', 'aaaaaaaa-0000-0000-0000-000000000001', 'sheets', 'Sheets', 1),
  ('bbbbbbbb-0000-0000-0000-00000000000b', 'aaaaaaaa-0000-0000-0000-000000000001', 'charts', 'Charts', 2);
insert into public.node_quiz (id, node_id, questions, pass_threshold) values
  ('cccccccc-0000-0000-0000-00000000000a', 'bbbbbbbb-0000-0000-0000-00000000000a',
   '[{"id":"q1","prompt":"?","options":["a","b"]},{"id":"q2","prompt":"?","options":["a","b"]}]', 50),
  ('cccccccc-0000-0000-0000-00000000000b', 'bbbbbbbb-0000-0000-0000-00000000000b',
   '[{"id":"q1","prompt":"?","options":["a","b"]}]', 100);
insert into public.node_quiz_answers (quiz_id, answer_key) values
  ('cccccccc-0000-0000-0000-00000000000a', '{"q1": 1, "q2": 0}'),
  ('cccccccc-0000-0000-0000-00000000000b', '{"q1": 1}');

-- Grants and shape
select ok(
  not has_table_privilege('authenticated', 'public.review_sessions', 'insert')
  and not has_table_privilege('authenticated', 'public.review_sessions', 'update')
  and not has_table_privilege('authenticated', 'public.review_answers', 'insert')
  and not has_table_privilege('authenticated', 'public.review_answers', 'update')
  and not has_table_privilege('authenticated', 'public.weekly_goals', 'delete'),
  'learners cannot write reviews directly or delete goals');
select ok(
  not has_table_privilege('anon', 'public.weekly_goals', 'select')
  and not has_table_privilege('anon', 'public.review_sessions', 'select')
  and not has_table_privilege('anon', 'public.review_answers', 'select'),
  'signed out visitors cannot read goals or reviews');
select ok(
  not has_function_privilege('anon', 'public.submit_review(jsonb)', 'execute')
  and has_function_privilege('authenticated', 'public.submit_review(jsonb)', 'execute'),
  'only signed in learners can submit a review');
select is(private.accra_week_start('2026-10-28 23:30+00'), '2026-10-26'::date, 'weeks start on Monday in Accra');
select is(private.accra_week_start('2026-11-01 23:59+00'), '2026-10-26'::date, 'Sunday night is still the same week');
select is(private.accra_week_start('2026-11-02 00:00+00'), '2026-11-02'::date, 'Monday midnight starts a new week');

-- Act as Wumpini
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

-- Weekly goal
select lives_ok(
  $$ insert into public.weekly_goals (profile_id, week_start, topics_target)
     values ('11111111-1111-1111-1111-111111111111', private.accra_week_start(), 3) $$,
  'a learner sets a goal for this week');
select lives_ok(
  $$ insert into public.weekly_goals (profile_id, week_start, topics_target)
     values ('11111111-1111-1111-1111-111111111111', private.accra_week_start(), 5)
     on conflict (profile_id, week_start) do update set topics_target = excluded.topics_target $$,
  'and changes it with an upsert');
select is((select topics_target from public.weekly_goals), 5::smallint, 'the goal is now 5');
select throws_ok(
  $$ insert into public.weekly_goals (profile_id, week_start, topics_target)
     values ('11111111-1111-1111-1111-111111111111', private.accra_week_start() - 7, 1) $$,
  '42501', null, 'a learner cannot set a goal for a past week');
select throws_ok(
  $$ insert into public.weekly_goals (profile_id, week_start, topics_target)
     values ('22222222-2222-2222-2222-222222222222', private.accra_week_start(), 1) $$,
  '42501', null, 'a learner cannot set a goal for someone else');
select throws_ok(
  $$ update public.weekly_goals set topics_target = 2 $$,
  '23514', null, 'goals are 1, 3 or 5 topics');

-- Reviews need a passed quiz
select throws_ok(
  $$ select * from public.submit_review('[]') $$,
  'P0002', null, 'no review before any quiz is passed');
select results_eq(
  $$ select passed from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-00000000000a', '{"q1": 1, "q2": 0}') $$,
  $$ values (true) $$, 'Wumpini passes the Sheets quiz');

select throws_ok(
  $$ select * from public.submit_review('[{"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q1","choice":1}]') $$,
  '22023', null, 'a review has every available question up to five, not one easy one');
select throws_ok(
  $$ select * from public.submit_review('[
       {"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q1","choice":1},
       {"node_id":"bbbbbbbb-0000-0000-0000-00000000000b","question_id":"q1","choice":1}]') $$,
  '42501', null, 'questions from a quiz the learner has not passed are refused');
select throws_ok(
  $$ select * from public.submit_review('[
       {"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q1","choice":1},
       {"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q1","choice":0}]') $$,
  '22023', null, 'a question cannot appear twice');
select throws_ok(
  $$ select * from public.submit_review('[
       {"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q1","choice":"1"},
       {"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q2","choice":0}]') $$,
  '22023', null, 'choices are JSON numbers');

-- Snapshot what a review must never change
create temp table before_review on commit drop as
  select rp.node_id, rp.status, rp.quiz_score, rp.verified_at from public.roadmap_progress rp;
create temp table stats_before on commit drop as
  select nodes_completed, current_streak from public.public_profile_stats where public_slug = 'wumpini';

select results_eq(
  $$ select correct_count, question_count, results from public.submit_review('[
       {"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q2","choice":1},
       {"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q1","choice":1}]') $$,
  $$ values (1, 2, '[{"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q2","correct":false},
                     {"node_id":"bbbbbbbb-0000-0000-0000-00000000000a","question_id":"q1","correct":true}]'::jsonb) $$,
  'the database grades the review and returns only right or wrong');
select results_eq(
  $$ select question_count, correct_count from public.review_sessions $$,
  $$ values (2::smallint, 1::smallint) $$, 'the finished review is recorded');
select results_eq(
  $$ select question_id, correct from public.review_answers order by question_id $$,
  $$ values ('q1', true), ('q2', false) $$, 'with which questions were right');
select set_eq(
  $$ select rp.node_id, rp.status, rp.quiz_score, rp.verified_at from public.roadmap_progress rp $$,
  $$ select * from before_review $$, 'a review does not change verified completions');
select set_eq(
  $$ select nodes_completed, current_streak from public.public_profile_stats where public_slug = 'wumpini' $$,
  $$ select * from stats_before $$, 'a review does not change the leaderboards');
select is((select count(*)::int from public.achievements where type <> 'roadmap_node_completed'), 0,
  'a review mints no achievement');

-- Fuseini sees none of it
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.weekly_goals), 0, 'another learner cannot read the goal');
select is((select count(*)::int from public.review_sessions), 0, 'or the reviews');
select is((select count(*)::int from public.review_answers), 0, 'or the review answers');
select is_empty(
  $$ update public.weekly_goals set topics_target = 1 returning 1 $$,
  'or change the goal');

-- Mariama, an admin, reads them
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is(
  (select count(*)::int from public.weekly_goals) + (select count(*)::int from public.review_sessions)
    + (select count(*)::int from public.review_answers),
  4, 'admins read goals, reviews and answers');

-- Answer keys stay hidden from learners
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.node_quiz_answers), 0, 'the answer key stays hidden from the learner');

select * from finish();
rollback;
