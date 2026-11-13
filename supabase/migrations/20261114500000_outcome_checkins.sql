-- Outcome check ins and impact reports (epic #320, issue #329).
--
-- 3, 6 and 12 months after a learner finishes, the daily cron asks how they
-- are doing: working now, where (optional), a monthly earnings band
-- (optional), which skills they use, and whether their answers may count in
-- sponsor reports. "Finished" means either:
--   cohort  the cohort ended (start plus seven days for each programme week,
--           the same rule as /admin/impact) for a learner whose place is
--           active or completed (deferred learners moved on), or
--   track   every topic of a published roadmap marked done (the last one's
--           completed_at).
-- The due dates are worked out in src/lib/outcomes/checkins.ts (unit tested);
-- the database supplies the finishes and stores the rows.
--
-- 1. Event names: outcome_checkin_sent, outcome_checkin_answered.
-- 2. public.outcome_checkins: one row per learner, finish and milestone.
--    The learner reads their own and answers through answer_outcome_checkin;
--    admins read all; only the service role (the cron) creates and sends.
-- 3. Cron helpers (service role): outcome_checkin_finishes, create_outcome_checkins.
-- 4. Reports: private.outcome_report by programme, cohort or chapter, for
--    admins (raw counts) and for sponsors (sponsorship_outcome_report, every
--    count under five held back). Breakdowns use only answers whose learner
--    agreed to be counted; the response rate uses every answer.

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
    -- Learner profile v2 (epic #320)
    'learner_profile_saved', 'profile_field_updated',
    -- Behaviour and work-readiness events (epic #320, step 3)
    'session_started', 'lesson_left', 'resource_opened', 'quiz_question_answered', 'quiz_retried',
    'search_performed', 'filter_applied', 'submission_resubmitted', 'deadline_met', 'deadline_missed',
    'opportunity_viewed', 'opportunity_apply_opened', 'opportunity_applied',
    'opportunity_application_withdrawn', 'opportunity_applicant_moved',
    -- Outcome check ins (epic #320, #329)
    'outcome_checkin_sent', 'outcome_checkin_answered',
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
    'node_opened', 'path_quiz_started', 'path_quiz_completed', 'achievement_shared',
    'profile_published'
  ]);
$$;

-- 2. Table -------------------------------------------------------------------------------

create table public.outcome_checkins (
  id               uuid primary key default gen_random_uuid(),
  profile_id       uuid not null references public.profiles (id) on delete cascade,
  source           text not null check (source in ('cohort', 'track')),
  cohort_id        uuid references public.cohorts (id) on delete cascade,
  roadmap_id       uuid references public.roadmaps (id) on delete cascade,
  finished_on      date not null,
  months           smallint not null check (months in (3, 6, 12)),
  due_on           date not null,
  baseline_status  text check (baseline_status = any (array['student', 'national_service', 'looking', 'employed', 'self_employed'])),
  sent_at          timestamptz,
  skipped_at       timestamptz,
  answered_at      timestamptz,
  work_status      text check (work_status = any (array['employed', 'self_employed', 'freelance', 'studying', 'looking', 'other'])),
  organisation     text check (char_length(btrim(organisation)) between 1 and 120),
  earnings_band    text check (earnings_band = any (array['none', 'under_1000', '1000_2000', '2000_3500', '3500_5000', 'over_5000'])),
  skills           text[] not null default '{}'
                     check (cardinality(skills) <= 20
                            and array_to_string(skills, ',') ~ '^([a-z0-9][a-z0-9-]{0,79}(,|$))*$'),
  share_in_reports boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  check ((source = 'cohort') = (cohort_id is not null)),
  check ((source = 'track') = (roadmap_id is not null)),
  check (due_on > finished_on),
  check (sent_at is null or skipped_at is null),
  check ((answered_at is null) = (work_status is null))
);

comment on table public.outcome_checkins is
  'Outcome check ins (#329): 3, 6 and 12 months after a learner finishes a cohort or a track. Created and sent by the daily cron (service role); the learner answers through answer_outcome_checkin; reports read it through admin_outcome_report and sponsorship_outcome_report. Described on /privacy#outcome-check-ins.';
comment on column public.outcome_checkins.baseline_status is
  'The learner''s About you employment status when the check in was created: the "before" in impact reports.';
comment on column public.outcome_checkins.skipped_at is
  'Set instead of sent_at when the learner had another check in within 60 days, so nobody gets two at once. Skipped rows are left out of response rates.';
comment on column public.outcome_checkins.earnings_band is
  'Optional monthly earnings in Ghana cedis, as a band. Reports show totals only.';
comment on column public.outcome_checkins.share_in_reports is
  'The learner agreed that this answer may count, without their name, in sponsor reports.';

create unique index outcome_checkins_cohort_key
  on public.outcome_checkins (profile_id, cohort_id, months) where source = 'cohort';
create unique index outcome_checkins_track_key
  on public.outcome_checkins (profile_id, roadmap_id, months) where source = 'track';
create index outcome_checkins_cohort_idx on public.outcome_checkins (cohort_id);
create index outcome_checkins_roadmap_idx on public.outcome_checkins (roadmap_id);
create index outcome_checkins_months_idx on public.outcome_checkins (months, due_on);

alter table public.outcome_checkins enable row level security;

create trigger outcome_checkins_set_updated_at
  before update on public.outcome_checkins
  for each row execute function private.set_updated_at();

create policy "Learners read their own check ins; admins read all"
  on public.outcome_checkins for select
  to authenticated
  using (profile_id = (select auth.uid()) or (select private.is_admin()));

-- No insert, update or delete for signed in users: the cron creates and
-- sends, and answers go through answer_outcome_checkin.
revoke all on public.outcome_checkins from public, anon, authenticated;
grant select on public.outcome_checkins to authenticated;
grant select, insert, update, delete on public.outcome_checkins to service_role;

-- The learner answers (or changes an answer to) one of their own check ins
-- once it has been sent. Returns the milestone in months.
create function public.answer_outcome_checkin(
  p_id            uuid,
  p_work_status   text,
  p_organisation  text default null,
  p_earnings_band text default null,
  p_skills        text[] default '{}',
  p_share         boolean default false
)
returns smallint
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_months smallint;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if p_work_status is null then
    raise exception 'Say what you are doing now' using errcode = '22023';
  end if;
  update public.outcome_checkins
     set work_status = p_work_status,
         organisation = nullif(btrim(coalesce(p_organisation, '')), ''),
         earnings_band = p_earnings_band,
         skills = coalesce(p_skills, '{}'),
         share_in_reports = coalesce(p_share, false),
         answered_at = coalesce(answered_at, now())
   where id = p_id
     and profile_id = (select auth.uid())
     and (sent_at is not null or skipped_at is not null)
  returning months into v_months;
  if v_months is null then
    raise exception 'Check in not found' using errcode = '42501';
  end if;
  return v_months;
end;
$$;

revoke execute on function public.answer_outcome_checkin(uuid, text, text, text, text[], boolean) from public, anon;
grant execute on function public.answer_outcome_checkin(uuid, text, text, text, text[], boolean) to authenticated, service_role;

-- 3. Cron helpers (service role) ---------------------------------------------------------

-- Every finish on or between p_from and p_to, with the learner's About you
-- employment status today (the baseline stored on new check ins).
create function public.outcome_checkin_finishes(p_from date, p_to date)
returns table (
  profile_id      uuid,
  source          text,
  cohort_id       uuid,
  roadmap_id      uuid,
  finished_on     date,
  baseline_status text
)
language sql
stable
security definer
set search_path = ''
as $$
  with finishes as (
    select m.profile_id, 'cohort'::text as source, c.id as cohort_id, null::uuid as roadmap_id,
           c.starts_on + 7 * p.duration_weeks as finished_on
      from public.cohort_members m
      join public.cohorts c on c.id = m.cohort_id
      join public.programs p on p.id = c.program_id
     where m.role = 'learner'
       and m.status in ('active', 'completed')
       and c.status <> 'cancelled'
    union all
    select rp.profile_id, 'track', null, r.id, (max(rp.completed_at) at time zone 'Africa/Accra')::date
      from public.roadmap_progress rp
      join public.roadmap_nodes n on n.id = rp.node_id
      join public.roadmaps r on r.id = n.roadmap_id and r.is_published
     where rp.status = 'done'
     group by rp.profile_id, r.id
    having count(*) = (select count(*) from public.roadmap_nodes n2 where n2.roadmap_id = r.id)
  )
  select f.profile_id, f.source, f.cohort_id, f.roadmap_id, f.finished_on, lp.employment_status
    from finishes f
    left join public.learner_profiles lp on lp.profile_id = f.profile_id
   where f.finished_on between p_from and p_to;
$$;

revoke execute on function public.outcome_checkin_finishes(date, date) from public, anon, authenticated;
grant execute on function public.outcome_checkin_finishes(date, date) to service_role;

-- Creates the planned check ins, skipping any that already exist. Returns
-- the new rows. p_rows: [{profile_id, source, cohort_id, roadmap_id,
-- finished_on, months, due_on, baseline_status}, ...].
create function public.create_outcome_checkins(p_rows jsonb)
returns table (id uuid, profile_id uuid, months smallint, due_on date)
language sql
security definer
set search_path = ''
as $$
  insert into public.outcome_checkins as oc
    (profile_id, source, cohort_id, roadmap_id, finished_on, months, due_on, baseline_status)
  select r.profile_id, r.source, r.cohort_id, r.roadmap_id, r.finished_on, r.months, r.due_on, r.baseline_status
    from jsonb_to_recordset(p_rows) as r(
      profile_id uuid, source text, cohort_id uuid, roadmap_id uuid,
      finished_on date, months smallint, due_on date, baseline_status text
    )
  on conflict do nothing
  returning oc.id, oc.profile_id, oc.months, oc.due_on;
$$;

revoke execute on function public.create_outcome_checkins(jsonb) from public, anon, authenticated;
grant execute on function public.create_outcome_checkins(jsonb) to service_role;

-- 4. Reports -----------------------------------------------------------------------------

-- The learners a report covers: programme or cohort learners (any status),
-- or chapter members. The same people private.sponsorship_learners counts.
create function private.outcome_people(p_scope text, p_id uuid)
returns table (profile_id uuid)
language sql
stable
security definer
set search_path = ''
as $$
  select m.profile_id
    from public.cohorts c
    join public.cohort_members m on m.cohort_id = c.id and m.role = 'learner'
   where (p_scope = 'cohort' and c.id = p_id) or (p_scope = 'programme' and c.program_id = p_id)
  union
  select m.profile_id
    from public.chapter_members m
   where p_scope = 'chapter' and m.chapter_id = p_id;
$$;

revoke execute on function private.outcome_people(text, uuid) from public, anon, authenticated;
grant execute on function private.outcome_people(text, uuid) to service_role;

-- One report as (metric, bucket, people) rows. Per learner, their check in
-- at p_months for this programme or cohort (any of theirs for a chapter),
-- the answered one first. Counts below p_min come back as null.
--   learners, sent, answered, shared (agreed to be counted): bucket 'all'
--   working_before, working_after, into_work: bucket 'all', shared answers
--   before (About you status), after (check in status), earnings: by bucket
create function private.outcome_report(p_scope text, p_id uuid, p_months integer, p_min integer)
returns table (metric text, bucket text, people integer)
language sql
stable
security definer
set search_path = ''
as $$
  with covered as (
    select distinct profile_id from private.outcome_people(p_scope, p_id)
  ),
  latest as (
    select distinct on (oc.profile_id)
           oc.profile_id, oc.answered_at, oc.baseline_status, oc.work_status, oc.earnings_band, oc.share_in_reports
      from public.outcome_checkins oc
      join covered cv on cv.profile_id = oc.profile_id
      left join public.cohorts c on c.id = oc.cohort_id
     where oc.months = p_months
       and oc.sent_at is not null
       and (p_scope = 'chapter'
            or (p_scope = 'cohort' and oc.cohort_id = p_id)
            or (p_scope = 'programme' and c.program_id = p_id))
     order by oc.profile_id, oc.answered_at desc nulls last, oc.due_on desc
  ),
  shared as (
    select * from latest where answered_at is not null and share_in_reports
  ),
  counts (metric, bucket, n) as (
    select 'learners', 'all', count(*) from covered
    union all select 'sent', 'all', count(*) from latest
    union all select 'answered', 'all', count(*) from latest where answered_at is not null
    union all select 'shared', 'all', count(*) from shared
    union all select 'working_before', 'all', count(*) from shared
               where baseline_status in ('employed', 'self_employed')
    union all select 'working_after', 'all', count(*) from shared
               where work_status in ('employed', 'self_employed', 'freelance')
    union all select 'into_work', 'all', count(*) from shared
               where coalesce(baseline_status, '') not in ('employed', 'self_employed')
                 and work_status in ('employed', 'self_employed', 'freelance')
    union all select 'before', coalesce(baseline_status, 'not_given'), count(*) from shared group by 2
    union all select 'after', work_status, count(*) from shared group by 2
    union all select 'earnings', coalesce(earnings_band, 'not_given'), count(*) from shared group by 2
  )
  select metric, bucket, case when n >= p_min then n::integer end
    from counts
   where p_months in (3, 6, 12) and p_scope in ('programme', 'cohort', 'chapter');
$$;

revoke execute on function private.outcome_report(text, uuid, integer, integer) from public, anon, authenticated;
grant execute on function private.outcome_report(text, uuid, integer, integer) to service_role;

-- Admins: raw counts for any programme, cohort or chapter.
create function public.admin_outcome_report(p_scope text, p_id uuid, p_months integer)
returns table (metric text, bucket text, people integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return query select r.metric, r.bucket, r.people from private.outcome_report(p_scope, p_id, p_months, 0) r;
end;
$$;

revoke execute on function public.admin_outcome_report(text, uuid, integer) from public, anon;
grant execute on function public.admin_outcome_report(text, uuid, integer) to authenticated, service_role;

-- Sponsors (owners and admins of the organisation) and admins: the report
-- for what a sponsorship covers, every count under five held back.
create function public.sponsorship_outcome_report(p_sponsorship_id uuid, p_months integer)
returns table (metric text, bucket text, people integer)
language sql
stable
security definer
set search_path = ''
as $$
  select r.metric, r.bucket, r.people
    from public.sponsorships s
    cross join lateral private.outcome_report(s.scope, coalesce(s.program_id, s.cohort_id, s.chapter_id), p_months, 5) r
   where s.id = p_sponsorship_id
     and private.can_view_sponsorship(p_sponsorship_id);
$$;

revoke execute on function public.sponsorship_outcome_report(uuid, integer) from public, anon;
grant execute on function public.sponsorship_outcome_report(uuid, integer) to authenticated, service_role;

-- Admins: stories from the learners a programme, cohort or chapter covers,
-- as sponsors see them (a name only when the learner chose to show it).
create function public.admin_outcome_stories(p_scope text, p_id uuid)
returns table (display_name text, story text, updated_at timestamptz)
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
    select case when st.show_name then p.display_name end, st.story, st.updated_at
      from public.learner_stories st
      join public.profiles p on p.id = st.profile_id
     where st.hidden_at is null
       and st.profile_id in (select op.profile_id from private.outcome_people(p_scope, p_id) op)
     order by st.updated_at desc
     limit 50;
end;
$$;

revoke execute on function public.admin_outcome_stories(text, uuid) from public, anon;
grant execute on function public.admin_outcome_stories(text, uuid) to authenticated, service_role;

-- Admins: check ins per milestone (created, sent, skipped, answered, agreed to count).
create function public.admin_outcome_checkin_totals()
returns table (months smallint, created integer, sent integer, skipped integer, answered integer, shared integer)
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
    select oc.months,
           count(*)::integer,
           count(*) filter (where oc.sent_at is not null)::integer,
           count(*) filter (where oc.skipped_at is not null)::integer,
           count(*) filter (where oc.answered_at is not null)::integer,
           count(*) filter (where oc.answered_at is not null and oc.share_in_reports)::integer
      from public.outcome_checkins oc
     group by oc.months
     order by oc.months;
end;
$$;

revoke execute on function public.admin_outcome_checkin_totals() from public, anon;
grant execute on function public.admin_outcome_checkin_totals() to authenticated, service_role;
