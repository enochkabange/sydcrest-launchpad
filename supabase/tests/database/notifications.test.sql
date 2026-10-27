-- Schema B (issue #158): in app notifications. Recipients read, mark read and
-- delete their own; nobody inserts over the API.
begin;
create extension if not exists pgtap with schema extensions;
select plan(14);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan'),
  ('22222222-2222-2222-2222-222222222222', 'abdul@example.test', 'Abdul-Rahman Issah')
) as u(id, email, name);

select isnt(
  private.notify('11111111-1111-1111-1111-111111111111', 'system', '{"title":"Welcome"}'),
  null, 'database code can notify');
select private.notify('11111111-1111-1111-1111-111111111111', 'cohort', '{"cohort_id":"x"}');
select private.notify('22222222-2222-2222-2222-222222222222', 'system', '{}');

select throws_ok(
  $$ select private.notify('11111111-1111-1111-1111-111111111111', 'made_up', '{}') $$,
  '23514', null, 'kinds come from a fixed list');

-- Signed out
set local role anon;
select throws_ok($$ select * from public.notifications $$, '42501', null, 'anon cannot read notifications');

-- Wumpini
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select is((select count(*)::int from public.notifications), 2, 'a recipient sees only their own notifications');
select throws_ok(
  $$ insert into public.notifications (recipient_id, kind) values ('22222222-2222-2222-2222-222222222222', 'system') $$,
  '42501', null, 'nobody inserts notifications over the API');
select throws_ok(
  $$ select private.notify('22222222-2222-2222-2222-222222222222', 'system', '{}') $$,
  '42501', null, 'learners cannot call the private writer');
select throws_ok(
  $$ select public.notify_user('22222222-2222-2222-2222-222222222222', 'system', '{}') $$,
  '42501', null, 'notify_user is for the service role only');
select throws_ok(
  $$ update public.notifications set payload = '{"title":"forged"}' $$,
  '42501', null, 'the payload cannot be edited');
select lives_ok(
  $$ update public.notifications set read_at = now() where kind = 'system' $$,
  'a recipient marks one read');
select is(public.mark_notifications_read(), 1, 'mark_notifications_read marks the rest and counts them');
select is((select count(*)::int from public.notifications where read_at is null), 0, 'all read now');

-- Abdul-Rahman cannot touch Wumpini's rows
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
delete from public.notifications where recipient_id = '11111111-1111-1111-1111-111111111111';
select is(public.mark_notifications_read(), 1, 'marking read only reaches the caller''s rows');

set local role postgres;
select is(
  (select count(*)::int from public.notifications where recipient_id = '11111111-1111-1111-1111-111111111111'),
  2, 'another person cannot delete someone''s notifications');

set local role service_role;
select isnt(
  public.notify_user('22222222-2222-2222-2222-222222222222', 'booking', '{"booking_id":"b1"}'),
  null, 'server code notifies through notify_user');

select * from finish();
rollback;
