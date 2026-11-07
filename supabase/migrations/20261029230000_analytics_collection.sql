-- Analytics collection (issue #242): the full event taxonomy, standard
-- attributes on every event, failures, UX signals, retention and daily
-- rollups for reporting. Extends the first party pipeline from #51
-- (public.events, funnel_by_week); docs/analytics.md is the reader's guide.
--
-- 1. private.is_event_name(): the one list of accepted event names, used by
--    the events check constraint and by the record function. Add a name by
--    replacing this function in a new migration (and src/lib/analytics/events.ts;
--    a unit test keeps the two in step).
-- 2. Attribute columns on public.events (route, device class, signed in,
--    roles, primary role, track, region, chapter, cohort, session, source).
--    They are NOT granted to users: only private.record_events() writes them,
--    and it derives everything about the person from auth.uid() itself, so a
--    caller cannot claim to be an admin or in someone else's cohort.
-- 3. public.record_events(): the one write path for the app (server actions,
--    the beacon route, the error reporter). Batches of up to 25, props kept
--    flat and small, a per person and a global rate limit.
-- 4. Daily rollups (events_daily, web_vitals_daily, errors_daily,
--    durations_daily, abandonment_daily), admin read only, refreshed with
--    the 13 month purge of raw events by public.run_analytics_maintenance(),
--    which the daily Vercel cron calls with the service role.
--
-- The direct insert grant on public.events from Phase 1 is left as it was
-- (finding A4, #247, is its own issue); with record_events in place it can be
-- revoked without breaking anything here.

-- 1. Event names ---------------------------------------------------------------------

create function private.is_event_name(p_name text)
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
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
    'node_opened', 'path_quiz_started', 'path_quiz_completed', 'achievement_shared',
    'profile_published'
  ]);
$$;

comment on function private.is_event_name(text) is
  'The accepted analytics event names. Replace in a new migration to add one; keep src/lib/analytics/events.ts in step.';

revoke execute on function private.is_event_name(text) from public;
grant execute on function private.is_event_name(text) to anon, authenticated, service_role;

alter table public.events drop constraint events_name_check;
alter table public.events add constraint events_name_check check (private.is_event_name(name));

-- 2. Attribute columns ---------------------------------------------------------------

