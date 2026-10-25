-- Learner state: roadmap_progress, achievements, personalized_paths,
-- consents, ai_usage and the functions that write them. Owner only reads;
-- the numbers that matter are set by the database, not the learner.
begin;
create extension if not exists pgtap with schema extensions;
select plan(45);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now());

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'frontend', 'Frontend Developer', false);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 2, false),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'power-bi', 'Power BI', 3, true),
  ('bbbbbbbb-0000-0000-0000-000000000009', 'aaaaaaaa-0000-0000-0000-000000000002', 'html', 'HTML', 1, false);
insert into public.node_quiz (id, node_id, questions, pass_threshold) values
  ('cccccccc-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
   '[{"id":"q1","prompt":"?","options":["a","b"]},{"id":"q2","prompt":"?","options":["a","b","c"]}]', 100);
insert into public.node_quiz_answers (quiz_id, answer_key) values
  ('cccccccc-0000-0000-0000-000000000001', '{"q1": 1, "q2": 2}');
insert into public.personalized_paths (profile_id, quiz_answers, recommended_roadmap_id) values
  ('11111111-1111-1111-1111-111111111111', '{"goal":"job"}', 'aaaaaaaa-0000-0000-0000-000000000001');

-- Minting is idempotent (as the server would call it)
select is(private.mint_achievement('22222222-2222-2222-2222-222222222222', 'streak', '7'), true,
  'first mint creates the achievement');
select is(private.mint_achievement('22222222-2222-2222-2222-222222222222', 'streak', '7'), false,
  'minting the same achievement again is a no op');
select is(public.mint_achievement('22222222-2222-2222-2222-222222222222', 'path_personalized'), true,
  'the service wrapper mints too');
select is(public.mint_achievement('22222222-2222-2222-2222-222222222222', 'path_personalized'), false,
  'a null ref still dedupes');
select is((select count(*)::int from public.achievements where profile_id = '22222222-2222-2222-2222-222222222222'), 2,
  'repeat mints leave one row each');
select throws_ok($$ select private.mint_achievement('22222222-2222-2222-2222-222222222222', 'gold_star') $$,
  '23514', null, 'achievement type comes from the fixed list');

-- Act as Wumpini
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

-- Progress cannot be written directly
select throws_ok(
  $$ insert into public.roadmap_progress (profile_id, node_id, status, completed_at)
     values ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', now()) $$,
  '42501', null, 'a learner cannot insert progress directly');
select throws_ok(
  $$ select public.set_node_status('bbbbbbbb-0000-0000-0000-000000000001', 'done') $$,
  '42501', null, 'a node with a quiz cannot be marked done without passing it');
select throws_ok(
  $$ select public.set_node_status('bbbbbbbb-0000-0000-0000-000000000009', 'in_progress') $$,
  'P0002', null, 'progress cannot be tracked on unpublished nodes');
select throws_ok(
  $$ select public.set_node_status('bbbbbbbb-0000-0000-0000-000000000002', 'finished') $$,
  '22023', null, 'status must be a known value');

select lives_ok($$ select public.set_node_status('bbbbbbbb-0000-0000-0000-000000000002', 'in_progress') $$,
  'a learner starts a node');
select results_eq($$ select status from public.roadmap_progress $$, $$ values ('in_progress') $$,
  'a learner sees their own progress');
select throws_ok(
  $$ update public.roadmap_progress set status = 'done', completed_at = now() $$,
  '42501', null, 'a learner cannot update progress directly');
select throws_ok(
  $$ update public.roadmap_progress set quiz_score = 100 $$,
  '42501', null, 'a learner cannot set their own quiz score');

-- Quiz grading
select results_eq(
  $$ select score, passed, results from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-000000000001', '{"q1": 1, "q2": 0}') $$,
  $$ values (50::smallint, false, '{"q1": true, "q2": false}'::jsonb) $$,
  'a partly wrong quiz is graded and fails');
select results_eq(
  $$ select status, quiz_score from public.roadmap_progress where node_id = 'bbbbbbbb-0000-0000-0000-000000000001' $$,
  $$ values ('in_progress', 50::smallint) $$,
  'a failed quiz records the score and leaves the node in progress');
select throws_ok(
  $$ select * from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-000000000001', '[1, 2]') $$,
  '22023', null, 'answers must be an object');
select results_eq(
  $$ select score, passed from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-000000000001', '{"q1": 1, "q2": 2}') $$,
  $$ values (100::smallint, true) $$,
  'a correct quiz passes');
select results_eq(
  $$ select status, quiz_score, completed_at is not null from public.roadmap_progress
     where node_id = 'bbbbbbbb-0000-0000-0000-000000000001' $$,
  $$ values ('done', 100::smallint, true) $$,
  'passing marks the node done');
