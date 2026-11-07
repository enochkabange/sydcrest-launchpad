-- Apply to start and lead a chapter (#301).
begin;
create extension if not exists pgtap with schema extensions;
select plan(21);

-- Wumpini applies for Ho; Sumaila is another member; Mariama is an admin.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
select id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', email,
       jsonb_build_object('full_name', name, 'date_of_birth', dob), now(), now()
from (values
  ('11111111-1111-1111-1111-111111111111', 'wumpini@example.test', 'Wumpini Alhassan', '1999-03-14'),
  ('22222222-2222-2222-2222-222222222222', 'sumaila@example.test', 'Sumaila Iddrisu', '1997-08-02'),
  ('33333333-3333-3333-3333-333333333333', 'mariama@example.test', 'Mariama Seidu', '1990-07-01')
) as u(id, email, name, dob);
update public.profiles set role = 'admin' where id = '33333333-3333-3333-3333-333333333333';

-- Applying ---------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);

select lives_ok(
  $$ insert into public.chapter_applications (town, region, motivation, plan)
     values ('Ho', 'volta', 'Many graduates in Ho want digital skills', 'Monthly meetups at the library, with two friends helping') $$,
  'a member applies as themselves');
select throws_ok(
  $$ insert into public.chapter_applications (town, region, motivation, plan)
     values ('Hohoe', 'volta', 'Another town I would like to serve', 'The same plan, a second time over') $$,
  '23505', null, 'one open application at a time');
select throws_ok(
  $$ insert into public.chapter_applications (profile_id, town, region, motivation, plan)
     values ('22222222-2222-2222-2222-222222222222', 'Keta', 'volta', 'Applying in someone else''s name', 'This should never be allowed in') $$,
  '42501', null, 'nobody applies for someone else');
select throws_ok(
  $$ insert into public.chapter_applications (town, region, motivation, plan) values ('Ho', 'volta', 'too short', 'too short') $$,
  '23514', null, 'the reasons need some substance');
select throws_ok(
  $$ update public.chapter_applications set status = 'approved' $$,
  '42501', null, 'applicants cannot approve themselves');
select throws_ok(
  $$ select public.decide_chapter_application((select id from public.chapter_applications limit 1), 'approved') $$,
  '42501', null, 'nor through the admin function');

select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
select is((select count(*)::int from public.chapter_applications), 0, 'other members cannot see the application');
select is((select count(*)::int from public.chapter_application_queue), 0, 'nor the admin queue');

-- Deciding ---------------------------------------------------------------------
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select is((select count(*)::int from public.chapter_applications where status = 'submitted'), 1, 'the admin sees it in the queue');
select is((select display_name from public.chapter_application_queue), 'Wumpini Alhassan', 'with the applicant''s name');
select throws_ok(
  $$ select public.decide_chapter_application((select id from public.chapter_applications limit 1), 'approved', 'start') $$,
  '23514', null, 'the start address is reserved for the Start a chapter page');

select lives_ok(
  $$ select public.decide_chapter_application((select id from public.chapter_applications limit 1), 'approved') $$,
  'the admin approves');
select is((select status from public.chapters where slug = 'ho'), 'launching', 'the chapter opens, ready to join');
select is((select region || ' ' || city || ' ' || name from public.chapters where slug = 'ho'), 'volta Ho Ho chapter',
  'with the town, region and a name from the town');
select is(
  (select role from public.chapter_members m join public.chapters c on c.id = m.chapter_id
    where c.slug = 'ho' and m.profile_id = '11111111-1111-1111-1111-111111111111'),
  'lead', 'the applicant leads it');
select is((select chapter_id is not null from public.chapter_applications limit 1), true, 'the application points at the chapter');
select throws_ok(
  $$ select public.decide_chapter_application((select id from public.chapter_applications limit 1), 'declined') $$,
  'P0002', null, 'a decided application cannot be decided again');

reset role;
select is(
  (select payload->>'href' from public.notifications where recipient_id = '11111111-1111-1111-1111-111111111111'),
  '/chapters/ho', 'the applicant is told, with a link to the chapter');

-- Declining ------------------------------------------------------------------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}', true);
insert into public.chapter_applications (town, region, motivation, plan)
values ('Keta', 'volta', 'Fishing families in Keta want online selling', 'Saturday sessions at my church hall');
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}', true);
select lives_ok(
  $$ select public.decide_chapter_application((select id from public.chapter_applications where town = 'Keta'), 'declined', null, null,
       'Ho is close by. Please help lead it first.') $$,
  'the admin declines with a note');
reset role;
select is(
  (select payload->>'body' from public.notifications where recipient_id = '22222222-2222-2222-2222-222222222222'),
  'Ho is close by. Please help lead it first.', 'the applicant reads the note');
select is((select count(*)::int from public.chapters where slug = 'keta'), 0, 'and no chapter was made');

select * from finish();
rollback;
