-- Market and Earn (issue #148): expert profiles, applications, offers and
-- the admin functions that approve, flag and delist.
begin;
create extension if not exists pgtap with schema extensions;
select plan(43);

-- Abdul-Rahman and Adisa (a mentor) apply to sell; Wumpini is a learner;
-- Fuseini is 16; Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', dob), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '1999-03-14'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah', '1992-05-20'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu', '1990-07-01'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama',
     to_char(now() - interval '16 years', 'YYYY-MM-DD')),
  ('77777777-7777-7777-7777-777777777777', 'adisa@example.test', 'Adisa Iddrisu', '1995-01-09')
) as u(id, email, name, dob);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';
update public.profiles set role = 'mentor' where id = '77777777-7777-7777-7777-777777777777';

-- Becoming an expert -----------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.expert_profiles (slug, headline, skills, links)
     values ('abdul-rahman', 'Facebook ads for Tamale shops', '{facebook ads,copywriting}', '{https://abdul.example.test}') $$,
  'an adult creates an expert profile');
select is((select status from public.expert_profiles where profile_id = '22222222-2222-2222-2222-222222222222'),
  'pending', 'a new expert profile is pending');
select throws_ok(
  $$ insert into public.expert_profiles (slug, headline, status) values ('again', 'Again', 'approved') $$,
  '42501', null, 'nobody approves themselves on insert');
select throws_ok(
  $$ update public.expert_profiles set status = 'approved' $$,
  '42501', null, 'experts cannot change their status');
select throws_ok(
  $$ update public.expert_profiles set is_verified = true $$,
  '42501', null, 'experts cannot verify themselves');
select throws_ok(
  $$ update public.expert_profiles set is_featured = true $$,
  '42501', null, 'experts cannot feature themselves');
select throws_ok(
  $$ update public.expert_profiles set links = '{javascript:alert(1)}' $$,
  '23514', null, 'links must be http links');

select lives_ok(
  $$ insert into public.expert_applications (motivation, evidence_links)
     values ('I run ads for six shops in Tamale', '{https://abdul.example.test/work}') $$,
  'the expert applies');
select is((select fast_track from public.expert_applications), false, 'an outside expert is not fast tracked');
select throws_ok(
  $$ insert into public.expert_applications (motivation) values ('Again') $$,
  '23505', null, 'one open application at a time');
select throws_ok(
  $$ update public.expert_applications set status = 'approved' $$,
  '42501', null, 'applicants cannot approve themselves');

-- A pending expert drafts offers; they stay hidden until approval.
select lives_ok(
  $$ insert into public.offers (kind, title, description, duration_minutes, indicative_price_ghs)
     values ('one_to_one', 'Ads review call', 'We look at your ads together', 45, 150) $$,
  'a pending expert drafts a session offer');
select lives_ok(
  $$ insert into public.offers (kind, title, description, scope, delivery_days)
     values ('gig', 'Five ad designs', 'Five square ads for your shop', 'Five designs, two revisions', 5) $$,
  'a pending expert drafts a fixed scope gig');
select throws_ok(
  $$ insert into public.offers (kind, title, description) values ('gig', 'Vague gig', 'Anything') $$,
  '23514', null, 'a gig needs a fixed scope and delivery time');
select throws_ok(
  $$ insert into public.offers (kind, title, description, duration_minutes) values ('group', 'Group', 'Group call', 60) $$,
  '23514', null, 'a group session needs a size');
select throws_ok(
  $$ insert into public.offers (expert_id, kind, title, description, scope, delivery_days)
     values ('77777777-7777-7777-7777-777777777777', 'gig', 'Not mine', 'Not mine', 'x', 1) $$,
  '42501', null, 'experts create offers only for themselves');

-- Others ---------------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.expert_profiles (slug, headline) values ('fuseini', 'Young seller') $$,
  '42501', null, 'under 18s cannot become experts');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.offers (kind, title, description, scope, delivery_days) values ('gig', 'Mine', 'Mine', 'x', 1) $$,
  '42501', null, 'people without an expert profile cannot create offers');
