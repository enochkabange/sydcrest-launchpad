-- roadmap_nodes.kind and choice_group (issue #129): the checks hold, nulls
-- are allowed, anon reads the new columns on published roadmaps only, and
-- only admins write them.
begin;
create extension if not exists pgtap with schema extensions;
select plan(14);

select has_column('public', 'roadmap_nodes', 'kind', 'roadmap_nodes has kind');
select col_is_null('public', 'roadmap_nodes', 'kind', 'kind is nullable (derived from depth when null)');
select col_hasnt_default('public', 'roadmap_nodes', 'kind', 'kind has no default');
select has_column('public', 'roadmap_nodes', 'choice_group', 'roadmap_nodes has choice_group');
select col_is_null('public', 'roadmap_nodes', 'choice_group', 'choice_group is nullable');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'frontend', 'Frontend Developer', false);

select lives_ok(
  $$ insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, kind, choice_group) values
       ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 0, null, null),
       ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sheets', 'Google Sheets', 1, 'topic', 'spreadsheet-tool'),
       ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'excel', 'Excel', 2, 'topic', 'spreadsheet-tool'),
       ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'records-check', 'Records check', 3, 'checkpoint', null),
       ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'basics', 'Basics', 4, 'section', null),
       ('bbbbbbbb-0000-0000-0000-000000000006', 'aaaaaaaa-0000-0000-0000-000000000002', 'html', 'HTML', 0, 'section', 'draft-only') $$,
  'null and every valid kind and choice group are accepted');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title, kind) values ('aaaaaaaa-0000-0000-0000-000000000001', 'quiz', 'Quiz', 'quiz') $$,
  '23514', null, 'kind is section, topic or checkpoint');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title, kind) values ('aaaaaaaa-0000-0000-0000-000000000001', 'caps', 'Caps', 'Topic') $$,
  '23514', null, 'kind is lowercase');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title, choice_group) values ('aaaaaaaa-0000-0000-0000-000000000001', 'bad-group', 'Bad', 'Pick One!') $$,
  '23514', null, 'choice_group is a lowercase slug style key');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title, choice_group) values ('aaaaaaaa-0000-0000-0000-000000000001', 'empty-group', 'Empty', '') $$,
  '23514', null, 'choice_group is never an empty string');

-- Signed out visitor
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select slug, kind, choice_group from public.roadmap_nodes order by position $$,
  $$ values ('spreadsheets', null::text, null::text), ('sheets', 'topic', 'spreadsheet-tool'),
            ('excel', 'topic', 'spreadsheet-tool'), ('records-check', 'checkpoint', null), ('basics', 'section', null) $$,
  'anon reads kind and choice_group on published roadmaps only');
reset role;

-- Learner
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
update public.roadmap_nodes set kind = 'checkpoint', choice_group = 'hack' where slug = 'spreadsheets';
reset role;
select results_eq(
  $$ select kind, choice_group from public.roadmap_nodes where slug = 'spreadsheets' $$,
  $$ values (null::text, null::text) $$,
  'a learner cannot change kind or choice_group');

-- Admin
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select lives_ok(
  $$ update public.roadmap_nodes set kind = 'checkpoint', choice_group = 'final-check' where slug = 'spreadsheets' $$,
  'an admin sets kind and choice_group');
select lives_ok(
  $$ update public.roadmap_nodes set kind = null, choice_group = null where slug = 'spreadsheets' $$,
  'an admin clears kind and choice_group back to derived');
reset role;

select * from finish();
rollback;
