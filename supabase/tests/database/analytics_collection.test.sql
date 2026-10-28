-- Analytics collection (issue #242): the record function, attributes derived
-- server side, who can read events and rollups, the rollups and retention.
begin;
create extension if not exists pgtap with schema extensions;
select plan(35);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set region = 'northern' where id = '11111111-1111-1111-1111-111111111111';

insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 2, false);
insert into public.personalized_paths (profile_id, quiz_answers, recommended_roadmap_id) values
  ('11111111-1111-1111-1111-111111111111', '{}', 'aaaaaaaa-0000-0000-0000-000000000001');
insert into public.programs (id, slug, title, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Test programme', true);
insert into public.cohorts (id, program_id, name, starts_on) values
  ('c0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000001', 'Cohort A', '2027-01-11');
insert into public.cohort_members (cohort_id, profile_id, role) values
  ('c0000000-0000-0000-0000-00000000000a', '11111111-1111-1111-1111-111111111111', 'learner');
insert into public.chapters (id, slug, name, region, city, status) values
  ('c1000000-0000-0000-0000-000000000001', 'tamale', 'Tamale', 'northern', 'Tamale', 'active');
insert into public.chapter_members (chapter_id, profile_id, role) values
  ('c1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'member');

-- Wumpini opened SQL yesterday and finished Spreadsheets after its quiz.
insert into public.roadmap_progress (profile_id, node_id, status, quiz_score, created_at, completed_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', 80,
   now() - interval '2 hours', now() - interval '1 hour');

-- Shape -----------------------------------------------------------------------------

select has_function('public', 'record_events', array['jsonb', 'jsonb'], 'record_events exists');
select is(
  (select prosecdef from pg_proc where oid = 'public.record_events(jsonb, jsonb)'::regprocedure),
  false, 'the public entry point is security invoker');
select ok(
  not has_column_privilege('authenticated', 'public.events', 'primary_role', 'insert')
  and not has_column_privilege('authenticated', 'public.events', 'cohort_id', 'insert')
  and not has_column_privilege('anon', 'public.events', 'roles', 'insert'),
  'nobody can write attribute columns directly');
select ok(
  not has_function_privilege('authenticated', 'public.run_analytics_maintenance(integer)', 'execute')
  and not has_function_privilege('anon', 'public.run_analytics_maintenance(integer)', 'execute')
  and has_function_privilege('service_role', 'public.run_analytics_maintenance(integer)', 'execute'),
  'only the service role runs maintenance');
select ok(
  not has_function_privilege('authenticated', 'private.purge_old_events(integer, integer)', 'execute')
  and not has_function_privilege('authenticated', 'private.refresh_analytics_rollups(date, date)', 'execute'),
  'users cannot purge or rebuild');
select ok(private.is_event_name('booking_requested') and private.is_event_name('page_view')
          and not private.is_event_name('made_up'), 'the name list');

-- Signed out visitor ---------------------------------------------------------------

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select is(
  public.record_events(
    '[{"name":"page_view","route":"/roadmaps/[slug]"},{"name":"made_up"},{"name":"form_started","props":{"form":"sign_up","nested":{"a":1},"Bad Key":"x"}}]',
    '{"anonymous_id":"0d4c3c9e-6d0c-4f6c-9a39-7c0d1e2f3a4b","session_id":"5b2b1f0a-1111-4222-8333-944455556666","device_class":"mobile","source":"client","route":"/signup"}'),
  2, 'a visitor batch records the valid events and skips unknown names');
select throws_ok(
  $$ select public.record_events((select jsonb_agg(jsonb_build_object('name', 'page_view')) from generate_series(1, 26)), '{}') $$,
  '22023', null, 'batches are capped at 25');
select throws_ok($$ select public.record_events('{"name":"page_view"}', '{}') $$, '22023', null, 'events must be an array');
select throws_ok($$ select count(*) from public.events $$, '42501', null, 'visitors cannot read events');
select throws_ok($$ select * from public.events_daily $$, '42501', null, 'visitors cannot read rollups');
reset role;

select results_eq(
  $$ select source, device_class, route, signed_in, primary_role, profile_id is null, roles
       from public.events where anonymous_id = '0d4c3c9e-6d0c-4f6c-9a39-7c0d1e2f3a4b' order by name desc $$,
  $$ values ('client', 'mobile', '/roadmaps/[slug]', false, 'visitor', true, '{}'::text[]),
            ('client', 'mobile', '/signup', false, 'visitor', true, '{}'::text[]) $$,
  'visitor rows carry the context and no person');
select is(
  (select props from public.events where name = 'form_started' and anonymous_id = '0d4c3c9e-6d0c-4f6c-9a39-7c0d1e2f3a4b'),
  '{"form":"sign_up"}'::jsonb, 'nested values and odd keys are dropped');

-- Wumpini, a learner in a cohort and a chapter --------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select is(
  public.record_events(
    '[{"name":"lesson_opened","props":{"roadmap":"data-analyst","node_id":"bbbbbbbb-0000-0000-0000-000000000002"}},
      {"name":"lesson_opened","props":{"roadmap":"data-analyst","node_id":"bbbbbbbb-0000-0000-0000-000000000001"}},
      {"name":"action_failed","props":{"action":"booking_requested","refusal":"rate_limited","code":"54000"}},
      {"name":"web_vital","props":{"metric":"LCP","value":2100,"rating":"good"},"route":"/dashboard"},
      {"name":"web_vital","props":{"metric":"LCP","value":4300,"rating":"poor"},"route":"/dashboard"}]',
    '{"device_class":"desktop","route":"/learn/[slug]/[node]","profile_id":"44444444-4444-4444-4444-444444444444","primary_role":"admin"}'),
  5, 'a learner records a batch');
select is((select count(*)::int from public.events), 0, 'learners cannot read events, not even their own');
select is((select count(*)::int from public.errors_daily) + (select count(*)::int from public.events_daily), 0, 'learners cannot read rollups');
select throws_ok(
  $$ insert into public.events (name, profile_id, primary_role) values ('page_view', '11111111-1111-1111-1111-111111111111', 'admin') $$,
  '42501', null, 'learners cannot forge attributes by inserting directly');
select throws_ok(
  $$ insert into public.events (name, profile_id) values ('page_view', '22222222-2222-2222-2222-222222222222') $$,
  '42501', null, 'direct inserts stay limited to the caller''s own id');
reset role;

select results_eq(
  $$ select distinct profile_id, signed_in, primary_role, track, region, cohort_id, chapter_id, device_class
       from public.events where name = 'lesson_opened' $$,
  $$ values ('11111111-1111-1111-1111-111111111111'::uuid, true, 'cohort', 'data-analyst', 'northern',
             'c0000000-0000-0000-0000-00000000000a'::uuid, 'c1000000-0000-0000-0000-000000000001'::uuid, 'desktop') $$,
  'attributes come from the tables, not from what the caller claims');
select ok(
  (select roles @> array['learner', 'cohort'] and not roles @> array['admin']
     from public.events where name = 'action_failed' limit 1),
  'roles are derived');
select is(
  (select route from public.events where name = 'web_vital' limit 1), '/dashboard',
  'an event can carry its own route');

-- Mariama, a signed in learner with nothing else
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is(public.record_events('[{"name":"sign_out"}]', '{"device_class":"phone-ish"}'), 1, 'a bare learner records');
reset role;
select results_eq(
  $$ select primary_role, roles, device_class, track from public.events where name = 'sign_out' $$,
  $$ values ('learner', array['learner'], 'unknown', null::text) $$,
  'a bare learner is a learner; unknown device classes become unknown');

-- Rollups and retention --------------------------------------------------------------

-- An old event past retention, written by the service role.
insert into public.events (name, anonymous_id, created_at)
values ('page_view', 'old-visitor', now() - interval '14 months'),
       ('page_view', 'recent-visitor', now() - interval '12 months');

set local role service_role;
select lives_ok($$ select public.run_analytics_maintenance(2) $$, 'the service role runs maintenance');
reset role;

select is((select count(*)::int from public.events where anonymous_id = 'old-visitor'), 0, 'events older than 13 months are purged');
select is((select count(*)::int from public.events where anonymous_id = 'recent-visitor'), 1, 'events inside 13 months stay');
select is(
  (select sum(events)::int from public.events_daily where name = 'lesson_opened' and primary_role = 'cohort' and track = 'data-analyst'),
  2, 'events_daily counts by attribute');
select results_eq(
  $$ select samples, p50, good, poor from public.web_vitals_daily where metric = 'LCP' and route = '/dashboard' $$,
  $$ values (2, 3200::double precision, 1, 1) $$,
  'web_vitals_daily keeps percentiles and ratings');
select results_eq(
  $$ select subject, refusal, code, occurrences from public.errors_daily where name = 'action_failed' $$,
  $$ values ('booking_requested', 'rate_limited', '54000', 1) $$,
  'errors_daily groups refusals');
select results_eq(
  $$ select metric, samples, round(p50_seconds)::int from public.durations_daily where metric like 'topic%' $$,
  $$ values ('topic_start_to_pass', 1, 3600) $$,
  'durations come from domain timestamps');
select results_eq(
  $$ select kind, subject, started, finished from public.abandonment_daily order by kind, subject $$,
  $$ values ('form', 'sign_up', 1, 0), ('lesson', 'data-analyst', 2, 1) $$,
  'abandonment: a form started and not sent, two lessons opened and one finished');

-- Running it again gives the same rows.
set local role service_role;
select lives_ok($$ select public.run_analytics_maintenance(2) $$, 'maintenance runs again');
reset role;
select is((select sum(events)::int from public.events_daily where name = 'lesson_opened'), 2, 'refreshing is idempotent');

-- Fuseini, an admin, reads the rollups
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select ok((select count(*) from public.events_daily) > 0, 'admins read events_daily');
select ok((select count(*) from public.events) > 0, 'admins read raw events');
reset role;

select * from finish();
rollback;
