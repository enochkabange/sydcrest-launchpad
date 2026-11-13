-- Attribution (epic #320, step 1): where visits and sign ups come from.
--
-- 1. visit_started joins the accepted event names. The browser records it
--    once per tab session with the campaign tags in the address (utm_source,
--    utm_medium, utm_campaign, utm_content, reduced to slugs), the kind of
--    site that linked to us (src/lib/analytics/attribution.ts; never the
--    address of that page) and whether it landed on an inner page. The
--    landing page's route pattern is the event's route.
-- 2. An index on events (anonymous_id, created_at), so a sign up can be
--    joined to the earlier visits of the same browser.
-- 3. private.first_visit(): the first touch of a browser before a moment.
-- 4. public.profile_first_touch: the first touch kept with the account, so
--    it outlives the 13 month purge of raw events. Filled once per account
--    by the daily maintenance (private.link_first_touch).
-- 5. Two admin reports for the Acquisition and funnel dashboard:
--    admin_insights_acquisition (source, medium, campaign) and
--    admin_insights_landing (landing pages).

-- 1. Event names ------------------------------------------------------------------------

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
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
    'node_opened', 'path_quiz_started', 'path_quiz_completed', 'achievement_shared',
    'profile_published'
  ]);
$$;

-- 2. Index -------------------------------------------------------------------------------

create index events_anonymous_created_idx on public.events (anonymous_id, created_at)
  where anonymous_id is not null;

-- 3. First touch -------------------------------------------------------------------------

-- Where a visit came from: the campaign source if it had one, else the kind of site.
create function private.visit_source(p_props jsonb)
returns text
language sql
immutable
set search_path = ''
as $$
  select coalesce(p_props ->> 'utm_source', p_props ->> 'referrer', 'direct');
$$;

-- The campaign medium if it had one, else none (typed or bookmarked), search, email or referral.
create function private.visit_medium(p_props jsonb)
returns text
language sql
immutable
set search_path = ''
as $$
  select coalesce(
    p_props ->> 'utm_medium',
    case coalesce(p_props ->> 'referrer', 'direct')
      when 'direct' then 'none'
      when 'search' then 'search'
      when 'email' then 'email'
      else 'referral'
    end);
$$;

-- The first touch of one browser (its anonymous id) for something that
-- happened at p_at: among its visits in the 30 days before (and up to 10
-- minutes after, as the browser sends its events in batches), the earliest
-- one that had campaign tags or came from another site; failing that, the
-- earliest typed or bookmarked visit. Visits from another SydCrest tab are
-- not touches.
create function private.first_visit(p_anonymous_id text, p_at timestamptz)
returns table (props jsonb, route text, created_at timestamptz)
language sql
stable
set search_path = ''
as $$
  select e.props, e.route, e.created_at
    from public.events e
   where p_anonymous_id is not null
     and e.anonymous_id = p_anonymous_id
     and e.name = 'visit_started'
     and e.created_at >= p_at - interval '30 days'
     and e.created_at <= p_at + interval '10 minutes'
     and coalesce(e.props ->> 'referrer', 'direct') <> 'internal'
   order by (e.props ? 'utm_source' or coalesce(e.props ->> 'referrer', 'direct') <> 'direct') desc,
            e.created_at
   limit 1;
$$;

revoke execute on function private.visit_source(jsonb) from public;
revoke execute on function private.visit_medium(jsonb) from public;
revoke execute on function private.first_visit(text, timestamptz) from public;
-- Used only inside the definer functions below.

-- 4. First touch on the account ----------------------------------------------------------

create table public.profile_first_touch (
  profile_id    uuid primary key references public.profiles (id) on delete cascade,
  utm_source    text check (char_length(utm_source) <= 80),
  utm_medium    text check (char_length(utm_medium) <= 80),
  utm_campaign  text check (char_length(utm_campaign) <= 80),
  utm_content   text check (char_length(utm_content) <= 80),
  referrer      text check (char_length(referrer) <= 20),
  landing_route text check (char_length(landing_route) <= 200),
  first_seen_at timestamptz not null,
  linked_at     timestamptz not null default now()
);

comment on table public.profile_first_touch is
  'Where a member first came from before signing up (private.first_visit), kept with the account. Written once by the daily maintenance; the privacy page describes it.';

alter table public.profile_first_touch enable row level security;

create policy "Members read their own first touch"
  on public.profile_first_touch for select to authenticated
  using (profile_id = (select auth.uid()));

revoke all on public.profile_first_touch from public, anon, authenticated;
grant select on public.profile_first_touch to authenticated;

