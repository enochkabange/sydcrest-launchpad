-- Security advisor hardening (issue #82). Grants only; no function bodies change.
--
-- 1. public.rls_auto_enable() is an event trigger helper that was created from
--    the dashboard on the hosted projects, so it is in no migration and does
--    not exist on local or CI stacks. As a SECURITY DEFINER function in the
--    exposed schema it was callable by anon and authenticated through
--    /rest/v1/rpc/rls_auto_enable (advisor lints 0028 and 0029). It is not an
--    API: revoke EXECUTE from the API roles where it exists, and keep it (the
--    event trigger still fires; trigger firing does not check EXECUTE).
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke execute on function public.rls_auto_enable() from public, anon, authenticated';
  end if;
end;
$$;

-- 2. The SECURITY DEFINER functions the app calls over the API. Each pins
--    search_path = '' and checks the caller inside (auth.uid() for learner
--    functions, private.is_admin() for admin ones), so signed in callers are
--    intended (lint 0029 accepted, see docs/data-model.md). Signed out
--    callers have no business with any of them. The original migrations
--    already revoke anon; repeating it here is a no op locally and corrects
--    any grant added by hand on a hosted project since.
revoke execute on function public.admin_reports(text) from public, anon;
revoke execute on function public.admin_unpublish_profile(uuid) from public, anon;
revoke execute on function public.funnel_by_week(integer) from public, anon;
revoke execute on function public.record_ai_usage(bigint, bigint) from public, anon;
revoke execute on function public.record_ai_tokens(bigint, bigint) from public, anon;
revoke execute on function public.revoke_consent(text) from public, anon;
revoke execute on function public.set_node_status(uuid, text) from public, anon;
revoke execute on function public.submit_node_quiz(uuid, jsonb) from public, anon;
revoke execute on function public.mint_achievement(uuid, text, text, jsonb) from public, anon, authenticated;
