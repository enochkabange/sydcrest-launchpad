-- Market and Earn (issue #148): the opportunities board, saved and applied
-- markers, outcomes, their verification and the North Star numbers.
begin;
create extension if not exists pgtap with schema extensions;
select plan(42);

-- Ayishetu owns a verified and an unverified organisation; Wumpini and
-- Sumaila are learners from one cohort; Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', dob), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '1999-03-14'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu', '1990-07-01'),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu', '1998-02-02'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari', '1988-11-30')
) as u(id, email, name, dob);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';
insert into public.organisations (id, slug, name, verification_status, verified_at, created_by) values
  ('0a000000-0000-0000-0000-000000000001', 'tamale-shea', 'Tamale Shea Collective', 'verified', now(), '66666666-6666-6666-6666-666666666666'),
  ('0a000000-0000-0000-0000-000000000002', 'bolga-baskets', 'Bolga Baskets', 'unverified', null, '66666666-6666-6666-6666-666666666666');

-- Opportunities ----------------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.opportunities (slug, kind, title, description, organisation_name, apply_url, deadline, status, is_remote, tracks)
     values ('northern-tech-scholarship', 'scholarship', 'Northern tech scholarship', 'Fees for a year',
             'Savannah Education Trust', 'https://trust.example.test/apply', current_date + 30, 'open', true, '{data}'),
            ('closed-grant', 'grant', 'Past grant', 'Gone', 'Savannah Education Trust', null,
             current_date - 1, 'open', false, '{}') $$,
  'admins post external opportunities');
select ok((select published_at is not null from public.opportunities where slug = 'northern-tech-scholarship'),
  'opening an opportunity stamps published_at');
select throws_ok(
  $$ insert into public.opportunities (slug, kind, title, description, organisation_name, apply_url)
     values ('bad-link', 'job', 'Bad', 'Bad', 'Bad', 'javascript:alert(1)') $$,
  '23514', null, 'apply links must be http links');

select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.opportunities (slug, kind, title, description, organisation_id, organisation_name, location, region, status)
     values ('shea-sales-intern', 'internship', 'Sales intern', 'Sell shea butter online',
             '0a000000-0000-0000-0000-000000000001', 'Somebody Famous', 'Tamale', 'northern', 'open'),
            ('shea-draft', 'job', 'Draft role', 'Not ready', '0a000000-0000-0000-0000-000000000001', 'x', null, null, 'draft') $$,
  'a verified organisation posts opportunities');
select is((select organisation_name from public.opportunities where slug = 'shea-sales-intern'), 'Tamale Shea Collective',
  'an organisation posts under its own name only');
select throws_ok(
  $$ insert into public.opportunities (slug, kind, title, description, organisation_id, organisation_name)
     values ('baskets-job', 'job', 'Weaver', 'Weave', '0a000000-0000-0000-0000-000000000002', 'Bolga Baskets') $$,
  '42501', null, 'unverified organisations cannot post');
select throws_ok(
  $$ insert into public.opportunities (slug, kind, title, description, organisation_name)
     values ('no-org', 'job', 'Job', 'Job', 'Anyone') $$,
  '42501', null, 'non admins must post for their organisation');
update public.opportunities set title = 'Hijacked' where slug = 'northern-tech-scholarship';
select is((select title from public.opportunities where slug = 'northern-tech-scholarship'), 'Northern tech scholarship',
  'organisations cannot edit other posts');
delete from public.opportunities where slug = 'shea-sales-intern';
select is((select count(*)::int from public.opportunities where slug = 'shea-sales-intern'), 1,
  'organisations cannot delete an open post');
delete from public.opportunities where slug = 'shea-draft';
select is((select count(*)::int from public.opportunities where slug = 'shea-draft'), 0,
  'organisations delete their drafts');
insert into public.opportunities (slug, kind, title, description, organisation_id, organisation_name, status)
values ('shea-draft-2', 'gig', 'Logo gig', 'Draft', '0a000000-0000-0000-0000-000000000001', 'x', 'draft');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.opportunities (slug, kind, title, description, organisation_name)
     values ('mine', 'job', 'Job', 'Job', 'Me') $$,
  '42501', null, 'learners cannot post opportunities');
select is((select count(*)::int from public.opportunities where slug = 'shea-draft-2'), 0,
  'drafts are hidden from learners');

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select slug from public.opportunities order by slug $$,
  $$ values ('northern-tech-scholarship'::text), ('shea-sales-intern'::text) $$,
  'anyone reads open opportunities before their deadline');
select throws_ok(
  $$ insert into public.opportunities (slug, kind, title, description, organisation_name) values ('anon', 'job', 'J', 'J', 'J') $$,
  '42501', null, 'anon cannot post');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.opportunities), 4, 'admins see drafts and expired posts');

-- Saved and applied ---------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select set_config('test.opp', (select id::text from public.opportunities where slug = 'shea-sales-intern'), true);
select lives_ok(
  $$ insert into public.opportunity_saves (opportunity_id) values (current_setting('test.opp')::uuid) $$,
  'a learner saves an opportunity');
update public.opportunity_saves set status = 'applied';
select ok((select applied_at is not null from public.opportunity_saves), 'marking applied stamps the date');
select throws_ok(
  $$ insert into public.opportunity_saves (profile_id, opportunity_id)
     values ('55555555-5555-5555-5555-555555555555', current_setting('test.opp')::uuid) $$,
  '42501', null, 'learners save only for themselves');
