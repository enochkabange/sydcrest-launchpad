-- Credentials wallet (issue #253): who reads and writes external
-- credentials, the issuer verification that only the secret key records,
-- moderation, the two rate limits, the storage bucket and the talent view.
begin;
create extension if not exists pgtap with schema extensions;
select plan(35);

-- Wumpini owns the credentials; Abdul-Rahman is another learner; Fuseini is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', '1998-03-14'), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah'),
  ('44444444-4444-4444-4444-444444444444', 'fuseini@example.test', 'Fuseini Mahama')
) as u(id, email, name);
update public.profiles set role = 'admin' where id = '44444444-4444-4444-4444-444444444444';

select ok((select relrowsecurity from pg_class where oid = 'public.external_credentials'::regclass),
  'external credentials have row level security');

-- The owner --------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.external_credentials (title, issuer_name, issued_on, verification_url)
     values ('Data Analytics', 'Google', '2026-05-01', 'https://example.test/c/1') $$,
  'a learner adds a credential');
-- A known id for the rest of the test.
reset role;
update public.external_credentials set id = 'c0000000-0000-0000-0000-000000000001' where title = 'Data Analytics';
set local role authenticated;
select is((select visibility from public.external_credentials where id = 'c0000000-0000-0000-0000-000000000001'),
  'private', 'a new credential is private');
select is((select verification from public.external_credentials where id = 'c0000000-0000-0000-0000-000000000001'),
  'learner', 'a new credential is the learner''s word');
select throws_ok(
  $$ insert into public.external_credentials (title, issuer_name, verification) values ('Fake', 'Somewhere', 'issuer') $$,
  '42501', null, 'a learner cannot insert an issuer verification');
select throws_ok(
  $$ update public.external_credentials set verification = 'issuer', verified_at = now() where id = 'c0000000-0000-0000-0000-000000000001' $$,
  '42501', null, 'a learner cannot mark a credential verified');
select throws_ok(
  $$ update public.external_credentials set hidden_at = null where id = 'c0000000-0000-0000-0000-000000000001' $$,
  '42501', null, 'a learner cannot write moderation columns');
select throws_ok(
  $$ insert into public.external_credentials (profile_id, title, issuer_name)
     values ('22222222-2222-2222-2222-222222222222', 'Not mine', 'Nobody') $$,
  '42501', null, 'a learner cannot add a credential for someone else');
select throws_ok(
  $$ insert into public.external_credentials (title, issuer_name, file_path)
     values ('Theirs', 'Nobody', '22222222-2222-2222-2222-222222222222/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa.pdf') $$,
  '23514', null, 'a file must sit in the owner''s own folder');
select throws_ok(
  $$ insert into public.external_credentials (title, issuer_name, verification_url) values ('Plain', 'Nobody', 'http://example.test') $$,
  '23514', null, 'a verification link must be https');
select throws_ok(
  $$ insert into public.external_credentials (title, issuer_name, issued_on, expires_on) values ('Dates', 'Nobody', '2026-05-01', '2026-01-01') $$,
  '23514', null, 'a credential cannot expire before it was issued');

select lives_ok(
  $$ update public.external_credentials set visibility = 'public' where id = 'c0000000-0000-0000-0000-000000000001' $$,
  'the owner makes it public');

-- Public reads ------------------------------------------------------------------
set local role anon;
select is((select count(*)::int from public.external_credentials), 0,
  'a public credential of a private profile is not visible');

reset role;
update public.profiles set is_public = true, public_slug = 'wumpini-alhassan' where id = '11111111-1111-1111-1111-111111111111';
insert into public.external_credentials (id, profile_id, title, issuer_name)
values ('c0000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Private one', 'Coursera');

set local role anon;
select results_eq($$ select id from public.external_credentials $$,
  $$ values ('c0000000-0000-0000-0000-000000000001'::uuid) $$,
  'anyone reads public credentials of a public profile, never private ones');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.external_credentials), 1, 'another learner sees only the public credential');
update public.external_credentials set title = 'Changed' where id = 'c0000000-0000-0000-0000-000000000001';
delete from public.external_credentials where id = 'c0000000-0000-0000-0000-000000000001';
reset role;
select is((select title from public.external_credentials where id = 'c0000000-0000-0000-0000-000000000001'),
  'Data Analytics', 'another learner cannot edit or delete it');

