-- Security pass (issue #193): the shared rate limiter, the per person table
-- limits, the waitlist ceiling and the signed out form limiter. now() is fixed
-- inside a transaction, so every hit here lands in the same window.
begin;
create extension if not exists pgtap with schema extensions;
select plan(25);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', '1998-02-02'), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah')
) as u(id, email, name);

-- The counter -------------------------------------------------------------------
select ok(private.take_rate_limit('t', 'a', 2, interval '1 minute'), 'the first hit is allowed');
select ok(private.take_rate_limit('t', 'a', 2, interval '1 minute'), 'the second hit is allowed');
select ok(not private.take_rate_limit('t', 'a', 2, interval '1 minute'), 'the third hit in the window is refused');
select is((select count(*)::int from private.rate_limit_hits where bucket = 't' and subject = 'a'), 2,
  'a refused hit is not recorded');
select ok(private.take_rate_limit('t', 'b', 2, interval '1 minute'), 'another subject has its own count');
select ok(private.take_rate_limit('u', 'a', 2, interval '1 minute'), 'another bucket has its own count');

-- Hits that have left the window no longer count, and are cleared.
update private.rate_limit_hits set hit_at = now() - interval '2 minutes' where bucket = 't' and subject = 'a';
select ok(private.take_rate_limit('t', 'a', 2, interval '1 minute'), 'old hits leave the sliding window');
select is((select count(*)::int from private.rate_limit_hits where bucket = 't' and subject = 'a'), 1,
  'hits outside the window are deleted');
select throws_ok($$ select private.take_rate_limit('t', 'a', 0, interval '1 minute') $$, '22023', null,
  'a limit below one is refused');
select throws_ok($$ select private.take_rate_limit('t', 'a', 5, interval '2 days') $$, '22023', null,
  'a window over a day is refused');

-- Who may call what -------------------------------------------------------------
select ok(
  not has_function_privilege('anon', 'private.take_rate_limit(text, text, integer, interval)', 'execute')
  and not has_function_privilege('authenticated', 'private.take_rate_limit(text, text, integer, interval)', 'execute')
  and not has_table_privilege('authenticated', 'private.rate_limit_hits', 'select')
  and not has_table_privilege('anon', 'private.rate_limit_hits', 'insert'),
  'API roles cannot read the hits or call the counter directly'
);
select ok(
  has_function_privilege('anon', 'public.take_form_rate_limit(text, text)', 'execute')
  and not (select prosecdef from pg_proc where oid = 'public.take_form_rate_limit(text, text)'::regprocedure),
  'signed out forms reach the limiter through a security invoker function'
);

-- Per person limits on tables ---------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.reports (target_type, target_id, reason)
     select 'profile', '22222222-2222-2222-2222-222222222222', 'Spam ' || n from generate_series(1, 20) n $$,
  'twenty reports in an hour are fine');
select throws_ok(
  $$ insert into public.reports (target_type, target_id, reason) values ('profile', '22222222-2222-2222-2222-222222222222', 'One more') $$,
  '54000', 'Slow down', 'the twenty first report in an hour is refused');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select lives_ok(
  $$ insert into public.reports (target_type, target_id, reason) values ('profile', '11111111-1111-1111-1111-111111111111', 'Spam') $$,
  'another person is not affected by that limit');

select lives_ok(
  $$ insert into public.organisations (slug, name)
     select 'shea-' || n, 'Shea ' || n from generate_series(1, 5) n $$,
  'five organisations in a day are fine');
select throws_ok(
  $$ insert into public.organisations (slug, name) values ('shea-6', 'Shea 6') $$,
  '54000', 'Slow down', 'a sixth organisation in a day is refused');

select lives_ok(
  $$ insert into public.outcomes (type, title, organisation_name, started_on)
     select 'job', 'Shea sales assistant ' || n, 'Tamale Shea Collective', current_date from generate_series(1, 20) n $$,
  'twenty outcomes in a day are fine');
select throws_ok(
  $$ insert into public.outcomes (type, title, organisation_name, started_on) values ('job', 'One more', 'Tamale Shea Collective', current_date) $$,
  '54000', 'Slow down', 'a twenty first outcome in a day is refused');

reset role;
select set_config('request.jwt.claims', '', true);

-- Writes with no signed in caller (seeds, the secret key) are not limited.
select lives_ok(
  $$ insert into public.reports (reporter_id, target_type, target_id, reason)
     select '11111111-1111-1111-1111-111111111111', 'profile', 'x', 'Seed ' || n from generate_series(1, 25) n $$,
  'server side writes are not limited');

-- The waitlist ceiling ----------------------------------------------------------
insert into private.rate_limit_hits (bucket, subject) select 'waitlist_all', 'all' from generate_series(1, 300);
set local role anon;
select throws_ok(
  $$ insert into public.waitlist (email, name) values ('mariama.seidu@example.test', 'Mariama Seidu') $$,
  '54000', 'Slow down', 'the waitlist stops taking sign ups past the ceiling');

-- Signed out forms --------------------------------------------------------------
-- Still as anon: the invoker wrapper reaches the private definer.
select is(current_user::text, 'anon', 'the form limiter runs as a signed out visitor');
select ok(
  (select bool_and(public.take_form_rate_limit('sign_up', repeat('a', 64))) from generate_series(1, 30)),
  'thirty sign ups an hour from one address are fine');
select ok(not public.take_form_rate_limit('sign_up', repeat('a', 64)),
  'the thirty first sign up from that address is refused');
select throws_ok($$ select public.take_form_rate_limit('anything', repeat('a', 64)) $$, '22023', null,
  'only the named forms have limits');
reset role;

select * from finish();
rollback;
