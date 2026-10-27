-- Follow up schema (issue #192): public portfolio, one community post, AI
-- review usage and the admin email lookup. Plus the merged submissions
-- SELECT policy keeps its semantics.
begin;
create extension if not exists pgtap with schema extensions;
select plan(37);

-- Wumpini (public profile) and Abdul-Rahman (private) learn in cohort A,
-- Mariama mentors it and leads the Tamale chapter, Fuseini is an admin,
-- Sumaila is signed in but in neither cohort nor chapter.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama'),
  ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu')
) as u(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set public_slug = 'wumpini', is_public = true where id = '11111111-1111-1111-1111-111111111111';

insert into public.programs (id, slug, title, is_published) values
  ('a0000000-0000-0000-0000-000000000001', 'test-p', 'Test programme', true);
insert into public.program_weeks (id, program_id, week_number, theme, assignment) values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 1, 'Basics', 'Write tips'),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 2, 'Search', 'Plan SEO'),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 3, 'Ads', 'Plan ads');
insert into public.cohorts (id, program_id, name, starts_on) values
  ('c0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000001', 'Cohort A', '2027-01-11');
insert into public.cohort_members (cohort_id, profile_id, role) values
  ('c0000000-0000-0000-0000-00000000000a', '11111111-1111-1111-1111-111111111111', 'learner'),
  ('c0000000-0000-0000-0000-00000000000a', '22222222-2222-2222-2222-222222222222', 'learner'),
  ('c0000000-0000-0000-0000-00000000000a', '33333333-3333-3333-3333-333333333333', 'mentor');

-- Wumpini: week 1 graded and in the portfolio (with a file and long text),
-- week 2 graded but not in it, week 3 a draft. Abdul-Rahman: week 1 graded
-- and in the portfolio, but his profile is private.
insert into public.submissions (id, profile_id, program_id, program_week_id, cohort_id, status,
                                body_text, link_url, file_path, ai_feedback, ai_score, mentor_feedback,
                                final_score, graded_at, submitted_at, in_portfolio) values
  ('d0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001',
   'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-00000000000a', 'graded',
   repeat('Tips ', 200), 'https://docs.google.com/document/d/x', '11111111-1111-1111-1111-111111111111/w1/tips.pdf',
   '{"summary":"AI only"}', 70, 'Mentor only', 88, now(), now(), true),
  ('d0000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001',
   'b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-00000000000a', 'graded',
   'SEO plan', null, null, null, null, null, 75, now(), now(), false),
  ('d0000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001',
   'b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-00000000000a', 'draft',
   'Ads draft', null, null, null, null, null, null, null, null, false),
  ('d0000000-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'a0000000-0000-0000-0000-000000000001',
   'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-00000000000a', 'graded',
   'Abdul tips', null, null, null, null, null, 90, now(), now(), true);

insert into public.chapters (id, slug, name, region, city, status) values
  ('c1000000-0000-0000-0000-000000000001', 'tamale', 'Tamale', 'northern', 'Tamale', 'active');
