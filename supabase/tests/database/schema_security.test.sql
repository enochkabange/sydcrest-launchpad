-- Schema wide guard rails, the database linter's checks in a form CI runs:
-- every table has RLS, no view runs as its owner, private functions are not
-- executable by default, and anon cannot reach the minting path.
begin;
create extension if not exists pgtap with schema extensions;
select plan(6);

select is(
  (select array_agg(tablename::text order by tablename) from pg_tables
    where schemaname = 'public' and not rowsecurity),
  null,
  'every table in public has row level security enabled'
);

select is(
  (select array_agg(c.relname::text) from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind = 'v'
      and not coalesce('security_invoker=true' = any (c.reloptions), false)),
  null,
  'every view in public is security_invoker'
);

select is(
  (select array_agg(p.oid::regprocedure::text) from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'private' and has_function_privilege('public', p.oid, 'execute')),
  null,
  'no private function is executable by every role'
);

select is(
  (select array_agg(p.oid::regprocedure::text) from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname in ('public', 'private') and p.prosecdef
      and not coalesce(exists (select 1 from unnest(p.proconfig) c where c = 'search_path=""'), false)),
  null,
  'every security definer function pins an empty search_path'
);

select ok(
  not has_function_privilege('anon', 'private.mint_achievement(uuid, text, text, jsonb)', 'execute')
  and not has_function_privilege('authenticated', 'private.mint_achievement(uuid, text, text, jsonb)', 'execute')
  and not has_function_privilege('authenticated', 'public.mint_achievement(uuid, text, text, jsonb)', 'execute'),
  'learners cannot mint achievements directly'
);

select ok(
  not has_function_privilege('anon', 'public.submit_node_quiz(uuid, jsonb)', 'execute')
  and not has_function_privilege('anon', 'public.set_node_status(uuid, text)', 'execute')
  and not has_function_privilege('anon', 'public.record_ai_usage(bigint, bigint)', 'execute'),
  'signed out visitors cannot call the learner functions'
);

select * from finish();
rollback;
