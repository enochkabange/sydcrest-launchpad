-- Computed learner attributes and the learner view (epic #320, step 4).
--
-- 1. public.learner_attributes: one row per member, rebuilt by the daily
--    maintenance from progress, submissions, RSVPs, check ins, applications
--    and the analytics events: activity, stage, pace, study rhythm,
--    punctuality, turn up rate, job seeking and first touch.
--    Read by admins (the learner view) and by the member (their own row,
--    for the "My progress" page later). Never shown to employers.
-- 2. private.refresh_learner_attributes(), called by run_analytics_maintenance.
-- 3. Admins read first touches too (the learner view shows where someone came from).
-- 4. Admin functions for the learner view: list and search, one learner's
--    header, roadmap progress and recent activity.
--
-- Stage, on the UTC day of the refresh:
--   new          joined in the last 14 days
--   not_started  joined earlier, never opened a topic
--   active       active in the last 7 days
--   slipping     last active 8 to 21 days ago
--   dormant      last active more than 21 days ago

-- 1. Table -------------------------------------------------------------------------------

create table public.learner_attributes (
  profile_id              uuid primary key references public.profiles (id) on delete cascade,
  computed_at             timestamptz not null default now(),
  joined_on               date not null,
  first_active_on         date,
  last_active_on          date,
  active_days_30          integer not null default 0,
  active_weeks_8          integer not null default 0,
  stage                   text not null check (stage in ('new', 'not_started', 'active', 'slipping', 'dormant')),
  topics_started          integer not null default 0,
  topics_completed        integer not null default 0,
  quizzes_passed          integer not null default 0,
  avg_quiz_score          numeric(5, 1),
  days_to_first_topic     integer,
  usual_hour_band         text,
  usual_device            text,
  quiz_retries_90         integer not null default 0,
  deadlines_met           integer not null default 0,
  deadlines_missed        integer not null default 0,
  on_time_rate            numeric(4, 3),
  resubmissions           integer not null default 0,
  events_going            integer not null default 0,
  events_attended         integer not null default 0,
  event_no_shows          integer not null default 0,
  opportunities_viewed_90 integer not null default 0,
  opportunities_applied   integer not null default 0,
  first_touch_source      text,
  first_touch_campaign    text
);

comment on table public.learner_attributes is
  'Computed daily per member (private.refresh_learner_attributes). Admin learner view and the member''s own progress. Never an employer view. Stage rules are in the migration header.';
comment on column public.learner_attributes.on_time_rate is
  'Cohort work sent by its due date, out of work sent (first sends only); null until one was sent.';
comment on column public.learner_attributes.event_no_shows is
  'Events that ended where the member was going and did not check in.';

create index learner_attributes_stage_idx on public.learner_attributes (stage, last_active_on desc);

alter table public.learner_attributes enable row level security;

create policy "Members read their own attributes, admins read all"
  on public.learner_attributes for select to authenticated
  using (profile_id = (select auth.uid()) or (select private.is_admin()));

revoke all on public.learner_attributes from public, anon, authenticated;
grant select on public.learner_attributes to authenticated;

-- 2. Refresh -----------------------------------------------------------------------------

create function private.refresh_learner_attributes()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_today date := (now() at time zone 'UTC')::date;
  v_count integer;
begin
  with people as (
    select p.id, (p.created_at at time zone 'UTC')::date as joined_on
      from public.profiles p
  ), activity as (
    select e.profile_id,
           min((e.created_at at time zone 'UTC')::date) as first_on,
           max((e.created_at at time zone 'UTC')::date) as last_on,
           count(distinct (e.created_at at time zone 'UTC')::date)
             filter (where e.created_at >= now() - interval '30 days')::integer as days_30,
           count(distinct date_trunc('week', e.created_at at time zone 'UTC'))
             filter (where e.created_at >= now() - interval '56 days')::integer as weeks_8
      from public.events e
     where e.profile_id is not null
       and coalesce(e.device_class, 'unknown') <> 'bot'
     group by e.profile_id
  ), progress as (
    select rp.profile_id,
           count(*) filter (where rp.status in ('in_progress', 'done'))::integer as started,
           count(*) filter (where rp.status = 'done')::integer as completed,
           count(*) filter (where rp.verified_at is not null)::integer as passed,
           round(avg(rp.quiz_score), 1) as avg_score,
           min(rp.created_at) as first_topic_at
      from public.roadmap_progress rp
     group by rp.profile_id
  ), rhythm as (
    select e.profile_id,
           mode() within group (order by e.props ->> 'hour_band') as hour_band
      from public.events e
     where e.name = 'session_started' and e.profile_id is not null
       and e.created_at >= now() - interval '60 days'
     group by e.profile_id
  ), device as (
    select e.profile_id,
           mode() within group (order by e.device_class) as device_class
      from public.events e
     where e.profile_id is not null and e.created_at >= now() - interval '30 days'
       and e.device_class in ('mobile', 'tablet', 'desktop')
     group by e.profile_id
  ), signals as (
    select e.profile_id,
           count(*) filter (where e.name = 'quiz_retried' and e.created_at >= now() - interval '90 days')::integer as retries,
           count(*) filter (where e.name = 'deadline_met')::integer as met,
           count(*) filter (where e.name = 'deadline_missed')::integer as missed,
           count(*) filter (where e.name = 'submission_resubmitted')::integer as resubmitted,
           count(distinct e.props ->> 'opportunity_id')
             filter (where e.name = 'opportunity_viewed' and e.created_at >= now() - interval '90 days')::integer as viewed
      from public.events e
     where e.profile_id is not null
       and e.name in ('quiz_retried', 'deadline_met', 'deadline_missed', 'submission_resubmitted', 'opportunity_viewed')
     group by e.profile_id
  ), rsvps as (
    select r.profile_id,
           count(*) filter (where r.status = 'going')::integer as going,
           count(*) filter (where r.status = 'going' and ce.ends_at < now() and c.profile_id is null)::integer as no_shows
      from public.event_rsvps r
      join public.community_events ce on ce.id = r.event_id
      left join public.event_checkins c on c.event_id = r.event_id and c.profile_id = r.profile_id
     group by r.profile_id
  ), checkins as (
    -- Walk ins count as attended too.
    select c.profile_id, count(*)::integer as attended
      from public.event_checkins c
     group by c.profile_id
  ), applied as (
    select a.profile_id, count(*)::integer as applied
      from public.opportunity_applications a
     where a.stage <> 'withdrawn'
     group by a.profile_id
  ), merged as (
    select pe.id as profile_id,
           pe.joined_on,
           ac.first_on, ac.last_on,
           coalesce(ac.days_30, 0) as days_30,
           coalesce(ac.weeks_8, 0) as weeks_8,
           coalesce(pr.started, 0) as started,
           coalesce(pr.completed, 0) as completed,
           coalesce(pr.passed, 0) as passed,
           pr.avg_score,
           case when pr.first_topic_at is not null
                then greatest(0, (pr.first_topic_at at time zone 'UTC')::date - pe.joined_on) end as to_first,
           rh.hour_band,
           dv.device_class,
           coalesce(sg.retries, 0) as retries,
           coalesce(sg.met, 0) as met,
           coalesce(sg.missed, 0) as missed,
           coalesce(sg.resubmitted, 0) as resubmitted,
           coalesce(sg.viewed, 0) as viewed,
           coalesce(rv.going, 0) as going,
           coalesce(ci.attended, 0) as attended,
           coalesce(rv.no_shows, 0) as no_shows,
           coalesce(ap.applied, 0) as applied,
           coalesce(ft.utm_source, ft.referrer) as ft_source,
           ft.utm_campaign as ft_campaign
      from people pe
      left join activity ac on ac.profile_id = pe.id
      left join progress pr on pr.profile_id = pe.id
      left join rhythm rh on rh.profile_id = pe.id
      left join device dv on dv.profile_id = pe.id
      left join signals sg on sg.profile_id = pe.id
      left join rsvps rv on rv.profile_id = pe.id
      left join checkins ci on ci.profile_id = pe.id
      left join applied ap on ap.profile_id = pe.id
      left join public.profile_first_touch ft on ft.profile_id = pe.id
  )
  insert into public.learner_attributes as la (
    profile_id, computed_at, joined_on, first_active_on, last_active_on, active_days_30, active_weeks_8,
    stage, topics_started, topics_completed, quizzes_passed, avg_quiz_score, days_to_first_topic,
    usual_hour_band, usual_device, quiz_retries_90, deadlines_met, deadlines_missed, on_time_rate,
    resubmissions, events_going, events_attended, event_no_shows, opportunities_viewed_90,
    opportunities_applied, first_touch_source, first_touch_campaign)
  select r.profile_id, now(), r.joined_on, r.first_on, r.last_on, r.days_30, r.weeks_8,
         case
           when r.joined_on > v_today - 14 then 'new'
           when r.started = 0 then 'not_started'
           when r.last_on >= v_today - 7 then 'active'
           when r.last_on >= v_today - 21 then 'slipping'
           else 'dormant'
         end,
         r.started, r.completed, r.passed, r.avg_score, r.to_first,
         r.hour_band, r.device_class, r.retries, r.met, r.missed,
         case when r.met + r.missed > 0 then round(r.met::numeric / (r.met + r.missed), 3) end,
         r.resubmitted, r.going, r.attended, r.no_shows, r.viewed, r.applied, r.ft_source, r.ft_campaign
    from merged r
  on conflict (profile_id) do update set
    computed_at = excluded.computed_at,
    joined_on = excluded.joined_on,
    first_active_on = excluded.first_active_on,
    last_active_on = excluded.last_active_on,
    active_days_30 = excluded.active_days_30,
    active_weeks_8 = excluded.active_weeks_8,
    stage = excluded.stage,
    topics_started = excluded.topics_started,
    topics_completed = excluded.topics_completed,
    quizzes_passed = excluded.quizzes_passed,
    avg_quiz_score = excluded.avg_quiz_score,
    days_to_first_topic = excluded.days_to_first_topic,
    usual_hour_band = excluded.usual_hour_band,
    usual_device = excluded.usual_device,
    quiz_retries_90 = excluded.quiz_retries_90,
    deadlines_met = excluded.deadlines_met,
    deadlines_missed = excluded.deadlines_missed,
    on_time_rate = excluded.on_time_rate,
    resubmissions = excluded.resubmissions,
    events_going = excluded.events_going,
    events_attended = excluded.events_attended,
    event_no_shows = excluded.event_no_shows,
    opportunities_viewed_90 = excluded.opportunities_viewed_90,
    opportunities_applied = excluded.opportunities_applied,
    first_touch_source = excluded.first_touch_source,
    first_touch_campaign = excluded.first_touch_campaign;
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke execute on function private.refresh_learner_attributes() from public, anon, authenticated;
grant execute on function private.refresh_learner_attributes() to service_role;

create or replace function public.run_analytics_maintenance(p_days integer default 3)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_days integer := least(greatest(coalesce(p_days, 3), 1), 400);
  v_to date := (now() at time zone 'UTC')::date;
  v_from date := v_to - (v_days - 1);
  v_purged integer;
  v_linked integer;
  v_learners integer;
begin
  perform private.refresh_analytics_rollups(v_from, v_to);
  -- Link before the purge, while the visits are still there; attributes read the first touch.
  v_linked := private.link_first_touch();
  v_learners := private.refresh_learner_attributes();
  v_purged := private.purge_old_events();
  return jsonb_build_object('from', v_from, 'to', v_to, 'purged', v_purged, 'linked', v_linked, 'learners', v_learners);
end;
$$;

comment on function public.run_analytics_maintenance(integer) is
  'Daily cron (service role): rebuilds the analytics rollups for the last p_days UTC days, keeps new members'' first touch, recomputes learner_attributes and deletes raw events older than 13 months.';

-- 3. Admins read first touches -----------------------------------------------------------

create policy "Admins read every first touch"
  on public.profile_first_touch for select to authenticated
  using ((select private.is_admin()));

-- 4. Learner view functions (admins only) -----------------------------------------------

-- Members by stage, newest activity first, optionally searched by name or exact email.
create function public.admin_learners(p_stage text default null, p_search text default null, p_limit integer default 100)
returns table (
  profile_id uuid, display_name text, region text, role text, joined_on date, stage text,
  last_active_on date, active_days_30 integer, topics_completed integer, on_time_rate numeric,
  first_touch_source text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_search text := nullif(trim(coalesce(p_search, '')), '');
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query
    select p.id, p.display_name, p.region, p.role, la.joined_on, la.stage, la.last_active_on,
           la.active_days_30, la.topics_completed, la.on_time_rate, la.first_touch_source
      from public.profiles p
      join public.learner_attributes la on la.profile_id = p.id
     where (p_stage is null or la.stage = p_stage)
       and (v_search is null
            or p.display_name ilike '%' || replace(replace(v_search, '%', ''), '_', '') || '%'
            or exists (select 1 from auth.users u where u.id = p.id and lower(u.email) = lower(v_search)))
     order by la.last_active_on desc nulls last, la.joined_on desc
     limit least(greatest(coalesce(p_limit, 100), 1), 500);
end;
$$;

-- One member's header for the learner view.
create function public.admin_learner(p_profile_id uuid)
returns table (profile_id uuid, display_name text, region text, role text, created_at timestamptz, is_public boolean)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query
    select p.id, p.display_name, p.region, p.role, p.created_at, coalesce(p.is_public, false)
      from public.profiles p
     where p.id = p_profile_id;
end;
$$;

-- Progress per roadmap the member has touched.
create function public.admin_learner_progress(p_profile_id uuid)
returns table (roadmap_slug text, roadmap_title text, started integer, completed integer, passed integer, total integer, last_at timestamptz)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query
    select r.slug, r.title,
           count(rp.id) filter (where rp.status in ('in_progress', 'done'))::integer,
           count(rp.id) filter (where rp.status = 'done')::integer,
           count(rp.id) filter (where rp.verified_at is not null)::integer,
           (select count(*)::integer from public.roadmap_nodes n2 where n2.roadmap_id = r.id),
           max(rp.updated_at)
      from public.roadmap_progress rp
      join public.roadmap_nodes n on n.id = rp.node_id
      join public.roadmaps r on r.id = n.roadmap_id
     where rp.profile_id = p_profile_id
     group by r.id, r.slug, r.title
     order by max(rp.updated_at) desc;
end;
$$;

revoke execute on function public.admin_learners(text, text, integer) from public, anon;
revoke execute on function public.admin_learner(uuid) from public, anon;
revoke execute on function public.admin_learner_progress(uuid) from public, anon;
grant execute on function public.admin_learners(text, text, integer) to authenticated, service_role;
grant execute on function public.admin_learner(uuid) to authenticated, service_role;
grant execute on function public.admin_learner_progress(uuid) to authenticated, service_role;