select is((select count(*)::int from public.expert_profiles), 0, 'pending experts are hidden from other learners');
select is((select count(*)::int from public.expert_applications), 0, 'learners cannot read others'' applications');
select is((select count(*)::int from public.expert_application_queue), 0, 'learners get nothing from the admin queue');
select throws_ok(
  $$ select public.decide_expert_application(gen_random_uuid(), 'approved') $$,
  '42501', null, 'learners cannot decide applications');

-- A mentor is fast tracked and can withdraw.
select set_config('request.jwt.claims', '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}', true);
insert into public.expert_profiles (slug, headline) values ('adisa', 'Digital marketing mentor');
insert into public.expert_applications (motivation) values ('I mentor the DMP cohort');
select is((select fast_track from public.expert_applications), true, 'mentors are fast tracked');
update public.expert_applications set status = 'withdrawn';
select is((select status from public.expert_applications), 'withdrawn', 'an applicant withdraws');
update public.expert_applications set status = 'submitted';
select is((select status from public.expert_applications), 'withdrawn', 'a withdrawn application cannot be reopened');

-- Admin decides -----------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select set_config('test.app', (select id::text from public.expert_applications), true);
select throws_ok(
  $$ select public.decide_expert_application(current_setting('test.app')::uuid, 'approved') $$,
  '42501', null, 'experts cannot approve their own application');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select results_eq(
  $$ select display_name, fast_track from public.expert_application_queue order by fast_track $$,
  $$ values ('Abdul-Rahman Issah'::text, false), ('Adisa Iddrisu'::text, true) $$,
  'admins see the queue with names');
select is(
  (select status from public.decide_expert_application(current_setting('test.app')::uuid, 'approved', 'Spot checked')),
  'approved', 'an admin approves');
select is((select status from public.expert_profiles where profile_id = '22222222-2222-2222-2222-222222222222'),
  'approved', 'approval lists the expert');
select throws_ok(
  $$ select public.decide_expert_application(current_setting('test.app')::uuid, 'rejected') $$,
  'P0002', null, 'a decided application cannot be decided again');
select is(
  (select is_verified from public.admin_set_expert_flags('22222222-2222-2222-2222-222222222222', true, null)),
  true, 'an admin gives the verified badge');

-- Public pages ----------------------------------------------------------------------------------
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select slug, display_name, is_verified, completed_bookings, review_count from public.public_experts $$,
  $$ values ('abdul-rahman'::text, 'Abdul-Rahman Issah'::text, true, 0, 0) $$,
  'approved experts are public with their name and real counts');
select is((select average_rating from public.public_experts), null, 'no reviews means no rating, not a made up one');
select is((select count(*)::int from public.offers), 2, 'an approved expert''s active offers are public');
select throws_ok($$ select * from public.expert_applications $$, '42501', null, 'anon cannot read applications');
select throws_ok($$ select * from public.expert_application_queue $$, '42501', null, 'anon cannot read the queue');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
update public.offers set is_active = false where kind = 'gig';
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select is((select count(*)::int from public.offers), 1, 'inactive offers are hidden');

-- Delisting -----------------------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select throws_ok(
  $$ select public.admin_set_expert_status('22222222-2222-2222-2222-222222222222', 'delisted') $$,
  '42501', null, 'only admins delist');
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is(
  (select status from public.admin_set_expert_status('22222222-2222-2222-2222-222222222222', 'delisted', 'Repeated no shows')),
  'delisted', 'an admin delists');
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select is((select count(*)::int from public.public_experts) + (select count(*)::int from public.offers), 0,
  'a delisted expert and their offers leave the public pages');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.offers (kind, title, description, scope, delivery_days) values ('gig', 'Back', 'Back', 'x', 1) $$,
  '42501', null, 'a delisted expert cannot add offers');
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is(
  (select status_reason from public.admin_set_expert_status('22222222-2222-2222-2222-222222222222', 'approved', 'Appeal upheld')),
  null, 'listing again clears the delisting reason, since approved rows are public');

reset role;
select ok(
  not has_function_privilege('anon', 'public.decide_expert_application(uuid, text, text)', 'execute')
  and not has_function_privilege('anon', 'public.admin_set_expert_status(uuid, text, text)', 'execute')
  and not has_function_privilege('anon', 'public.admin_set_expert_flags(uuid, boolean, boolean)', 'execute'),
  'signed out visitors cannot call the expert admin functions');

select * from finish();
rollback;
