-- Low bandwidth reports (issue #331): page speed, failed loads and lesson and
-- quiz drop off by connection class. Admins only; numbers checked on a small
-- seeded set of two tab sessions, one on 3G and one on 4G.
begin;
create extension if not exists pgtap with schema extensions;
select plan(11);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

-- Session s3 started on 3G (slow), s4 on 4G (fast); both on a phone.
insert into public.events (name, anonymous_id, session_id, props, route, created_at, device_class, source) values
  ('session_started', 'aid-s3', 'a0000000-0000-4000-8000-000000000003',
   '{"hour_band":"evening","weekday":"mon","returning":false,"connection":"3g","save_data":true}', '/', now() - interval '1 hour', 'mobile', 'client'),
  ('session_started', 'aid-s4', 'a0000000-0000-4000-8000-000000000004',
   '{"hour_band":"evening","weekday":"mon","returning":false,"connection":"4g"}', '/', now() - interval '1 hour', 'mobile', 'client'),
  -- Loads: three page views and a browser error on 3G; one page view, one render error and one failed form action on 4G.
  ('page_view', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{}', '/learn', now() - interval '50 minutes', 'mobile', 'client'),
  ('page_view', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{}', '/learn', now() - interval '49 minutes', 'mobile', 'client'),
  ('page_view', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{}', '/learn', now() - interval '48 minutes', 'mobile', 'client'),
  ('client_error', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{"kind":"error","error":"TypeError"}', '/learn', now() - interval '48 minutes', 'mobile', 'client'),
  ('page_view', 'aid-s4', 'a0000000-0000-4000-8000-000000000004', '{}', '/learn', now() - interval '50 minutes', 'mobile', 'client'),
  ('server_error', 'aid-s4', 'a0000000-0000-4000-8000-000000000004', '{"route_type":"render"}', '/learn', now() - interval '50 minutes', 'mobile', 'server'),
  ('server_error', 'aid-s4', 'a0000000-0000-4000-8000-000000000004', '{"route_type":"action"}', '/learn', now() - interval '50 minutes', 'mobile', 'server'),
  -- Lessons: two opened on 3G, one read to the end; one opened and read on 4G, then a passed quiz.
  ('lesson_opened', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{"roadmap":"data-analyst"}', '/learn/[slug]/[node]', now() - interval '40 minutes', 'mobile', 'server'),
  ('lesson_opened', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{"roadmap":"data-analyst"}', '/learn/[slug]/[node]', now() - interval '30 minutes', 'mobile', 'server'),
  ('lesson_left', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{"time_spent_ms":10000,"scroll_percent":30}', '/learn/[slug]/[node]', now() - interval '35 minutes', 'mobile', 'client'),
  ('lesson_left', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{"time_spent_ms":20000,"scroll_percent":95}', '/learn/[slug]/[node]', now() - interval '25 minutes', 'mobile', 'client'),
  ('lesson_opened', 'aid-s4', 'a0000000-0000-4000-8000-000000000004', '{"roadmap":"data-analyst"}', '/learn/[slug]/[node]', now() - interval '40 minutes', 'mobile', 'server'),
  ('lesson_left', 'aid-s4', 'a0000000-0000-4000-8000-000000000004', '{"time_spent_ms":60000,"scroll_percent":100}', '/learn/[slug]/[node]', now() - interval '35 minutes', 'mobile', 'client'),
  ('quiz_submitted', 'aid-s4', 'a0000000-0000-4000-8000-000000000004', '{"roadmap":"data-analyst","score":80,"passed":true}', '/learn/[slug]/[node]', now() - interval '34 minutes', 'mobile', 'server'),
  -- An INP sample each side of the lesson page.
  ('web_vital', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{"metric":"INP","value":600,"rating":"poor","connection":"3g"}', '/learn/[slug]/[node]', now() - interval '30 minutes', 'mobile', 'client'),
  ('web_vital', 'aid-s4', 'a0000000-0000-4000-8000-000000000004', '{"metric":"INP","value":100,"rating":"good","connection":"4g"}', '/learn/[slug]/[node]', now() - interval '30 minutes', 'mobile', 'client'),
  -- Too few samples on the home page to rank it, and one with no connection at all.
  ('web_vital', 'aid-s3', 'a0000000-0000-4000-8000-000000000003', '{"metric":"LCP","value":9000,"rating":"poor","connection":"3g"}', '/', now() - interval '30 minutes', 'mobile', 'client'),
  ('web_vital', 'aid-x', null, '{"metric":"LCP","value":2000,"rating":"good"}', '/', now() - interval '30 minutes', 'desktop', 'client');

-- Five LCP samples each side of the lesson page: 4 to 8 seconds on 3G, 1.0 to 1.4 seconds on 4G.
insert into public.events (name, anonymous_id, session_id, props, route, created_at, device_class, source)
select 'web_vital', 'aid-s3', 'a0000000-0000-4000-8000-000000000003',
       jsonb_build_object('metric', 'LCP', 'value', 3000 + 1000 * g, 'rating', 'poor', 'connection', '3g'),
       '/learn/[slug]/[node]', now() - interval '30 minutes', 'mobile', 'client'
  from generate_series(1, 5) g
union all
select 'web_vital', 'aid-s4', 'a0000000-0000-4000-8000-000000000004',
       jsonb_build_object('metric', 'LCP', 'value', 900 + 100 * g, 'rating', 'good', 'connection', '4g'),
       '/learn/[slug]/[node]', now() - interval '30 minutes', 'mobile', 'client'
  from generate_series(1, 5) g;

select ok(
  not has_function_privilege('authenticated', 'private.connection_class(text)', 'execute'),
  'the connection class helper is private');

-- A learner is refused ---------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select throws_ok(format('select * from public.%I(current_date - 7, current_date)', f), '42501', null, f || ' refuses a learner')
  from unnest(array[
    'admin_insights_vitals_connection', 'admin_insights_loads_connection',
    'admin_insights_slow_routes', 'admin_insights_learn_connection'
  ]) as f;
reset role;

-- An admin ---------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);

select results_eq(
  $$ select route, slow_samples, fast_samples, slow_lcp, fast_lcp, lcp_gap
       from public.admin_insights_slow_routes(current_date - 6, current_date) $$,
  $$ values ('/learn/[slug]/[node]'::text, 5, 5, 7000::double precision, 1300::double precision, 5700::double precision) $$,
  'slow routes: only the lesson page has five samples each side; its LCP p75 is 5.7 seconds slower on 3G');
select results_eq(
  $$ select slow_inp, fast_inp, inp_gap from public.admin_insights_slow_routes(current_date - 6, current_date) $$,
  $$ values (600::double precision, 100::double precision, 500::double precision) $$,
  'slow routes: the INP gap sits beside it');

select results_eq(
  $$ select connection, device_class, samples, p75
       from public.admin_insights_vitals_connection(current_date - 6, current_date)
      where metric = 'LCP' order by connection, device_class $$,
  $$ values ('3g'::text, 'mobile'::text, 6, 7750::double precision),
            ('4g', 'mobile', 5, 1300::double precision),
            ('unknown', 'desktop', 1, 2000::double precision) $$,
  'vitals by connection: a sample without a connection counts as not known');

select results_eq(
  $$ select connection, device_class, sessions, page_views, client_errors, server_errors
       from public.admin_insights_loads_connection(current_date - 6, current_date) order by connection $$,
  $$ values ('3g'::text, 'mobile'::text, 1, 3, 1, 0), ('4g', 'mobile', 1, 1, 0, 1) $$,
  'failed loads: errors follow their session''s connection; a failed form action is not a failed load');

select results_eq(
  $$ select connection, lessons_opened, lessons_left, read_to_end, median_time_ms, median_scroll, quizzes, quizzes_passed
       from public.admin_insights_learn_connection(current_date - 6, current_date) $$,
  $$ values ('fast'::text, 1, 1, 1, 60000::double precision, 100::double precision, 1, 1),
            ('slow', 2, 2, 1, 15000::double precision, 62.5::double precision, 0, 0) $$,
  'lessons and quizzes: drop off on 3G against 4G');

select is_empty(
  $$ select * from public.admin_insights_learn_connection(current_date - 6, current_date, p_device => 'desktop') $$,
  'the device filter applies');

select * from finish();
rollback;
