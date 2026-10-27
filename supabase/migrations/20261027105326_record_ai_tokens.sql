-- Study Buddy: exact daily cap (#69, #124).
--
-- The route now reserves a turn with record_ai_usage(0, 0) BEFORE it calls the
-- model. That upsert takes the row lock, so parallel requests are counted one
-- after another and the returned messages value decides who is over the cap.
-- The tokens are only known after the stream ends; recording them with
-- record_ai_usage would count the message a second time, so this adds tokens
-- alone. Additive only: record_ai_usage and ai_usage are unchanged.

create function public.record_ai_tokens(p_input_tokens bigint default 0, p_output_tokens bigint default 0)
returns public.ai_usage
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_row public.ai_usage;
begin
  if v_uid is null then
    raise exception 'Sign in to use Study Buddy' using errcode = '42501';
  end if;
  if coalesce(p_input_tokens, -1) < 0 or coalesce(p_output_tokens, -1) < 0 then
    raise exception 'Token counts must be zero or more' using errcode = '22023';
  end if;

  -- Normally today's row exists (the reservation made it). If the turn was
  -- reserved just before midnight, the tokens land on the new day's row
  -- without counting a message there.
  insert into public.ai_usage as u (profile_id, day, messages, input_tokens, output_tokens)
  values (v_uid, (now() at time zone 'Africa/Accra')::date, 0, p_input_tokens, p_output_tokens)
  on conflict (profile_id, day) do update
    set input_tokens = u.input_tokens + excluded.input_tokens,
        output_tokens = u.output_tokens + excluded.output_tokens
  returning * into v_row;

  return v_row;
end;
$$;

comment on function public.record_ai_tokens(bigint, bigint) is
  'Adds Study Buddy token counts to today''s ai_usage row for the caller without counting a message. Counters only go up.';

revoke execute on function public.record_ai_tokens(bigint, bigint) from public, anon;
grant execute on function public.record_ai_tokens(bigint, bigint) to authenticated, service_role;
