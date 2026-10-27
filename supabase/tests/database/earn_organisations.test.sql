-- Market and Earn (issue #148): the adult check, organisations, members and
-- verification.
begin;
create extension if not exists pgtap with schema extensions;
select plan(42);

-- Ayishetu owns a business, Wumpini is invited to it, Fuseini is 16,
-- Sumaila has no date of birth on file, Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_strip_nulls(jsonb_build_object('full_name', name, 'date_of_birth', dob)), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '1999-03-14'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu', '1990-07-01'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama',
     to_char(now() - interval '16 years', 'YYYY-MM-DD')),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu', null),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari', '1988-11-30'),
  ('77777777-7777-7777-7777-777777777777', 'adisa@example.test', 'Adisa Iddrisu', 'not a date')
) as u(id, email, name, dob);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';

-- The adult check -----------------------------------------------------------------
select ok(private.is_adult('11111111-1111-1111-1111-111111111111'), 'a 27 year old is an adult');
select ok(not private.is_adult('44444444-4444-4444-4444-444444444444'), 'a 16 year old is not');
select ok(not private.is_adult('55555555-5555-5555-5555-555555555555'), 'no date of birth means not an adult');
select ok(not private.is_adult('77777777-7777-7777-7777-777777777777'), 'an unreadable date of birth means not an adult');
select ok(not private.is_adult(null), 'nobody is not an adult');
select ok(not has_function_privilege('anon', 'private.is_adult(uuid)', 'execute'),
  'signed out visitors cannot probe ages');

-- Creating an organisation -----------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.organisations (slug, name, kind, registration_number, website)
     values ('tamale-shea', 'Tamale Shea Collective', 'business', 'BN-123456', 'https://shea.example.test') $$,
  'an adult creates an organisation');
-- Inserts cannot choose ids (no grant), so keep the new id in a setting.
select set_config('test.org', (select id::text from public.organisations where slug = 'tamale-shea'), true);
select is(
  (select role || '/' || status from public.organisation_members
    where organisation_id = current_setting('test.org')::uuid
      and profile_id = '66666666-6666-6666-6666-666666666666'),
  'owner/active', 'the creator becomes the active owner');
select is(
  (select verification_status from public.organisations where id = current_setting('test.org')::uuid),
  'unverified', 'a new organisation starts unverified');
select throws_ok(
  $$ update public.organisations set verification_status = 'verified' where id = current_setting('test.org')::uuid $$,
  '42501', null, 'owners cannot verify themselves');
select throws_ok(
  $$ insert into public.organisations (slug, name, website) values ('bad-link', 'Bad link', 'javascript:alert(1)') $$,
  '23514', null, 'a website must be an http link');
select lives_ok(
  $$ update public.organisations set description = 'Shea butter from Tamale' where id = current_setting('test.org')::uuid $$,
  'owners edit their organisation');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.organisations (slug, name) values ('fuseini-co', 'Fuseini Co') $$,
  '42501', null, 'under 18s cannot create organisations');
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.organisations (slug, name) values ('sumaila-co', 'Sumaila Co') $$,
  '42501', null, 'people with no date of birth on file cannot create organisations');

-- Strangers -------------------------------------------------------------------------
select is((select count(*)::int from public.organisations), 0, 'strangers cannot read an unverified organisation');
update public.organisations set name = 'Taken over';
select is(
  (select name from public.organisations where id = current_setting('test.org')::uuid),
  null, 'strangers cannot edit it (and still cannot see it)');
select is((select count(*)::int from public.organisation_roster), 0, 'strangers see no roster');

-- Invitations ----------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.organisation_members (organisation_id, profile_id, role)
     values (current_setting('test.org')::uuid, '11111111-1111-1111-1111-111111111111', 'recruiter'),
            (current_setting('test.org')::uuid, '44444444-4444-4444-4444-444444444444', 'recruiter') $$,
  'the owner invites members');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select status from public.organisation_members where profile_id = '11111111-1111-1111-1111-111111111111'),
  'invited', 'the invitee sees their invitation');
