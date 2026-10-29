-- Phase 2 (issue #142): programmes, cohorts, membership, applications,
-- notes, and the functions that accept, defer and set specializations.
begin;
create extension if not exists pgtap with schema extensions;
select plan(61);

-- People: Wumpini, Abdul-Rahman and Adisa apply; Mariama mentors cohort A,
-- Ayishetu coordinates it; Sumaila is a learner in cohort B; Fuseini is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama'),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari'),
  ('77777777-7777-7777-7777-777777777777', 'adisa@example.test', 'Adisa Iddrisu')
) as u(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.programs (id, slug, title, specializations, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Test programme',
   '[{"slug":"seo","label":"SEO"},{"slug":"ads","label":"Ads"}]', true),
  ('a0000000-0000-0000-0000-000000000002', 'test-u', 'Unpublished programme', '[]', false);
insert into public.cohorts (id, program_id, name, starts_on, max_size, status) values
  ('c0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000001', 'Cohort A', '2027-01-11', 2, 'enrolling'),
  ('c0000000-0000-0000-0000-00000000000b', 'a0000000-0000-0000-0000-000000000001', 'Cohort B', '2027-04-12', 20, 'planned'),
  ('c0000000-0000-0000-0000-00000000000c', 'a0000000-0000-0000-0000-000000000001', 'Cohort Early', '2026-09-07', 20, 'completed'),
  ('c0000000-0000-0000-0000-0000000000f0', 'a0000000-0000-0000-0000-000000000002', 'Hidden cohort', '2027-01-11', 20, 'planned');
insert into public.cohort_members (id, cohort_id, profile_id, role, specialization) values
  ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-00000000000a', '33333333-3333-3333-3333-333333333333', 'mentor', null),
  ('d0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-00000000000a', '66666666-6666-6666-6666-666666666666', 'coordinator', null),
  ('d0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-00000000000b', '55555555-5555-5555-5555-555555555555', 'learner', 'ads');

select throws_ok(
  $$ insert into public.cohort_members (cohort_id, profile_id, role, specialization)
     values ('c0000000-0000-0000-0000-00000000000b', '77777777-7777-7777-7777-777777777777', 'learner', 'design') $$,
  '22023', null, 'a membership specialization must be one of the programme''s');

-- Signed out ------------------------------------------------------------------
set local role anon;
select results_eq(
  $$ select slug from public.programs where slug like 'test-%' $$,
  $$ values ('test-p') $$, 'anon reads published programmes only');
select results_eq(
  $$ select name from public.cohorts where program_id in ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002') order by starts_on $$,
  $$ values ('Cohort Early'), ('Cohort A'), ('Cohort B') $$, 'anon reads cohorts of published programmes only');
select throws_ok($$ select * from public.cohort_members $$, '42501', null, 'anon cannot read memberships');
select throws_ok($$ select * from public.cohort_applications $$, '42501', null, 'anon cannot read applications');
select throws_ok($$ select * from public.cohort_roster $$, '42501', null, 'anon cannot read the roster');
select throws_ok($$ select * from public.cohort_notes $$, '42501', null, 'anon cannot read notes');
select throws_ok($$ select * from public.application_queue $$, '42501', null, 'anon cannot read the application queue');
select throws_ok(
  $$ insert into public.cohort_applications (program_id, profile_id) values ('a0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'anon cannot apply');

-- Applicants ------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select is((select count(*)::int from public.programs where slug = 'test-u'), 0, 'learners cannot see unpublished programmes');
select throws_ok(
  $$ insert into public.programs (slug, title) values ('sneaky', 'Sneaky') $$,
  '42501', null, 'learners cannot create programmes');
update public.cohorts set max_size = 200;
select is((select max_size from public.cohorts where id = 'c0000000-0000-0000-0000-00000000000a'), 2::smallint,
  'learners cannot change cohorts');
select lives_ok(
  $$ insert into public.cohort_applications (program_id, profile_id, specialization, screening_answers)
     values ('a0000000-0000-0000-0000-000000000001',
             '11111111-1111-1111-1111-111111111111', 'seo', '{"motivation":"I sell shea butter"}') $$,
  'a learner applies to a published programme');
select throws_ok(
  $$ insert into public.cohort_applications (program_id, profile_id)
     values ('a0000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'nobody applies to an unpublished programme');
select throws_ok(
  $$ insert into public.cohort_applications (program_id, profile_id)
     values ('a0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111') $$,
  '23505', null, 'one open application per programme');
select throws_ok(
  $$ insert into public.cohort_applications (program_id, profile_id)
     values ('a0000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222') $$,
  '42501', null, 'nobody applies on someone else''s behalf');
select throws_ok(
  $$ insert into public.cohort_applications (program_id, profile_id, status)
     values ('a0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'accepted') $$,
  '42501', null, 'an applicant cannot set the status');
select lives_ok(
  $$ update public.cohort_applications set screening_answers = '{"motivation":"I sell shea butter in Tamale"}' $$,
  'an applicant edits their answers while open');
select throws_ok(
  $$ update public.cohort_applications set status = 'accepted' $$,
  '42501', null, 'an applicant cannot accept themselves by update');
select throws_ok(
  $$ update public.cohort_applications set specialization = 'design' $$,
  '22023', null, 'an application specialization must be the programme''s');
select throws_ok(
  $$ select public.decide_application((select id from public.cohort_applications where profile_id = '11111111-1111-1111-1111-111111111111'), 'accepted', 'c0000000-0000-0000-0000-00000000000a') $$,
  '42501', null, 'an applicant cannot accept themselves through the function');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
insert into public.cohort_applications (program_id, profile_id)
values ('a0000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222');
select is((select count(*)::int from public.cohort_applications), 1, 'applicants see only their own applications');
select is((select count(*)::int from public.application_queue), 0, 'applicants get nothing from the admin queue');
select set_config('request.jwt.claims', '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}', true);
insert into public.cohort_applications (program_id, profile_id)
values ('a0000000-0000-0000-0000-000000000001', '77777777-7777-7777-7777-777777777777');

-- Admin decisions ------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.cohort_applications where program_id = 'a0000000-0000-0000-0000-000000000001'), 3,
  'admins see every application');
select results_eq(
  $$ select display_name, status from public.application_queue
     where program_id = 'a0000000-0000-0000-0000-000000000001' order by created_at $$,
  $$ values ('Wumpini Alhassan', 'submitted'), ('Abdul-Rahman Issah', 'submitted'), ('Adisa Iddrisu', 'submitted') $$,
  'the admin queue names each applicant');
select results_eq(
  $$ select status, cohort_id from public.decide_application((select id from public.cohort_applications where profile_id = '11111111-1111-1111-1111-111111111111'), 'accepted', 'c0000000-0000-0000-0000-00000000000a', 'Welcome') $$,
  $$ values ('accepted', 'c0000000-0000-0000-0000-00000000000a'::uuid) $$, 'an admin accepts into a cohort');
select results_eq(
  $$ select role, specialization, status from public.cohort_members
     where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('learner', 'seo', 'active') $$, 'accepting creates the learner membership with the chosen specialization');
select throws_ok(
  $$ select public.decide_application((select id from public.cohort_applications where profile_id = '22222222-2222-2222-2222-222222222222'), 'accepted', 'c0000000-0000-0000-0000-0000000000f0') $$,
  '22023', null, 'accepting into another programme''s cohort fails');
select results_eq(
  $$ select status from public.decide_application((select id from public.cohort_applications where profile_id = '77777777-7777-7777-7777-777777777777'), 'waitlisted') $$,
  $$ values ('waitlisted') $$, 'an admin waitlists');
select lives_ok(
  $$ select public.decide_application((select id from public.cohort_applications where profile_id = '22222222-2222-2222-2222-222222222222'), 'accepted', 'c0000000-0000-0000-0000-00000000000a') $$,
  'the second learner fills the cohort');
select throws_ok(
  $$ select public.decide_application((select id from public.cohort_applications where profile_id = '77777777-7777-7777-7777-777777777777'), 'accepted', 'c0000000-0000-0000-0000-00000000000a') $$,
  '53400', 'Cohort is full', 'the size cap holds');
select throws_ok(
  $$ select public.decide_application((select id from public.cohort_applications where profile_id = '11111111-1111-1111-1111-111111111111'), 'declined') $$,
  '22023', null, 'a decided application cannot be decided again');
select throws_ok(
  $$ insert into public.cohort_members (cohort_id, profile_id, role) values
     ('c0000000-0000-0000-0000-00000000000a', '77777777-7777-7777-7777-777777777777', 'learner') $$,
  '42501', null, 'even admins add learners only through an application (size cap)');
select throws_ok(
  $$ update public.cohort_members set status = 'completed' where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '42501', null, 'membership status is never written directly');

-- Learners in a cohort ------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.cohort_members), 1, 'a learner reads only their own membership row (#250)');
select is((select count(*)::int from public.cohort_members where profile_id = '22222222-2222-2222-2222-222222222222'), 0,
  'a learner cannot read a classmate''s membership (status, deferral)');
select is((select count(*)::int from public.cohort_members where profile_id = '55555555-5555-5555-5555-555555555555'), 0,
  'a learner cannot read another cohort''s members');
select results_eq(
  $$ select display_name, role from public.cohort_roster order by display_name $$,
  $$ values ('Abdul-Rahman Issah', 'learner'), ('Ayishetu Abukari', 'coordinator'),
            ('Mariama Seidu', 'mentor'), ('Wumpini Alhassan', 'learner') $$,
  'the roster names the learner''s cohort and nobody else');
select throws_ok(
  $$ insert into public.cohort_members (cohort_id, profile_id, role) values
     ('c0000000-0000-0000-0000-00000000000a', '11111111-1111-1111-1111-111111111111', 'mentor') $$,
  '42501', null, 'a learner cannot make themselves a mentor');
select results_eq(
  $$ select specialization from public.choose_specialization(
       (select id from public.cohort_members where profile_id = '11111111-1111-1111-1111-111111111111'), 'ads') $$,
  $$ values ('ads') $$, 'a learner chooses their own specialization');
select throws_ok(
  $$ select public.choose_specialization(
       (select member_id from public.cohort_roster where profile_id = '22222222-2222-2222-2222-222222222222'), 'ads') $$,
  '42501', null, 'a learner cannot choose for a classmate');
select throws_ok(
  $$ select public.withdraw_application((select id from public.cohort_applications where profile_id = '11111111-1111-1111-1111-111111111111')) $$,
  'P0002', null, 'an accepted application cannot be withdrawn');
select throws_ok(
  $$ select public.defer_learner((select member_id from public.cohort_roster where profile_id = '22222222-2222-2222-2222-222222222222'),
       'c0000000-0000-0000-0000-00000000000b') $$,
  '42501', null, 'a learner cannot defer anyone');

select set_config('request.jwt.claims', '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}', true);
select results_eq(
  $$ select status from public.withdraw_application((select id from public.cohort_applications where profile_id = '77777777-7777-7777-7777-777777777777')) $$,
  $$ values ('withdrawn') $$, 'an applicant withdraws a waitlisted application');

-- Mentor: notes and deferral --------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.cohort_notes (cohort_member_id, author_id, body)
     select id, '33333333-3333-3333-3333-333333333333', 'Strong start, needs a laptop for week 2'
     from public.cohort_members where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  'a mentor writes a private note');
select throws_ok(
  $$ insert into public.cohort_notes (cohort_member_id, author_id, body)
     values ('d0000000-0000-0000-0000-000000000005', '33333333-3333-3333-3333-333333333333', 'Not my learner') $$,
  '42501', null, 'a mentor cannot write notes on another cohort''s learner');
select is((select count(*)::int from public.cohort_members where profile_id = '55555555-5555-5555-5555-555555555555'), 0,
  'a mentor cannot read another cohort''s members');
select throws_ok(
  $$ select public.defer_learner((select id from public.cohort_members where profile_id = '22222222-2222-2222-2222-222222222222'),
       'c0000000-0000-0000-0000-00000000000c') $$,
  '22023', null, 'deferral goes to a later cohort');
select results_eq(
  $$ select cohort_id, status, specialization from public.defer_learner(
       (select id from public.cohort_members where profile_id = '11111111-1111-1111-1111-111111111111'),
       'c0000000-0000-0000-0000-00000000000b') $$,
  $$ values ('c0000000-0000-0000-0000-00000000000b'::uuid, 'active', 'ads') $$,
  'a mentor defers a learner to the next cohort, keeping the specialization');
select results_eq(
  $$ select status, deferred_to from public.cohort_members
     where profile_id = '11111111-1111-1111-1111-111111111111' and cohort_id = 'c0000000-0000-0000-0000-00000000000a' $$,
  $$ values ('deferred', 'c0000000-0000-0000-0000-00000000000b'::uuid) $$,
  'the old membership is marked deferred and points at the new cohort');
select results_eq(
  $$ select status, deferred_to from public.defer_learner(
       (select id from public.cohort_members where profile_id = '22222222-2222-2222-2222-222222222222')) $$,
  $$ values ('deferred', null::uuid) $$, 'a learner can be deferred before a next cohort exists');
select throws_ok(
  $$ select public.defer_learner('d0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-00000000000b') $$,
  'P0002', null, 'only learners are deferred');

select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.cohort_notes), 1, 'the coordinator reads the cohort''s notes');
select is((select status from public.cohort_roster where profile_id = '22222222-2222-2222-2222-222222222222' and cohort_id = 'c0000000-0000-0000-0000-00000000000a'),
  'deferred', 'staff see a learner''s deferral on the roster');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.cohort_notes), 0, 'a learner never sees notes about them');
