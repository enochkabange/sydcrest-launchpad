-- Quiz verified completions (issue #128).
--
-- Founder decision (27 Oct): marking a topic done is personal tracking, not
-- certification. Learners may still mark a topic without a quiz as done, and
-- it shows as done in their own progress (map colours, dashboard counts), but
-- only completions verified by passing the topic's quiz count toward the
-- leaderboards, streaks, roadmap_completed and the node achievement (and so
-- the shareable cards built on achievements).
--
-- Additive: one nullable column, function bodies replaced with the same
-- signatures, and a backfill of existing quiz passes.

-- roadmap_progress.verified_at ------------------------------------------------

-- When the learner first passed this node's quiz. A timestamp rather than a
-- flag because streak days need a date: a topic marked done by hand and
-- verified later by a quiz counts on the day of the pass. Learners have no
-- insert or update grant on roadmap_progress, so only submit_node_quiz (a
-- security definer function) can set it.
alter table public.roadmap_progress
  add column verified_at timestamptz,
  add constraint roadmap_progress_verified_is_done check (verified_at is null or status = 'done');

comment on column public.roadmap_progress.verified_at is
  'First quiz pass on this node. Null for topics marked done by hand. Only verified completions count for leaderboards, streaks and achievements. Set by submit_node_quiz only.';

-- Backfill: a done row whose best score meets the node's current pass mark was
-- completed by passing the quiz (set_node_status has always refused done for
-- quiz nodes). A done row on a node whose quiz was added later, with no
-- passing score, stays unverified.
update public.roadmap_progress rp
   set verified_at = rp.completed_at
  from public.node_quiz q
 where q.node_id = rp.node_id
   and rp.status = 'done'
   and rp.verified_at is null
   and rp.quiz_score is not null
   and rp.quiz_score >= q.pass_threshold;

-- Achievements ------------------------------------------------------------------

-- Side effects of a node being verified: mint the node achievement, and the
-- roadmap achievement once every required node in the roadmap is verified.
-- A roadmap with a required topic that has no quiz therefore never mints
-- roadmap_completed; the learner's own progress still shows it finished.
create or replace function private.after_node_done(p_profile_id uuid, p_node_id uuid)
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
      on p.node_id = n.id and p.profile_id = p_profile_id and p.verified_at is not null
    where n.roadmap_id = v_roadmap_id and not n.is_optional and p.id is null
  ) then
    perform private.mint_achievement(p_profile_id, 'roadmap_completed', v_roadmap_id::text);
  end if;
end;
$$;

revoke execute on function private.after_node_done(uuid, uuid) from public, anon, authenticated;

-- Progress functions --------------------------------------------------------------

-- Learner sets their own status on a published node. Nodes with a quiz can
-- only reach done by passing it (submit_node_quiz); nodes without one may be
-- marked done for personal tracking, which mints nothing and is never
-- verified. Resetting a node clears its verification with its completion.
create or replace function public.set_node_status(p_node_id uuid, p_status text)
returns public.roadmap_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_row public.roadmap_progress;
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

  insert into public.roadmap_progress as rp (profile_id, node_id, status, completed_at)
  values (v_uid, p_node_id, p_status, case when p_status = 'done' then now() end)
  on conflict (profile_id, node_id) do update
    set status = excluded.status,
        completed_at = case when excluded.status = 'done'
                            then coalesce(rp.completed_at, now()) end,
        verified_at = case when excluded.status = 'done' then rp.verified_at end
  returning * into v_row;

  return v_row;
end;
$$;

revoke execute on function public.set_node_status(uuid, text) from public, anon;
grant execute on function public.set_node_status(uuid, text) to authenticated, service_role;

