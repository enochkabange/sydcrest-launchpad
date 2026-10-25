-- Phase 1, part 3: learner state.
--
-- Anti cheat rule: anything that feeds leaderboards, achievements or the
-- Study Buddy cap is written by the database on the learner's behalf, never
-- by a direct insert or update. Learners can read their own rows; the only
-- writes they can make are through the security definer functions below,
-- which check auth.uid(), validate the input and do the bookkeeping.

-- roadmap_progress ----------------------------------------------------------

create table public.roadmap_progress (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references public.profiles (id) on delete cascade,
  node_id      uuid not null references public.roadmap_nodes (id) on delete cascade,
  status       text not null default 'not_started'
                 check (status in ('not_started', 'in_progress', 'done')),
  quiz_score   smallint check (quiz_score between 0 and 100),
  completed_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (profile_id, node_id),
  check ((status = 'done') = (completed_at is not null))
);

comment on table public.roadmap_progress is
  'Per learner, per node status. Written only by set_node_status and submit_node_quiz.';
comment on column public.roadmap_progress.quiz_score is
  'Best quiz percentage so far. Set by submit_node_quiz only.';

create index roadmap_progress_node_idx on public.roadmap_progress (node_id);

alter table public.roadmap_progress enable row level security;

create trigger roadmap_progress_set_updated_at
  before update on public.roadmap_progress
  for each row execute function private.set_updated_at();

create policy "Learners read their own progress"
  on public.roadmap_progress for select
  to authenticated
  using ((select auth.uid()) = profile_id);

revoke all on public.roadmap_progress from anon, authenticated;
grant select on public.roadmap_progress to authenticated;
grant select, insert, update, delete on public.roadmap_progress to service_role;

-- personalized_paths --------------------------------------------------------

create table public.personalized_paths (
  id                     uuid primary key default gen_random_uuid(),
  profile_id             uuid not null references public.profiles (id) on delete cascade,
  quiz_answers           jsonb not null check (jsonb_typeof(quiz_answers) = 'object'),
  recommended_roadmap_id uuid references public.roadmaps (id) on delete set null,
  skill_gap              jsonb,
  plan                   jsonb,
  created_at             timestamptz not null default now()
);

comment on table public.personalized_paths is
  'Result of the path quiz: answers, recommended roadmap and plan. Written by the server.';

create index personalized_paths_profile_idx on public.personalized_paths (profile_id, created_at desc);
create index personalized_paths_roadmap_idx on public.personalized_paths (recommended_roadmap_id);

alter table public.personalized_paths enable row level security;

create policy "Learners read their own paths"
  on public.personalized_paths for select
  to authenticated
  using ((select auth.uid()) = profile_id);

create policy "Learners delete their own paths"
  on public.personalized_paths for delete
  to authenticated
  using ((select auth.uid()) = profile_id);

-- The recommendation and plan are generated server side; the learner can
-- read and clear them but not write them.
revoke all on public.personalized_paths from anon, authenticated;
grant select, delete on public.personalized_paths to authenticated;
grant select, insert, update, delete on public.personalized_paths to service_role;

-- achievements ---------------------------------------------------------------

-- A text check rather than a Postgres enum: adding a value is a plain
-- constraint swap in a later migration, and an enum value cannot be used in
-- the transaction that adds it.
create table public.achievements (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  type       text not null check (type in (
               'roadmap_node_completed', 'roadmap_completed', 'streak',
               'track_chosen', 'path_personalized'
             )),
  ref_id     text,
  metadata   jsonb not null default '{}' check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  -- One achievement per (profile, type, ref): minting twice is a no op. A
  -- null ref_id counts as a value, so type-only achievements dedupe too.
  constraint achievements_once unique nulls not distinct (profile_id, type, ref_id)
);

comment on table public.achievements is
  'Milestones for the share loop. Minted only by private.mint_achievement.';
comment on column public.achievements.ref_id is
  'What the achievement is for: node id, roadmap id, streak length, track slug.';

alter table public.achievements enable row level security;

create policy "Achievements are visible to the owner and on public profiles"
  on public.achievements for select
  to anon, authenticated
  using ((select auth.uid()) = profile_id or private.is_public_profile(profile_id));

revoke all on public.achievements from anon, authenticated;
grant select on public.achievements to anon, authenticated;
grant select, insert, update, delete on public.achievements to service_role;

