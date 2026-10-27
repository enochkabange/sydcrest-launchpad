-- Social layer: public profile stats (leaderboards), the admin report queue
-- and unpublishing. Only opted in profiles appear; no phone, email or role.
begin;
create extension if not exists pgtap with schema extensions;
select plan(24);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
       ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'abdul@example.test', '{"full_name":"Abdul-Rahman Issah"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());

update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set public_slug = 'wumpini', is_public = true, region = 'northern',
  phone = '+233241234567', datacamp_license_slot = 'seat-1'
  where id = '11111111-1111-1111-1111-111111111111';
update public.profiles set public_slug = 'abdul-rahman', is_public = true, region = 'upper_east'
  where id = '33333333-3333-3333-3333-333333333333';
-- Mariama stays private (the default) but has more progress than anyone.
update public.profiles set public_slug = 'mariama', region = 'northern', phone = '+233201112222'
  where id = '22222222-2222-2222-2222-222222222222';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'n1', 'One', 1),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'n2', 'Two', 2),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'n3', 'Three', 3),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', 'n4', 'Four', 4),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'n5', 'Five', 5);

-- Wumpini: done today, yesterday and two days ago (Accra), plus one a week
-- ago, so 4 nodes and a live 3 day streak. Two on the same day count once.
-- These are quiz verified completions (verified_at set); boards count only those.
insert into public.roadmap_progress (profile_id, node_id, status, completed_at, verified_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', now(), now()),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000002', 'done', now() - interval '1 day', now() - interval '1 day'),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000003', 'done', now() - interval '2 days', now() - interval '2 days'),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000004', 'done', now() - interval '7 days', now() - interval '7 days'),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000005', 'in_progress', null, null);
-- Abdul-Rahman: two nodes three and four days ago, so the streak has lapsed.
insert into public.roadmap_progress (profile_id, node_id, status, completed_at, verified_at) values
  ('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', now() - interval '3 days', now() - interval '3 days'),
  ('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-0000-0000-0000-000000000002', 'done', now() - interval '4 days', now() - interval '4 days');
-- Mariama (private): everything, today.
insert into public.roadmap_progress (profile_id, node_id, status, completed_at, verified_at)
select '22222222-2222-2222-2222-222222222222', id, 'done', now(), now() from public.roadmap_nodes;

insert into public.follows (follower_id, following_id) values
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111'),
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111'),
  ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333');

insert into public.reports (reporter_id, target_type, target_id, reason) values
  ('33333333-3333-3333-3333-333333333333', 'profile', '11111111-1111-1111-1111-111111111111', 'Spam links in headline');

-- The view never carries private columns
select is(
  (select array_agg(column_name::text order by column_name) from information_schema.columns
    where table_schema = 'public' and table_name = 'public_profile_stats'
      and column_name in ('phone', 'email', 'role', 'datacamp_license_slot', 'goals')),
  null,
  'public_profile_stats has no phone, email, role or licence slot column'
);

-- Signed out visitor
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select is((select count(*)::int from public.public_profile_stats), 2, 'anon sees only the two public profiles');
select is((select count(*)::int from public.public_profile_stats where public_slug = 'mariama'), 0,
  'a private profile is not on any board, however much progress it has');
select is((select nodes_completed from public.public_profile_stats where public_slug = 'wumpini'), 4,
  'nodes completed counts done nodes only');
select is((select current_streak from public.public_profile_stats where public_slug = 'wumpini'), 3,
  'streak counts consecutive Accra days up to today');
select is((select current_streak from public.public_profile_stats where public_slug = 'abdul-rahman'), 0,
  'a streak with no completion today or yesterday has lapsed');
select is((select followers_count from public.public_profile_stats where public_slug = 'wumpini'), 2,
  'follower counts are visible signed out');
select is((select following_count from public.public_profile_stats where public_slug = 'wumpini'), 1,
  'following counts are visible signed out');
select is((select has_datacamp_license from public.public_profile_stats where public_slug = 'wumpini'), true,
  'the licence shows only as a yes or no');
select is(
  (select array_agg(public_slug order by nodes_completed desc) from public.public_profile_stats),
  array['wumpini', 'abdul-rahman'],
  'the nodes board orders by real progress'
);
select is(
  (select array_agg(public_slug) from public.public_profile_stats where region = 'northern'),
  array['wumpini'],
  'the regional board lists public learners of that region only'
);
select throws_ok($$ select * from public.roadmap_progress $$, '42501', null,
  'anon still cannot read raw progress');
select throws_ok($$ select * from public.admin_reports() $$, '42501', null, 'anon cannot open the report queue');
select throws_ok($$ select public.admin_unpublish_profile('11111111-1111-1111-1111-111111111111') $$, '42501', null,
  'anon cannot unpublish profiles');
reset role;

-- A learner
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.public_profile_stats), 2, 'signed in users see the same public rows');
select throws_ok($$ select * from public.admin_reports() $$, '42501', 'Admins only', 'a learner cannot open the report queue');
select throws_ok($$ select public.admin_unpublish_profile('11111111-1111-1111-1111-111111111111') $$, '42501', 'Admins only',
  'a learner cannot unpublish someone');
reset role;

-- The admin
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.admin_reports()), 1, 'the admin sees the report');
select is((select target_name from public.admin_reports()), 'Wumpini Alhassan', 'the queue names the reported profile');
select is((select reporter_name from public.admin_reports()), 'Abdul-Rahman Issah', 'the queue names the reporter');
select is((select count(*)::int from public.admin_reports('dismissed')), 0, 'the queue filters by status');
select lives_ok($$ update public.reports set status = 'actioned' $$, 'the admin resolves the report');
select lives_ok($$ select public.admin_unpublish_profile('11111111-1111-1111-1111-111111111111') $$,
  'the admin takes the profile down');
reset role;

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select is((select count(*)::int from public.public_profile_stats where public_slug = 'wumpini'), 0,
  'an unpublished profile leaves the boards immediately');
reset role;

select * from finish();
rollback;
