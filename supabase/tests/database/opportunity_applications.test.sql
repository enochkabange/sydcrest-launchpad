-- Apply on SydCrest: applicant tracking for employers (#306).
begin;
create extension if not exists pgtap with schema extensions;
select plan(24);

-- Ayishetu owns Tamale Shea Collective (verified) and posts a job taking
-- applications on SydCrest. Wumpini and Sumaila apply; Hawa is another
-- learner; Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', dob), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '1999-03-14'),
  ('22222222-2222-2222-2222-222222222222', 'hawa@example.test', 'Hawa Mumuni', '2000-01-20'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu', '1990-07-01'),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu', '1998-02-02'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari', '1988-11-30')
) as u(id, email, name, dob);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';
update public.profiles set phone = '+233241234567' where id = '11111111-1111-1111-1111-111111111111';
insert into public.organisations (id, slug, name, verification_status, verified_at, created_by) values
  ('0a000000-0000-0000-0000-000000000001', 'tamale-shea', 'Tamale Shea Collective', 'verified', now(), '66666666-6666-6666-6666-666666666666');
insert into public.opportunities (id, slug, kind, title, description, organisation_id, organisation_name, status, apply_on_sydcrest, posted_by) values
  ('0b000000-0000-0000-0000-000000000001', 'shea-sales-assistant', 'job', 'Sales assistant', 'Sell shea butter online.',
   '0a000000-0000-0000-0000-000000000001', 'Tamale Shea Collective', 'open', true, '66666666-6666-6666-6666-666666666666'),
  ('0b000000-0000-0000-0000-000000000002', 'shea-link-only', 'job', 'Driver', 'Apply on our site.',
   '0a000000-0000-0000-0000-000000000001', 'Tamale Shea Collective', 'open', false, '66666666-6666-6666-6666-666666666666');

-- Applying ---------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.opportunity_applications (opportunity_id, note, contact_consent)
     values ('0b000000-0000-0000-0000-000000000001', 'I sold provisions online for two years in Tamale.', true) $$,
  'a learner applies');
select is(
  (select status from public.opportunity_saves where opportunity_id = '0b000000-0000-0000-0000-000000000001'),
  'applied', 'and their board marker says applied');
select throws_ok(
  $$ insert into public.opportunity_applications (opportunity_id, note, contact_consent)
     values ('0b000000-0000-0000-0000-000000000001', 'Applying a second time to the same job.', true) $$,
  '23505', null, 'once per listing');
select throws_ok(
  $$ insert into public.opportunity_applications (opportunity_id, note, contact_consent)
     values ('0b000000-0000-0000-0000-000000000002', 'This listing only takes applications elsewhere.', true) $$,
  '42501', null, 'not to a listing that does not take applications here');
select throws_ok(
  $$ update public.opportunity_applications set stage = 'hired' $$,
  '42501', null, 'learners cannot move their own stage');
select throws_ok(
  $$ select public.set_application_stage((select id from public.opportunity_applications limit 1), 'hired') $$,
  '42501', null, 'nor through the employer function');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.opportunity_applications (opportunity_id, note, contact_consent)
     values ('0b000000-0000-0000-0000-000000000001', 'I would like the job but not to share contacts.', false) $$,
  '23514', null, 'applying needs the agreement to share contact details on shortlist');
select lives_ok(
  $$ insert into public.opportunity_applications (opportunity_id, note, contact_consent)
     values ('0b000000-0000-0000-0000-000000000001', 'I run a small shop and can sell online.', true) $$,
  'a second learner applies');
select is((select count(*)::int from public.opportunity_applications), 1, 'learners see only their own application');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001')), 0,
  'someone outside the organisation sees no applicants');

-- The employer -----------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.opportunity_applications), 0, 'the employer cannot read the table directly');
select is((select count(*)::int from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001')), 2,
  'the employer sees both applicants');
select is(
  (select phone from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001') where display_name = 'Wumpini Alhassan'),
  null, 'no phone while new');
select is(
  (select email from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001') where display_name = 'Wumpini Alhassan'),
  null, 'no email while new');

select lives_ok(
  $$ select public.set_application_stage(
       (select application_id from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001') where display_name = 'Wumpini Alhassan'),
       'shortlisted') $$,
  'the employer shortlists');
select is(
  (select phone || ' ' || email from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001') where display_name = 'Wumpini Alhassan'),
  '+233241234567 wumpini@example.test', 'contact details show once shortlisted');
select is(
  (select phone from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001') where display_name = 'Sumaila Yakubu'),
  null, 'but not for the applicant still new');

select lives_ok(
  $$ select public.set_application_stage(
       (select application_id from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001') where display_name = 'Wumpini Alhassan'),
       'hired') $$,
  'the employer marks a hire');
select throws_ok(
  $$ select public.set_application_stage(
       (select application_id from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001') where display_name = 'Wumpini Alhassan'),
       'not_selected') $$,
  '55000', null, 'a hire is final');

reset role;
select is(
  (select type || ' ' || verification_status from public.outcomes where profile_id = '11111111-1111-1111-1111-111111111111'),
  'job pending', 'the hire files a job outcome for an admin to verify');
select is(
  (select count(*)::int from public.notifications where recipient_id = '11111111-1111-1111-1111-111111111111' and kind = 'opportunity'),
  2, 'the learner was told at each step');

-- Withdrawing ------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select lives_ok($$ update public.opportunity_applications set stage = 'withdrawn' $$, 'a learner withdraws');
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001')), 1,
  'a withdrawn application leaves the employer''s list');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.opportunity_applications), 2, 'admins read every application');

select * from finish();
rollback;
