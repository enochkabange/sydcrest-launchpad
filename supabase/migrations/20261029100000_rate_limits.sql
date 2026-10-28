-- Security pass (issue #193): one rate limiter for every abuse prone write.
--
-- A sliding window counter in Postgres, so it holds for the app, for direct
-- API calls and for parallel requests alike:
--
--   private.rate_limit_hits      one row per counted write (bucket, subject, time)
--   private.take_rate_limit()    counts the subject's hits in the window and
--                                records a new one if there is room
--   private.rate_limit_insert()  a BEFORE INSERT trigger keyed by auth.uid(),
--                                configured per table with trigger arguments
--   public.take_form_rate_limit  for signed out forms (waitlist, sign up),
--                                keyed by a hash of the visitor's address
--
-- A refused write raises 54000 (program_limit_exceeded) with 'Slow down', the
-- same code the community feed trigger already uses, so the app maps one
-- code to one plain message. A hit is written in the same transaction as the
-- write it counts, so a write that fails for any other reason is not counted.
--
-- Limits are generous on purpose: many learners share one address behind a
-- mobile network or a venue's WiFi at a Skillshop, so the address limits only
-- stop scripted floods, and the per person limits sit well above real use.

-- Hits ----------------------------------------------------------------------------

create table private.rate_limit_hits (
  id      bigint generated always as identity primary key,
  bucket  text not null check (char_length(bucket) between 1 and 60),
  subject text not null check (char_length(subject) between 1 and 100),
  hit_at  timestamptz not null default now()
);

comment on table private.rate_limit_hits is
  'Rate limiter hits. Subject is a profile id, a sha256 of a visitor address, or ''all'' for a global ceiling. Rows older than two days are purged as new hits arrive.';

create index rate_limit_hits_lookup_idx on private.rate_limit_hits (bucket, subject, hit_at);
create index rate_limit_hits_age_idx on private.rate_limit_hits (hit_at);

alter table private.rate_limit_hits enable row level security;
-- No policies: only the definer functions below read and write it.
revoke all on private.rate_limit_hits from public, anon, authenticated;
grant select, insert, delete on private.rate_limit_hits to service_role;

-- The counter ---------------------------------------------------------------------

-- True and a hit recorded when the subject has fewer than p_max hits in the
-- last p_window; false and nothing recorded otherwise. The advisory lock makes
-- parallel requests for one subject queue, so they cannot all slip under the
-- limit together.
create function private.take_rate_limit(p_bucket text, p_subject text, p_max integer, p_window interval)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_used integer;
begin
  if p_bucket is null or p_subject is null or p_max is null or p_max < 1
     or p_window is null or p_window <= interval '0' or p_window > interval '1 day' then
    raise exception 'Bad rate limit' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_bucket || ':' || p_subject, 0));

  -- Old hits for everyone (cheap with the age index) and this subject's
  -- hits that have left the window.
  delete from private.rate_limit_hits where hit_at < now() - interval '2 days'; -- allow-destructive: expired limiter hits only
  delete from private.rate_limit_hits -- allow-destructive: this subject's hits outside the window
   where bucket = p_bucket and subject = p_subject and hit_at <= now() - p_window;

  select count(*) into v_used from private.rate_limit_hits
   where bucket = p_bucket and subject = p_subject;
  if v_used >= p_max then
    return false;
  end if;

  insert into private.rate_limit_hits (bucket, subject) values (p_bucket, p_subject);
  return true;
end;
$$;

revoke execute on function private.take_rate_limit(text, text, integer, interval) from public, anon, authenticated;
grant execute on function private.take_rate_limit(text, text, integer, interval) to service_role;

-- Per person limits on tables -----------------------------------------------------

-- Trigger arguments: bucket, max hits, window in seconds. Keyed by the signed
-- in caller. Writes with no caller (the secret key, seeds, migrations) are not
-- limited.
create function private.rate_limit_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    return new;
  end if;
  if not private.take_rate_limit(tg_argv[0], v_uid::text, tg_argv[1]::integer,
                                 make_interval(secs => tg_argv[2]::integer)) then
    raise exception 'Slow down' using errcode = '54000';
  end if;
  return new;
end;
$$;

revoke execute on function private.rate_limit_insert() from public, anon, authenticated;

-- Reports: 20 an hour.
create trigger reports_rate_limit
  before insert on public.reports
  for each row execute function private.rate_limit_insert('reports', '20', '3600');

