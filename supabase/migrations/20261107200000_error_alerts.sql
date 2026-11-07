-- Error alerts (#304): at most one alert per kind of error per hour.
--
-- Errors are already recorded as server_error and client_error analytics
-- events (#242). The app alerts the founder by Slack and email when one
-- happens; this table remembers when each kind of error (a fingerprint of
-- source, route and error name, never personal data) last alerted, and counts
-- the repeats in between so the next alert can say "and 12 more".

create table private.error_alerts (
  fingerprint  text primary key check (char_length(fingerprint) between 1 and 300),
  last_sent_at timestamptz not null default now(),
  suppressed   integer not null default 0 check (suppressed >= 0)
);

comment on table private.error_alerts is
  'When each kind of error last alerted, and how many repeats since (#304). Written only by public.claim_error_alert.';

alter table private.error_alerts enable row level security;

-- Whether to send an alert for this fingerprint now. Sends (true, with the
-- repeats held back since the last alert) when it has never alerted or last
-- alerted longer ago than p_window; otherwise counts one more repeat and
-- returns false. The row lock makes it atomic, so a burst of the same error
-- sends one alert, not many.
create function public.claim_error_alert(p_fingerprint text, p_window interval default interval '1 hour')
returns table (send boolean, held_back integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row private.error_alerts;
begin
  insert into private.error_alerts (fingerprint, last_sent_at)
  values (p_fingerprint, '-infinity')
  on conflict (fingerprint) do nothing;

  select * into v_row from private.error_alerts a where a.fingerprint = p_fingerprint for update;

  if v_row.last_sent_at < now() - p_window then
    update private.error_alerts a set last_sent_at = now(), suppressed = 0 where a.fingerprint = p_fingerprint;
    return query select true, v_row.suppressed;
  else
    update private.error_alerts a set suppressed = a.suppressed + 1 where a.fingerprint = p_fingerprint;
    return query select false, v_row.suppressed + 1;
  end if;
end;
$$;

revoke execute on function public.claim_error_alert(text, interval) from public, anon, authenticated;
grant execute on function public.claim_error_alert(text, interval) to service_role;