insert into public.chapter_members (chapter_id, profile_id, role) values
  ('c1000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'lead'),
  ('c1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'member');
insert into public.community_posts (id, author_id, scope, chapter_id, body, hidden_at, hidden_by, hidden_reason) values
  ('e0000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'chapter',
   'c1000000-0000-0000-0000-000000000001', 'Skillshop on Saturday', null, null, null),
  ('e0000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'everyone',
   null, 'Hello everyone', now(), '44444444-4444-4444-4444-444444444444', 'Spam'),
  ('e0000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'everyone',
   null, 'Open question', null, null, null);
insert into public.community_replies (post_id, author_id, body) values
  ('e0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'I will come');
insert into public.community_reactions (profile_id, post_id, kind) values
  ('11111111-1111-1111-1111-111111111111', 'e0000000-0000-0000-0000-000000000001', 'like');

-- Structure -----------------------------------------------------------------------
select has_view('public', 'public_portfolio', 'public_portfolio exists');
select hasnt_column('public', 'public_portfolio', 'final_score', 'the public portfolio carries no score');
select hasnt_column('public', 'public_portfolio', 'mentor_feedback', 'the public portfolio carries no mentor feedback');
select hasnt_column('public', 'public_portfolio', 'file_path', 'the public portfolio carries no file path');
select ok(
  (select bool_and(not c.column_name like 'ai\_%') from information_schema.columns c
    where c.table_schema = 'public' and c.table_name = 'public_portfolio'),
  'the public portfolio carries no AI fields');
select is(
  (select pg_get_function_result('public.community_post(uuid)'::regprocedure)),
  (select pg_get_function_result('public.community_feed(text, uuid, timestamp with time zone, integer)'::regprocedure)),
  'community_post returns the community_feed row shape');
select ok(not has_function_privilege('anon', 'public.community_post(uuid)', 'execute'), 'anon cannot call community_post');
select ok(not has_function_privilege('anon', 'public.admin_find_profile_by_email(text)', 'execute'), 'anon cannot call the email lookup');
select ok(not has_function_privilege('anon', 'private.admin_find_profile_by_email(text)', 'execute'), 'anon cannot call the private email lookup');
select is(
  (select count(*)::int from pg_policies where schemaname = 'public' and tablename = 'submissions' and cmd = 'SELECT'),
  1, 'submissions has one SELECT policy');

-- Signed out -------------------------------------------------------------------------
set local role anon;
select results_eq(
  $$ select public_slug, program_slug, week_number, theme, link_url, has_file, body_is_excerpt, char_length(body_excerpt)
     from public.public_portfolio $$,
  $$ values ('wumpini', 'test-p', 1::smallint, 'Basics', 'https://docs.google.com/document/d/x', true, true, 600) $$,
  'anon reads only graded portfolio work of public profiles, as an excerpt');
select throws_ok($$ select * from public.ai_review_usage $$, '42501', null, 'anon cannot read AI review usage');
select throws_ok($$ select * from public.community_post('e0000000-0000-0000-0000-000000000001') $$,
  '42501', null, 'anon cannot read a community post');

-- Wumpini: owner, chapter member ------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select is((select count(*)::int from public.submissions), 3, 'a learner reads all their own submissions, drafts too');
select is((select count(*)::int from public.public_portfolio), 1, 'a signed in viewer sees no more of the portfolio than anon');
select results_eq(
  $$ select id, author_name, author_is_lead, reply_count, reaction_counts, my_reactions
     from public.community_post('e0000000-0000-0000-0000-000000000001') $$,
  $$ values ('e0000000-0000-0000-0000-000000000001'::uuid, 'Mariama Seidu', true, 1, '{"like": 1}'::jsonb, '{like}'::text[]) $$,
  'a chapter member reads the post with author, counts and their reactions');
select results_eq(
  $$ select row(p.*)::text from public.community_post('e0000000-0000-0000-0000-000000000001') p $$,
  $$ select row(f.*)::text from public.community_feed('chapter', 'c1000000-0000-0000-0000-000000000001') f
     where f.id = 'e0000000-0000-0000-0000-000000000001' $$,
  'community_post matches the feed row exactly');
select throws_ok($$ select * from public.community_post('e0000000-0000-0000-0000-000000000002') $$,
  'P0002', null, 'a hidden post is not found for other members');
select is((select count(*)::int from public.community_post('e0000000-0000-0000-0000-000000000003')), 1,
  'any signed in member reads an everyone post');
select throws_ok($$ select * from public.community_post('e0000000-0000-0000-0000-0000000000ff') $$,
  'P0002', null, 'an unknown post is not found');
select is((select count(*)::int from public.ai_review_usage), 0, 'a learner reads no AI review usage');
select throws_ok(
  $$ insert into public.ai_review_usage (submission_id, attempt, model, outcome)
     values ('d0000000-0000-0000-0000-000000000001', 1, 'x', 'failed') $$,
  '42501', null, 'a learner cannot write AI review usage');
select throws_ok($$ select * from public.admin_find_profile_by_email('abdul@example.test') $$,
  '42501', null, 'a learner cannot look people up by email');

-- Abdul-Rahman: author of the hidden post ---------------------------------------------
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select hidden_at is not null from public.community_post('e0000000-0000-0000-0000-000000000002')), true,
  'the author still reads their hidden post');

-- Sumaila: outside the chapter and the cohort -----------------------------------------
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select throws_ok($$ select * from public.community_post('e0000000-0000-0000-0000-000000000001') $$,
  'P0002', null, 'a non member cannot read a chapter post');
select is((select count(*)::int from public.submissions), 0, 'an outsider reads no submissions');

-- Mariama: cohort mentor ---------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.submissions), 3, 'a mentor reads sent work of their cohort, not drafts');
select is((select count(*)::int from public.ai_review_usage), 0, 'a mentor reads no AI review usage');

-- Service role writes usage ------------------------------------------------------------
reset role;
select set_config('request.jwt.claims', '', true);
set local role service_role;
select lives_ok(
  $$ insert into public.ai_review_usage (submission_id, attempt, model, outcome, input_tokens, output_tokens,
       cache_creation_input_tokens, cache_read_input_tokens, estimated_usd)
     values ('d0000000-0000-0000-0000-000000000001', 1, 'claude-haiku-5-5', 'recorded', 1200, 300, 900, 0, 0.004) $$,
  'the server records AI review usage');
select throws_ok(
  $$ insert into public.ai_review_usage (submission_id, attempt, model, outcome, input_tokens)
     values ('d0000000-0000-0000-0000-000000000001', 1, 'x', 'failed', -1) $$,
  '23514', null, 'token counts cannot be negative');
select throws_ok($$ select * from public.admin_find_profile_by_email('abdul@example.test') $$,
  '42501', null, 'the service role has no caller, so it is not an admin');

-- Fuseini: admin ------------------------------------------------------------------------
reset role;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.submissions), 3, 'an admin reads sent work, not drafts');
select results_eq(
  $$ select model, input_tokens, output_tokens from public.ai_review_usage $$,
  $$ values ('claude-haiku-5-5', 1200, 300) $$, 'an admin reads AI review usage');
select throws_ok($$ update public.ai_review_usage set input_tokens = 0 $$, '42501', null, 'an admin cannot edit usage');
select results_eq(
  $$ select id, display_name from public.admin_find_profile_by_email('  Abdul@Example.TEST ') $$,
  $$ values ('22222222-2222-2222-2222-222222222222'::uuid, 'Abdul-Rahman Issah') $$,
  'an admin finds a profile by email, ignoring case and spaces');
select is((select count(*)::int from public.admin_find_profile_by_email('nobody@example.test')), 0,
  'an unknown email returns no row');
select throws_ok($$ select * from public.admin_find_profile_by_email('') $$, '22023', null, 'an empty email is refused');

select * from finish();
rollback;
