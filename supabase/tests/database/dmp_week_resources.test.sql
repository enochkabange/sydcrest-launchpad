-- Issue #239: up to three resources per programme week, and the refreshed
-- DMP week links and resources.
begin;
create extension if not exists pgtap with schema extensions;
select plan(16);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at) values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'mariama@example.test', '{"full_name":"Mariama Issah"}', now(), now()),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'abdul-rahman@example.test', '{"full_name":"Abdul-Rahman Sulemana"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.programs (id, slug, title, is_published) values
  ('a0000000-0000-0000-0000-000000000003', 'test-r', 'Unpublished programme', false);
insert into public.program_weeks (id, program_id, week_number, theme, assignment, resources) values
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 1, 'Hidden week', 'Hidden task',
   '[{"name":"Hidden guide","url":"https://example.com/hidden"}]');

-- Schema -----------------------------------------------------------------------------
select has_column('public', 'program_weeks', 'resources', 'program_weeks has a resources column');
select col_not_null('public', 'program_weeks', 'resources', 'resources is never null');
select col_default_is('public', 'program_weeks', 'resources', '[]'::jsonb, 'resources defaults to an empty list');

-- The DMP data -------------------------------------------------------------------------
select is(
  (select count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id
   where p.slug = 'dmp' and jsonb_array_length(w.resources) between 1 and 3), 18,
  'every DMP week has one to three resources');
select is(
  (select count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id
   where p.slug = 'dmp'
     and (w.resource_name, w.resource_url) is distinct from (w.resources -> 0 ->> 'name', w.resources -> 0 ->> 'url')), 0,
  'resource_name and resource_url mirror the first resource');
select is(
  (select count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id,
          jsonb_array_elements(w.resources) r
   where p.slug = 'dmp' and (r ->> 'url' like '%facebook.com/business/learn%' or r ->> 'url' like '%roadmap.sh%')), 0,
  'the generic Meta hub link is gone and nothing points at roadmap.sh');
select is(
  (select array_agg(n.node_slug order by n.position) from public.program_week_nodes n
   join public.program_weeks w on w.id = n.program_week_id join public.programs p on p.id = w.program_id
   where p.slug = 'dmp' and w.week_number = 2),
  array['typing', 'clear-english', 'money-records'],
  'week 2 links its SydCrest lessons in teaching order, without the old week 5 topic');
select is(
  (select count(*)::int from (
     select w.id from public.program_weeks w join public.programs p on p.id = w.program_id
     left join public.program_week_nodes n on n.program_week_id = w.id
     where p.slug = 'dmp' and w.specialization is null
     group by w.id having count(n.id) not between 2 and 5) x), 0,
  'every shared week links two to five lessons');

-- Visibility -----------------------------------------------------------------------------
set local role anon;
select is(
  (select count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id
   where p.slug = 'dmp' and jsonb_array_length(w.resources) > 0), 18,
  'anon reads the resources of a published programme');
select is(
  (select count(*)::int from public.program_weeks where id = 'b0000000-0000-0000-0000-000000000003'), 0,
  'anon cannot read the resources of an unpublished programme');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
update public.program_weeks set resources = '[]'::jsonb;
select is(
  (select count(*)::int from public.program_weeks w join public.programs p on p.id = w.program_id
   where p.slug = 'dmp' and w.resources = '[]'::jsonb), 0,
  'learners cannot change resources');

-- Admin writes and validation ----------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select lives_ok(
  $$ update public.program_weeks set resources =
       '[{"name":"A","url":"https://example.com/a"},{"name":"B","url":"https://example.com/b"},{"name":"C","url":"https://example.com/c"}]'
     where id = 'b0000000-0000-0000-0000-000000000003' $$,
  'admins set three resources');
select throws_ok(
  $$ update public.program_weeks set resources =
       '[{"name":"A","url":"https://example.com/a"},{"name":"B","url":"https://example.com/b"},{"name":"C","url":"https://example.com/c"},{"name":"D","url":"https://example.com/d"}]'
     where id = 'b0000000-0000-0000-0000-000000000003' $$,
  '23514', null, 'no more than three resources');
select throws_ok(
  $$ update public.program_weeks set resources = '[{"name":"A"}]' where id = 'b0000000-0000-0000-0000-000000000003' $$,
  '23514', null, 'every resource needs a url');
select throws_ok(
  $$ update public.program_weeks set resources = '[{"name":"A","url":"http://example.com/a"}]'
     where id = 'b0000000-0000-0000-0000-000000000003' $$,
  '23514', null, 'resource urls are https');
select throws_ok(
  $$ update public.program_weeks set resources = '{"name":"A","url":"https://example.com/a"}'
     where id = 'b0000000-0000-0000-0000-000000000003' $$,
  '23514', null, 'resources is a list');

select * from finish();
rollback;
