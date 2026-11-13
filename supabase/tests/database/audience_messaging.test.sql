-- Audience messaging and the chapter lead toolkit (epic #320, #334 and #335):
-- a chapter lead can only reach their own chapter, members cannot send or read
-- sends, WhatsApp audiences need live consent, the holdout gets nothing, opens
-- and returns are counted, and nobody is messaged twice in two days.
begin;
create extension if not exists pgtap with schema extensions;
select plan(35);

-- People: Fuseini leads the Tamale test chapter (Wumpini and Mariama are
-- members); Abdul-Rahman and ten more are in the Wa test chapter; Hawa is staff.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email, jsonb_build_object('full_name', name), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'fuseini.lead@example.test', 'Fuseini Mahama'),
    ('22222222-2222-2222-2222-222222222222', 'wumpini.m@example.test', 'Wumpini Alhassan'),
    ('33333333-3333-3333-3333-333333333333', 'mariama.m@example.test', 'Mariama Seidu'),
    ('44444444-4444-4444-4444-444444444444', 'abdul.m@example.test', 'Abdul-Rahman Issah'),
    ('55555555-5555-5555-5555-555555555555', 'hawa.staff@example.test', 'Hawa Yakubu')) v(id, email, name);
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select ('66666666-0000-0000-0000-0000000000' || lpad(i::text, 2, '0'))::uuid, '00000000-0000-0000-0000-000000000000',
       'authenticated', 'authenticated', 'wa' || i || '@example.test', jsonb_build_object('full_name', 'Wa member ' || i), now(), now()
  from generate_series(1, 10) i;
update public.profiles set role = 'admin' where id = '55555555-5555-5555-5555-555555555555';

insert into public.chapters (id, slug, name, region, city, status) values
  ('c0000000-0000-0000-0000-000000000001', 'tamale-msg-test', 'Tamale test chapter', 'northern', 'Tamale', 'active'),
  ('c0000000-0000-0000-0000-000000000002', 'wa-msg-test', 'Wa test chapter', 'upper_west', 'Wa', 'active');
insert into public.chapter_members (chapter_id, profile_id, role) values
  ('c0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'lead'),
  ('c0000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'member'),
  ('c0000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'member'),
  ('c0000000-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444', 'member');
insert into public.chapter_members (chapter_id, profile_id, role)
select 'c0000000-0000-0000-0000-000000000002', ('66666666-0000-0000-0000-0000000000' || lpad(i::text, 2, '0'))::uuid, 'member'
  from generate_series(1, 10) i;

-- Wumpini is slipping; Mariama first came from the chapter's WhatsApp link.
insert into public.learner_attributes (profile_id, joined_on, last_active_on, stage) values
  ('22222222-2222-2222-2222-222222222222', current_date - 60, current_date - 15, 'slipping');
insert into public.profile_first_touch (profile_id, utm_source, utm_medium, utm_campaign, first_seen_at) values
  ('33333333-3333-3333-3333-333333333333', 'whatsapp', 'chapter', 'tamale-msg-test', now() - interval '3 days');

-- Mariama turns on WhatsApp updates for her number.
update public.profiles set phone = '+233241110001' where id = '33333333-3333-3333-3333-333333333333';
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
insert into public.consents (kind, version) values ('whatsapp', '2026-10-28');
reset role;

-- Shape -----------------------------------------------------------------------------------

select ok((select relrowsecurity from pg_class where oid = 'public.message_sends'::regclass), 'message_sends has RLS');
select ok((select relrowsecurity from pg_class where oid = 'public.message_recipients'::regclass), 'message_recipients has RLS');
select ok(private.is_event_name('message_sent') and private.is_event_name('campaign_link_copied'), 'the new event names are accepted');
select ok(not has_function_privilege('anon', 'public.send_message(jsonb, text, text, text, text, text, integer, uuid)', 'execute'),
  'visitors cannot send');

-- A chapter lead ------------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select is(public.message_audience_size('{}', 'in_app', 'c0000000-0000-0000-0000-000000000001'), 2,
  'a lead''s audience is their chapter''s members, without themselves');
select is(public.message_audience_size('{"chapter_id":"c0000000-0000-0000-0000-000000000002"}', 'in_app', 'c0000000-0000-0000-0000-000000000001'), 2,
  'a lead cannot widen to another chapter through the filters');
select throws_ok($$ select public.message_audience_size('{}', 'in_app', 'c0000000-0000-0000-0000-000000000002') $$,
  '42501', null, 'a lead cannot target another chapter');
select throws_ok($$ select public.message_audience_size('{}', 'in_app') $$,
  '42501', null, 'a lead cannot make a staff (everyone) send');
select is(public.message_audience_size('{"stages":["slipping"],"inactive_days":14}', 'in_app', 'c0000000-0000-0000-0000-000000000001'), 1,
  'stage and inactivity filters narrow the audience');
select is(public.message_audience_size('{"inactive_days":30}', 'in_app', 'c0000000-0000-0000-0000-000000000001'), 0,
  'members who joined recently are not inactive for 30 days');
select is(public.message_audience_size('{"campaign":"tamale-msg-test"}', 'in_app', 'c0000000-0000-0000-0000-000000000001'), 1,
  'the first touch campaign filter works');
select is(public.message_audience_size('{}', 'whatsapp', 'c0000000-0000-0000-0000-000000000001'), 1,
  'WhatsApp reaches only members with live consent for their number');
select throws_ok($$ select * from public.send_message('{}', 'in_app', 'custom', 'Hello', null, 'https://evil.test', 0, 'c0000000-0000-0000-0000-000000000001') $$,
  '22023', null, 'links must stay on the site');

select results_eq(
  $$ select audience, held_out, sent from public.send_message('{}', 'in_app', 'come_back', 'Your roadmap is waiting',
       'Pick up where you left off.', '/dashboard', 0, 'c0000000-0000-0000-0000-000000000001') $$,
  $$ values (2, 0, 2) $$,
  'a lead sends an in app message to their chapter');
select throws_ok($$ insert into public.message_sends (channel, template, title) values ('in_app', 'custom', 'Sneaky') $$,
  '42501', null, 'nobody writes sends directly');
select is((select count(*)::int from public.message_sends), 1, 'a lead reads their chapter''s sends');
select set_config('test.message_id', (select id::text from public.message_sends limit 1), true);
select is((select count(*)::int from public.message_recipients), 0, 'a lead never sees who was in the audience');
select throws_ok(
  $$ select * from public.send_message('{}', 'in_app', 'custom', 'Again', null, null, 0, 'c0000000-0000-0000-0000-000000000001') $$,
  'P0002', null, 'nobody is messaged twice in two days');

select is((public.chapter_dashboard('c0000000-0000-0000-0000-000000000001') ->> 'members')::int, 3, 'a lead reads their chapter dashboard');
select is((public.chapter_dashboard('c0000000-0000-0000-0000-000000000001') ->> 'from_chapter_links')::int, 1,
  'the dashboard counts members who came through the chapter link');
select throws_ok($$ select public.chapter_dashboard('c0000000-0000-0000-0000-000000000002') $$,
  '42501', null, 'but not another chapter''s');

-- A member --------------------------------------------------------------------------------

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.notifications where payload ? 'message_id'), 1, 'the member got the message in the app');
select is((select count(*)::int from public.message_sends), 0, 'members cannot read sends');
select throws_ok($$ select * from public.send_message('{}', 'in_app', 'custom', 'Hi', null, null, 0, 'c0000000-0000-0000-0000-000000000001') $$,
  '42501', null, 'members cannot send');
select throws_ok($$ select * from public.message_results(current_setting('test.message_id')::uuid) $$,
  '42501', null, 'members cannot see results');
select throws_ok($$ select public.chapter_dashboard('c0000000-0000-0000-0000-000000000001') $$,
  '42501', null, 'members cannot read the chapter dashboard');
select is(public.mark_notifications_read(array(select id from public.notifications where payload ? 'message_id')), 1,
  'the member opens the message');
reset role;

-- Wumpini comes back the next day.
insert into public.events (name, profile_id, props, device_class, created_at)
values ('page_view', '22222222-2222-2222-2222-222222222222', '{}', 'mobile', now() + interval '1 day');

-- Staff -------------------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);

