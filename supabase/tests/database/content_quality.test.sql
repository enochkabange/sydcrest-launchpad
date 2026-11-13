-- Content quality (epic #320, issue #326): lesson feedback and the rewrite queue's counts.
begin;
create extension if not exists pgtap with schema extensions;
select plan(20);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email, jsonb_build_object('full_name', name), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
    ('22222222-2222-2222-2222-222222222222', 'mariama@example.test', 'Mariama Seidu'),
    ('33333333-3333-3333-3333-333333333333', 'fuseini@example.test', 'Fuseini Mahama')) v(id, email, name);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'draft-map', 'Draft', false);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 2, false),
  ('bbbbbbbb-0000-0000-0000-000000000009', 'aaaaaaaa-0000-0000-0000-000000000002', 'hidden', 'Hidden', 1, false);
insert into public.node_quiz (node_id, questions) values
  ('bbbbbbbb-0000-0000-0000-000000000002',
   '[{"id":"q1","prompt":"Which clause filters rows?","options":["ORDER BY","WHERE","GROUP BY"]}]');

-- Answers to q1 on SQL: in passed attempts 1 of 3 right (two chose ORDER BY), in failed attempts 1 of 2 right,
-- plus one old answer without choice or passed.
insert into public.events (name, profile_id, props, created_at) values
  ('quiz_question_answered', '11111111-1111-1111-1111-111111111111', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","question_id":"q1","correct":false,"choice":0,"passed":true}', now() - interval '1 day'),
  ('quiz_question_answered', '11111111-1111-1111-1111-111111111111', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","question_id":"q1","correct":false,"choice":0,"passed":true}', now() - interval '1 day'),
  ('quiz_question_answered', '22222222-2222-2222-2222-222222222222', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","question_id":"q1","correct":true,"choice":1,"passed":true}', now() - interval '1 day'),
  ('quiz_question_answered', '22222222-2222-2222-2222-222222222222', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","question_id":"q1","correct":true,"choice":1,"passed":false}', now() - interval '1 day'),
  ('quiz_question_answered', '22222222-2222-2222-2222-222222222222', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","question_id":"q1","correct":false,"choice":2,"passed":false}', now() - interval '1 day'),
  ('quiz_question_answered', '22222222-2222-2222-2222-222222222222', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","question_id":"q1","correct":true}', now() - interval '2 days'),
  ('quiz_question_answered', '22222222-2222-2222-2222-222222222222', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","question_id":"q1","correct":true}', now() - interval '200 days');

-- Reading: Wumpini left Spreadsheets, then failed the SQL quiz an hour later; Mariama read Spreadsheets twice.
insert into public.events (name, profile_id, props, created_at) values
  ('lesson_left', '11111111-1111-1111-1111-111111111111', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000001","time_spent_ms":60000,"scroll_percent":40,"done_before":false}', now() - interval '3 hours'),
  ('quiz_submitted', '11111111-1111-1111-1111-111111111111', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","score":0,"passed":false}', now() - interval '2 hours'),
  ('lesson_left', '22222222-2222-2222-2222-222222222222', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000001","time_spent_ms":180000,"scroll_percent":80,"done_before":false}', now() - interval '5 hours'),
  ('lesson_left', '22222222-2222-2222-2222-222222222222', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000001","time_spent_ms":300000,"scroll_percent":100,"done_before":true}', now() - interval '4 hours'),
  ('quiz_submitted', '22222222-2222-2222-2222-222222222222', '{"node_id":"bbbbbbbb-0000-0000-0000-000000000002","score":100,"passed":true}', now() - interval '1 hour'),
  ('study_buddy_message', '22222222-2222-2222-2222-222222222222', '{"turn":1,"node_id":"bbbbbbbb-0000-0000-0000-000000000001","kind":"intent"}', now() - interval '4 hours'),
  ('study_buddy_message', '22222222-2222-2222-2222-222222222222', '{"turn":5,"node_id":"bbbbbbbb-0000-0000-0000-000000000001","kind":"code"}', now() - interval '4 hours'),
  ('study_buddy_message', '22222222-2222-2222-2222-222222222222', '{"turn":1}', now() - interval '4 hours');

-- Table and privileges -----------------------------------------------------------

select has_table('public', 'lesson_feedback', 'lesson_feedback exists');
select ok((select relrowsecurity from pg_class where oid = 'public.lesson_feedback'::regclass), 'RLS is on');
select ok(not has_table_privilege('authenticated', 'public.lesson_feedback', 'insert'), 'members cannot insert directly');
select ok(not has_table_privilege('authenticated', 'public.lesson_feedback', 'update'), 'or update directly');
select ok(not has_function_privilege('anon', 'public.give_lesson_feedback(uuid, boolean, text)', 'execute'), 'visitors cannot give feedback');
select ok(not has_function_privilege('anon', 'public.admin_content_lessons(integer)', 'execute'), 'visitors cannot run the lesson report');
select ok(private.is_event_name('lesson_feedback_given'), 'lesson_feedback_given is an event name');

-- Learners -----------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select lives_ok($$ select public.give_lesson_feedback('bbbbbbbb-0000-0000-0000-000000000001', false, 'missing_example') $$, 'a learner says a lesson was not clear');
select lives_ok($$ select public.give_lesson_feedback('bbbbbbbb-0000-0000-0000-000000000001', false, 'confusing') $$, 'and changes the reason');
select results_eq(
  $$ select clear, reason from public.lesson_feedback $$,
  $$ values (false, 'confusing') $$,
  'one row per lesson, the latest answer wins');
select lives_ok($$ select public.give_lesson_feedback('bbbbbbbb-0000-0000-0000-000000000002', true, 'too_long') $$, 'a yes ignores any reason');
select is((select reason from public.lesson_feedback where node_id = 'bbbbbbbb-0000-0000-0000-000000000002'), null, 'so none is stored');
select throws_ok($$ select public.give_lesson_feedback('bbbbbbbb-0000-0000-0000-000000000001', false, 'boring') $$, '23514', null, 'only listed reasons');
select throws_ok($$ select public.give_lesson_feedback('bbbbbbbb-0000-0000-0000-000000000009', true) $$, 'P0002', null, 'only published topics');
select throws_ok($$ select * from public.admin_content_questions() $$, '42501', null, 'a learner cannot read question analysis');
select throws_ok($$ select * from public.admin_content_lessons() $$, '42501', null, 'or lesson signals');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select lives_ok($$ select public.give_lesson_feedback('bbbbbbbb-0000-0000-0000-000000000001', true) $$, 'another learner says it was clear');
select is((select count(*)::int from public.lesson_feedback), 1, 'learners read only their own feedback');

-- Admins -------------------------------------------------------------------------

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select results_eq(
  $$ select roadmap_slug, question_id, prompt, answers, correct, passed_answers, passed_correct, failed_answers, failed_correct,
            wrong_with_choice, wrong_choice, wrong_choice_count, wrong_option
       from public.admin_content_questions(90) $$,
  $$ values ('data-analyst', 'q1', 'Which clause filters rows?', 6, 3, 3, 1, 2, 1, 3, 0, 2, 'ORDER BY') $$,
  'question counts: overall, passed and failed attempts, and the most chosen wrong option (old answers count only in totals)');
select results_eq(
  $$ select topic_title, visits, median_ms, median_scroll, left_before_fail, quiz_attempts, quiz_fails, clear_yes, clear_no, top_reason,
            buddy_messages, buddy_chats, buddy_deep, buddy_why, buddy_code, buddy_long
       from public.admin_content_lessons(90) order by node_id $$,
  $$ values ('Spreadsheets', 3, 180000, 80, 1, 0, 0, 1, 1, 'confusing'::text, 2, 1, 1, 1, 1, 0),
            ('SQL', 0, null::integer, null::integer, 0, 2, 1, 1, 0, null::text, 0, 0, 0, 0, 0, 0) $$,
  'lesson signals: reading medians, the lesson left before a failed quiz, feedback and Study Buddy counts');
reset role;

select * from finish();
rollback;
