-- Matching explanations for learners, employers and admins (epic #320, issue #336).
--
-- Builds on readiness score v1 (20261114100000_readiness_score.sql,
-- docs/readiness.md). Model card section: docs/readiness.md "Matching".
--
-- 1. private.match_weights(): the bonus per required skill verified, in one
--    place. src/lib/matching/match.ts mirrors it and a unit test parses this
--    function.
-- 2. private.opportunity_required_skills(): the published skills an
--    opportunity needs. The skills the listing names that are in the SydCrest
--    catalogue (by name or slug, ignoring case); when it names none, the
--    skills mapped (skill_roadmaps) to the roadmaps of its tracks.
-- 3. private.opportunity_match(): match score = the learner's best readiness
--    score among the roadmaps of the opportunity's tracks, plus the bonus for
--    each required skill they have verified, capped at 100. It ranks listings
--    for the learner and never hides one.
-- 4. public.my_match_readiness(): a learner's own readiness per track, for
--    ranking and "Why this fits you". Learners still cannot select
--    readiness_scores (#337 decides the learner view of the score).
-- 5. Consent: share_readiness on applications and talent listings, off by
--    default. Employers see the readiness band for the opportunity's track and
--    plain reasons (matching verified skills, approved portfolio pieces) only
--    when it is on; never the score, its parts, About you answers or pay.
-- 6. Admin audit: who was shown (viewed or applied), applied, shortlisted and
--    hired, per opportunity by band, and the same rates by group (the
--    readiness fairness groups).

-- 1. Weights -----------------------------------------------------------------------------

create function private.match_weights()
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select '{"skill_bonus": 5}'::jsonb;
$$;

comment on function private.match_weights() is
  'Match score: points added to track readiness for each required skill verified (a proposal awaiting founder approval). Mirrored in src/lib/matching/match.ts; a unit test keeps them equal.';

revoke execute on function private.match_weights() from public, anon;
grant execute on function private.match_weights() to authenticated, service_role;

-- 2. Required skills ---------------------------------------------------------------------

create function private.opportunity_required_skills(p_opportunity_id uuid)
returns table (skill_id uuid, slug text, name text)
language sql
stable
security definer
set search_path = ''
as $$
  with o as (
    select op.tracks, array(select lower(btrim(x)) from unnest(op.skills) x) as named
      from public.opportunities op
     where op.id = p_opportunity_id
  ), named as (
    select s.id, s.slug, s.name
      from public.skills s cross join o
     where s.is_published and (lower(s.name) = any (o.named) or s.slug = any (o.named))
  ), by_track as (
    select distinct s.id, s.slug, s.name
      from o
      join public.roadmaps r on r.is_published and (r.track = any (o.tracks) or r.slug = any (o.tracks))
      join public.skill_roadmaps sr on sr.roadmap_slug = r.slug
      join public.skills s on s.id = sr.skill_id and s.is_published
  )
  select n.id, n.slug, n.name from named n
  union
  select t.id, t.slug, t.name from by_track t where not exists (select 1 from named);
$$;

revoke execute on function private.opportunity_required_skills(uuid) from public, anon, authenticated;
grant execute on function private.opportunity_required_skills(uuid) to service_role;

-- 3. Match -------------------------------------------------------------------------------

-- score is null when the learner has no readiness for the opportunity's
-- tracks and no required skill verified: nothing to rank on.
-- readiness_band is the band for the best track (what employers may see).
create function private.opportunity_match(p_profile_id uuid, p_opportunity_id uuid)
returns table (
  score integer, band text, roadmap_slug text, readiness_band text, portfolio_pieces integer,
  skills_required integer, skills_verified integer, verified_names text[]
)
language sql
stable
security definer
set search_path = ''
as $$
  with o as (
    select op.tracks from public.opportunities op where op.id = p_opportunity_id
  ), best as (
    select rs.roadmap_slug, rs.score::integer as score, rs.band, rs.portfolio_pieces
      from public.readiness_scores rs
      join public.roadmaps r on r.slug = rs.roadmap_slug
      cross join o
     where rs.profile_id = p_profile_id and (r.track = any (o.tracks) or r.slug = any (o.tracks))
     order by rs.score desc, rs.roadmap_slug
     limit 1
  ), req as (
    select rq.name,
           exists (select 1 from public.verified_skills v
                    where v.profile_id = p_profile_id and v.skill_id = rq.skill_id and v.revoked_at is null) as verified
      from private.opportunity_required_skills(p_opportunity_id) rq
  ), counts as (
    select count(*)::integer as required,
           (count(*) filter (where req.verified))::integer as verified,
           coalesce(array_agg(req.name order by req.name) filter (where req.verified), '{}') as names
      from req
  ), scored as (
    select case when b.score is null and c.verified = 0 then null
                else least(100, coalesce(b.score, 0) + c.verified * (private.match_weights() ->> 'skill_bonus')::integer)
           end as score,
           b.roadmap_slug, b.band, b.portfolio_pieces, c.required, c.verified, c.names
      from counts c left join best b on true
  )
  select s.score, case when s.score is null then null else private.readiness_band(s.score) end,
         s.roadmap_slug, s.band, s.portfolio_pieces, s.required, s.verified, s.names
    from scored s;
$$;

revoke execute on function private.opportunity_match(uuid, uuid) from public, anon, authenticated;
grant execute on function private.opportunity_match(uuid, uuid) to service_role;

-- 4. The learner's own readiness, for ranking ----------------------------------------------

create function public.my_match_readiness()
returns table (roadmap_slug text, roadmap_title text, track text, score integer, band text, topics_done integer, topics_total integer)
language sql
stable
security definer
set search_path = ''
as $$
  select rs.roadmap_slug, coalesce(r.title, rs.roadmap_slug), r.track, rs.score::integer, rs.band,
         rs.topics_done, rs.topics_total
    from public.readiness_scores rs
    left join public.roadmaps r on r.slug = rs.roadmap_slug
   where rs.profile_id = (select auth.uid())
   order by rs.score desc, rs.roadmap_slug;
$$;

comment on function public.my_match_readiness() is
  'The signed in learner''s own readiness per track, to rank opportunities and explain the fit (#336). Nobody else''s rows.';

revoke execute on function public.my_match_readiness() from public, anon;
grant execute on function public.my_match_readiness() to authenticated, service_role;

-- 5. Consent -----------------------------------------------------------------------------

alter table public.opportunity_applications
  add column share_readiness boolean not null default false;

comment on column public.opportunity_applications.share_readiness is
  'The learner agreed that the employer sees their readiness band for this opportunity''s track and why (verified skills, approved portfolio pieces). Off by default; the learner can change it (set_application_readiness_sharing). Never the score or its parts.';

grant insert (share_readiness) on public.opportunity_applications to authenticated;

alter table public.talent_listings
  add column share_readiness boolean not null default false;

comment on column public.talent_listings.share_readiness is
  'The learner agreed that organisations browsing the directory see their readiness band per track. Off by default. Never the score or its parts.';

grant insert (share_readiness), update (share_readiness) on public.talent_listings to authenticated;

-- The learner turns sharing on or off for one of their applications. A
-- function, because the update policy on applications only allows withdrawing.
create function public.set_application_readiness_sharing(p_application_id uuid, p_share boolean)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_found boolean;
begin
  update public.opportunity_applications a
     set share_readiness = coalesce(p_share, false)
   where a.id = p_application_id
     and a.profile_id = (select auth.uid())
     and a.stage <> 'withdrawn'
  returning true into v_found;
  if v_found is null then
    raise exception 'No application of yours with that id' using errcode = '42501';
  end if;
  return coalesce(p_share, false);
end;
$$;

revoke execute on function public.set_application_readiness_sharing(uuid, boolean) from public, anon;
grant execute on function public.set_application_readiness_sharing(uuid, boolean) to authenticated, service_role;

-- The employer's view: one row per consenting applicant, for the people who
-- manage the opportunity's applications. No score, no parts.
create function public.org_applicant_readiness(p_opportunity_id uuid)
returns table (application_id uuid, band text, roadmap_slug text, roadmap_title text, verified_skills text[], portfolio_pieces integer)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, m.readiness_band, m.roadmap_slug, r.title, m.verified_names, coalesce(m.portfolio_pieces, 0)
    from public.opportunity_applications a
    cross join lateral private.opportunity_match(a.profile_id, a.opportunity_id) m
    left join public.roadmaps r on r.slug = m.roadmap_slug
   where a.opportunity_id = p_opportunity_id
     and a.share_readiness
     and a.stage <> 'withdrawn'
     and private.can_manage_applications(p_opportunity_id)
   order by a.created_at;
$$;

comment on function public.org_applicant_readiness(uuid) is
  'Readiness band for the opportunity''s track and plain reasons, for applicants who agreed to share them, to the people who manage the applications (#336). Never the score or its parts.';

revoke execute on function public.org_applicant_readiness(uuid) from public, anon;
grant execute on function public.org_applicant_readiness(uuid) to authenticated, service_role;

-- Talent directory: the band per track, only when the listing shares it.
create function private.shared_readiness_json(p_profile_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'roadmap_slug', x.roadmap_slug, 'roadmap_title', x.title, 'band', x.band,
           'portfolio_pieces', x.portfolio_pieces)
         order by x.rank), '[]'::jsonb)
  from (
    select rs.roadmap_slug, coalesce(r.title, rs.roadmap_slug) as title, rs.band, rs.portfolio_pieces,
           row_number() over (order by rs.score desc, rs.roadmap_slug) as rank
      from public.readiness_scores rs
      join public.talent_listings t on t.profile_id = rs.profile_id and t.share_readiness
      left join public.roadmaps r on r.slug = rs.roadmap_slug
     where rs.profile_id = p_profile_id
  ) x
  where x.rank <= 3;
