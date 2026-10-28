-- Lesson structure (issue #255): the new roadmap_nodes and node_content
-- columns are nullable, their checks hold, anon reads them on published
-- roadmaps only, and only admins write them.
begin;
create extension if not exists pgtap with schema extensions;
select plan(21);

select has_column('public', 'roadmap_nodes', 'difficulty', 'roadmap_nodes has difficulty');
select has_column('public', 'roadmap_nodes', 'complexity', 'roadmap_nodes has complexity');
select has_column('public', 'roadmap_nodes', 'career_level', 'roadmap_nodes has career_level');
select has_column('public', 'roadmap_nodes', 'jobs', 'roadmap_nodes has jobs');
select has_column('public', 'node_content', 'outcomes', 'node_content has outcomes');
select has_column('public', 'node_content', 'key_terms', 'node_content has key_terms');
select col_is_null('public', 'roadmap_nodes', 'difficulty', 'difficulty is nullable (older rows keep working)');
select col_is_null('public', 'node_content', 'outcomes', 'outcomes is nullable (older lessons keep working)');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'abdul-rahman@example.test', '{"full_name":"Abdul-Rahman Issah"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'frontend', 'Frontend Developer', false);

select lives_ok(
  $$ insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, difficulty, complexity, career_level, jobs) values
       ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'basics', 'Basics', 0, 'beginner', 1, 'foundation', '{}'),
       ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'reports', 'Reports', 1, 'intermediate', 3, 'junior', '{"Data Analyst","Data Entry Clerk"}'),
       ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'legacy', 'Legacy', 2, null, null, null, null),
       ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 'html', 'HTML', 0, 'beginner', 2, 'foundation', '{"Web Developer"}') $$,
  'valid values and nulls are accepted');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title, difficulty) values ('aaaaaaaa-0000-0000-0000-000000000001', 'x1', 'X', 'expert') $$,
  '23514', null, 'difficulty is beginner, intermediate or advanced');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title, complexity) values ('aaaaaaaa-0000-0000-0000-000000000001', 'x2', 'X', 6) $$,
  '23514', null, 'complexity is 1 to 5');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title, career_level) values ('aaaaaaaa-0000-0000-0000-000000000001', 'x3', 'X', 'senior') $$,
  '23514', null, 'career_level is foundation, junior, mid or specialist');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title, jobs) values ('aaaaaaaa-0000-0000-0000-000000000001', 'x4', 'X', array['Analyst', null]) $$,
  '23514', null, 'jobs never holds a null title');

insert into public.node_content (node_id, explanation_md, outcomes, key_terms) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'Basics.', '{"Name the parts of a sheet","Sort a list"}', '[{"term":"Cell","definition":"One box in a sheet."}]'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'HTML.', '{"Write a page"}', null);
select throws_ok(
  $$ insert into public.node_content (node_id, explanation_md, key_terms) values ('bbbbbbbb-0000-0000-0000-000000000003', 'x', '{"term":"x"}') $$,
  '23514', null, 'key_terms is a JSON array');
select throws_ok(
  $$ insert into public.node_content (node_id, explanation_md, outcomes) values ('bbbbbbbb-0000-0000-0000-000000000003', 'x', '{}') $$,
  '23514', null, 'outcomes is never an empty list');

-- Signed out visitor
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select slug, difficulty, complexity, career_level from public.roadmap_nodes order by position $$,
  $$ values ('basics', 'beginner', 1::smallint, 'foundation'), ('reports', 'intermediate', 3::smallint, 'junior'),
            ('legacy', null::text, null::smallint, null::text) $$,
  'anon reads the new node columns on published roadmaps only');
select results_eq(
  $$ select outcomes from public.node_content $$,
  $$ values ('{"Name the parts of a sheet","Sort a list"}'::text[]) $$,
  'anon reads outcomes on published roadmaps only');
reset role;

-- Learner
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
update public.roadmap_nodes set difficulty = 'advanced', jobs = '{"Hacker"}' where slug = 'basics';
update public.node_content set outcomes = '{"hack"}';
reset role;
select results_eq(
  $$ select difficulty, jobs from public.roadmap_nodes where slug = 'basics' $$,
  $$ values ('beginner'::text, '{}'::text[]) $$,
  'a learner cannot change difficulty or jobs');
select results_eq(
  $$ select count(*)::int from public.node_content where outcomes = '{"hack"}' $$,
  $$ values (0) $$,
  'a learner cannot change outcomes');

-- Admin
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select lives_ok(
  $$ update public.roadmap_nodes set difficulty = 'advanced', complexity = 5, career_level = 'specialist', jobs = '{"Data Scientist"}' where slug = 'reports' $$,
  'an admin sets the node metadata');
select lives_ok(
  $$ update public.node_content set outcomes = '{"Build a report","Explain it"}', common_mistakes = '{"Skipping checks"}' where node_id = 'bbbbbbbb-0000-0000-0000-000000000001' $$,
  'an admin sets the lesson anatomy');
reset role;

select * from finish();
rollback;
