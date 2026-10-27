-- Phase 2 (issue #142): programme weeks, their roadmap links, rubrics, and
-- the seeded Delta Mentoring Program.
begin;
create extension if not exists pgtap with schema extensions;
select plan(24);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at) values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.programs (id, slug, title, is_published) values
  ('a0000000-0000-0000-0000-000000000002', 'test-u', 'Unpublished programme', false);
insert into public.program_weeks (id, program_id, week_number, theme, assignment) values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 1, 'Hidden week', 'Hidden task');
insert into public.program_week_nodes (program_week_id, roadmap_slug, node_slug) values
  ('b0000000-0000-0000-0000-000000000001', 'digital-marketer', 'seo-basics');
insert into public.rubrics (program_id, title, criteria) values
  ('a0000000-0000-0000-0000-000000000002', 'Hidden', '[{"id":"a","label":"A","max_points":2}]');

-- The seeded DMP ------------------------------------------------------------------
select results_eq(
  $$ select title, duration_weeks, min_age, default_cohort_size, grace_days, min_peer_reviews, is_published
     from public.programs where slug = 'dmp' $$,
  $$ values ('Delta Mentoring Program', 12::smallint, 18::smallint, 20::smallint, 7::smallint, 1::smallint, true) $$,
  'the DMP is seeded: 12 weeks, adults, 20 per cohort, 7 days grace, peer review required');
select is(
  (select jsonb_agg(e ->> 'slug' order by e ->> 'slug') from public.programs p, jsonb_array_elements(p.specializations) e where p.slug = 'dmp'),
  '["google_ads", "seo", "social_media"]'::jsonb, 'the DMP offers the three specializations');
select results_eq(
  $$ select week_number, count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id
     where p.slug = 'dmp' group by week_number order by week_number $$,
  $$ values (1::smallint, 1), (2::smallint, 1), (3::smallint, 1), (4::smallint, 1), (5::smallint, 1), (6::smallint, 1),
            (7::smallint, 3), (8::smallint, 3), (9::smallint, 3), (10::smallint, 1), (11::smallint, 1), (12::smallint, 1) $$,
  'weeks 1 to 6 and 10 to 12 are shared; 7 to 9 fork by specialization');
select is(
  (select count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id
   where p.slug = 'dmp' and w.specialization is not null and w.week_number not between 7 and 9), 0,
  'only weeks 7 to 9 are specialization weeks');
select results_eq(
  $$ select week_number from public.program_weeks w join public.programs p on p.id = w.program_id
     where p.slug = 'dmp' and is_capstone $$,
  $$ values (12::smallint) $$, 'week 12 is the capstone');
select is(
  (select count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id
   where p.slug = 'dmp' and not exists (select 1 from public.program_week_nodes n where n.program_week_id = w.id)), 0,
  'every DMP week links to roadmap topics');
select is(
  (select array_agg(distinct n.roadmap_slug order by n.roadmap_slug) from public.program_week_nodes n
   join public.program_weeks w on w.id = n.program_week_id join public.programs p on p.id = w.program_id where p.slug = 'dmp'),
  array['digital-marketer', 'digital-skills-bridge'], 'links point at the Digital Skills Bridge and Digital Marketer roadmaps');
select results_eq(
  $$ select r.title, r.program_week_id is null from public.rubrics r join public.programs p on p.id = r.program_id
     where p.slug = 'dmp' order by r.title $$,
  $$ values ('Capstone', false), ('Weekly assignment', true) $$,
  'the DMP has a default rubric and a capstone rubric');

-- Visibility ------------------------------------------------------------------------
set local role anon;
select is((select count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id where p.slug = 'dmp'), 18,
  'anon reads the published curriculum');
select is((select count(*)::int from public.program_weeks where program_id = 'a0000000-0000-0000-0000-000000000002'), 0,
  'anon cannot read weeks of an unpublished programme');
select is((select count(*)::int from public.program_week_nodes where program_week_id = 'b0000000-0000-0000-0000-000000000001'), 0,
  'anon cannot read week links of an unpublished programme');
select is((select count(*)::int from public.rubrics where program_id = 'a0000000-0000-0000-0000-000000000002'), 0,
  'anon cannot read rubrics of an unpublished programme');
select throws_ok(
  $$ insert into public.program_weeks (program_id, week_number, theme, assignment)
     values ('a0000000-0000-0000-0000-000000000002', 2, 'x', 'y') $$,
  '42501', null, 'anon cannot write weeks');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ insert into public.program_weeks (program_id, week_number, theme, assignment)
     values ((select id from public.programs where slug = 'dmp'), 13, 'x', 'y') $$,
  '42501', null, 'learners cannot add weeks');
select throws_ok(
  $$ insert into public.rubrics (program_id, title, criteria)
     values ((select id from public.programs where slug = 'dmp'), 'x', '[{"id":"a","label":"A","max_points":1}]') $$,
  '42501', null, 'learners cannot add rubrics');
update public.rubrics set title = 'Changed';
delete from public.program_week_nodes;
select is((select count(*)::int from public.rubrics where title = 'Changed'), 0, 'learners cannot change rubrics');
select ok((select count(*) > 0 from public.program_week_nodes), 'learners cannot delete week links');

-- Admin writes and validation ------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.program_weeks where program_id = 'a0000000-0000-0000-0000-000000000002'), 1,
  'admins read unpublished weeks');
select lives_ok(
  $$ insert into public.rubrics (program_id, program_week_id, title, criteria)
     select program_id, id, 'Week 1', '[{"id":"tips","label":"Useful tips","max_points":3}]'
     from public.program_weeks w where w.week_number = 1 and w.program_id = (select id from public.programs where slug = 'dmp') $$,
  'admins add a week rubric');
select throws_ok(
  $$ insert into public.rubrics (program_id, program_week_id, title, criteria)
     values ((select id from public.programs where slug = 'dmp'), 'b0000000-0000-0000-0000-000000000001', 'x',
             '[{"id":"a","label":"A","max_points":1}]') $$,
  '23503', null, 'a rubric''s week must belong to its programme');
select throws_ok(
  $$ insert into public.rubrics (program_id, title, criteria)
     values ('a0000000-0000-0000-0000-000000000002', 'Second default', '[{"id":"a","label":"A","max_points":1}]') $$,
  '23505', null, 'one default rubric per programme');
select throws_ok(
  $$ insert into public.rubrics (program_id, program_week_id, title, criteria) values
     ('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Bad',
      '[{"id":"a","label":"A","max_points":2},{"id":"a","label":"B","max_points":"lots"}]') $$,
  '23514', null, 'rubric criteria need unique ids and whole number points');
select throws_ok(
  $$ insert into public.program_weeks (program_id, week_number, specialization, theme, assignment)
     values ('a0000000-0000-0000-0000-000000000002', 2, 'seo', 'x', 'y') $$,
  '22023', null, 'a week specialization must be one of the programme''s');
select throws_ok(
  $$ insert into public.program_weeks (program_id, week_number, theme, assignment)
     values ('a0000000-0000-0000-0000-000000000002', 1, 'Again', 'y') $$,
  '23505', null, 'one shared row per week number');

select * from finish();
rollback;
