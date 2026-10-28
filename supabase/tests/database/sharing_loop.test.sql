-- Sharing loop (issue #233): section milestones and milestone posts.
-- Sections finish only on verified (quiz passed) completions; milestone posts
-- are off by default, posted once per milestone, never for a topic marked
-- done by hand, and skipped (without breaking the quiz or certificate) when
-- the feed's rate limit or a recent moderation says no.
begin;
create extension if not exists pgtap with schema extensions;
select plan(30);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at) values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'wumpini@example.test', '{"full_name":"Wumpini Alhassan"}', now(), now()),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'fuseini@example.test', '{"full_name":"Fuseini Mahama"}', now(), now()),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'abdul@example.test', '{"full_name":"Abdul-Rahman Iddrisu"}', now(), now()),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'mariama@example.test', '{"full_name":"Mariama Seidu"}', now(), now()),
  ('55555555-5555-5555-5555-555555555555', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'hawa@example.test', '{"full_name":"Hawa Issahaku"}', now(), now());

-- Data Analyst: two sections. Every node has a quiz except the optional one.
insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', true),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'outline', 'Outline Track', true);
insert into public.roadmap_nodes (id, roadmap_id, parent_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', null, 'foundations', 'Foundations', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'stats', 'Everyday statistics', 2, false),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'tidy', 'Tidy tables', 3, false),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000001', null, 'sql', 'SQL', 4, false),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000004', 'select', 'Select', 5, false),
  ('bbbbbbbb-0000-0000-0000-000000000006', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000004', 'extra', 'Extra reading', 6, true),
  -- Outline Track: no quizzes at all, so only marking by hand is possible.
  ('bbbbbbbb-0000-0000-0000-000000000007', 'aaaaaaaa-0000-0000-0000-000000000002', null, 'basics', 'Basics', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000008', 'aaaaaaaa-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000007', 'first', 'First steps', 2, false);

insert into public.node_quiz (id, node_id, questions, pass_threshold)
select ('cccccccc-0000-0000-0000-00000000000' || i)::uuid, ('bbbbbbbb-0000-0000-0000-00000000000' || i)::uuid,
       '[{"id":"q1","prompt":"?","options":["a","b"]}]', 100
from generate_series(1, 5) i;
insert into public.node_quiz_answers (quiz_id, answer_key)
select ('cccccccc-0000-0000-0000-00000000000' || i)::uuid, '{"q1": 1}' from generate_series(1, 5) i;

insert into public.programs (id, slug, title, is_published) values
  ('dddddddd-0000-0000-0000-000000000001', 'delta', 'Delta Mentoring Program', true);

create function pg_temp.pass(p_node text) returns void language sql as $$
  select null::void from public.submit_node_quiz(('bbbbbbbb-0000-0000-0000-00000000000' || p_node)::uuid, '{"q1": 1}');
$$;
create function pg_temp.act_as(p_id text) returns void language sql as $$
  select set_config('request.jwt.claims', format('{"sub":"%s","role":"authenticated"}', p_id), true)::void;
$$;
create function pg_temp.posts(p_id text) returns integer language sql as $$
  select count(*)::integer from public.community_posts where author_id = p_id::uuid;
$$;
grant execute on function pg_temp.pass(text), pg_temp.act_as(text) to authenticated;

-- The setting ---------------------------------------------------------------------

select col_default_is('public', 'profiles', 'milestone_posts', 'false', 'milestone posts are off by default');
select col_not_null('public', 'profiles', 'milestone_posts', 'the setting is always a yes or a no');
select hasnt_column('public', 'public_profiles', 'milestone_posts', 'the setting is not on the public profile view');

set local role authenticated;
select pg_temp.act_as('11111111-1111-1111-1111-111111111111');
select lives_ok($$ update public.profiles set milestone_posts = true where id = '11111111-1111-1111-1111-111111111111' $$,
  'a learner turns milestone posts on for themselves');
update public.profiles set milestone_posts = true where id = '22222222-2222-2222-2222-222222222222';
select throws_ok($$ select * from private.milestone_post_log $$, '42501', null, 'learners cannot read the ledger');
reset role;
select is((select milestone_posts from public.profiles where id = '22222222-2222-2222-2222-222222222222'), false,
  'a learner cannot turn it on for someone else');
update public.profiles set milestone_posts = true
 where id in ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');

-- Sections --------------------------------------------------------------------------

set local role authenticated;
select pg_temp.act_as('11111111-1111-1111-1111-111111111111');
select pg_temp.pass('1');
select pg_temp.pass('2');
select is((select count(*)::int from public.achievements where type = 'section_completed'), 0,
  'a section is not finished while a required topic is left');
select is(pg_temp.posts('11111111-1111-1111-1111-111111111111'), 0, 'and nothing is posted');
select pg_temp.pass('3');
select results_eq(
  $$ select ref_id from public.achievements where type = 'section_completed' $$,
  $$ values ('bbbbbbbb-0000-0000-0000-000000000001') $$,
  'passing the last quiz of a section mints the section achievement');
select is(pg_temp.posts('11111111-1111-1111-1111-111111111111'), 1, 'and posts it once');
select matches(
  (select body from public.community_posts where author_id = '11111111-1111-1111-1111-111111111111'),
  '^I finished the Foundations section of the Data Analyst roadmap',
  'the post says what was finished in plain words');
select results_eq(
  $$ select scope, hidden_at is null, link_url from public.community_posts
     where author_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('everyone'::text, true, null::text) $$,
  'it goes to the everyone feed as an ordinary post');
select ok(
  (select body from public.community_posts where author_id = '11111111-1111-1111-1111-111111111111')
    like '%Shared automatically because I turned on milestone posts.',
  'and says it was shared automatically');

select pg_temp.pass('2');
select is(pg_temp.posts('11111111-1111-1111-1111-111111111111'), 1, 'retaking a passed quiz posts nothing new');

-- The last section finishes the roadmap: one roadmap post, no section post.
select pg_temp.pass('4');
select pg_temp.pass('5');
select is((select count(*)::int from public.achievements where type = 'section_completed'), 2,
  'the second section is minted (optional nodes are not required)');
select is((select count(*)::int from public.achievements where type = 'roadmap_completed'), 1, 'and the roadmap');
select is(pg_temp.posts('11111111-1111-1111-1111-111111111111'), 2, 'finishing the roadmap adds one post, not two');
select ok(exists (select 1 from public.community_posts
                  where author_id = '11111111-1111-1111-1111-111111111111'
                    and body like 'I finished the Data Analyst roadmap%'),
  'and that post is about the roadmap');

-- Hand marked topics -----------------------------------------------------------------

select pg_temp.act_as('22222222-2222-2222-2222-222222222222');
select public.set_node_status('bbbbbbbb-0000-0000-0000-000000000007', 'done');
select public.set_node_status('bbbbbbbb-0000-0000-0000-000000000008', 'done');
reset role;
select is((select count(*)::int from public.achievements where profile_id = '22222222-2222-2222-2222-222222222222'), 0,
  'a section marked done by hand mints nothing');
select is(pg_temp.posts('22222222-2222-2222-2222-222222222222'), 0, 'and posts nothing, even with milestone posts on');

-- Off by default ------------------------------------------------------------------------

set local role authenticated;
select pg_temp.act_as('33333333-3333-3333-3333-333333333333');
select pg_temp.pass('1');
select pg_temp.pass('2');
select pg_temp.pass('3');
reset role;
select is((select count(*)::int from public.achievements
           where profile_id = '33333333-3333-3333-3333-333333333333' and type = 'section_completed'), 1,
  'a learner with the setting off still gets the section achievement');
select is(pg_temp.posts('33333333-3333-3333-3333-333333333333'), 0, 'but no post');

-- Certificates ----------------------------------------------------------------------------

insert into public.certificates (id, profile_id, program_id, recipient_name, program_title)
values ('eeeeeeee-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111',
        'dddddddd-0000-0000-0000-000000000001', 'Wumpini Alhassan', 'Delta Mentoring Program');
select is(pg_temp.posts('11111111-1111-1111-1111-111111111111'), 3, 'an issued certificate is posted');
select ok(exists (select 1 from public.community_posts
                  where author_id = '11111111-1111-1111-1111-111111111111'
                    and body like 'I earned my Delta Mentoring Program certificate.%'),
  'with the programme name');

update public.certificates set revoked_at = now(), revoked_by = '11111111-1111-1111-1111-111111111111'
 where id = 'eeeeeeee-0000-0000-0000-000000000001';
insert into public.certificates (profile_id, program_id, recipient_name, program_title)
values ('11111111-1111-1111-1111-111111111111', 'dddddddd-0000-0000-0000-000000000001',
        'Wumpini Alhassan', 'Delta Mentoring Program');
select is(pg_temp.posts('11111111-1111-1111-1111-111111111111'), 3, 'a certificate issued again is not posted twice');

-- Deleting a post does not bring it back.
delete from public.community_posts where author_id = '11111111-1111-1111-1111-111111111111' and body like 'I finished the Data Analyst%';
delete from public.achievements where profile_id = '11111111-1111-1111-1111-111111111111' and type = 'roadmap_completed';
select private.mint_achievement('11111111-1111-1111-1111-111111111111', 'roadmap_completed', 'aaaaaaaa-0000-0000-0000-000000000001');
select is(pg_temp.posts('11111111-1111-1111-1111-111111111111'), 2, 'a milestone is never posted a second time');

-- Rate limit: ten posts in the last hour already.
insert into public.community_posts (author_id, scope, body)
select '44444444-4444-4444-4444-444444444444', 'everyone', 'Post ' || i from generate_series(1, 10) i;
select lives_ok(
  $$ insert into public.certificates (profile_id, program_id, recipient_name, program_title)
     values ('44444444-4444-4444-4444-444444444444', 'dddddddd-0000-0000-0000-000000000001', 'Mariama Seidu', 'Delta Mentoring Program') $$,
  'the certificate is still issued when the feed refuses the post');
select is(pg_temp.posts('44444444-4444-4444-4444-444444444444'), 10, 'the rate limited milestone is skipped');
select is((select count(*)::int from private.milestone_post_log where profile_id = '44444444-4444-4444-4444-444444444444'), 0,
  'and not recorded as posted');

-- Moderation: a post hidden in the last 30 days pauses automatic posts.
insert into public.community_posts (author_id, scope, body, hidden_at, hidden_reason)
values ('55555555-5555-5555-5555-555555555555', 'everyone', 'Spam', now() - interval '2 days', 'Spam');
insert into public.certificates (profile_id, program_id, recipient_name, program_title)
values ('55555555-5555-5555-5555-555555555555', 'dddddddd-0000-0000-0000-000000000001', 'Hawa Issahaku', 'Delta Mentoring Program');
select is(pg_temp.posts('55555555-5555-5555-5555-555555555555'), 1, 'a learner recently moderated gets no automatic post');

select * from finish();
rollback;
