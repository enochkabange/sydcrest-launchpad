-- Computed learner attributes and the learner view (epic #320, step 4).
begin;
create extension if not exists pgtap with schema extensions;
select plan(20);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email, jsonb_build_object('full_name', name), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
    ('22222222-2222-2222-2222-222222222222', 'mariama@example.test', 'Mariama Seidu'),
    ('33333333-3333-3333-3333-333333333333', 'abdul@example.test', 'Abdul-Rahman Issah'),
    ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama'),
    ('55555555-5555-5555-5555-555555555555', 'hawa@example.test', 'Hawa Yakubu')) v(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set created_at = now() - interval '30 days' where id = '11111111-1111-1111-1111-111111111111';
update public.profiles set created_at = now() - interval '20 days' where id = '22222222-2222-2222-2222-222222222222';
update public.profiles set created_at = now() - interval '5 days' where id = '33333333-3333-3333-3333-333333333333';
update public.profiles set created_at = now() - interval '200 days' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set created_at = now() - interval '100 days' where id = '55555555-5555-5555-5555-555555555555';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 2, false);

-- Wumpini: passed Spreadsheets (80), started SQL; first topic two days after joining.
insert into public.roadmap_progress (profile_id, node_id, status, quiz_score, verified_at, created_at, completed_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', 80, now() - interval '10 days',
   now() - interval '28 days', now() - interval '10 days'),
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000002', 'in_progress', null, null,
   now() - interval '5 days', null),
  ('44444444-4444-4444-4444-444444444444', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', null, null,
   now() - interval '100 days', null),
  ('55555555-5555-5555-5555-555555555555', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', null, null,
   now() - interval '90 days', null);

-- Activity: Wumpini on two days this week (evenings, on a phone); Fuseini 15 days ago; Hawa 40 days ago.
insert into public.events (name, profile_id, props, device_class, created_at) values
  ('session_started', '11111111-1111-1111-1111-111111111111', '{"hour_band":"evening","weekday":"mon","returning":true}', 'mobile', now() - interval '1 day'),
  ('session_started', '11111111-1111-1111-1111-111111111111', '{"hour_band":"evening","weekday":"sat","returning":true}', 'mobile', now() - interval '3 days'),
  ('page_view', '11111111-1111-1111-1111-111111111111', '{}', 'desktop', now() - interval '3 days'),
  ('quiz_retried', '11111111-1111-1111-1111-111111111111', '{"passed":true,"passed_before":false}', 'mobile', now() - interval '1 day'),
  ('deadline_met', '11111111-1111-1111-1111-111111111111', '{"kind":"cohort_task","hours_early":5}', 'mobile', now() - interval '1 day'),
  ('deadline_met', '11111111-1111-1111-1111-111111111111', '{"kind":"cohort_task","hours_early":30}', 'mobile', now() - interval '1 day'),
  ('deadline_met', '11111111-1111-1111-1111-111111111111', '{"kind":"cohort_task","hours_early":1}', 'mobile', now() - interval '3 days'),
  ('deadline_missed', '11111111-1111-1111-1111-111111111111', '{"kind":"cohort_task","hours_late":4}', 'mobile', now() - interval '3 days'),
  ('page_view', '11111111-1111-1111-1111-111111111111', '{}', 'bot', now() - interval '2 days'),
  ('page_view', '44444444-4444-4444-4444-444444444444', '{}', 'desktop', now() - interval '15 days'),
  ('page_view', '55555555-5555-5555-5555-555555555555', '{}', 'desktop', now() - interval '40 days');

-- Events: Wumpini went to one, missed one, and is going to one next week.
insert into public.community_events (id, slug, kind, title, format, starts_at, ends_at, status) values
  ('e0000000-0000-0000-0000-000000000001', 'past-attended', 'webinar', 'Past, attended', 'online', now() - interval '8 days', now() - interval '8 days' + interval '1 hour', 'completed'),
  ('e0000000-0000-0000-0000-000000000002', 'past-missed', 'webinar', 'Past, missed', 'online', now() - interval '4 days', now() - interval '4 days' + interval '1 hour', 'completed'),
  ('e0000000-0000-0000-0000-000000000003', 'next-week', 'webinar', 'Next week', 'online', now() + interval '7 days', now() + interval '7 days' + interval '1 hour', 'published');
