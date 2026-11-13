-- Outcome check ins and impact reports (#329): who reads and answers, the
-- cron helpers, and the reports (raw for admins, small numbers held back for
-- sponsors).
begin;
create extension if not exists pgtap with schema extensions;
select plan(24);

-- Six learners finished a 12 week cohort that started on 5 January 2026
-- (it ended on 30 March). Ayishetu owns Shea Bank, which sponsors the
-- cohort; Hawa owns another organisation; Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', '1999-01-01'), now(), now()
from (values
  ('10000000-0000-0000-0000-000000000001', 'l1@example.test', 'Wumpini Alhassan'),
  ('10000000-0000-0000-0000-000000000002', 'l2@example.test', 'Sumaila Iddrisu'),
  ('10000000-0000-0000-0000-000000000003', 'l3@example.test', 'Amina Fuseini'),
  ('10000000-0000-0000-0000-000000000004', 'l4@example.test', 'Issahaku Mahama'),
  ('10000000-0000-0000-0000-000000000005', 'l5@example.test', 'Abiba Yakubu'),
  ('10000000-0000-0000-0000-000000000006', 'l6@example.test', 'Fuseini Abdulai'),
  ('22222222-2222-2222-2222-222222222222', 'hawa@example.test', 'Hawa Mumuni'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari')
) as u(id, email, name);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';
insert into public.organisations (id, slug, name, verification_status, verified_at, created_by) values
  ('0a000000-0000-0000-0000-000000000001', 'shea-bank', 'Shea Bank', 'verified', now(), '66666666-6666-6666-6666-666666666666'),
  ('0a000000-0000-0000-0000-000000000002', 'other-org', 'Other Org', 'verified', now(), '22222222-2222-2222-2222-222222222222');
insert into public.programs (id, slug, title, is_published, duration_weeks) values
  ('0c000000-0000-0000-0000-000000000001', 'test-programme', 'Test programme', true, 12);
insert into public.cohorts (id, program_id, name, starts_on, status) values
  ('0d000000-0000-0000-0000-000000000001', '0c000000-0000-0000-0000-000000000001', 'January 2026', '2026-01-05', 'completed');
insert into public.cohort_members (cohort_id, profile_id, role, status, completed_at)
select '0d000000-0000-0000-0000-000000000001', ('10000000-0000-0000-0000-00000000000' || n)::uuid, 'learner',
       case when n <= 5 then 'completed' else 'active' end,
       case when n <= 5 then now() end
from generate_series(1, 6) n;
insert into public.learner_profiles (profile_id, employment_status)
select ('10000000-0000-0000-0000-00000000000' || n)::uuid, 'looking' from generate_series(1, 6) n;
insert into public.sponsorships (id, organisation_id, scope, cohort_id, tier, starts_on) values
  ('0e000000-0000-0000-0000-000000000001', '0a000000-0000-0000-0000-000000000001', 'cohort',
   '0d000000-0000-0000-0000-000000000001', 'gold', '2026-01-01');

-- Table ----------------------------------------------------------------------------
select has_table('public', 'outcome_checkins', 'the check ins table exists');
select ok((select relrowsecurity from pg_class where oid = 'public.outcome_checkins'::regclass), 'RLS is on');

-- Cron helpers (service role) ------------------------------------------------------
select is(
  (select count(*)::int from public.outcome_checkin_finishes('2026-01-01', '2026-12-31')
    where source = 'cohort' and finished_on = '2026-03-30' and baseline_status = 'looking'),
  6, 'every learner finished when the cohort ended, with their About you status');

select is(
  (select count(*)::int from public.create_outcome_checkins((
     select jsonb_agg(jsonb_build_object(
       'profile_id', profile_id, 'source', source, 'cohort_id', cohort_id, 'finished_on', finished_on,
       'months', 6, 'due_on', '2026-09-30', 'baseline_status', baseline_status))
       from public.outcome_checkin_finishes('2026-01-01', '2026-12-31')))),
  6, 'the cron creates six 6 month check ins');
select is(
  (select count(*)::int from public.create_outcome_checkins((
     select jsonb_agg(jsonb_build_object(
       'profile_id', profile_id, 'source', source, 'cohort_id', cohort_id, 'finished_on', finished_on,
       'months', 6, 'due_on', '2026-09-30', 'baseline_status', baseline_status))
       from public.outcome_checkin_finishes('2026-01-01', '2026-12-31')))),
  0, 'a second run creates nothing');
update public.outcome_checkins set sent_at = now();

-- Learners -------------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}', true);
select is((select count(*)::int from public.outcome_checkins), 1, 'a learner sees only their own check in');
select throws_ok(
  $$ update public.outcome_checkins set work_status = 'employed', answered_at = now() $$,
  '42501', null, 'a learner cannot write the table directly');
select throws_ok(
  $$ insert into public.outcome_checkins (profile_id, source, cohort_id, finished_on, months, due_on)
     values ('10000000-0000-0000-0000-000000000001', 'cohort', '0d000000-0000-0000-0000-000000000001', '2026-03-30', 3, '2026-06-30') $$,
  '42501', null, 'nor create a check in');
select throws_ok(
  $$ select public.outcome_checkin_finishes('2026-01-01', '2026-12-31') $$,
  '42501', null, 'the cron helpers are for the service role');
select throws_ok(
  format($$ select public.answer_outcome_checkin(%L, 'employed') $$,
         (select id from public.outcome_checkins where profile_id = '10000000-0000-0000-0000-000000000002')),
  '42501', null, 'a learner cannot answer someone else''s check in');
select throws_ok(
  format($$ select public.answer_outcome_checkin(%L, 'retired') $$,
         (select id from public.outcome_checkins where profile_id = '10000000-0000-0000-0000-000000000001')),
  '23514', null, 'the status must be one of the list');
select is(
  public.answer_outcome_checkin(
    (select id from public.outcome_checkins where profile_id = '10000000-0000-0000-0000-000000000001'),
    'employed', '  Tamale Teaching Hospital ', '1000_2000', array['data-analyst'], true),
  6::smallint, 'a learner answers their own check in');
select is(
  (select organisation from public.outcome_checkins where answered_at is not null),
  'Tamale Teaching Hospital', 'the answer is stored, trimmed');
select throws_ok(
  $$ select * from public.admin_outcome_report('cohort', '0d000000-0000-0000-0000-000000000001', 6) $$,
  '42501', null, 'learners cannot run the admin report');

-- Four more answer and agree to be counted; one answers without agreeing;
-- the sixth does not answer.
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000002","role":"authenticated"}', true);
do $$ begin perform public.answer_outcome_checkin((select id from public.outcome_checkins), 'freelance', null, null, '{}', true); end $$;
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000003","role":"authenticated"}', true);
do $$ begin perform public.answer_outcome_checkin((select id from public.outcome_checkins), 'self_employed', null, 'under_1000', '{}', true); end $$;
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000004","role":"authenticated"}', true);
do $$ begin perform public.answer_outcome_checkin((select id from public.outcome_checkins), 'employed', null, null, '{}', true); end $$;
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000005","role":"authenticated"}', true);
do $$ begin perform public.answer_outcome_checkin((select id from public.outcome_checkins), 'looking', null, null, '{}', false); end $$;

-- Admin report: raw counts --------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
create temp table admin_report as
  select * from public.admin_outcome_report('cohort', '0d000000-0000-0000-0000-000000000001', 6);
select is((select people from admin_report where metric = 'sent'), 6, 'six check ins sent');
select is((select people from admin_report where metric = 'answered'), 5, 'five answered');
select is((select people from admin_report where metric = 'shared'), 4, 'four agreed to be counted');
select is((select people from admin_report where metric = 'working_before'), 0, 'none were working before');
select is((select people from admin_report where metric = 'working_after'), 4, 'four are working now');
select is((select people from admin_report where metric = 'after' and bucket = 'looking'), null::int,
  'an answer that did not agree to be counted is left out of the breakdown');
select is((select count(*)::int from public.admin_outcome_checkin_totals() where months = 6 and answered = 5), 1, 'admin totals per milestone');

-- Sponsor report: small numbers held back -----------------------------------------
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is(
  (select people from public.sponsorship_outcome_report('0e000000-0000-0000-0000-000000000001', 6) where metric = 'answered'),
  5, 'the sponsor sees how many answered');
select is(
  (select people from public.sponsorship_outcome_report('0e000000-0000-0000-0000-000000000001', 6) where metric = 'working_after'),
  null::int, 'four working is under five, so it is hidden');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.sponsorship_outcome_report('0e000000-0000-0000-0000-000000000001', 6)), 0,
  'another organisation sees nothing');

select * from finish();
rollback;