-- Issuer verification -----------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ select public.record_credential_import('c0000000-0000-0000-0000-000000000001', '3.0', true, 'ob3_jwt', 'ok', null) $$,
  '42501', null, 'a learner cannot record an issuer check');

reset role;
set local role service_role;
select lives_ok(
  $$ select public.record_credential_import('c0000000-0000-0000-0000-000000000001', '3.0', true, 'ob3_jwt',
       'The issuer''s signature checked out.', '{"type":["OpenBadgeCredential"]}'::jsonb) $$,
  'the server records a passed issuer check with the secret key');
reset role;
select results_eq(
  $$ select verification, verification_method, source, verified_at is not null from public.external_credentials
     where id = 'c0000000-0000-0000-0000-000000000001' $$,
  $$ values ('issuer', 'ob3_jwt', 'open_badges', true) $$,
  'the credential reads as verified by the issuer');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
update public.external_credentials set visibility = 'public' where id = 'c0000000-0000-0000-0000-000000000001';
select is((select verification from public.external_credentials where id = 'c0000000-0000-0000-0000-000000000001'),
  'issuer', 'changing only who sees it keeps the issuer check');
update public.external_credentials set title = 'Data Analytics Professional' where id = 'c0000000-0000-0000-0000-000000000001';
select results_eq(
  $$ select verification, verified_at from public.external_credentials where id = 'c0000000-0000-0000-0000-000000000001' $$,
  $$ values ('learner'::text, null::timestamptz) $$,
  'editing what it says makes it the learner''s word again');

-- Moderation --------------------------------------------------------------------
select throws_ok(
  $$ select public.admin_set_credential_hidden('c0000000-0000-0000-0000-000000000001', true) $$,
  '42501', null, 'learners cannot hide credentials');
select lives_ok(
  $$ insert into public.reports (target_type, target_id, reason) values ('external_credential', 'c0000000-0000-0000-0000-000000000001', 'Fake') $$,
  'people can report a credential');

select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.external_credentials), 2, 'admins read every credential');
select lives_ok(
  $$ select public.admin_set_credential_hidden('c0000000-0000-0000-0000-000000000001', true) $$,
  'an admin hides a credential');

set local role anon;
select is((select count(*)::int from public.external_credentials), 0, 'a hidden credential leaves public view');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ update public.external_credentials set visibility = 'public' where id = 'c0000000-0000-0000-0000-000000000001' $$,
  '42501', 'This credential was hidden by our team', 'the owner cannot make a hidden credential public again');

-- Rate limits -------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.external_credentials (title, issuer_name) select 'Course ' || n, 'Alison' from generate_series(1, 30) n $$,
  'thirty credentials in a day are fine');
select throws_ok(
  $$ insert into public.external_credentials (title, issuer_name) values ('One more', 'Alison') $$,
  '54000', 'Slow down', 'the thirty first in a day is refused');
select is(
  (select count(*)::int from generate_series(1, 21) n where public.take_credential_import_limit()), 20,
  'twenty Open Badge imports an hour, then refused');

set local role anon;
select throws_ok($$ select public.take_credential_import_limit() $$, '42501', null,
  'signed out visitors cannot import');

-- Storage -----------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner_id) values ('credentials', '22222222-2222-2222-2222-222222222222/x.pdf', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'nobody uploads into another learner''s folder');
select lives_ok(
  $$ insert into storage.objects (bucket_id, name, owner_id)
     select 'credentials', '11111111-1111-1111-1111-111111111111/' || gen_random_uuid() || '.pdf', '11111111-1111-1111-1111-111111111111'
     from generate_series(1, 30) $$,
  'thirty uploads a day are fine');
select throws_ok(
  $$ insert into storage.objects (bucket_id, name, owner_id) values ('credentials', '11111111-1111-1111-1111-111111111111/late.pdf', '11111111-1111-1111-1111-111111111111') $$,
  '42501', null, 'the thirty first upload in a day is refused');

-- Talent directory --------------------------------------------------------------
reset role;
select is(
  (select jsonb_agg(e ->> 'title' order by e ->> 'title') from jsonb_array_elements(private.external_credentials_json('22222222-2222-2222-2222-222222222222')) e),
  null, 'the talent view shows no private credentials');

select * from finish();
rollback;
