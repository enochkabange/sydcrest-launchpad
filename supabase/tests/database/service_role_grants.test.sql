-- The server's secret key can read and write the epic #320 tables; members and visitors keep their own rules.
begin;
create extension if not exists pgtap with schema extensions;
select plan(4);

select ok(
  bool_and(has_table_privilege('service_role', t, 'select') and has_table_privilege('service_role', t, 'insert')
           and has_table_privilege('service_role', t, 'update') and has_table_privilege('service_role', t, 'delete')),
  'service_role reads and writes the epic #320 tables')
  from unnest(array['public.profile_first_touch', 'public.learner_profiles', 'public.learner_attributes']) t;
select ok(not has_table_privilege('anon', 'public.learner_profiles', 'select'), 'visitors still cannot read learner profiles');
select ok(not has_table_privilege('authenticated', 'public.learner_attributes', 'insert'), 'members still cannot write attributes');
select ok(not has_table_privilege('authenticated', 'public.profile_first_touch', 'insert'), 'members still cannot write first touches');

select * from finish();
rollback;
