-- Sponsor portal (#307): totals with small numbers hidden, opted in stories.
begin;
create extension if not exists pgtap with schema extensions;
select plan(17);

-- Ayishetu owns Shea Bank, which sponsors a cohort of six learners; Hawa is
-- another organisation's owner; Mariama is an admin.
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
insert into public.programs (id, slug, title, is_published) values
  ('0c000000-0000-0000-0000-000000000001', 'test-programme', 'Test programme', true);
insert into public.cohorts (id, program_id, name, starts_on) values
  ('0d000000-0000-0000-0000-000000000001', '0c000000-0000-0000-0000-000000000001', 'January 2027', '2027-01-10');
insert into public.cohort_members (cohort_id, profile_id, role, status, completed_at)
select '0d000000-0000-0000-0000-000000000001', ('10000000-0000-0000-0000-00000000000' || n)::uuid, 'learner',
       case when n <= 5 then 'completed' else 'active' end,
       case when n <= 5 then now() end
from generate_series(1, 6) n;

-- Recording ---------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.sponsorships (organisation_id, scope, cohort_id, tier, seats, starts_on)
     values ('0a000000-0000-0000-0000-000000000001', 'cohort', '0d000000-0000-0000-0000-000000000001', 'gold', 25, '2027-01-01') $$,
  '42501', null, 'sponsors cannot record their own sponsorship');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.sponsorships (id, organisation_id, scope, cohort_id, tier, seats, starts_on)
     values ('0e000000-0000-0000-0000-000000000001', '0a000000-0000-0000-0000-000000000001', 'cohort',
             '0d000000-0000-0000-0000-000000000001', 'gold', 25, '2027-01-01') $$,
  'an admin records a sponsorship');
select throws_ok(
  $$ insert into public.sponsorships (organisation_id, scope, chapter_id, tier, starts_on)
     values ('0a000000-0000-0000-0000-000000000001', 'cohort', null, 'gold', '2027-01-01') $$,
  '23514', null, 'the scope must name what is sponsored');

-- Stories ----------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.learner_stories (story, show_name)
     values ('The cohort taught me to run Facebook ads for my aunt''s shop in Tamale.', true) $$,
  'a learner shares a story by name');
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000002","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.learner_stories (story) values ('I got my first freelance client after the portfolio week, a shop in Wa.') $$,
  'another shares without a name');
select is((select count(*)::int from public.learner_stories), 1, 'learners see only their own story');

-- The sponsor --------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.sponsorships), 1, 'the sponsor sees its sponsorship');
select is((select learners from public.sponsorship_impact('0e000000-0000-0000-0000-000000000001')), 6, 'six learners');
select is((select finished from public.sponsorship_impact('0e000000-0000-0000-0000-000000000001')), 5, 'five finished');
select is((select active from public.sponsorship_impact('0e000000-0000-0000-0000-000000000001')), null,
  'one active learner is under five, so it is hidden');
select is((select stories from public.sponsorship_impact('0e000000-0000-0000-0000-000000000001')), 2, 'two stories');
select is(
  (select array_agg(coalesce(display_name, 'anonymous') order by display_name) from public.sponsorship_stories('0e000000-0000-0000-0000-000000000001')),
  array['Wumpini Alhassan', 'anonymous'], 'a name only when the learner chose to show it');
select is((select count(*)::int from public.learner_stories), 0, 'the sponsor cannot read the stories table itself');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.sponsorships), 0, 'another organisation sees nothing');
select is((select count(*)::int from public.sponsorship_impact('0e000000-0000-0000-0000-000000000001')), 0, 'nor its impact');
select is((select count(*)::int from public.sponsorship_stories('0e000000-0000-0000-0000-000000000001')), 0, 'nor its stories');

-- Hiding ------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
update public.learner_stories set hidden_at = now(), hidden_by = '33333333-3333-3333-3333-333333333333'
 where profile_id = '10000000-0000-0000-0000-000000000002';
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000002","role":"authenticated"}', true);
select throws_ok(
  $$ update public.learner_stories set hidden_at = null, hidden_by = null $$,
  '42501', null, 'a learner cannot unhide a story an admin hid');

select * from finish();
rollback;
