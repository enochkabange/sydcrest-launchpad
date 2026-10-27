-- Phase 2 (issue #142): submissions, AI and mentor review, peer review and
-- the private submissions bucket. Scores are server only; peers see only
-- what they were assigned, and only the work.
begin;
create extension if not exists pgtap with schema extensions;
select plan(60);

-- Wumpini and Abdul-Rahman learn in cohort A (SEO), Mariama mentors it.
-- Sumaila learns in cohort B (Ads), Ayishetu mentors B. Fuseini is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama'),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari')
) as u(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.programs (id, slug, title, specializations, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Test programme',
   '[{"slug":"seo","label":"SEO"},{"slug":"ads","label":"Ads"}]', true);
insert into public.program_weeks (id, program_id, week_number, specialization, theme, assignment, is_capstone) values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 1, null, 'Basics', 'Write tips', false),
  ('b0000000-0000-0000-0000-00000000002a', 'a0000000-0000-0000-0000-000000000001', 2, 'ads', 'Ads', 'Plan ads', false),
  ('b0000000-0000-0000-0000-00000000002b', 'a0000000-0000-0000-0000-000000000001', 2, 'seo', 'SEO', 'Plan SEO', false),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 3, null, 'Capstone', 'Capstone', true);
insert into public.rubrics (program_id, title, criteria) values
  ('a0000000-0000-0000-0000-000000000001', 'Default',
   '[{"id":"objectives","label":"Objectives","max_points":4},{"id":"clarity","label":"Clarity","max_points":4}]');
insert into public.cohorts (id, program_id, name, starts_on) values
  ('c0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000001', 'Cohort A', '2027-01-11'),
  ('c0000000-0000-0000-0000-00000000000b', 'a0000000-0000-0000-0000-000000000001', 'Cohort B', '2027-04-12');
insert into public.cohort_members (cohort_id, profile_id, role, specialization) values
  ('c0000000-0000-0000-0000-00000000000a', '11111111-1111-1111-1111-111111111111', 'learner', 'seo'),
  ('c0000000-0000-0000-0000-00000000000a', '22222222-2222-2222-2222-222222222222', 'learner', 'seo'),
  ('c0000000-0000-0000-0000-00000000000a', '33333333-3333-3333-3333-333333333333', 'mentor', null),
  ('c0000000-0000-0000-0000-00000000000b', '55555555-5555-5555-5555-555555555555', 'learner', 'ads'),
  ('c0000000-0000-0000-0000-00000000000b', '66666666-6666-6666-6666-666666666666', 'mentor', null);

select results_eq(
  $$ select public, file_size_limit from storage.buckets where id = 'submissions' $$,
  $$ values (false, 52428800::bigint) $$, 'the submissions bucket is private');

-- Learner: writing work ----------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select throws_ok(
  $$ insert into public.submissions (profile_id, program_id, program_week_id, cohort_id, status)
     values ('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001',
             'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-00000000000a', 'graded') $$,
  '42501', null, 'learners cannot insert submissions directly');
select results_eq(
  $$ select status from public.save_submission('b0000000-0000-0000-0000-000000000001', 'Draft tips', p_submit => false) $$,
  $$ values ('draft') $$, 'a learner saves a draft');
select throws_ok(
  $$ select public.save_submission('b0000000-0000-0000-0000-00000000002a', 'Ads plan') $$,
  '42501', null, 'a learner cannot submit another specialization''s week');
select throws_ok(
  $$ select public.save_submission('b0000000-0000-0000-0000-000000000001', null, null, '22222222-2222-2222-2222-222222222222/x.pdf') $$,
  '42501', null, 'a learner cannot attach a file from someone else''s folder');
select throws_ok(
  $$ select public.save_submission('b0000000-0000-0000-0000-000000000001', '  ') $$,
  '22023', null, 'empty work cannot be submitted');
select results_eq(
  $$ select status, attempt, submitted_at is not null, cohort_id from public.save_submission(
       'b0000000-0000-0000-0000-000000000001', 'Use strong passwords', 'https://docs.google.com/document/d/x',
       '11111111-1111-1111-1111-111111111111/w1/tips.pdf') $$,
  $$ values ('submitted', 1::smallint, true, 'c0000000-0000-0000-0000-00000000000a'::uuid) $$,
  'a learner submits text, a link and a file');
select lives_ok(
  $$ insert into storage.objects (bucket_id, name, owner) values
     ('submissions', '11111111-1111-1111-1111-111111111111/w1/tips.pdf', '11111111-1111-1111-1111-111111111111') $$,
  'a learner uploads to their own folder');
select throws_ok(
  $$ insert into storage.objects (bucket_id, name) values
     ('submissions', '22222222-2222-2222-2222-222222222222/w1/fake.pdf') $$,
  '42501', null, 'a learner cannot upload into someone else''s folder');

