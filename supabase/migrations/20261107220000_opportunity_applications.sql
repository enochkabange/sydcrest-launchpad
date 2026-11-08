-- Apply on SydCrest: applicant tracking for employers (#306).
--
-- Founder decisions, 7 Nov 2026:
--   * Each opportunity takes applications on SydCrest, through an external
--     link or instructions, or both: the poster chooses (apply_on_sydcrest).
--   * Applicants share their name, region, verified skills, portfolio and a
--     short note. Phone and email reach the employer only once they are
--     shortlisted, and the learner agrees to that when applying.
--
-- Stages: new, shortlisted, interview, offer, hired, not_selected; the
-- learner can withdraw. Each employer change notifies the learner; hired
-- also files a pending outcome for an admin to verify, as learner reported
-- outcomes are.

alter table public.opportunities
  add column apply_on_sydcrest boolean not null default false;

comment on column public.opportunities.apply_on_sydcrest is
  'Take applications on SydCrest (#306), as well as or instead of apply_url and apply_instructions.';

grant insert (apply_on_sydcrest), update (apply_on_sydcrest) on public.opportunities to authenticated;

create table public.opportunity_applications (
  id               uuid primary key default gen_random_uuid(),
  opportunity_id   uuid not null references public.opportunities (id) on delete cascade,
  profile_id       uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  note             text not null check (char_length(btrim(note)) between 20 and 1500),
  portfolio_url    text check (private.url_ok(portfolio_url)),
  contact_consent  boolean not null check (contact_consent),
  stage            text not null default 'new'
                     check (stage in ('new', 'shortlisted', 'interview', 'offer', 'hired', 'not_selected', 'withdrawn')),
  stage_changed_at timestamptz not null default now(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (opportunity_id, profile_id)
);

comment on table public.opportunity_applications is
  'Applications made on SydCrest (#306). The learner reads and withdraws their own; employers read them through org_opportunity_applicants and move them with set_application_stage.';
comment on column public.opportunity_applications.contact_consent is
  'The learner agreed that the employer sees their phone and email once shortlisted. Required to apply.';

create index opportunity_applications_opportunity_idx on public.opportunity_applications (opportunity_id, stage);
create index opportunity_applications_profile_idx on public.opportunity_applications (profile_id);

alter table public.opportunity_applications enable row level security;

create trigger opportunity_applications_set_updated_at
  before update on public.opportunity_applications
  for each row execute function private.set_updated_at();

-- Open for applications on SydCrest: open, before its deadline, and the
-- poster chose to take them here.
create function private.takes_applications(p_opportunity_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.opportunities o
    where o.id = p_opportunity_id
      and o.apply_on_sydcrest
      and o.status = 'open'
      and (o.deadline is null or o.deadline >= (now() at time zone 'Africa/Accra')::date)
  );
$$;

revoke execute on function private.takes_applications(uuid) from public;
grant execute on function private.takes_applications(uuid) to authenticated, service_role;

create policy "Learners and admins read applications"
  on public.opportunity_applications for select
  to authenticated
  using (profile_id = (select auth.uid()) or (select private.is_admin()));

create policy "Adults apply as themselves to open listings"
  on public.opportunity_applications for insert
  to authenticated
  with check (
    profile_id = (select auth.uid())
    and private.is_adult((select auth.uid()))
    and private.takes_applications(opportunity_id)
  );

-- The only change a learner makes is withdrawing (the column grant limits
-- updates to stage), and not once they are hired.
create policy "Learners withdraw their own application"
  on public.opportunity_applications for update
  to authenticated
  using (profile_id = (select auth.uid()) and stage not in ('hired', 'withdrawn'))
  with check (profile_id = (select auth.uid()) and stage = 'withdrawn');

revoke all on public.opportunity_applications from anon, authenticated;
grant select on public.opportunity_applications to authenticated;
grant insert (opportunity_id, note, portfolio_url, contact_consent) on public.opportunity_applications to authenticated;
grant update (stage) on public.opportunity_applications to authenticated;
grant select, insert, update, delete on public.opportunity_applications to service_role;

-- Withdrawing stamps the stage time too.
create function private.stamp_application_stage()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.stage is distinct from old.stage then
    new.stage_changed_at := now();
  end if;
  return new;
end;
$$;

revoke execute on function private.stamp_application_stage() from public, anon, authenticated;

create trigger opportunity_applications_stamp_stage
  before update on public.opportunity_applications
  for each row execute function private.stamp_application_stage();

-- Applying also marks the learner's private board marker as applied.
create function private.mark_opportunity_applied()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.opportunity_saves as s (profile_id, opportunity_id, status, applied_at)
  values (new.profile_id, new.opportunity_id, 'applied', now())
  on conflict (profile_id, opportunity_id) do update set status = 'applied', applied_at = coalesce(s.applied_at, now());
  return new;
end;
$$;

revoke execute on function private.mark_opportunity_applied() from public, anon, authenticated;

create trigger opportunity_applications_mark_applied
  after insert on public.opportunity_applications
  for each row execute function private.mark_opportunity_applied();

-- Who may manage applications for an opportunity: admins, or a verified
-- organisation's owner, admin or recruiter when it is the organisation's own.
create function private.can_manage_applications(p_opportunity_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin() or exists (
    select 1 from public.opportunities o
    where o.id = p_opportunity_id and o.organisation_id is not null and private.can_post_for_org(o.organisation_id)
  );
$$;

revoke execute on function private.can_manage_applications(uuid) from public;
grant execute on function private.can_manage_applications(uuid) to authenticated, service_role;

-- The employer's view of the applicants for one opportunity. Contact details
-- (phone from the profile, email from the account) only from shortlisted on;
-- withdrawn applications are left out.
create function public.org_opportunity_applicants(p_opportunity_id uuid)
returns table (
  application_id   uuid,
  display_name     text,
  region           text,
  public_slug      text,
  note             text,
  portfolio_url    text,
  verified_skills  text[],
  stage            text,
  stage_changed_at timestamptz,
  applied_at       timestamptz,
  phone            text,
  email            text
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, p.display_name, p.region,
         case when p.is_public then p.public_slug end,
         a.note, a.portfolio_url,
         coalesce((
           select array_agg(s.name order by s.name)
           from public.verified_skills v join public.skills s on s.id = v.skill_id
           where v.profile_id = a.profile_id and v.revoked_at is null
         ), '{}'),
         a.stage, a.stage_changed_at, a.created_at,
         case when a.stage in ('shortlisted', 'interview', 'offer', 'hired') then p.phone end,
         case when a.stage in ('shortlisted', 'interview', 'offer', 'hired') then u.email::text end
  from public.opportunity_applications a
  join public.profiles p on p.id = a.profile_id
  join auth.users u on u.id = a.profile_id
  where a.opportunity_id = p_opportunity_id
    and a.stage <> 'withdrawn'
    and private.can_manage_applications(p_opportunity_id)
  order by a.created_at;
$$;

revoke execute on function public.org_opportunity_applicants(uuid) from public, anon;
grant execute on function public.org_opportunity_applicants(uuid) to authenticated, service_role;

-- Move an application to a new stage. Notifies the learner; hired also files
-- a pending outcome (an admin verifies it, as with any outcome).
create function public.set_application_stage(p_application_id uuid, p_stage text)
returns public.opportunity_applications
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_app public.opportunity_applications;
  v_opp public.opportunities;
  v_title text;
begin
  if p_stage not in ('new', 'shortlisted', 'interview', 'offer', 'hired', 'not_selected') then
    raise exception 'Unknown stage' using errcode = '22023';
  end if;
  select * into v_app from public.opportunity_applications where id = p_application_id for update;
  if v_app.id is null or not private.can_manage_applications(v_app.opportunity_id) then
    raise exception 'No application you can manage with that id' using errcode = '42501';
  end if;
  if v_app.stage in ('withdrawn', 'hired') then
    raise exception 'This application is closed' using errcode = '55000';
  end if;
  if v_app.stage = p_stage then
    return v_app;
  end if;

  update public.opportunity_applications set stage = p_stage where id = v_app.id returning * into v_app;
  select * into v_opp from public.opportunities where id = v_app.opportunity_id;

  v_title := case p_stage
    when 'shortlisted' then 'You are shortlisted'
    when 'interview' then 'Interview stage'
    when 'offer' then 'You have an offer'
    when 'hired' then 'You are hired'
    when 'not_selected' then 'Not this time'
    else 'Application update'
  end;
  perform private.notify(v_app.profile_id, 'opportunity', jsonb_build_object(
    'title', v_title,
    'body', v_opp.title || ' at ' || v_opp.organisation_name,
    'href', '/opportunities/applications'
  ));

  if p_stage = 'hired' then
    insert into public.outcomes (profile_id, type, title, organisation_name, organisation_id, opportunity_id, started_on, evidence_note)
    values (
      v_app.profile_id,
      case v_opp.kind when 'gig' then 'freelance_contract' else v_opp.kind end,
      left(v_opp.title, 140),
      v_opp.organisation_name,
      v_opp.organisation_id,
      v_opp.id,
      (now() at time zone 'Africa/Accra')::date,
      'Hired through an application on SydCrest.'
    );
  end if;
  return v_app;
end;
$$;

revoke execute on function public.set_application_stage(uuid, text) from public, anon;
grant execute on function public.set_application_stage(uuid, text) to authenticated, service_role;
