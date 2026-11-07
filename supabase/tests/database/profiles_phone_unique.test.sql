-- One account per phone number (issue #285): the partial unique index refuses
-- a second account with the same number, allows many without one, and a
-- learner cannot take another account's number through their own profile.
begin;
create extension if not exists pgtap with schema extensions;
select plan(5);

select has_index('public', 'profiles', 'profiles_phone_key', 'profiles has the phone unique index');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at) values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'fuseini@example.test', '{"full_name":"Fuseini Abdulai"}', now(), now()),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'mariama@example.test', '{"full_name":"Mariama Iddrisu"}', now(), now());

select is(
  (select count(*)::int from public.profiles where phone is null and id in (
    '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333')),
  3,
  'many accounts can have no phone yet');

update public.profiles set phone = '+233241234567' where id = '11111111-1111-1111-1111-111111111111';

select throws_ok(
  $$ update public.profiles set phone = '+233241234567' where id = '22222222-2222-2222-2222-222222222222' $$,
  '23505', null, 'a second account cannot use the same number');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select throws_ok(
  $$ update public.profiles set phone = '+233241234567' where id = '33333333-3333-3333-3333-333333333333' $$,
  '23505', null, 'a learner cannot take another account''s number on their own profile');
select lives_ok(
  $$ update public.profiles set phone = '+233201234567' where id = '33333333-3333-3333-3333-333333333333' $$,
  'a learner can save a number nobody else has');
reset role;

select * from finish();
rollback;