select results_eq(
  $$ select score, passed from public.submit_node_quiz('bbbbbbbb-0000-0000-0000-000000000001', '{}') $$,
  $$ values (0::smallint, false) $$,
  'a later failed attempt is still graded');
select results_eq(
  $$ select status, quiz_score from public.roadmap_progress where node_id = 'bbbbbbbb-0000-0000-0000-000000000001' $$,
  $$ values ('done', 100::smallint) $$,
  'a later failure keeps the best score and the done status');
select results_eq(
  $$ select type, ref_id from public.achievements $$,
  $$ values ('roadmap_node_completed', 'bbbbbbbb-0000-0000-0000-000000000001') $$,
  'passing mints the node achievement');

-- Completing the last required node completes the roadmap (optional nodes do not count)
select lives_ok($$ select public.set_node_status('bbbbbbbb-0000-0000-0000-000000000002', 'done') $$,
  'a node without a quiz can be marked done');
select lives_ok($$ select public.set_node_status('bbbbbbbb-0000-0000-0000-000000000002', 'done') $$,
  'marking done twice is harmless');
select results_eq(
  $$ select type, ref_id from public.achievements order by type, ref_id $$,
  $$ values ('roadmap_completed', 'aaaaaaaa-0000-0000-0000-000000000001'),
            ('roadmap_node_completed', 'bbbbbbbb-0000-0000-0000-000000000001'),
            ('roadmap_node_completed', 'bbbbbbbb-0000-0000-0000-000000000002') $$,
  'finishing every required node mints the roadmap achievement, once each');
select throws_ok(
  $$ insert into public.achievements (profile_id, type) values ('11111111-1111-1111-1111-111111111111', 'streak') $$,
  '42501', null, 'a learner cannot insert achievements');

-- Study Buddy usage
select lives_ok($$ select public.record_ai_usage(120, 300) $$, 'usage is recorded');
select results_eq(
  $$ select (u).messages, (u).input_tokens, (u).output_tokens from (select public.record_ai_usage(80, 0) as u) s $$,
  $$ values (2, 200::bigint, 300::bigint) $$,
  'usage accumulates per day');
select throws_ok($$ select public.record_ai_usage(-500, 0) $$, '22023', null,
  'usage counters cannot be lowered');
select throws_ok($$ update public.ai_usage set messages = 0 $$, '42501', null,
  'a learner cannot reset their usage');
select throws_ok(
  $$ insert into public.ai_usage (profile_id, day) values ('11111111-1111-1111-1111-111111111111', current_date + 1) $$,
  '42501', null, 'a learner cannot insert usage rows');

-- Personalized paths
select is((select count(*)::int from public.personalized_paths), 1, 'a learner reads their own path');
select throws_ok(
  $$ insert into public.personalized_paths (profile_id, quiz_answers) values ('11111111-1111-1111-1111-111111111111', '{}') $$,
  '42501', null, 'a learner cannot write a path directly');

-- Consents
select lives_ok($$ insert into public.consents (kind, version) values ('whatsapp', '2026-10') $$,
  'a learner records consent');
select throws_ok(
  $$ insert into public.consents (profile_id, kind, version) values ('22222222-2222-2222-2222-222222222222', 'terms', '1') $$,
  '42501', null, 'a learner cannot record consent for someone else');
select throws_ok(
  $$ insert into public.consents (kind, version, granted_at) values ('terms', '1', now() - interval '1 year') $$,
  '42501', null, 'granted_at is set by the server');
select throws_ok($$ update public.consents set revoked_at = null $$, '42501', null,
  'consent rows cannot be edited');
select is(public.revoke_consent('whatsapp'), 1, 'a learner revokes their consent');
reset role;

-- Act as Mariama
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.roadmap_progress), 0, 'others cannot see a learner''s progress');
select is((select count(*)::int from public.ai_usage), 0, 'others cannot see a learner''s usage');
select is((select count(*)::int from public.personalized_paths), 0, 'others cannot see a learner''s path');
select is((select count(*)::int from public.consents), 0, 'others cannot see a learner''s consents');
select is((select count(*)::int from public.achievements where profile_id = '11111111-1111-1111-1111-111111111111'), 0,
  'achievements of a private profile are hidden from others');
reset role;

-- Signed out
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select throws_ok($$ select 1 from public.roadmap_progress $$, '42501', null,
  'signed out visitors cannot read progress');
select throws_ok($$ select public.submit_node_quiz('bbbbbbbb-0000-0000-0000-000000000001', '{}') $$, '42501', null,
  'signed out visitors cannot submit quizzes');
reset role;

select * from finish();
rollback;
