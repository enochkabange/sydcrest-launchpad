-- Early warning (#325) and the mentor caseload (#330): rules, refresh,
-- routing, alerts, contacts and who sees what.
begin;
create extension if not exists pgtap with schema extensions;
select plan(38);

-- Rules: the same cases as src/lib/early-warning/rules.test.ts -----------------------------

select results_eq(
  $$ select c.name, private.risk_reasons(c.stage, c.q, c.a14, c.a56, c.recent, c.prior, c.fails, c.started, c.path_age, c.missed)::text,
            private.risk_level(private.risk_reasons(c.stage, c.q, c.a14, c.a56, c.recent, c.prior, c.fails, c.started, c.path_age, c.missed))
       from (values
         (1, 'on track', 'active', 1, 3, 10, 2, 6, 0, 4, 30, 0),
         (2, 'streak broken', 'active', 4, 6, 20, 2, 6, 0, 4, 30, 0),
         (3, 'quiet', 'slipping', 10, 2, 14, 2, 6, 0, 4, 30, 0),
         (4, 'rare visitor', 'slipping', 10, 1, 3, 2, 6, 0, 4, 30, 0),
         (5, 'dormant', 'dormant', 30, 1, 2, 2, 6, 0, 4, 30, 0),
         (6, 'gone too long', 'dormant', 90, 1, 8, 2, 6, 0, 4, 30, 0),
         (7, 'pace slowing', 'active', 1, 3, 10, 1, 8, 0, 4, 30, 0),
         (8, 'quiz stuck', 'active', 1, 3, 10, 2, 6, 3, 4, 30, 0),
         (9, 'no first topic', 'not_started', 1, 3, 10, 0, 0, 0, 0, 9, 0),
         (10, 'path recent', 'new', 1, 3, 10, 0, 0, 0, 0, 3, 0),
         (11, 'missed deadlines', 'active', 1, 3, 10, 2, 6, 0, 4, 30, 2),
         (12, 'two watch reasons', 'active', 1, 3, 10, 0, 5, 4, 4, 30, 0),
         (13, 'never active', 'not_started', null, 0, 0, 0, 0, 0, 0, null, 0)
       ) as c(n, name, stage, q, a14, a56, recent, prior, fails, started, path_age, missed)
      order by c.n $$,
  $$ values
       ('on track', '{}', 'none'),
       ('streak broken', '{streak_broken}', 'watch'),
       ('quiet', '{went_quiet,slipping}', 'at_risk'),
       ('rare visitor', '{slipping}', 'watch'),
       ('dormant', '{dormant}', 'at_risk'),
       ('gone too long', '{}', 'none'),
       ('pace slowing', '{pace_slowing}', 'watch'),
       ('quiz stuck', '{quiz_stuck}', 'watch'),
       ('no first topic', '{no_first_topic}', 'watch'),
       ('path recent', '{}', 'none'),
       ('missed deadlines', '{missed_deadlines}', 'at_risk'),
       ('two watch reasons', '{pace_slowing,quiz_stuck}', 'at_risk'),
       ('never active', '{}', 'none') $$,
  'the rules match the TypeScript mirror');

-- People ---------------------------------------------------------------------------------
-- 1 Wumpini: cohort learner, quiet for 10 days after coming every few days.
-- 2 Mariama: chapter member, saved a path 10 days ago, no topic yet.
-- 3 Abdul-Rahman: no cohort or chapter, failed one quiz three times today.
-- 4 Fuseini: cohort learner, on track.
-- 5 Hawa: chapter lead.  6 Salifu: cohort mentor.  7 Zainab: admin.

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email, jsonb_build_object('full_name', name), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
    ('22222222-2222-2222-2222-222222222222', 'mariama@example.test', 'Mariama Seidu'),
    ('33333333-3333-3333-3333-333333333333', 'abdul@example.test', 'Abdul-Rahman Issah'),
    ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama'),
    ('55555555-5555-5555-5555-555555555555', 'hawa@example.test', 'Hawa Yakubu'),
    ('66666666-6666-6666-6666-666666666666', 'salifu@example.test', 'Salifu Iddrisu'),
    ('77777777-7777-7777-7777-777777777777', 'zainab@example.test', 'Zainab Abubakari')) v(id, email, name);
