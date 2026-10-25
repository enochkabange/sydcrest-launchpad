-- Profiles security check. Run against STAGING in the SQL editor (or via the
-- Supabase MCP). Everything happens in one transaction and is rolled back.
-- Expected: trigger creates both profiles, a user sees 1 row, can set their own
-- region, cannot touch another profile, cannot promote themselves, anon reads nothing.
begin;
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'abdul.rahman@example.test', '{"full_name":"Abdul-Rahman Issah"}', now(), now()),
       ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'mariama@example.test', '{"name":"Mariama Seidu"}', now(), now());
create temp table results(test text, outcome text) on commit drop;
grant all on results to authenticated, anon;
insert into results select 'trigger made profiles', string_agg(display_name || ':' || role, ', ') from public.profiles;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}', true);
insert into results select 'rows visible to Abdul-Rahman (expect 1)', count(*)::text from public.profiles;
update public.profiles set region = 'northern' where id = '11111111-1111-1111-1111-111111111111';
insert into results select 'own region update (expect northern)', region from public.profiles;
update public.profiles set display_name = 'hacked' where id = '22222222-2222-2222-2222-222222222222';
do $$ begin
  begin update public.profiles set role = 'admin' where id = '11111111-1111-1111-1111-111111111111';
        insert into results values ('self-promote to admin', 'ALLOWED (bad)');
  exception when insufficient_privilege then insert into results values ('self-promote to admin', 'blocked'); end;
end $$;
reset role;
insert into results select 'other user untouched (expect Mariama Seidu)', display_name from public.profiles where id = '22222222-2222-2222-2222-222222222222';
set local role anon;
do $$ begin
  begin perform 1 from public.profiles; insert into results values ('anon read', 'ALLOWED (bad)');
  exception when insufficient_privilege then insert into results values ('anon read', 'blocked'); end;
end $$;
reset role;
select * from results;
rollback;