select throws_ok(
  $$ update public.opportunity_saves set applied_at = now() - interval '1 year' $$,
  '42501', null, 'the applied date is not editable');

select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.opportunity_saves), 0, 'posters never see who saved or applied');
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.opportunity_saves), 0, 'other learners cannot see saves');
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select throws_ok($$ select * from public.opportunity_saves $$, '42501', null, 'anon cannot read saves');

-- Outcomes --------------------------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.outcomes (type, title, organisation_name, organisation_id, opportunity_id, started_on, evidence_url)
     values ('internship', 'Sales intern', 'Tamale Shea Collective', '0a000000-0000-0000-0000-000000000001',
             current_setting('test.opp')::uuid, '2026-03-01', 'https://example.test/offer-letter') $$,
  'a learner reports an outcome');
select set_config('test.outcome', (select id::text from public.outcomes), true);
select throws_ok(
  $$ insert into public.outcomes (type, organisation_name, started_on, verification_status)
     values ('job', 'Self verified Ltd', '2026-03-01', 'verified') $$,
  '42501', null, 'learners cannot verify their own outcomes');
select throws_ok(
  $$ select public.admin_verify_outcome(current_setting('test.outcome')::uuid, 'verified') $$,
  '42501', null, 'only admins verify outcomes');
select is((select count(*)::int from public.outcome_queue), 0, 'learners get nothing from the outcome queue');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.outcomes), 0, 'other learners cannot see an outcome');
insert into public.outcomes (type, organisation_name, started_on) values ('job', 'Unverifiable Ltd', '2026-02-01');
select set_config('test.outcome2', (select id::text from public.outcomes), true);

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select throws_ok($$ select * from public.outcomes $$, '42501', null, 'anon cannot read outcomes');
select is((select count(*)::int from public.public_outcome_stats), 0, 'the impact numbers are empty until something is verified');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select results_eq(
  $$ select display_name, type from public.outcome_queue order by display_name $$,
  $$ values ('Sumaila Yakubu'::text, 'job'::text), ('Wumpini Alhassan'::text, 'internship'::text) $$,
  'admins see the queue with names');
select is((select verification_status from public.admin_verify_outcome(current_setting('test.outcome')::uuid, 'verified', 'Saw the letter')),
  'verified', 'an admin verifies an outcome');
select is((select verification_status from public.admin_verify_outcome(current_setting('test.outcome2')::uuid, 'rejected', 'No evidence')),
  'rejected', 'an admin rejects an outcome');

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select type, verified_count, verified_people from public.public_outcome_stats $$,
  $$ values ('internship'::text, 1, 1) $$,
  'the impact numbers count verified outcomes only');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ update public.outcomes set organisation_name = 'A bigger company' $$,
  '42501', null, 'a verified outcome cannot be rewritten');
update public.outcomes set show_on_profile = true;
select is((select show_on_profile from public.outcomes), true, 'a learner chooses to show a verified outcome');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
update public.outcomes set evidence_url = 'https://example.test/contract';
select is((select verification_status from public.outcomes), 'pending', 'editing a rejected outcome sends it back for review');

-- North Star --------------------------------------------------------------------------------------
reset role;
insert into public.programs (id, slug, title, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Test programme', true);
insert into public.program_weeks (program_id, week_number, theme, assignment) values
  ('a0000000-0000-0000-0000-000000000001', 1, 'Basics', 'Do it'),
  ('a0000000-0000-0000-0000-000000000001', 2, 'More', 'Do more');
insert into public.cohorts (id, program_id, name, starts_on, status) values
  ('c0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000001', 'Cohort A', '2026-01-05', 'completed');
insert into public.cohort_members (cohort_id, profile_id, role, status, completed_at) values
  ('c0000000-0000-0000-0000-00000000000a', '11111111-1111-1111-1111-111111111111', 'learner', 'completed', now()),
  ('c0000000-0000-0000-0000-00000000000a', '55555555-5555-5555-5555-555555555555', 'learner', 'active', null);
insert into public.certificates (profile_id, program_id, cohort_id, recipient_name, program_title) values
  ('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001',
   'c0000000-0000-0000-0000-00000000000a', 'Wumpini Alhassan', 'Test programme');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok($$ select * from public.admin_cohort_outcomes() $$, '42501', null, 'learners cannot read the North Star');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select results_eq(
  $$ select ends_on, window_ends_on, learners, completed, certified, placed
     from public.admin_cohort_outcomes() where cohort_id = 'c0000000-0000-0000-0000-00000000000a' $$,
  $$ values ('2026-01-19'::date, '2026-07-19'::date, 2, 1, 1, 1) $$,
  'the North Star counts verified outcomes within six months of the cohort''s last week');
select results_eq(
  $$ select placed from public.admin_cohort_outcomes(1) where cohort_id = 'c0000000-0000-0000-0000-00000000000a' $$,
  $$ values (0) $$,
  'a shorter window leaves out a later outcome');
select throws_ok($$ select * from public.admin_cohort_outcomes(0) $$, '22023', null, 'the window is at least a month');

-- Learners delete their own outcome.
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
delete from public.outcomes;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.outcomes), 1, 'a learner deletes only their own outcome');

reset role;
select ok(
  not has_function_privilege('anon', 'public.admin_verify_outcome(uuid, text, text)', 'execute')
  and not has_function_privilege('anon', 'public.admin_cohort_outcomes(integer)', 'execute'),
  'signed out visitors cannot call the outcome admin functions');

select * from finish();
rollback;
