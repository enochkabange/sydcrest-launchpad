-- Attribution (epic #320): a browser's first touch, the first touch kept
-- with the account, and the acquisition reports.
begin;
create extension if not exists pgtap with schema extensions;
select plan(19);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now());
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
-- Wumpini signed up two days ago.
update public.profiles set created_at = now() - interval '2 days' where id = '11111111-1111-1111-1111-111111111111';

-- Wumpini's browser: a typed visit three days ago, then the Tamale chapter's
-- WhatsApp link an hour before signing up, and a second SydCrest tab.
-- Another browser came from a search engine; a third signed up with no visit.
insert into public.events (name, profile_id, anonymous_id, props, route, created_at) values
  ('visit_started', null, 'aid-w', '{"referrer":"direct","deep_link":false}', '/', now() - interval '3 days'),
  ('visit_started', null, 'aid-w',
   '{"utm_source":"whatsapp","utm_medium":"chapter","utm_campaign":"tamale","referrer":"direct","deep_link":true}',
   '/chapters/[slug]', now() - interval '2 days 1 hour'),
  ('visit_started', null, 'aid-w', '{"referrer":"internal","deep_link":true}', '/learn', now() - interval '2 days 30 minutes'),
  ('signup', null, 'aid-w', '{"method":"email"}', '/signup', now() - interval '2 days'),
  ('lesson_opened', '11111111-1111-1111-1111-111111111111', 'aid-w', '{}', '/learn/[slug]/[node]', now() - interval '1 day'),
  ('visit_started', null, 'aid-x', '{"referrer":"search","deep_link":false}', '/', now() - interval '1 hour'),
  ('signup', null, 'aid-y', '{"method":"google"}', null, now() - interval '1 minute');

-- Names and helpers -----------------------------------------------------------------

select ok(private.is_event_name('visit_started'), 'visit_started is an accepted event');
select results_eq(
  $$ select private.visit_source(p), private.visit_medium(p) from (values
       ('{"utm_source":"whatsapp","utm_medium":"chapter","referrer":"direct"}'::jsonb),
       ('{"referrer":"search"}'::jsonb),
       ('{"referrer":"facebook"}'::jsonb),
       ('{}'::jsonb)) v(p) $$,
  $$ values ('whatsapp', 'chapter'), ('search', 'search'), ('facebook', 'referral'), ('direct', 'none') $$,
  'source and medium come from the tags, else the kind of site');
select results_eq(
  $$ select props ->> 'utm_campaign', route from private.first_visit('aid-w', now() - interval '2 days') $$,
  $$ values ('tamale', '/chapters/[slug]') $$,
  'the first touch is the earliest visit with tags or from another site, not an earlier typed one');
select is_empty($$ select * from private.first_visit('aid-y', now()) $$, 'a browser with no visits has no first touch');
select is_empty($$ select * from private.first_visit('aid-w', now() + interval '40 days') $$, 'visits older than 30 days are not a touch');
select ok(
  not has_function_privilege('authenticated', 'private.first_visit(text, timestamptz)', 'execute')
  and not has_function_privilege('authenticated', 'private.link_first_touch()', 'execute')
  and has_function_privilege('service_role', 'private.link_first_touch()', 'execute'),
  'only the maintenance links first touches');

-- First touch on the account --------------------------------------------------------

select is(private.link_first_touch(), 1, 'one account is linked: the one whose browser recorded visits');
select results_eq(
  $$ select utm_source, utm_medium, utm_campaign, referrer, landing_route, first_seen_at = now() - interval '2 days 1 hour'
       from public.profile_first_touch where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('whatsapp', 'chapter', 'tamale', 'direct', '/chapters/[slug]', true) $$,
  'the account keeps its first touch');
select is(private.link_first_touch(), 0, 'an account is linked once');
select ok(public.run_analytics_maintenance(1) ? 'linked', 'the daily maintenance links first touches');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.profile_first_touch), 1, 'a member reads their own first touch');
select throws_ok(
  $$ update public.profile_first_touch set utm_source = 'x' $$,
  '42501', null, 'a member cannot change it');
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.profile_first_touch), 0, 'nor read anyone else''s');
select throws_ok($$ select * from public.admin_insights_acquisition(current_date - 6, current_date) $$, '42501', null,
  'a learner cannot read the acquisition report');
select throws_ok($$ select * from public.admin_insights_landing(current_date - 6, current_date) $$, '42501', null,
  'a learner cannot read the landing report');
reset role;

set local role anon;
select throws_ok($$ select * from public.profile_first_touch $$, '42501', null, 'visitors cannot read first touches');
reset role;

-- Reports ---------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select results_eq(
  $$ select source, medium, campaign, visits, visitors, signups
       from public.admin_insights_acquisition(current_date - 6, current_date) order by source $$,
  $$ values ('direct', 'none', null::text, 1, 1, 0),
            ('search', 'search', null::text, 1, 1, 0),
            ('unknown', 'unknown', null::text, 0, 0, 1),
            ('whatsapp', 'chapter', 'tamale', 1, 1, 1) $$,
  'visits and sign ups by source; other SydCrest tabs are not visits');
select results_eq(
  $$ select route, visits, visitors, signups from public.admin_insights_landing(current_date - 6, current_date) order by route $$,
  $$ values ('/', 2, 2, 0), ('/chapters/[slug]', 1, 1, 1), ('unknown', 0, 0, 1) $$,
  'landing pages, with sign ups under the first touch''s page');
select is_empty(
  $$ select * from public.admin_insights_acquisition(current_date - 6, current_date, p_device => 'desktop') $$,
  'filters apply');
reset role;

select * from finish();
rollback;