select results_eq(
  $$ select held_out, people, delivered, opened, came_back
       from public.message_results((select id from public.message_sends where chapter_id = 'c0000000-0000-0000-0000-000000000001')) $$,
  $$ values (false, 2, 2, 1, 1), (true, 0, 0, 0, 0) $$,
  'results count delivered, opened and came back');
select is(public.message_audience_size('{"chapter_id":"c0000000-0000-0000-0000-000000000002"}', 'in_app'), 11,
  'staff can target any chapter');
select results_eq(
  $$ select audience, held_out, sent from public.send_message('{"chapter_id":"c0000000-0000-0000-0000-000000000002"}', 'in_app',
       'event', 'Join us at our next meetup', null, '/events', 50) $$,
  $$ values (11, 6, 5) $$,
  'a 50 percent holdout holds out round(n / 2) at random');
select is((select count(*)::int from public.message_recipients r join public.message_sends s on s.id = r.message_id
            where s.chapter_id is null and r.held_out and r.notification_id is null and r.status = 'held_out'), 6,
  'the holdout gets no notification');
select is((select count(*)::int from public.notifications n where n.payload ? 'message_id'
            and n.recipient_id in (select profile_id from public.chapter_members where chapter_id = 'c0000000-0000-0000-0000-000000000002')), 0,
  'staff cannot read members'' notifications');
reset role;
select is((select count(*)::int from public.notifications n
            join public.message_recipients r on r.notification_id = n.id
            join public.message_sends s on s.id = r.message_id
           where s.chapter_id is null), 5, 'everyone else in the audience got one');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select holdout_share from public.message_sends where chapter_id is null), 50, 'the share is recorded');
select results_eq(
  $$ select audience, held_out from public.send_message('{"chapter_id":"c0000000-0000-0000-0000-000000000002"}', 'in_app',
       'custom', 'One more thing', null, null, 100) $$,
  $$ values (6, 3) $$,
  'held out members stay reachable, those sent wait 2 days, and a share over 50 is capped at 50');
reset role;

select * from finish();
rollback;
