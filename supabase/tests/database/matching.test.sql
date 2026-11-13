-- Matching explanations (epic #320, issue #336): the match score, the
-- learner's own readiness, employer bands only with consent, and the admin audit.
begin;
create extension if not exists pgtap with schema extensions;
select plan(32);

-- Wumpini and Sumaila apply to Ayishetu's data job; Wumpini shares her band.
-- Hawa only looks at it. Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', dob), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '2000-03-14'),
    ('22222222-2222-2222-2222-222222222222', 'hawa@example.test', 'Hawa Mumuni', '2001-01-20'),
    ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu', '1990-07-01'),
    ('55555555-5555-5555-5555-555555555555', 'sumaila@example.test', 'Sumaila Yakubu', '1998-02-02'),
    ('66666666-6666-6666-6666-666666666666', 'ayishetu@example.test', 'Ayishetu Abukari', '1988-11-30')) v(id, email, name, dob);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';

insert into public.roadmaps (id, slug, title, track, is_published) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'data-analyst', 'Data Analyst', 'data', true);
insert into public.roadmap_nodes (id, roadmap_id, slug, title, position, is_optional) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', 1, false),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'sql', 'SQL', 2, false);
insert into public.skills (id, slug, name, is_published) values
  ('cccccccc-0000-0000-0000-000000000001', 'spreadsheets', 'Spreadsheets', true),
  ('cccccccc-0000-0000-0000-000000000002', 'sql-basics', 'SQL basics', true);
insert into public.skill_roadmaps (skill_id, roadmap_slug) values
  ('cccccccc-0000-0000-0000-000000000001', 'data-analyst'),
  ('cccccccc-0000-0000-0000-000000000002', 'data-analyst');

insert into public.roadmap_progress (profile_id, node_id, status, completed_at) values
  ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-0000-0000-0000-000000000001', 'done', now()),
  ('55555555-5555-5555-5555-555555555555', 'bbbbbbbb-0000-0000-0000-000000000001', 'in_progress', null);
insert into public.verified_skills (profile_id, skill_id, source) values
  ('11111111-1111-1111-1111-111111111111', 'cccccccc-0000-0000-0000-000000000002', 'assessment'),
  ('55555555-5555-5555-5555-555555555555', 'cccccccc-0000-0000-0000-000000000001', 'assessment');
select private.refresh_readiness();
-- Wumpini: 1 of 2 skills (20), 1 of 2 topics (12.5), one learning day (1.3): 34.
-- Sumaila: 1 of 2 skills (20), one learning day (1.3): 21. Both Getting started.

insert into public.organisations (id, slug, name, verification_status, verified_at, created_by) values
  ('0a000000-0000-0000-0000-000000000001', 'tamale-data', 'Tamale Data Services', 'verified', now(), '66666666-6666-6666-6666-666666666666');
-- The first names a catalogue skill (SQL basics, matched ignoring case) and one
-- that is not in it; the second names none, so its track's skills count.
insert into public.opportunities (id, slug, kind, title, description, organisation_id, organisation_name, status,
                                  apply_on_sydcrest, posted_by, tracks, skills) values
  ('0b000000-0000-0000-0000-000000000001', 'data-assistant', 'job', 'Data assistant', 'Clean survey data.',
   '0a000000-0000-0000-0000-000000000001', 'Tamale Data Services', 'open', true, '66666666-6666-6666-6666-666666666666',
   '{data}', '{sql basics,Teamwork}'),
  ('0b000000-0000-0000-0000-000000000002', 'data-driver', 'job', 'Survey driver', 'Drive the survey team.',
   '0a000000-0000-0000-0000-000000000001', 'Tamale Data Services', 'open', true, '66666666-6666-6666-6666-666666666666',
   '{data}', '{Driving}');

-- The match ---------------------------------------------------------------------------

select is((private.match_weights() ->> 'skill_bonus')::int, 5, 'the skill bonus lives in one function');
select results_eq(
  $$ select name from private.opportunity_required_skills('0b000000-0000-0000-0000-000000000001') $$,
  $$ values ('SQL basics') $$,
  'required skills: the catalogue skills the listing names');
