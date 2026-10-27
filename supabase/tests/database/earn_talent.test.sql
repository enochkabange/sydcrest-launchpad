-- Market and Earn (issue #148): the talent directory, its eligibility rule,
-- contact requests and the new report targets.
begin;
create extension if not exists pgtap with schema extensions;
select plan(34);

-- Wumpini is certified; Sumaila is not; Fuseini is 16 (with a certificate);
-- Ayishetu owns a verified business; Zakaria belongs to an unverified one;
-- Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', dob), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '1999-03-14'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu', '1990-07-01'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama',
     to_char(now() - interval '16 years', 'YYYY-MM-DD')),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu', '1998-02-02'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari', '1988-11-30'),
  ('88888888-8888-8888-8888-888888888888', 'zakaria@example.test', 'Zakaria Alhassan', '1994-04-04')
) as u(id, email, name, dob);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';
insert into public.organisations (id, slug, name, verification_status, verified_at, created_by) values
  ('0a000000-0000-0000-0000-000000000001', 'tamale-shea', 'Tamale Shea Collective', 'verified', now(), '66666666-6666-6666-6666-666666666666'),
  ('0a000000-0000-0000-0000-000000000002', 'bolga-baskets', 'Bolga Baskets', 'unverified', null, '88888888-8888-8888-8888-888888888888');
insert into public.programs (id, slug, title, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Digital Marketing Programme', true);
insert into public.certificates (id, profile_id, program_id, recipient_name, program_title) values
  ('ce000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111',
   'a0000000-0000-0000-0000-000000000001', 'Wumpini Alhassan', 'Digital Marketing Programme'),
  ('ce000000-0000-0000-0000-000000000004', '44444444-4444-4444-4444-444444444444',
   'a0000000-0000-0000-0000-000000000001', 'Fuseini Mahama', 'Digital Marketing Programme');

-- Opting in --------------------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((public.talent_eligibility() ->> 'eligible')::boolean, false, 'a learner without a certificate is not eligible');
select throws_ok(
  $$ insert into public.talent_listings (headline) values ('Social media manager') $$,
  '42501', null, 'learners who are not certified cannot list');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((public.talent_eligibility() ->> 'eligible')::boolean, false, 'under 18s are not eligible even when certified');
select throws_ok(
  $$ insert into public.talent_listings (headline) values ('Young marketer') $$,
  '42501', null, 'under 18s cannot list');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((public.talent_eligibility() ->> 'eligible')::boolean, true, 'a certified adult is eligible');
select lives_ok(
  $$ insert into public.talent_listings (headline, skills, region, availability)
     values ('Social media marketer for small shops', '{content planning,facebook ads}', 'northern', 'open_to_work') $$,
  'a certified adult opts in');
select throws_ok(
  $$ insert into public.talent_listings (profile_id, headline) values ('55555555-5555-5555-5555-555555555555', 'Someone else') $$,
  '42501', null, 'nobody lists someone else');
select is((select count(*)::int from public.talent_directory), 1, 'learners preview their own directory entry');

-- Who can browse ------------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select results_eq(
  $$ select display_name, headline, certificates -> 0 ->> 'program_title' from public.talent_directory $$,
  $$ values ('Wumpini Alhassan'::text, 'Social media marketer for small shops'::text, 'Digital Marketing Programme'::text) $$,
  'verified organisations browse the directory with names and certificates');
select is((select count(*)::int from public.talent_listings), 1, 'and read the listings');

select set_config('request.jwt.claims', '{"sub":"88888888-8888-8888-8888-888888888888","role":"authenticated"}', true);
select is((select count(*)::int from public.talent_directory), 0, 'unverified organisations cannot browse');
select is((select count(*)::int from public.talent_listings), 0, 'nor read the listings');
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.talent_directory) + (select count(*)::int from public.talent_listings), 0,
  'other learners cannot browse');

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select throws_ok($$ select * from public.talent_directory $$, '42501', null, 'anon cannot read the directory');
select throws_ok($$ select * from public.talent_listings $$, '42501', null, 'anon cannot read listings');
select throws_ok($$ select * from public.talent_contact_requests $$, '42501', null, 'anon cannot read contact requests');

-- Contact requests -------------------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.talent_contact_requests (organisation_id, profile_id, message)
     values ('0a000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Would you run our pages?') $$,
  'a verified organisation asks to contact a listed learner');
select set_config('test.req', (select id::text from public.talent_contact_requests), true);
select throws_ok(
  $$ insert into public.talent_contact_requests (organisation_id, profile_id, message)
     values ('0a000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Again') $$,
  '23505', null, 'one pending request per learner per organisation');
select throws_ok(
  $$ insert into public.talent_contact_requests (organisation_id, profile_id, message)
     values ('0a000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'Hi') $$,
  '42501', null, 'only listed learners can be contacted');
select throws_ok(
  $$ update public.talent_contact_requests set status = 'accepted' $$,
  '42501', null, 'organisations cannot accept for the learner');
select is((select shared_contact from public.talent_contact_requests), null, 'nothing is shared before the learner accepts');

select set_config('request.jwt.claims', '{"sub":"88888888-8888-8888-8888-888888888888","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.talent_contact_requests (organisation_id, profile_id, message)
     values ('0a000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Hi') $$,
  '42501', null, 'unverified organisations cannot ask');
select is((select count(*)::int from public.talent_contact_requests), 0, 'other organisations cannot see the request');
select throws_ok(
  $$ select public.withdraw_talent_contact(current_setting('test.req')::uuid) $$,
  '42501', null, 'other organisations cannot withdraw it');

select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select throws_ok(
  $$ select public.respond_talent_contact(current_setting('test.req')::uuid, true, 'me@example.test') $$,
  'P0002', null, 'organisations cannot answer for the learner');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is(
  (select status from public.respond_talent_contact(current_setting('test.req')::uuid, true, '  wumpini.work@example.test ')),
  'accepted', 'the learner accepts');
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select shared_contact from public.talent_contact_requests), 'wumpini.work@example.test',
  'the organisation sees only what the learner chose to share');

-- Losing eligibility -------------------------------------------------------------------------------
reset role;
update public.certificates set revoked_at = now(), revoked_by = '33333333-3333-3333-3333-333333333333'
 where id = 'ce000000-0000-0000-0000-000000000001';
set local role authenticated;
select is((select count(*)::int from public.talent_directory), 0, 'a revoked certificate hides the listing at once');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select lives_ok($$ update public.talent_listings set is_active = false $$, 'anyone can switch their listing off');
select throws_ok(
  $$ update public.talent_listings set is_active = true $$,
  '42501', null, 'switching it on again needs eligibility');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.talent_listings), 1, 'admins read every listing');

-- Reports cover the new surfaces ------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.reports (target_type, target_id, reason) values ('offer', gen_random_uuid()::text, 'Misleading') $$,
  'people can report an offer');
select throws_ok(
  $$ insert into public.reports (target_type, target_id, reason) values ('payment', 'x', 'x') $$,
  '23514', null, 'unknown report targets are refused');

reset role;
select ok(
  not has_function_privilege('anon', 'public.talent_eligibility()', 'execute')
  and not has_function_privilege('anon', 'public.respond_talent_contact(uuid, boolean, text)', 'execute')
  and not has_function_privilege('anon', 'public.withdraw_talent_contact(uuid)', 'execute')
  and not has_function_privilege('anon', 'private.talent_eligible(uuid)', 'execute'),
  'signed out visitors cannot call the talent functions');

select * from finish();
rollback;
