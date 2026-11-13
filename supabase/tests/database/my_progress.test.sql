-- My progress (epic #320, issue #337): members read their own readiness rows only.
begin;
create extension if not exists pgtap with schema extensions;
select plan(8);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
    ('22222222-2222-2222-2222-222222222222', 'mariama@example.test', 'Mariama Seidu'),
    ('33333333-3333-3333-3333-333333333333', 'fuseini@example.test', 'Fuseini Mahama')) v(id, email, name);

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'web-basics', 'Web Basics', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002', 'html', 'HTML', 1, false);

-- Wumpini works on both tracks, Mariama on one, Fuseini on none.
insert into public.roadmap_progress (profile_id, node_id, status, completed_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', null),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000002', 'done', now()),
  ('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', null);

select is(private.refresh_readiness(), 3, 'three learner track rows');

set local role authenticated;

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select results_eq(
  $$ select profile_id::text, roadmap_slug from public.readiness_scores order by roadmap_slug $$,
  $$ values ('11111111-1111-1111-1111-111111111111', 'data-analyst'), ('11111111-1111-1111-1111-111111111111', 'web-basics') $$,
  'a member reads their own readiness for every track');
select is(
  (select count(*)::int from public.readiness_scores where profile_id = '22222222-2222-2222-2222-222222222222'), 0,
  'and never another member''s');
select throws_ok(
  $$ update public.readiness_scores set score = 100 where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '42501', null, 'members cannot change their score');
select throws_ok(
  $$ delete from public.readiness_scores where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  '42501', null, 'or delete it');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select results_eq(
  $$ select roadmap_slug from public.readiness_scores $$,
  $$ values ('data-analyst') $$,
  'another member reads only their own row');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.readiness_scores), 0, 'a member with no tracks reads nothing');
reset role;

set local role anon;
select throws_ok($$ select * from public.readiness_scores $$, '42501', null, 'visitors cannot read scores');
reset role;

select * from finish();
rollback;