update public.profiles set created_at = now() - interval '100 days';
update public.profiles set created_at = now() - interval '20 days' where id = '22222222-2222-2222-2222-222222222222';
update public.profiles set role = 'admin' where id = '77777777-7777-7777-7777-777777777777';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false);
insert into public.roadmap_progress (profile_id, node_id, status, created_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', now() - interval '60 days'),
  ('44444444-4444-4444-4444-444444444444', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', now() - interval '60 days');

insert into public.events (name, profile_id, props, device_class, created_at)
select 'page_view', '11111111-1111-1111-1111-111111111111', '{}', 'mobile', now() - make_interval(days => d)
  from generate_series(10, 36, 2) d;
insert into public.events (name, profile_id, props, device_class, created_at) values
  ('page_view', '22222222-2222-2222-2222-222222222222', '{}', 'mobile', now() - interval '1 day'),
  ('page_view', '44444444-4444-4444-4444-444444444444', '{}', 'desktop', now());
insert into public.events (name, profile_id, props, device_class, created_at)
select 'quiz_submitted', '33333333-3333-3333-3333-333333333333',
       '{"roadmap":"data-analyst","node_id":"bbbbbbbb-0000-0000-0000-000000000001","score":40,"passed":false}', 'mobile', now() - make_interval(mins => m)
  from generate_series(1, 3) m;

insert into public.personalized_paths (profile_id, quiz_answers, created_at) values
  ('22222222-2222-2222-2222-222222222222', '{}', now() - interval '10 days');

insert into public.cohorts (id, program_id, name, starts_on, status)
select 'cccccccc-0000-0000-0000-000000000001', p.id, 'Tamale early warning', current_date - 20, 'running'
  from public.programs p where p.slug = 'dmp';
insert into public.cohort_members (cohort_id, profile_id, role) values
  ('cccccccc-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', 'mentor'),
  ('cccccccc-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'learner'),
  ('cccccccc-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444', 'learner');

insert into public.chapters (id, slug, name, region, city, status) values
  ('dddddddd-0000-0000-0000-000000000001', 'tamale-ew', 'Tamale', 'northern', 'Tamale', 'active');
insert into public.chapter_members (chapter_id, profile_id, role) values
  ('dddddddd-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'lead'),
  ('dddddddd-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'member');

-- Refresh ---------------------------------------------------------------------------------

select is(private.refresh_learner_attributes(), 7, 'attributes for everyone');
select is(private.refresh_learner_risk(), 5, 'risk for learners only: not the mentor or the admin');
select results_eq(
  $$ select profile_id::text, level, reasons::text, route from public.learner_risk order by profile_id $$,
  $$ values ('11111111-1111-1111-1111-111111111111', 'at_risk', '{went_quiet,slipping}', 'mentor'),
            ('22222222-2222-2222-2222-222222222222', 'watch', '{no_first_topic}', 'chapter_lead'),
            ('33333333-3333-3333-3333-333333333333', 'watch', '{quiz_stuck}', 'admin'),
            ('44444444-4444-4444-4444-444444444444', 'none', '{}', 'mentor'),
            ('55555555-5555-5555-5555-555555555555', 'none', '{}', 'admin') $$,
  'levels, reasons and routing: cohort mentor, else chapter lead, else admins');
select results_eq(
  $$ select days_quiet, usual_gap_days, quiz_fails, flagged_since = (now() at time zone 'UTC')::date
       from public.learner_risk where profile_id in ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333')
      order by profile_id $$,
  $$ values (10, 4, 0, true), (0, null::integer, 3, true) $$,
  'the numbers behind the reasons');
select is(
  (select count(*)::int from public.learner_risk_alerts where closed_on is null), 3,
  'one open alert per flagged learner');

update public.learner_risk set flagged_since = current_date - 5 where profile_id = '22222222-2222-2222-2222-222222222222';
select is(private.refresh_learner_risk(), 5, 'a second refresh updates in place');
select is(
  (select flagged_since from public.learner_risk where profile_id = '22222222-2222-2222-2222-222222222222'), current_date - 5,
  'flagged since keeps the start of the stretch');
select is(
  (select count(*)::int from public.learner_risk_alerts), 3,
  'no second alert while one is open');
select ok(public.run_analytics_maintenance(1) ? 'risk', 'the daily maintenance recomputes risk');
select ok(
  not has_function_privilege('authenticated', 'private.refresh_learner_risk()', 'execute'),
  'members cannot run the refresh');
select throws_ok(
  $$ update public.learner_risk set reasons = '{feeling_sad}' $$, '23514', null,
  'only known reason codes are stored');

-- The mentor --------------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select results_eq(
  $$ select profile_id::text from public.learner_risk order by profile_id $$,
  $$ values ('11111111-1111-1111-1111-111111111111'), ('44444444-4444-4444-4444-444444444444') $$,
  'a mentor reads the risk of their cohort''s learners only');
select results_eq(
  $$ select display_name, level from public.mentor_caseload('cccccccc-0000-0000-0000-000000000001') order by display_name $$,
  $$ values ('Fuseini Mahama', 'none'), ('Wumpini Alhassan', 'at_risk') $$,
  'the caseload lists the cohort''s active learners with names and risk');
select throws_ok(
  $$ select * from public.chapter_check_ins('dddddddd-0000-0000-0000-000000000001') $$, '42501', null,
  'a mentor cannot read a chapter''s list');
select lives_ok(
  $$ insert into public.mentor_contacts (learner_id, kind, note) values ('11111111-1111-1111-1111-111111111111', 'call', 'Agreed to finish week 3 by Friday.') $$,
  'a mentor logs a call with their learner');
select throws_ok(
  $$ insert into public.mentor_contacts (learner_id, kind) values ('33333333-3333-3333-3333-333333333333', 'message') $$, '42501', null,
  'but not with someone outside their cohorts');
select throws_ok(
  $$ insert into public.mentor_contacts (mentor_id, learner_id, kind) values ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'message') $$,
  '42501', null,
  'and never as someone else');
select throws_ok(
  $$ insert into public.mentor_contacts (learner_id, kind) values ('11111111-1111-1111-1111-111111111111', 'visit') $$, '23514', null,
  'only message, call or session');
select results_eq(
  $$ select last_contact_kind from public.mentor_caseload('cccccccc-0000-0000-0000-000000000001') where display_name = 'Wumpini Alhassan' $$,
  $$ values ('call') $$,
  'the caseload shows the last contact');
select is((select count(*)::int from public.learner_risk_alerts), 0, 'mentors do not read alerts');

-- The chapter lead --------------------------------------------------------------------------

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select results_eq(
  $$ select profile_id::text from public.learner_risk $$,
  $$ values ('22222222-2222-2222-2222-222222222222') $$,
  'a chapter lead reads only the members routed to them');
select results_eq(
  $$ select display_name, reasons::text from public.chapter_check_ins('dddddddd-0000-0000-0000-000000000001') $$,
  $$ values ('Mariama Seidu', '{no_first_topic}') $$,
  'and lists the flagged ones with reasons');
select throws_ok(
  $$ select * from public.mentor_caseload('cccccccc-0000-0000-0000-000000000001') $$, '42501', null,
  'a chapter lead cannot read a cohort caseload');
select lives_ok(
  $$ insert into public.mentor_contacts (learner_id, kind) values ('22222222-2222-2222-2222-222222222222', 'message') $$,
  'a chapter lead logs a message with a member');
select is((select count(*)::int from public.mentor_contacts), 1, 'and sees only contacts with their members');

-- The learner -------------------------------------------------------------------------------

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.learner_risk), 0, 'learners do not see risk, even their own');
select is((select count(*)::int from public.mentor_contacts), 0, 'or the contacts logged about them');
select throws_ok(
  $$ select * from public.admin_insights_mentors(current_date - 7, current_date) $$, '42501', null,
  'or the mentor quality view');

-- The admin ---------------------------------------------------------------------------------

select set_config('request.jwt.claims', '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}', true);
select is((select count(*)::int from public.learner_risk), 5, 'an admin reads every learner''s risk');
select is((select count(*)::int from public.mentor_contacts), 2, 'and every contact');
select results_eq(
  $$ select learner_name, route from public.admin_insights_risk_learners(current_date - 7, current_date) order by learner_name $$,
  $$ values ('Abdul-Rahman Issah', 'admin'), ('Mariama Seidu', 'chapter_lead'), ('Wumpini Alhassan', 'mentor') $$,
  'everyone flagged now, with who acts');
select results_eq(
  $$ select mentor_name, learners, at_risk, contacts, learners_contacted from public.admin_insights_mentors(current_date - 7, current_date) $$,
  $$ values ('Salifu Iddrisu', 2, 1, 1, 1) $$,
  'quality per mentor: learners, risk now and contacts logged');
select results_eq(
  $$ select route, raised, settled from public.admin_insights_early_warning(current_date - 7, current_date) $$,
  $$ values ('admin', 1, 0), ('chapter_lead', 1, 0), ('mentor', 1, 0) $$,
  'alerts by route; none is 14 days old yet');
reset role;

set local role anon;
select throws_ok($$ select * from public.learner_risk $$, '42501', null, 'visitors cannot read risk');
select throws_ok($$ select * from public.mentor_contacts $$, '42501', null, 'or contacts');
reset role;

-- Coming back -------------------------------------------------------------------------------
-- Wumpini's alert was raised three days ago; they were back yesterday.

update public.learner_risk_alerts set raised_on = current_date - 3 where profile_id = '11111111-1111-1111-1111-111111111111';
insert into public.events (name, profile_id, props, device_class, created_at) values
  ('page_view', '11111111-1111-1111-1111-111111111111', '{}', 'mobile', now() - interval '1 day');
do $$ begin perform private.refresh_learner_attributes(); perform private.refresh_learner_risk(); end $$;
select results_eq(
  $$ select came_back_on = (now() at time zone 'UTC')::date - 1, closed_on = (now() at time zone 'UTC')::date
       from public.learner_risk_alerts where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values (true, true) $$,
  'the alert records the day they came back and closes once they are on track');
select results_eq(
  $$ select level, flagged_since is null from public.learner_risk where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('none', true) $$,
  'and their risk clears');

select * from finish();
rollback;
