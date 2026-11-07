-- Error alerts: one per kind of error per hour (#304).
begin;
select plan(7);

select results_eq(
  $$ select send, held_back from public.claim_error_alert('server /x TypeError') $$,
  $$ values (true, 0) $$,
  'the first error of a kind alerts'
);
select results_eq(
  $$ select send, held_back from public.claim_error_alert('server /x TypeError') $$,
  $$ values (false, 1) $$,
  'a repeat inside the hour is held back and counted'
);
select results_eq(
  $$ select send, held_back from public.claim_error_alert('server /x TypeError') $$,
  $$ values (false, 2) $$,
  'and the next one'
);
select results_eq(
  $$ select send, held_back from public.claim_error_alert('client /y Error') $$,
  $$ values (true, 0) $$,
  'another kind of error alerts on its own'
);

-- An hour later, the next one alerts and reports the repeats held back.
update private.error_alerts set last_sent_at = now() - interval '61 minutes' where fingerprint = 'server /x TypeError';
select results_eq(
  $$ select send, held_back from public.claim_error_alert('server /x TypeError') $$,
  $$ values (true, 2) $$,
  'after the hour it alerts again, with the count of repeats'
);

set local role authenticated;
select throws_ok(
  $$ select * from public.claim_error_alert('server /x TypeError') $$,
  '42501', null, 'signed in users cannot call it'
);
reset role;
set local role anon;
select throws_ok(
  $$ select * from public.claim_error_alert('server /x TypeError') $$,
  '42501', null, 'nor can visitors'
);
reset role;

select * from finish();
rollback;
