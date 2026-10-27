-- WhatsApp consent records the number it covers (#127): the database sets it
-- from the profile, learners cannot name another, and a new profile number
-- revokes consent given for the old one.
begin;
create extension if not exists pgtap with schema extensions;
select plan(19);

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'fuseini@example.test', '{"full_name":"Fuseini Abukari"}', now(), now()),
       ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama.w@example.test', '{"full_name":"Mariama Iddrisu"}', now(), now());

select has_column('public', 'consents', 'phone', 'consents has a phone column');
select col_is_null('public', 'consents', 'phone', 'consents.phone is nullable');
select has_column('public', 'consents', 'revoked_reason', 'consents has a revoked_reason column');

-- Act as Fuseini
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);

update public.profiles set phone = '+233241234567' where id = '33333333-3333-3333-3333-333333333333';

select throws_ok(
  $$ insert into public.consents (kind, version, phone) values ('whatsapp', '2026-10', '+233209999999') $$,
  '42501', null, 'a learner cannot name the number a consent covers');
select throws_ok(
  $$ update public.consents set phone = '+233209999999' $$,
  '42501', null, 'a learner cannot change the consented number');
select throws_ok(
  $$ update public.consents set revoked_reason = 'stop' $$,
  '42501', null, 'a learner cannot set the revoke reason');

select lives_ok($$ insert into public.consents (kind, version) values ('whatsapp', '2026-10') $$,
  'a learner opts in to WhatsApp');
select is((select phone from public.consents where kind = 'whatsapp' and revoked_at is null),
  '+233241234567', 'the consent records the profile number');

select lives_ok($$ insert into public.consents (kind, version) values ('terms', '2026-10') $$,
  'a learner records another consent');
select is((select phone from public.consents where kind = 'terms'), null::text, 'only WhatsApp consent carries a number');

-- Saving the same number again keeps the consent.
update public.profiles set phone = '+233241234567', region = 'northern' where id = '33333333-3333-3333-3333-333333333333';
select is((select count(*)::int from public.consents where kind = 'whatsapp' and revoked_at is null), 1,
  'saving the same number keeps the consent');

-- A new number revokes it, and says why.
update public.profiles set phone = '+233501234567' where id = '33333333-3333-3333-3333-333333333333';
select is((select count(*)::int from public.consents where kind = 'whatsapp' and revoked_at is null), 0,
  'a new number revokes WhatsApp consent');
select is((select revoked_reason from public.consents where kind = 'whatsapp'), 'phone_changed',
  'the revoke records that the number changed');
select is((select count(*)::int from public.consents where kind = 'terms' and revoked_at is null), 1,
  'other consents are untouched by a number change');

-- Opting in again covers the new number.
select lives_ok($$ insert into public.consents (kind, version) values ('whatsapp', '2026-10') $$,
  'a learner opts in again for the new number');
select is((select phone from public.consents where kind = 'whatsapp' and revoked_at is null),
  '+233501234567', 'the new consent records the new number');

-- Removing the number revokes it too.
update public.profiles set phone = null where id = '33333333-3333-3333-3333-333333333333';
select is((select count(*)::int from public.consents where kind = 'whatsapp' and revoked_at is null), 0,
  'removing the number revokes WhatsApp consent');
reset role;

-- Database rules hold for direct writes too.
select throws_ok(
  $$ update public.consents set revoked_reason = 'stop' where revoked_at is null and kind = 'terms' $$,
  '23514', null, 'a revoke reason needs a revoked consent');

-- Act as Mariama
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"44444444-4444-4444-4444-444444444444","role":"authenticated"}', true);
select is((select count(*)::int from public.consents), 0, 'others cannot see a learner''s consented number');
reset role;

select * from finish();
rollback;
