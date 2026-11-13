-- Readiness score v1 and its fairness report (epic #320 step 5, issue #328).
--
-- A transparent, rule based score from 0 to 100 for each learner against each
-- track (a published roadmap) they are working on or said they are interested
-- in. Not a prediction. Staff only for now: no learner, employer or matching
-- use until the founder approves the weights (docs/readiness.md, the model card).
--
-- 1. private.readiness_weights(): the weights, targets and band edges, in one
--    place. src/lib/readiness/score.ts mirrors them and a unit test parses
--    this function and fails when they differ.
-- 2. public.readiness_scores: one row per learner per track, with every part
--    of the score, so "why" can be shown.
-- 3. private.refresh_readiness(), called by run_analytics_maintenance.
-- 4. Admin functions: one learner's scores, and the fairness report.
--
-- Inputs (and only these):
--   skills     live verified skills / published skills mapped to the track (skill_roadmaps)
--   progress   required topics done / required topics in the track
--   portfolio  approved skill portfolios for the track's skills, plus graded
--              programme work at or above the pass mark in weeks linked to the
--              track; full marks at the portfolio target
--   activity   days with learning in the last 30 (topics, reviews, skill
--              attempts, programme work); full marks at the activity target
--   profile    half for About you (goal, career stage and a track answered),
--              half for a public profile with a headline
-- Never inputs: region, device, connection, study hour or times, age or date
-- of birth, education, field of study, employment status, languages and the
-- About you work preferences (pay, places, ways of working, start date,
-- moving). A unit test checks the refresh below never names them.
--
-- A track with no mapped skills (or no required topics) scores out of the
-- parts it has: score = 100 * points / points available.

-- 1. Weights -----------------------------------------------------------------------------

create function private.readiness_weights()
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select '{"skills": 40, "progress": 25, "portfolio": 15, "activity": 10, "profile": 10, "portfolio_target": 3, "activity_target_days": 8, "building_from": 40, "job_ready_from": 70}'::jsonb;
$$;

comment on function private.readiness_weights() is
  'Readiness score v1 weights (a proposal awaiting founder approval), targets and band edges. Mirrored in src/lib/readiness/score.ts; a unit test keeps them equal.';

create function private.readiness_band(p_score integer)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when p_score >= (private.readiness_weights() ->> 'job_ready_from')::integer then 'job_ready'
    when p_score >= (private.readiness_weights() ->> 'building_from')::integer then 'building'
    else 'getting_started'
  end;
$$;

revoke execute on function private.readiness_weights() from public, anon;
revoke execute on function private.readiness_band(integer) from public, anon;
grant execute on function private.readiness_weights() to authenticated, service_role;
grant execute on function private.readiness_band(integer) to authenticated, service_role;

-- 2. Table -------------------------------------------------------------------------------

create table public.readiness_scores (
  profile_id       uuid not null references public.profiles (id) on delete cascade,
  roadmap_slug     text not null,
  computed_at      timestamptz not null default now(),
  score            smallint not null check (score between 0 and 100),
  band             text not null check (band in ('getting_started', 'building', 'job_ready')),
  skills_points    numeric(4, 1) not null default 0,
  progress_points  numeric(4, 1) not null default 0,
  portfolio_points numeric(4, 1) not null default 0,
  activity_points  numeric(4, 1) not null default 0,
  profile_points   numeric(4, 1) not null default 0,
  points_available smallint not null check (points_available between 1 and 100),
  skills_verified  integer not null default 0,
  skills_total     integer not null default 0,
  topics_done      integer not null default 0,
  topics_total     integer not null default 0,
  portfolio_pieces integer not null default 0,
  active_days_30   integer not null default 0,
  about_complete   boolean not null default false,
  profile_public   boolean not null default false,
  primary key (profile_id, roadmap_slug)
);

comment on table public.readiness_scores is
  'Readiness score v1 per learner per track, with its parts. Computed daily (private.refresh_readiness). Staff only until the weights are approved; never shown to employers. Inputs and limits: docs/readiness.md.';
comment on column public.readiness_scores.points_available is
  'Points the track can award: 100, less the skills part when no published skill maps to the track, less the progress part when it has no required topics. score = 100 * points / points_available.';

create index readiness_scores_roadmap_idx on public.readiness_scores (roadmap_slug, score desc);

alter table public.readiness_scores enable row level security;

create policy "Admins read readiness scores"
  on public.readiness_scores for select to authenticated
  using ((select private.is_admin()));

revoke all on public.readiness_scores from public, anon, authenticated;
grant select on public.readiness_scores to authenticated;

-- 3. Refresh -----------------------------------------------------------------------------

create function private.refresh_readiness()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_w jsonb := private.readiness_weights();
  -- Clock time, not now(): rows not rewritten by this run are older, even when
  -- the refresh runs twice in one transaction.
  v_started timestamptz := clock_timestamp();
  v_count integer;
begin
  with learners as (
    select p.id, coalesce(p.is_public, false) and nullif(trim(coalesce(p.headline, '')), '') is not null as is_public
      from public.profiles p
     where p.role = 'learner'
  ), tracks as (
    -- Working on: any topic started. Interested: listed in About you.
    select distinct rp.profile_id, r.id as roadmap_id, r.slug
      from public.roadmap_progress rp
      join public.roadmap_nodes n on n.id = rp.node_id
      join public.roadmaps r on r.id = n.roadmap_id and r.is_published
     where rp.status in ('in_progress', 'done')
    union
    select lp.profile_id, r.id, r.slug
      from public.learner_profiles lp
      join public.roadmaps r on r.slug = any (lp.tracks) and r.is_published
  ), pairs as (
    select t.profile_id, t.roadmap_id, t.slug, l.is_public
      from tracks t join learners l on l.id = t.profile_id
  ), skills as (
    select pa.profile_id, pa.slug,
           count(distinct s.id)::integer as total,
           count(distinct vs.skill_id)::integer as verified
      from pairs pa
      join public.skill_roadmaps sr on sr.roadmap_slug = pa.slug
      join public.skills s on s.id = sr.skill_id and s.is_published
      left join public.verified_skills vs
        on vs.skill_id = s.id and vs.profile_id = pa.profile_id and vs.revoked_at is null
     group by pa.profile_id, pa.slug
  ), topics as (
    select pa.profile_id, pa.slug,
           count(n.id)::integer as total,
           count(rp.id) filter (where rp.status = 'done')::integer as done
      from pairs pa
      join public.roadmap_nodes n on n.roadmap_id = pa.roadmap_id and not n.is_optional
      left join public.roadmap_progress rp on rp.node_id = n.id and rp.profile_id = pa.profile_id
     group by pa.profile_id, pa.slug
  ), pieces as (
    select x.profile_id, x.slug, count(distinct x.piece)::integer as pieces
      from (
        select pa.profile_id, pa.slug, a.id as piece
          from pairs pa
          join public.skill_roadmaps sr on sr.roadmap_slug = pa.slug
          join public.skill_assessment_attempts a
            on a.skill_id = sr.skill_id and a.profile_id = pa.profile_id
           and a.kind = 'portfolio' and a.status = 'approved'
        union all
        select pa.profile_id, pa.slug, su.id
          from pairs pa
          join public.program_week_nodes pwn on pwn.roadmap_slug = pa.slug
          join public.submissions su
            on su.program_week_id = pwn.program_week_id and su.profile_id = pa.profile_id
           and su.status = 'graded'
          join public.programs pg on pg.id = su.program_id and su.final_score >= pg.pass_score
      ) x
     group by x.profile_id, x.slug
  ), learning_days as (
    select d.profile_id, count(distinct d.day)::integer as days
      from (
        select rp.profile_id, (rp.updated_at at time zone 'UTC')::date as day
          from public.roadmap_progress rp where rp.updated_at >= now() - interval '30 days'
        union all
        select rv.profile_id, (rv.completed_at at time zone 'UTC')::date
          from public.review_sessions rv where rv.completed_at >= now() - interval '30 days'
        union all
        select sa.profile_id, (sa.submitted_at at time zone 'UTC')::date
          from public.skill_assessment_attempts sa where sa.submitted_at >= now() - interval '30 days'
        union all
        select sm.profile_id, (sm.submitted_at at time zone 'UTC')::date
          from public.submissions sm where sm.submitted_at >= now() - interval '30 days'
      ) d
     group by d.profile_id
  ), about as (
    select lp.profile_id,
           lp.main_goal is not null and lp.career_stage is not null and cardinality(lp.tracks) > 0 as complete
      from public.learner_profiles lp
  ), parts as (
    select pa.profile_id, pa.slug,
           coalesce(sk.total, 0) as skills_total,
           coalesce(sk.verified, 0) as skills_verified,
           coalesce(tp.total, 0) as topics_total,
           coalesce(tp.done, 0) as topics_done,
           coalesce(pc.pieces, 0) as pieces,
           coalesce(ld.days, 0) as days,
           coalesce(ab.complete, false) as about_complete,
           pa.is_public
      from pairs pa
      left join skills sk on sk.profile_id = pa.profile_id and sk.slug = pa.slug
      left join topics tp on tp.profile_id = pa.profile_id and tp.slug = pa.slug
      left join pieces pc on pc.profile_id = pa.profile_id and pc.slug = pa.slug
      left join learning_days ld on ld.profile_id = pa.profile_id
      left join about ab on ab.profile_id = pa.profile_id
  ), points as (
    select pt.*,
           case when pt.skills_total > 0
                then round((v_w ->> 'skills')::numeric * least(pt.skills_verified, pt.skills_total) / pt.skills_total, 1)
                else 0 end as skills_points,
           case when pt.topics_total > 0
                then round((v_w ->> 'progress')::numeric * pt.topics_done / pt.topics_total, 1)
                else 0 end as progress_points,
           round((v_w ->> 'portfolio')::numeric * least(pt.pieces, (v_w ->> 'portfolio_target')::integer)
                 / (v_w ->> 'portfolio_target')::integer, 1) as portfolio_points,
           round((v_w ->> 'activity')::numeric * least(pt.days, (v_w ->> 'activity_target_days')::integer)
                 / (v_w ->> 'activity_target_days')::integer, 1) as activity_points,
           (v_w ->> 'profile')::numeric / 2 * (pt.about_complete::integer + pt.is_public::integer) as profile_points,
           (100
             - case when pt.skills_total > 0 then 0 else (v_w ->> 'skills')::integer end
             - case when pt.topics_total > 0 then 0 else (v_w ->> 'progress')::integer end) as available
      from parts pt
  ), scored as (
    select po.*,
           least(100, greatest(0, round(100 * (po.skills_points + po.progress_points + po.portfolio_points
                                               + po.activity_points + po.profile_points) / po.available)))::integer as score
      from points po
  ), upserted as (
    insert into public.readiness_scores as rs (
      profile_id, roadmap_slug, computed_at, score, band, skills_points, progress_points, portfolio_points,
      activity_points, profile_points, points_available, skills_verified, skills_total, topics_done,
      topics_total, portfolio_pieces, active_days_30, about_complete, profile_public)
    select s.profile_id, s.slug, v_started, s.score, private.readiness_band(s.score), s.skills_points, s.progress_points,
           s.portfolio_points, s.activity_points, s.profile_points, s.available, s.skills_verified, s.skills_total,
           s.topics_done, s.topics_total, s.pieces, s.days, s.about_complete, s.is_public
      from scored s
    on conflict (profile_id, roadmap_slug) do update set
      computed_at = excluded.computed_at,
      score = excluded.score,
      band = excluded.band,
      skills_points = excluded.skills_points,
      progress_points = excluded.progress_points,
      portfolio_points = excluded.portfolio_points,
      activity_points = excluded.activity_points,
      profile_points = excluded.profile_points,
      points_available = excluded.points_available,
      skills_verified = excluded.skills_verified,
      skills_total = excluded.skills_total,
      topics_done = excluded.topics_done,
      topics_total = excluded.topics_total,
      portfolio_pieces = excluded.portfolio_pieces,
      active_days_30 = excluded.active_days_30,
      about_complete = excluded.about_complete,
      profile_public = excluded.profile_public
    returning 1
  )
  select count(*)::integer into v_count from upserted;

  -- Tracks a learner dropped (or that were unpublished) since the last run.
  delete from public.readiness_scores rs -- allow-destructive: computed rows for tracks no longer followed
   where rs.computed_at < v_started;
  return v_count;
end;
$$;

revoke execute on function private.refresh_readiness() from public, anon, authenticated;
grant execute on function private.refresh_readiness() to service_role;

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
  v_readiness integer;
begin
  perform private.refresh_analytics_rollups(v_from, v_to);
  -- Link before the purge, while the visits are still there; attributes read the first touch.
  v_linked := private.link_first_touch();
  v_learners := private.refresh_learner_attributes();
  v_readiness := private.refresh_readiness();
  v_purged := private.purge_old_events();
  return jsonb_build_object('from', v_from, 'to', v_to, 'purged', v_purged, 'linked', v_linked,
                            'learners', v_learners, 'readiness', v_readiness);
end;
$$;

comment on function public.run_analytics_maintenance(integer) is
  'Daily cron (service role): rebuilds the analytics rollups for the last p_days UTC days, keeps new members'' first touch, recomputes learner_attributes and readiness_scores and deletes raw events older than 13 months.';

-- 4. Admin functions ---------------------------------------------------------------------

-- One learner's readiness per track, best first.
create function public.admin_learner_readiness(p_profile_id uuid)
returns table (
  roadmap_slug text, roadmap_title text, score integer, band text, skills_points numeric,
  progress_points numeric, portfolio_points numeric, activity_points numeric, profile_points numeric,
  points_available integer, skills_verified integer, skills_total integer, topics_done integer,
  topics_total integer, portfolio_pieces integer, active_days_30 integer, about_complete boolean,
  profile_public boolean, computed_at timestamptz
)
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
    select rs.roadmap_slug, coalesce(r.title, rs.roadmap_slug), rs.score::integer, rs.band, rs.skills_points,
           rs.progress_points, rs.portfolio_points, rs.activity_points, rs.profile_points,
           rs.points_available::integer, rs.skills_verified, rs.skills_total, rs.topics_done, rs.topics_total,
           rs.portfolio_pieces, rs.active_days_30, rs.about_complete, rs.profile_public, rs.computed_at
      from public.readiness_scores rs
      left join public.roadmaps r on r.slug = rs.roadmap_slug
     where rs.profile_id = p_profile_id
     order by rs.score desc, rs.roadmap_slug;
end;
$$;

-- The fairness report (issue #328): counts, score sums and bands per group.
-- Person dimensions use each learner's best track score, so a learner who
-- lists many tracks counts once; the track dimension uses every row.
-- Dimensions: all, score (10 point buckets), region, device (usual device from
-- learner_attributes), internet and education (About you), age (from the date
-- of birth given at sign up) and track. Missing answers are 'unknown'.
-- These attributes are read here to check the score, never to compute it.
create function public.admin_readiness_report()
returns table (
  dimension text, grp text, learners integer, score_sum integer,
  getting_started integer, building integer, job_ready integer
)
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
    with best as (
      select distinct on (rs.profile_id) rs.profile_id, rs.score::integer as score, rs.band
        from public.readiness_scores rs
       order by rs.profile_id, rs.score desc, rs.roadmap_slug
    ), people as (
      select b.score, b.band,
             coalesce(p.region, 'unknown') as region,
             coalesce(la.usual_device, 'unknown') as device,
             coalesce(lp.internet, 'unknown') as internet,
             coalesce(lp.education, 'unknown') as education,
             case
               when coalesce(u.raw_user_meta_data ->> 'date_of_birth', '') !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then 'unknown'
               when age((now() at time zone 'UTC')::date, (u.raw_user_meta_data ->> 'date_of_birth')::date) < interval '25 years' then '18_24'
               when age((now() at time zone 'UTC')::date, (u.raw_user_meta_data ->> 'date_of_birth')::date) < interval '30 years' then '25_29'
               when age((now() at time zone 'UTC')::date, (u.raw_user_meta_data ->> 'date_of_birth')::date) < interval '35 years' then '30_34'
               else '35_plus'
             end as age_band
        from best b
        join public.profiles p on p.id = b.profile_id
        left join auth.users u on u.id = b.profile_id
        left join public.learner_attributes la on la.profile_id = b.profile_id
        left join public.learner_profiles lp on lp.profile_id = b.profile_id
    ), grouped as (
      select d.dimension, d.grp, pe.score, pe.band
        from people pe
        cross join lateral (values
          ('all', 'all'),
          ('score', (least(pe.score, 99) / 10 * 10)::text),
          ('region', pe.region),
          ('device', pe.device),
          ('internet', pe.internet),
          ('education', pe.education),
          ('age', pe.age_band)
        ) as d (dimension, grp)
      union all
      select 'track', rs.roadmap_slug, rs.score::integer, rs.band
        from public.readiness_scores rs
    )
    select gr.dimension, gr.grp, count(*)::integer, sum(gr.score)::integer,
           count(*) filter (where gr.band = 'getting_started')::integer,
           count(*) filter (where gr.band = 'building')::integer,
           count(*) filter (where gr.band = 'job_ready')::integer
      from grouped gr
     group by gr.dimension, gr.grp
     order by gr.dimension, gr.grp;
end;
$$;

revoke execute on function public.admin_learner_readiness(uuid) from public, anon;
revoke execute on function public.admin_readiness_report() from public, anon;
grant execute on function public.admin_learner_readiness(uuid) to authenticated, service_role;
grant execute on function public.admin_readiness_report() to authenticated, service_role;
