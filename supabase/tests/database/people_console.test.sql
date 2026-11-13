-- People console and self serve data rights (epic #320, issues #332 and #333).
begin;
create extension if not exists pgtap with schema extensions;
select plan(44);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email, jsonb_build_object('full_name', name), now(), now()
  from (values
    ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
    ('22222222-2222-2222-2222-222222222222', 'mariama@example.test', 'Mariama Seidu'),
    ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama')) v(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';
update public.profiles set phone = '+233241234567' where id = '11111111-1111-1111-1111-111111111111';
insert into public.consents (profile_id, kind, version) values
  ('11111111-1111-1111-1111-111111111111', 'terms', '2026-10-01'),
  ('11111111-1111-1111-1111-111111111111', 'privacy', '2026-10-01');

-- A certificate held by Mariama, to check it survives her account.
insert into public.programs (id, slug, title, duration_weeks) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'people-console-test', 'Data Analyst Launchpad', 8);
insert into public.certificates (id, verification_id, profile_id, program_id, recipient_name, program_title) values
  ('cccccccc-0000-0000-0000-000000000001', 'abcdefabcdefabcdefabcdefabcdef01', '22222222-2222-2222-2222-222222222222',
   'aaaaaaaa-0000-0000-0000-000000000001', 'Mariama Seidu', 'Data Analyst Launchpad');

-- Shape ---------------------------------------------------------------------------------

select has_table('public', 'admin_audit_log', 'the audit log exists');
select has_table('public', 'deletion_requests', 'deletion requests exist');
select ok((select relrowsecurity from pg_class where oid = 'public.admin_audit_log'::regclass), 'the audit log has RLS');
select ok((select relrowsecurity from pg_class where oid = 'public.deletion_requests'::regclass), 'deletion requests have RLS');
select col_is_null('public', 'certificates', 'profile_id', 'a certificate may outlive its holder');
select ok(
  not has_function_privilege('authenticated', 'public.due_deletion_requests(integer)', 'execute')
  and not has_function_privilege('authenticated', 'public.complete_deletion_request(uuid, text)', 'execute')
  and has_function_privilege('service_role', 'public.complete_deletion_request(uuid, text)', 'execute'),
  'only the daily job finds and completes deletions');
select ok(
  not has_function_privilege('anon', 'public.request_account_deletion()', 'execute')
  and not has_function_privilege('anon', 'public.admin_learner_account(uuid)', 'execute'),
  'visitors cannot call the new functions');

-- A member ------------------------------------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok($$ select * from public.admin_learner_account('22222222-2222-2222-2222-222222222222') $$, '42501', null, 'a member cannot open an account');
select throws_ok($$ select public.admin_set_role('22222222-2222-2222-2222-222222222222', 'admin') $$, '42501', null, 'or change a role');
select throws_ok($$ select public.admin_set_suspended('22222222-2222-2222-2222-222222222222', true) $$, '42501', null, 'or pause an account');
select throws_ok($$ select public.admin_add_support_note('22222222-2222-2222-2222-222222222222', 'hi') $$, '42501', null, 'or write a note');
select throws_ok($$ select public.admin_log_confirmation_resent('22222222-2222-2222-2222-222222222222') $$, '42501', null, 'or log a resend');
select throws_ok($$ select * from public.admin_audit_entries() $$, '42501', null, 'or read audit entries');
select throws_ok($$ select * from public.admin_deletion_requests() $$, '42501', null, 'or list deletion requests');
select is((select count(*)::int from public.admin_audit_log), 0, 'and sees no audit rows');
select throws_ok(
  $$ insert into public.admin_audit_log (action, target_profile_id) values ('support_note', '22222222-2222-2222-2222-222222222222') $$,
  '42501', null, 'nobody writes the audit log directly');

select is((public.request_account_deletion()).status, 'pending', 'a member asks to delete their account');
select ok(
  (select delete_after between now() + interval '7 days' - interval '1 minute' and now() + interval '7 days' + interval '1 minute'
     from public.deletion_requests where status = 'pending'),
  'with seven days to change their mind');
select is((select count(*)::int from public.deletion_requests), 1, 'and reads their own request');
select is(
  (public.request_account_deletion()).id,
  (select id from public.deletion_requests where status = 'pending'),
  'asking twice keeps the one pending request');
select ok(public.cancel_account_deletion(), 'they cancel');
select is((select status from public.deletion_requests), 'cancelled', 'the request is cancelled');
select ok(not public.cancel_account_deletion(), 'cancelling again changes nothing');
select throws_ok($$ update public.deletion_requests set status = 'pending' $$, '42501', null, 'members cannot edit a request directly');
select is((public.request_account_deletion()).status, 'pending', 'and can ask again later');

-- An admin ------------------------------------------------------------------------------

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.admin_learners(null, '0241234567')), 1, 'an admin finds a member by phone');
select is(
  (select count(*)::int from public.admin_audit_log where action = 'learner_searched' and note = '0241234567'),
  1, 'and the search is logged');
