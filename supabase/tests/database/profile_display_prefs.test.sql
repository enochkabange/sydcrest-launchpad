-- profiles.display_prefs (issue #204): owner writable, validated, private.
begin;
create extension if not exists pgtap with schema extensions;
select plan(9);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Abukari"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Alhassan"}', now(), now());

select is(
  (select display_prefs from public.profiles where id = '11111111-1111-1111-1111-111111111111'),
  '{}'::jsonb,
  'a new profile starts with no display choices'
);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok(
  $$ update public.profiles set display_prefs = '{"theme":"dark","textSize":150,"motion":"reduce","contrast":"more","underlineLinks":true,"spacing":"wide","font":"system","updatedAt":1793000000000}'
     where id = '11111111-1111-1111-1111-111111111111' $$,
  'the owner can save every choice'
);
select is(
  (select display_prefs->>'theme' from public.profiles where id = '11111111-1111-1111-1111-111111111111'),
  'dark',
  'the saved choice is read back'
);

select throws_ok(
  $$ update public.profiles set display_prefs = '{"theme":"purple"}' where id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'an unknown theme is rejected'
);
select throws_ok(
  $$ update public.profiles set display_prefs = '{"textSize":300}' where id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'an unknown text size is rejected'
);
select throws_ok(
  $$ update public.profiles set display_prefs = '{"script":"<b>"}' where id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'unknown keys are rejected'
);
select throws_ok(
  $$ update public.profiles set display_prefs = '["dark"]' where id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'only an object is accepted'
);

-- Someone else's row: RLS hides it, so the update touches nothing.
update public.profiles set display_prefs = '{"theme":"light"}' where id = '22222222-2222-2222-2222-222222222222';
reset role;
select is(
  (select display_prefs from public.profiles where id = '22222222-2222-2222-2222-222222222222'),
  '{}'::jsonb,
  'a user cannot change someone else''s display choices'
);

set local role anon;
select throws_ok($$ update public.profiles set display_prefs = '{}' $$, '42501', null, 'signed out visitors cannot write display choices');
reset role;

select * from finish();
rollback;
