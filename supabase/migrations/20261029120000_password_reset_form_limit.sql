-- Forgot password (issue #227): a per address limit on the reset request
-- form, alongside the waitlist and sign up forms. Same function, one more
-- named bucket; the signature is unchanged. Supabase Auth's own email limits
-- still apply behind it.
create or replace function private.take_form_rate_limit(p_bucket text, p_key text)
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
    when 'waitlist'       then private.take_rate_limit('form_waitlist', p_key, 20, interval '1 hour')
    when 'sign_up'        then private.take_rate_limit('form_sign_up', p_key, 30, interval '1 hour')
    when 'password_reset' then private.take_rate_limit('form_password_reset', p_key, 10, interval '1 hour')
    else null
  end;
end;
$$;

revoke execute on function private.take_form_rate_limit(text, text) from public;
grant execute on function private.take_form_rate_limit(text, text) to anon, authenticated, service_role;

comment on function public.take_form_rate_limit(text, text) is
  'Counts one submission of a signed out form (waitlist, sign_up, password_reset) for a hashed visitor address. False when that address is over the limit.';