select is(
  (select count(*)::int from public.cohort_roster where cohort_id = 'c0000000-0000-0000-0000-00000000000b'), 2,
  'after deferral the learner sees their new cohort');
select is((select status from public.cohort_roster where profile_id = '11111111-1111-1111-1111-111111111111' and cohort_id = 'c0000000-0000-0000-0000-00000000000a'),
  'deferred', 'a learner sees their own deferral');
select is((select count(*)::int from public.cohort_roster where profile_id = '22222222-2222-2222-2222-222222222222' and cohort_id = 'c0000000-0000-0000-0000-00000000000a'), 0,
  'a learner does not see a deferred classmate (#250)');
select is((select count(*)::int from public.cohort_roster
           where profile_id <> '11111111-1111-1111-1111-111111111111' and (status is not null or deferred_to is not null)), 0,
  'a learner never sees a classmate''s status or deferral');

-- Admin places the waiting learner
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select results_eq(
  $$ select cohort_id from public.defer_learner(
       (select id from public.cohort_members where profile_id = '22222222-2222-2222-2222-222222222222'
          and cohort_id = 'c0000000-0000-0000-0000-00000000000a'),
       'c0000000-0000-0000-0000-00000000000b') $$,
  $$ values ('c0000000-0000-0000-0000-00000000000b'::uuid) $$, 'an admin places a waiting deferred learner');
select is((select count(*)::int from public.cohort_notes), 1, 'admins read notes');

select * from finish();
rollback;