$$;

revoke execute on function private.shared_readiness_json(uuid) from public;
grant execute on function private.shared_readiness_json(uuid) to authenticated, service_role;

-- New column last, so the view keeps every column it had.
create or replace view public.talent_directory
  with (security_invoker = true)
as
  select d.*, private.verified_skills_json(d.profile_id) as verified_skills,
         private.external_credentials_json(d.profile_id) as external_credentials,
         private.shared_readiness_json(d.profile_id) as readiness
  from private.talent_directory_rows() d;

comment on view public.talent_directory is
  'Listed, eligible learners (a live certificate or a verified skill) with name, avatar, live certificates, verified skills, the external credentials they made public and, when they chose to share it, their readiness band for up to three tracks, for verified organisations and admins (and the learner''s own preview). Never add phone, email or a readiness score.';

-- 6. Admin audit ---------------------------------------------------------------------------

-- One row per learner per opportunity they were shown (viewed the listing,
-- or applied), with how far they got and their current band for its track
-- ('none' when they have no readiness for it).
create function private.match_audit_pairs()
returns table (opportunity_id uuid, profile_id uuid, applied boolean, shortlisted boolean, hired boolean, band text)
language sql
stable
security definer
set search_path = ''
as $$
  with views as (
    select distinct (e.props ->> 'opportunity_id')::uuid as opportunity_id, e.profile_id
      from public.events e
     where e.name = 'opportunity_viewed' and e.profile_id is not null
       and (e.props ->> 'opportunity_id') ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
  ), pairs as (
    select coalesce(a.opportunity_id, v.opportunity_id) as opportunity_id,
           coalesce(a.profile_id, v.profile_id) as profile_id,
           a.id is not null as applied,
           coalesce(a.stage in ('shortlisted', 'interview', 'offer', 'hired'), false) as shortlisted,
           coalesce(a.stage = 'hired', false) as hired
      from views v
      full join public.opportunity_applications a on a.opportunity_id = v.opportunity_id and a.profile_id = v.profile_id
  )
  select p.opportunity_id, p.profile_id, p.applied, p.shortlisted, p.hired,
         coalesce((select m.readiness_band from private.opportunity_match(p.profile_id, p.opportunity_id) m), 'none')
    from pairs p
    join public.opportunities o on o.id = p.opportunity_id
    join public.profiles pr on pr.id = p.profile_id and pr.role = 'learner';
