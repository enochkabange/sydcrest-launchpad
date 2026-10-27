-- Study Buddy reservation and token logging (#69, #124). The route reserves a
-- turn with record_ai_usage(0, 0) before streaming, then adds the tokens with
-- record_ai_tokens, which must never count a second message.
begin;
create extension if not exists pgtap with schema extensions;
select plan(10);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Iddrisu"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'abdul-rahman@example.test', '{"full_name":"Abdul-Rahman Mahama"}', now(), now());

select ok(
  not has_function_privilege('anon', 'public.record_ai_tokens(bigint, bigint)', 'execute'),
  'signed out visitors cannot record tokens');
select ok(
  has_function_privilege('authenticated', 'public.record_ai_tokens(bigint, bigint)', 'execute'),
  'learners can record their own tokens');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);

select is(
  (select (public.record_ai_usage(0, 0)).messages),
  1,
  'reserving a turn counts the message before any tokens are known');
select is(
  (select (public.record_ai_usage(0, 0)).messages),
  2,
  'each reservation returns the count after it, so the caller can tell if it is over the cap');
select results_eq(
  $$ select (u).messages, (u).input_tokens, (u).output_tokens from (select public.record_ai_tokens(900, 120) as u) s $$,
  $$ values (2, 900::bigint, 120::bigint) $$,
  'tokens are added without counting another message');
select results_eq(
  $$ select (u).messages, (u).input_tokens, (u).output_tokens from (select public.record_ai_tokens(100, 30) as u) s $$,
  $$ values (2, 1000::bigint, 150::bigint) $$,
  'tokens accumulate');
select throws_ok($$ select public.record_ai_tokens(-1, 0) $$, '22023', null, 'token counts cannot be lowered');
select throws_ok($$ select public.record_ai_tokens(0, null) $$, '22023', null, 'token counts must be given');

-- Tokens for a turn reserved just before midnight start the new day at zero messages.
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is(
  (select (public.record_ai_tokens(10, 5)).messages),
  0,
  'tokens alone never use up the daily allowance');
select is(
  (select count(*)::int from public.ai_usage),
  1,
  'a learner still sees only their own usage');
reset role;

select * from finish();
rollback;
