-- Phase 2, part 4: certificates (Open Badges 3.0, self hosted).
--
-- Certification is a mentor's final review once the database criteria are
-- met: every week of the learner's path graded at or above the programme
-- pass score (capstone included) and at least programs.min_peer_reviews
-- capstone peer reviews given. Peer review cannot be waived. The cohort's
-- mentor issues; a coordinator of the cohort or an admin is the backup
-- issuer. Only admins revoke.
--
-- Nobody signed in writes certificates directly. The public path is
-- verify_certificate(verification_id): a lookup by the unguessable id that
-- returns the credential and nothing personal beyond the name on it.
-- Learners with a public profile also show live certificates through the
-- public_certificates view.

create table public.certificates (
  id                   uuid primary key default gen_random_uuid(),
  -- 32 hex characters from a v4 UUID (122 random bits): unguessable, and
  -- never listed anywhere a visitor can enumerate.
  verification_id      text not null unique default replace(gen_random_uuid()::text, '-', '')
                         check (verification_id ~ '^[0-9a-f]{32}$'),
  profile_id           uuid not null references public.profiles (id) on delete cascade,
  program_id           uuid not null references public.programs (id) on delete restrict,
  cohort_id            uuid references public.cohorts (id) on delete set null,
  recipient_name       text not null check (char_length(recipient_name) between 1 and 80),
  program_title        text not null check (char_length(program_title) between 1 and 120),
  specialization       text,
  specialization_label text,
  badge_json           jsonb check (badge_json is null or jsonb_typeof(badge_json) = 'object'),
  issued_by            uuid references public.profiles (id) on delete set null,
  issued_at            timestamptz not null default now(),
  revoked_at           timestamptz,
  revoked_by           uuid references public.profiles (id) on delete set null,
  revocation_reason    text check (char_length(revocation_reason) <= 1000),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  check ((revoked_at is null) = (revoked_by is null))
);

comment on table public.certificates is
  'A programme certificate. Issued by issue_certificate, badge_json stored by set_certificate_badge, revoked by revoke_certificate. Public read only through verify_certificate and public_certificates.';
comment on column public.certificates.recipient_name is
  'The learner''s display name when issued; the name the credential is made out to.';
comment on column public.certificates.badge_json is
  'Open Badges 3.0 OpenBadgeCredential built by server code after issue (it needs the site origin). Service role only.';

-- One live certificate per learner per programme; a revoked one can be
-- issued again.
create unique index certificates_one_live
  on public.certificates (profile_id, program_id) where revoked_at is null;
create index certificates_program_idx on public.certificates (program_id);
create index certificates_cohort_idx on public.certificates (cohort_id);
create index certificates_issued_by_idx on public.certificates (issued_by);
create index certificates_revoked_by_idx on public.certificates (revoked_by);

alter table public.certificates enable row level security;

create trigger certificates_set_updated_at
  before update on public.certificates
  for each row execute function private.set_updated_at();

create policy "Holders, their cohort staff and admins read certificates"
  on public.certificates for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or private.is_staff_for_learner(profile_id, program_id)
    or private.is_admin()
  );

revoke all on public.certificates from anon, authenticated;
grant select on public.certificates to authenticated;
grant select, insert, update, delete on public.certificates to service_role;

-- Criteria ----------------------------------------------------------------------

