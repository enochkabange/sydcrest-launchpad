-- Profiles: sign up trigger, row level security and column grants.
-- Runs in CI via `supabase test db` against a fresh local database.
begin;
create extension if not exists pgtap with schema extensions;
select plan(10);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'abdul.rahman@example.test', '{"full_name":"Abdul-Rahman Issah"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"name":"Mariama Seidu", "avatar_url":"https://example.test/m.png"}', now(), now());

-- Trigger
select results_eq(
  $$ select display_name, role from public.profiles order by display_name $$,
  $$ values ('Abdul-Rahman Issah', 'learner'), ('Mariama Seidu', 'learner') $$,
  'sign up creates a learner profile named from full_name or name'
);
select is(
  (select avatar_url from public.profiles where id = '22222222-2222-2222-2222-222222222222'),
  'https://example.test/m.png',
  'Google avatar is copied to the profile'
);

-- Act as Abdul-Rahman
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select is((select count(*)::int from public.profiles), 1, 'a user sees only their own profile');

update public.profiles set region = 'northern', phone = '+233241234567'
  where id = '11111111-1111-1111-1111-111111111111';
select results_eq(
  $$ select region, phone from public.profiles $$,
  $$ values ('northern', '+233241234567') $$,
  'a user can update their own region and phone'
);

update public.profiles set display_name = 'changed' where id = '22222222-2222-2222-2222-222222222222';
select throws_ok(
  $$ update public.profiles set role = 'admin' where id = '11111111-1111-1111-1111-111111111111' $$,
  '42501', null, 'a user cannot change their own role'
);
select throws_ok(
  $$ update public.profiles set phone = '0241234567' where id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'phone must be stored in E.164'
);
select throws_ok(
  $$ insert into public.profiles (id) values ('33333333-3333-3333-3333-333333333333') $$,
  '42501', null, 'users cannot insert profiles directly'
);
select throws_ok(
  $$ delete from public.profiles $$,
  '42501', null, 'users cannot delete profiles'
);

reset role;
select is(
  (select display_name from public.profiles where id = '22222222-2222-2222-2222-222222222222'),
  'Mariama Seidu',
  'a user cannot change someone else''s profile'
);

set local role anon;
select throws_ok($$ select 1 from public.profiles $$, '42501', null, 'signed out visitors cannot read profiles');
reset role;

select * from finish();
rollback;