select is((select name from public.organisations), 'Tamale Shea Collective', 'the invitee sees the organisation');
select is((select count(*)::int from public.organisation_roster), 0, 'an invitee does not see the roster yet');
select throws_ok(
  $$ update public.organisation_members set status = 'active' where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '42501', null, 'invitees cannot activate themselves by update');
select lives_ok(
  $$ select public.accept_organisation_invite(current_setting('test.org')::uuid) $$,
  'an adult accepts the invitation');
select is((select count(*)::int from public.organisation_roster), 3, 'active members see the roster, pending invitations included');
select ok(
  (select display_name = 'Ayishetu Abukari' from public.organisation_roster where role = 'owner'),
  'the roster carries names');
select throws_ok(
  $$ insert into public.organisation_members (organisation_id, profile_id, role)
     values (current_setting('test.org')::uuid, '55555555-5555-5555-5555-555555555555', 'recruiter') $$,
  '42501', null, 'recruiters cannot invite');
update public.organisations set description = 'Recruiter edit' where id = current_setting('test.org')::uuid;
select is((select description from public.organisations where id = current_setting('test.org')::uuid),
  'Shea butter from Tamale', 'recruiters cannot edit the organisation');
select throws_ok(
  $$ select public.request_organisation_verification(current_setting('test.org')::uuid) $$,
  '42501', null, 'recruiters cannot ask for verification');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select throws_ok(
  $$ select public.accept_organisation_invite(current_setting('test.org')::uuid) $$,
  '42501', null, 'under 18s cannot join an organisation');

-- The last owner ------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select throws_ok(
  $$ delete from public.organisation_members where profile_id = '66666666-6666-6666-6666-666666666666' $$,
  '23514', null, 'the last owner cannot leave');
select throws_ok(
  $$ update public.organisation_members set role = 'admin' where profile_id = '66666666-6666-6666-6666-666666666666' $$,
  '23514', null, 'the last owner cannot step down');

-- Verification ---------------------------------------------------------------------
select is(
  (select verification_status from public.request_organisation_verification(current_setting('test.org')::uuid)),
  'pending', 'the owner asks for verification');
select throws_ok(
  $$ select public.admin_set_organisation_verification(current_setting('test.org')::uuid, 'verified') $$,
  '42501', null, 'only admins verify');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is(
  (select verification_status from public.admin_set_organisation_verification(current_setting('test.org')::uuid, 'verified', 'Checked the registrar')),
  'verified', 'an admin verifies');

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select slug, name from public.public_organisations $$,
  $$ values ('tamale-shea', 'Tamale Shea Collective') $$, 'verified organisations are public');
select throws_ok($$ select * from public.organisations $$, '42501', null, 'anon cannot read the organisations table');
select throws_ok($$ select * from public.organisation_members $$, '42501', null, 'anon cannot read members');
select hasnt_column('public', 'public_organisations', 'registration_number', 'the registration number is never public');

-- Renaming sends a verified organisation back to review.
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
update public.organisations set name = 'Tamale Shea Company' where id = current_setting('test.org')::uuid;
select is((select verification_status from public.organisations where id = current_setting('test.org')::uuid),
  'pending', 'renaming a verified organisation sends it back for review');
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select is((select count(*)::int from public.public_organisations), 0, 'and it leaves the public list until checked again');

reset role;
select lives_ok(
  $$ delete from auth.users where id = '66666666-6666-6666-6666-666666666666' $$,
  'the last owner can still delete their account');

select ok(
  not has_function_privilege('anon', 'public.admin_set_organisation_verification(uuid, text, text)', 'execute')
  and not has_function_privilege('anon', 'public.accept_organisation_invite(uuid)', 'execute')
  and not has_function_privilege('anon', 'public.request_organisation_verification(uuid)', 'execute'),
  'signed out visitors cannot call the organisation functions');

select * from finish();
rollback;
