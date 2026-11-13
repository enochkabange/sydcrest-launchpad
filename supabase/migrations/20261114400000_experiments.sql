-- Experiments, holdouts and feature flags (issue #327, epic #320).
--
-- One mechanism for all three. An experiment has a key, two to six variants
-- with whole number weights, and a status (draft, running, stopped). The
-- first variant is the control: what everyone gets while the experiment is
-- not running, and what people who turned analytics off always get.
--   * An A/B test: control first, then one or more changes.
--   * A holdout: the change for most people, and a share who get nothing
--     (reengage_holdout below: nudge 90, holdout 10).
--   * A feature flag: variants off (first) and on; the on weight is the
--     rollout percent.
--
-- Assignment is computed in the app (src/lib/experiments/assign.ts): a hash
-- of the experiment key and the person's id (or the anonymous visitor id)
-- picks a bucket, so a person always lands in the same variant without
-- anything being stored first. There is no SQL copy of the hash: nothing in
-- the database assigns.
--
-- The first time a person meets a running experiment the app records an
-- exposure: one row in experiment_assignments (once per person per
-- experiment) and one experiment_exposed event, so any dashboard can split
-- by variant. Exposures the re-engagement job records for people who are
-- away live in experiment_assignments only: an event under their profile
-- would count as activity and mark a dormant learner active. The Experiments dashboard compares each variant's share of
-- people who came back afterwards (docs/analytics.md, section 13).

-- 1. Experiments ------------------------------------------------------------------------

-- Variants: a JSON array of 2 to 6 {code, weight}; codes unique, lower case
-- words; weights whole numbers from 0 to 10000 that add up to more than 0.
create function private.experiment_variants_ok(p_variants jsonb)
returns boolean
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_item jsonb;
  v_codes text[] := '{}';
  v_total integer := 0;
begin
  if p_variants is null or jsonb_typeof(p_variants) <> 'array'
     or jsonb_array_length(p_variants) not between 2 and 6 then
    return false;
  end if;
  for v_item in select value from jsonb_array_elements(p_variants) loop
    if jsonb_typeof(v_item) <> 'object'
       or (select count(*) from jsonb_object_keys(v_item)) <> 2
       or jsonb_typeof(v_item -> 'code') <> 'string'
       or jsonb_typeof(v_item -> 'weight') <> 'number'
       or (v_item ->> 'code') !~ '^[a-z][a-z0-9_]{0,29}$'
       or (v_item ->> 'weight') !~ '^[0-9]{1,5}$'
       or (v_item ->> 'weight')::integer > 10000
       or (v_item ->> 'code') = any (v_codes) then
      return false;
    end if;
    v_codes := v_codes || (v_item ->> 'code');
    v_total := v_total + (v_item ->> 'weight')::integer;
  end loop;
  return v_total between 1 and 10000;
end;
$$;

revoke execute on function private.experiment_variants_ok(jsonb) from public, anon;
grant execute on function private.experiment_variants_ok(jsonb) to authenticated, service_role;

create table public.experiments (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique check (key ~ '^[a-z][a-z0-9_]{1,59}$'),
  description text not null default '' check (char_length(description) <= 500),
  variants    jsonb not null check (private.experiment_variants_ok(variants)),
  status      text not null default 'draft' check (status in ('draft', 'running', 'stopped')),
  metric      text not null default 'came_back_7d' check (metric in ('came_back_7d', 'active_7d')),
  started_at  timestamptz,
  stopped_at  timestamptz,
  created_by  uuid references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now()
);

comment on table public.experiments is
  'A/B tests, holdouts and feature flags (issue #327). The first variant is the control. Admins create, start and stop them; the app reads running ones through public.running_experiment().';
comment on column public.experiments.variants is
  'JSON array of {code, weight}. A person''s variant is a hash of key and person id into the weights (src/lib/experiments/assign.ts). Fixed once started.';
comment on column public.experiments.metric is
  'came_back_7d: active on a later day within 7 days of exposure (for changes people meet while using the platform). active_7d: active at all within 7 days after exposure (for messages sent to people who are away).';

create index experiments_created_by_idx on public.experiments (created_by);

-- Draft to running to stopped, never back: restarting would mix two runs.
-- Variants and metric are fixed once an experiment starts, since changing
-- the weights would move people between variants mid test.
create function private.experiments_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.created_by := coalesce(new.created_by, (select auth.uid()));
    if new.status = 'running' then new.started_at := coalesce(new.started_at, now()); end if;
    return new;
  end if;
  if new.key <> old.key then
    raise exception 'An experiment''s key cannot change' using errcode = '22023';
  end if;
  if old.status <> 'draft' and (new.variants <> old.variants or new.metric <> old.metric) then
    raise exception 'Variants and metric are fixed once an experiment starts' using errcode = '22023';
  end if;
  if new.status <> old.status then
    if old.status = 'draft' and new.status = 'running' then
      new.started_at := now();
    elsif old.status = 'running' and new.status = 'stopped' then
      new.stopped_at := now();
    else
      raise exception 'An experiment goes from draft to running to stopped' using errcode = '22023';
    end if;
  else
    new.started_at := old.started_at;
    new.stopped_at := old.stopped_at;
  end if;
  return new;
end;
$$;

revoke execute on function private.experiments_guard() from public, anon, authenticated;

create trigger experiments_guard
  before insert or update on public.experiments
  for each row execute function private.experiments_guard();

alter table public.experiments enable row level security;

create policy "Admins read experiments"
  on public.experiments for select to authenticated
  using ((select private.is_admin()));

create policy "Admins create experiments"
  on public.experiments for insert to authenticated
  with check ((select private.is_admin()) and status = 'draft');

create policy "Admins change experiments"
  on public.experiments for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

revoke all on public.experiments from public, anon, authenticated;
grant select on public.experiments to authenticated;
grant insert (key, description, variants, metric) on public.experiments to authenticated;
grant update (description, variants, metric, status) on public.experiments to authenticated;
grant select, insert, update on public.experiments to service_role;

-- 2. Assignments (exposures) --------------------------------------------------------------

create table public.experiment_assignments (
  id            bigint generated always as identity primary key,
  experiment_id uuid not null references public.experiments (id) on delete cascade,
  profile_id    uuid references public.profiles (id) on delete cascade,
  anonymous_id  text check (anonymous_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'),
  variant       text not null check (variant ~ '^[a-z][a-z0-9_]{0,29}$'),
  exposed_at    timestamptz not null default now(),
  check (num_nonnulls(profile_id, anonymous_id) = 1)
);

comment on table public.experiment_assignments is
  'The first time each person (or anonymous visitor) met a running experiment, and the variant they got. One row per person per experiment. Written only by public.record_experiment_exposure(); admins read.';

create unique index experiment_assignments_profile_key
  on public.experiment_assignments (experiment_id, profile_id) where profile_id is not null;
create unique index experiment_assignments_anonymous_key
  on public.experiment_assignments (experiment_id, anonymous_id) where anonymous_id is not null;
create index experiment_assignments_profile_idx on public.experiment_assignments (profile_id);
create index experiment_assignments_exposed_idx on public.experiment_assignments (experiment_id, exposed_at);
-- The dashboard looks up a visitor's later events by their anonymous id.
create index events_anonymous_created_idx on public.events (anonymous_id, created_at) where anonymous_id is not null;

alter table public.experiment_assignments enable row level security;

create policy "Admins read experiment assignments"
  on public.experiment_assignments for select to authenticated
  using ((select private.is_admin()));

revoke all on public.experiment_assignments from public, anon, authenticated;
grant select on public.experiment_assignments to authenticated;
grant select, insert on public.experiment_assignments to service_role;

-- 3. Reading a running experiment ----------------------------------------------------------

-- The variants of a running experiment, or null. Visitors need this too, and
-- the table itself stays admin only (descriptions are internal notes).
create function private.running_experiment(p_key text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select e.variants from public.experiments e where e.key = p_key and e.status = 'running';
$$;

revoke execute on function private.running_experiment(text) from public;
grant execute on function private.running_experiment(text) to anon, authenticated, service_role;

create function public.running_experiment(p_key text)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select private.running_experiment(p_key);
$$;

comment on function public.running_experiment(text) is
  'The variants ([{code, weight}], control first) of a running experiment, or null when there is none by that key or it is not running.';

revoke execute on function public.running_experiment(text) from public;
grant execute on function public.running_experiment(text) to anon, authenticated, service_role;

-- 4. Recording an exposure ------------------------------------------------------------------

-- The subject is the signed in person; else, for the service role (the
-- re-engagement job), p_profile_id; else the anonymous visitor id from the
-- context. Records the assignment and an experiment_exposed event the first
-- time only; for the job, the assignment only (the person is away, and an
-- event under their profile would count as them being active). Returns true
-- when this call recorded it.
create function private.record_experiment_exposure(
  p_key text, p_variant text, p_profile_id uuid default null, p_context jsonb default '{}'::jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_service boolean := coalesce((select auth.role()), '') = 'service_role';
  v_ctx jsonb := case when jsonb_typeof(p_context) = 'object' then p_context else '{}'::jsonb end;
  v_profile uuid;
  v_anon text;
  v_session text := v_ctx ->> 'session_id';
  v_device text := v_ctx ->> 'device_class';
  v_experiment uuid;
  v_variants jsonb;
  v_count integer;
  v_roles text[] := '{}';
  v_primary text := 'visitor';
  v_track text;
  v_region text;
  v_chapter uuid;
  v_cohort uuid;
begin
  if v_uid is not null then
    v_profile := v_uid;
  elsif v_service and p_profile_id is not null then
    v_profile := p_profile_id;
  else
    v_anon := v_ctx ->> 'anonymous_id';
    if v_anon is null or v_anon !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
      return false;
    end if;
  end if;

  select e.id, e.variants into v_experiment, v_variants
    from public.experiments e
   where e.key = p_key and e.status = 'running';
  if v_experiment is null then
    return false;
  end if;
  if not exists (select 1 from jsonb_array_elements(v_variants) v where v ->> 'code' = p_variant) then
    raise exception 'Not a variant of this experiment' using errcode = '22023';
  end if;

  -- Each person is written once per experiment; this only stops floods of made up visitor ids.
  if v_anon is not null and not v_service
     and not private.take_rate_limit('experiment_exposures_anon', 'all', 5000, interval '10 minutes') then
    return false;
  end if;

  insert into public.experiment_assignments (experiment_id, profile_id, anonymous_id, variant)
  values (v_experiment, v_profile, v_anon, p_variant)
  on conflict do nothing;
  get diagnostics v_count = row_count;
  if v_count = 0 then
    return false;
  end if;
  if v_uid is null and v_anon is null then
    return true;
  end if;

  if v_session !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then v_session := null; end if;
  if v_device is null or v_device not in ('mobile', 'tablet', 'desktop', 'bot', 'unknown') then v_device := 'unknown'; end if;
  if v_profile is not null then
    select a.roles, a.primary_role, a.track, a.region, a.chapter_id, a.cohort_id
      into v_roles, v_primary, v_track, v_region, v_chapter, v_cohort
      from private.analytics_attributes(v_profile) a;
  end if;

  insert into public.events (
    name, profile_id, anonymous_id, props, source, session_id, route, device_class,
    signed_in, roles, primary_role, track, region, chapter_id, cohort_id
  ) values (
    'experiment_exposed', v_profile, v_anon,
    jsonb_build_object('experiment', p_key, 'variant', p_variant),
    'server', v_session, private.clean_route(v_ctx ->> 'route'), v_device,
    v_uid is not null, v_roles, v_primary, v_track, v_region, v_chapter, v_cohort
  );
  return true;
end;
$$;

revoke execute on function private.record_experiment_exposure(text, text, uuid, jsonb) from public;
grant execute on function private.record_experiment_exposure(text, text, uuid, jsonb) to anon, authenticated, service_role;

create function public.record_experiment_exposure(
  p_key text, p_variant text, p_profile_id uuid default null, p_context jsonb default '{}'::jsonb)
returns boolean
language sql
security invoker
set search_path = ''
as $$
  select private.record_experiment_exposure(p_key, p_variant, p_profile_id, p_context);
$$;

comment on function public.record_experiment_exposure(text, text, uuid, jsonb) is
  'Records the first exposure of the caller (or, for the service role, p_profile_id; or the context''s anonymous_id) to a running experiment: an assignment row and an experiment_exposed event. True when this call recorded it.';

revoke execute on function public.record_experiment_exposure(text, text, uuid, jsonb) from public;
grant execute on function public.record_experiment_exposure(text, text, uuid, jsonb) to anon, authenticated, service_role;

-- 5. The event name -----------------------------------------------------------------------

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
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
    'node_opened', 'path_quiz_started', 'path_quiz_completed', 'achievement_shared',
    'profile_published',
    -- Experiments (issue #327)
    'experiment_exposed'
  ]);
$$;

-- 6. The Experiments dashboard --------------------------------------------------------------
--
-- One row per experiment and variant (every experiment that is not a draft,
-- with zeros when nobody has met it yet), counting people first exposed in
-- the date range. measured: exposed at least 7 days ago, so their window has
-- closed. came_back: measured people active in their window, by the
-- experiment's metric. Active means any event of theirs except the exposure
-- itself and bot traffic. Filters other than the dates do not apply.
create function public.admin_insights_experiments(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (
  experiment_key text, status text, metric text, started_at timestamptz, stopped_at timestamptz,
  variant text, variant_order integer, weight integer, people integer, measured integer, came_back integer)
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
  with arms as (
    select e.id, e.key, e.status, e.metric, e.started_at, e.stopped_at, e.created_at,
           v.item ->> 'code' as code, (v.item ->> 'weight')::integer as wt, v.n::integer as pos
      from public.experiments e
     cross join lateral jsonb_array_elements(e.variants) with ordinality as v(item, n)
     where e.status <> 'draft'
  ), scored as (
    select a.experiment_id, a.variant,
           a.exposed_at + interval '7 days' <= now() as closed,
           exists (
             select 1 from public.events ev
              where ((a.profile_id is not null and ev.profile_id = a.profile_id)
                     or (a.profile_id is null and ev.anonymous_id = a.anonymous_id))
                and ev.name <> 'experiment_exposed'
                and coalesce(ev.device_class, 'unknown') <> 'bot'
                and ev.created_at < a.exposed_at + interval '7 days'
                and ev.created_at >= case e.metric
                      when 'came_back_7d' then (((a.exposed_at at time zone 'UTC')::date + 1)::timestamp at time zone 'UTC')
                      else a.exposed_at
                    end
           ) as active
      from public.experiment_assignments a
      join public.experiments e on e.id = a.experiment_id
     where a.exposed_at >= v_from and a.exposed_at < v_to
       and e.status <> 'draft'
  ), counts as (
    select s.experiment_id, s.variant,
           count(*)::integer as people,
           count(*) filter (where s.closed)::integer as measured,
           count(*) filter (where s.closed and s.active)::integer as came_back
      from scored s
     group by s.experiment_id, s.variant
  )
  select arms.key, arms.status, arms.metric, arms.started_at, arms.stopped_at,
         arms.code, arms.pos, arms.wt,
         coalesce(c.people, 0), coalesce(c.measured, 0), coalesce(c.came_back, 0)
    from arms
    left join counts c on c.experiment_id = arms.id and c.variant = arms.code
   order by (arms.status = 'running') desc, coalesce(arms.started_at, arms.created_at) desc, arms.key, arms.pos;
end;
$$;

comment on function public.admin_insights_experiments(date, date, text, text, uuid, uuid, text) is
  'Experiments dashboard: per experiment and variant, people first exposed in the range, those whose 7 day window has closed, and how many of them came back. Admins only.';

revoke execute on function public.admin_insights_experiments(date, date, text, text, uuid, uuid, text) from public, anon;
grant execute on function public.admin_insights_experiments(date, date, text, text, uuid, uuid, text) to authenticated, service_role;

-- 7. The re-engagement holdout -----------------------------------------------------------
--
-- One in ten learners the daily WhatsApp nudge would message are held out
-- and get no nudge, so the nudge's real effect on return visits shows on
-- the dashboard. Stop it from /admin/experiments to nudge everyone again.
insert into public.experiments (key, description, variants, status, metric)
values (
  'reengage_holdout',
  'The weekly WhatsApp nudge to learners who went quiet. One in ten are held out and get no nudge, so we can see whether it brings people back.',
  '[{"code": "nudge", "weight": 90}, {"code": "holdout", "weight": 10}]',
  'running',
  'active_7d'
)
on conflict (key) do nothing;