-- Grades a quiz against the hidden answer key (unchanged), and on a pass
-- marks the node done and verified. Minting happens on the first
-- verification, which also covers a topic marked done by hand before its
-- quiz existed.
create or replace function public.submit_node_quiz(p_node_id uuid, p_answers jsonb)
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
  v_was_verified boolean;
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

  select verified_at is not null into v_was_verified
  from public.roadmap_progress
  where profile_id = v_uid and node_id = p_node_id;

  insert into public.roadmap_progress as rp (profile_id, node_id, status, quiz_score, completed_at, verified_at)
  values (
    v_uid, p_node_id,
    case when passed then 'done' else 'in_progress' end,
    score,
    case when passed then now() end,
    case when passed then now() end
  )
  on conflict (profile_id, node_id) do update
    set quiz_score = greatest(coalesce(rp.quiz_score, 0), excluded.quiz_score),
        status = case when rp.status = 'done' or passed then 'done' else 'in_progress' end,
        completed_at = case when rp.status = 'done' or passed
                            then coalesce(rp.completed_at, now()) end,
        verified_at = case when passed then coalesce(rp.verified_at, now())
                           when rp.status = 'done' then rp.verified_at end;

  if passed and not coalesce(v_was_verified, false) then
    perform private.after_node_done(v_uid, p_node_id);
  end if;

  return next;
end;
$$;

revoke execute on function public.submit_node_quiz(uuid, jsonb) from public, anon;
grant execute on function public.submit_node_quiz(uuid, jsonb) to authenticated, service_role;

-- Leaderboards ------------------------------------------------------------------

-- Same columns as before, so public.public_profile_stats is unchanged. Nodes
-- completed and the streak count verified completions only, and a streak day
-- is the Africa/Accra date of the quiz pass. verified_at is set once by the
-- database, so days cannot be backfilled.
create or replace function private.public_profile_stats_rows()
returns table (
  id                   uuid,
  public_slug          text,
  display_name         text,
  avatar_url           text,
  region               text,
  nodes_completed      integer,
  current_streak       integer,
  followers_count      integer,
  following_count      integer,
  has_datacamp_license boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  with pub as (
    select p.id, p.public_slug, p.display_name, p.avatar_url, p.region,
           p.datacamp_license_slot is not null as has_datacamp_license
    from public.profiles p
    where p.is_public
  ),
  done as (
    select rp.profile_id, count(*)::integer as nodes_completed
    from public.roadmap_progress rp
    join pub on pub.id = rp.profile_id
    where rp.verified_at is not null
    group by rp.profile_id
  ),
  days as (
    select distinct rp.profile_id,
           (rp.verified_at at time zone 'Africa/Accra')::date as day
    from public.roadmap_progress rp
    join pub on pub.id = rp.profile_id
    where rp.verified_at is not null
  ),
  runs as (
    select profile_id, day,
           day - (row_number() over (partition by profile_id order by day))::integer as run
    from days
  ),
  streaks as (
    select profile_id, count(*)::integer as length
    from runs
    group by profile_id, run
    having max(day) >= (now() at time zone 'Africa/Accra')::date - 1
  ),
  followers as (
    select f.following_id as profile_id, count(*)::integer as n
    from public.follows f join pub on pub.id = f.following_id
    group by f.following_id
  ),
  following as (
    select f.follower_id as profile_id, count(*)::integer as n
    from public.follows f join pub on pub.id = f.follower_id
    group by f.follower_id
  )
  select pub.id, pub.public_slug, pub.display_name, pub.avatar_url, pub.region,
         coalesce(done.nodes_completed, 0),
         coalesce(streaks.length, 0),
         coalesce(followers.n, 0),
         coalesce(following.n, 0),
         pub.has_datacamp_license
  from pub
  left join done on done.profile_id = pub.id
  left join streaks on streaks.profile_id = pub.id
  left join followers on followers.profile_id = pub.id
  left join following on following.profile_id = pub.id;
$$;

revoke execute on function private.public_profile_stats_rows() from public;
grant execute on function private.public_profile_stats_rows() to anon, authenticated, service_role;

comment on view public.public_profile_stats is
  'Quiz verified progress and follower counts of opted in profiles, for public pages and leaderboards. Never add phone, role or email here.';
