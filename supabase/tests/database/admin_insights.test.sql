-- Admin insights (issue #243): every report function refuses anyone but an
-- admin, and the admin numbers come out right on a small seeded set.
begin;
create extension if not exists pgtap with schema extensions;
select plan(45);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set region = 'northern' where id = '11111111-1111-1111-1111-111111111111';
-- Wumpini signed up four weeks ago (a Monday based week cohort), Mariama today.
update public.profiles set created_at = now() - interval '28 days' where id = '11111111-1111-1111-1111-111111111111';
update public.profiles set created_at = now() - interval '200 days' where id = '44444444-4444-4444-4444-444444444444';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 2, false);
insert into public.node_quiz (node_id, questions, pass_threshold) values
  ('bbbbbbbb-0000-0000-0000-000000000001', '[{"id":"q1","prompt":"What is a cell?","options":["A","B"]}]', 70);

-- Wumpini passed Spreadsheets; Mariama tried and scored under the mark.
insert into public.roadmap_progress (profile_id, node_id, status, quiz_score, created_at, completed_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', 80,
   now() - interval '3 days', now() - interval '2 days'),
  ('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', 40,
   now() - interval '2 days', null);

-- A DMP style cohort that started 30 days ago: Wumpini sent week 1 on time
-- and nothing since (two missing weeks, so at risk); Mariama sent all three.
insert into public.programs (id, slug, title, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Test programme', true);
insert into public.program_weeks (id, program_id, week_number, specialization, theme, assignment, is_capstone) values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 1, null, 'Basics', 'Write tips', false),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 2, null, 'Plans', 'Plan', false),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 3, null, 'Reports', 'Report', false);
insert into public.cohorts (id, program_id, name, starts_on, status) values
  ('c0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000001', 'Cohort A',
   (now() at time zone 'UTC')::date - 30, 'running');
insert into public.cohort_members (cohort_id, profile_id, role) values
  ('c0000000-0000-0000-0000-00000000000a', '11111111-1111-1111-1111-111111111111', 'learner'),
  ('c0000000-0000-0000-0000-00000000000a', '22222222-2222-2222-2222-222222222222', 'learner');
insert into public.submissions (profile_id, program_id, program_week_id, cohort_id, status, body_text, submitted_at,
                                final_score, graded_at) values
  ('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001',
   'c0000000-0000-0000-0000-00000000000a', 'graded', 'Tips', now() - interval '25 days', 70, now() - interval '24 days'),
  ('22222222-2222-2222-2222-222222222222', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001',
   'c0000000-0000-0000-0000-00000000000a', 'submitted', 'Tips', now() - interval '25 days', null, null),
  ('22222222-2222-2222-2222-222222222222', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002',
   'c0000000-0000-0000-0000-00000000000a', 'submitted', 'Plan', now() - interval '17 days', null, null),
  ('22222222-2222-2222-2222-222222222222', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003',
   'c0000000-0000-0000-0000-00000000000a', 'submitted', 'Report', now() - interval '3 days', null, null);

-- Events: Wumpini active today and in week 1 after sign up; two visitors.
insert into public.events (name, profile_id, anonymous_id, props, created_at, device_class, signed_in) values
  ('page_view', '11111111-1111-1111-1111-111111111111', 'aid-w', '{}', now() - interval '1 minute', 'mobile', true),
  ('page_view', '11111111-1111-1111-1111-111111111111', 'aid-w', '{}', now() - interval '20 days', 'mobile', true),
  ('page_view', null, 'aid-a', '{}', now() - interval '1 minute', 'desktop', false),
  ('page_view', null, 'aid-b', '{}', now() - interval '1 minute', 'mobile', false),
  ('signup', '22222222-2222-2222-2222-222222222222', 'aid-b', '{"method":"email"}', now() - interval '1 minute', 'mobile', true),
  ('web_vital', null, 'aid-a', '{"metric":"LCP","value":1200,"rating":"good"}', now() - interval '1 minute', 'desktop', false),
  ('web_vital', null, 'aid-b', '{"metric":"LCP","value":4800,"rating":"poor"}', now() - interval '1 minute', 'desktop', false),
  ('action_failed', '11111111-1111-1111-1111-111111111111', null,
   '{"action":"booking_requested","refusal":"validation","code":"23514"}', now() - interval '1 minute', 'mobile', true),
  ('booking_requested', '11111111-1111-1111-1111-111111111111', null, '{}', now() - interval '1 minute', 'mobile', true);
update public.events set route = '/learn' where name = 'web_vital';
select private.refresh_analytics_rollups((now() at time zone 'UTC')::date - 30, (now() at time zone 'UTC')::date);

-- Shape -----------------------------------------------------------------------------

select ok(
  (select bool_and(p.prosecdef and p.proconfig @> array['search_path=""'])
     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname like 'admin\_insights\_%'),
  'every report function is security definer with an empty search path');