$$;

revoke execute on function private.match_audit_pairs() from public, anon, authenticated;
grant execute on function private.match_audit_pairs() to service_role;

create function public.admin_match_audit()
returns table (
  opportunity_id uuid, title text, organisation_name text, band text,
  shown integer, applied integer, shortlisted integer, hired integer
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
    select o.id, o.title, o.organisation_name, p.band,
           count(*)::integer,
           (count(*) filter (where p.applied))::integer,
           (count(*) filter (where p.shortlisted))::integer,
           (count(*) filter (where p.hired))::integer
      from private.match_audit_pairs() p
      join public.opportunities o on o.id = p.opportunity_id
     group by o.id, o.title, o.organisation_name, p.band
     order by o.title, o.id, p.band;
end;
$$;

-- The same counts by group, over every learner and opportunity pair. The
-- groups are the readiness fairness groups (admin_readiness_report), read
-- here only to check matching, never to compute it.
create function public.admin_match_fairness()
returns table (dimension text, grp text, shown integer, applied integer, shortlisted integer, hired integer)
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
    with people as (
      select pa.applied, pa.shortlisted, pa.hired, pa.band,
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
        from private.match_audit_pairs() pa
        join public.profiles p on p.id = pa.profile_id
        left join auth.users u on u.id = pa.profile_id
        left join public.learner_attributes la on la.profile_id = pa.profile_id
        left join public.learner_profiles lp on lp.profile_id = pa.profile_id
    ), grouped as (
      select d.dimension, d.grp, pe.applied, pe.shortlisted, pe.hired
        from people pe
        cross join lateral (values
          ('all', 'all'),
          ('band', pe.band),
          ('region', pe.region),
          ('device', pe.device),
          ('internet', pe.internet),
          ('education', pe.education),
          ('age', pe.age_band)
        ) as d (dimension, grp)
    )
    select gr.dimension, gr.grp, count(*)::integer,
           (count(*) filter (where gr.applied))::integer,
           (count(*) filter (where gr.shortlisted))::integer,
           (count(*) filter (where gr.hired))::integer
      from grouped gr
     group by gr.dimension, gr.grp
     order by gr.dimension, gr.grp;
end;
$$;

revoke execute on function public.admin_match_audit() from public, anon;
revoke execute on function public.admin_match_fairness() from public, anon;
grant execute on function public.admin_match_audit() to authenticated, service_role;
grant execute on function public.admin_match_fairness() to authenticated, service_role;