select set_eq(
  $$ select name from private.opportunity_required_skills('0b000000-0000-0000-0000-000000000002') $$,
  $$ values ('SQL basics'), ('Spreadsheets') $$,
  'or, when it names none, the skills mapped to its track');
select results_eq(
  $$ select score, readiness_band, skills_required, skills_verified, verified_names
       from private.opportunity_match('11111111-1111-1111-1111-111111111111', '0b000000-0000-0000-0000-000000000001') $$,
  $$ select least(100, rs.score + 5)::integer, rs.band, 1, 1, '{SQL basics}'::text[]
       from public.readiness_scores rs where rs.profile_id = '11111111-1111-1111-1111-111111111111' $$,
  'match = track readiness plus the bonus per required skill verified');
select results_eq(
  $$ select score from private.opportunity_match('55555555-5555-5555-5555-555555555555', '0b000000-0000-0000-0000-000000000001') $$,
  $$ select rs.score::integer from public.readiness_scores rs where rs.profile_id = '55555555-5555-5555-5555-555555555555' $$,
  'a verified skill the listing does not need earns no bonus');
select is(
  (select score from private.opportunity_match('22222222-2222-2222-2222-222222222222', '0b000000-0000-0000-0000-000000000001')),
  null, 'no readiness for the track and no skill: nothing to rank on');
select ok(
  not has_function_privilege('authenticated', 'private.opportunity_match(uuid, uuid)', 'execute')
  and not has_function_privilege('anon', 'private.opportunity_match(uuid, uuid)', 'execute'),
  'nobody calls the match function directly');

-- The learner ---------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select results_eq(
  $$ select roadmap_slug, track from public.my_match_readiness() $$,
  $$ values ('data-analyst', 'data') $$,
  'a learner reads their own readiness per track');
select is((select count(*)::int from public.readiness_scores where profile_id <> (select auth.uid())), 0,
  'and reads only their own rows of the scores table (My progress, #337)');

select lives_ok(
  $$ insert into public.opportunity_applications (opportunity_id, note, contact_consent, share_readiness)
     values ('0b000000-0000-0000-0000-000000000001', 'I clean survey data for NGOs in Tamale.', true, true) $$,
  'a learner applies and shares their band');
select throws_ok(
  $$ update public.opportunity_applications set share_readiness = false $$,
  '42501', null, 'the sharing column is not directly writable');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is((select count(*)::int from public.my_match_readiness() where roadmap_slug = 'data-analyst'), 1,
  'each learner sees only their own rows');
select lives_ok(
  $$ insert into public.opportunity_applications (opportunity_id, note, contact_consent)
     values ('0b000000-0000-0000-0000-000000000001', 'I keep the shop records in spreadsheets.', true) $$,
  'a second learner applies without sharing');
select is((select share_readiness from public.opportunity_applications), false, 'sharing is off by default');
select throws_ok(
  $$ select public.set_application_readiness_sharing(
       (select id from public.opportunity_applications where note like 'I clean%'), false) $$,
  '42501', null, 'nobody changes the sharing on another learner''s application');

-- The employer --------------------------------------------------------------------------

select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.org_applicant_readiness('0b000000-0000-0000-0000-000000000001')), 1,
  'the employer sees a band only for the applicant who shares it');
select results_eq(
  $$ select r.band, r.roadmap_title, r.verified_skills
       from public.org_applicant_readiness('0b000000-0000-0000-0000-000000000001') r
       join public.org_opportunity_applicants('0b000000-0000-0000-0000-000000000001') a using (application_id)
      where a.display_name = 'Wumpini Alhassan' $$,
  $$ values ('getting_started', 'Data Analyst', '{SQL basics}'::text[]) $$,
  'with the band for the track and the required skills they verified');
select ok(
  not exists (
    select 1 from pg_proc p, unnest(p.proargnames) n
     where p.oid = 'public.org_applicant_readiness(uuid)'::regprocedure and n in ('score', 'skills_points', 'progress_points')),
  'and never a score or its parts');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.org_applicant_readiness('0b000000-0000-0000-0000-000000000001')), 0,
  'someone outside the organisation sees none');