select throws_ok($$ update public.submissions set final_score = 100 $$, '42501', null, 'a learner cannot set final_score');
select throws_ok($$ update public.submissions set status = 'graded' $$, '42501', null, 'a learner cannot set the status');
select throws_ok($$ update public.submissions set ai_score = 100, ai_feedback = '{}' $$, '42501', null, 'a learner cannot write AI feedback');
select throws_ok($$ update public.submissions set mentor_feedback = 'Great' $$, '42501', null, 'a learner cannot write mentor feedback');
select throws_ok($$ update public.submissions set in_portfolio = true $$, '23514', null, 'ungraded work cannot go in the portfolio');
select throws_ok(
  $$ select public.record_ai_review((select id from public.submissions limit 1), 1::smallint, '{"summary":"great"}', 100::smallint, 'x') $$,
  '42501', null, 'a learner cannot record an AI review');
select throws_ok(
  $$ select public.grade_submission((select id from public.submissions limit 1), 100::smallint) $$,
  '42501', null, 'a learner cannot grade their own work');
select throws_ok(
  $$ select public.assign_peer_review((select id from public.submissions limit 1), '22222222-2222-2222-2222-222222222222') $$,
  '42501', null, 'a learner cannot assign peer reviews');

-- Classmates and other cohorts ------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.submissions), 0, 'a classmate cannot read unassigned work');
select is((select count(*)::int from storage.objects where bucket_id = 'submissions'), 0, 'a classmate cannot read unassigned files');
select lives_ok(
  $$ select public.save_submission('b0000000-0000-0000-0000-000000000001', 'Abdul tips') $$, 'a classmate submits week 1');
select lives_ok(
  $$ select public.save_submission('b0000000-0000-0000-0000-000000000003', 'Abdul capstone', null,
       '22222222-2222-2222-2222-222222222222/capstone.pdf') $$, 'a classmate submits the capstone');
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.submissions), 0, 'a learner cannot read another cohort''s work');
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.submissions), 0, 'a mentor cannot read another cohort''s work');
select is((select count(*)::int from storage.objects where bucket_id = 'submissions'), 0, 'a mentor cannot read another cohort''s files');
select throws_ok(
  $$ select public.grade_submission((select id from public.submissions limit 1), 90::smallint) $$,
  'P0002', null, 'a mentor cannot grade work they cannot see');

reset role;
select set_config('request.jwt.claims', '', true);
insert into storage.objects (bucket_id, name, owner) values
  ('submissions', '22222222-2222-2222-2222-222222222222/capstone.pdf', '22222222-2222-2222-2222-222222222222'),
  ('submissions', '22222222-2222-2222-2222-222222222222/unattached.pdf', '22222222-2222-2222-2222-222222222222');

set local role anon;
select throws_ok($$ select * from public.submissions $$, '42501', null, 'anon cannot read submissions');
select throws_ok($$ select * from public.peer_reviews $$, '42501', null, 'anon cannot read peer reviews');
select throws_ok($$ select * from public.peer_review_submissions $$, '42501', null, 'anon cannot read the peer review view');
select is((select count(*)::int from storage.objects where bucket_id = 'submissions'), 0, 'anon cannot read submission files');
select throws_ok(
  $$ select public.save_submission('b0000000-0000-0000-0000-000000000001', 'x') $$,
  '42501', null, 'anon cannot submit');

-- AI review (service role) -----------------------------------------------------------
set local role service_role;
select is(
  public.record_ai_review(
    (select id from public.submissions where profile_id = '11111111-1111-1111-1111-111111111111'),
    1::smallint, '{"summary":"Clear tips"}', 70::smallint, 'claude-haiku-5-5'),
  true, 'the server records an AI review');
select is(
  public.record_ai_review(
    (select id from public.submissions where profile_id = '11111111-1111-1111-1111-111111111111'),
    2::smallint, '{"summary":"Future"}', 10::smallint, 'claude-haiku-5-5'),
  false, 'a review of another attempt is ignored');

-- Mentor review ------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select results_eq(
  $$ select body_text, ai_score from public.submissions where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('Use strong passwords', 70::smallint) $$, 'the mentor reads the learner''s work and AI review');
select is(
  (select count(*)::int from storage.objects where name = '11111111-1111-1111-1111-111111111111/w1/tips.pdf'), 1,
  'the mentor reads the attached file');
select is(
  (select count(*)::int from storage.objects where name = '22222222-2222-2222-2222-222222222222/unattached.pdf'), 0,
  'the mentor cannot read a file that is not attached to sent work');
select throws_ok(
  $$ update public.submissions set final_score = 90 $$, '42501', null, 'even mentors never write final_score directly');
select results_eq(
  $$ select status, final_score from public.grade_submission(
       (select id from public.submissions where profile_id = '11111111-1111-1111-1111-111111111111'
          and program_week_id = 'b0000000-0000-0000-0000-000000000001'),
       null, 'Add a tip about phishing', p_return => true) $$,
  $$ values ('returned', null::smallint) $$, 'a mentor returns work for changes');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select results_eq(
  $$ select status, attempt, ai_score from public.save_submission('b0000000-0000-0000-0000-000000000001',
       'Use strong passwords and spot phishing', null, '11111111-1111-1111-1111-111111111111/w1/tips.pdf') $$,
  $$ values ('submitted', 2::smallint, null::smallint) $$, 'resubmitting counts a new attempt and clears the old AI review');