insert into public.event_rsvps (event_id, profile_id, status) values
  ('e0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'going'),
  ('e0000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'going'),
  ('e0000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'going');
insert into public.event_checkins (event_id, profile_id, method) values
  ('e0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'code');
insert into public.profile_first_touch (profile_id, utm_source, utm_medium, utm_campaign, referrer, landing_route, first_seen_at) values
  ('11111111-1111-1111-1111-111111111111', 'whatsapp', 'chapter', 'tamale', 'direct', '/chapters/[slug]', now() - interval '31 days');

-- Refresh ---------------------------------------------------------------------------

select is(private.refresh_learner_attributes(), 5, 'every member gets a row');
select results_eq(
  $$ select profile_id::text, stage from public.learner_attributes order by profile_id $$,
  $$ values ('11111111-1111-1111-1111-111111111111', 'active'),
            ('22222222-2222-2222-2222-222222222222', 'not_started'),
            ('33333333-3333-3333-3333-333333333333', 'new'),
            ('44444444-4444-4444-4444-444444444444', 'slipping'),
            ('55555555-5555-5555-5555-555555555555', 'dormant') $$,
  'stages: active, not started, new, slipping, dormant');
select results_eq(
  $$ select active_days_30, topics_started, topics_completed, quizzes_passed, avg_quiz_score, days_to_first_topic
       from public.learner_attributes where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values (2, 2, 1, 1, 80.0::numeric, 2) $$,
  'activity and learning (bot rows do not count as activity)');
select results_eq(
  $$ select usual_hour_band, usual_device, quiz_retries_90, deadlines_met, deadlines_missed, on_time_rate
       from public.learner_attributes where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('evening', 'mobile', 1, 3, 1, 0.750::numeric) $$,
  'study rhythm and punctuality');
select results_eq(
  $$ select events_going, events_attended, event_no_shows, first_touch_source, first_touch_campaign
       from public.learner_attributes where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values (3, 1, 1, 'whatsapp', 'tamale') $$,
  'turning up (an upcoming event is not a no show) and first touch');
select results_eq(
  $$ select on_time_rate, last_active_on is null, topics_started from public.learner_attributes where profile_id = '22222222-2222-2222-2222-222222222222' $$,
  $$ values (null::numeric, true, 0) $$,
  'a member with nothing yet has empty attributes, not zeros pretending to be rates');
select is(private.refresh_learner_attributes(), 5, 'a second refresh updates in place');
select ok(public.run_analytics_maintenance(1) ? 'learners', 'the daily maintenance recomputes attributes');
select ok(
  not has_function_privilege('authenticated', 'private.refresh_learner_attributes()', 'execute'),
  'members cannot run the refresh');

-- Access ----------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.learner_attributes), 1, 'a member reads only their own attributes');
select throws_ok($$ update public.learner_attributes set stage = 'active' $$, '42501', null, 'and cannot change them');
select throws_ok($$ select * from public.admin_learners() $$, '42501', null, 'a member cannot list learners');
select throws_ok($$ select * from public.admin_learner('22222222-2222-2222-2222-222222222222') $$, '42501', null, 'or open one');
select throws_ok($$ select * from public.admin_learner_progress('22222222-2222-2222-2222-222222222222') $$, '42501', null, 'or read their progress');
select is((select count(*)::int from public.profile_first_touch), 1, 'a member still reads only their own first touch');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.learner_attributes), 5, 'an admin reads every learner');
select results_eq(
  $$ select display_name from public.admin_learners('active') $$,
  $$ values ('Wumpini Alhassan') $$,
  'an admin lists learners by stage');
select results_eq(
  $$ select (select count(*)::int from public.admin_learners(null, 'wump')),
            (select count(*)::int from public.admin_learners(null, 'MARIAMA@example.test')),
            (select count(*)::int from public.admin_learners(null, '%')) $$,
  $$ values (1, 1, 5) $$,
  'search by part of a name or an exact email; typed wildcards are ignored');
select results_eq(
  $$ select roadmap_slug, completed, passed, total from public.admin_learner_progress('11111111-1111-1111-1111-111111111111') $$,
  $$ values ('data-analyst', 1, 1, 2) $$,
  'an admin reads progress per roadmap');
reset role;

set local role anon;
select throws_ok($$ select * from public.learner_attributes $$, '42501', null, 'visitors cannot read attributes');
reset role;

select * from finish();
rollback;
