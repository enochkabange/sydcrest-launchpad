-- roadmaps.leads_to and level, and the node_estimate_inputs view (issue #244):
-- checks hold, anon reads them on published roadmaps only, learners cannot
-- write them, and the view counts words and questions under base table RLS.
begin;
create extension if not exists pgtap with schema extensions;
select plan(13);

select has_column('public', 'roadmaps', 'leads_to', 'roadmaps has leads_to');
select col_default_is('public', 'roadmaps', 'leads_to', '{}'::text[], 'leads_to defaults to an empty list');
select has_column('public', 'roadmaps', 'level', 'roadmaps has level');
select has_view('public', 'node_estimate_inputs', 'node_estimate_inputs exists');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now());

insert into public.roadmaps (id, slug, title, is_published, track, leads_to, level) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true, 'data', '{data-science,ai-ml}', 'beginner'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'frontend', 'Frontend Developer', false, 'frontend', '{backend}', null);

select throws_ok(
  $$ update public.roadmaps set leads_to = '{Data Science}' where slug = 'data-analyst' $$,
  '23514', null, 'leads_to holds slug style track keys');
select throws_ok(
  $$ update public.roadmaps set leads_to = array[null]::text[] where slug = 'data-analyst' $$,
  '23514', null, 'leads_to holds no nulls');
select throws_ok(
  $$ update public.roadmaps set level = 'expert' where slug = 'data-analyst' $$,
  '23514', null, 'level is first-steps, beginner or next-step');

insert into public.roadmap_nodes (id, roadmap_id, slug, title, position) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'sheets', 'Spreadsheets', 0),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 1),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002', 'html', 'HTML', 0);
insert into public.node_content (node_id, explanation_md, practice_task_md) values
  ('bbbbbbbb-0000-0000-0000-000000000001', E'Rows run across.\n\nColumns run  down.', 'Add five prices.'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'Draft lesson text', null);
insert into public.node_quiz (node_id, questions) values
  ('bbbbbbbb-0000-0000-0000-000000000001', '[{"id":"q1","prompt":"A","options":["x","y"]},{"id":"q2","prompt":"B","options":["x","y"]}]');

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select slug, leads_to, level from public.roadmaps order by slug $$,
  $$ values ('data-analyst', '{data-science,ai-ml}'::text[], 'beginner'::text) $$,
  'anon reads leads_to and level on published roadmaps only');
select results_eq(
  $$ select slug, has_lesson, lesson_words, practice_words, quiz_questions
       from public.node_estimate_inputs e join public.roadmap_nodes n on n.id = e.node_id order by n.position $$,
  $$ values ('sheets', true, 6, 3, 2), ('sql', false, 0, 0, 0) $$,
  'the view counts words and questions on published roadmaps only');
reset role;

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
update public.roadmaps set leads_to = '{hack}', level = 'next-step' where slug = 'data-analyst';
select is(
  (select leads_to from public.roadmaps where slug = 'data-analyst'),
  '{data-science,ai-ml}'::text[],
  'a learner cannot change leads_to');
select is(
  (select count(*)::int from public.node_estimate_inputs),
  2,
  'a learner sees estimate inputs for published roadmaps only');
select throws_ok(
  $$ insert into public.node_estimate_inputs (node_id) values ('bbbbbbbb-0000-0000-0000-000000000002') $$,
  null, null, 'the view is read only for learners');
reset role;

select is(
  (select level from public.roadmaps where slug = 'data-analyst'),
  'beginner',
  'a learner cannot change level');

select * from finish();
rollback;
