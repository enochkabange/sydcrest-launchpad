-- Social layer: public profile stats, leaderboards and the report queue.
--
-- Leaderboards and public profile pages need other learners' progress and
-- follower counts, which RLS hides (roadmap_progress is owner only, follows
-- is signed in only). As with public_profiles, a security definer function
-- in private computes only public numbers for opted in profiles, and a
-- security_invoker view exposes them. Learners with a private profile never
-- appear: not in the view, not on any board, not in any count of ranks.

-- public_profile_stats --------------------------------------------------------

-- Streak: consecutive Africa/Accra calendar days with at least one completed
-- node, counted while it is alive (the last day is today or yesterday in
-- Accra). completed_at is sticky (set once by the database), so a learner
-- cannot backfill days.
create function private.public_profile_stats_rows()
returns table (
  id                   uuid,
  public_slug          text,
  display_name         text,
  avatar_url           text,
  region               text,
  nodes_completed      integer,
  current_streak       integer,
  followers_count      integer,
  following_count      integer,
  has_datacamp_license boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  with pub as (
    select p.id, p.public_slug, p.display_name, p.avatar_url, p.region,
           p.datacamp_license_slot is not null as has_datacamp_license
    from public.profiles p
    where p.is_public
  ),
  done as (
    select rp.profile_id, count(*)::integer as nodes_completed
    from public.roadmap_progress rp
    join pub on pub.id = rp.profile_id
    where rp.status = 'done'
    group by rp.profile_id
  ),
  days as (
    select distinct rp.profile_id,
           (rp.completed_at at time zone 'Africa/Accra')::date as day
    from public.roadmap_progress rp
    join pub on pub.id = rp.profile_id
    where rp.status = 'done'
  ),
  runs as (
    select profile_id, day,
           day - (row_number() over (partition by profile_id order by day))::integer as run
    from days
  ),
  streaks as (
    select profile_id, count(*)::integer as length
    from runs
    group by profile_id, run
    having max(day) >= (now() at time zone 'Africa/Accra')::date - 1
  ),
  followers as (
    select f.following_id as profile_id, count(*)::integer as n
    from public.follows f join pub on pub.id = f.following_id
    group by f.following_id
  ),
  following as (
    select f.follower_id as profile_id, count(*)::integer as n
    from public.follows f join pub on pub.id = f.follower_id
    group by f.follower_id
  )
  select pub.id, pub.public_slug, pub.display_name, pub.avatar_url, pub.region,
         coalesce(done.nodes_completed, 0),
         coalesce(streaks.length, 0),
         coalesce(followers.n, 0),
         coalesce(following.n, 0),
         pub.has_datacamp_license
  from pub
  left join done on done.profile_id = pub.id
  left join streaks on streaks.profile_id = pub.id
  left join followers on followers.profile_id = pub.id
  left join following on following.profile_id = pub.id;
$$;

revoke execute on function private.public_profile_stats_rows() from public;
grant execute on function private.public_profile_stats_rows() to anon, authenticated, service_role;

create view public.public_profile_stats
  with (security_invoker = true)
as
  select * from private.public_profile_stats_rows();

comment on view public.public_profile_stats is
  'Progress and follower counts of opted in profiles, for public pages and leaderboards. Never add phone, role or email here.';

revoke all on public.public_profile_stats from anon, authenticated;
grant select on public.public_profile_stats to anon, authenticated, service_role;

-- Report queue -----------------------------------------------------------------

-- Admins triage reports with the names involved. Admins cannot read other
-- profiles through RLS (profiles is owner only), so the queue joins them here
-- after checking the caller is an admin. Phone and email are not returned.
create function public.admin_reports(p_status text default null)
returns table (
  id                uuid,
  target_type       text,
  target_id         text,
  reason            text,
  status            text,
  created_at        timestamptz,
  updated_at        timestamptz,
  reporter_name     text,
  target_name       text,
  target_slug       text,
  target_is_public  boolean
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
    select r.id, r.target_type, r.target_id, r.reason, r.status, r.created_at, r.updated_at,
           reporter.display_name, target.display_name, target.public_slug, target.is_public
    from public.reports r
    left join public.profiles reporter on reporter.id = r.reporter_id
    left join public.profiles target
      on r.target_type = 'profile' and target.id::text = r.target_id
    where p_status is null or r.status = p_status
    order by r.created_at desc
    limit 200;
end;
$$;

revoke execute on function public.admin_reports(text) from public, anon;
grant execute on function public.admin_reports(text) to authenticated, service_role;

-- Acting on a profile report: take the public page down. The learner can
-- publish again, which would show up as a fresh report if it recurs.
create function public.admin_unpublish_profile(p_profile_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  update public.profiles set is_public = false where id = p_profile_id;
end;
$$;

revoke execute on function public.admin_unpublish_profile(uuid) from public, anon;
grant execute on function public.admin_unpublish_profile(uuid) to authenticated, service_role;
