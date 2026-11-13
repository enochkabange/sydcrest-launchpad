-- People console and self serve data rights (epic #320, issues #332 and #333).
--
-- 1. Certificates outlive a deleted account, so verification links keep working.
-- 2. profiles.suspended_at: an admin pauses an account (also bans it in Auth).
-- 3. admin_audit_log: every admin lookup, view and action on a member.
-- 4. deletion_requests: a member asks to delete their account; seven days later
--    the daily job deletes the auth user (everything personal cascades).
-- 5. Admin functions: search, account panel, safe actions, audit entries,
--    pending deletions. Member functions: request and cancel deletion. Service
--    functions for the daily job.

-- 1. Certificates survive account deletion ---------------------------------------------
--
-- verify_certificate reads only the certificate row (name on it, programme,
-- cohort), never the profile, so keeping the row with profile_id null keeps
-- every shared verification link answering. Same constraint name, so the
-- generated relationship is unchanged.
alter table public.certificates alter column profile_id drop not null;
alter table public.certificates drop constraint certificates_profile_id_fkey;
alter table public.certificates
  add constraint certificates_profile_id_fkey
  foreign key (profile_id) references public.profiles (id) on delete set null;

comment on column public.certificates.profile_id is
  'The holder. Null once the holder deleted their account: the certificate stays verifiable by its verification id.';

-- 2. Pausing an account ------------------------------------------------------------------

alter table public.profiles
  add column suspended_at timestamptz,
  add column suspended_by uuid references public.profiles (id) on delete set null;

create index profiles_suspended_by_idx on public.profiles (suspended_by);

comment on column public.profiles.suspended_at is
  'Set when an admin paused the account (admin_set_suspended); the Auth user is banned at the same time. Null when active.';

-- 3. Admin audit log ---------------------------------------------------------------------

create table public.admin_audit_log (
  id                uuid primary key default gen_random_uuid(),
  admin_id          uuid references public.profiles (id) on delete set null,
  action            text not null check (action in (
                      'learner_searched', 'learner_viewed', 'confirmation_resent', 'role_changed',
                      'account_paused', 'account_reactivated', 'support_note', 'account_deleted'
                    )),
  target_profile_id uuid references public.profiles (id) on delete set null,
  note              text check (char_length(note) <= 500),
  at                timestamptz not null default now()
);

comment on table public.admin_audit_log is
  'Append only: who (admin_id, null for the daily job) did what to whom and when. Written only by security definer functions; admins read it. Notes about a person are cleared when their account is deleted.';

create index admin_audit_log_target_idx on public.admin_audit_log (target_profile_id, at desc);
create index admin_audit_log_admin_idx on public.admin_audit_log (admin_id);
create index admin_audit_log_at_idx on public.admin_audit_log (at desc);

alter table public.admin_audit_log enable row level security;

create policy "Admins read the audit log"
  on public.admin_audit_log for select
  to authenticated
  using ((select private.is_admin()));

revoke all on public.admin_audit_log from anon, authenticated;
grant select on public.admin_audit_log to authenticated;
grant select, insert on public.admin_audit_log to service_role;

-- Writes one row as the signed in admin.
create function private.audit(p_action text, p_target uuid, p_note text default null)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.admin_audit_log (admin_id, action, target_profile_id, note)
  values ((select auth.uid()), p_action, p_target, nullif(left(trim(coalesce(p_note, '')), 500), ''));
$$;

revoke execute on function private.audit(text, uuid, text) from public;

-- Erasure: when a profile goes, so do the notes written about it. The action
-- rows stay (with target_profile_id set null by the foreign key).
create function private.clear_audit_notes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.admin_audit_log set note = null where target_profile_id = old.id and note is not null;
  return old;
end;
$$;

revoke execute on function private.clear_audit_notes() from public;

create trigger profiles_clear_audit_notes
  before delete on public.profiles
  for each row execute function private.clear_audit_notes();

-- 4. Deletion requests ---------------------------------------------------------------------

create table public.deletion_requests (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid default auth.uid() references public.profiles (id) on delete set null,
  status       text not null default 'pending' check (status in ('pending', 'cancelled', 'completed')),
  requested_at timestamptz not null default now(),
  delete_after timestamptz not null default (now() + interval '7 days'),
  cancelled_at timestamptz,
  completed_at timestamptz,
  last_error   text check (char_length(last_error) <= 200),
  check (status <> 'cancelled' or cancelled_at is not null),
  check (status <> 'completed' or completed_at is not null)
);

comment on table public.deletion_requests is
  'A member asked to delete their account. Pending for seven days (cancel any time), then the daily job deletes the auth user and stamps completed. profile_id is null after deletion; the row is the record that it happened.';

create unique index deletion_requests_one_pending on public.deletion_requests (profile_id) where status = 'pending';
create index deletion_requests_profile_idx on public.deletion_requests (profile_id);
create index deletion_requests_due_idx on public.deletion_requests (delete_after) where status = 'pending';

alter table public.deletion_requests enable row level security;

create policy "Members read their own deletion requests; admins read all"
  on public.deletion_requests for select
  to authenticated
  using (profile_id = (select auth.uid()) or (select private.is_admin()));

revoke all on public.deletion_requests from anon, authenticated;
grant select on public.deletion_requests to authenticated;
grant select, insert, update on public.deletion_requests to service_role;

-- The signed in member asks to delete their account in seven days. Returns
-- the pending request (an existing one is returned unchanged). The only admin
-- cannot delete themselves: appoint another admin first.
create function public.request_account_deletion()
returns public.deletion_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_row public.deletion_requests;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  select * into v_row from public.deletion_requests where profile_id = v_uid and status = 'pending';
  if found then
    return v_row;
  end if;
  if exists (select 1 from public.profiles where id = v_uid and role = 'admin')
     and (select count(*) from public.profiles where role = 'admin') = 1 then
    raise exception 'The only admin cannot delete their account' using errcode = '22023';
  end if;
  insert into public.deletion_requests (profile_id) values (v_uid) returning * into v_row;
  return v_row;
end;
$$;

-- The signed in member keeps their account. True when a pending request was cancelled.
create function public.cancel_account_deletion()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  update public.deletion_requests
     set status = 'cancelled', cancelled_at = now()
   where profile_id = v_uid and status = 'pending';
  return found;
end;
$$;

revoke execute on function public.request_account_deletion() from public, anon;
revoke execute on function public.cancel_account_deletion() from public, anon;
grant execute on function public.request_account_deletion() to authenticated, service_role;
grant execute on function public.cancel_account_deletion() to authenticated, service_role;

-- Daily job (service role): pending requests past their seven days.
create function public.due_deletion_requests(p_limit integer default 50)
returns table (id uuid, profile_id uuid)
language sql
stable
security definer
set search_path = ''
as $$
  select r.id, r.profile_id
    from public.deletion_requests r
   where r.status = 'pending' and r.delete_after <= now() and r.profile_id is not null
   order by r.delete_after
   limit least(greatest(coalesce(p_limit, 50), 1), 500);
$$;

-- Daily job (service role): after the auth user is deleted (p_error null),
-- stamps the request completed and logs it; otherwise records the error and
-- leaves it pending for tomorrow.
create function public.complete_deletion_request(p_id uuid, p_error text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_error is not null then
    update public.deletion_requests set last_error = left(p_error, 200) where id = p_id and status = 'pending';
    return;
  end if;
  update public.deletion_requests
     set status = 'completed', completed_at = now(), last_error = null
   where id = p_id and status = 'pending';
  if found then
    insert into public.admin_audit_log (admin_id, action, target_profile_id, note)
    values (null, 'account_deleted', null, 'Deletion request ' || p_id::text);
  end if;
end;
$$;

revoke execute on function public.due_deletion_requests(integer) from public, anon, authenticated;
revoke execute on function public.complete_deletion_request(uuid, text) from public, anon, authenticated;
grant execute on function public.due_deletion_requests(integer) to service_role;
grant execute on function public.complete_deletion_request(uuid, text) to service_role;

-- 5. Admin functions -------------------------------------------------------------------------

-- Search now finds everyone (a member who joined today has no attributes yet),
-- matches a phone number on its last nine digits, and logs every search.
create or replace function public.admin_learners(p_stage text default null, p_search text default null, p_limit integer default 100)
returns table (
  profile_id uuid, display_name text, region text, role text, joined_on date, stage text,
  last_active_on date, active_days_30 integer, topics_completed integer, on_time_rate numeric,
  first_touch_source text
)
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_search text := nullif(trim(coalesce(p_search, '')), '');
  v_digits text := regexp_replace(coalesce(p_search, ''), '[^0-9]', '', 'g');
  v_phone  text;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if length(v_digits) >= 9 and v_search !~ '[A-Za-z@]' then
    v_phone := right(v_digits, 9);
  end if;
  if v_search is not null then
    perform private.audit('learner_searched', null, v_search);
  end if;
  return query
    select p.id, p.display_name, p.region, p.role, coalesce(la.joined_on, p.created_at::date), la.stage, la.last_active_on,
           la.active_days_30, la.topics_completed, la.on_time_rate, la.first_touch_source
      from public.profiles p
      left join public.learner_attributes la on la.profile_id = p.id
     where (p_stage is null or la.stage = p_stage)
       and (v_search is null
            or p.display_name ilike '%' || replace(replace(v_search, '%', ''), '_', '') || '%'
            or (v_phone is not null and right(regexp_replace(coalesce(p.phone, ''), '[^0-9]', '', 'g'), 9) = v_phone)
            or exists (select 1 from auth.users u where u.id = p.id and lower(u.email) = lower(v_search)))
     order by la.last_active_on desc nulls last, coalesce(la.joined_on, p.created_at::date) desc
     limit least(greatest(coalesce(p_limit, 100), 1), 500);
end;
$$;

-- One member's account for the people console, and a learner_viewed audit
-- row: the panel cannot be read without the view being logged. From
-- auth.users only the email, confirmation and last sign in; never passwords
-- or tokens. Sign in methods come from auth.identities.
create function public.admin_learner_account(p_profile_id uuid)
returns table (
  profile_id uuid, email text, phone text, role text, is_skill_reviewer boolean,
  email_confirmed_at timestamptz, last_sign_in_at timestamptz, providers text[],
  suspended_at timestamptz, deletion_after timestamptz, consents jsonb, memberships jsonb
)
language plpgsql
volatile
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if not exists (select 1 from public.profiles where id = p_profile_id) then
    return;
  end if;
  perform private.audit('learner_viewed', p_profile_id);
  return query
    select p.id, u.email::text, p.phone, p.role, p.is_skill_reviewer,
           u.email_confirmed_at, u.last_sign_in_at,
           coalesce((select array_agg(distinct i.provider order by i.provider) from auth.identities i where i.user_id = p.id), '{}'::text[]),
           p.suspended_at,
           (select r.delete_after from public.deletion_requests r where r.profile_id = p.id and r.status = 'pending'),
           coalesce((select jsonb_agg(jsonb_build_object('kind', c.kind, 'version', c.version, 'granted_at', c.granted_at, 'revoked_at', c.revoked_at)
                                      order by c.granted_at desc)
                       from public.consents c where c.profile_id = p.id), '[]'::jsonb),
           coalesce((select jsonb_agg(m order by m ->> 'at' desc) from (
              select jsonb_build_object('kind', 'cohort', 'label', pr.title || ', ' || co.name, 'role', cm.role, 'status', cm.status, 'at', cm.created_at) as m
                from public.cohort_members cm
                join public.cohorts co on co.id = cm.cohort_id
                join public.programs pr on pr.id = co.program_id
               where cm.profile_id = p.id
              union all
              select jsonb_build_object('kind', 'application', 'label', pr.title || coalesce(', ' || co.name, ''), 'role', null, 'status', ca.status, 'at', ca.created_at)
                from public.cohort_applications ca
                join public.programs pr on pr.id = ca.program_id
                left join public.cohorts co on co.id = coalesce(ca.cohort_id, ca.preferred_cohort_id)
               where ca.profile_id = p.id
              union all
              select jsonb_build_object('kind', 'chapter', 'label', ch.name, 'role', chm.role, 'status', ch.status, 'at', chm.joined_at)
                from public.chapter_members chm
                join public.chapters ch on ch.id = chm.chapter_id
               where chm.profile_id = p.id
           ) x), '[]'::jsonb)
      from public.profiles p
      left join auth.users u on u.id = p.id
     where p.id = p_profile_id;
end;
$$;

-- Fix a role: learner, mentor or admin. Never removes the last admin.
create function public.admin_set_role(p_profile_id uuid, p_role text, p_note text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_old text;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_role is null or p_role not in ('learner', 'mentor', 'admin') then
    raise exception 'Unknown role' using errcode = '22023';
  end if;
  select role into v_old from public.profiles where id = p_profile_id for update;
  if v_old is null then
    raise exception 'Member not found' using errcode = 'P0002';
  end if;
  if v_old = p_role then
    return;
  end if;
  if v_old = 'admin' and (select count(*) from public.profiles where role = 'admin') = 1 then
    raise exception 'The last admin cannot be removed' using errcode = '22023';
  end if;
  update public.profiles set role = p_role where id = p_profile_id;
  perform private.audit('role_changed', p_profile_id, v_old || ' to ' || p_role || coalesce(': ' || nullif(trim(p_note), ''), ''));
end;
$$;

-- Pause (p_suspended true) or reactivate an account. Pausing also bans the
-- Auth user, so sign in and session refresh stop. Admins cannot pause
-- themselves or another admin (change the role first).
create function public.admin_set_suspended(p_profile_id uuid, p_suspended boolean, p_note text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_role text;
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  select role into v_role from public.profiles where id = p_profile_id for update;
  if v_role is null then
    raise exception 'Member not found' using errcode = 'P0002';
  end if;
  if p_suspended and (p_profile_id = (select auth.uid()) or v_role = 'admin') then
    raise exception 'Admins cannot be paused' using errcode = '22023';
  end if;
  if p_suspended then
    update public.profiles set suspended_at = now(), suspended_by = (select auth.uid())
     where id = p_profile_id and suspended_at is null;
    if not found then return; end if;
    -- A far future date rather than infinity, which Auth cannot read.
    update auth.users set banned_until = now() + interval '100 years' where id = p_profile_id;
    perform private.audit('account_paused', p_profile_id, p_note);
  else
    update public.profiles set suspended_at = null, suspended_by = null
     where id = p_profile_id and suspended_at is not null;
    if not found then return; end if;
    update auth.users set banned_until = null where id = p_profile_id;
    perform private.audit('account_reactivated', p_profile_id, p_note);
  end if;
end;
$$;

-- A support note on a member (1 to 500 characters).
create function public.admin_add_support_note(p_profile_id uuid, p_note text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if char_length(trim(coalesce(p_note, ''))) not between 1 and 500 then
    raise exception 'A note is 1 to 500 characters' using errcode = '22023';
  end if;
  if not exists (select 1 from public.profiles where id = p_profile_id) then
    raise exception 'Member not found' using errcode = 'P0002';
  end if;
  perform private.audit('support_note', p_profile_id, p_note);
end;
$$;

-- Server code resent the confirmation email through Auth; this logs it.
create function public.admin_log_confirmation_resent(p_profile_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  perform private.audit('confirmation_resent', p_profile_id);
end;
$$;

-- Audit entries, newest first: one member's (p_profile_id) or everyone's.
create function public.admin_audit_entries(p_profile_id uuid default null, p_limit integer default 100)
returns table (
  id uuid, at timestamptz, action text, note text,
  admin_id uuid, admin_name text, target_profile_id uuid, target_name text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query
    select l.id, l.at, l.action, l.note, l.admin_id, a.display_name, l.target_profile_id, t.display_name
      from public.admin_audit_log l
      left join public.profiles a on a.id = l.admin_id
      left join public.profiles t on t.id = l.target_profile_id
     where p_profile_id is null or l.target_profile_id = p_profile_id
     order by l.at desc
     limit least(greatest(coalesce(p_limit, 100), 1), 500);
end;
$$;

-- Deletion requests, pending first, then the latest others.
create function public.admin_deletion_requests(p_limit integer default 100)
returns table (
  id uuid, profile_id uuid, display_name text, status text,
  requested_at timestamptz, delete_after timestamptz, cancelled_at timestamptz,
  completed_at timestamptz, last_error text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query
    select r.id, r.profile_id, p.display_name, r.status, r.requested_at, r.delete_after,
           r.cancelled_at, r.completed_at, r.last_error
      from public.deletion_requests r
      left join public.profiles p on p.id = r.profile_id
     order by (r.status = 'pending') desc, r.delete_after desc
     limit least(greatest(coalesce(p_limit, 100), 1), 500);
end;
$$;

revoke execute on function public.admin_learner_account(uuid) from public, anon;
revoke execute on function public.admin_set_role(uuid, text, text) from public, anon;
revoke execute on function public.admin_set_suspended(uuid, boolean, text) from public, anon;
revoke execute on function public.admin_add_support_note(uuid, text) from public, anon;
revoke execute on function public.admin_log_confirmation_resent(uuid) from public, anon;
revoke execute on function public.admin_audit_entries(uuid, integer) from public, anon;
revoke execute on function public.admin_deletion_requests(integer) from public, anon;
grant execute on function public.admin_learner_account(uuid) to authenticated, service_role;
grant execute on function public.admin_set_role(uuid, text, text) to authenticated, service_role;
grant execute on function public.admin_set_suspended(uuid, boolean, text) to authenticated, service_role;
grant execute on function public.admin_add_support_note(uuid, text) to authenticated, service_role;
grant execute on function public.admin_log_confirmation_resent(uuid) to authenticated, service_role;
grant execute on function public.admin_audit_entries(uuid, integer) to authenticated, service_role;
grant execute on function public.admin_deletion_requests(integer) to authenticated, service_role;