-- Where a learner stands against the programme's certification criteria.
-- Their path is each week number's specialization row when they chose one,
-- else the shared row. A week counts as passed when its submission is graded
-- at or above programs.pass_score. Peer reviews count when submitted on
-- capstone work in the same programme.
create function private.certification_status(p_profile_id uuid, p_program_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_program public.programs;
  v_spec text;
  v_required integer;
  v_passed integer;
  v_missing integer[];
  v_capstone_ok boolean;
  v_peer integer;
begin
  select * into v_program from public.programs where id = p_program_id;
  if v_program.id is null then
    raise exception 'Programme not found' using errcode = 'P0002';
  end if;

  -- The specialization of the learner's current (else latest) membership.
  select m.specialization into v_spec
  from public.cohort_members m join public.cohorts c on c.id = m.cohort_id
  where m.profile_id = p_profile_id and m.role = 'learner' and c.program_id = p_program_id
  order by (m.status = 'active') desc, c.starts_on desc
  limit 1;

  with path as (
    select distinct on (w.week_number) w.id, w.week_number, w.is_capstone
    from public.program_weeks w
    where w.program_id = p_program_id
      and (w.specialization is null or w.specialization = v_spec)
    order by w.week_number, w.specialization nulls last
  ),
  weeks as (
    select distinct week_number from public.program_weeks where program_id = p_program_id
  ),
  graded as (
    select p.week_number, p.is_capstone,
           coalesce(s.final_score >= v_program.pass_score and s.status = 'graded', false) as passed
    from path p
    left join public.submissions s on s.program_week_id = p.id and s.profile_id = p_profile_id
  )
  select
    (select count(*) from weeks),
    (select count(*) from graded where passed),
    (select coalesce(array_agg(wk.week_number order by wk.week_number), '{}')
       from weeks wk
       where not exists (select 1 from graded g where g.week_number = wk.week_number and g.passed)),
    not exists (select 1 from graded where is_capstone and not passed)
  into v_required, v_passed, v_missing, v_capstone_ok;

  select count(*) into v_peer
  from public.peer_reviews pr
  join public.submissions s on s.id = pr.submission_id
  join public.program_weeks w on w.id = s.program_week_id
  where pr.reviewer_id = p_profile_id and pr.status = 'submitted'
    and s.program_id = p_program_id and w.is_capstone and s.profile_id <> p_profile_id;

  return jsonb_build_object(
    'eligible', v_required > 0 and cardinality(v_missing) = 0 and v_capstone_ok
                and v_peer >= v_program.min_peer_reviews,
    'specialization', v_spec,
    'weeks_required', v_required,
    'weeks_passed', v_passed,
    'missing_weeks', to_jsonb(v_missing),
    'capstone_passed', v_capstone_ok,
    'peer_reviews_given', v_peer,
    'peer_reviews_required', v_program.min_peer_reviews,
    'pass_score', v_program.pass_score
  );
end;
$$;

revoke execute on function private.certification_status(uuid, uuid) from public, anon, authenticated;
grant execute on function private.certification_status(uuid, uuid) to service_role;

-- The learner (default: the caller), their cohort staff or an admin reads
-- the criteria check.
create function public.certification_status(p_program_id uuid, p_profile_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_profile uuid := coalesce(p_profile_id, (select auth.uid()));
begin
  if v_profile is null then
    raise exception 'Sign in to see certification progress' using errcode = '42501';
  end if;
  if v_profile <> (select auth.uid())
     and not private.is_staff_for_learner(v_profile, p_program_id)
     and not private.is_admin() then
    raise exception 'Not your learner' using errcode = '42501';
  end if;
  return private.certification_status(v_profile, p_program_id);
end;
$$;

revoke execute on function public.certification_status(uuid, uuid) from public, anon;
grant execute on function public.certification_status(uuid, uuid) to authenticated, service_role;

-- Issue, badge, revoke -------------------------------------------------------------

-- The mentor (or a coordinator of the cohort, or an admin) issues the
-- certificate once the criteria are met. Marks the membership completed.
create function public.issue_certificate(p_cohort_member_id uuid)
returns public.certificates
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_member public.cohort_members;
  v_cohort public.cohorts;
  v_program public.programs;
  v_status jsonb;
  v_name text;
  v_label text;
  v_cert public.certificates;
begin
  select * into v_member from public.cohort_members where id = p_cohort_member_id for update;
  if v_member.id is null or v_member.role <> 'learner' then
    raise exception 'Learner membership not found' using errcode = 'P0002';
  end if;
  if not (private.is_cohort_staff(v_member.cohort_id) or private.is_admin()) then
    raise exception 'Only the cohort''s mentor, a coordinator or an admin issues certificates' using errcode = '42501';
  end if;
  if v_member.status = 'deferred' then
    raise exception 'This learner was deferred; issue from their current cohort' using errcode = '22023';
  end if;

  select * into v_cohort from public.cohorts where id = v_member.cohort_id;
  select * into v_program from public.programs where id = v_cohort.program_id;

  if exists (
    select 1 from public.certificates
    where profile_id = v_member.profile_id and program_id = v_program.id and revoked_at is null
  ) then
    raise exception 'This learner already holds this certificate' using errcode = '23505';
  end if;

  v_status := private.certification_status(v_member.profile_id, v_program.id);
  if not (v_status ->> 'eligible')::boolean then
    raise exception 'Certification criteria not met: %', v_status using errcode = '22023';
  end if;

  select nullif(trim(display_name), '') into v_name from public.profiles where id = v_member.profile_id;
  if v_name is null then
    raise exception 'The learner needs a display name on their profile first' using errcode = '22023';
  end if;

  select e ->> 'label' into v_label
  from jsonb_array_elements(v_program.specializations) e
  where e ->> 'slug' = v_member.specialization;

  insert into public.certificates (
    profile_id, program_id, cohort_id, recipient_name, program_title,
    specialization, specialization_label, issued_by
  )
  values (
    v_member.profile_id, v_program.id, v_cohort.id, v_name, v_program.title,
    v_member.specialization, v_label, (select auth.uid())
  )
  returning * into v_cert;

  update public.cohort_members
     set status = 'completed', completed_at = coalesce(completed_at, now())
   where id = v_member.id;

  return v_cert;
end;
$$;

revoke execute on function public.issue_certificate(uuid) from public, anon;
grant execute on function public.issue_certificate(uuid) to authenticated, service_role;

-- Server code (secret key) stores the Open Badges 3.0 JSON it built.
create function public.set_certificate_badge(p_certificate_id uuid, p_badge_json jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_badge_json is null or jsonb_typeof(p_badge_json) <> 'object' then
    raise exception 'Badge JSON must be an object' using errcode = '22023';
  end if;
  update public.certificates set badge_json = p_badge_json where id = p_certificate_id;
  if not found then
    raise exception 'Certificate not found' using errcode = 'P0002';
  end if;
end;
$$;

revoke execute on function public.set_certificate_badge(uuid, jsonb) from public, anon, authenticated;
grant execute on function public.set_certificate_badge(uuid, jsonb) to service_role;

create function public.revoke_certificate(p_certificate_id uuid, p_reason text)
returns public.certificates
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_cert public.certificates;
begin
  if not private.is_admin() then
    raise exception 'Only admins revoke certificates' using errcode = '42501';
  end if;
  if nullif(trim(p_reason), '') is null then
    raise exception 'Give a reason for revoking' using errcode = '22023';
  end if;
  update public.certificates
     set revoked_at = now(), revoked_by = (select auth.uid()), revocation_reason = trim(p_reason)
   where id = p_certificate_id and revoked_at is null
  returning * into v_cert;
  if v_cert.id is null then
    raise exception 'No live certificate with that id' using errcode = 'P0002';
  end if;
  return v_cert;
end;
$$;

revoke execute on function public.revoke_certificate(uuid, text) from public, anon;
grant execute on function public.revoke_certificate(uuid, text) to authenticated, service_role;

-- Public verification -----------------------------------------------------------

create function private.verify_certificate_row(p_verification_id text)
returns table (
  verification_id      text,
  recipient_name       text,
  program_slug         text,
  program_title        text,
  specialization_label text,
  cohort_name          text,
  issued_at            timestamptz,
  revoked_at           timestamptz,
  badge_json           jsonb
)
language sql
stable
security definer
set search_path = ''
as $$
  select c.verification_id, c.recipient_name, p.slug, c.program_title, c.specialization_label,
         co.name, c.issued_at, c.revoked_at, c.badge_json
  from public.certificates c
  join public.programs p on p.id = c.program_id
  left join public.cohorts co on co.id = c.cohort_id
  where c.verification_id = lower(p_verification_id);
$$;

revoke execute on function private.verify_certificate_row(text) from public;
grant execute on function private.verify_certificate_row(text) to anon, authenticated, service_role;

-- Anyone looks up one certificate by its verification id (zero or one row;
-- a revoked certificate still answers, with revoked_at set). Security
-- invoker over the private definer function, so no definer function in
-- public is executable by anon.
create function public.verify_certificate(p_verification_id text)
returns table (
  verification_id      text,
  recipient_name       text,
  program_slug         text,
  program_title        text,
  specialization_label text,
  cohort_name          text,
  issued_at            timestamptz,
  revoked_at           timestamptz,
  badge_json           jsonb
)
language sql
stable
security invoker
set search_path = ''
as $$
  select * from private.verify_certificate_row(p_verification_id);
$$;

revoke execute on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon, authenticated, service_role;

-- Live certificates of opted in profiles, for public profile pages.
create function private.public_certificate_rows()
returns table (
  profile_id           uuid,
  public_slug          text,
  verification_id      text,
  program_slug         text,
  program_title        text,
  specialization_label text,
  issued_at            timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select c.profile_id, pr.public_slug, c.verification_id, p.slug, c.program_title,
         c.specialization_label, c.issued_at
  from public.certificates c
  join public.profiles pr on pr.id = c.profile_id and pr.is_public
  join public.programs p on p.id = c.program_id
  where c.revoked_at is null;
$$;

revoke execute on function private.public_certificate_rows() from public;
grant execute on function private.public_certificate_rows() to anon, authenticated, service_role;

create view public.public_certificates
  with (security_invoker = true)
as
  select * from private.public_certificate_rows();

comment on view public.public_certificates is
  'Live certificates of opted in profiles (for public profile pages). Never add personal fields here.';

revoke all on public.public_certificates from anon, authenticated;
grant select on public.public_certificates to anon, authenticated, service_role;