select results_eq(
  $$ select email, providers, jsonb_array_length(consents), deletion_after is not null
       from public.admin_learner_account('11111111-1111-1111-1111-111111111111') $$,
  $$ values ('wumpini@example.test'::text, '{}'::text[], 2, true) $$,
  'the account panel: email, sign in methods, consents and a pending deletion');
select is(
  (select count(*)::int from public.admin_audit_log where action = 'learner_viewed' and target_profile_id = '11111111-1111-1111-1111-111111111111'),
  1, 'opening the account is logged');

select lives_ok($$ select public.admin_add_support_note('11111111-1111-1111-1111-111111111111', 'Asked about the Tamale cohort') $$, 'an admin writes a support note');
select throws_ok($$ select public.admin_add_support_note('11111111-1111-1111-1111-111111111111', '   ') $$, '22023', null, 'an empty note is refused');
select lives_ok($$ select public.admin_set_role('22222222-2222-2222-2222-222222222222', 'mentor', 'Mentor for Tamale') $$, 'an admin fixes a role');
select throws_ok($$ select public.admin_set_role('22222222-2222-2222-2222-222222222222', 'owner') $$, '22023', null, 'only to a known role');
select throws_ok($$ select public.admin_set_role('44444444-4444-4444-4444-444444444444', 'learner') $$, '22023', null, 'the last admin cannot be removed');
select throws_ok($$ select public.admin_set_suspended('44444444-4444-4444-4444-444444444444', true) $$, '22023', null, 'admins cannot pause themselves');

select lives_ok($$ select public.admin_set_suspended('22222222-2222-2222-2222-222222222222', true, 'Spam') $$, 'an admin pauses an account');
reset role;
select ok(
  (select banned_until > now() + interval '50 years' from auth.users where id = '22222222-2222-2222-2222-222222222222')
  and (select suspended_at is not null from public.profiles where id = '22222222-2222-2222-2222-222222222222'),
  'pausing flags the profile and bans the Auth user');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select lives_ok($$ select public.admin_set_suspended('22222222-2222-2222-2222-222222222222', false) $$, 'and reactivates it');
select results_eq(
  $$ select action, admin_name from public.admin_audit_entries('22222222-2222-2222-2222-222222222222') order by at, action $$,
  $$ values ('account_paused'::text, 'Fuseini Mahama'::text), ('account_reactivated', 'Fuseini Mahama'), ('role_changed', 'Fuseini Mahama') $$,
  'every action on a member is in their audit trail');
reset role;

-- The daily job -------------------------------------------------------------------------

update public.deletion_requests set delete_after = now() - interval '1 minute' where status = 'pending';
insert into public.deletion_requests (profile_id, delete_after) values ('22222222-2222-2222-2222-222222222222', now() - interval '1 minute');
select is((select count(*)::int from public.due_deletion_requests()), 2, 'the job finds requests past their seven days');

-- What the job does after the Auth API deletes the user.
delete from auth.users where id = '22222222-2222-2222-2222-222222222222';
select lives_ok(
  $$ select public.complete_deletion_request(id) from public.deletion_requests where profile_id is null and status = 'pending' $$,
  'the job stamps the request');
select results_eq(
  $$ select c.profile_id, v.recipient_name from public.verify_certificate('abcdefabcdefabcdefabcdefabcdef01') v join public.certificates c using (verification_id) $$,
  $$ values (null::uuid, 'Mariama Seidu'::text) $$,
  'the certificate still verifies after its holder is deleted');
select results_eq(
  $$ select status, profile_id from public.deletion_requests where completed_at is not null $$,
  $$ values ('completed'::text, null::uuid) $$,
  'the request is the record that the account was deleted');
select ok(
  exists (select 1 from public.admin_audit_log where action = 'account_deleted' and admin_id is null)
  and not exists (select 1 from public.admin_audit_log where target_profile_id = '22222222-2222-2222-2222-222222222222'),
  'the deletion is logged and the trail no longer points at the person');

select * from finish();
rollback;
