-- Schema B (issue #158): chapters, the scoped community feed, moderation and
-- reports. Scoped posts are members only; leads moderate their chapter,
-- cohort staff their cohort, admins everything.
begin;
create extension if not exists pgtap with schema extensions;
select plan(64);

-- People: Wumpini joins Tamale; Abdul-Rahman is in Bolgatanga; Mariama leads
-- Tamale; Fuseini is an admin; Sumaila is a cohort learner and Ayishetu its
-- mentor; Adisa joins Tamale later.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama'),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu'),
  ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari'),
  ('77777777-7777-7777-7777-777777777777', 'adisa@example.test', 'Adisa Iddrisu')
) as u(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set public_slug = 'mariama', is_public = true where id = '33333333-3333-3333-3333-333333333333';

insert into public.chapters (id, slug, name, region, city, status, whatsapp_url) values
  ('c1000000-0000-0000-0000-000000000001', 'tamale', 'Tamale', 'northern', 'Tamale', 'active', 'https://chat.whatsapp.com/TamaleInvite1'),
  ('c1000000-0000-0000-0000-000000000002', 'bolgatanga', 'Bolgatanga', 'upper_east', 'Bolgatanga', 'launching', null),
  ('c1000000-0000-0000-0000-000000000003', 'wa', 'Wa', 'upper_west', 'Wa', 'draft', null);
insert into public.chapter_members (chapter_id, profile_id, role) values
  ('c1000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'lead'),
  ('c1000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'member');

insert into public.programs (id, slug, title, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Test programme', true);
insert into public.cohorts (id, program_id, name, starts_on) values
  ('c0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000001', 'Cohort A', '2027-01-11');
insert into public.cohort_members (cohort_id, profile_id, role) values
  ('c0000000-0000-0000-0000-00000000000a', '55555555-5555-5555-5555-555555555555', 'learner'),
  ('c0000000-0000-0000-0000-00000000000a', '66666666-6666-6666-6666-666666666666', 'mentor');

select throws_ok(
  $$ insert into public.community_posts (author_id, scope, body) values ('11111111-1111-1111-1111-111111111111', 'chapter', 'No chapter') $$,
  '23514', null, 'a chapter post needs its chapter');
select throws_ok(
  $$ insert into public.chapters (slug, name, region, city, whatsapp_url) values ('x', 'X', 'northern', 'X', 'https://evil.example/x') $$,
  '23514', null, 'the WhatsApp link must be a WhatsApp invite');

-- Signed out ------------------------------------------------------------------
set local role anon;
select results_eq(
  $$ select slug from public.chapters order by slug $$,
  $$ values ('bolgatanga'), ('tamale') $$, 'anon reads chapters except drafts');
select results_eq(
  $$ select whatsapp_url from public.chapters where slug = 'tamale' $$,
  $$ values ('https://chat.whatsapp.com/TamaleInvite1') $$, 'the chapter WhatsApp link is public');
select results_eq(
  $$ select display_name, role, public_slug from public.chapter_roster $$,
  $$ values ('Mariama Seidu', 'lead', 'mariama') $$, 'anon sees chapter leads only');
select throws_ok($$ select * from public.chapter_members $$, '42501', null, 'anon cannot read memberships');
select throws_ok($$ select * from public.community_posts $$, '42501', null, 'anon cannot read posts');
select throws_ok($$ select * from public.cohort_channels $$, '42501', null, 'anon cannot read cohort channels');
select throws_ok($$ select * from public.community_feed('everyone') $$, '42501', null, 'anon cannot read the feed');

-- Wumpini joins Tamale and posts ----------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select throws_ok(
  $$ insert into public.chapter_members (chapter_id, profile_id) values ('c1000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'nobody joins a draft chapter');
select throws_ok(
  $$ insert into public.chapter_members (chapter_id, profile_id, role) values ('c1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'lead') $$,
  '42501', null, 'a learner cannot join as a lead');
select throws_ok(
  $$ insert into public.chapter_members (chapter_id, profile_id) values ('c1000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222') $$,
  '42501', null, 'a learner cannot add someone else');
select lives_ok(
  $$ insert into public.chapter_members (chapter_id) values ('c1000000-0000-0000-0000-000000000001') $$,
  'a learner joins an active chapter');
update public.chapter_members set role = 'lead' where profile_id = '11111111-1111-1111-1111-111111111111';
select is((select role from public.chapter_members where profile_id = '11111111-1111-1111-1111-111111111111'),
  'member', 'a member cannot promote themself');
select is((select count(*)::int from public.chapter_roster where chapter_id = 'c1000000-0000-0000-0000-000000000001'),
  2, 'members see their chapter''s full roster');
select is((select count(*)::int from public.chapter_roster where chapter_id = 'c1000000-0000-0000-0000-000000000002'),
  0, 'but not another chapter''s members');
select throws_ok(
  $$ select public.set_chapter_details('c1000000-0000-0000-0000-000000000001', 'Hijack', null) $$,
  '42501', null, 'members cannot edit the chapter page');

select lives_ok(
  $$ insert into public.community_posts (scope, chapter_id, body)
     values ('chapter', 'c1000000-0000-0000-0000-000000000001', 'Who is going to the Skillshop?') $$,
  'a member posts in their chapter');
select set_config('t.p1', (select id::text from public.community_posts where body like 'Who is going%'), true);
select lives_ok(
  $$ insert into public.community_posts (scope, body)
     values ('everyone', 'I finished my first roadmap topic') $$,
  'a member posts to everyone');
select set_config('t.p2', (select id::text from public.community_posts where body like 'I finished%'), true);
select throws_ok(
  $$ insert into public.community_posts (scope, chapter_id, body) values ('chapter', 'c1000000-0000-0000-0000-000000000002', 'Hello Bolga') $$,
  '42501', null, 'nobody posts in a chapter they are not in');
select throws_ok(
  $$ insert into public.community_posts (scope, cohort_id, body) values ('cohort', 'c0000000-0000-0000-0000-00000000000a', 'Hello cohort') $$,
  '42501', null, 'nobody posts in a cohort they are not in');
select throws_ok(
  $$ insert into public.community_posts (author_id, scope, body) values ('22222222-2222-2222-2222-222222222222', 'everyone', 'Forged') $$,
  '42501', null, 'nobody posts as someone else');
select throws_ok(
  $$ update public.community_posts set hidden_at = null, pinned_at = now() $$,
  '42501', null, 'authors cannot pin or unhide through the table');
select lives_ok(
  $$ update public.community_posts set body = 'Who is going to the Tamale Skillshop?' where id = current_setting('t.p1')::uuid $$,
  'authors edit their post');
select isnt((select edited_at from public.community_posts where id = current_setting('t.p1')::uuid),
  null, 'an edit is stamped');

-- Abdul-Rahman (Bolgatanga) ------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);

select is((select count(*)::int from public.community_posts where chapter_id = 'c1000000-0000-0000-0000-000000000001'),
  0, 'a member of another chapter cannot read its posts');
select throws_ok(
  $$ select * from public.community_feed('chapter', 'c1000000-0000-0000-0000-000000000001') $$,
  '42501', null, 'nor read its feed');
select throws_ok(
  $$ insert into public.community_replies (post_id, body) values (current_setting('t.p1')::uuid, 'Me') $$,
  '42501', null, 'nor reply to its posts');
select throws_ok(
  $$ insert into public.community_reactions (post_id, kind) values (current_setting('t.p1')::uuid, 'like') $$,
  '42501', null, 'nor react to them');
select throws_ok(
  $$ select * from public.community_thread(current_setting('t.p1')::uuid) $$,
  'P0002', null, 'nor open the thread');
select results_eq(
  $$ select author_name, body from public.community_feed('everyone') $$,
  $$ values ('Wumpini Alhassan', 'I finished my first roadmap topic') $$,
  'everyone''s feed carries the author name');
select lives_ok(
  $$ insert into public.community_reactions (post_id, kind) values (current_setting('t.p2')::uuid, 'celebrate') $$,
  'members react to posts they can read');
select throws_ok(
  $$ insert into public.community_reactions (post_id, kind) values (current_setting('t.p2')::uuid, 'celebrate') $$,
  '23505', null, 'one reaction of a kind per person');
select lives_ok(
  $$ insert into public.reports (target_type, target_id, reason) values ('community_post', current_setting('t.p2')::uuid, 'Test report') $$,
  'members report a post');
set local role postgres;
select set_config('t.rep', (select id::text from public.reports limit 1), true);
set local role authenticated;

-- Mariama, Tamale lead -----------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.community_posts (scope, chapter_id, body)
     values ('chapter', 'c1000000-0000-0000-0000-000000000001', 'Skillshop on Saturday at the hub') $$,
  'a lead posts in their chapter');
select set_config('t.p3', (select id::text from public.community_posts where body like 'Skillshop on%'), true);
select lives_ok(
  $$ select public.pin_community_post(current_setting('t.p3')::uuid, true) $$,
  'a lead pins an announcement');
select results_eq(
  $$ select id, author_is_lead from public.community_feed('chapter', 'c1000000-0000-0000-0000-000000000001') limit 1 $$,
  $$ values (current_setting('t.p3')::uuid, true) $$,
  'the pinned lead post comes first in the chapter feed');
select lives_ok(
  $$ select public.set_chapter_details('c1000000-0000-0000-0000-000000000001', 'Tamale chapter', 'https://chat.whatsapp.com/TamaleInvite2') $$,
  'a lead edits the chapter summary and link');
select throws_ok(
  $$ select public.moderate_community_content('community_post', current_setting('t.p1')::uuid, true, null) $$,
  '22023', null, 'hiding needs a reason');
select lives_ok(
  $$ select public.moderate_community_content('community_post', current_setting('t.p1')::uuid, true, 'Off topic') $$,
  'a lead hides a post in their chapter');
select throws_ok(
  $$ select public.moderate_community_content('community_post', current_setting('t.p2')::uuid, true, 'No') $$,
  '42501', null, 'a lead cannot moderate the everyone feed');
select is((select count(*)::int from public.community_report_queue()), 0,
  'a lead''s queue holds only reports on their chapter');
select throws_ok(
  $$ select public.set_community_report_status(current_setting('t.rep')::uuid, 'dismissed') $$,
  '42501', null, 'a lead cannot triage reports outside their chapter');
update public.chapter_members set role = 'lead' where profile_id = '11111111-1111-1111-1111-111111111111';
select is((select role from public.chapter_members where profile_id = '11111111-1111-1111-1111-111111111111'),
  'member', 'leads cannot appoint leads');

-- Wumpini sees her hidden post and the lead's notification -----------------------
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select results_eq(
  $$ select kind, payload ->> 'chapter_slug' from public.notifications $$,
  $$ values ('chapter_post', 'tamale') $$, 'a lead''s post notifies chapter members');
select isnt((select hidden_at from public.community_posts where id = current_setting('t.p1')::uuid),
  null, 'the author still sees their hidden post');
select throws_ok(
  $$ insert into public.community_replies (post_id, body) values (current_setting('t.p1')::uuid, 'Still here?') $$,
  '42501', null, 'nobody replies to a hidden post');
select lives_ok(
  $$ insert into public.community_replies (post_id, body) values (current_setting('t.p3')::uuid, 'I will be there') $$,
  'a member replies to a lead''s post');
select set_config('t.r1', (select id::text from public.community_replies where body = 'I will be there'), true);
select lives_ok(
  $$ insert into public.community_reactions (reply_id, kind) values (current_setting('t.r1')::uuid, 'like') $$,
  'members react to replies');

-- Adisa joins Tamale: cannot see the hidden post -------------------------------
select set_config('request.jwt.claims', '{"sub":"77777777-7777-7777-7777-777777777777","role":"authenticated"}', true);
insert into public.chapter_members (chapter_id) values ('c1000000-0000-0000-0000-000000000001');
select results_eq(
  $$ select id from public.community_posts where chapter_id = 'c1000000-0000-0000-0000-000000000001' $$,
  $$ values (current_setting('t.p3')::uuid) $$,
  'other members do not see a hidden post');
select results_eq(
  $$ select author_name, body from public.community_thread(current_setting('t.p3')::uuid) $$,
  $$ values ('Wumpini Alhassan', 'I will be there') $$, 'the thread carries reply authors');

-- Mariama gets the reply notification and removes Adisa
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.notifications where kind = 'community_reply'), 1,
  'a reply notifies the post author');
select lives_ok(
  $$ delete from public.chapter_members where profile_id = '77777777-7777-7777-7777-777777777777' $$,
  'a lead removes a member');
select is((select count(*)::int from public.chapter_roster where chapter_id = 'c1000000-0000-0000-0000-000000000001'), 2,
  'the member is gone');

-- Cohort scope -------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.community_posts (scope, cohort_id, body)
     values ('cohort', 'c0000000-0000-0000-0000-00000000000a', 'Week 1 done') $$,
  'a cohort learner posts in their cohort');
select set_config('t.p4', (select id::text from public.community_posts where body = 'Week 1 done'), true);
select is((select count(*)::int from public.cohort_channels), 0, 'no channel yet');

select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.cohort_channels (cohort_id, whatsapp_url) values ('c0000000-0000-0000-0000-00000000000a', 'https://chat.whatsapp.com/CohortA') $$,
  'cohort staff set the cohort WhatsApp link');
select lives_ok(
  $$ select public.moderate_community_content('community_post', current_setting('t.p4')::uuid, true, 'Testing') $$,
  'cohort staff moderate their cohort');

select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.community_posts where cohort_id is not null), 0,
  'outsiders cannot read cohort posts');
select is((select count(*)::int from public.cohort_channels), 0, 'outsiders cannot read the cohort link');

-- Admin --------------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.community_report_queue()), 1, 'admins see every community report');
select lives_ok(
  $$ select public.set_community_report_status(current_setting('t.rep')::uuid, 'actioned') $$,
  'admins triage community reports');
select is((select count(*)::int from public.community_posts), 4, 'admins read every post, hidden ones too');

-- Rate limit -----------------------------------------------------------------------
set local role postgres;
insert into public.community_posts (author_id, scope, body)
select '22222222-2222-2222-2222-222222222222', 'everyone', 'Post ' || n from generate_series(1, 10) n;
select throws_ok(
  $$ insert into public.community_posts (author_id, scope, body) values ('22222222-2222-2222-2222-222222222222', 'everyone', 'One more') $$,
  '54000', 'Slow down', 'at most ten posts an hour');

select * from finish();
rollback;