alter table public.events
  add column source       text check (source in ('server', 'client')),
  add column session_id   text check (session_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'),
  add column route        text check (char_length(route) between 1 and 200 and route like '/%'),
  add column device_class text check (device_class in ('mobile', 'tablet', 'desktop', 'bot', 'unknown')),
  add column signed_in    boolean,
  add column roles        text[] check (cardinality(roles) <= 12),
  add column primary_role text check (primary_role in (
                            'visitor', 'learner', 'applicant', 'cohort', 'chapter_lead',
                            'business', 'expert', 'staff', 'admin')),
  add column track        text check (char_length(track) <= 80),
  add column region       text check (char_length(region) <= 40),
  add column chapter_id   uuid references public.chapters (id) on delete set null,
  add column cohort_id    uuid references public.cohorts (id) on delete set null;

comment on column public.events.source is 'server (actions, routes, the error hook) or client (the beacon). Null on rows written before #242.';
comment on column public.events.session_id is 'Random id for one browser tab session (sessionStorage); groups form starts and submits.';
comment on column public.events.route is 'The route pattern, e.g. /learn/[slug]/[node]; never a filled in path with a person''s slug.';
comment on column public.events.device_class is 'Coarse device class from client hints or the user agent.';
comment on column public.events.signed_in is 'Whether the event was recorded with a session. Null on rows written before #242.';
comment on column public.events.roles is 'Every role the person held when the event was recorded (see primary_role).';
comment on column public.events.primary_role is 'The highest of roles: admin, staff, expert, business, chapter_lead, cohort, applicant, learner; visitor when signed out.';
comment on column public.events.track is 'The roadmap slug recommended by the person''s latest path, else their cohort specialisation.';
comment on column public.events.region is 'The Ghana region slug on the person''s profile.';
comment on column public.events.chapter_id is 'The chapter the person leads or joined first.';
comment on column public.events.cohort_id is 'The cohort the person belongs to (latest active membership).';

-- Reporting reads by name and day, by person and day, and by the attributes.
create index events_profile_created_idx on public.events (profile_id, created_at);
drop index public.events_profile_idx; -- allow-destructive: superseded by events_profile_created_idx (same leading column)
create index events_created_idx on public.events (created_at);
create index events_route_created_idx on public.events (route, created_at) where route is not null;
create index events_cohort_created_idx on public.events (cohort_id, created_at) where cohort_id is not null;
create index events_chapter_created_idx on public.events (chapter_id, created_at) where chapter_id is not null;
create index events_role_created_idx on public.events (primary_role, created_at) where primary_role is not null;
create index events_session_idx on public.events (session_id, name) where session_id is not null;

-- 3. Attributes and the write path ----------------------------------------------------

-- Who someone is, for analytics: derived only from tables, never from the caller.
create function private.analytics_attributes(p_uid uuid)
returns table (
  roles text[], primary_role text, track text, region text, chapter_id uuid, cohort_id uuid
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_roles text[] := array['learner'];
  v_role text;
  v_region text;
  v_track text;
  v_chapter uuid;
  v_cohort uuid;
  v_specialisation text;
begin
  select p.role, p.region into v_role, v_region from public.profiles p where p.id = p_uid;
  if v_role = 'admin' then v_roles := array_append(v_roles, 'admin'); end if;
  if v_role = 'mentor' then v_roles := array_append(v_roles, 'skill_reviewer'); end if;

  if exists (select 1 from public.cohort_members m where m.profile_id = p_uid and m.role in ('mentor', 'coordinator')) then
    v_roles := array_append(v_roles, 'staff');
  end if;
  if exists (select 1 from public.expert_profiles e where e.profile_id = p_uid and e.status = 'approved') then
    v_roles := array_append(v_roles, 'expert');
  elsif exists (select 1 from public.expert_profiles e where e.profile_id = p_uid) then
    v_roles := array_append(v_roles, 'expert_pending');
  end if;
  if exists (select 1 from public.organisation_members o where o.profile_id = p_uid and o.status = 'active') then
    v_roles := array_append(v_roles, 'business');
  end if;
  if exists (select 1 from public.chapter_members c where c.profile_id = p_uid and c.role = 'lead') then
    v_roles := array_append(v_roles, 'chapter_lead');
  end if;

  select m.cohort_id, m.specialization into v_cohort, v_specialisation
    from public.cohort_members m
   where m.profile_id = p_uid
   order by (m.status = 'active') desc, m.created_at desc
   limit 1;
  if v_cohort is not null then
    v_roles := array_append(v_roles, 'cohort');
  elsif exists (select 1 from public.cohort_applications a
                 where a.profile_id = p_uid and a.status in ('submitted', 'waitlisted')) then
    v_roles := array_append(v_roles, 'applicant');
  end if;

  select r.slug into v_track
    from public.personalized_paths pp
    join public.roadmaps r on r.id = pp.recommended_roadmap_id
   where pp.profile_id = p_uid
   order by pp.created_at desc
   limit 1;

  select c.chapter_id into v_chapter
    from public.chapter_members c
   where c.profile_id = p_uid
   order by (c.role = 'lead') desc, c.joined_at
   limit 1;

  return query select
    v_roles,
    case
      when 'admin' = any (v_roles) then 'admin'
      when 'staff' = any (v_roles) then 'staff'
      when 'expert' = any (v_roles) then 'expert'
      when 'business' = any (v_roles) then 'business'
      when 'chapter_lead' = any (v_roles) then 'chapter_lead'
      when 'cohort' = any (v_roles) then 'cohort'
      when 'applicant' = any (v_roles) then 'applicant'
      else 'learner'
    end,
    left(coalesce(v_track, v_specialisation), 80),
    left(v_region, 40),
    v_chapter,
    v_cohort;
end;
$$;

revoke execute on function private.analytics_attributes(uuid) from public, anon, authenticated;
grant execute on function private.analytics_attributes(uuid) to service_role;

-- Flat props only: string, number or boolean values under a lower case key,
-- strings capped at 200 characters, at most 16 keys. Anything else is dropped.
create function private.clean_event_props(p_props jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select coalesce(jsonb_object_agg(k.key, k.value), '{}'::jsonb)
    from (
      select e.key, e.value
        from jsonb_each(case when jsonb_typeof(p_props) = 'object' then p_props else '{}'::jsonb end) e
       where e.key ~ '^[a-z][a-z0-9_]{0,39}$'
         and (jsonb_typeof(e.value) in ('number', 'boolean')
              or (jsonb_typeof(e.value) = 'string' and char_length(e.value #>> '{}') <= 200))
       order by e.key
       limit 16
    ) k;
$$;

revoke execute on function private.clean_event_props(jsonb) from public;
grant execute on function private.clean_event_props(jsonb) to anon, authenticated, service_role;

create function private.clean_route(p_route text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when p_route ~ '^/[A-Za-z0-9_./\[\]()@-]{0,199}$' then p_route
    else null
  end;
$$;

revoke execute on function private.clean_route(text) from public;
grant execute on function private.clean_route(text) to anon, authenticated, service_role;

-- p_events: [{ "name": text, "props": object, "route": text }, ...], 1 to 25.
-- p_context: { "anonymous_id", "session_id", "device_class", "source", "route" }.
-- The person is auth.uid(), never a parameter. Returns how many rows went in;
-- 0 when the batch was refused by a rate limit (analytics never raise at the
-- caller for that). Unknown names and bad rows are skipped, not fatal.
create function private.record_events(p_events jsonb, p_context jsonb default '{}'::jsonb)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_service boolean := coalesce((select auth.role()), '') = 'service_role';
  v_ctx jsonb := case when jsonb_typeof(p_context) = 'object' then p_context else '{}'::jsonb end;
  v_anon text := v_ctx ->> 'anonymous_id';
  v_session text := v_ctx ->> 'session_id';
  v_device text := v_ctx ->> 'device_class';
  v_source text := coalesce(v_ctx ->> 'source', 'server');
  v_route text := private.clean_route(v_ctx ->> 'route');
  v_roles text[] := '{}';
  v_primary text := 'visitor';
  v_track text;
  v_region text;
  v_chapter uuid;
  v_cohort uuid;
  v_count integer;
begin
  if jsonb_typeof(p_events) <> 'array' then
    raise exception 'Events must be an array' using errcode = '22023';
  end if;
  if jsonb_array_length(p_events) = 0 then
    return 0;
  end if;
  if jsonb_array_length(p_events) > 25 then
    raise exception 'At most 25 events at a time' using errcode = '22023';
  end if;

  if v_anon !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then v_anon := null; end if;
  if v_session !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then v_session := null; end if;
  if v_device is null or v_device not in ('mobile', 'tablet', 'desktop', 'bot', 'unknown') then v_device := 'unknown'; end if;
  if v_source not in ('server', 'client') then v_source := 'server'; end if;

  -- Generous limits: they stop floods, not people. One call is one batch.
  if not v_service then
    if v_uid is not null then
      if not private.take_rate_limit('events', v_uid::text, 600, interval '10 minutes') then
        return 0;
      end if;
    elsif not private.take_rate_limit('events_anon', coalesce(v_anon, 'none'), 300, interval '10 minutes')
          or not private.take_rate_limit('events_anon_all', 'all', 20000, interval '10 minutes') then
      return 0;
    end if;
  end if;

  if v_uid is not null then
    select a.roles, a.primary_role, a.track, a.region, a.chapter_id, a.cohort_id
      into v_roles, v_primary, v_track, v_region, v_chapter, v_cohort
      from private.analytics_attributes(v_uid) a;
  end if;

  insert into public.events (
    name, profile_id, anonymous_id, props, source, session_id, route, device_class,
    signed_in, roles, primary_role, track, region, chapter_id, cohort_id
  )
  select e ->> 'name',
         v_uid,
         v_anon,
         private.clean_event_props(e -> 'props'),
         v_source,
         v_session,
         coalesce(private.clean_route(e ->> 'route'), v_route),
         v_device,
         v_uid is not null,
         v_roles,
         v_primary,
         v_track,
         v_region,
         v_chapter,
         v_cohort
    from jsonb_array_elements(p_events) e
   where jsonb_typeof(e) = 'object'
     and private.is_event_name(e ->> 'name');
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke execute on function private.record_events(jsonb, jsonb) from public;
grant execute on function private.record_events(jsonb, jsonb) to anon, authenticated, service_role;

-- The exposed entry point is security invoker (signed out visitors may not
-- run a definer in public); the definer part stays in private.
create function public.record_events(p_events jsonb, p_context jsonb default '{}'::jsonb)
returns integer
language sql
security invoker
set search_path = ''
as $$
  select private.record_events(p_events, p_context);
$$;

comment on function public.record_events(jsonb, jsonb) is
  'Records up to 25 analytics events for the caller (auth.uid(), or anonymous). Attributes are derived server side. Returns the number recorded; 0 when rate limited.';

revoke execute on function public.record_events(jsonb, jsonb) from public;
grant execute on function public.record_events(jsonb, jsonb) to anon, authenticated, service_role;

-- The beacon route also limits each visitor address, as the signed out forms do.
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
    -- Many learners share one address at a venue; this only stops floods.
    when 'beacon'         then private.take_rate_limit('form_beacon', p_key, 3000, interval '1 hour')
    else null
  end;
end;
$$;

comment on function public.take_form_rate_limit(text, text) is
  'Counts one submission of a signed out form (waitlist, sign_up, password_reset) or one analytics beacon for a hashed visitor address. False when that address is over the limit.';

-- 4. Daily rollups ---------------------------------------------------------------------
--
-- Days are UTC dates, which is Africa/Accra time. Each refresh replaces whole
-- days, so running it twice gives the same rows. Text dimensions use '' and
-- uuid dimensions null for "none".

create table public.events_daily (
  id            bigint generated always as identity primary key,
  day           date not null,
  name          text not null,
  route         text not null default '',
  device_class  text not null default 'unknown',
  signed_in     boolean not null,
  primary_role  text not null default 'visitor',
  track         text not null default '',
  region        text not null default '',
  cohort_id     uuid,
  chapter_id    uuid,
  events        integer not null check (events >= 0),
  actors        integer not null check (actors >= 0)
);

comment on table public.events_daily is
  'Events per day and attribute combination. actors = distinct people or visitors (profile id, else anonymous id, else session). Admin read only.';
create index events_daily_day_name_idx on public.events_daily (day, name);
create index events_daily_name_day_idx on public.events_daily (name, day);

create table public.web_vitals_daily (
  id            bigint generated always as identity primary key,
  day           date not null,
  route         text not null default '',
  device_class  text not null default 'unknown',
  metric        text not null check (metric in ('LCP', 'INP', 'CLS', 'FCP', 'TTFB')),
  samples       integer not null check (samples >= 0),
  p50           double precision,
  p75           double precision,
  p95           double precision,
  good          integer not null default 0,
  needs_improvement integer not null default 0,
  poor          integer not null default 0
);

comment on table public.web_vitals_daily is
  'Core Web Vitals per day, route pattern, device class and metric, from the 25% sample of page loads. Milliseconds, except CLS (unitless). Admin read only.';
create index web_vitals_daily_day_idx on public.web_vitals_daily (day, metric);

create table public.errors_daily (
  id            bigint generated always as identity primary key,
  day           date not null,
  name          text not null check (name in ('action_failed', 'server_error', 'client_error')),
  subject       text not null default '',
  refusal       text not null default '',
  code          text not null default '',
  route         text not null default '',
  device_class  text not null default 'unknown',
  occurrences   integer not null check (occurrences >= 0),
  actors        integer not null check (actors >= 0)
);

comment on table public.errors_daily is
  'Failures per day. subject: the action that refused (action_failed), the route type (server_error) or the error kind (client_error). Admin read only.';
create index errors_daily_day_idx on public.errors_daily (day, name);

create table public.durations_daily (
  id            bigint generated always as identity primary key,
  day           date not null,
  metric        text not null check (metric in (
                  'topic_start_to_pass', 'topic_start_to_done', 'application_to_decision',
                  'expert_application_to_decision', 'booking_request_to_accept',
                  'pitch_to_decision', 'submission_to_grade')),
  samples       integer not null check (samples >= 0),
  p50_seconds   double precision,
  p90_seconds   double precision,
  mean_seconds  double precision
);

comment on table public.durations_daily is
  'Time to success from domain timestamps (not client timers), by the day the success happened. Admin read only.';
create index durations_daily_day_idx on public.durations_daily (day, metric);

create table public.abandonment_daily (
  id            bigint generated always as identity primary key,
  day           date not null,
  kind          text not null check (kind in ('form', 'lesson')),
  subject       text not null default '',
  started       integer not null check (started >= 0),
  finished      integer not null check (finished >= 0)
);

comment on table public.abandonment_daily is
  'form: tab sessions that started a form and whether the same session submitted it. lesson: people who opened a lesson that day and whether they have finished it since. subject is the form name or roadmap slug. Admin read only.';
create index abandonment_daily_day_idx on public.abandonment_daily (day, kind);

-- Admins read; nobody but the service role writes.
alter table public.events_daily enable row level security;
alter table public.web_vitals_daily enable row level security;
alter table public.errors_daily enable row level security;
alter table public.durations_daily enable row level security;
alter table public.abandonment_daily enable row level security;

create policy "Admins read events_daily" on public.events_daily for select to authenticated using ((select private.is_admin()));
create policy "Admins read web_vitals_daily" on public.web_vitals_daily for select to authenticated using ((select private.is_admin()));
create policy "Admins read errors_daily" on public.errors_daily for select to authenticated using ((select private.is_admin()));
create policy "Admins read durations_daily" on public.durations_daily for select to authenticated using ((select private.is_admin()));
create policy "Admins read abandonment_daily" on public.abandonment_daily for select to authenticated using ((select private.is_admin()));

revoke all on public.events_daily, public.web_vitals_daily, public.errors_daily,
              public.durations_daily, public.abandonment_daily from anon, authenticated;
grant select on public.events_daily, public.web_vitals_daily, public.errors_daily,
                public.durations_daily, public.abandonment_daily to authenticated;
grant select, insert, update, delete on public.events_daily, public.web_vitals_daily, public.errors_daily,
                public.durations_daily, public.abandonment_daily to service_role;

-- Rebuilds the rollups for [p_from, p_to] (UTC days, inclusive).
create function private.refresh_analytics_rollups(p_from date, p_to date)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_from timestamptz := p_from::timestamp at time zone 'UTC';
  v_to timestamptz := (p_to + 1)::timestamp at time zone 'UTC';
begin
  if p_from is null or p_to is null or p_from > p_to or p_to - p_from > 400 then
    raise exception 'Bad rollup range' using errcode = '22023';
  end if;

  delete from public.events_daily where day between p_from and p_to; -- allow-destructive: rebuilt below
  insert into public.events_daily (day, name, route, device_class, signed_in, primary_role, track, region,
                                   cohort_id, chapter_id, events, actors)
  select (e.created_at at time zone 'UTC')::date, e.name, coalesce(e.route, ''), coalesce(e.device_class, 'unknown'),
         coalesce(e.signed_in, e.profile_id is not null),
         coalesce(e.primary_role, case when e.profile_id is null then 'visitor' else 'learner' end),
         coalesce(e.track, ''), coalesce(e.region, ''), e.cohort_id, e.chapter_id,
         count(*), count(distinct coalesce(e.profile_id::text, e.anonymous_id, e.session_id))
    from public.events e
   where e.created_at >= v_from and e.created_at < v_to
   group by 1, 2, 3, 4, 5, 6, 7, 8, 9, 10;

  delete from public.web_vitals_daily where day between p_from and p_to; -- allow-destructive: rebuilt below
  insert into public.web_vitals_daily (day, route, device_class, metric, samples, p50, p75, p95,
                                       good, needs_improvement, poor)
  select (e.created_at at time zone 'UTC')::date, coalesce(e.route, ''), coalesce(e.device_class, 'unknown'),
         e.props ->> 'metric', count(*),
         percentile_cont(0.5) within group (order by (e.props ->> 'value')::double precision),
         percentile_cont(0.75) within group (order by (e.props ->> 'value')::double precision),
         percentile_cont(0.95) within group (order by (e.props ->> 'value')::double precision),
         count(*) filter (where e.props ->> 'rating' = 'good'),
         count(*) filter (where e.props ->> 'rating' = 'needs-improvement'),
         count(*) filter (where e.props ->> 'rating' = 'poor')
    from public.events e
   where e.created_at >= v_from and e.created_at < v_to
     and e.name = 'web_vital'
     and e.props ->> 'metric' in ('LCP', 'INP', 'CLS', 'FCP', 'TTFB')
     and jsonb_typeof(e.props -> 'value') = 'number'
   group by 1, 2, 3, 4;

  delete from public.errors_daily where day between p_from and p_to; -- allow-destructive: rebuilt below
  insert into public.errors_daily (day, name, subject, refusal, code, route, device_class, occurrences, actors)
  select (e.created_at at time zone 'UTC')::date, e.name,
         left(coalesce(case e.name
                         when 'action_failed' then e.props ->> 'action'
                         when 'server_error' then e.props ->> 'route_type'
                         else e.props ->> 'kind'
                       end, ''), 80),
         coalesce(e.props ->> 'refusal', ''),
         left(coalesce(e.props ->> 'code', e.props ->> 'error', ''), 60),
         coalesce(e.route, ''), coalesce(e.device_class, 'unknown'),
         count(*), count(distinct coalesce(e.profile_id::text, e.anonymous_id, e.session_id))
    from public.events e
   where e.created_at >= v_from and e.created_at < v_to
     and e.name in ('action_failed', 'server_error', 'client_error')
   group by 1, 2, 3, 4, 5, 6, 7;

  delete from public.durations_daily where day between p_from and p_to; -- allow-destructive: rebuilt below
  insert into public.durations_daily (day, metric, samples, p50_seconds, p90_seconds, mean_seconds)
  select d.day, d.metric, count(*),
         percentile_cont(0.5) within group (order by d.seconds),
         percentile_cont(0.9) within group (order by d.seconds),
         avg(d.seconds)
    from (
      select (rp.completed_at at time zone 'UTC')::date as day,
             case when rp.quiz_score is not null then 'topic_start_to_pass' else 'topic_start_to_done' end as metric,
             extract(epoch from rp.completed_at - rp.created_at) as seconds
        from public.roadmap_progress rp
       where rp.completed_at >= v_from and rp.completed_at < v_to
      union all
      select (a.decided_at at time zone 'UTC')::date, 'application_to_decision',
             extract(epoch from a.decided_at - a.created_at)
        from public.cohort_applications a
       where a.decided_at >= v_from and a.decided_at < v_to
      union all
      select (x.decided_at at time zone 'UTC')::date, 'expert_application_to_decision',
             extract(epoch from x.decided_at - x.created_at)
        from public.expert_applications x
       where x.decided_at >= v_from and x.decided_at < v_to
      union all
      -- Bookings opened from an accepted pitch start accepted; they are not a response.
      select (b.responded_at at time zone 'UTC')::date, 'booking_request_to_accept',
             extract(epoch from b.responded_at - b.created_at)
        from public.booking_requests b
       where b.responded_at >= v_from and b.responded_at < v_to
         and b.status in ('accepted', 'completed') and b.pitch_id is null
      union all
      select (p.decided_at at time zone 'UTC')::date, 'pitch_to_decision',
             extract(epoch from p.decided_at - p.created_at)
        from public.pitches p
       where p.decided_at >= v_from and p.decided_at < v_to
      union all
      select (s.graded_at at time zone 'UTC')::date, 'submission_to_grade',
             extract(epoch from s.graded_at - s.submitted_at)
        from public.submissions s
       where s.graded_at >= v_from and s.graded_at < v_to and s.submitted_at is not null
    ) d
   where d.seconds >= 0
   group by d.day, d.metric;

  delete from public.abandonment_daily where day between p_from and p_to; -- allow-destructive: rebuilt below
  insert into public.abandonment_daily (day, kind, subject, started, finished)
  select f.day, 'form', f.form, count(*),
         count(*) filter (where exists (select 1 from public.events t
                                         where t.session_id = f.session_id and t.name = 'form_submitted'
                                           and t.props ->> 'form' = f.form))
    from (
      select s.session_id, s.props ->> 'form' as form, (min(s.created_at) at time zone 'UTC')::date as day
        from public.events s
       where s.created_at >= v_from and s.created_at < v_to
         and s.name = 'form_started' and s.session_id is not null and s.props ? 'form'
       group by s.session_id, s.props ->> 'form'
    ) f
   group by f.day, f.form;

  insert into public.abandonment_daily (day, kind, subject, started, finished)
  select l.day, 'lesson', l.roadmap, count(*),
         count(*) filter (where exists (select 1 from public.roadmap_progress rp
                                         where rp.profile_id = l.profile_id
                                           and rp.node_id::text = l.node_id
                                           and rp.status = 'done'))
    from (
      select o.profile_id, o.props ->> 'node_id' as node_id,
             (min(o.created_at) at time zone 'UTC')::date as day,
             coalesce(min(o.props ->> 'roadmap'), '') as roadmap
        from public.events o
       where o.created_at >= v_from and o.created_at < v_to
         and o.name = 'lesson_opened' and o.profile_id is not null and o.props ? 'node_id'
       group by o.profile_id, o.props ->> 'node_id'
    ) l
   group by l.day, l.roadmap;
end;
$$;

revoke execute on function private.refresh_analytics_rollups(date, date) from public, anon, authenticated;
grant execute on function private.refresh_analytics_rollups(date, date) to service_role;

-- Raw events live 13 months; the rollups stay. Deletes in batches so one run
-- never holds a long lock. Returns how many rows went.
create function private.purge_old_events(p_batch integer default 50000, p_max_batches integer default 20)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_cutoff timestamptz := now() - interval '13 months';
  v_total integer := 0;
  v_rows integer;
begin
  for i in 1 .. greatest(coalesce(p_max_batches, 20), 1) loop
    delete from public.events -- allow-destructive: 13 month retention of raw analytics events (issue #242)
     where id in (select e.id from public.events e where e.created_at < v_cutoff limit greatest(coalesce(p_batch, 50000), 1));
    get diagnostics v_rows = row_count;
    v_total := v_total + v_rows;
    exit when v_rows = 0;
  end loop;
  return v_total;
end;
$$;

revoke execute on function private.purge_old_events(integer, integer) from public, anon, authenticated;
grant execute on function private.purge_old_events(integer, integer) to service_role;

-- What the daily cron calls: refresh the last p_days days (today included)
-- and purge raw events past retention. Service role only.
create function public.run_analytics_maintenance(p_days integer default 3)
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
begin
  perform private.refresh_analytics_rollups(v_from, v_to);
  v_purged := private.purge_old_events();
  return jsonb_build_object('from', v_from, 'to', v_to, 'purged', v_purged);
end;
$$;

comment on function public.run_analytics_maintenance(integer) is
  'Daily cron (service role): rebuilds the analytics rollups for the last p_days UTC days and deletes raw events older than 13 months.';

revoke execute on function public.run_analytics_maintenance(integer) from public, anon, authenticated;
grant execute on function public.run_analytics_maintenance(integer) to service_role;
