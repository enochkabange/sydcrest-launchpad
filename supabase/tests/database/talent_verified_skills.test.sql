-- Schema B (issue #158): a verified skill makes a learner eligible for the
-- talent directory (#148), and revoking it removes them.
begin;
create extension if not exists pgtap with schema extensions;
select plan(7);

-- Abdul-Rahman (adult) holds a verified skill and no certificate; Fuseini is
-- an admin; Wumpini (adult) has neither.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', '1998-03-14'), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama')
) as u(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.skills (id, slug, name, is_published) values
  ('5c000000-0000-0000-0000-000000000002', 'sql', 'SQL', true);
select private.issue_verified_skill('22222222-2222-2222-2222-222222222222', '5c000000-0000-0000-0000-000000000002', 'assessment', 'test');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select results_eq(
  $$ select (e ->> 'eligible')::boolean, (e ->> 'verified_skills')::int from public.talent_eligibility() e $$,
  $$ values (true, 1) $$, 'a verified skill makes a learner eligible');
select lives_ok(
  $$ insert into public.talent_listings (headline) values ('Data analyst, SQL verified') $$,
  'and lets them list in the talent directory');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.talent_listings (headline) values ('Not yet verified') $$,
  '42501', null, 'without a certificate or verified skill nobody lists');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select results_eq(
  $$ select display_name, verified_skills -> 0 ->> 'slug', verified_skills -> 0 ->> 'source' from public.talent_directory $$,
  $$ values ('Abdul-Rahman Issah', 'sql', 'assessment') $$,
  'the directory shows verified skills, even for private profiles');
select lives_ok(
  $$ select public.revoke_verified_skill((select id from public.verified_skills limit 1), 'Test') $$,
  'admins revoke the skill');
select is((select count(*)::int from public.talent_directory), 0, 'a revoked skill removes the listing at once');

set local role postgres;
select lives_ok(
  $$ insert into public.reports (reporter_id, target_type, target_id, reason)
     values ('11111111-1111-1111-1111-111111111111', 'talent_listing', 'x', 'Market and Earn targets still allowed') $$,
  'report targets from the Market and Earn schema survive the community swap');

select * from finish();
rollback;
