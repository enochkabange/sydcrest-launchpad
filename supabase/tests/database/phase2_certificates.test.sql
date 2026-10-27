-- Phase 2 (issue #142): certification criteria, issuing, badge JSON,
-- revocation and public verification by id only.
begin;
create extension if not exists pgtap with schema extensions;
select plan(29);

-- Wumpini (SEO) and Abdul-Rahman learn in cohort A; Mariama mentors and
-- Ayishetu coordinates it; Sumaila mentors cohort B; Fuseini is an admin.
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

insert into public.programs (id, slug, title, specializations, pass_score, min_peer_reviews, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Test programme',
   '[{"slug":"seo","label":"SEO and content"},{"slug":"ads","label":"Ads"}]', 60, 1, true);
insert into public.program_weeks (id, program_id, week_number, specialization, theme, assignment, is_capstone) values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 1, null, 'Basics', 'Tips', false),
  ('b0000000-0000-0000-0000-00000000002a', 'a0000000-0000-0000-0000-000000000001', 2, 'ads', 'Ads', 'Ads', false),
  ('b0000000-0000-0000-0000-00000000002b', 'a0000000-0000-0000-0000-000000000001', 2, 'seo', 'SEO', 'SEO', false),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 3, null, 'Capstone', 'Capstone', true);
insert into public.cohorts (id, program_id, name, starts_on) values
  ('c0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000001', 'Cohort A', '2027-01-11'),
  ('c0000000-0000-0000-0000-00000000000b', 'a0000000-0000-0000-0000-000000000001', 'Cohort B', '2027-04-12');
insert into public.cohort_members (id, cohort_id, profile_id, role, specialization) values
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-00000000000a', '11111111-1111-1111-1111-111111111111', 'learner', 'seo'),
  ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-00000000000a', '22222222-2222-2222-2222-222222222222', 'learner', 'seo'),
  ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-00000000000a', '33333333-3333-3333-3333-333333333333', 'mentor', null),
  ('d0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-00000000000a', '66666666-6666-6666-6666-666666666666', 'coordinator', null),
  ('d0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-00000000000b', '55555555-5555-5555-5555-555555555555', 'mentor', null);

-- Wumpini's graded path (week 2 is her SEO week, 59 on the Ads week would not count anyway);
-- Abdul-Rahman has only submitted his capstone.
insert into public.submissions (id, profile_id, program_id, program_week_id, cohort_id, status, body_text, submitted_at, final_score, graded_at) values
  ('f0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-00000000000a', 'graded', 'w1', now(), 75, now()),
  ('f0000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-00000000002b', 'c0000000-0000-0000-0000-00000000000a', 'graded', 'w2', now(), 60, now()),
  ('f0000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-00000000000a', 'graded', 'w3', now(), 90, now()),
  ('f0000000-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-00000000000a', 'submitted', 'cap', now(), null, null);
insert into public.peer_reviews (id, submission_id, reviewer_id, status) values
  ('e0000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'assigned');

-- Criteria -----------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is(
  public.certification_status('a0000000-0000-0000-0000-000000000001') - 'pass_score',
  '{"eligible": false, "specialization": "seo", "weeks_required": 3, "weeks_passed": 3, "missing_weeks": [],
    "capstone_passed": true, "peer_reviews_given": 0, "peer_reviews_required": 1}'::jsonb,
  'every week passed but no peer review given: not eligible (no waiver)');
select throws_ok(
  $$ select public.issue_certificate('d0000000-0000-0000-0000-000000000001') $$,
  '42501', null, 'a learner cannot issue their own certificate');
