-- Age gate at the Auth layer (issue #240, access matrix finding S1).
-- Re-runnable (create or replace, drop trigger if exists): an earlier copy ran
-- on staging as version 20261029170000 before #239 took that version.
--
-- Under 18s are blocked at sign up (AGENTS.md hard constraint), and every
-- adult only rule in RLS (private.is_adult: organisations, expert profiles,
-- bookings, briefs, talent listings) reads the date of birth from
-- auth.users.raw_user_meta_data. That metadata is writable by the signed in
-- user through the public Auth API (`PUT /auth/v1/user`, supabase-js
-- `auth.updateUser({ data })`), and `POST /auth/v1/signup` accepts any
-- metadata, so before this migration:
--   * a user could change their date of birth after sign up with one call,
--     turning every is_adult check true; and
--   * a direct call to the Auth API created an account with an under 18 date
--     of birth, skipping the sign up form's check.
--
-- This trigger runs on every write the Auth server makes to auth.users (it
-- connects as supabase_auth_admin): sign up, updateUser and the admin API.
-- A date of birth may be set once, to a real date at least 18 years ago
-- (Africa/Accra), and never changed or removed afterwards. Direct SQL as
-- postgres (migrations, pgTAP fixtures, a support correction in the SQL
-- editor) is not checked, which is how a genuine typo gets fixed.
--
-- The Google path is unaffected: Google sign ups arrive with no date of
-- birth, and /welcome sets it once (under 18s are signed out before any
-- write, so this never fires for them through the app).

create or replace function private.check_date_of_birth(p_old jsonb, p_new jsonb)
returns void
language plpgsql
stable
set search_path = ''
as $$
declare
  v_old text := p_old ->> 'date_of_birth';
  v_new text := p_new ->> 'date_of_birth';
  v_dob date;
begin
  if v_new is not distinct from v_old then
    return;
  end if;
  if v_old is not null then
    raise exception 'A date of birth cannot be changed once given' using errcode = '42501';
  end if;
  if v_new !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then
    raise exception 'Give a date of birth as YYYY-MM-DD' using errcode = '22007';
  end if;
  begin
    v_dob := v_new::date;
  exception when others then
    raise exception 'Give a real date of birth' using errcode = '22007';
  end;
  if v_dob > ((now() at time zone 'Africa/Accra')::date - interval '18 years')::date then
    raise exception 'SydCrest accounts are for people aged 18 and over' using errcode = '42501';
  end if;
end;
$$;

revoke execute on function private.check_date_of_birth(jsonb, jsonb) from public, anon, authenticated;

create or replace function private.guard_auth_date_of_birth()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- session_user, not current_user: inside a security definer function
  -- current_user is the owner. The Auth server logs in as supabase_auth_admin.
  if session_user <> 'supabase_auth_admin' then
    return new;
  end if;
  perform private.check_date_of_birth(
    case when tg_op = 'UPDATE' then old.raw_user_meta_data end,
    new.raw_user_meta_data
  );
  return new;
end;
$$;

revoke execute on function private.guard_auth_date_of_birth() from public, anon, authenticated;

drop trigger if exists guard_date_of_birth on auth.users; -- allow-destructive: replaces this PR's own trigger if the earlier copy ran on staging (version 20261029170000)
create trigger guard_date_of_birth
  before insert or update of raw_user_meta_data on auth.users
  for each row execute function private.guard_auth_date_of_birth();