-- Briefs: 10 a day.
create trigger briefs_rate_limit
  before insert on public.briefs
  for each row execute function private.rate_limit_insert('briefs', '10', '86400');

-- Pitches: 30 a day (one per brief already).
create trigger pitches_rate_limit
  before insert on public.pitches
  for each row execute function private.rate_limit_insert('pitches', '30', '86400');

-- Booking requests: 20 a day (one open per expert already).
create trigger booking_requests_rate_limit
  before insert on public.booking_requests
  for each row execute function private.rate_limit_insert('booking_requests', '20', '86400');

-- Booking messages: 120 an hour.
create trigger booking_messages_rate_limit
  before insert on public.booking_messages
  for each row execute function private.rate_limit_insert('booking_messages', '120', '3600');

-- Talent contact requests: 30 a day (one pending per learner already).
create trigger talent_contact_requests_rate_limit
  before insert on public.talent_contact_requests
  for each row execute function private.rate_limit_insert('talent_contact_requests', '30', '86400');

-- New organisations: 5 a day.
create trigger organisations_rate_limit
  before insert on public.organisations
  for each row execute function private.rate_limit_insert('organisations', '5', '86400');

-- Reported outcomes: 20 a day.
create trigger outcomes_rate_limit
  before insert on public.outcomes
  for each row execute function private.rate_limit_insert('outcomes', '20', '86400');

-- RSVPs: 30 an hour. Insert only: rsvp_event always reaches the insert (an
-- upsert fires BEFORE INSERT triggers), while cancel_rsvp and the waitlist
-- promotion update rows and are not charged to whoever triggered them.
create trigger event_rsvps_rate_limit
  before insert on public.event_rsvps
  for each row execute function private.rate_limit_insert('event_rsvps', '30', '3600');

-- Waitlist ceiling ----------------------------------------------------------------

-- The waitlist takes inserts from anyone, so no per person key exists in the
-- database. The form limits each address (take_form_rate_limit below); this
-- ceiling bounds what any caller, the form or the API directly, can add.
create function private.waitlist_ceiling()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.take_rate_limit('waitlist_all', 'all', 300, interval '10 minutes') then
    raise exception 'Slow down' using errcode = '54000';
  end if;
  return new;
end;
$$;

revoke execute on function private.waitlist_ceiling() from public, anon, authenticated;

create trigger waitlist_ceiling
  before insert on public.waitlist
  for each row execute function private.waitlist_ceiling();

-- Signed out forms ------------------------------------------------------------------

-- p_key is a sha256 (64 hex characters) of the visitor's address, made by the
-- server action. Only the named buckets exist, each with its fixed limit, so a
-- caller cannot choose a looser one. Returns false when the address is over
-- the limit. Someone who skips the form and calls the API can choose another
-- key: this guards the forms, and the waitlist ceiling and Supabase Auth's own
-- per address limits cover direct calls.
create function private.take_form_rate_limit(p_bucket text, p_key text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_key is null or p_key !~ '^[0-9a-f]{64}$' then
    raise exception 'Bad key' using errcode = '22023';
  end if;
  return case p_bucket
    when 'waitlist' then private.take_rate_limit('form_waitlist', p_key, 20, interval '1 hour')
    when 'sign_up'  then private.take_rate_limit('form_sign_up', p_key, 30, interval '1 hour')
    else null
  end;
end;
$$;

revoke execute on function private.take_form_rate_limit(text, text) from public;
grant execute on function private.take_form_rate_limit(text, text) to anon, authenticated, service_role;

-- The exposed entry point is security invoker (signed out visitors may not
-- run a definer in public); the definer part stays in private, as with
-- verify_certificate.
create function public.take_form_rate_limit(p_bucket text, p_key text)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_ok boolean := private.take_form_rate_limit(p_bucket, p_key);
begin
  if v_ok is null then
    raise exception 'Unknown form' using errcode = '22023';
  end if;
  return v_ok;
end;
$$;

comment on function public.take_form_rate_limit(text, text) is
  'Counts one submission of a signed out form (waitlist, sign_up) for a hashed visitor address. False when that address is over the limit.';

revoke execute on function public.take_form_rate_limit(text, text) from public;
grant execute on function public.take_form_rate_limit(text, text) to anon, authenticated, service_role;
