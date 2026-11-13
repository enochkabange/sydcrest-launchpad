-- Readiness score v1 and its fairness report (epic #320 step 5, issue #328).
begin;
create extension if not exists pgtap with schema extensions;
select plan(24);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', dob), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '2000-03-14'),
    ('22222222-2222-2222-2222-222222222222', 'mariama@example.test', 'Mariama Seidu', '1990-06-01'),
    ('33333333-3333-3333-3333-333333333333', 'abdul@example.test', 'Abdul-Rahman Issah', '2003-01-20'),
    ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama', '1985-09-09'),
    ('55555555-5555-5555-5555-555555555555', 'hawa@example.test', 'Hawa Yakubu', '1998-11-30')) v(id, email, name, dob);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set is_public = true, public_slug = 'wumpini-alhassan', headline = 'Data analyst in training', region = 'northern'
 where id = '11111111-1111-1111-1111-111111111111';

-- Data Analyst: two required topics, one optional; two published skills and an unpublished one.
-- Web Basics: no skills mapped yet.
insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'web-basics', 'Web Basics', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 2, false),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'extra', 'Extra', 3, true),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 'html', 'HTML', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000002', 'css', 'CSS', 2, false);
insert into public.skills (id, slug, name, is_published) values
  ('cccccccc-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', true),
  ('cccccccc-0000-0000-0000-000000000002', 'sql-basics', 'SQL basics', true),
  ('cccccccc-0000-0000-0000-000000000003', 'draft-skill', 'Draft skill', false);
insert into public.skill_roadmaps (skill_id, roadmap_slug) values
  ('cccccccc-0000-0000-0000-000000000001', 'data-analyst'),
  ('cccccccc-0000-0000-0000-000000000002', 'data-analyst'),
  ('cccccccc-0000-0000-0000-000000000003', 'data-analyst');
insert into public.skill_assessments (id, skill_id, kind, title, is_published) values
  ('dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000002', 'portfolio', 'SQL portfolio', true);

