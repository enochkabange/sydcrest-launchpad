-- Age gate at the Auth layer (issue #240): a date of birth is set once, to a
-- real date at least 18 years ago, and never changed. The Auth server path
-- (session user supabase_auth_admin) is covered end to end by
-- e2e/access-matrix.spec.ts; here the rule itself and the trigger wiring.
begin;
create extension if not exists pgtap with schema extensions;
select plan(11);

select ok(
  not has_function_privilege('authenticated', 'private.check_date_of_birth(jsonb, jsonb)', 'execute')
  and not has_function_privilege('anon', 'private.check_date_of_birth(jsonb, jsonb)', 'execute')
  and not has_function_privilege('authenticated', 'private.guard_auth_date_of_birth()', 'execute'),
  'API roles cannot call the age gate helpers'
);
select ok(
  exists (
    select 1 from pg_trigger
    where tgrelid = 'auth.users'::regclass and tgname = 'guard_date_of_birth' and tgenabled = 'O'
  ),
  'the guard runs on auth.users'
);

select lives_ok(
  $$ select private.check_date_of_birth(null, '{"date_of_birth": "2000-03-14"}') $$,
  'an adult date of birth may be given at sign up'
);
select lives_ok(
  $$ select private.check_date_of_birth(null, '{"full_name": "Wumpini Alhassan"}') $$,
  'no date of birth yet (a Google sign up) is fine'
);
select lives_ok(
  $$ select private.check_date_of_birth('{}', '{"date_of_birth": "1995-01-02"}') $$,
  'the first date of birth on /welcome may be set'
);
select lives_ok(
  $$ select private.check_date_of_birth('{"date_of_birth": "2000-03-14"}',
                                        '{"date_of_birth": "2000-03-14", "terms_version": "v2"}') $$,
  'other metadata may change while the date of birth stays'
);
select throws_ok(
  format($$ select private.check_date_of_birth(null, '{"date_of_birth": "%s"}') $$,
         to_char(now() - interval '16 years', 'YYYY-MM-DD')),
  '42501', 'SydCrest accounts are for people aged 18 and over',
  'a 16 year old cannot sign up through the Auth API'
);
select throws_ok(
  format($$ select private.check_date_of_birth('{}', '{"date_of_birth": "%s"}') $$,
         to_char((now() at time zone 'Africa/Accra')::date - interval '18 years' + interval '1 day', 'YYYY-MM-DD')),
  '42501', 'SydCrest accounts are for people aged 18 and over',
  'someone who turns 18 tomorrow is still refused'
);
select throws_ok(
  $$ select private.check_date_of_birth('{"date_of_birth": "2012-01-01"}', '{"date_of_birth": "1990-01-01"}') $$,
  '42501', 'A date of birth cannot be changed once given',
  'a minor cannot make themselves an adult with updateUser'
);
select throws_ok(
  $$ select private.check_date_of_birth('{"date_of_birth": "2000-03-14"}', '{"terms_version": "v2"}') $$,
  '42501', 'A date of birth cannot be changed once given',
  'the date of birth cannot be removed'
);
select throws_ok(
  $$ select private.check_date_of_birth(null, '{"date_of_birth": "2000-02-30"}') $$,
  '22007', 'Give a real date of birth',
  'an impossible date is refused'
);

select * from finish();
rollback;
