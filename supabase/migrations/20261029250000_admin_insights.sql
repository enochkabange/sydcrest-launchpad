-- Admin insights (issue #243): the report functions behind /admin/insights.
--
-- Every function here is security definer with search_path '' and starts
-- with private.insights_guard(), which refuses anyone but an admin (42501)
-- and any date range over 400 days (22023). Execute is granted to
-- authenticated only; the guard is the real gate, the page's requireAdmin
-- the first. docs/analytics.md section 8 describes each number.
--
-- Where the numbers come from:
--   * Counts of events (sign ups, feature use, errors, page views) read the
--     daily rollups from #242 (events_daily, errors_daily, abandonment_daily).
--   * Counts of distinct people (DAU, WAU, MAU, funnel steps, retention,
--     feature users) and Web Vitals percentiles read raw public.events through
--     its (created_at), (name, created_at) and (profile_id, created_at)
--     indexes: rollup actors cannot be added across rows and percentiles
--     cannot be added across days.
--   * Domain dashboards (learning, DMP cohorts, mentors and Earn, community)
--     read the domain tables directly.
--
-- Filters are the same seven arguments on every function, so the CSV route
-- can call any of them the same way; a function ignores filters that do not
-- apply to it (the page only shows the ones that do).
--   track:   events: the track attribute. People: saved a path for that
--            roadmap, or chose it as their cohort specialisation.
--   region:  events: the region attribute. People: profiles.region.
--   chapter: events: the chapter attribute. People: a member of the chapter.
--   cohort:  events: the cohort attribute. People: a member of the cohort.
--   device:  events only: device_class.

-- 1. Guard and shared helpers --------------------------------------------------------

create function private.insights_guard(p_from date, p_to date)
returns void
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Only admins can read insights' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_from > p_to or p_to - p_from > 400 then
    raise exception 'Bad date range' using errcode = '22023';
  end if;
end;
$$;

revoke execute on function private.insights_guard(date, date) from public, anon, authenticated;

-- Profiles matching the people filters (all profiles when every filter is null).
create function private.insights_people(p_track text, p_region text, p_chapter uuid, p_cohort uuid)
returns table (profile_id uuid)
language sql
stable
security definer
set search_path = ''
as $$
  select p.id
    from public.profiles p
   where (p_region is null or p.region = p_region)
     and (p_chapter is null or exists (
           select 1 from public.chapter_members c where c.profile_id = p.id and c.chapter_id = p_chapter))
     and (p_cohort is null or exists (
           select 1 from public.cohort_members m where m.profile_id = p.id and m.cohort_id = p_cohort))
     and (p_track is null
          or exists (select 1
                       from public.personalized_paths pp
                       join public.roadmaps r on r.id = pp.recommended_roadmap_id
                      where pp.profile_id = p.id and r.slug = p_track)
          or exists (select 1 from public.cohort_members m where m.profile_id = p.id and m.specialization = p_track));
$$;

revoke execute on function private.insights_people(text, text, uuid, uuid) from public, anon, authenticated;

-- 2. Indexes for the domain reads ----------------------------------------------------

create index if not exists profiles_created_idx on public.profiles (created_at);
create index if not exists roadmap_progress_created_idx on public.roadmap_progress (created_at);
create index if not exists roadmap_progress_completed_idx on public.roadmap_progress (completed_at) where completed_at is not null;
create index if not exists review_sessions_completed_idx on public.review_sessions (completed_at) where completed_at is not null;
create index if not exists review_answers_answered_idx on public.review_answers (answered_at);
create index if not exists submissions_cohort_submitted_idx on public.submissions (cohort_id, submitted_at) where submitted_at is not null;
create index if not exists booking_requests_created_idx on public.booking_requests (created_at);
create index if not exists briefs_created_idx on public.briefs (created_at);
create index if not exists pitches_created_idx on public.pitches (created_at);
create index if not exists outcomes_created_idx on public.outcomes (created_at);
create index if not exists community_replies_created_idx on public.community_replies (created_at);
create index if not exists community_reactions_created_idx on public.community_reactions (created_at);
create index if not exists event_rsvps_responded_idx on public.event_rsvps (responded_at);
create index if not exists event_checkins_checked_in_idx on public.event_checkins (checked_in_at);
create index if not exists community_events_starts_idx on public.community_events (starts_at);
create index if not exists chapter_members_joined_idx on public.chapter_members (joined_at);

-- 3. Freshness -----------------------------------------------------------------------

-- The last day the rollups hold (rebuilt daily for the last 3 days), or null.
create function public.admin_insights_rollups_to()
returns date
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.insights_guard(current_date, current_date);
  return (select max(d.day) from public.events_daily d);
end;
$$;

-- 4. Overview ------------------------------------------------------------------------

-- Headline numbers. Active people are signed in people with any event (bots
-- left out); visitors are distinct signed out browsers. DAU is the last day
-- of the range, WAU the 7 days and MAU the 30 days ending on it.
create function public.admin_insights_overview(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (active_people integer, visitors integer, dau integer, wau integer, mau integer,
               signups integer, topics_completed integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
  v_mau_from timestamptz := least(p_from, p_to - 29)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with ev as (
    select e.profile_id, e.anonymous_id, e.created_at
      from public.events e
     where e.created_at >= v_mau_from and e.created_at < v_to
       and coalesce(e.device_class, 'unknown') <> 'bot'
       and (p_track is null or e.track = p_track)
       and (p_region is null or e.region = p_region)
       and (p_chapter is null or e.chapter_id = p_chapter)
       and (p_cohort is null or e.cohort_id = p_cohort)
       and (p_device is null or e.device_class = p_device)
  ), sums as (
    select coalesce(sum(d.events) filter (where d.name = 'signup'), 0) as signups,
           coalesce(sum(d.events) filter (where d.name = 'node_completed'), 0) as completed
      from public.events_daily d
     where d.day between p_from and p_to
       and d.name in ('signup', 'node_completed')
       and (p_track is null or d.track = p_track)
       and (p_region is null or d.region = p_region)
       and (p_chapter is null or d.chapter_id = p_chapter)
       and (p_cohort is null or d.cohort_id = p_cohort)
       and (p_device is null or d.device_class = p_device)
  )
  select
    (select count(distinct ev.profile_id) from ev where ev.created_at >= v_from)::integer,
    (select count(distinct ev.anonymous_id) from ev where ev.created_at >= v_from and ev.profile_id is null)::integer,
    (select count(distinct ev.profile_id) from ev where ev.created_at >= v_to - interval '1 day')::integer,
    (select count(distinct ev.profile_id) from ev where ev.created_at >= v_to - interval '7 days')::integer,
    (select count(distinct ev.profile_id) from ev where ev.created_at >= v_to - interval '30 days')::integer,
    (select sums.signups from sums)::integer,
    (select sums.completed from sums)::integer;
end;
$$;

-- One row per day of the range: active people and visitors (raw), sign ups
-- and completed topics (rollups).
create function public.admin_insights_daily(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (day date, active_people integer, visitors integer, signups integer, topics_completed integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with days as (
    select gs::date as day from generate_series(p_from, p_to, interval '1 day') gs
  ), raw as (
    select (e.created_at at time zone 'UTC')::date as day,
           count(distinct e.profile_id) as active,
           count(distinct e.anonymous_id) filter (where e.profile_id is null) as visitors
      from public.events e
     where e.created_at >= v_from and e.created_at < v_to
       and coalesce(e.device_class, 'unknown') <> 'bot'
       and (p_track is null or e.track = p_track)
       and (p_region is null or e.region = p_region)
       and (p_chapter is null or e.chapter_id = p_chapter)
       and (p_cohort is null or e.cohort_id = p_cohort)
       and (p_device is null or e.device_class = p_device)
     group by 1
  ), sums as (
    select d.day,
           sum(d.events) filter (where d.name = 'signup') as signups,
           sum(d.events) filter (where d.name = 'node_completed') as completed
      from public.events_daily d
     where d.day between p_from and p_to
       and d.name in ('signup', 'node_completed')
       and (p_track is null or d.track = p_track)
       and (p_region is null or d.region = p_region)
       and (p_chapter is null or d.chapter_id = p_chapter)
       and (p_cohort is null or d.cohort_id = p_cohort)
       and (p_device is null or d.device_class = p_device)
     group by d.day
  )
  select days.day,
         coalesce(raw.active, 0)::integer,
         coalesce(raw.visitors, 0)::integer,
         coalesce(sums.signups, 0)::integer,
         coalesce(sums.completed, 0)::integer
    from days
    left join raw on raw.day = days.day
    left join sums on sums.day = days.day
   order by days.day;
end;
$$;

-- 5. Acquisition and funnel ----------------------------------------------------------

-- People who did each step within the range, overall ('all') and per device.
-- visited: distinct browsers with a page view; signed_up: sign up events;
-- saved_path: people who saved a path; first_topic: people who opened their
-- first ever topic; first_pass: people who passed their first ever quiz.
create function public.admin_insights_funnel(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (device_class text, visited integer, signed_up integer, saved_path integer,
               first_topic integer, first_pass integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with ev as (
    select e.name, e.profile_id, e.anonymous_id, e.props, coalesce(e.device_class, 'unknown') as device
      from public.events e
     where e.created_at >= v_from and e.created_at < v_to
       and e.name in ('page_view', 'signup', 'path_saved', 'node_started', 'quiz_submitted')
       and coalesce(e.device_class, 'unknown') <> 'bot'
       and (p_track is null or e.track = p_track)
       and (p_region is null or e.region = p_region)
       and (p_chapter is null or e.chapter_id = p_chapter)
       and (p_cohort is null or e.cohort_id = p_cohort)
       and (p_device is null or e.device_class = p_device)
  ), marked as (
    select ev.*,
           (ev.name = 'node_started' and ev.profile_id is not null and not exists (
              select 1 from public.roadmap_progress rp
               where rp.profile_id = ev.profile_id and rp.created_at < v_from)) as is_first_topic,
           (ev.name = 'quiz_submitted' and ev.profile_id is not null and ev.props ->> 'passed' = 'true' and not exists (
              select 1 from public.roadmap_progress rp
               where rp.profile_id = ev.profile_id and rp.quiz_score is not null
                 and rp.status = 'done' and rp.completed_at < v_from)) as is_first_pass
      from ev
  )
  select case when grouping(m.device) = 1 then 'all' else m.device end,
         count(distinct coalesce(m.anonymous_id, m.profile_id::text)) filter (where m.name = 'page_view')::integer,
         count(*) filter (where m.name = 'signup')::integer,
         count(distinct m.profile_id) filter (where m.name = 'path_saved')::integer,
         count(distinct m.profile_id) filter (where m.is_first_topic)::integer,
         count(distinct m.profile_id) filter (where m.is_first_pass)::integer
    from marked m
   group by grouping sets ((), (m.device))
   order by grouping(m.device) desc, 2 desc;
end;
$$;

-- Sign ups by method (email or Google). Referral source is not collected.
create function public.admin_insights_signup_methods(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (method text, signups integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select coalesce(e.props ->> 'method', 'unknown'), count(*)::integer
    from public.events e
   where e.created_at >= v_from and e.created_at < v_to
     and e.name = 'signup'
     and (p_track is null or e.track = p_track)
     and (p_region is null or e.region = p_region)
     and (p_chapter is null or e.chapter_id = p_chapter)
     and (p_cohort is null or e.cohort_id = p_cohort)
     and (p_device is null or e.device_class = p_device)
   group by 1
   order by 2 desc;
end;
$$;

-- Tagged forms: tab sessions that started each form and how many submitted it.
-- The rollup has no person attributes, so only the date range applies.
create function public.admin_insights_forms(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (form text, started integer, finished integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select a.subject, sum(a.started)::integer, sum(a.finished)::integer
    from public.abandonment_daily a
   where a.day between p_from and p_to and a.kind = 'form'
   group by a.subject
   order by 2 desc;
end;
$$;

-- 6. Retention -----------------------------------------------------------------------

-- Weekly sign up cohorts (weeks start Monday, UTC) for accounts created in
-- the range, and how many of each cohort were active (any event while signed
-- in) in each of weeks 1 to 8 after their sign up week. Only weeks that have
-- fully ended are returned: a missing week is "not yet", never zero.
create function public.admin_insights_retention(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (cohort_week date, cohort_size integer, week_offset integer, active integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := date_trunc('week', p_from::timestamp) at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
  v_today date := (now() at time zone 'UTC')::date;
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with people as (
    select p.id, (date_trunc('week', p.created_at at time zone 'UTC'))::date as wk
      from public.profiles p
     where p.created_at >= v_from and p.created_at < v_to
       and (v_all or p.id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
  ), sizes as (
    select people.wk, count(*) as size from people group by people.wk
  ), activity as (
    select people.wk,
           floor(extract(epoch from (e.created_at - (people.wk::timestamp at time zone 'UTC'))) / 604800)::integer as wo,
           count(distinct e.profile_id) as active
      from people
      join public.events e
        on e.profile_id = people.id
       and e.created_at >= (people.wk + 7)::timestamp at time zone 'UTC'
       and e.created_at < (people.wk + 63)::timestamp at time zone 'UTC'
     group by 1, 2
  )
  select s.wk, s.size::integer, w.n, coalesce(a.active, 0)::integer
    from sizes s
   cross join generate_series(1, 8) as w(n)
    left join activity a on a.wk = s.wk and a.wo = w.n
   where s.wk + 7 * (w.n + 1) <= v_today
   order by s.wk desc, w.n;
end;
$$;

-- Weekly sign up cohort sizes (so cohorts with no finished week still show).
create function public.admin_insights_retention_cohorts(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (cohort_week date, cohort_size integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := date_trunc('week', p_from::timestamp) at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select (date_trunc('week', p.created_at at time zone 'UTC'))::date, count(*)::integer
    from public.profiles p
   where p.created_at >= v_from and p.created_at < v_to
     and (v_all or p.id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
   group by 1
   order by 1 desc;
end;
$$;

-- 7. Learning ------------------------------------------------------------------------

-- Per roadmap: learners who started a topic in the range, topics started and
-- finished, quiz topics attempted and passed (best score at or above the
-- pass mark), and lesson opens and finishes from the abandonment rollup
-- (null when a people filter is set: the rollup has no person attributes).
create function public.admin_insights_roadmaps(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (roadmap_slug text, roadmap_title text, learners integer, topics_started integer,
               topics_done integer, quiz_attempted integer, quiz_passed integer,
               lessons_opened integer, lessons_finished integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with prog as (
    select n.roadmap_id, rp.profile_id, rp.created_at, rp.completed_at, rp.status, rp.quiz_score, q.pass_threshold
      from public.roadmap_progress rp
      join public.roadmap_nodes n on n.id = rp.node_id
      left join public.node_quiz q on q.node_id = rp.node_id
     where ((rp.created_at >= v_from and rp.created_at < v_to)
            or (rp.completed_at >= v_from and rp.completed_at < v_to))
       and (v_all or rp.profile_id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
  ), per as (
    select prog.roadmap_id,
           count(distinct prog.profile_id) filter (where prog.created_at >= v_from) as learners,
           count(*) filter (where prog.created_at >= v_from) as started,
           count(*) filter (where prog.status = 'done' and prog.completed_at >= v_from and prog.completed_at < v_to) as done,
           count(*) filter (where prog.quiz_score is not null) as attempted,
           count(*) filter (where prog.quiz_score is not null and prog.quiz_score >= coalesce(prog.pass_threshold, 70)) as passed
      from prog
     group by prog.roadmap_id
  ), lessons as (
    select a.subject, sum(a.started) as opened, sum(a.finished) as finished
      from public.abandonment_daily a
     where a.day between p_from and p_to and a.kind = 'lesson'
     group by a.subject
  )
  select r.slug, r.title,
         coalesce(per.learners, 0)::integer, coalesce(per.started, 0)::integer, coalesce(per.done, 0)::integer,
         coalesce(per.attempted, 0)::integer, coalesce(per.passed, 0)::integer,
         case when v_all then coalesce(lessons.opened, 0)::integer end,
         case when v_all then coalesce(lessons.finished, 0)::integer end
    from public.roadmaps r
    left join per on per.roadmap_id = r.id
    left join lessons on lessons.subject = r.slug
   where per.roadmap_id is not null or (v_all and lessons.subject is not null)
   order by coalesce(per.learners, 0) desc, r.title;
end;
$$;

-- Topics with the most learners stalled: started in the range, not done, and
-- started more than 14 days ago. At most 50 topics.
create function public.admin_insights_topics(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (roadmap_slug text, topic_title text, started integer, done integer,
               quiz_attempted integer, quiz_passed integer, stalled integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select r.slug, n.title,
         count(*)::integer,
         count(*) filter (where rp.status = 'done')::integer,
         count(*) filter (where rp.quiz_score is not null)::integer,
         count(*) filter (where rp.quiz_score is not null and rp.quiz_score >= coalesce(q.pass_threshold, 70))::integer,
         count(*) filter (where rp.status <> 'done' and rp.created_at < now() - interval '14 days')::integer
    from public.roadmap_progress rp
    join public.roadmap_nodes n on n.id = rp.node_id
    join public.roadmaps r on r.id = n.roadmap_id
    left join public.node_quiz q on q.node_id = rp.node_id
   where rp.created_at >= v_from and rp.created_at < v_to
     and (v_all or rp.profile_id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
   group by r.slug, n.id, n.title
   order by 7 desc, 3 desc, n.title
   limit 50;
end;
$$;

-- Review questions answered in the range, hardest first (lowest share
-- correct, then most answered). At most 50.
create function public.admin_insights_questions(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (roadmap_slug text, topic_title text, question_id text, prompt text, answers integer, correct integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with agg as (
    select a.node_id, a.question_id, count(*) as answers, count(*) filter (where a.correct) as correct
      from public.review_answers a
     where a.answered_at >= v_from and a.answered_at < v_to
       and (v_all or a.profile_id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
     group by a.node_id, a.question_id
  )
  select r.slug, n.title, agg.question_id,
         left((select qe ->> 'prompt'
                 from public.node_quiz q, jsonb_array_elements(q.questions) qe
                where q.node_id = agg.node_id and qe ->> 'id' = agg.question_id
                limit 1), 200),
         agg.answers::integer, agg.correct::integer
    from agg
    join public.roadmap_nodes n on n.id = agg.node_id
    join public.roadmaps r on r.id = n.roadmap_id
   order by agg.correct::numeric / agg.answers, agg.answers desc
   limit 50;
end;
$$;

-- Completed reviews per day: sessions, distinct learners, questions, correct.
create function public.admin_insights_reviews(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (day date, sessions integer, learners integer, questions integer, correct integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with days as (
    select gs::date as day from generate_series(p_from, p_to, interval '1 day') gs
  ), agg as (
    select (s.completed_at at time zone 'UTC')::date as day, count(*) as sessions,
           count(distinct s.profile_id) as learners, sum(s.question_count) as questions, sum(s.correct_count) as correct
      from public.review_sessions s
     where s.completed_at >= v_from and s.completed_at < v_to
       and (v_all or s.profile_id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
     group by 1
  )
  select days.day, coalesce(agg.sessions, 0)::integer, coalesce(agg.learners, 0)::integer,
         coalesce(agg.questions, 0)::integer, coalesce(agg.correct, 0)::integer
    from days left join agg on agg.day = days.day
   order by days.day;
end;
$$;

-- 8. Feature use ---------------------------------------------------------------------

-- Per event name: events in the range and in the same length of time just
-- before it (rollups), distinct people or browsers (raw) and days with use.
-- The app groups names into features with EVENTS in src/lib/analytics/events.ts.
create function public.admin_insights_features(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (name text, events integer, previous_events integer, users integer, active_days integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_len integer := p_to - p_from + 1;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with sums as (
    select d.name,
           sum(d.events) filter (where d.day >= p_from) as events,
           sum(d.events) filter (where d.day < p_from) as previous,
           count(distinct d.day) filter (where d.day >= p_from) as days
      from public.events_daily d
     where d.day between p_from - v_len and p_to
       and (p_track is null or d.track = p_track)
       and (p_region is null or d.region = p_region)
       and (p_chapter is null or d.chapter_id = p_chapter)
       and (p_cohort is null or d.cohort_id = p_cohort)
       and (p_device is null or d.device_class = p_device)
     group by d.name
  ), people as (
    select e.name, count(distinct coalesce(e.profile_id::text, e.anonymous_id, e.session_id)) as users
      from public.events e
     where e.created_at >= v_from and e.created_at < v_to
       and (p_track is null or e.track = p_track)
       and (p_region is null or e.region = p_region)
       and (p_chapter is null or e.chapter_id = p_chapter)
       and (p_cohort is null or e.cohort_id = p_cohort)
       and (p_device is null or e.device_class = p_device)
     group by e.name
  )
  select coalesce(sums.name, people.name),
         coalesce(sums.events, 0)::integer, coalesce(sums.previous, 0)::integer,
         coalesce(people.users, 0)::integer, coalesce(sums.days, 0)::integer
    from sums
    full join people on people.name = sums.name
   where coalesce(sums.events, 0) > 0 or coalesce(sums.previous, 0) > 0 or coalesce(people.users, 0) > 0
   order by 2 desc;
end;
$$;

-- 9. DMP cohorts ---------------------------------------------------------------------

-- One row per learner (active or completed) and due week of their path, for
-- cohorts that overlap the range. A week is due on starts_on + 7n and late
-- after the programme's grace days, the same rule as the mentor console
-- (src/lib/mentor/progress.ts). state: on_time (first submission by the end
-- of the grace days), late (after), missing (nothing and the grace days
-- have passed), pending (nothing yet, still inside the grace days).
create function private.insights_learner_weeks(
  p_from date, p_to date, p_track text, p_region text, p_chapter uuid, p_cohort uuid)
returns table (cohort_id uuid, member_id uuid, profile_id uuid, specialization text, member_status text,
               week_number integer, state text, submitted_at timestamptz, final_score integer, pass_score integer)
language sql
stable
security definer
set search_path = ''
as $$
  with c as (
    select co.id, co.starts_on, co.program_id, pr.grace_days, pr.pass_score
      from public.cohorts co
      join public.programs pr on pr.id = co.program_id
     where (p_cohort is null or co.id = p_cohort)
       and co.status <> 'cancelled'
       and co.starts_on <= p_to
       and co.starts_on + 7 * pr.duration_weeks >= p_from
  ), m as (
    select cm.id, cm.cohort_id, cm.profile_id, cm.specialization, cm.status
      from public.cohort_members cm
      join c on c.id = cm.cohort_id
     where cm.role = 'learner' and cm.status in ('active', 'completed')
       and (p_track is null or cm.specialization = p_track)
       and (num_nulls(p_region, p_chapter) = 2
            or cm.profile_id in (select f.profile_id from private.insights_people(null, p_region, p_chapter, null) f))
  ), path as (
    select distinct on (m.id, w.week_number)
           m.id as member_id, m.cohort_id, m.profile_id, m.specialization, m.status, w.id as week_id, w.week_number,
           c.starts_on + 7 * w.week_number as due_on, c.starts_on + 7 * w.week_number + c.grace_days as late_from,
           c.pass_score
      from m
      join c on c.id = m.cohort_id
      join public.program_weeks w on w.program_id = c.program_id
                                 and (w.specialization is null or w.specialization = m.specialization)
     where c.starts_on + 7 * w.week_number < (now() at time zone 'UTC')::date
     order by m.id, w.week_number, (w.specialization is null)
  ), sub as (
    select s.profile_id, s.cohort_id, s.program_week_id, min(s.submitted_at) as first_sent,
           max(s.final_score) filter (where s.status = 'graded') as final_score
      from public.submissions s
      join c on c.id = s.cohort_id
     where s.submitted_at is not null
     group by s.profile_id, s.cohort_id, s.program_week_id
  )
  select path.cohort_id, path.member_id, path.profile_id, path.specialization, path.status, path.week_number,
         case
           when sub.first_sent is not null and sub.first_sent < (path.late_from + 1)::timestamp at time zone 'UTC' then 'on_time'
           when sub.first_sent is not null then 'late'
           when (now() at time zone 'UTC')::date > path.late_from then 'missing'
           else 'pending'
         end,
         sub.first_sent, sub.final_score::integer, path.pass_score::integer
    from path
    left join sub on sub.profile_id = path.profile_id and sub.cohort_id = path.cohort_id and sub.program_week_id = path.week_id;
$$;

revoke execute on function private.insights_learner_weeks(date, date, text, text, uuid, uuid) from public, anon, authenticated;

-- Per cohort overlapping the range. Attendance is not recorded anywhere, so
-- this reports what is: learners active on the platform in the last 7 days.
-- At risk: an active learner with 2 or more missing weeks or 2 or more
-- weeks graded below the pass mark.
create function public.admin_insights_cohorts(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (cohort_id uuid, cohort_name text, program_title text, starts_on date, status text,
               learners integer, completed integer, deferred integer, weeks_due integer,
               on_time integer, late integer, missing integer, graded integer,
               grading_hours_median double precision, active_7d integer, at_risk integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with c as (
    select co.id, co.name, co.starts_on, co.status, pr.title
      from public.cohorts co
      join public.programs pr on pr.id = co.program_id
     where (p_cohort is null or co.id = p_cohort)
       and co.status <> 'cancelled'
       and co.starts_on <= p_to
       and co.starts_on + 7 * pr.duration_weeks >= p_from
  ), lw as (
    select * from private.insights_learner_weeks(p_from, p_to, p_track, p_region, p_chapter, p_cohort)
  ), members as (
    select cm.cohort_id,
           count(*) filter (where cm.status = 'active') as active,
           count(*) filter (where cm.status = 'completed') as completed,
           count(*) filter (where cm.status = 'deferred') as deferred
      from public.cohort_members cm
      join c on c.id = cm.cohort_id
     where cm.role = 'learner'
       and (p_track is null or cm.specialization = p_track)
       and (num_nulls(p_region, p_chapter) = 2
            or cm.profile_id in (select f.profile_id from private.insights_people(null, p_region, p_chapter, null) f))
     group by cm.cohort_id
  ), weeks as (
    select lw.cohort_id,
           count(distinct lw.week_number) as due,
           count(*) filter (where lw.state = 'on_time') as on_time,
           count(*) filter (where lw.state = 'late') as late,
           count(*) filter (where lw.state = 'missing') as missing
      from lw group by lw.cohort_id
  ), risk as (
    select r.cohort_id, count(*) as at_risk
      from (select lw.cohort_id, lw.member_id
              from lw
             where lw.member_status = 'active'
             group by lw.cohort_id, lw.member_id
            having count(*) filter (where lw.state = 'missing') >= 2
                or count(*) filter (where lw.final_score < lw.pass_score) >= 2) r
     group by r.cohort_id
  ), grading as (
    select s.cohort_id, count(*) as graded,
           percentile_cont(0.5) within group (order by extract(epoch from s.graded_at - s.submitted_at) / 3600) as hours
      from public.submissions s
      join c on c.id = s.cohort_id
     where s.graded_at >= v_from and s.graded_at < v_to and s.submitted_at is not null
       and (p_track is null and num_nulls(p_region, p_chapter) = 2
            or s.profile_id in (select lw2.profile_id from lw lw2))
     group by s.cohort_id
  ), recent as (
    select e.cohort_id, count(distinct e.profile_id) as active
      from public.events e
      join c on c.id = e.cohort_id
     where e.created_at >= now() - interval '7 days'
       and e.profile_id in (select cm.profile_id from public.cohort_members cm
                             where cm.cohort_id = e.cohort_id and cm.role = 'learner')
     group by e.cohort_id
  )
  select c.id, c.name, c.title, c.starts_on, c.status,
         coalesce(members.active, 0)::integer, coalesce(members.completed, 0)::integer, coalesce(members.deferred, 0)::integer,
         coalesce(weeks.due, 0)::integer, coalesce(weeks.on_time, 0)::integer, coalesce(weeks.late, 0)::integer,
         coalesce(weeks.missing, 0)::integer, coalesce(grading.graded, 0)::integer, grading.hours,
         coalesce(recent.active, 0)::integer, coalesce(risk.at_risk, 0)::integer
    from c
    left join members on members.cohort_id = c.id
    left join weeks on weeks.cohort_id = c.id
    left join risk on risk.cohort_id = c.id
    left join grading on grading.cohort_id = c.id
    left join recent on recent.cohort_id = c.id
   order by c.starts_on desc, c.name;
end;
$$;

-- At risk learners (rule above) with their display name, which the admin
-- cohort page already shows. No contact details.
create function public.admin_insights_at_risk(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (cohort_name text, learner_name text, specialization text, missing_weeks integer,
               late_weeks integer, below_pass integer, last_submitted date)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with lw as (
    select * from private.insights_learner_weeks(p_from, p_to, p_track, p_region, p_chapter, p_cohort)
  ), per as (
    select lw.cohort_id, lw.member_id, lw.profile_id, lw.specialization,
           count(*) filter (where lw.state = 'missing') as missing,
           count(*) filter (where lw.state = 'late') as late,
           count(*) filter (where lw.final_score < lw.pass_score) as below,
           max(lw.submitted_at) as last_sent
      from lw
     where lw.member_status = 'active'
     group by lw.cohort_id, lw.member_id, lw.profile_id, lw.specialization
  )
  select co.name, coalesce(p.display_name, 'Unnamed learner'), per.specialization,
         per.missing::integer, per.late::integer, per.below::integer, (per.last_sent at time zone 'UTC')::date
    from per
    join public.cohorts co on co.id = per.cohort_id
    join public.profiles p on p.id = per.profile_id
   where per.missing >= 2 or per.below >= 2
   order by per.missing desc, per.below desc, co.name, p.display_name;
end;
$$;

-- 10. Mentors and Earn ---------------------------------------------------------------

-- Headline numbers for bookings, briefs, pitches, experts and outcomes created
-- in the range. Response times are medians in hours. The people filters apply
-- to the requester, poster, expert or learner.
create function public.admin_insights_earn(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (bookings_requested integer, bookings_accepted integer, bookings_completed integer,
               bookings_declined integer, bookings_cancelled integer, booking_response_hours double precision,
               booking_responses integer,
               briefs_posted integer, briefs_awarded integer, pitches_submitted integer, pitches_accepted integer,
               pitches_decided integer, pitch_decision_hours double precision, experts_approved integer, experts_listed integer,
               outcomes_reported integer, outcomes_verified integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with people as (
    select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f where not v_all
  ), b as (
    select * from public.booking_requests br
     where br.created_at >= v_from and br.created_at < v_to
       and (v_all or br.requester_id in (select people.profile_id from people))
  ), br as (
    select * from public.briefs x
     where x.created_at >= v_from and x.created_at < v_to
       and (v_all or x.poster_id in (select people.profile_id from people))
  ), pi as (
    select * from public.pitches x
     where x.created_at >= v_from and x.created_at < v_to
       and (v_all or x.expert_id in (select people.profile_id from people))
  ), o as (
    select * from public.outcomes x
     where x.created_at >= v_from and x.created_at < v_to
       and (v_all or x.profile_id in (select people.profile_id from people))
  )
  select
    (select count(*) from b)::integer,
    (select count(*) from b where b.status in ('accepted', 'completed'))::integer,
    (select count(*) from b where b.status = 'completed')::integer,
    (select count(*) from b where b.status = 'declined')::integer,
    (select count(*) from b where b.status = 'cancelled')::integer,
    (select percentile_cont(0.5) within group (order by extract(epoch from b.responded_at - b.created_at) / 3600)
       from b where b.responded_at is not null and b.pitch_id is null),
    (select count(*) from b where b.responded_at is not null and b.pitch_id is null)::integer,
    (select count(*) from br)::integer,
    (select count(*) from br where br.status = 'awarded')::integer,
    (select count(*) from pi)::integer,
    (select count(*) from pi where pi.status = 'accepted')::integer,
    (select count(*) from pi where pi.decided_at is not null)::integer,
    (select percentile_cont(0.5) within group (order by extract(epoch from pi.decided_at - pi.created_at) / 3600)
       from pi where pi.decided_at is not null),
    (select count(*) from public.expert_profiles ep
      where ep.approved_at >= v_from and ep.approved_at < v_to
        and (v_all or ep.profile_id in (select people.profile_id from people)))::integer,
    (select count(*) from public.expert_profiles ep
      where ep.status = 'approved'
        and (v_all or ep.profile_id in (select people.profile_id from people)))::integer,
    (select count(*) from o)::integer,
    (select count(*) from o where o.verification_status = 'verified')::integer;
end;
$$;

-- Per day: booking requests, briefs posted and pitches sent.
create function public.admin_insights_earn_daily(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (day date, bookings integer, briefs integer, pitches integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with people as (
    select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f where not v_all
  ), days as (
    select gs::date as day from generate_series(p_from, p_to, interval '1 day') gs
  ), b as (
    select (x.created_at at time zone 'UTC')::date as day, count(*) as n from public.booking_requests x
     where x.created_at >= v_from and x.created_at < v_to
       and (v_all or x.requester_id in (select people.profile_id from people)) group by 1
  ), br as (
    select (x.created_at at time zone 'UTC')::date as day, count(*) as n from public.briefs x
     where x.created_at >= v_from and x.created_at < v_to
       and (v_all or x.poster_id in (select people.profile_id from people)) group by 1
  ), pi as (
    select (x.created_at at time zone 'UTC')::date as day, count(*) as n from public.pitches x
     where x.created_at >= v_from and x.created_at < v_to
       and (v_all or x.expert_id in (select people.profile_id from people)) group by 1
  )
  select days.day, coalesce(b.n, 0)::integer, coalesce(br.n, 0)::integer, coalesce(pi.n, 0)::integer
    from days
    left join b on b.day = days.day
    left join br on br.day = days.day
    left join pi on pi.day = days.day
   order by days.day;
end;
$$;

-- Outcomes reported in the range by type, with how many are verified or rejected.
create function public.admin_insights_outcomes(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (type text, reported integer, verified integer, rejected integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_all boolean := num_nulls(p_track, p_region, p_chapter, p_cohort) = 4;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select o.type, count(*)::integer,
         count(*) filter (where o.verification_status = 'verified')::integer,
         count(*) filter (where o.verification_status = 'rejected')::integer
    from public.outcomes o
   where o.created_at >= v_from and o.created_at < v_to
     and (v_all or o.profile_id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
   group by o.type
   order by 2 desc;
end;
$$;

-- 11. Community ----------------------------------------------------------------------

-- Headline numbers. The chapter filter keeps content of that chapter (posts,
-- events, joins); the region filter keeps people from that region.
create function public.admin_insights_community(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (posts integer, replies integer, reactions integer, hidden integer, posters integer,
               events_held integer, rsvps_going integer, checkins integer, chapter_joins integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_people boolean := p_region is not null;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with people as (
    select f.profile_id from private.insights_people(null, p_region, null, null) f where v_people
  ), po as (
    select x.* from public.community_posts x
     where x.created_at >= v_from and x.created_at < v_to
       and (p_chapter is null or x.chapter_id = p_chapter)
       and (not v_people or x.author_id in (select people.profile_id from people))
  ), re as (
    select x.* from public.community_replies x
      join public.community_posts p on p.id = x.post_id
     where x.created_at >= v_from and x.created_at < v_to
       and (p_chapter is null or p.chapter_id = p_chapter)
       and (not v_people or x.author_id in (select people.profile_id from people))
  ), ev as (
    select x.id from public.community_events x
     where (p_chapter is null or x.chapter_id = p_chapter)
  )
  select
    (select count(*) from po)::integer,
    (select count(*) from re)::integer,
    (select count(*) from public.community_reactions x
       left join public.community_posts p on p.id = x.post_id
      where x.created_at >= v_from and x.created_at < v_to
        and (p_chapter is null or p.chapter_id = p_chapter)
        and (not v_people or x.profile_id in (select people.profile_id from people)))::integer,
    ((select count(*) from po where po.hidden_at is not null) + (select count(*) from re where re.hidden_at is not null))::integer,
    (select count(distinct a.author_id) from (select po.author_id from po union all select re.author_id from re) a)::integer,
    (select count(*) from public.community_events x
      where x.starts_at >= v_from and x.starts_at < v_to and x.status in ('published', 'completed')
        and (p_chapter is null or x.chapter_id = p_chapter))::integer,
    (select count(*) from public.event_rsvps x
      where x.responded_at >= v_from and x.responded_at < v_to and x.status = 'going'
        and x.event_id in (select ev.id from ev)
        and (not v_people or x.profile_id in (select people.profile_id from people)))::integer,
    (select count(*) from public.event_checkins x
      where x.checked_in_at >= v_from and x.checked_in_at < v_to
        and x.event_id in (select ev.id from ev)
        and (not v_people or x.profile_id in (select people.profile_id from people)))::integer,
    (select count(*) from public.chapter_members x
      where x.joined_at >= v_from and x.joined_at < v_to
        and (p_chapter is null or x.chapter_id = p_chapter)
        and (not v_people or x.profile_id in (select people.profile_id from people)))::integer;
end;
$$;

-- Per day: posts, replies, RSVPs (going) and check ins, same filters as above.
create function public.admin_insights_community_daily(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (day date, posts integer, replies integer, rsvps integer, checkins integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_people boolean := p_region is not null;
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with people as (
    select f.profile_id from private.insights_people(null, p_region, null, null) f where v_people
  ), days as (
    select gs::date as day from generate_series(p_from, p_to, interval '1 day') gs
  ), po as (
    select (x.created_at at time zone 'UTC')::date as day, count(*) as n from public.community_posts x
     where x.created_at >= v_from and x.created_at < v_to
       and (p_chapter is null or x.chapter_id = p_chapter)
       and (not v_people or x.author_id in (select people.profile_id from people)) group by 1
  ), re as (
    select (x.created_at at time zone 'UTC')::date as day, count(*) as n from public.community_replies x
      join public.community_posts p on p.id = x.post_id
     where x.created_at >= v_from and x.created_at < v_to
       and (p_chapter is null or p.chapter_id = p_chapter)
       and (not v_people or x.author_id in (select people.profile_id from people)) group by 1
  ), rs as (
    select (x.responded_at at time zone 'UTC')::date as day, count(*) as n from public.event_rsvps x
      join public.community_events ce on ce.id = x.event_id
     where x.responded_at >= v_from and x.responded_at < v_to and x.status = 'going'
       and (p_chapter is null or ce.chapter_id = p_chapter)
       and (not v_people or x.profile_id in (select people.profile_id from people)) group by 1
  ), ci as (
    select (x.checked_in_at at time zone 'UTC')::date as day, count(*) as n from public.event_checkins x
      join public.community_events ce on ce.id = x.event_id
     where x.checked_in_at >= v_from and x.checked_in_at < v_to
       and (p_chapter is null or ce.chapter_id = p_chapter)
       and (not v_people or x.profile_id in (select people.profile_id from people)) group by 1
  )
  select days.day, coalesce(po.n, 0)::integer, coalesce(re.n, 0)::integer, coalesce(rs.n, 0)::integer, coalesce(ci.n, 0)::integer
    from days
    left join po on po.day = days.day
    left join re on re.day = days.day
    left join rs on rs.day = days.day
    left join ci on ci.day = days.day
   order by days.day;
end;
$$;

-- Per chapter (draft, paused and closed ones too, for the record):
-- members now, new members, posts, events, RSVPs and check ins in the range.
-- The region filter is the chapter's region here.
create function public.admin_insights_chapters(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (chapter_id uuid, chapter_name text, region text, status text, members integer,
               new_members integer, posts integer, events integer, rsvps integer, checkins integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select ch.id, ch.name, ch.region, ch.status,
         (select count(*) from public.chapter_members m where m.chapter_id = ch.id)::integer,
         (select count(*) from public.chapter_members m
           where m.chapter_id = ch.id and m.joined_at >= v_from and m.joined_at < v_to)::integer,
         (select count(*) from public.community_posts p
           where p.chapter_id = ch.id and p.created_at >= v_from and p.created_at < v_to)::integer,
         (select count(*) from public.community_events ce
           where ce.chapter_id = ch.id and ce.starts_at >= v_from and ce.starts_at < v_to
             and ce.status in ('published', 'completed'))::integer,
         (select count(*) from public.event_rsvps r join public.community_events ce on ce.id = r.event_id
           where ce.chapter_id = ch.id and r.status = 'going' and r.responded_at >= v_from and r.responded_at < v_to)::integer,
         (select count(*) from public.event_checkins k join public.community_events ce on ce.id = k.event_id
           where ce.chapter_id = ch.id and k.checked_in_at >= v_from and k.checked_in_at < v_to)::integer
    from public.chapters ch
   where (p_chapter is null or ch.id = p_chapter)
     and (p_region is null or ch.region = p_region)
   order by 5 desc, ch.name;
end;
$$;

-- 12. Reliability --------------------------------------------------------------------

-- Per day: page views and each kind of failure (rollups), for error rates.
create function public.admin_insights_error_daily(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (day date, page_views integer, server_errors integer, client_errors integer, failed_actions integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with days as (
    select gs::date as day from generate_series(p_from, p_to, interval '1 day') gs
  ), pv as (
    select d.day, sum(d.events) as n from public.events_daily d
     where d.day between p_from and p_to and d.name = 'page_view'
       and (p_device is null or d.device_class = p_device)
     group by d.day
  ), er as (
    select x.day,
           sum(x.occurrences) filter (where x.name = 'server_error') as server,
           sum(x.occurrences) filter (where x.name = 'client_error') as client,
           sum(x.occurrences) filter (where x.name = 'action_failed') as failed
      from public.errors_daily x
     where x.day between p_from and p_to
       and (p_device is null or x.device_class = p_device)
     group by x.day
  )
  select days.day, coalesce(pv.n, 0)::integer, coalesce(er.server, 0)::integer,
         coalesce(er.client, 0)::integer, coalesce(er.failed, 0)::integer
    from days
    left join pv on pv.day = days.day
    left join er on er.day = days.day
   order by days.day;
end;
$$;

-- Errors by kind, subject (failing action, route type or client error kind)
-- and page. At most 100, most frequent first.
create function public.admin_insights_errors(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (name text, subject text, route text, occurrences integer, days integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select x.name, x.subject, x.route, sum(x.occurrences)::integer, count(distinct x.day)::integer
    from public.errors_daily x
   where x.day between p_from and p_to
     and (p_device is null or x.device_class = p_device)
   group by x.name, x.subject, x.route
   order by 4 desc, x.name, x.subject, x.route
   limit 100;
end;
$$;

-- Failure rate per action that failed at least once: successes (rollup
-- count of the action's own event) and failures by refusal type.
create function public.admin_insights_failures(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (action text, successes integer, failures integer, rate_limited integer,
               validation integer, forbidden integer, server_error integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with f as (
    select x.subject,
           sum(x.occurrences) as failures,
           sum(x.occurrences) filter (where x.refusal = 'rate_limited') as rate_limited,
           sum(x.occurrences) filter (where x.refusal = 'validation') as validation,
           sum(x.occurrences) filter (where x.refusal = 'forbidden') as forbidden,
           sum(x.occurrences) filter (where x.refusal = 'server_error') as server_error
      from public.errors_daily x
     where x.day between p_from and p_to and x.name = 'action_failed' and x.subject <> ''
       and (p_device is null or x.device_class = p_device)
     group by x.subject
  ), s as (
    select d.name, sum(d.events) as n
      from public.events_daily d
     where d.day between p_from and p_to and d.name in (select f.subject from f)
       and (p_device is null or d.device_class = p_device)
     group by d.name
  )
  select f.subject, coalesce(s.n, 0)::integer, f.failures::integer,
         coalesce(f.rate_limited, 0)::integer, coalesce(f.validation, 0)::integer,
         coalesce(f.forbidden, 0)::integer, coalesce(f.server_error, 0)::integer
    from f
    left join s on s.name = f.subject
   order by f.failures desc, f.subject;
end;
$$;

-- Web Vitals by page and device: samples, p75 (from the raw samples, since
-- percentiles cannot be added across days) and the rating split.
create function public.admin_insights_vitals(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (route text, device_class text, metric text, samples integer, p75 double precision,
               good integer, needs_improvement integer, poor integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  perform private.insights_guard(p_from, p_to);
  return query
  select coalesce(e.route, ''), coalesce(e.device_class, 'unknown'), e.props ->> 'metric', count(*)::integer,
         percentile_cont(0.75) within group (order by (e.props ->> 'value')::double precision),
         count(*) filter (where e.props ->> 'rating' = 'good')::integer,
         count(*) filter (where e.props ->> 'rating' = 'needs-improvement')::integer,
         count(*) filter (where e.props ->> 'rating' = 'poor')::integer
    from public.events e
   where e.created_at >= v_from and e.created_at < v_to
     and e.name = 'web_vital'
     and e.props ->> 'metric' in ('LCP', 'INP', 'CLS', 'FCP', 'TTFB')
     and jsonb_typeof(e.props -> 'value') = 'number'
     and (p_device is null or e.device_class = p_device)
   group by 1, 2, 3
   order by 4 desc, 1, 2, 3;
end;
$$;

-- 13. Grants -------------------------------------------------------------------------

do $$
declare
  f text;
begin
  foreach f in array array[
    'admin_insights_overview', 'admin_insights_daily', 'admin_insights_funnel', 'admin_insights_signup_methods',
    'admin_insights_forms', 'admin_insights_retention', 'admin_insights_retention_cohorts', 'admin_insights_roadmaps',
    'admin_insights_topics', 'admin_insights_questions', 'admin_insights_reviews', 'admin_insights_features',
    'admin_insights_cohorts', 'admin_insights_at_risk', 'admin_insights_earn', 'admin_insights_earn_daily',
    'admin_insights_outcomes', 'admin_insights_community', 'admin_insights_community_daily', 'admin_insights_chapters',
    'admin_insights_error_daily', 'admin_insights_errors', 'admin_insights_failures', 'admin_insights_vitals'
  ] loop
    execute format('revoke execute on function public.%I(date, date, text, text, uuid, uuid, text) from public, anon', f);
    execute format('grant execute on function public.%I(date, date, text, text, uuid, uuid, text) to authenticated, service_role', f);
  end loop;
end;
$$;

revoke execute on function public.admin_insights_rollups_to() from public, anon;
grant execute on function public.admin_insights_rollups_to() to authenticated, service_role;