-- Wumpini: both required topics done, one skill verified, one approved portfolio
-- (three days ago), About you complete, public profile.
insert into public.roadmap_progress (profile_id, node_id, status, completed_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', now()),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000002', 'done', now()),
  ('44444444-4444-4444-4444-444444444444', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', null),
  ('55555555-5555-5555-5555-555555555555', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', null);
insert into public.verified_skills (profile_id, skill_id, source) values
  ('11111111-1111-1111-1111-111111111111', 'cccccccc-0000-0000-0000-000000000001', 'assessment');
insert into public.skill_assessment_attempts (assessment_id, skill_id, profile_id, kind, status, portfolio_url, reviewed_at, submitted_at) values
  ('dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111',
   'portfolio', 'approved', 'https://example.test/wumpini', now() - interval '2 days', now() - interval '3 days');
insert into public.learner_profiles (profile_id, main_goal, career_stage, tracks, education, internet) values
  ('11111111-1111-1111-1111-111111111111', 'job', 'first_job', '{data-analyst}', 'degree', 'home_wifi'),
  -- Mariama: only interested, plus a slug that is not a roadmap.
  ('22222222-2222-2222-2222-222222222222', null, null, '{data-analyst,not-a-roadmap}', null, null),
  -- Abdul-Rahman: interested in a track with no mapped skills, About you complete.
  ('33333333-3333-3333-3333-333333333333', 'job', 'changing', '{web-basics}', 'shs', 'mobile_data');

-- Refresh ---------------------------------------------------------------------------

select is((private.readiness_weights() ->> 'skills')::int, 40, 'weights live in one function');
select results_eq(
  $$ select private.readiness_band(39), private.readiness_band(40), private.readiness_band(69), private.readiness_band(70) $$,
  $$ values ('getting_started', 'building', 'building', 'job_ready') $$,
  'bands: Getting started to 39, Building to 69, Job ready from 70');
select is(private.refresh_readiness(), 4, 'one row per learner per track worked on or chosen; admins and unknown slugs are left out');
select results_eq(
  $$ select skills_verified, skills_total, skills_points, topics_done, topics_total, progress_points,
            portfolio_pieces, portfolio_points, active_days_30, activity_points, profile_points, points_available
       from public.readiness_scores where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values (1, 2, 20.0::numeric, 2, 2, 25.0::numeric, 1, 5.0::numeric, 2, 2.5::numeric, 10.0::numeric, 100::smallint) $$,
  'the parts: published skills only, required topics only, portfolio, learning days and profile');
select results_eq(
  $$ select roadmap_slug, score, band from public.readiness_scores where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('data-analyst', 63::smallint, 'building') $$,
  'the score is the sum of the parts, banded');
select results_eq(
  $$ select score, band, points_available from public.readiness_scores where profile_id = '22222222-2222-2222-2222-222222222222' $$,
  $$ values (0::smallint, 'getting_started', 100::smallint) $$,
  'interest alone scores zero');
select results_eq(
  $$ select roadmap_slug, points_available, profile_points, score from public.readiness_scores where profile_id = '33333333-3333-3333-3333-333333333333' $$,
  $$ values ('web-basics', 60::smallint, 5.0::numeric, 8::smallint) $$,
  'a track with no mapped skills scores out of the points it can give');
select is((select count(*)::int from public.readiness_scores where profile_id = '44444444-4444-4444-4444-444444444444'), 0, 'staff are not scored');

-- Region, device, connection, study time, age and education never move the score.
create temp table before_change as
  select score, skills_points, progress_points, portfolio_points, activity_points, profile_points
    from public.readiness_scores where profile_id = '55555555-5555-5555-5555-555555555555';
update public.profiles set region = 'greater_accra' where id = '55555555-5555-5555-5555-555555555555';
insert into public.learner_profiles (profile_id, education, internet, main_device, study_hours, study_times, field_of_study,
                                     employment_status, experience, languages, work_styles, work_regions, available_from,
                                     willing_to_relocate, min_pay_band, industries)
values ('55555555-5555-5555-5555-555555555555', 'postgraduate', 'limited', 'shared', 'under_3', '{evening}', 'computing',
        'looking', 'none', '{dagbani}', '{remote}', '{northern}', 'now', true, 'under_1000', '{tech}');
insert into public.events (name, profile_id, props, device_class, created_at) values
  ('session_started', '55555555-5555-5555-5555-555555555555', '{"hour_band":"night","weekday":"mon","returning":true}', 'desktop', now());
do $$ begin perform private.refresh_learner_attributes(); end $$;
select is(private.refresh_readiness(), 4, 'a second refresh updates in place');
select results_eq(
  $$ select score, skills_points, progress_points, portfolio_points, activity_points, profile_points
       from public.readiness_scores where profile_id = '55555555-5555-5555-5555-555555555555' $$,
  $$ select * from before_change $$,
  'changing region, device, connection, study time, education and work preferences leaves the score unchanged');

update public.learner_profiles set tracks = '{}' where profile_id = '22222222-2222-2222-2222-222222222222';
select is(private.refresh_readiness(), 3, 'a refresh after a track is dropped');
select is((select count(*)::int from public.readiness_scores where profile_id = '22222222-2222-2222-2222-222222222222'), 0,
  'removes the dropped track');
select ok(public.run_analytics_maintenance(1) ? 'readiness', 'the daily maintenance recomputes readiness');
select ok(
  not has_function_privilege('authenticated', 'private.refresh_readiness()', 'execute'),
  'members cannot run the refresh');

-- Access ----------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.readiness_scores), 0, 'learners do not see scores yet, not even their own');
select throws_ok($$ select * from public.admin_learner_readiness('11111111-1111-1111-1111-111111111111') $$, '42501', null,
  'a member cannot read a learner''s readiness');
select throws_ok($$ select * from public.admin_readiness_report() $$, '42501', null, 'or the fairness report');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.readiness_scores), 3, 'an admin reads every score');
select results_eq(
  $$ select roadmap_slug, roadmap_title, score, band, skills_verified, skills_total
       from public.admin_learner_readiness('11111111-1111-1111-1111-111111111111') $$,
  $$ values ('data-analyst', 'Data Analyst', 63, 'building', 1, 2) $$,
  'an admin reads one learner''s readiness per track');
select results_eq(
  $$ select learners, score_sum, getting_started, building, job_ready from public.admin_readiness_report() where dimension = 'all' $$,
  $$ values (3, 72, 2, 1, 0) $$,
  'the report counts each learner once, at their best track');
select results_eq(
  $$ select grp, learners from public.admin_readiness_report() where dimension = 'region' $$,
  $$ values ('greater_accra', 1), ('northern', 1), ('unknown', 1) $$,
  'groups by region, with unknown for no answer');
select results_eq(
  $$ select grp, learners from public.admin_readiness_report() where dimension = 'age' $$,
  $$ values ('18_24', 1), ('25_29', 2) $$,
  'groups by age band from the date of birth');
select results_eq(
  $$ select grp, learners, score_sum from public.admin_readiness_report() where dimension = 'track' $$,
  $$ values ('data-analyst', 2, 64), ('web-basics', 1, 8) $$,
  'the track dimension uses every learner track row');
reset role;

set local role anon;
select throws_ok($$ select * from public.readiness_scores $$, '42501', null, 'visitors cannot read scores');
reset role;

select * from finish();
rollback;
