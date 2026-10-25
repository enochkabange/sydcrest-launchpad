-- Analytics taxonomy and the admin funnel (issue #51).
begin;
create extension if not exists pgtap with schema extensions;
select plan(15);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 2, false);

-- Wumpini finished two nodes this week (one activation); Mariama finished
-- her first node three weeks ago (outside this week).
insert into public.roadmap_progress (profile_id, node_id, status, completed_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', now()),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000002', 'done', now()),
  ('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', now() - interval '21 days');

-- Signed out visitor: every taxonomy name is accepted
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select lives_ok($$ insert into public.events (name, anonymous_id) values ('page_view', 'visitor-a') $$, 'page_view is valid');
select lives_ok($$ insert into public.events (name, anonymous_id) values ('page_view', 'visitor-a') $$, 'a repeat page_view is fine');
select lives_ok($$ insert into public.events (name, anonymous_id) values ('page_view', 'visitor-b') $$, 'a second visitor');
select lives_ok($$ insert into public.events (name, anonymous_id, props) values ('signup', 'visitor-a', '{"method":"email"}') $$, 'signup is valid');
select lives_ok($$ insert into public.events (name, anonymous_id) values ('quiz_run', 'visitor-b') $$, 'quiz_run is valid');
select lives_ok($$ insert into public.events (name, anonymous_id) values ('path_viewed', 'visitor-b') $$, 'path_viewed is valid');
select throws_ok($$ select * from public.funnel_by_week() $$, '42501', null, 'anon cannot read the funnel');
reset role;

-- Wumpini, a learner
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok($$ insert into public.events (name, profile_id) values ('node_started', '11111111-1111-1111-1111-111111111111') $$, 'node_started is valid');
select lives_ok($$ insert into public.events (name, profile_id) values ('node_completed', '11111111-1111-1111-1111-111111111111') $$, 'node_completed is valid');
select lives_ok($$ insert into public.events (name, profile_id) values ('invite_sent', '11111111-1111-1111-1111-111111111111') $$, 'invite_sent is valid');
select throws_ok($$ select * from public.funnel_by_week() $$, '42501', null, 'a learner cannot read the funnel');
reset role;

-- Fuseini, an admin
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);

select is((select count(*)::int from public.funnel_by_week()), 12, 'twelve weeks by default, empty weeks included');
select is((select count(*)::int from public.funnel_by_week(4)), 4, 'the window is adjustable');
select results_eq(
  $$ select visits, signups, activations from public.funnel_by_week() order by week_start desc limit 1 $$,
  $$ values (2, 1, 1) $$,
  'this week: two distinct visitors, one sign up, one first completion');
select is(
  (select activations from public.funnel_by_week() where week_start = (date_trunc('week', (now() - interval '21 days') at time zone 'UTC'))::date),
  1, 'an activation lands in the week of the first completed node');
reset role;

select * from finish();
rollback;
