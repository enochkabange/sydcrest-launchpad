-- Learner profile v2 (epic #320): a member reads and writes only their own
-- answers, admins read all, visitors none; answers outside the lists fail.
begin;
create extension if not exists pgtap with schema extensions;
select plan(14);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

select ok((select relrowsecurity from pg_class where oid = 'public.learner_profiles'::regclass), 'row level security is on');
select ok(private.is_event_name('learner_profile_saved') and private.is_event_name('profile_field_updated'), 'the profile events are accepted');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.learner_profiles (profile_id, main_goal, education, languages, tracks, work_regions, willing_to_relocate)
     values ('11111111-1111-1111-1111-111111111111', 'job', 'tvet', '{english,dagbani}', '{data-analyst}', '{northern}', true) $$,
  'a member saves their own answers');
select lives_ok(
  $$ update public.learner_profiles set main_goal = 'freelance', study_times = '{evening}'
      where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  'and changes them');
select is((select main_goal from public.learner_profiles), 'freelance', 'and reads them back');
select throws_ok(
  $$ insert into public.learner_profiles (profile_id, main_goal) values ('22222222-2222-2222-2222-222222222222', 'job') $$,
  '42501', null, 'a member cannot write someone else''s answers');
select throws_ok(
  $$ update public.learner_profiles set main_goal = 'world-domination' where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'a single answer outside the list fails');
select throws_ok(
  $$ update public.learner_profiles set languages = '{english,klingon}' where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'a list answer outside the list fails');
select throws_ok(
  $$ update public.learner_profiles set tracks = '{"Not A Slug"}' where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'tracks must be roadmap slugs');
select throws_ok(
  $$ update public.learner_profiles set tracks = (select array_agg('t-' || i) from generate_series(1, 11) i)
      where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '23514', null, 'at most ten tracks');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.learner_profiles), 0, 'another member sees nothing');
select is_empty(
  $$ update public.learner_profiles set main_goal = 'job' returning profile_id $$,
  'and changes nothing');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.learner_profiles), 1, 'an admin reads every learner profile');
reset role;

set local role anon;
select throws_ok($$ select * from public.learner_profiles $$, '42501', null, 'visitors cannot read learner profiles');
reset role;

select * from finish();
rollback;
