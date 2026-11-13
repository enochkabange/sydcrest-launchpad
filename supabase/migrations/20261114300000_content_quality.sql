-- Content quality (epic #320, issue #326): which lessons and quiz questions
-- are worth rewriting, with the evidence.
--
-- 1. public.lesson_feedback: the one tap "Was this lesson clear?" at the end
--    of a lesson (yes or not really, with an optional reason from a fixed
--    list). One answer per learner per lesson; tapping again changes it.
--    Written only through public.give_lesson_feedback (identity from
--    auth.uid()); learners read their own, admins read through the functions.
-- 2. public.admin_content_questions and public.admin_content_lessons: admin
--    only aggregates over the raw events (quiz_question_answered with the
--    chosen option and the attempt's pass flag, quiz_submitted, lesson_left,
--    study_buddy_message with its topic and a coarse kind) and the feedback.
--    Counts only: the scoring and ranking live in
--    src/lib/content-quality/rank.ts so they can be unit tested.
-- 3. lesson_feedback_given joins the event names.
--
-- No message text is stored anywhere: Study Buddy themes are counts per
-- topic and kind of question. Described on /privacy.

create or replace function private.is_event_name(p_name text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select p_name = any (array[
    -- Taxonomy (issues #51 and #242)
    'page_view', 'web_vital', 'form_started', 'form_submitted', 'share_clicked',
    'client_error', 'server_error', 'action_failed', 'signup', 'sign_in',
    'sign_out', 'welcome_completed', 'password_reset_requested',
    'password_updated', 'profile_updated', 'public_profile_updated',
    'whatsapp_consent_set', 'display_prefs_saved', 'milestone_posts_set',
    'waitlist_joined', 'quiz_run', 'path_saved', 'path_viewed', 'lesson_opened',
    'node_started', 'quiz_submitted', 'node_completed', 'review_completed',
    'weekly_goal_set', 'study_buddy_message', 'skill_quiz_submitted',
    'skill_portfolio_submitted', 'skill_portfolio_reviewed', 'path_skills_claimed',
    'application_submitted', 'application_withdrawn', 'application_decided',
    'specialisation_chosen', 'submission_saved', 'submission_graded',
    'peer_review_assigned', 'peer_review_submitted', 'learner_deferred',
    'certificate_issued', 'certificate_revoked', 'expert_applied',
    'expert_application_decided', 'offer_created', 'offer_updated',
    'booking_requested', 'booking_status_changed', 'booking_message_sent',
    'booking_reviewed', 'brief_created', 'pitch_submitted', 'pitch_withdrawn',
    'pitch_decided', 'opportunity_created', 'opportunity_reported', 'opportunity_saved',
    'opportunity_unsaved', 'outcome_reported', 'outcome_decided',
    'talent_listing_saved', 'talent_contact_requested', 'talent_contact_responded',
    'organisation_created', 'organisation_member_invited',
    'organisation_invite_accepted', 'organisation_decided', 'post_created',
    'reply_created', 'reaction_set', 'content_reported', 'content_moderated',
    'event_rsvp', 'event_checked_in', 'event_feedback_sent', 'chapter_joined',
    'chapter_left', 'profile_followed', 'profile_reported', 'invite_sent',
    'notification_opened', 'notifications_read_all',
    -- Attribution (epic #320)
    'visit_started',
    -- Learner profile v2 (epic #320)
    'learner_profile_saved', 'profile_field_updated',
    -- Behaviour and work-readiness events (epic #320, step 3)
    'session_started', 'lesson_left', 'resource_opened', 'quiz_question_answered', 'quiz_retried',
    'search_performed', 'filter_applied', 'submission_resubmitted', 'deadline_met', 'deadline_missed',
    'opportunity_viewed', 'opportunity_apply_opened', 'opportunity_applied',
    'opportunity_application_withdrawn', 'opportunity_applicant_moved',
    -- Content quality (epic #320, issue #326)
    'lesson_feedback_given',
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
    'node_opened', 'path_quiz_started', 'path_quiz_completed', 'achievement_shared',
    'profile_published'
  ]);
$$;

-- Lesson feedback ----------------------------------------------------------------

create table public.lesson_feedback (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  node_id    uuid not null references public.roadmap_nodes (id) on delete cascade,
  clear      boolean not null,
  reason     text check (reason in ('confusing', 'too_long', 'too_short', 'missing_example', 'broken_link')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id, node_id),
  check (reason is null or not clear)
);

comment on table public.lesson_feedback is
  'Was this lesson clear? One answer per learner per lesson (yes or not really, optional reason). Written through give_lesson_feedback. Described on /privacy.';
comment on column public.lesson_feedback.reason is
  'Only when the lesson was not clear: confusing, too_long, too_short, missing_example or broken_link.';

create index lesson_feedback_node_idx on public.lesson_feedback (node_id, updated_at);

alter table public.lesson_feedback enable row level security;

create policy "Members read their own lesson feedback"
  on public.lesson_feedback for select to authenticated
  using (profile_id = (select auth.uid()));

revoke all on public.lesson_feedback from public, anon, authenticated;
grant select on public.lesson_feedback to authenticated;
grant select, insert, update, delete on public.lesson_feedback to service_role;

create function public.give_lesson_feedback(p_node_id uuid, p_clear boolean, p_reason text default null)
returns void
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
  if p_clear is null then
    raise exception 'Say whether the lesson was clear' using errcode = '22023';
  end if;
  if not exists (
    select 1 from public.roadmap_nodes n join public.roadmaps r on r.id = n.roadmap_id
     where n.id = p_node_id and r.is_published
  ) then
    raise exception 'Unknown topic' using errcode = 'P0002';
  end if;
  if not private.take_rate_limit('lesson_feedback', v_uid::text, 60, interval '10 minutes') then
    raise exception 'Too many answers, try again later' using errcode = '54000';
  end if;
  insert into public.lesson_feedback as f (profile_id, node_id, clear, reason)
  values (v_uid, p_node_id, p_clear, case when p_clear then null else p_reason end)
  on conflict (profile_id, node_id) do update
    set clear = excluded.clear, reason = excluded.reason, updated_at = now();
end;
$$;

comment on function public.give_lesson_feedback(uuid, boolean, text) is
  'Records the caller''s answer to "Was this lesson clear?" for a published topic; a second tap replaces the first.';

revoke execute on function public.give_lesson_feedback(uuid, boolean, text) from public, anon;
grant execute on function public.give_lesson_feedback(uuid, boolean, text) to authenticated, service_role;

-- Question analysis --------------------------------------------------------------

-- One row per quiz question answered in the last p_days days. "Strong" and
-- "weak" answers are those given in an attempt that passed or failed (the
-- passed prop, recorded from 14 Nov 2026; older answers count only toward the
-- totals). The most chosen wrong answer uses the choice prop (same date) and
-- is shown with the option text the quiz has now.
create function public.admin_content_questions(p_days integer default 90)
returns table (
  node_id uuid, roadmap_slug text, topic_title text, question_id text, prompt text,
  answers integer, correct integer,
  passed_answers integer, passed_correct integer, failed_answers integer, failed_correct integer,
  wrong_with_choice integer, wrong_choice integer, wrong_choice_count integer, wrong_option text)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_from timestamptz := now() - make_interval(days => least(greatest(coalesce(p_days, 90), 1), 400));
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query
  with a as (
    select (e.props ->> 'node_id')::uuid as a_node,
           e.props ->> 'question_id' as a_question,
           (e.props ->> 'correct')::boolean as a_correct,
           case when jsonb_typeof(e.props -> 'passed') = 'boolean' then (e.props ->> 'passed')::boolean end as a_passed,
           case when jsonb_typeof(e.props -> 'choice') = 'number' then (e.props ->> 'choice')::integer end as a_choice
      from public.events e
     where e.name = 'quiz_question_answered'
       and e.created_at >= v_from
       and e.props ->> 'node_id' ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
       and jsonb_typeof(e.props -> 'correct') = 'boolean'
       and e.props ? 'question_id'
  ), agg as (
    select a_node, a_question,
           count(*) as g_answers,
           count(*) filter (where a_correct) as g_correct,
           count(*) filter (where a_passed) as g_passed,
           count(*) filter (where a_passed and a_correct) as g_passed_correct,
           count(*) filter (where a_passed = false) as g_failed,
           count(*) filter (where a_passed = false and a_correct) as g_failed_correct,
           count(*) filter (where not a_correct and a_choice is not null) as g_wrong_choice
      from a
     group by a_node, a_question
  ), wrong as (
    select distinct on (a_node, a_question) a_node as w_node, a_question as w_question, a_choice as w_choice, count(*) as w_count
      from a
     where not a_correct and a_choice is not null
     group by a_node, a_question, a_choice
     order by a_node, a_question, count(*) desc, a_choice
  )
  select agg.a_node, r.slug, n.title, agg.a_question,
         left(qq.qe ->> 'prompt', 200),
         agg.g_answers::integer, agg.g_correct::integer,
         agg.g_passed::integer, agg.g_passed_correct::integer, agg.g_failed::integer, agg.g_failed_correct::integer,
         agg.g_wrong_choice::integer, w.w_choice, w.w_count::integer,
         left(qq.qe -> 'options' ->> w.w_choice, 200)
    from agg
    join public.roadmap_nodes n on n.id = agg.a_node
    join public.roadmaps r on r.id = n.roadmap_id
    left join wrong w on w.w_node = agg.a_node and w.w_question = agg.a_question
    left join lateral (
      select qe
        from public.node_quiz q, jsonb_array_elements(q.questions) qe
       where q.node_id = agg.a_node and qe ->> 'id' = agg.a_question
       limit 1
    ) qq on true
   order by agg.g_answers desc
   limit 500;
end;
$$;

comment on function public.admin_content_questions(integer) is
  'Admins: per quiz question over the last p_days days, answers and correct overall, in passed and failed attempts, and the most chosen wrong option. Counts only.';

-- Lesson signals -----------------------------------------------------------------

-- One row per topic with any signal in the last p_days days:
--   visits, median_ms, median_scroll: lesson_left (time visible, deepest scroll).
--   left_before_fail: failed quiz attempts whose learner's most recent
--     lesson_left in the 24 hours before was this topic. The quiz sits on the
--     lesson page and lesson_left fires on leaving, so this is the lesson read
--     (and left) just before going on to fail a quiz, often another topic's.
--   quiz_attempts, quiz_fails: quiz_submitted on this topic.
--   clear_yes, clear_no, top_reason: lesson_feedback answered in the window.
--   buddy_*: study_buddy_message on this topic (from 14 Nov 2026): messages,
--     chats begun (first turn), deep turns (fifth message or later), and the
--     coarse kind of question (why or compare, code, long). Never the text.
create function public.admin_content_lessons(p_days integer default 90)
returns table (
  node_id uuid, roadmap_slug text, topic_title text,
  visits integer, median_ms integer, median_scroll integer, left_before_fail integer,
  quiz_attempts integer, quiz_fails integer,
  clear_yes integer, clear_no integer, top_reason text,
  buddy_messages integer, buddy_chats integer, buddy_deep integer,
  buddy_why integer, buddy_code integer, buddy_long integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_from timestamptz := now() - make_interval(days => least(greatest(coalesce(p_days, 90), 1), 400));
  v_uuid text := '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query
  with lefts as (
    select e.profile_id as l_profile, (e.props ->> 'node_id')::uuid as l_node, e.created_at as l_at,
           case when jsonb_typeof(e.props -> 'time_spent_ms') = 'number' then (e.props ->> 'time_spent_ms')::numeric end as l_ms,
           case when jsonb_typeof(e.props -> 'scroll_percent') = 'number' then (e.props ->> 'scroll_percent')::numeric end as l_scroll
      from public.events e
     where e.name = 'lesson_left' and e.created_at >= v_from and e.props ->> 'node_id' ~ v_uuid
  ), reads as (
    select l_node as r_node, count(*) as r_visits,
           percentile_cont(0.5) within group (order by l_ms) as r_ms,
           percentile_cont(0.5) within group (order by l_scroll) as r_scroll
      from lefts group by l_node
  ), quizzes as (
    select e.profile_id as q_profile, (e.props ->> 'node_id')::uuid as q_node, e.created_at as q_at,
           (e.props ->> 'passed')::boolean as q_passed
      from public.events e
     where e.name = 'quiz_submitted' and e.created_at >= v_from and e.props ->> 'node_id' ~ v_uuid
       and jsonb_typeof(e.props -> 'passed') = 'boolean'
  ), attempts as (
    select q_node as t_node, count(*) as t_attempts, count(*) filter (where not q_passed) as t_fails
      from quizzes group by q_node
  ), before_fail as (
    select prior.l_node as b_node, count(*) as b_fails
      from quizzes q
      cross join lateral (
        select l.l_node from lefts l
         where l.l_profile = q.q_profile and l.l_at < q.q_at and l.l_at >= q.q_at - interval '24 hours'
         order by l.l_at desc limit 1
      ) prior
     where not q.q_passed and q.q_profile is not null
     group by prior.l_node
  ), feedback as (
    select f.node_id as f_node,
           count(*) filter (where f.clear) as f_yes,
           count(*) filter (where not f.clear) as f_no,
           mode() within group (order by f.reason) filter (where f.reason is not null) as f_reason
      from public.lesson_feedback f
     where f.updated_at >= v_from
     group by f.node_id
  ), buddy as (
    select (e.props ->> 'node_id')::uuid as s_node,
           count(*) as s_messages,
           count(*) filter (where (e.props ->> 'turn') = '1') as s_chats,
           count(*) filter (where jsonb_typeof(e.props -> 'turn') = 'number' and (e.props ->> 'turn')::integer >= 5) as s_deep,
           count(*) filter (where e.props ->> 'kind' = 'intent') as s_why,
           count(*) filter (where e.props ->> 'kind' = 'code') as s_code,
           count(*) filter (where e.props ->> 'kind' = 'long') as s_long
      from public.events e
     where e.name = 'study_buddy_message' and e.created_at >= v_from and e.props ->> 'node_id' ~ v_uuid
     group by 1
  ), topics as (
    select r_node as k from reads
    union select t_node from attempts
    union select b_node from before_fail
    union select f_node from feedback
    union select s_node from buddy
  )
  select n.id, r.slug, n.title,
         coalesce(rd.r_visits, 0)::integer, round(rd.r_ms)::integer, round(rd.r_scroll)::integer,
         coalesce(bf.b_fails, 0)::integer,
         coalesce(att.t_attempts, 0)::integer, coalesce(att.t_fails, 0)::integer,
         coalesce(fb.f_yes, 0)::integer, coalesce(fb.f_no, 0)::integer, fb.f_reason,
         coalesce(bd.s_messages, 0)::integer, coalesce(bd.s_chats, 0)::integer, coalesce(bd.s_deep, 0)::integer,
         coalesce(bd.s_why, 0)::integer, coalesce(bd.s_code, 0)::integer, coalesce(bd.s_long, 0)::integer
    from topics t
    join public.roadmap_nodes n on n.id = t.k
    join public.roadmaps r on r.id = n.roadmap_id
    left join reads rd on rd.r_node = t.k
    left join attempts att on att.t_node = t.k
    left join before_fail bf on bf.b_node = t.k
    left join feedback fb on fb.f_node = t.k
    left join buddy bd on bd.s_node = t.k
   order by coalesce(rd.r_visits, 0) desc
   limit 500;
end;
$$;

comment on function public.admin_content_lessons(integer) is
  'Admins: per topic over the last p_days days, reading (visits, median time and scroll), lessons left just before a failed quiz, quiz attempts and fails, "Was this lesson clear?" answers and Study Buddy counts. Counts only.';

revoke execute on function public.admin_content_questions(integer) from public, anon;
revoke execute on function public.admin_content_lessons(integer) from public, anon;
grant execute on function public.admin_content_questions(integer) to authenticated, service_role;
grant execute on function public.admin_content_lessons(integer) to authenticated, service_role;