select throws_ok(
  $$ insert into public.certificates (profile_id, program_id, recipient_name, program_title)
     values ('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001', 'Wumpini', 'Test') $$,
  '42501', null, 'a learner cannot insert a certificate');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select throws_ok(
  $$ select public.certification_status('a0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'a classmate cannot read someone else''s certification status');
select is(
  public.certification_status('a0000000-0000-0000-0000-000000000001') -> 'missing_weeks',
  '[1, 2, 3]'::jsonb, 'ungraded work leaves every week missing');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select throws_ok(
  $$ select public.issue_certificate('d0000000-0000-0000-0000-000000000001') $$,
  '22023', null, 'the mentor cannot issue before the peer review is given');

reset role;
update public.peer_reviews set status = 'submitted', submitted_at = now(), comment = 'Good'
 where id = 'e0000000-0000-0000-0000-000000000001';
set local role authenticated;

select is(
  (public.certification_status('a0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111') ->> 'eligible')::boolean,
  true, 'the mentor sees the learner is eligible once the peer review is in');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select throws_ok(
  $$ select public.issue_certificate('d0000000-0000-0000-0000-000000000001') $$,
  '42501', null, 'another cohort''s mentor cannot issue');

-- Issue --------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select results_eq(
  $$ select recipient_name, program_title, specialization_label, issued_by, verification_id ~ '^[0-9a-f]{32}$'
     from public.issue_certificate('d0000000-0000-0000-0000-000000000001') $$,
  $$ values ('Wumpini Alhassan', 'Test programme', 'SEO and content', '33333333-3333-3333-3333-333333333333'::uuid, true) $$,
  'the mentor issues the certificate with an unguessable verification id');
select is(
  (select status from public.cohort_members where id = 'd0000000-0000-0000-0000-000000000001'), 'completed',
  'issuing completes the membership');
select throws_ok(
  $$ select public.issue_certificate('d0000000-0000-0000-0000-000000000001') $$,
  '23505', null, 'one live certificate per programme');
select throws_ok(
  $$ select public.revoke_certificate((select id from public.certificates), 'Mistake') $$,
  '42501', null, 'mentors cannot revoke');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.certificates), 1, 'the holder reads their certificate');
select throws_ok($$ update public.certificates set badge_json = '{}' $$, '42501', null, 'the holder cannot edit the badge');
select throws_ok($$ update public.certificates set revoked_at = null $$, '42501', null, 'the holder cannot edit revocation');
select throws_ok(
  $$ select public.set_certificate_badge((select id from public.certificates), '{"type":["VerifiableCredential"]}') $$,
  '42501', null, 'signed in users cannot store badge JSON');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.certificates), 0, 'a classmate cannot read the certificate row');

set local role service_role;
select lives_ok(
  $$ select public.set_certificate_badge((select id from public.certificates),
       '{"@context":["https://www.w3.org/ns/credentials/v2"],"type":["VerifiableCredential","OpenBadgeCredential"]}') $$,
  'the server stores the Open Badges JSON');

-- Public verification --------------------------------------------------------------
reset role;
create temporary table vid as select verification_id from public.certificates;
grant select on vid to anon;
set local role anon;
select throws_ok($$ select * from public.certificates $$, '42501', null, 'anon cannot read the certificates table');
select results_eq(
  $$ select recipient_name, program_slug, cohort_name, revoked_at is null, badge_json ->> 'type' is not null
     from public.verify_certificate((select verification_id from vid)) $$,
  $$ values ('Wumpini Alhassan', 'test-p', 'Cohort A', true, true) $$,
  'anyone verifies a certificate by its id');
select is(
  (select count(*)::int from public.verify_certificate(upper((select verification_id from vid)))), 1,
  'verification ignores case');
select is(
  (select count(*)::int from public.verify_certificate('00000000000000000000000000000000')), 0,
  'an unknown id verifies nothing');
select is((select count(*)::int from public.public_certificates), 0, 'a private profile shows no certificates');

reset role;
update public.profiles set public_slug = 'wumpini', is_public = true where id = '11111111-1111-1111-1111-111111111111';
set local role anon;
select results_eq(
  $$ select public_slug, program_title from public.public_certificates $$,
  $$ values ('wumpini', 'Test programme') $$, 'a public profile shows its live certificates');

-- Revoke and reissue ------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select throws_ok(
  $$ select public.revoke_certificate((select id from public.certificates), ' ') $$,
  '22023', null, 'revoking needs a reason');
select results_eq(
  $$ select revoked_at is not null, revoked_by from public.revoke_certificate((select id from public.certificates), 'Issued in error') $$,
  $$ values (true, '44444444-4444-4444-4444-444444444444'::uuid) $$, 'an admin revokes');

set local role anon;
select is(
  (select revoked_at is not null from public.verify_certificate((select verification_id from vid))), true,
  'a revoked certificate still verifies, as revoked');
select is((select count(*)::int from public.public_certificates), 0, 'revoked certificates leave the profile');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select results_eq(
  $$ select issued_by from public.issue_certificate('d0000000-0000-0000-0000-000000000001') $$,
  $$ values ('66666666-6666-6666-6666-666666666666'::uuid) $$,
  'a coordinator is the backup issuer, and a revoked certificate can be issued again');

select * from finish();
rollback;
