-- Learning loop (issue #232): a weekly goal, kind streaks and a 5 minute review.
--
-- Additive only. Three owner only tables and one grading function:
--
-- * weekly_goals: how many topics the learner wants to pass each week (1, 3
--   or 5). One row per learner per Africa/Accra week (Monday start). The
--   learner writes their own row for the current week only, so past weeks
--   cannot be rewritten to inflate the weekly streak.
-- * review_sessions and review_answers: finished 5 minute reviews. Written
--   only by submit_review (security definer), which grades against the hidden
--   answer key, so a learner cannot forge a review day or read the key.
--
-- Reviews never touch roadmap_progress, achievements or public_profile_stats:
-- verified completions and the leaderboards (including the strict leaderboard
-- streak) stay exactly as they were. The kind daily streak and the weekly
-- streak are private to the learner and computed by the app from verified_at
-- days plus review days.

-- Week helper ------------------------------------------------------------------

-- The Monday (Africa/Accra) of the week containing p_at. date_trunc('week')
-- starts weeks on Monday.
create function private.accra_week_start(p_at timestamptz default now())
returns date
language sql
stable
set search_path = ''
as $$
  select date_trunc('week', p_at at time zone 'Africa/Accra')::date;
$$;

revoke execute on function private.accra_week_start(timestamptz) from public, anon;
grant execute on function private.accra_week_start(timestamptz) to authenticated, service_role;

-- weekly_goals -------------------------------------------------------------------

create table public.weekly_goals (
  profile_id    uuid not null references public.profiles (id) on delete cascade,
  week_start    date not null check (extract(isodow from week_start) = 1),
  topics_target smallint not null check (topics_target in (1, 3, 5)),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  primary key (profile_id, week_start)
);

comment on table public.weekly_goals is
  'Topics a learner aims to pass per Africa/Accra week. A week without a row carries the latest earlier goal forward. Owner writes the current week only.';

alter table public.weekly_goals enable row level security;

create trigger weekly_goals_set_updated_at
  before update on public.weekly_goals
  for each row execute function private.set_updated_at();

create policy "Learners read their own weekly goals and admins read all"
  on public.weekly_goals for select
  to authenticated
  using ((select auth.uid()) = profile_id or (select private.is_admin()));

create policy "Learners set their own goal for the current week"
  on public.weekly_goals for insert
  to authenticated
  with check ((select auth.uid()) = profile_id and week_start = (select private.accra_week_start()));

create policy "Learners change their own goal for the current week"
  on public.weekly_goals for update
  to authenticated
  using ((select auth.uid()) = profile_id and week_start = (select private.accra_week_start()))
  with check ((select auth.uid()) = profile_id and week_start = (select private.accra_week_start()));

revoke all on public.weekly_goals from anon, authenticated;
grant select on public.weekly_goals to authenticated;
-- An upsert names every column it sends, so update covers the key columns too;
-- the policies above pin them to the learner and the current week.
grant insert (profile_id, week_start, topics_target) on public.weekly_goals to authenticated;
grant update (profile_id, week_start, topics_target) on public.weekly_goals to authenticated;
grant select, insert, update, delete on public.weekly_goals to service_role;

-- review_sessions and review_answers -----------------------------------------------

create table public.review_sessions (
  id             uuid primary key default gen_random_uuid(),
  profile_id     uuid not null references public.profiles (id) on delete cascade,
  question_count smallint not null check (question_count between 1 and 5),
  correct_count  smallint not null default 0 check (correct_count between 0 and question_count),
  completed_at   timestamptz not null default now()
);

comment on table public.review_sessions is
  'Finished 5 minute reviews. Written only by submit_review. A review day counts toward the learner''s private daily streak, never toward verified completions or leaderboards.';

create index review_sessions_profile_completed_idx on public.review_sessions (profile_id, completed_at desc);

alter table public.review_sessions enable row level security;

create policy "Learners read their own reviews and admins read all"
  on public.review_sessions for select
  to authenticated
  using ((select auth.uid()) = profile_id or (select private.is_admin()));

revoke all on public.review_sessions from anon, authenticated;
grant select on public.review_sessions to authenticated;
grant select, insert, update, delete on public.review_sessions to service_role;

create table public.review_answers (
  id          bigint generated always as identity primary key,
  session_id  uuid not null references public.review_sessions (id) on delete cascade,
  profile_id  uuid not null references public.profiles (id) on delete cascade,
  node_id     uuid not null references public.roadmap_nodes (id) on delete cascade,
  question_id text not null,
  correct     boolean not null,
  answered_at timestamptz not null default now(),
  constraint review_answers_once unique (session_id, node_id, question_id)
);

comment on table public.review_answers is
  'Whether each reviewed question was answered correctly, for spacing the next review. The chosen option is not stored. Written only by submit_review.';

create index review_answers_history_idx on public.review_answers (profile_id, node_id, question_id, answered_at desc);
create index review_answers_node_idx on public.review_answers (node_id);

alter table public.review_answers enable row level security;

create policy "Learners read their own review answers and admins read all"
  on public.review_answers for select
  to authenticated
  using ((select auth.uid()) = profile_id or (select private.is_admin()));

revoke all on public.review_answers from anon, authenticated;
grant select on public.review_answers to authenticated;
grant select, insert, update, delete on public.review_answers to service_role;

-- submit_review ------------------------------------------------------------------

-- Grades a 5 minute review. p_answers is an array of
-- {"node_id": uuid, "question_id": text, "choice": number}. Every question must
-- come from a quiz the learner has passed (verified_at set) on a published
-- node, each at most once, and a review has least(5, questions available)
-- questions, so one easy question cannot stand in for a review. Records the
-- session and which questions were right, and returns the same. It never
-- writes roadmap_progress or achievements, and never returns the answer key.
create function public.submit_review(p_answers jsonb)
returns table (session_id uuid, correct_count integer, question_count integer, results jsonb)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_available integer;
  v_item jsonb;
  v_node uuid;
  v_qid text;
  v_choice jsonb;
  v_key jsonb;
  v_ok boolean;
  v_seen text[] := '{}';
begin
  if v_uid is null then
    raise exception 'Sign in to take a review' using errcode = '42501';
  end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'array' then
    raise exception 'Answers must be an array' using errcode = '22023';
  end if;

  select count(*)::integer into v_available
  from public.roadmap_progress rp
  join public.node_quiz q on q.node_id = rp.node_id
  join public.node_quiz_answers a on a.quiz_id = q.id
  cross join lateral jsonb_array_elements(q.questions) e
  where rp.profile_id = v_uid
    and rp.verified_at is not null
    and private.node_is_published(rp.node_id)
    and a.answer_key ? (e ->> 'id');

  if v_available = 0 then
    raise exception 'Pass a checkpoint quiz before taking a review' using errcode = 'P0002';
  end if;

  question_count := jsonb_array_length(p_answers);
  if question_count <> least(5, v_available) then
    raise exception 'A review has % questions', least(5, v_available) using errcode = '22023';
  end if;

  insert into public.review_sessions (profile_id, question_count)
  values (v_uid, question_count)
  returning id into session_id;

  correct_count := 0;
  results := '[]';
  for v_item in select value from jsonb_array_elements(p_answers) loop
    if jsonb_typeof(v_item) <> 'object'
       or jsonb_typeof(v_item -> 'question_id') <> 'string'
       or jsonb_typeof(v_item -> 'choice') <> 'number'
       or coalesce(v_item ->> 'node_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
      raise exception 'Each answer needs a node, a question and a choice' using errcode = '22023';
    end if;
    v_node := (v_item ->> 'node_id')::uuid;
    v_qid := v_item ->> 'question_id';
    v_choice := v_item -> 'choice';

    if (v_node::text || ':' || v_qid) = any (v_seen) then
      raise exception 'A question appears twice in this review' using errcode = '22023';
    end if;
    v_seen := v_seen || (v_node::text || ':' || v_qid);

    v_key := null;
    select a.answer_key -> v_qid into v_key
    from public.roadmap_progress rp
    join public.node_quiz q on q.node_id = rp.node_id
    join public.node_quiz_answers a on a.quiz_id = q.id
    where rp.profile_id = v_uid
      and rp.node_id = v_node
      and rp.verified_at is not null
      and private.node_is_published(v_node)
      and exists (select 1 from jsonb_array_elements(q.questions) e where e ->> 'id' = v_qid);

    if v_key is null then
      raise exception 'Only questions from quizzes you have passed can be reviewed' using errcode = '42501';
    end if;

    v_ok := v_choice = v_key;
    if v_ok then
      correct_count := correct_count + 1;
    end if;

    insert into public.review_answers (session_id, profile_id, node_id, question_id, correct)
    values (session_id, v_uid, v_node, v_qid, v_ok);

    results := results || jsonb_build_array(jsonb_build_object('node_id', v_node, 'question_id', v_qid, 'correct', v_ok));
  end loop;

  update public.review_sessions s set correct_count = submit_review.correct_count where s.id = submit_review.session_id;

  return next;
end;
$$;

revoke execute on function public.submit_review(jsonb) from public, anon;
grant execute on function public.submit_review(jsonb) to authenticated, service_role;