set local role service_role;
select is(
  public.record_ai_review(
    (select id from public.submissions where profile_id = '11111111-1111-1111-1111-111111111111'),
    1::smallint, '{"summary":"Stale"}', 50::smallint, 'claude-haiku-5-5'),
  false, 'a late AI review of the previous attempt is ignored');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select throws_ok(
  $$ select public.grade_submission((select id from public.submissions where profile_id = '11111111-1111-1111-1111-111111111111'), 101::smallint) $$,
  '22023', null, 'scores stay within 0 to 100');
select results_eq(
  $$ select status, final_score, graded_by from public.grade_submission(
       (select id from public.submissions where profile_id = '11111111-1111-1111-1111-111111111111'), 80::smallint, 'Well done') $$,
  $$ values ('graded', 80::smallint, '33333333-3333-3333-3333-333333333333'::uuid) $$, 'the mentor sets the final score');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select lives_ok($$ update public.submissions set in_portfolio = true $$, 'the learner adds graded work to their portfolio');
select throws_ok(
  $$ select public.save_submission('b0000000-0000-0000-0000-000000000001', 'Sneaky edit') $$,
  '42501', null, 'graded work cannot be changed by the learner');

-- Peer review ----------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select throws_ok(
  $$ select public.assign_peer_review(
       (select id from public.submissions where program_week_id = 'b0000000-0000-0000-0000-000000000003'),
       '22222222-2222-2222-2222-222222222222') $$,
  '22023', null, 'nobody reviews their own work');
select throws_ok(
  $$ select public.assign_peer_review(
       (select id from public.submissions where program_week_id = 'b0000000-0000-0000-0000-000000000003'),
       '33333333-3333-3333-3333-333333333333') $$,
  '22023', null, 'reviewers are learners in the programme');
select results_eq(
  $$ select reviewer_id, status from public.assign_peer_review(
       (select id from public.submissions where program_week_id = 'b0000000-0000-0000-0000-000000000003'),
       '11111111-1111-1111-1111-111111111111') $$,
  $$ values ('11111111-1111-1111-1111-111111111111'::uuid, 'assigned') $$, 'the mentor assigns a peer to the capstone');
select lives_ok(
  $$ select public.assign_peer_review(
       (select id from public.submissions where program_week_id = 'b0000000-0000-0000-0000-000000000003'),
       '11111111-1111-1111-1111-111111111111') $$,
  'assigning twice is harmless');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select results_eq(
  $$ select body_text, file_path from public.peer_review_submissions $$,
  $$ values ('Abdul capstone', '22222222-2222-2222-2222-222222222222/capstone.pdf') $$,
  'the peer reads the assigned work through the view');
select is(
  (select count(*)::int from public.submissions where profile_id = '22222222-2222-2222-2222-222222222222'), 0,
  'the peer reads no submission rows directly (no scores, no AI feedback)');
select is(
  (select count(*)::int from storage.objects where name = '22222222-2222-2222-2222-222222222222/capstone.pdf'), 1,
  'the peer reads the assigned file');
select is(
  (select count(*)::int from storage.objects where name = '22222222-2222-2222-2222-222222222222/unattached.pdf'), 0,
  'the peer cannot read the author''s other files');
select throws_ok(
  $$ update public.peer_reviews set status = 'submitted', submitted_at = now() $$,
  '42501', null, 'a peer cannot write the review row directly');
select throws_ok(
  $$ select public.submit_peer_review((select review_id from public.peer_review_submissions), '{"objectives":4}', 'Good') $$,
  '22023', null, 'every rubric criterion must be scored');
select throws_ok(
  $$ select public.submit_peer_review((select review_id from public.peer_review_submissions), '{"objectives":5,"clarity":3}', 'Good') $$,
  '22023', null, 'scores stay within each criterion''s maximum');
select throws_ok(
  $$ select public.submit_peer_review((select review_id from public.peer_review_submissions), '{"objectives":4,"clarity":3}', ' ') $$,
  '22023', null, 'a comment is required');
select results_eq(
  $$ select status, rubric_scores from public.submit_peer_review((select review_id from public.peer_review_submissions),
       '{"objectives":4,"clarity":3}', 'Clear plan, add a budget') $$,
  $$ values ('submitted', '{"objectives":4,"clarity":3}'::jsonb) $$, 'the peer submits the review');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.peer_review_submissions), 0, 'an unassigned learner sees no peer work');
select throws_ok(
  $$ select public.submit_peer_review((select id from public.peer_reviews limit 1), '{}', 'x') $$,
  'P0002', null, 'only the assigned reviewer submits a review');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select results_eq(
  $$ select comment from public.peer_reviews $$,
  $$ values ('Clear plan, add a budget') $$, 'the author reads the submitted review');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.submissions where status <> 'draft'), 3, 'admins read all sent work');

select * from finish();
rollback;
