-- Experiments, holdouts and feature flags (issue #327).
begin;
create extension if not exists pgtap with schema extensions;
select plan(32);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email, jsonb_build_object('full_name', name), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
    ('22222222-2222-2222-2222-222222222222', 'mariama@example.test', 'Mariama Seidu'),
    ('33333333-3333-3333-3333-333333333333', 'abdul@example.test', 'Abdul-Rahman Issah'),
    ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama')) v(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

-- Shape ---------------------------------------------------------------------------------

select has_table('public', 'experiments', 'experiments exists');
select has_table('public', 'experiment_assignments', 'experiment_assignments exists');
select ok(
  (select bool_and(c.relrowsecurity) from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname in ('experiments', 'experiment_assignments')),
  'row level security is on for both tables');
select results_eq(
  $$ select status, metric, variants, started_at is not null from public.experiments where key = 'reengage_holdout' $$,
  $$ values ('running'::text, 'active_7d'::text, '[{"code": "nudge", "weight": 90}, {"code": "holdout", "weight": 10}]'::jsonb, true) $$,
  'the re-engagement holdout is seeded running: nudge 90, holdout 10');
select ok(private.is_event_name('experiment_exposed'), 'experiment_exposed is an event name');
select throws_ok(
  $$ insert into public.experiments (key, variants) values ('bad_split', '[{"code": "only", "weight": 1}]') $$,
  '23514', null, 'one variant is not an experiment');
select throws_ok(
  $$ insert into public.experiments (key, variants) values ('bad_weights', '[{"code": "a", "weight": 0}, {"code": "b", "weight": 0}]') $$,
  '23514', null, 'weights must add up to more than zero');
select throws_ok(
  $$ insert into public.experiments (key, variants) values ('Bad Key', '[{"code": "a", "weight": 1}, {"code": "b", "weight": 1}]') $$,
  '23514', null, 'keys are lower case words');

-- A learner -----------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select is((select count(*)::int from public.experiments), 0, 'a learner cannot read experiments');
select throws_ok(
  $$ insert into public.experiments (key, variants) values ('sneaky', '[{"code": "a", "weight": 1}, {"code": "b", "weight": 1}]') $$,
  '42501', null, 'a learner cannot create an experiment');
select is(
  public.running_experiment('reengage_holdout'),
  '[{"code": "nudge", "weight": 90}, {"code": "holdout", "weight": 10}]'::jsonb,
  'a learner reads a running experiment''s variants');
select is(public.running_experiment('no_such_test'), null, 'no variants for an unknown key');
select is(public.record_experiment_exposure('reengage_holdout', 'nudge'), true, 'the first exposure is recorded');
select is(public.record_experiment_exposure('reengage_holdout', 'nudge'), false, 'a second exposure is not');
select is(
  public.record_experiment_exposure('reengage_holdout', 'holdout', '22222222-2222-2222-2222-222222222222'),
  false, 'a learner cannot record an exposure for someone else (it is theirs, and already recorded)');
select throws_ok(
  $$ select public.record_experiment_exposure('reengage_holdout', 'made_up') $$,
  '22023', null, 'only the experiment''s own variants');
select is((select count(*)::int from public.experiment_assignments), 0, 'a learner cannot read assignments');
select throws_ok(
  $$ select * from public.admin_insights_experiments(current_date - 30, current_date) $$,
  '42501', null, 'the report refuses a learner');
reset role;

select results_eq(
  $$ select profile_id, variant from public.experiment_assignments $$,
  $$ values ('11111111-1111-1111-1111-111111111111'::uuid, 'nudge'::text) $$,
  'one assignment for the learner');
select results_eq(
  $$ select profile_id, props, signed_in, source from public.events where name = 'experiment_exposed' $$,
  $$ values ('11111111-1111-1111-1111-111111111111'::uuid, '{"experiment": "reengage_holdout", "variant": "nudge"}'::jsonb, true, 'server'::text) $$,
  'one experiment_exposed event with the experiment and variant');

-- A signed out visitor and the re-engagement job -------------------------------------------

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select is(
  public.record_experiment_exposure('reengage_holdout', 'nudge', null, '{"anonymous_id": "aaaaaaaa-0000-4000-8000-000000000001"}'),
  true, 'a visitor is recorded by their anonymous id');
select is(
  public.record_experiment_exposure('reengage_holdout', 'nudge', '33333333-3333-3333-3333-333333333333'),
  false, 'a visitor cannot record an exposure for a learner');
reset role;

set local role service_role;
select set_config('request.jwt.claims', '{"role":"service_role"}', true);
select is(
  public.record_experiment_exposure('reengage_holdout', 'holdout', '33333333-3333-3333-3333-333333333333'),
  true, 'the job records a learner''s arm');
reset role;
select is(
  (select variant from public.experiment_assignments where profile_id = '33333333-3333-3333-3333-333333333333'),
  'holdout', 'held out');
select is(
  (select count(*)::int from public.events where name = 'experiment_exposed' and profile_id = '33333333-3333-3333-3333-333333333333'),
  0, 'the job writes no event under an away learner''s profile, so they do not look active');

-- An admin --------------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.experiments (key, description, variants) values ('new_welcome', 'A shorter welcome', '[{"code": "control", "weight": 50}, {"code": "short", "weight": 50}]') $$,
  'an admin creates a draft');
select is(public.running_experiment('new_welcome'), null, 'a draft is not running');
select lives_ok($$ update public.experiments set status = 'running' where key = 'new_welcome' $$, 'an admin starts it');
select ok((select started_at is not null from public.experiments where key = 'new_welcome'), 'starting sets started_at');
select throws_ok(
  $$ update public.experiments set variants = '[{"code": "control", "weight": 10}, {"code": "short", "weight": 90}]' where key = 'new_welcome' $$,
  '22023', null, 'the split is fixed once started');
select throws_ok(
  $$ update public.experiments set status = 'draft' where key = 'new_welcome' $$,
  '22023', null, 'a running experiment cannot go back to draft');
reset role;

-- The report: two learners met new_welcome ten days ago, one came back two days later;
-- one met it yesterday and is not measured yet.
insert into public.experiment_assignments (experiment_id, profile_id, variant, exposed_at)
select e.id, v.profile_id::uuid, v.variant, now() - v.ago
  from public.experiments e,
       (values ('11111111-1111-1111-1111-111111111111', 'control', interval '10 days'),
               ('22222222-2222-2222-2222-222222222222', 'control', interval '10 days'),
               ('33333333-3333-3333-3333-333333333333', 'short', interval '1 day')) v(profile_id, variant, ago)
 where e.key = 'new_welcome';
insert into public.events (name, profile_id, props, device_class, created_at) values
  ('page_view', '11111111-1111-1111-1111-111111111111', '{}', 'mobile', now() - interval '8 days'),
  ('page_view', '22222222-2222-2222-2222-222222222222', '{}', 'mobile', now() - interval '10 days');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select results_eq(
  $$ select variant, variant_order, weight, people, measured, came_back
       from public.admin_insights_experiments(current_date - 30, current_date) where experiment_key = 'new_welcome' $$,
  $$ values ('control'::text, 1, 50, 2, 2, 1), ('short'::text, 2, 50, 1, 0, 0) $$,
  'came back on a later day within 7 days, counted only once the window has closed');
reset role;

select * from finish();
rollback;
