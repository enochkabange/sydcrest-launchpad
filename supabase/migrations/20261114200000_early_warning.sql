-- Early warning for self-paced learners (#325) and the mentor caseload (#330).
-- Epic #320.
--
-- 1. Risk rules: private.risk_usual_gap, private.risk_reasons, private.risk_level.
--    Pure functions, mirrored in src/lib/early-warning/rules.ts (unit tested
--    there and here, so the two cannot drift).
-- 2. public.learner_risk: one row per learner, rebuilt daily: level (none,
--    watch, at_risk), reason codes and the numbers behind them, and who
--    should act (route): the learner's cohort mentors, else their chapter
--    lead, else admins.
-- 3. public.learner_risk_alerts: one row per flagged stretch, so we can see
--    whether flagged learners came back within 14 days.
-- 4. public.mentor_contacts: a contact a mentor, chapter lead or admin logged
--    with a learner (message, call or session, optional short note).
-- 5. private.refresh_learner_risk(), called by run_analytics_maintenance.
-- 6. Reads: mentor_caseload (cohort staff), chapter_check_ins (chapter
--    leads), admin_insights_mentors, admin_insights_early_warning and
--    admin_insights_risk_learners (admins).
-- 7. Event name mentor_contact_logged.
--
-- Risk stays staff facing: learners do not read their own risk or the
-- contacts logged about them (yet). Device, connection, region and study hour
-- never enter the rules.
--
-- Reasons, on the UTC day of the refresh (q = days since last active):
--   went_quiet        q is at least twice their usual gap between active days
--                     (and at least 7), up to 60 days. Usual gap: 56 days over
--                     their active days in the 56 days up to their last active
--                     day, when there were at least 3.
--   dormant           stage dormant (quiet over 21 days), up to 60 days quiet.
--   missed_deadlines  two or more cohort deadlines missed in the last 28 days.
--   streak_broken     active on 5 or more of the 14 days up to their last active
--                     day, now quiet 3 days or more (and not yet went_quiet).
--   slipping          stage slipping (quiet 8 to 21 days).
--   pace_slowing      at least 4 topics finished in the 56 days before the last
--                     14, and the last 14 days at most half their usual pace.
--   quiz_stuck        3 or more failed quizzes on one topic in 30 days, not yet passed.
--   no_first_topic    saved a path at least 7 days ago, never started a topic.
-- Level: at_risk with went_quiet, dormant or missed_deadlines, or with two
-- or more reasons; watch with one; none otherwise.

-- 1. Rules -------------------------------------------------------------------------------

create function private.risk_usual_gap(p_active_56 integer)
returns integer
language sql
immutable
set search_path = ''
as $$
  select case when p_active_56 >= 3 then ceil(56.0 / p_active_56)::integer end;
$$;

create function private.risk_reasons(
  p_stage text, p_days_quiet integer, p_active_14 integer, p_active_56 integer,
  p_topics_recent integer, p_topics_prior integer, p_quiz_fails integer,
  p_topics_started integer, p_path_age integer, p_deadlines_missed integer)
returns text[]
language sql
immutable
set search_path = ''
as $$
  with g as (
    select coalesce(
             private.risk_usual_gap(p_active_56) is not null
             and p_days_quiet >= greatest(7, 2 * private.risk_usual_gap(p_active_56))
             and p_days_quiet <= 60,
             false) as quiet
  )
  select array_remove(array[
    case when g.quiet then 'went_quiet' end,
    case when p_stage = 'dormant' and p_days_quiet <= 60 then 'dormant' end,
    case when p_deadlines_missed >= 2 then 'missed_deadlines' end,
    case when p_active_14 >= 5 and p_days_quiet between 3 and 60 and not g.quiet then 'streak_broken' end,
    case when p_stage = 'slipping' then 'slipping' end,
    case when p_topics_prior >= 4 and p_topics_recent * 8 <= p_topics_prior then 'pace_slowing' end,
    case when p_quiz_fails >= 3 then 'quiz_stuck' end,
    case when p_topics_started = 0 and p_path_age >= 7 then 'no_first_topic' end
  ], null)
  from g;
$$;

create function private.risk_level(p_reasons text[])
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when p_reasons && array['went_quiet', 'dormant', 'missed_deadlines'] or cardinality(p_reasons) >= 2 then 'at_risk'
    when cardinality(p_reasons) = 1 then 'watch'
    else 'none'
  end;
$$;

revoke execute on function private.risk_usual_gap(integer) from public;
revoke execute on function private.risk_reasons(text, integer, integer, integer, integer, integer, integer, integer, integer, integer) from public;
revoke execute on function private.risk_level(text[]) from public;
grant execute on function private.risk_usual_gap(integer) to service_role;
grant execute on function private.risk_reasons(text, integer, integer, integer, integer, integer, integer, integer, integer, integer) to service_role;
grant execute on function private.risk_level(text[]) to service_role;

-- 2. learner_risk ------------------------------------------------------------------------

create table public.learner_risk (
  profile_id       uuid primary key references public.profiles (id) on delete cascade,
  computed_at      timestamptz not null default now(),
  level            text not null default 'none' check (level in ('none', 'watch', 'at_risk')),
  reasons          text[] not null default '{}' check (reasons <@ array[
                     'went_quiet', 'dormant', 'missed_deadlines', 'streak_broken', 'slipping',
                     'pace_slowing', 'quiz_stuck', 'no_first_topic']::text[]),
  route            text not null check (route in ('mentor', 'chapter_lead', 'admin')),
  -- Cascade: the row is rebuilt at the next refresh with the new route.
  cohort_id        uuid references public.cohorts (id) on delete cascade,
  chapter_id       uuid references public.chapters (id) on delete cascade,
  flagged_since    date,
  days_quiet       integer,
  usual_gap_days   integer,
  topics_recent    integer not null default 0,
  topics_prior     integer not null default 0,
  quiz_fails       integer not null default 0,
  deadlines_missed integer not null default 0,
  check ((route = 'mentor') = (cohort_id is not null)),
  check ((route = 'chapter_lead') = (chapter_id is not null)),
  check ((level = 'none') = (flagged_since is null))
);

comment on table public.learner_risk is
  'Early warning, computed daily per learner (private.refresh_learner_risk). Staff facing: cohort staff (route mentor), the chapter lead (route chapter_lead) and admins. Rules are in the migration header and src/lib/early-warning/rules.ts.';
comment on column public.learner_risk.route is
  'Who should act: mentor (cohort_id, an enrolling or running cohort with staff), chapter_lead (chapter_id, a chapter with a lead), else admin.';
comment on column public.learner_risk.flagged_since is
  'First day of the current stretch at watch or at_risk; null at none.';

create index learner_risk_cohort_idx on public.learner_risk (cohort_id) where cohort_id is not null;
create index learner_risk_chapter_idx on public.learner_risk (chapter_id) where chapter_id is not null;
create index learner_risk_level_idx on public.learner_risk (level, route);

alter table public.learner_risk enable row level security;

create policy "Cohort staff, chapter leads and admins read the learners routed to them"
  on public.learner_risk for select to authenticated
  using (
    (select private.is_admin())
    or (route = 'mentor' and private.is_cohort_staff(cohort_id))
    or (route = 'chapter_lead' and private.is_chapter_lead(chapter_id))
  );

revoke all on public.learner_risk from public, anon, authenticated;
grant select on public.learner_risk to authenticated;
grant select, insert, update, delete on public.learner_risk to service_role;

-- 3. learner_risk_alerts -----------------------------------------------------------------

create table public.learner_risk_alerts (
  id           bigint generated always as identity primary key,
  profile_id   uuid not null references public.profiles (id) on delete cascade,
  raised_on    date not null,
  level        text not null check (level in ('watch', 'at_risk')),
  reasons      text[] not null,
  route        text not null check (route in ('mentor', 'chapter_lead', 'admin')),
  cohort_id    uuid references public.cohorts (id) on delete set null,
  chapter_id   uuid references public.chapters (id) on delete set null,
  came_back_on date,
  closed_on    date,
  check (came_back_on is null or came_back_on > raised_on),
  check (closed_on is null or closed_on >= raised_on)
);

comment on table public.learner_risk_alerts is
  'One row per stretch a learner spent flagged (watch or at_risk), opened and closed by private.refresh_learner_risk. came_back_on: first active day after raised_on. Admins only.';

create unique index learner_risk_alerts_one_open_idx on public.learner_risk_alerts (profile_id) where closed_on is null;
create index learner_risk_alerts_raised_idx on public.learner_risk_alerts (raised_on);
create index learner_risk_alerts_cohort_idx on public.learner_risk_alerts (cohort_id);
create index learner_risk_alerts_chapter_idx on public.learner_risk_alerts (chapter_id);

alter table public.learner_risk_alerts enable row level security;

create policy "Admins read alerts"
  on public.learner_risk_alerts for select to authenticated
  using ((select private.is_admin()));

revoke all on public.learner_risk_alerts from public, anon, authenticated;
grant select on public.learner_risk_alerts to authenticated;
grant select, insert, update, delete on public.learner_risk_alerts to service_role;

-- 4. mentor_contacts ---------------------------------------------------------------------

-- The caller may follow up with this learner: an admin, staff of a cohort
-- the learner is in, or the lead of a chapter the learner is a member of.
create function private.can_contact_learner(p_learner_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin()
      or exists (
           select 1
             from public.cohort_members staff
             join public.cohort_members learner on learner.cohort_id = staff.cohort_id
            where staff.profile_id = (select auth.uid())
              and staff.role in ('mentor', 'coordinator')
              and learner.profile_id = p_learner_id
              and learner.role = 'learner')
      or exists (
           select 1
             from public.chapter_members lead
             join public.chapter_members m on m.chapter_id = lead.chapter_id
            where lead.profile_id = (select auth.uid())
              and lead.role = 'lead'
              and m.profile_id = p_learner_id);
$$;

revoke execute on function private.can_contact_learner(uuid) from public, anon;
grant execute on function private.can_contact_learner(uuid) to authenticated, service_role;

create table public.mentor_contacts (
  id         uuid primary key default gen_random_uuid(),
  mentor_id  uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  learner_id uuid not null references public.profiles (id) on delete cascade,
  kind       text not null check (kind in ('message', 'call', 'session')),
  note       text check (char_length(note) between 1 and 280),
  created_at timestamptz not null default now(),
  check (mentor_id <> learner_id)
);

comment on table public.mentor_contacts is
  'A follow up logged from the caseload: who (mentor_id: cohort staff, chapter lead or admin), with whom, how, and an optional short note. Staff facing; deleted with either account.';

create index mentor_contacts_learner_idx on public.mentor_contacts (learner_id, created_at desc);
create index mentor_contacts_mentor_idx on public.mentor_contacts (mentor_id, created_at desc);

alter table public.mentor_contacts enable row level security;

create policy "Staff read contacts with learners they follow up"
  on public.mentor_contacts for select to authenticated
  using (mentor_id = (select auth.uid()) or private.can_contact_learner(learner_id));

create policy "Staff log contacts as themselves"
  on public.mentor_contacts for insert to authenticated
  with check (mentor_id = (select auth.uid()) and private.can_contact_learner(learner_id));

create policy "Authors delete their own contacts"
  on public.mentor_contacts for delete to authenticated
  using (mentor_id = (select auth.uid()));

revoke all on public.mentor_contacts from public, anon, authenticated;
grant select, delete on public.mentor_contacts to authenticated;
grant insert (learner_id, kind, note) on public.mentor_contacts to authenticated;
grant select, insert, update, delete on public.mentor_contacts to service_role;

-- 5. Refresh -----------------------------------------------------------------------------

create function private.refresh_learner_risk()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_today date := (now() at time zone 'UTC')::date;
  v_count integer;
begin
  -- Only learners: admins and cohort staff are not followed up.
  delete from public.learner_risk r -- allow-destructive: drops rows of people who are no longer learners; rebuilt daily
   where not exists (
     select 1 from public.profiles p
       join public.learner_attributes la on la.profile_id = p.id
      where p.id = r.profile_id and p.role = 'learner')
      or exists (
     select 1 from public.cohort_members s
      where s.profile_id = r.profile_id and s.role in ('mentor', 'coordinator'));

  with learners as (
    select la.profile_id, la.stage, la.last_active_on, la.topics_started
      from public.learner_attributes la
      join public.profiles p on p.id = la.profile_id
     where p.role = 'learner'
       and not exists (select 1 from public.cohort_members s
                        where s.profile_id = p.id and s.role in ('mentor', 'coordinator'))
  ), days as (
    select distinct e.profile_id, (e.created_at at time zone 'UTC')::date as day
      from public.events e
      join learners l on l.profile_id = e.profile_id
     where e.created_at >= now() - interval '130 days'
       and coalesce(e.device_class, 'unknown') <> 'bot'
  ), rhythm as (
    select d.profile_id,
           count(*) filter (where d.day > l.last_active_on - 14)::integer as a14,
           count(*) filter (where d.day > l.last_active_on - 56)::integer as a56
      from days d
      join learners l on l.profile_id = d.profile_id
     where d.day <= l.last_active_on
     group by d.profile_id
  ), pace as (
    select rp.profile_id,
           count(*) filter (where rp.completed_at >= now() - interval '14 days')::integer as recent,
           count(*) filter (where rp.completed_at < now() - interval '14 days')::integer as prior
      from public.roadmap_progress rp
     where rp.status = 'done' and rp.completed_at >= now() - interval '70 days'
     group by rp.profile_id
  ), fails as (
    select f.profile_id, max(f.fails)::integer as fails
      from (select e.profile_id, e.props ->> 'node_id' as node_id, count(*) as fails
              from public.events e
             where e.name = 'quiz_submitted'
               and e.profile_id is not null
               and e.created_at >= now() - interval '30 days'
               and e.props ->> 'passed' = 'false'
             group by e.profile_id, e.props ->> 'node_id') f
     where not exists (
       select 1 from public.roadmap_progress rp
        where rp.profile_id = f.profile_id and rp.node_id::text = f.node_id and rp.verified_at is not null)
     group by f.profile_id
  ), missed as (
    select e.profile_id, count(*)::integer as missed
      from public.events e
     where e.name = 'deadline_missed' and e.profile_id is not null
       and e.created_at >= now() - interval '28 days'
     group by e.profile_id
  ), paths as (
    select pp.profile_id, min(pp.created_at) as saved_at
      from public.personalized_paths pp
     group by pp.profile_id
  ), cohort_route as (
    -- The newest enrolling or running cohort they are an active learner in, if it has staff.
    select distinct on (cm.profile_id) cm.profile_id, cm.cohort_id
      from public.cohort_members cm
      join public.cohorts c on c.id = cm.cohort_id
     where cm.role = 'learner' and cm.status = 'active'
       and c.status in ('enrolling', 'running')
       and exists (select 1 from public.cohort_members s
                    where s.cohort_id = cm.cohort_id and s.role in ('mentor', 'coordinator'))
     order by cm.profile_id, c.starts_on desc
  ), chapter_route as (
    -- The chapter they joined last, if it is open and has a lead.
    select distinct on (m.profile_id) m.profile_id, m.chapter_id
      from public.chapter_members m
      join public.chapters c on c.id = m.chapter_id
     where m.role = 'member'
       and c.status in ('launching', 'active', 'paused')
       and exists (select 1 from public.chapter_members l where l.chapter_id = m.chapter_id and l.role = 'lead')
     order by m.profile_id, m.joined_at desc
  ), inputs as (
    select l.profile_id, l.stage, l.topics_started,
           v_today - l.last_active_on as days_quiet,
           coalesce(r.a14, 0) as a14,
           coalesce(r.a56, 0) as a56,
           coalesce(pc.recent, 0) as recent,
           coalesce(pc.prior, 0) as prior,
           coalesce(f.fails, 0) as fails,
           v_today - (pa.saved_at at time zone 'UTC')::date as path_age,
           coalesce(mi.missed, 0) as missed,
           cr.cohort_id,
           ch.chapter_id
      from learners l
      left join rhythm r on r.profile_id = l.profile_id
      left join pace pc on pc.profile_id = l.profile_id
      left join fails f on f.profile_id = l.profile_id
      left join missed mi on mi.profile_id = l.profile_id
      left join paths pa on pa.profile_id = l.profile_id
      left join cohort_route cr on cr.profile_id = l.profile_id
      left join chapter_route ch on ch.profile_id = l.profile_id
  ), assessed as (
    select i.*,
           private.risk_reasons(i.stage, i.days_quiet, i.a14, i.a56, i.recent, i.prior, i.fails,
                                i.topics_started, i.path_age, i.missed) as reasons
      from inputs i
  )
  insert into public.learner_risk as lr (
    profile_id, computed_at, level, reasons, route, cohort_id, chapter_id, flagged_since,
    days_quiet, usual_gap_days, topics_recent, topics_prior, quiz_fails, deadlines_missed)
  select a.profile_id, now(), private.risk_level(a.reasons), a.reasons,
         case when a.cohort_id is not null then 'mentor' when a.chapter_id is not null then 'chapter_lead' else 'admin' end,
         a.cohort_id,
         case when a.cohort_id is null then a.chapter_id end,
         case when cardinality(a.reasons) > 0 then v_today end,
         a.days_quiet, private.risk_usual_gap(a.a56), a.recent, a.prior, a.fails, a.missed
    from assessed a
  on conflict (profile_id) do update set
    computed_at = excluded.computed_at,
    level = excluded.level,
    reasons = excluded.reasons,
    route = excluded.route,
    cohort_id = excluded.cohort_id,
    chapter_id = excluded.chapter_id,
    flagged_since = case when excluded.level = 'none' then null else coalesce(lr.flagged_since, excluded.flagged_since) end,
    days_quiet = excluded.days_quiet,
    usual_gap_days = excluded.usual_gap_days,
    topics_recent = excluded.topics_recent,
    topics_prior = excluded.topics_prior,
    quiz_fails = excluded.quiz_fails,
    deadlines_missed = excluded.deadlines_missed;
  get diagnostics v_count = row_count;

  -- Alerts: note the first active day after each open alert was raised.
  update public.learner_risk_alerts a
     set came_back_on = b.first_back
    from (select a2.id, min((e.created_at at time zone 'UTC')::date) as first_back
            from public.learner_risk_alerts a2
            join public.events e
              on e.profile_id = a2.profile_id
             and e.created_at >= (a2.raised_on + 1)::timestamp at time zone 'UTC'
             and coalesce(e.device_class, 'unknown') <> 'bot'
           where a2.closed_on is null and a2.came_back_on is null
           group by a2.id) b
   where a.id = b.id;

  -- Close the alerts of learners no longer flagged (or no longer learners).
  update public.learner_risk_alerts a
     set closed_on = v_today
   where a.closed_on is null
     and not exists (select 1 from public.learner_risk r where r.profile_id = a.profile_id and r.level <> 'none');

  -- Open one for each newly flagged learner.
  insert into public.learner_risk_alerts (profile_id, raised_on, level, reasons, route, cohort_id, chapter_id)
  select r.profile_id, v_today, r.level, r.reasons, r.route, r.cohort_id, r.chapter_id
    from public.learner_risk r
   where r.level <> 'none'
     and not exists (select 1 from public.learner_risk_alerts a where a.profile_id = r.profile_id and a.closed_on is null);

  return v_count;
end;
$$;

revoke execute on function private.refresh_learner_risk() from public, anon, authenticated;
grant execute on function private.refresh_learner_risk() to service_role;

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
  v_risk integer;
begin
  perform private.refresh_analytics_rollups(v_from, v_to);
  -- Link before the purge, while the visits are still there; attributes read the first touch.
  v_linked := private.link_first_touch();
  v_learners := private.refresh_learner_attributes();
  -- Risk reads the fresh attributes.
  v_risk := private.refresh_learner_risk();
  v_purged := private.purge_old_events();
  return jsonb_build_object('from', v_from, 'to', v_to, 'purged', v_purged, 'linked', v_linked,
                            'learners', v_learners, 'risk', v_risk);
end;
$$;

comment on function public.run_analytics_maintenance(integer) is
  'Daily cron (service role): rebuilds the analytics rollups for the last p_days UTC days, keeps new members'' first touch, recomputes learner_attributes and learner_risk, and deletes raw events older than 13 months.';

-- 6. Reads -------------------------------------------------------------------------------

-- The caseload of one cohort: its active learners with their risk, last
-- contact and next unsent deadline. Cohort staff and admins only. The page
-- sorts (src/lib/early-warning/rules.ts sortCaseload).
create function public.mentor_caseload(p_cohort_id uuid)
returns table (
  member_id uuid, profile_id uuid, display_name text, level text, reasons text[],
  flagged_since date, days_quiet integer, usual_gap_days integer, topics_recent integer,
  topics_prior integer, quiz_fails integer, deadlines_missed integer, last_active_on date,
  last_contact_at timestamptz, last_contact_kind text, next_due_on date
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_today date := (now() at time zone 'Africa/Accra')::date;
begin
  if not (private.is_cohort_staff(p_cohort_id) or private.is_admin()) then
    raise exception 'Cohort staff only' using errcode = '42501';
  end if;
  return query
    select cm.id, cm.profile_id, p.display_name, coalesce(r.level, 'none'), coalesce(r.reasons, '{}'::text[]),
           r.flagged_since, r.days_quiet, r.usual_gap_days, coalesce(r.topics_recent, 0), coalesce(r.topics_prior, 0),
           coalesce(r.quiz_fails, 0), coalesce(r.deadlines_missed, 0), la.last_active_on,
           lc.created_at, lc.kind,
           (select min(c.starts_on + 7 * w.week_number)
              from public.program_weeks w
             where w.program_id = c.program_id
               and (w.specialization is null or w.specialization = cm.specialization)
               and c.starts_on + 7 * w.week_number >= v_today
               and not exists (select 1 from public.submissions s
                                where s.profile_id = cm.profile_id and s.program_week_id = w.id and s.status <> 'draft'))
      from public.cohort_members cm
      join public.cohorts c on c.id = cm.cohort_id
      join public.profiles p on p.id = cm.profile_id
      left join public.learner_risk r on r.profile_id = cm.profile_id
      left join public.learner_attributes la on la.profile_id = cm.profile_id
      left join lateral (
        select mc.created_at, mc.kind from public.mentor_contacts mc
         where mc.learner_id = cm.profile_id
         order by mc.created_at desc limit 1) lc on true
     where cm.cohort_id = p_cohort_id and cm.role = 'learner' and cm.status = 'active';
end;
$$;

-- Flagged members routed to one chapter's lead. Chapter leads and admins only.
create function public.chapter_check_ins(p_chapter_id uuid)
returns table (
  profile_id uuid, display_name text, level text, reasons text[], flagged_since date,
  days_quiet integer, usual_gap_days integer, topics_recent integer, topics_prior integer,
  quiz_fails integer, deadlines_missed integer, last_active_on date,
  last_contact_at timestamptz, last_contact_kind text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not (private.is_chapter_lead(p_chapter_id) or private.is_admin()) then
    raise exception 'Chapter leads only' using errcode = '42501';
  end if;
  return query
    select r.profile_id, p.display_name, r.level, r.reasons, r.flagged_since, r.days_quiet, r.usual_gap_days,
           r.topics_recent, r.topics_prior, r.quiz_fails, r.deadlines_missed, la.last_active_on,
           lc.created_at, lc.kind
      from public.learner_risk r
      join public.profiles p on p.id = r.profile_id
      left join public.learner_attributes la on la.profile_id = r.profile_id
      left join lateral (
        select mc.created_at, mc.kind from public.mentor_contacts mc
         where mc.learner_id = r.profile_id
         order by mc.created_at desc limit 1) lc on true
     where r.route = 'chapter_lead' and r.chapter_id = p_chapter_id and r.level <> 'none';
end;
$$;

-- Per mentor or coordinator of the cohorts running in the range: their
-- learners (shared with co-staff of the same cohort), risk now, contacts
-- logged, grading turnaround and weeks passed in the range.
create function public.admin_insights_mentors(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (mentor_id uuid, mentor_name text, cohorts integer, learners integer, active_7d integer,
               at_risk integer, watch integer, contacts integer, learners_contacted integer,
               graded integer, grading_hours_median double precision, weeks_passed integer, weeks_graded integer)
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
    select co.id, pr.pass_score
      from public.cohorts co
      join public.programs pr on pr.id = co.program_id
     where (p_cohort is null or co.id = p_cohort)
       and co.status <> 'cancelled'
       and co.starts_on <= p_to
       and co.starts_on + 7 * pr.duration_weeks >= p_from
  ), staff as (
    select s.profile_id as mentor_id, s.cohort_id
      from public.cohort_members s
      join c on c.id = s.cohort_id
     where s.role in ('mentor', 'coordinator')
  ), people as (
    select f.profile_id from private.insights_people(p_track, p_region, p_chapter, null) f
  ), taught as (
    select distinct st.mentor_id, cm.profile_id, cm.cohort_id
      from staff st
      join public.cohort_members cm on cm.cohort_id = st.cohort_id
     where cm.role = 'learner' and cm.status in ('active', 'completed')
       and (num_nulls(p_track, p_region, p_chapter) = 3 or cm.profile_id in (select pe.profile_id from people pe))
  ), per_learner as (
    select l.mentor_id,
           count(distinct l.profile_id)::integer as learners,
           count(distinct l.profile_id) filter (where la.last_active_on >= (now() at time zone 'UTC')::date - 7)::integer as active_7d,
           count(distinct l.profile_id) filter (where r.level = 'at_risk')::integer as at_risk,
           count(distinct l.profile_id) filter (where r.level = 'watch')::integer as watch
      from taught l
      left join public.learner_attributes la on la.profile_id = l.profile_id
      left join public.learner_risk r on r.profile_id = l.profile_id
     group by l.mentor_id
  ), logged as (
    select mc.mentor_id, count(*)::integer as contacts, count(distinct mc.learner_id)::integer as contacted
      from public.mentor_contacts mc
     where mc.created_at >= v_from and mc.created_at < v_to
       and mc.mentor_id in (select st2.mentor_id from staff st2)
     group by mc.mentor_id
  ), grading as (
    select s.graded_by as mentor_id, count(*)::integer as graded,
           percentile_cont(0.5) within group (order by extract(epoch from s.graded_at - s.submitted_at) / 3600) as hours
      from public.submissions s
      join c on c.id = s.cohort_id
     where s.status = 'graded' and s.graded_at >= v_from and s.graded_at < v_to and s.submitted_at is not null
     group by s.graded_by
  ), passes as (
    select l.mentor_id,
           count(*) filter (where s.final_score >= c.pass_score)::integer as passed,
           count(*)::integer as graded
      from taught l
      join public.submissions s on s.profile_id = l.profile_id and s.cohort_id = l.cohort_id
      join c on c.id = s.cohort_id
     where s.status = 'graded' and s.graded_at >= v_from and s.graded_at < v_to
     group by l.mentor_id
  )
  select m.mentor_id, coalesce(p.display_name, 'Unnamed mentor'),
         count(distinct st.cohort_id)::integer,
         coalesce(pl.learners, 0), coalesce(pl.active_7d, 0), coalesce(pl.at_risk, 0), coalesce(pl.watch, 0),
         coalesce(ct.contacts, 0), coalesce(ct.contacted, 0),
         coalesce(g.graded, 0), case when coalesce(g.graded, 0) >= 5 then g.hours end,
         coalesce(ps.passed, 0), coalesce(ps.graded, 0)
    from (select distinct staff.mentor_id from staff) m
    join staff st on st.mentor_id = m.mentor_id
    join public.profiles p on p.id = m.mentor_id
    left join per_learner pl on pl.mentor_id = m.mentor_id
    left join logged ct on ct.mentor_id = m.mentor_id
    left join grading g on g.mentor_id = m.mentor_id
    left join passes ps on ps.mentor_id = m.mentor_id
   group by m.mentor_id, p.display_name, pl.learners, pl.active_7d, pl.at_risk, pl.watch, ct.contacts, ct.contacted,
            g.graded, g.hours, ps.passed, ps.graded
   order by coalesce(pl.at_risk, 0) desc, p.display_name;
end;
$$;

-- Did flagged learners come back? Alerts raised in the range, by route.
-- settled: alerts for going quiet (went_quiet, dormant, streak_broken,
-- slipping) raised at least 14 days ago; came_back: of those, active again
-- within 14 days; contacted: of those, someone logged a contact within the
-- 14 days and no later than the day they came back.
create function public.admin_insights_early_warning(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (route text, raised integer, at_risk integer, settled integer, came_back integer,
               contacted integer, contacted_came_back integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_today date := (now() at time zone 'UTC')::date;
begin
  perform private.insights_guard(p_from, p_to);
  return query
  with a as (
    select al.*,
           al.reasons && array['went_quiet', 'dormant', 'streak_broken', 'slipping'] and al.raised_on <= v_today - 14 as settled,
           al.came_back_on is not null and al.came_back_on <= al.raised_on + 14 as back
      from public.learner_risk_alerts al
     where al.raised_on between p_from and p_to
       and (num_nulls(p_track, p_region, p_chapter, p_cohort) = 4
            or al.profile_id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
  ), x as (
    select a.*,
           exists (select 1 from public.mentor_contacts mc
                    where mc.learner_id = a.profile_id
                      and mc.created_at >= a.raised_on::timestamp at time zone 'UTC'
                      and mc.created_at < (least(coalesce(a.came_back_on, a.raised_on + 14), a.raised_on + 14) + 1)::timestamp at time zone 'UTC') as reached
      from a
  )
  select x.route,
         count(*)::integer,
         count(*) filter (where x.level = 'at_risk')::integer,
         count(*) filter (where x.settled)::integer,
         count(*) filter (where x.settled and x.back)::integer,
         count(*) filter (where x.settled and x.reached)::integer,
         count(*) filter (where x.settled and x.reached and x.back)::integer
    from x
   group by x.route
   order by x.route;
end;
$$;

-- Everyone flagged now, with who should act. The range is not used (risk is
-- today's); the people filters are.
create function public.admin_insights_risk_learners(
  p_from date, p_to date, p_track text default null, p_region text default null,
  p_chapter uuid default null, p_cohort uuid default null, p_device text default null)
returns table (profile_id uuid, learner_name text, level text, reasons text[], route text, routed_to text,
               flagged_since date, last_active_on date, last_contact_at timestamptz)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform private.insights_guard(p_from, p_to);
  return query
    select r.profile_id, coalesce(p.display_name, 'Unnamed learner'), r.level, r.reasons, r.route,
           coalesce(co.name, ch.name, 'Admins'), r.flagged_since, la.last_active_on,
           (select max(mc.created_at) from public.mentor_contacts mc where mc.learner_id = r.profile_id)
      from public.learner_risk r
      join public.profiles p on p.id = r.profile_id
      left join public.cohorts co on co.id = r.cohort_id
      left join public.chapters ch on ch.id = r.chapter_id
      left join public.learner_attributes la on la.profile_id = r.profile_id
     where r.level <> 'none'
       and (num_nulls(p_track, p_region, p_chapter, p_cohort) = 4
            or r.profile_id in (select f.profile_id from private.insights_people(p_track, p_region, p_chapter, p_cohort) f))
     order by case r.level when 'at_risk' then 0 else 1 end, r.flagged_since, p.display_name
     limit 500;
end;
$$;

revoke execute on function public.mentor_caseload(uuid) from public, anon;
revoke execute on function public.chapter_check_ins(uuid) from public, anon;
grant execute on function public.mentor_caseload(uuid) to authenticated, service_role;
grant execute on function public.chapter_check_ins(uuid) to authenticated, service_role;

do $$
declare
  f text;
begin
  foreach f in array array['admin_insights_mentors', 'admin_insights_early_warning', 'admin_insights_risk_learners'] loop
    execute format('revoke execute on function public.%I(date, date, text, text, uuid, uuid, text) from public, anon', f);
    execute format('grant execute on function public.%I(date, date, text, text, uuid, uuid, text) to authenticated, service_role', f);
  end loop;
end;
$$;

-- 7. Event names -------------------------------------------------------------------------

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
    -- Early warning and the mentor caseload (#325, #330)
    'mentor_contact_logged',
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
    'node_opened', 'path_quiz_started', 'path_quiz_completed', 'achievement_shared',
    'profile_published'
  ]);
$$;