select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is(
  public.set_application_readiness_sharing((select id from public.opportunity_applications), true),
  true, 'a learner can turn sharing on later');
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.org_applicant_readiness('0b000000-0000-0000-0000-000000000001')), 2,
  'and the employer then sees it');
select set_config('request.jwt.claims', '{"sub":"55555555-5555-5555-5555-555555555555","role":"authenticated"}', true);
select is(
  public.set_application_readiness_sharing((select id from public.opportunity_applications), false),
  false, 'and off again');
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select is((select count(*)::int from public.org_applicant_readiness('0b000000-0000-0000-0000-000000000001')), 1,
  'after which the employer no longer sees it');

-- Talent directory ------------------------------------------------------------------------

reset role;
insert into public.talent_listings (profile_id, headline, share_readiness) values
  ('11111111-1111-1111-1111-111111111111', 'Junior data analyst', true),
  ('55555555-5555-5555-5555-555555555555', 'Shop bookkeeper', false);
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select results_eq(
  $$ select readiness -> 0 ->> 'band', readiness -> 0 ->> 'roadmap_title', readiness -> 0 ? 'score'
       from public.talent_directory where profile_id = '11111111-1111-1111-1111-111111111111' $$,
  $$ values ('getting_started', 'Data Analyst', false) $$,
  'the directory shows the band of a learner who shares it, without a score');
select is(
  (select readiness from public.talent_directory where profile_id = '55555555-5555-5555-5555-555555555555'),
  '[]'::jsonb, 'and nothing for a learner who does not');

-- Admin audit -----------------------------------------------------------------------------

reset role;
insert into public.events (name, profile_id, props) values
  ('opportunity_viewed', '22222222-2222-2222-2222-222222222222', '{"opportunity_id":"0b000000-0000-0000-0000-000000000001"}'),
  ('opportunity_viewed', '11111111-1111-1111-1111-111111111111', '{"opportunity_id":"0b000000-0000-0000-0000-000000000001"}'),
  ('opportunity_viewed', '22222222-2222-2222-2222-222222222222', '{"opportunity_id":"not-an-id"}');
update public.opportunity_applications set stage = 'shortlisted' where note like 'I clean%';
set local role authenticated;

select set_config('request.jwt.claims', '{"sub":"66666666-6666-6666-6666-666666666666","role":"authenticated"}', true);
select throws_ok($$ select * from public.admin_match_audit() $$, '42501', null, 'the audit is for admins only');
select throws_ok($$ select * from public.admin_match_fairness() $$, '42501', null, 'and so are the match rates');

select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select results_eq(
  $$ select sum(shown)::int, sum(applied)::int, sum(shortlisted)::int, sum(hired)::int
       from public.admin_match_audit() where opportunity_id = '0b000000-0000-0000-0000-000000000001' $$,
  $$ values (3, 2, 1, 0) $$,
  'per opportunity: viewed or applied counts once as shown, then applied, shortlisted and hired');
select results_eq(
  $$ select band, shown from public.admin_match_audit()
      where opportunity_id = '0b000000-0000-0000-0000-000000000001' and band = 'none' $$,
  $$ values ('none', 1) $$,
  'by band, with no readiness for the track as its own band');
select results_eq(
  $$ select shown, applied, shortlisted, hired from public.admin_match_fairness() where dimension = 'all' $$,
  $$ values (3, 2, 1, 0) $$,
  'the rates by group start from the same pairs');
select is(
  (select array_agg(distinct dimension order by dimension) from public.admin_match_fairness()),
  '{age,all,band,device,education,internet,region}'::text[],
  'grouped by the readiness fairness groups and band');
select ok(
  not has_function_privilege('anon', 'public.admin_match_audit()', 'execute')
  and not has_function_privilege('anon', 'public.org_applicant_readiness(uuid)', 'execute')
  and not has_function_privilege('anon', 'public.my_match_readiness()', 'execute')
  and not has_function_privilege('anon', 'public.set_application_readiness_sharing(uuid, boolean)', 'execute'),
  'signed out visitors call none of it');

select * from finish();
rollback;
