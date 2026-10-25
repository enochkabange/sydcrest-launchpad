-- Analytics funnel (issue #51).
--
-- 1. The event taxonomy the app tracks: page_view, signup, quiz_run,
--    path_viewed, node_started, node_completed, invite_sent. Additive only:
--    the original names stay valid so nothing already written (or tested)
--    breaks; drop the unused ones in a later contract migration.
-- 2. funnel_by_week(): visit, sign up and activation counts per week for the
--    admin funnel page. Security definer so it can read roadmap_progress for
--    every learner, gated on private.is_admin() inside.

alter table public.events drop constraint events_name_check;
alter table public.events add constraint events_name_check check (name in (
  -- Taxonomy (issue #51)
  'page_view', 'signup', 'quiz_run', 'path_viewed', 'node_started',
  'node_completed', 'invite_sent',
  -- Phase 1 names, kept until a contract migration removes them
  'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
  'node_opened', 'quiz_submitted', 'path_quiz_started', 'path_quiz_completed',
  'achievement_shared', 'profile_published', 'study_buddy_message', 'waitlist_joined'
));

-- Weeks start on Monday, in UTC (which is Africa/Accra time).
--   visits:      distinct visitors (anonymous id, else profile id) with a page_view
--   signups:     signup events
--   activations: learners whose first completed node falls in that week
--                (read from roadmap_progress, the source of truth, so it does
--                not depend on node_completed events being wired)
create function public.funnel_by_week(p_weeks integer default 12)
returns table (week_start date, visits integer, signups integer, activations integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_weeks integer := least(greatest(coalesce(p_weeks, 12), 1), 104);
  v_from timestamptz;
begin
  if not private.is_admin() then
    raise exception 'Only admins can read the funnel' using errcode = '42501';
  end if;

  v_from := date_trunc('week', now() at time zone 'UTC') at time zone 'UTC'
            - make_interval(weeks => v_weeks - 1);

  return query
  with weeks as (
    select (gs at time zone 'UTC')::date as wk
    from generate_series(v_from, now(), interval '1 week') as gs
  ),
  ev as (
    select (date_trunc('week', e.created_at at time zone 'UTC'))::date as wk,
           count(distinct coalesce(e.anonymous_id, e.profile_id::text))
             filter (where e.name = 'page_view') as visits,
           count(*) filter (where e.name = 'signup') as signups
    from public.events e
    where e.created_at >= v_from and e.name in ('page_view', 'signup')
    group by 1
  ),
  firsts as (
    select rp.profile_id, min(rp.completed_at) as first_done
    from public.roadmap_progress rp
    where rp.completed_at is not null
    group by rp.profile_id
  ),
  act as (
    select (date_trunc('week', f.first_done at time zone 'UTC'))::date as wk,
           count(*) as activations
    from firsts f
    where f.first_done >= v_from
    group by 1
  )
  select w.wk,
         coalesce(ev.visits, 0)::integer,
         coalesce(ev.signups, 0)::integer,
         coalesce(act.activations, 0)::integer
  from weeks w
  left join ev on ev.wk = w.wk
  left join act on act.wk = w.wk
  order by w.wk desc;
end;
$$;

comment on function public.funnel_by_week(integer) is
  'Admin only. Visits, sign ups and activations (first node completed) per week, newest first.';

revoke execute on function public.funnel_by_week(integer) from public, anon;
grant execute on function public.funnel_by_week(integer) to authenticated, service_role;