-- Fills profile_first_touch for accounts made in the last 60 days that have
-- none yet. A browser is linked to an account by the account's own signed in
-- events, which carry the browser's anonymous id. An email sign up confirmed
-- on another device links only if that device is used again. Returns how
-- many accounts were linked.
create function private.link_first_touch()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  insert into public.profile_first_touch (
    profile_id, utm_source, utm_medium, utm_campaign, utm_content, referrer, landing_route, first_seen_at)
  select p.id,
         f.props ->> 'utm_source',
         f.props ->> 'utm_medium',
         f.props ->> 'utm_campaign',
         f.props ->> 'utm_content',
         coalesce(f.props ->> 'referrer', 'direct'),
         f.route,
         f.created_at
    from public.profiles p
    cross join lateral (
      select v.props, v.route, v.created_at
        from (select distinct e.anonymous_id
                from public.events e
               where e.profile_id = p.id
                 and e.anonymous_id is not null
                 and e.created_at >= p.created_at - interval '1 hour'
                 and e.created_at < p.created_at + interval '30 days') a
        cross join lateral private.first_visit(a.anonymous_id, p.created_at) v
       order by (v.props ? 'utm_source' or coalesce(v.props ->> 'referrer', 'direct') <> 'direct') desc,
                v.created_at
       limit 1
    ) f
   where p.created_at >= now() - interval '60 days'
     and not exists (select 1 from public.profile_first_touch t where t.profile_id = p.id)
  on conflict (profile_id) do nothing;
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke execute on function private.link_first_touch() from public, anon, authenticated;
grant execute on function private.link_first_touch() to service_role;

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
begin
  perform private.refresh_analytics_rollups(v_from, v_to);
  -- Link before the purge, while the visits are still there.
  v_linked := private.link_first_touch();
  v_purged := private.purge_old_events();
  return jsonb_build_object('from', v_from, 'to', v_to, 'purged', v_purged, 'linked', v_linked);
end;
$$;

comment on function public.run_analytics_maintenance(integer) is
  'Daily cron (service role): rebuilds the analytics rollups for the last p_days UTC days, keeps new members'' first touch (profile_first_touch) and deletes raw events older than 13 months.';

-- 5. Reports -----------------------------------------------------------------------------

-- Visits (tab sessions that arrived from outside) and sign ups by source,
-- medium and campaign. A sign up counts under its browser's first touch
-- (private.first_visit); "unknown" when that browser recorded no visit.
create function public.admin_insights_acquisition(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (source text, medium text, campaign text, visits integer, visitors integer, signups integer)
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
    select e.name, e.props, e.anonymous_id, e.profile_id, e.session_id, e.created_at
      from public.events e
     where e.created_at >= v_from and e.created_at < v_to
       and e.name in ('visit_started', 'signup')
       and coalesce(e.device_class, 'unknown') <> 'bot'
       and (p_track is null or e.track = p_track)
       and (p_region is null or e.region = p_region)
       and (p_chapter is null or e.chapter_id = p_chapter)
       and (p_cohort is null or e.cohort_id = p_cohort)
       and (p_device is null or e.device_class = p_device)
  ), touches as (
    select private.visit_source(v.props) as src,
           private.visit_medium(v.props) as med,
           v.props ->> 'utm_campaign' as camp,
           1 as visit,
           coalesce(v.anonymous_id, v.profile_id::text, v.session_id) as who,
           0 as signup
      from ev v
     where v.name = 'visit_started'
       and coalesce(v.props ->> 'referrer', 'direct') <> 'internal'
    union all
    -- No first touch: unknown (visit_source would read a missing visit as direct).
    select case when f.props is null then 'unknown' else private.visit_source(f.props) end,
           case when f.props is null then 'unknown' else private.visit_medium(f.props) end,
           f.props ->> 'utm_campaign',
           0,
           null,
           1
      from ev s
      left join lateral private.first_visit(s.anonymous_id, s.created_at) f on true
     where s.name = 'signup'
  )
  select t.src, t.med, t.camp,
         sum(t.visit)::integer,
         count(distinct t.who)::integer,
         sum(t.signup)::integer
    from touches t
   group by t.src, t.med, t.camp
   order by 4 desc, 6 desc, 1, 2, 3;
end;
$$;

-- Landing pages: where visits from outside first arrived (route patterns),
-- how many were deep links, and sign ups whose first touch landed there.
create function public.admin_insights_landing(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (route text, visits integer, visitors integer, signups integer)
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
    select e.name, e.props, e.route, e.anonymous_id, e.profile_id, e.session_id, e.created_at
      from public.events e
     where e.created_at >= v_from and e.created_at < v_to
       and e.name in ('visit_started', 'signup')
       and coalesce(e.device_class, 'unknown') <> 'bot'
       and (p_track is null or e.track = p_track)
       and (p_region is null or e.region = p_region)
       and (p_chapter is null or e.chapter_id = p_chapter)
       and (p_cohort is null or e.cohort_id = p_cohort)
       and (p_device is null or e.device_class = p_device)
  ), touches as (
    select coalesce(v.route, '/') as page, 1 as visit,
           coalesce(v.anonymous_id, v.profile_id::text, v.session_id) as who, 0 as signup
      from ev v
     where v.name = 'visit_started'
       and coalesce(v.props ->> 'referrer', 'direct') <> 'internal'
    union all
    select coalesce(f.route, 'unknown'), 0, null, 1
      from ev s
      left join lateral private.first_visit(s.anonymous_id, s.created_at) f on true
     where s.name = 'signup'
  )
  select t.page,
         sum(t.visit)::integer,
         count(distinct t.who)::integer,
         sum(t.signup)::integer
    from touches t
   group by t.page
   order by 2 desc, 4 desc, 1
   limit 100;
end;
$$;

revoke execute on function public.admin_insights_acquisition(date, date, text, text, uuid, uuid, text) from public, anon;
revoke execute on function public.admin_insights_landing(date, date, text, text, uuid, uuid, text) from public, anon;
grant execute on function public.admin_insights_acquisition(date, date, text, text, uuid, uuid, text) to authenticated, service_role;
grant execute on function public.admin_insights_landing(date, date, text, text, uuid, uuid, text) to authenticated, service_role;
