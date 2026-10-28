-- Sign in limit (issue #225). Sign in is a Server Action, so Supabase Auth
-- sees this server's address for every visitor: its own per address limit is
-- shared by everyone and does not slow one visitor guessing passwords. These
-- functions count FAILED sign ins per visitor on the existing limiter table
-- (private.rate_limit_hits). Successful sign ins are never counted.
--
--   public.sign_in_allowed(address_key, pair_key)        checked before
--                                                         asking Supabase
--   public.record_sign_in_failure(address_key, pair_key)  after a refusal
--
-- Both keys are sha256 hashes made by the server action, so the database
-- never sees an address or an email:
--
--   sign_in_address  the visitor's address. 30 failures in 15 minutes.
--                    Many learners share one address behind a mobile network
--                    (carrier NAT) or a venue's WiFi at a Skillshop, and a
--                    room of thirty people mistyping a password must not lock
--                    the room out. It stops one visitor spraying guesses
--                    across many accounts.
--   sign_in_pair     the visitor's address together with the email they
--                    typed. 5 failures in 15 minutes. It stops one visitor
--                    guessing one account's password, and because the address
--                    is part of the key, failures from anyone elsewhere never
--                    block the account's owner: only the shared address limit
--                    can.
--
-- Trade offs, on purpose:
-- - A guess spread over many addresses against one account is not slowed
--   here; Supabase Auth's own limits stand behind it (and Turnstile is the
--   next step if that is ever seen).
-- - Check and record are separate calls, so a burst of parallel requests can
--   slip a few failures past the limit before the hits land. Fine for this
--   threat model: the burst is bounded and the next round is refused.
-- - Anyone can call record_sign_in_failure with any key. That gives nothing a
--   failed sign in through the form does not already give, and with the
--   address inside the pair key it cannot lock out someone else's account.

-- Room in a bucket without taking a hit.
create function private.rate_limit_room(p_bucket text, p_subject text, p_max integer, p_window interval)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select count(*) < p_max from private.rate_limit_hits
   where bucket = p_bucket and subject = p_subject and hit_at > now() - p_window;
$$;

revoke execute on function private.rate_limit_room(text, text, integer, interval) from public, anon, authenticated;
grant execute on function private.rate_limit_room(text, text, integer, interval) to service_role;

create function private.check_sign_in_keys(p_address_key text, p_pair_key text)
returns void
language plpgsql
set search_path = ''
as $$
begin
  if p_address_key is null or p_address_key !~ '^[0-9a-f]{64}$'
     or p_pair_key is null or p_pair_key !~ '^[0-9a-f]{64}$' then
    raise exception 'Bad key' using errcode = '22023';
  end if;
end;
$$;

-- Called only from the definer functions below.
revoke execute on function private.check_sign_in_keys(text, text) from public, anon, authenticated;

create function private.sign_in_allowed(p_address_key text, p_pair_key text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.check_sign_in_keys(p_address_key, p_pair_key);
  return private.rate_limit_room('sign_in_address', p_address_key, 30, interval '15 minutes')
     and private.rate_limit_room('sign_in_pair', p_pair_key, 5, interval '15 minutes');
end;
$$;

create function private.record_sign_in_failure(p_address_key text, p_pair_key text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.check_sign_in_keys(p_address_key, p_pair_key);
  -- take_rate_limit records nothing once a bucket is full, which is fine:
  -- a full bucket already refuses.
  perform private.take_rate_limit('sign_in_address', p_address_key, 30, interval '15 minutes');
  perform private.take_rate_limit('sign_in_pair', p_pair_key, 5, interval '15 minutes');
end;
$$;

revoke execute on function private.sign_in_allowed(text, text) from public;
revoke execute on function private.record_sign_in_failure(text, text) from public;
grant execute on function private.sign_in_allowed(text, text) to anon, authenticated, service_role;
grant execute on function private.record_sign_in_failure(text, text) to anon, authenticated, service_role;

-- Exposed entry points are security invoker, as with take_form_rate_limit.
create function public.sign_in_allowed(p_address_key text, p_pair_key text)
returns boolean
language sql
security invoker
set search_path = ''
as $$
  select private.sign_in_allowed(p_address_key, p_pair_key);
$$;

create function public.record_sign_in_failure(p_address_key text, p_pair_key text)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.record_sign_in_failure(p_address_key, p_pair_key);
$$;

comment on function public.sign_in_allowed(text, text) is
  'True when this visitor (hashed address) and this visitor with this email (hashed pair) both have room for another sign in attempt.';
comment on function public.record_sign_in_failure(text, text) is
  'Counts one failed sign in for a hashed visitor address and a hashed address and email pair.';

revoke execute on function public.sign_in_allowed(text, text) from public;
revoke execute on function public.record_sign_in_failure(text, text) from public;
grant execute on function public.sign_in_allowed(text, text) to anon, authenticated, service_role;
grant execute on function public.record_sign_in_failure(text, text) to anon, authenticated, service_role;
