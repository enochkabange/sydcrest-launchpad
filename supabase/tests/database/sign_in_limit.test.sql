-- Sign in limit (issue #225): failed sign ins counted per hashed visitor
-- address and per hashed address and email pair. now() is fixed inside a
-- transaction, so every hit here lands in the same window.
begin;
create extension if not exists pgtap with schema extensions;
select plan(14);

select ok(
  has_function_privilege('anon', 'public.sign_in_allowed(text, text)', 'execute')
  and has_function_privilege('anon', 'public.record_sign_in_failure(text, text)', 'execute')
  and not (select prosecdef from pg_proc where oid = 'public.sign_in_allowed(text, text)'::regprocedure)
  and not (select prosecdef from pg_proc where oid = 'public.record_sign_in_failure(text, text)'::regprocedure),
  'signed out visitors reach the sign in limit through security invoker functions'
);
select ok(
  not has_function_privilege('anon', 'private.rate_limit_room(text, text, integer, interval)', 'execute')
  and not has_function_privilege('authenticated', 'private.rate_limit_room(text, text, integer, interval)', 'execute')
  and not has_function_privilege('anon', 'private.check_sign_in_keys(text, text)', 'execute'),
  'API roles cannot call the private helpers directly'
);

set local role anon;

-- Pair limit: one visitor, one account. Keys: address a, pairs b and c.
select ok(public.sign_in_allowed(repeat('a', 64), repeat('b', 64)), 'a fresh visitor may sign in');
select lives_ok(
  $$ select public.record_sign_in_failure(repeat('a', 64), repeat('b', 64)) from generate_series(1, 4) $$,
  'four failures are recorded');
select ok(public.sign_in_allowed(repeat('a', 64), repeat('b', 64)), 'after four failures the visitor may try again');
select public.record_sign_in_failure(repeat('a', 64), repeat('b', 64));
select ok(not public.sign_in_allowed(repeat('a', 64), repeat('b', 64)),
  'after five failures on one account the visitor is refused for that account');
select ok(public.sign_in_allowed(repeat('a', 64), repeat('c', 64)),
  'the same visitor may still sign in to another account');
select ok(public.sign_in_allowed(repeat('d', 64), repeat('e', 64)),
  'another visitor trying the same account (another pair key) is not refused');

-- Checking does not count: many checks leave the counts alone.
select ok(
  (select bool_and(public.sign_in_allowed(repeat('d', 64), repeat('e', 64))) from generate_series(1, 50)),
  'checking alone never uses up the limit');

-- Address limit: 30 failures across accounts from one address.
select public.record_sign_in_failure(repeat('a', 64), md5(n::text) || md5(n::text)) from generate_series(1, 24) n;
select ok(public.sign_in_allowed(repeat('a', 64), repeat('f', 64)), 'twenty nine failures from one address are fine');
select public.record_sign_in_failure(repeat('a', 64), repeat('f', 64));
select ok(not public.sign_in_allowed(repeat('a', 64), repeat('f', 64)),
  'after thirty failures from one address every account is refused from it');

reset role;
select public.record_sign_in_failure(repeat('a', 64), repeat('9', 64));
select is(
  (select count(*)::int from private.rate_limit_hits where bucket = 'sign_in_address' and subject = repeat('a', 64)), 30,
  'failures past a full bucket are not stored');

-- Hits leave the sliding window.
update private.rate_limit_hits set hit_at = now() - interval '16 minutes' where bucket like 'sign_in_%';
select ok(public.sign_in_allowed(repeat('a', 64), repeat('b', 64)), 'after fifteen minutes the visitor may try again');

select throws_ok($$ select public.sign_in_allowed('not a hash', repeat('b', 64)) $$, '22023', null,
  'keys must be sha256 hashes');

select * from finish();
rollback;
