-- Roadmap content: roadmaps, roadmap_nodes, node_content, node_resources,
-- node_quiz, node_quiz_answers. Published content is public, drafts and
-- answer keys are not, and only admins write.
begin;
create extension if not exists pgtap with schema extensions;
select plan(30);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'frontend', 'Frontend Developer', false);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002', 'html', 'HTML', 1);
insert into public.node_content (node_id, explanation_md) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'Spreadsheets hold market prices in Tamale.'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'Draft');
insert into public.node_resources (node_id, label, url, kind, is_active) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'Live link', 'https://example.test/a', 'article', true),
  ('bbbbbbbb-0000-0000-0000-000000000001', 'Dead link', 'https://example.test/b', 'video', false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'Draft link', 'https://example.test/c', 'practice', true);
insert into public.node_quiz (id, node_id, questions) values
  ('cccccccc-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001',
   '[{"id":"q1","prompt":"Which cell holds the total?","options":["A1","B2"]}]'),
  ('cccccccc-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000002', '[]');
insert into public.node_quiz_answers (quiz_id, answer_key) values
  ('cccccccc-0000-0000-0000-000000000001', '{"q1": 1}'),
  ('cccccccc-0000-0000-0000-000000000002', '{}');

-- Signed out visitor
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select results_eq($$ select slug from public.roadmaps $$, $$ values ('data-analyst') $$,
  'anon reads published roadmaps only');
select results_eq($$ select slug from public.roadmap_nodes $$, $$ values ('spreadsheets') $$,
  'anon reads nodes of published roadmaps only');
select is((select count(*)::int from public.node_content), 1, 'anon reads content of published nodes only');
select results_eq($$ select label from public.node_resources $$, $$ values ('Live link') $$,
  'anon reads active resources of published nodes only');
select is((select count(*)::int from public.node_quiz), 1, 'anon reads quiz questions of published nodes only');
select throws_ok($$ select * from public.node_quiz_answers $$, '42501', null,
  'anon cannot read quiz answer keys');
select throws_ok($$ insert into public.roadmaps (slug, title) values ('hack', 'Hack') $$, '42501', null,
  'anon cannot create roadmaps');
select throws_ok($$ update public.node_content set explanation_md = 'x' $$, '42501', null,
  'anon cannot edit content');
select is((select private.is_admin()), false, 'anon is not an admin');
reset role;

-- Learner
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select is((select private.is_admin()), false, 'a learner is not an admin');
select results_eq($$ select slug from public.roadmaps $$, $$ values ('data-analyst') $$,
  'a learner reads published roadmaps only');
select is((select count(*)::int from public.node_quiz_answers), 0, 'a learner cannot read quiz answer keys');
select throws_ok($$ insert into public.roadmaps (slug, title) values ('hack', 'Hack') $$, '42501', null,
  'a learner cannot create roadmaps');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title) values ('aaaaaaaa-0000-0000-0000-000000000001', 'x', 'X') $$,
  '42501', null, 'a learner cannot add nodes');
select throws_ok(
  $$ insert into public.node_quiz_answers (quiz_id, answer_key) values ('cccccccc-0000-0000-0000-000000000001', '{}') $$,
  '42501', null, 'a learner cannot write answer keys');
update public.roadmaps set title = 'Owned' where slug = 'data-analyst';
update public.roadmaps set is_published = true where slug = 'frontend';
delete from public.node_resources;
delete from public.roadmap_nodes;
reset role;

select is((select title from public.roadmaps where slug = 'data-analyst'), 'Data Analyst',
  'a learner cannot edit a roadmap');
select is((select is_published from public.roadmaps where slug = 'frontend'), false,
  'a learner cannot publish a draft');
select is((select count(*)::int from public.node_resources), 3, 'a learner cannot delete resources');
select is((select count(*)::int from public.roadmap_nodes), 2, 'a learner cannot delete nodes');

-- Admin
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);

select is((select private.is_admin()), true, 'an admin is recognised');
select is((select count(*)::int from public.roadmaps), 2, 'an admin sees drafts');
select is((select count(*)::int from public.node_resources), 3, 'an admin sees inactive and draft resources');
select results_eq($$ select answer_key from public.node_quiz_answers where quiz_id = 'cccccccc-0000-0000-0000-000000000001' $$,
  $$ values ('{"q1": 1}'::jsonb) $$, 'an admin reads answer keys');
select lives_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, parent_id, slug, title, position)
     values ('aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'pivot-tables', 'Pivot tables', 2) $$,
  'an admin adds a child node');
select lives_ok($$ update public.roadmaps set is_published = true where slug = 'frontend' $$,
  'an admin publishes a roadmap');
select lives_ok($$ update public.node_quiz_answers set answer_key = '{"q1": 0}' where quiz_id = 'cccccccc-0000-0000-0000-000000000001' $$,
  'an admin edits an answer key');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, parent_id, slug, title)
     values ('aaaaaaaa-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000001', 'stray', 'Stray') $$,
  '23503', null, 'a node''s parent must be in the same roadmap');
select throws_ok(
  $$ insert into public.roadmap_nodes (roadmap_id, slug, title) values ('aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Dup') $$,
  '23505', null, 'node slugs are unique per roadmap');
select throws_ok($$ insert into public.roadmaps (slug, title) values ('Data Analyst', 'Bad slug') $$, '23514', null,
  'roadmap slugs are lowercase');
select throws_ok(
  $$ insert into public.node_resources (node_id, label, url, kind) values ('bbbbbbbb-0000-0000-0000-000000000001', 'x', 'https://example.test', 'podcast') $$,
  '23514', null, 'resource kind is article, video or practice');
reset role;

select * from finish();
rollback;
