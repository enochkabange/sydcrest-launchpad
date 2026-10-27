-- Schema B (issue #158): the skill catalogue and verified skills, earned by a
-- completed path, a passed assessment or an approved portfolio. Never written
-- by the person who holds it.
begin;
create extension if not exists pgtap with schema extensions;
select plan(35);

-- People: Wumpini (private profile) and Abdul-Rahman (public) are learners;
-- Mariama completes a roadmap; Sumaila is a mentor; Fuseini is an admin.
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
update public.profiles set role = 'mentor' where id = '55555555-5555-5555-5555-555555555555';
update public.profiles set public_slug = 'abdul-rahman', is_public = true where id = '22222222-2222-2222-2222-222222222222';
update public.profiles set public_slug = 'mariama', is_public = true where id = '33333333-3333-3333-3333-333333333333';

insert into public.skills (id, slug, name, is_published) values
  ('5c000000-0000-0000-0000-000000000001', 'seo', 'Search engine optimisation', true),
  ('5c000000-0000-0000-0000-000000000002', 'sql', 'SQL', true),
  ('5c000000-0000-0000-0000-000000000003', 'secret', 'Unreleased skill', false);
insert into public.skill_roadmaps (skill_id, roadmap_slug) values
  ('5c000000-0000-0000-0000-000000000001', 'digital-marketer'),
  ('5c000000-0000-0000-0000-000000000003', 'digital-marketer');
insert into public.roadmaps (id, slug, title, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'digital-marketer', 'Digital Marketer', true);
insert into public.skill_assessments (id, skill_id, kind, title, questions, pass_threshold, retry_after_hours, is_published) values
  ('5a000000-0000-0000-0000-000000000001', '5c000000-0000-0000-0000-000000000002', 'quiz', 'SQL check',
   '[{"id":"q1","prompt":"?","options":["a","b"]},{"id":"q2","prompt":"?","options":["a","b"]}]', 100, 24, true),
  ('5a000000-0000-0000-0000-000000000002', '5c000000-0000-0000-0000-000000000001', 'portfolio', 'SEO portfolio',
   '[]', 80, 24, true);
insert into public.skill_assessment_answers (assessment_id, answer_key) values
  ('5a000000-0000-0000-0000-000000000001', '{"q1": 1, "q2": 0}');

-- Signed out ------------------------------------------------------------------
set local role anon;
select results_eq($$ select slug from public.skills order by slug $$, $$ values ('seo'), ('sql') $$,
  'anon reads published skills only');
select results_eq($$ select roadmap_slug from public.skill_roadmaps $$, $$ values ('digital-marketer') $$,
  'mappings of unpublished skills stay hidden');
select throws_ok($$ select * from public.skill_assessment_answers $$, '42501', null, 'anon cannot read answer keys');
select throws_ok($$ select * from public.skill_assessment_attempts $$, '42501', null, 'anon cannot read attempts');

-- Wumpini --------------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select throws_ok(
  $$ insert into public.verified_skills (profile_id, skill_id, source) values ('11111111-1111-1111-1111-111111111111', '5c000000-0000-0000-0000-000000000002', 'assessment') $$,
  '42501', null, 'cannot self issue a verified skill');
select throws_ok(
  $$ select private.issue_verified_skill('11111111-1111-1111-1111-111111111111', '5c000000-0000-0000-0000-000000000002', 'assessment') $$,
  '42501', null, 'cannot call the issuer');
select throws_ok(
  $$ insert into public.skill_assessment_attempts (assessment_id, skill_id, profile_id, kind, status, score)
     values ('5a000000-0000-0000-0000-000000000001', '5c000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'quiz', 'passed', 100) $$,
  '42501', null, 'cannot write a passed attempt');
select is((select count(*)::int from public.skill_assessment_answers), 0, 'learners get no answer keys');
select throws_ok(
  $$ insert into public.skills (slug, name, is_published) values ('bought', 'Bought', true) $$,
  '42501', null, 'learners cannot add skills');

select results_eq(
  $$ select score, passed, verified_skill_id from public.submit_skill_quiz('5a000000-0000-0000-0000-000000000001', '{"q1": 1, "q2": 1}') $$,
  $$ values (50::smallint, false, null::uuid) $$, 'a failed quiz issues nothing');
select throws_ok(
  $$ select * from public.submit_skill_quiz('5a000000-0000-0000-0000-000000000001', '{"q1": 1, "q2": 0}') $$,
  '22023', 'Try again later', 'a retry waits after a fail');
select is((select count(*)::int from public.verified_skills), 0, 'still no verified skill');

select lives_ok(
  $$ select public.submit_skill_portfolio('5a000000-0000-0000-0000-000000000002', 'https://wumpini.example.test/seo-audit', 'An audit for a shea butter shop') $$,
  'a learner sends a portfolio');
select throws_ok(
  $$ select public.submit_skill_portfolio('5a000000-0000-0000-0000-000000000002', 'https://wumpini.example.test/again') $$,
  '22023', null, 'one portfolio waits for review at a time');
select throws_ok(
  $$ select public.review_skill_portfolio((select id from public.skill_assessment_attempts where kind = 'portfolio'), true) $$,
  '42501', null, 'cannot approve their own portfolio as a learner');
select is((select count(*)::int from public.portfolio_review_queue), 0, 'learners see no review queue');
select is(public.claim_path_skills(), 0, 'no completed path, nothing to claim');

-- Abdul-Rahman passes the quiz -----------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select results_eq(
  $$ select score, passed, verified_skill_id is not null from public.submit_skill_quiz('5a000000-0000-0000-0000-000000000001', '{"q1": 1, "q2": 0}') $$,
  $$ values (100::smallint, true, true) $$, 'a passed quiz issues the verified skill');
select results_eq(
  $$ select source, issued_by from public.verified_skills $$,
  $$ values ('assessment', null::uuid) $$, 'issued by the database from the assessment');
select is((select count(*)::int from public.notifications where kind = 'verified_skill'), 1, 'and the learner is told');
select throws_ok(
  $$ update public.verified_skills set revoked_at = null $$,
  '42501', null, 'holders cannot edit their verified skill');
select throws_ok(
  $$ delete from public.verified_skills $$,
  '42501', null, 'or delete it');

-- Mariama completes the Digital Marketer roadmap (minted by the database)
set local role postgres;
select private.mint_achievement('33333333-3333-3333-3333-333333333333', 'roadmap_completed', 'aaaaaaaa-0000-0000-0000-000000000001');
select results_eq(
  $$ select s.slug, v.source, v.source_ref from public.verified_skills v join public.skills s on s.id = v.skill_id
     where v.profile_id = '33333333-3333-3333-3333-333333333333' $$,
  $$ values ('seo', 'path_completion', 'digital-marketer') $$,
  'completing a mapped roadmap verifies its published skills');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is(public.claim_path_skills(), 0, 'claiming again issues nothing twice');

-- Sumaila, mentor, reviews Wumpini's portfolio ----------------------------------------
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select results_eq(
  $$ select display_name, status from public.portfolio_review_queue $$,
  $$ values ('Wumpini Alhassan', 'pending_review') $$, 'mentors see the review queue with names');
select is((select count(*)::int from public.skill_assessment_attempts where kind = 'quiz'), 0,
  'mentors do not read quiz attempts');
select throws_ok(
  $$ select public.review_skill_portfolio((select attempt_id from public.portfolio_review_queue), false) $$,
  '22023', null, 'a rejection needs a note');
select isnt(
  public.review_skill_portfolio((select attempt_id from public.portfolio_review_queue), true, 'Solid audit'),
  null, 'a mentor approves a portfolio');
select throws_ok(
  $$ select public.review_skill_portfolio((select attempt_id from public.portfolio_review_queue), true) $$,
  '22023', 'Already reviewed', 'a portfolio is reviewed once');

-- Wumpini's badge is hers but not public (private profile) -----------------------
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select results_eq(
  $$ select source, issued_by from public.verified_skills where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('portfolio_review', '55555555-5555-5555-5555-555555555555'::uuid) $$,
  'the owner sees the badge and who reviewed it');

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$ select profile_id from public.verified_skills order by profile_id $$,
  $$ values ('22222222-2222-2222-2222-222222222222'::uuid), ('33333333-3333-3333-3333-333333333333'::uuid) $$,
  'anon sees verified skills of public profiles only');

-- Admin revokes ------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select throws_ok(
  $$ select public.revoke_verified_skill((select id from public.verified_skills limit 1), 'Mine') $$,
  '42501', null, 'learners cannot revoke');
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select lives_ok(
  $$ select public.revoke_verified_skill((select id from public.verified_skills where profile_id = '22222222-2222-2222-2222-222222222222'), 'Shared answers') $$,
  'admins revoke with a reason');
set local role postgres;
select ok(
  not private.has_verified_skill('22222222-2222-2222-2222-222222222222')
  and private.has_verified_skill('33333333-3333-3333-3333-333333333333'),
  'has_verified_skill counts live badges only');
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select is((select count(*)::int from public.verified_skills where profile_id = '22222222-2222-2222-2222-222222222222'), 0,
  'a revoked badge leaves the public profile');

select * from finish();
rollback;