-- Idempotent minting. Returns true only when a new row was created, so the
-- caller knows whether to celebrate or nudge.
create function private.mint_achievement(
  p_profile_id uuid,
  p_type text,
  p_ref_id text default null,
  p_metadata jsonb default '{}'
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  insert into public.achievements (profile_id, type, ref_id, metadata)
  values (p_profile_id, p_type, p_ref_id, coalesce(p_metadata, '{}'))
  on conflict on constraint achievements_once do nothing
  returning id into v_id;
  return v_id is not null;
end;
$$;

revoke execute on function private.mint_achievement(uuid, text, text, jsonb) from public, anon, authenticated;
grant execute on function private.mint_achievement(uuid, text, text, jsonb) to service_role;

-- The private schema is not exposed over the API, so server code (secret key)
-- mints track_chosen, path_personalized and streak through this wrapper.
create function public.mint_achievement(
  p_profile_id uuid,
  p_type text,
  p_ref_id text default null,
  p_metadata jsonb default '{}'
)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select private.mint_achievement(p_profile_id, p_type, p_ref_id, p_metadata);
$$;

revoke execute on function public.mint_achievement(uuid, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.mint_achievement(uuid, text, text, jsonb) to service_role;

-- Progress functions ----------------------------------------------------------

-- Side effects of a node reaching done: mint the node achievement, and the
-- roadmap achievement once every required node in the roadmap is done.
create function private.after_node_done(p_profile_id uuid, p_node_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_roadmap_id uuid;
begin
  select roadmap_id into v_roadmap_id from public.roadmap_nodes where id = p_node_id;

  perform private.mint_achievement(p_profile_id, 'roadmap_node_completed', p_node_id::text);

  if not exists (
    select 1
    from public.roadmap_nodes n
    left join public.roadmap_progress p
      on p.node_id = n.id and p.profile_id = p_profile_id and p.status = 'done'
    where n.roadmap_id = v_roadmap_id and not n.is_optional and p.id is null
  ) then
    perform private.mint_achievement(p_profile_id, 'roadmap_completed', v_roadmap_id::text);
  end if;
end;
$$;

revoke execute on function private.after_node_done(uuid, uuid) from public, anon, authenticated;

-- Learner sets their own status on a published node. Nodes with a quiz can
-- only reach done by passing it (submit_node_quiz); nodes without one are
-- self attested.
create function public.set_node_status(p_node_id uuid, p_status text)
returns public.roadmap_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_row public.roadmap_progress;
  v_was_done boolean;
begin
  if v_uid is null then
    raise exception 'Sign in to track progress' using errcode = '42501';
  end if;
  if p_status is null or p_status not in ('not_started', 'in_progress', 'done') then
    raise exception 'Unknown status %', p_status using errcode = '22023';
  end if;
  if not private.node_is_published(p_node_id) then
    raise exception 'Node not found' using errcode = 'P0002';
  end if;
  if p_status = 'done' and exists (select 1 from public.node_quiz where node_id = p_node_id) then
    raise exception 'Pass the quiz to complete this node' using errcode = '42501';
  end if;

  select status = 'done' into v_was_done
  from public.roadmap_progress
  where profile_id = v_uid and node_id = p_node_id;

  insert into public.roadmap_progress as rp (profile_id, node_id, status, completed_at)
  values (v_uid, p_node_id, p_status, case when p_status = 'done' then now() end)
  on conflict (profile_id, node_id) do update
    set status = excluded.status,
        completed_at = case when excluded.status = 'done'
                            then coalesce(rp.completed_at, now()) end
  returning * into v_row;

  if p_status = 'done' and not coalesce(v_was_done, false) then
    perform private.after_node_done(v_uid, p_node_id);
  end if;

  return v_row;
end;
$$;

revoke execute on function public.set_node_status(uuid, text) from public, anon;
grant execute on function public.set_node_status(uuid, text) to authenticated, service_role;

-- Grades a quiz against the hidden answer key. p_answers maps question id to
-- the chosen option: {"q1": 2, "q2": 0}. Records the best score and marks the
-- node done on a pass. Returns score, pass and per question correctness (the
-- learner sees which ones they got right, not the key itself).
create function public.submit_node_quiz(p_node_id uuid, p_answers jsonb)
returns table (score smallint, passed boolean, results jsonb)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_key jsonb;
  v_threshold smallint;
  v_total integer := 0;
  v_correct integer := 0;
  v_qid text;
  v_was_done boolean;
begin
  if v_uid is null then
    raise exception 'Sign in to take the quiz' using errcode = '42501';
  end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'object' then
    raise exception 'Answers must be an object of question id to option' using errcode = '22023';
  end if;
  if not private.node_is_published(p_node_id) then
    raise exception 'Node not found' using errcode = 'P0002';
  end if;

  select a.answer_key, q.pass_threshold into v_key, v_threshold
  from public.node_quiz q
  join public.node_quiz_answers a on a.quiz_id = q.id
  where q.node_id = p_node_id;

  if v_key is null then
    raise exception 'This node has no quiz' using errcode = 'P0002';
  end if;

  results := '{}';
  for v_qid in select jsonb_object_keys(v_key) loop
    v_total := v_total + 1;
    if (p_answers -> v_qid) = (v_key -> v_qid) then
      v_correct := v_correct + 1;
      results := results || jsonb_build_object(v_qid, true);
    else
      results := results || jsonb_build_object(v_qid, false);
    end if;
  end loop;

  if v_total = 0 then
    raise exception 'This quiz has no answer key' using errcode = 'P0002';
  end if;

  score := round(100.0 * v_correct / v_total)::smallint;
  passed := score >= v_threshold;

  select status = 'done' into v_was_done
  from public.roadmap_progress
  where profile_id = v_uid and node_id = p_node_id;

  insert into public.roadmap_progress as rp (profile_id, node_id, status, quiz_score, completed_at)
  values (
    v_uid, p_node_id,
    case when passed then 'done' else 'in_progress' end,
    score,
    case when passed then now() end
  )
  on conflict (profile_id, node_id) do update
    set quiz_score = greatest(coalesce(rp.quiz_score, 0), excluded.quiz_score),
        status = case when rp.status = 'done' or passed then 'done' else 'in_progress' end,
        completed_at = case when rp.status = 'done' or passed
                            then coalesce(rp.completed_at, now()) end;

  if passed and not coalesce(v_was_done, false) then
    perform private.after_node_done(v_uid, p_node_id);
  end if;

  return next;
end;
$$;

revoke execute on function public.submit_node_quiz(uuid, jsonb) from public, anon;
grant execute on function public.submit_node_quiz(uuid, jsonb) to authenticated, service_role;

-- consents --------------------------------------------------------------------

create table public.consents (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  kind       text not null check (kind in ('terms', 'privacy', 'whatsapp')),
  version    text not null check (char_length(version) between 1 and 40),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  check (revoked_at is null or revoked_at >= granted_at)
);

comment on table public.consents is
  'Append only consent log (terms, privacy, WhatsApp messaging). Revoking stamps revoked_at.';

-- One live consent per kind and version.
create unique index consents_active_idx
  on public.consents (profile_id, kind, version) where revoked_at is null;

alter table public.consents enable row level security;

create policy "Users read their own consents"
  on public.consents for select
  to authenticated
  using ((select auth.uid()) = profile_id);

create policy "Users record their own consent"
  on public.consents for insert
  to authenticated
  with check ((select auth.uid()) = profile_id);

-- granted_at is the server clock; no updates or deletes, so the log stays
-- trustworthy. Revoking goes through revoke_consent.
revoke all on public.consents from anon, authenticated;
grant select on public.consents to authenticated;
grant insert (profile_id, kind, version) on public.consents to authenticated;
grant select, insert, update, delete on public.consents to service_role;

create function public.revoke_consent(p_kind text)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_count integer;
begin
  if v_uid is null then
    raise exception 'Sign in to manage consent' using errcode = '42501';
  end if;
  update public.consents
     set revoked_at = now()
   where profile_id = v_uid and kind = p_kind and revoked_at is null;
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke execute on function public.revoke_consent(text) from public, anon;
grant execute on function public.revoke_consent(text) to authenticated, service_role;

-- ai_usage ----------------------------------------------------------------------

create table public.ai_usage (
  profile_id    uuid not null references public.profiles (id) on delete cascade,
  day           date not null,
  messages      integer not null default 0 check (messages >= 0),
  input_tokens  bigint not null default 0 check (input_tokens >= 0),
  output_tokens bigint not null default 0 check (output_tokens >= 0),
  updated_at    timestamptz not null default now(),
  primary key (profile_id, day)
);

comment on table public.ai_usage is
  'Study Buddy usage per learner per day (Africa/Accra, which is UTC). Counters only go up.';

alter table public.ai_usage enable row level security;

create trigger ai_usage_set_updated_at
  before update on public.ai_usage
  for each row execute function private.set_updated_at();

create policy "Users read their own AI usage"
  on public.ai_usage for select
  to authenticated
  using ((select auth.uid()) = profile_id);

revoke all on public.ai_usage from anon, authenticated;
grant select on public.ai_usage to authenticated;
grant select, insert, update, delete on public.ai_usage to service_role;

-- Adds one message and its token counts to today's row for the caller. It
-- can only increase the counters, so a learner calling it directly can only
-- use up their own allowance, never reset it.
create function public.record_ai_usage(p_input_tokens bigint default 0, p_output_tokens bigint default 0)
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

  insert into public.ai_usage as u (profile_id, day, messages, input_tokens, output_tokens)
  values (v_uid, (now() at time zone 'Africa/Accra')::date, 1, p_input_tokens, p_output_tokens)
  on conflict (profile_id, day) do update
    set messages = u.messages + 1,
        input_tokens = u.input_tokens + excluded.input_tokens,
        output_tokens = u.output_tokens + excluded.output_tokens
  returning * into v_row;

  return v_row;
end;
$$;

revoke execute on function public.record_ai_usage(bigint, bigint) from public, anon;
grant execute on function public.record_ai_usage(bigint, bigint) to authenticated, service_role;
