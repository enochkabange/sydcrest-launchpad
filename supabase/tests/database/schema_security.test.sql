-- Schema wide guard rails, the database linter's checks in a form CI runs:
-- every table has RLS, no view runs as its owner, private functions are not
-- executable by default, and anon cannot reach the minting path.
begin;
create extension if not exists pgtap with schema extensions;
select plan(11);

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

-- Security advisor (issue #82): signed out visitors cannot execute any
-- security definer function in the exposed schema. Generic, so it also
-- covers functions added later (and public.rls_auto_enable on hosted stacks).
select is(
  (select array_agg(p.oid::regprocedure::text order by p.proname) from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.prosecdef
      and has_function_privilege('anon', p.oid, 'execute')),
  null,
  'anon cannot execute any security definer function in public'
);

select ok(
  not has_function_privilege('anon', 'public.admin_reports(text)', 'execute')
  and not has_function_privilege('anon', 'public.admin_unpublish_profile(uuid)', 'execute')
  and not has_function_privilege('anon', 'public.funnel_by_week(integer)', 'execute')
  and not has_function_privilege('anon', 'public.record_ai_usage(bigint, bigint)', 'execute')
  and not has_function_privilege('anon', 'public.record_ai_tokens(bigint, bigint)', 'execute')
  and not has_function_privilege('anon', 'public.revoke_consent(text)', 'execute')
  and not has_function_privilege('anon', 'public.set_node_status(uuid, text)', 'execute')
  and not has_function_privilege('anon', 'public.submit_node_quiz(uuid, jsonb)', 'execute'),
  'anon cannot execute any of the RPCs the advisor lists'
);

select ok(
  to_regprocedure('public.rls_auto_enable()') is null
  or not (has_function_privilege('anon', 'public.rls_auto_enable()', 'execute')
          or has_function_privilege('authenticated', 'public.rls_auto_enable()', 'execute')),
  'the dashboard rls_auto_enable helper, where it exists, is not callable over the API'
);

-- Phase 2 (issue #142): AI feedback and badge JSON are written by server
-- code with the secret key only, and the public certificate lookup is a
-- security invoker function (the definer part stays in private).
select ok(
  not has_function_privilege('authenticated', 'public.record_ai_review(uuid, smallint, jsonb, smallint, text)', 'execute')
  and not has_function_privilege('authenticated', 'public.set_certificate_badge(uuid, jsonb)', 'execute')
  and not has_function_privilege('authenticated', 'private.certification_status(uuid, uuid)', 'execute')
  and has_function_privilege('service_role', 'public.record_ai_review(uuid, smallint, jsonb, smallint, text)', 'execute'),
  'only the service role records AI reviews and badge JSON'
);

select ok(
  has_function_privilege('anon', 'public.verify_certificate(text)', 'execute')
  and not (select prosecdef from pg_proc where oid = 'public.verify_certificate(text)'::regprocedure),
  'anyone can verify a certificate through a security invoker function'
);

select * from finish();
rollback;
