-- Public profiles: the new profile fields, the public_profiles view, and
-- achievements on public profiles. Phone (and anything not meant for the
-- public) must never be reachable through the public path.
begin;
create extension if not exists pgtap with schema extensions;
select plan(19);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now());
update public.profiles set phone = '+233241234567' where id = '11111111-1111-1111-1111-111111111111';
update public.profiles set phone = '+233501234567' where id = '22222222-2222-2222-2222-222222222222';
select private.mint_achievement('11111111-1111-1111-1111-111111111111', 'track_chosen', 'data');
select private.mint_achievement('22222222-2222-2222-2222-222222222222', 'track_chosen', 'frontend');

select is(
  (select array_agg(column_name::text order by column_name) from information_schema.columns
    where table_schema = 'public' and table_name = 'public_profiles'
      and column_name in ('phone', 'role', 'email', 'datacamp_license_slot', 'is_public', 'updated_at')),
  null,
  'public_profiles has no private columns'
);

-- Wumpini opts in
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok(
  $$ update public.profiles
       set public_slug = 'wumpini', is_public = true, headline = 'Data analyst in Tamale',
           skills = '{excel,sql}', goals = 'Land a data role'
     where id = '11111111-1111-1111-1111-111111111111' $$,
  'a user edits their public profile fields');
select throws_ok(
  $$ update public.profiles set datacamp_license_slot = 'seat-1' where id = '11111111-1111-1111-1111-111111111111' $$,
  '42501', null, 'a user cannot assign themselves a DataCamp seat');
select throws_ok(
  $$ update public.profiles set public_slug = 'Wumpini!' where id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'public slugs are lowercase letters, digits and hyphens');
select is((select phone from public.profiles where id = '11111111-1111-1111-1111-111111111111'), '+233241234567',
  'the owner still reads their own phone');
reset role;

-- Mariama
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);

select throws_ok(
  $$ update public.profiles set is_public = true where id = '22222222-2222-2222-2222-222222222222' $$,
  '23514', null, 'a profile needs a slug before going public');
select throws_ok(
  $$ update public.profiles set public_slug = 'wumpini' where id = '22222222-2222-2222-2222-222222222222' $$,
  '23505', null, 'public slugs are unique');
select results_eq($$ select public_slug, headline, skills from public.public_profiles $$,
  $$ values ('wumpini', 'Data analyst in Tamale', '{excel,sql}'::text[]) $$,
  'a signed in user reads public profiles');
select throws_ok($$ select phone from public.public_profiles $$, '42703', null,
  'phone is not on the public profile view');
select results_eq($$ select id from public.profiles $$, $$ values ('22222222-2222-2222-2222-222222222222'::uuid) $$,
  'the profiles table still shows a signed in user only their own row');
select results_eq($$ select type from public.achievements where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('track_chosen') $$, 'achievements of a public profile are visible to others');
select results_eq($$ select ref_id from public.achievements where profile_id = '22222222-2222-2222-2222-222222222222' $$,
  $$ values ('frontend') $$, 'a user sees their own achievements while private');
reset role;

-- Signed out
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select results_eq($$ select public_slug, display_name from public.public_profiles $$,
  $$ values ('wumpini', 'Wumpini Alhassan') $$, 'anon reads opted in profiles only');
select throws_ok($$ select phone from public.public_profiles $$, '42703', null,
  'anon cannot get phone from the public view');
select throws_ok($$ select phone from public.profiles $$, '42501', null,
  'anon cannot read the profiles table');
select is((select count(*)::int from public.achievements), 1,
  'anon sees achievements of public profiles only');
select throws_ok($$ select private.mint_achievement('22222222-2222-2222-2222-222222222222', 'streak', '1') $$,
  '42501', null, 'anon cannot mint achievements');
reset role;

-- Going private again hides everything
update public.profiles set is_public = false where id = '11111111-1111-1111-1111-111111111111';
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select is((select count(*)::int from public.public_profiles), 0, 'turning is_public off removes the public profile');
select is((select count(*)::int from public.achievements), 0, 'and hides its achievements');
reset role;

select * from finish();
rollback;