select is(
  (select count(*)::int from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname like 'admin\_insights\_%'),
  25, 'twenty five report functions');
select ok(
  not has_function_privilege('anon', 'public.admin_insights_overview(date, date, text, text, uuid, uuid, text)', 'execute'),
  'signed out visitors cannot call a report function');

-- A learner is refused by every function ------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select throws_ok(format('select * from public.%I(current_date - 7, current_date)', f), '42501', null, f || ' refuses a learner')
  from unnest(array[
    'admin_insights_overview', 'admin_insights_daily', 'admin_insights_funnel', 'admin_insights_signup_methods',
    'admin_insights_forms', 'admin_insights_retention', 'admin_insights_retention_cohorts', 'admin_insights_roadmaps',
    'admin_insights_topics', 'admin_insights_questions', 'admin_insights_reviews', 'admin_insights_features',
    'admin_insights_cohorts', 'admin_insights_at_risk', 'admin_insights_earn', 'admin_insights_earn_daily',
    'admin_insights_outcomes', 'admin_insights_community', 'admin_insights_community_daily', 'admin_insights_chapters',
    'admin_insights_error_daily', 'admin_insights_errors', 'admin_insights_failures', 'admin_insights_vitals'
  ]) as f;
select throws_ok($$ select public.admin_insights_rollups_to() $$, '42501', null, 'rollups_to refuses a learner');
reset role;

-- An admin -------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);

select throws_ok($$ select * from public.admin_insights_overview(current_date, current_date - 1) $$,
  '22023', null, 'a backwards range is refused');
select throws_ok($$ select * from public.admin_insights_overview(current_date - 500, current_date) $$,
  '22023', null, 'a range over 400 days is refused');

select results_eq(
  $$ select active_people, visitors, dau, signups from public.admin_insights_overview(current_date - 6, current_date) $$,
  $$ values (2, 2, 2, 1) $$,
  'overview: two signed in people, two visitors, one sign up this week');
select results_eq(
  $$ select visited, signed_up from public.admin_insights_funnel(current_date - 6, current_date) where device_class = 'all' $$,
  $$ values (3, 1) $$,
  'funnel: three browsers visited and one signed up');
select ok(
  not exists (select 1 from public.admin_insights_retention(current_date - 35, current_date)
               where cohort_week + 7 * (week_offset + 1) > current_date),
  'retention: weeks that have not ended are left out, never shown as zero');
select is(
  (select cohort_size from public.admin_insights_retention_cohorts(current_date - 35, current_date)
    where cohort_week = (date_trunc('week', current_date))::date),
  1, 'retention: Mariama makes this week''s cohort');
select results_eq(
  $$ select learners, quiz_attempted, quiz_passed from public.admin_insights_roadmaps(current_date - 6, current_date) $$,
  $$ values (2, 2, 1) $$,
  'learning: two learners attempted the quiz, one passed');
select results_eq(
  $$ select learners from public.admin_insights_roadmaps(current_date - 6, current_date, null, 'northern') $$,
  $$ values (1) $$,
  'learning: the region filter keeps Wumpini only');
select results_eq(
  $$ select learners, weeks_due, on_time, missing, at_risk from public.admin_insights_cohorts(current_date - 6, current_date) $$,
  $$ values (2, 3, 4, 2, 1) $$,
  'cohorts: three weeks due, four sent on time, two missing, one learner at risk');
select results_eq(
  $$ select learner_name, missing_weeks from public.admin_insights_at_risk(current_date - 6, current_date) $$,
  $$ values ('Wumpini Alhassan'::text, 2) $$,
  'at risk: Wumpini, by name only');
select results_eq(
  $$ select action, successes, failures, validation from public.admin_insights_failures(current_date - 6, current_date) $$,
  $$ values ('booking_requested'::text, 1, 1, 1) $$,
  'reliability: one success and one validation failure for booking requests');
select results_eq(
  $$ select samples, p75::int, good, poor from public.admin_insights_vitals(current_date - 6, current_date) $$,
  $$ values (2, 3900, 1, 1) $$,
  'reliability: LCP p75 from the raw samples');
select ok(
  (select events from public.admin_insights_features(current_date - 6, current_date) where name = 'page_view') = 3,
  'feature use: page views counted from the rollup');
select is(public.admin_insights_rollups_to(), (now() at time zone 'UTC')::date, 'rollups reach today after a refresh');
select lives_ok($$ select * from public.admin_insights_earn(current_date - 6, current_date) $$, 'earn runs for an admin');
select lives_ok($$ select * from public.admin_insights_community(current_date - 6, current_date) $$, 'community runs for an admin');
select lives_ok($$ select * from public.admin_insights_questions(current_date - 6, current_date) $$, 'questions run for an admin');
reset role;

select * from finish();
rollback;
