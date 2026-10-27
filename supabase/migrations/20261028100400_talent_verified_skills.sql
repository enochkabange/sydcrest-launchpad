-- Schema B (issue #158), part 5: verified skills open the talent directory.
--
-- The Market and Earn schema (#148) decides "may be listed" in one place,
-- private.talent_eligible, and today counts a live programme certificate.
-- The founder rule (Product Enrichment §7.5) is that the directory needs
-- verification, and a verified skill is verification earned without a
-- cohort. Same signature, language, volatility, definer and search_path; the
-- grants stay as #148 set them.

create or replace function private.talent_eligible(p_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.certificates c
    where c.profile_id = p_profile_id and c.revoked_at is null
  ) or private.has_verified_skill(p_profile_id);
$$;

-- The opt in screen also says how many verified skills count.
create or replace function public.talent_eligibility()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'eligible', private.is_adult(v_uid) and private.talent_eligible(v_uid),
    'is_adult', private.is_adult(v_uid),
    'certificates', (select count(*) from public.certificates c
                      where c.profile_id = v_uid and c.revoked_at is null),
    'verified_skills', (select count(*) from public.verified_skills v
                         join public.skills s on s.id = v.skill_id and s.is_published
                         where v.profile_id = v_uid and v.revoked_at is null)
  );
end;
$$;

-- Live verified skills of one person as [{slug, name, source, issued_at}].
-- Definer, because organisations browsing the directory (and visitors on an
-- expert page) cannot read the verified skills of private profiles through
-- RLS. Called only by the talent_directory and public_experts views, which
-- show only rows their definer rows functions allowed.
create function private.verified_skills_json(p_profile_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'slug', s.slug, 'name', s.name, 'source', v.source, 'issued_at', v.issued_at)
         order by s.name), '[]'::jsonb)
  from public.verified_skills v
  join public.skills s on s.id = v.skill_id and s.is_published
  where v.profile_id = p_profile_id and v.revoked_at is null;
$$;

revoke execute on function private.verified_skills_json(uuid) from public;
grant execute on function private.verified_skills_json(uuid) to anon, authenticated, service_role;

-- New column last, so the view keeps every column #148 defined.
create or replace view public.talent_directory
  with (security_invoker = true)
as
  select d.*, private.verified_skills_json(d.profile_id) as verified_skills
  from private.talent_directory_rows() d;

comment on view public.talent_directory is
  'Listed, eligible learners (a live certificate or a verified skill) with name, avatar, live certificates and verified skills, for verified organisations and admins (and the learner''s own preview). Never add phone or email.';

-- Expert pages show the badges too (#165), and discovery can rank experts
-- holding one first. New column last.
create or replace view public.public_experts
  with (security_invoker = true)
as
  select e.*, private.verified_skills_json(e.profile_id) as verified_skills
  from private.public_expert_rows() e;

comment on view public.public_experts is
  'Approved experts with name, avatar, real trust signals and live verified skills, for /experts. Readable by anyone. Never add phone, email or role.';
