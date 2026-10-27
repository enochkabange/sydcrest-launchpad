-- Phase 2, part 1: programmes, cohorts, membership, applications, notes.
--
-- A programme (the DMP first) is the curriculum and its rules, stored as
-- data: duration, age eligibility, cohort size, grace period, pass mark, peer
-- review requirement and screening questions. A cohort is one run of a
-- programme with a start date and a size cap. People join a cohort as a
-- learner, mentor or coordinator through cohort_members.
--
-- Write rules. Admins create programmes and cohorts and add staff directly.
-- Everything that decides who is in a cohort or how far they got goes
-- through security definer functions with role checks: accepting an
-- application (size cap), deferring a learner (progress kept), choosing a
-- specialization. Learners never insert or update membership rows.

-- programs --------------------------------------------------------------------

create table public.programs (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{0,48}[a-z0-9]$'),
  title                 text not null check (char_length(title) between 1 and 120),
  summary               text check (char_length(summary) <= 2000),
  duration_weeks        smallint not null default 12 check (duration_weeks between 1 and 52),
  -- Under 18s are blocked at sign up; a programme can only raise the bar.
  min_age               smallint not null default 18 check (min_age between 18 and 120),
  eligibility           text check (char_length(eligibility) <= 2000),
  default_cohort_size   smallint not null default 20 check (default_cohort_size between 1 and 200),
  grace_days            smallint not null default 7 check (grace_days between 0 and 28),
  pass_score            smallint not null default 60 check (pass_score between 0 and 100),
  -- Peer review is always required for certification: no waiver, so >= 1.
  min_peer_reviews      smallint not null default 1 check (min_peer_reviews between 1 and 10),
  certification_summary text check (char_length(certification_summary) <= 2000),
  specializations       jsonb not null default '[]' check (jsonb_typeof(specializations) = 'array'),
  screening_questions   jsonb not null default '[]' check (jsonb_typeof(screening_questions) = 'array'),
  is_published          boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

comment on table public.programs is
  'A mentored programme (DMP first): duration, eligibility, cohort size, grace days, pass mark, peer review count and screening questions, as data.';
comment on column public.programs.specializations is
  'Array of {"slug","label"}. Learners choose one; program_weeks with that slug replace the shared week of the same number.';
comment on column public.programs.screening_questions is
  'Array of {"id","prompt","kind":"text"|"choice","options"?:[...],"required"?:bool}. Answers land in cohort_applications.screening_answers keyed by id.';
comment on column public.programs.pass_score is
  'Final score (0 to 100) a week needs to count as passed toward certification.';
comment on column public.programs.min_peer_reviews is
  'Capstone peer reviews a learner must give before certification. Always at least 1.';
comment on column public.programs.grace_days is
  'Days after a week''s due date before the work counts as late (founder rule: 7).';

alter table public.programs enable row level security;

create trigger programs_set_updated_at
  before update on public.programs
  for each row execute function private.set_updated_at();

create function private.program_is_published(p_program_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.programs where id = p_program_id and is_published);
$$;

revoke execute on function private.program_is_published(uuid) from public;
grant execute on function private.program_is_published(uuid) to anon, authenticated, service_role;

-- True when slug is one of the programme's specializations.
create function private.program_has_specialization(p_program_id uuid, p_slug text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.programs p, jsonb_array_elements(p.specializations) e
    where p.id = p_program_id and e ->> 'slug' = p_slug
  );
$$;

revoke execute on function private.program_has_specialization(uuid, text) from public;
grant execute on function private.program_has_specialization(uuid, text) to authenticated, service_role;

create policy "Published programmes are public; admins see all"
  on public.programs for select
  to anon, authenticated
  using (is_published or private.is_admin());

create policy "Admins insert programmes"
  on public.programs for insert to authenticated with check (private.is_admin());
create policy "Admins update programmes"
  on public.programs for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "Admins delete programmes"
  on public.programs for delete to authenticated using (private.is_admin());

revoke all on public.programs from anon, authenticated;
grant select on public.programs to anon, authenticated;
grant insert, update, delete on public.programs to authenticated;
grant select, insert, update, delete on public.programs to service_role;

-- cohorts ---------------------------------------------------------------------

create table public.cohorts (
  id         uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete restrict,
  name       text not null check (char_length(name) between 1 and 80),
  starts_on  date not null,
  max_size   smallint not null default 20 check (max_size between 1 and 200),
  status     text not null default 'planned'
               check (status in ('planned', 'enrolling', 'running', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (program_id, name)
);

comment on table public.cohorts is
  'One run of a programme. Week n is due on starts_on + 7n days; work is late after that plus programs.grace_days.';
comment on column public.cohorts.max_size is
  'Active learners allowed (20 by default, 25 for the pilot). Enforced by decide_application and defer_learner.';

create index cohorts_program_idx on public.cohorts (program_id, starts_on);

alter table public.cohorts enable row level security;

create trigger cohorts_set_updated_at
  before update on public.cohorts
  for each row execute function private.set_updated_at();

create policy "Cohorts of published programmes are public; admins see all"
  on public.cohorts for select
  to anon, authenticated
  using (private.program_is_published(program_id) or private.is_admin());

create policy "Admins insert cohorts"
  on public.cohorts for insert to authenticated with check (private.is_admin());
create policy "Admins update cohorts"
  on public.cohorts for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "Admins delete cohorts"
  on public.cohorts for delete to authenticated using (private.is_admin());

revoke all on public.cohorts from anon, authenticated;
grant select on public.cohorts to anon, authenticated;
grant insert, update, delete on public.cohorts to authenticated;
grant select, insert, update, delete on public.cohorts to service_role;

-- cohort_members --------------------------------------------------------------

create table public.cohort_members (
  id             uuid primary key default gen_random_uuid(),
  cohort_id      uuid not null references public.cohorts (id) on delete cascade,
  profile_id     uuid not null references public.profiles (id) on delete cascade,
  role           text not null check (role in ('learner', 'mentor', 'coordinator')),
  specialization text,
  status         text not null default 'active' check (status in ('active', 'deferred', 'completed')),
  deferred_to    uuid references public.cohorts (id) on delete set null,
  deferred_at    timestamptz,
  completed_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (cohort_id, profile_id),
  check (role = 'learner' or specialization is null),
  check (role = 'learner' or status = 'active'),
  check ((status = 'deferred') = (deferred_at is not null)),
  check (deferred_to is null or status = 'deferred'),
  check (deferred_to is distinct from cohort_id),
  check ((status = 'completed') = (completed_at is not null))
);

comment on table public.cohort_members is
  'Who is in a cohort and as what. Learner status: active, deferred (moved to deferred_to, progress kept) or completed (certified).';
comment on column public.cohort_members.specialization is
  'Learners only: a slug from programs.specializations. Set by choose_specialization.';
comment on column public.cohort_members.deferred_to is
  'The cohort a deferred learner moved to; null while they wait for one. Set by defer_learner.';

create index cohort_members_profile_idx on public.cohort_members (profile_id);
create index cohort_members_deferred_to_idx on public.cohort_members (deferred_to);

alter table public.cohort_members enable row level security;

create trigger cohort_members_set_updated_at
  before update on public.cohort_members
  for each row execute function private.set_updated_at();

create function private.validate_cohort_member()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_program_id uuid;
begin
  if new.specialization is not null then
    select program_id into v_program_id from public.cohorts where id = new.cohort_id;
    if not private.program_has_specialization(v_program_id, new.specialization) then
      raise exception 'Unknown specialization %', new.specialization using errcode = '22023';
    end if;
  end if;
  return new;
end;
$$;

revoke execute on function private.validate_cohort_member() from public;

create trigger cohort_members_validate
  before insert or update of specialization, cohort_id on public.cohort_members
  for each row execute function private.validate_cohort_member();

-- Membership helpers. Definer so policies on cohort_members (and every
-- table that asks "is the caller in this cohort") do not recurse through
-- cohort_members RLS.

-- The caller's role in a cohort, or null when they are not in it.
create function private.cohort_role(p_cohort_id uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.cohort_members
  where cohort_id = p_cohort_id and profile_id = (select auth.uid());
$$;

revoke execute on function private.cohort_role(uuid) from public;
grant execute on function private.cohort_role(uuid) to authenticated, service_role;

-- The caller is a mentor or coordinator of the cohort.
create function private.is_cohort_staff(p_cohort_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.cohort_members
    where cohort_id = p_cohort_id and profile_id = (select auth.uid())
      and role in ('mentor', 'coordinator')
  );
$$;

revoke execute on function private.is_cohort_staff(uuid) from public;
grant execute on function private.is_cohort_staff(uuid) to authenticated, service_role;

-- The caller mentors or coordinates a cohort of this programme that the
-- learner is (or was, before a deferral) a member of. Deferral keeps
-- progress, so the new cohort's staff see the learner's earlier work.
create function private.is_staff_for_learner(p_profile_id uuid, p_program_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.cohort_members staff
    join public.cohort_members learner on learner.cohort_id = staff.cohort_id
    join public.cohorts c on c.id = staff.cohort_id
    where staff.profile_id = (select auth.uid())
      and staff.role in ('mentor', 'coordinator')
      and learner.profile_id = p_profile_id
      and learner.role = 'learner'
      and c.program_id = p_program_id
  );
$$;

revoke execute on function private.is_staff_for_learner(uuid, uuid) from public;
grant execute on function private.is_staff_for_learner(uuid, uuid) to authenticated, service_role;

-- The caller is staff of the cohort that membership row belongs to.
create function private.is_staff_for_member(p_member_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.cohort_members m
    join public.cohort_members staff on staff.cohort_id = m.cohort_id
    where m.id = p_member_id
      and staff.profile_id = (select auth.uid())
      and staff.role in ('mentor', 'coordinator')
  );
$$;

revoke execute on function private.is_staff_for_member(uuid) from public;
grant execute on function private.is_staff_for_member(uuid) to authenticated, service_role;

create policy "Members see their cohort's members; admins see all"
  on public.cohort_members for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or private.cohort_role(cohort_id) is not null
    or private.is_admin()
  );

-- Admins add, change and remove mentors and coordinators directly. Learners
-- join only through decide_application or defer_learner (size cap), so the
-- direct insert and update paths refuse learner rows.
create policy "Admins add staff"
  on public.cohort_members for insert
  to authenticated
  with check (private.is_admin() and role <> 'learner');
create policy "Admins change staff"
  on public.cohort_members for update
  to authenticated
  using (private.is_admin() and role <> 'learner')
  with check (private.is_admin() and role <> 'learner');
create policy "Admins remove members"
  on public.cohort_members for delete
  to authenticated
  using (private.is_admin());

revoke all on public.cohort_members from anon, authenticated;
grant select on public.cohort_members to authenticated;
grant insert (cohort_id, profile_id, role) on public.cohort_members to authenticated;
grant update (role) on public.cohort_members to authenticated;
grant delete on public.cohort_members to authenticated;
grant select, insert, update, delete on public.cohort_members to service_role;

-- cohort_roster (view) --------------------------------------------------------

-- Profiles are readable only by their owner, so names for the cohort page
-- come through this definer function: members of the caller's cohorts (or
-- every cohort for admins), name and avatar only. Never phone or email.
create function private.cohort_roster_rows()
returns table (
  member_id      uuid,
  cohort_id      uuid,
  profile_id     uuid,
  display_name   text,
  avatar_url     text,
  public_slug    text,
  role           text,
  specialization text,
  status         text,
  deferred_to    uuid
)
language sql
stable
security definer
set search_path = ''
as $$
  select m.id, m.cohort_id, m.profile_id, p.display_name, p.avatar_url,
         case when p.is_public then p.public_slug end,
         m.role, m.specialization, m.status, m.deferred_to
  from public.cohort_members m
  join public.profiles p on p.id = m.profile_id
  where private.is_admin()
     or exists (
       select 1 from public.cohort_members me
       where me.cohort_id = m.cohort_id and me.profile_id = (select auth.uid())
     );
$$;

revoke execute on function private.cohort_roster_rows() from public;
grant execute on function private.cohort_roster_rows() to authenticated, service_role;

create view public.cohort_roster
  with (security_invoker = true)
as
  select * from private.cohort_roster_rows();

comment on view public.cohort_roster is
  'Members of the caller''s cohorts with name and avatar (admins: every cohort). Never add phone or email here.';

revoke all on public.cohort_roster from anon, authenticated;
grant select on public.cohort_roster to authenticated, service_role;

-- cohort_applications ---------------------------------------------------------

create table public.cohort_applications (
  id                  uuid primary key default gen_random_uuid(),
  program_id          uuid not null references public.programs (id) on delete cascade,
  profile_id          uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  preferred_cohort_id uuid references public.cohorts (id) on delete set null,
  specialization      text,
  screening_answers   jsonb not null default '{}' check (jsonb_typeof(screening_answers) = 'object'),
  status              text not null default 'submitted'
                        check (status in ('submitted', 'waitlisted', 'accepted', 'declined', 'withdrawn')),
  cohort_id           uuid references public.cohorts (id) on delete set null,
  decision_note       text check (char_length(decision_note) <= 2000),
  decided_by          uuid references public.profiles (id) on delete set null,
  decided_at          timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  check (status <> 'accepted' or cohort_id is not null),
  check (status in ('submitted', 'withdrawn') or decided_at is not null)
);

comment on table public.cohort_applications is
  'An application to a programme with screening answers. Applicants insert and edit while open; admins decide through decide_application.';
comment on column public.cohort_applications.decision_note is
  'Message to the applicant from the reviewer; the applicant can read it.';

-- One open or accepted application per person per programme.
create unique index cohort_applications_one_live
  on public.cohort_applications (program_id, profile_id)
  where status in ('submitted', 'waitlisted', 'accepted');
create index cohort_applications_queue_idx on public.cohort_applications (program_id, status, created_at);
create index cohort_applications_profile_idx on public.cohort_applications (profile_id);

alter table public.cohort_applications enable row level security;

create trigger cohort_applications_set_updated_at
  before update on public.cohort_applications
  for each row execute function private.set_updated_at();

create function private.validate_application()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.specialization is not null
     and not private.program_has_specialization(new.program_id, new.specialization) then
    raise exception 'Unknown specialization %', new.specialization using errcode = '22023';
  end if;
  if new.preferred_cohort_id is not null and not exists (
    select 1 from public.cohorts where id = new.preferred_cohort_id and program_id = new.program_id
  ) then
    raise exception 'That cohort is not part of this programme' using errcode = '22023';
  end if;
  return new;
end;
$$;

revoke execute on function private.validate_application() from public;

create trigger cohort_applications_validate
  before insert or update on public.cohort_applications
  for each row execute function private.validate_application();

create policy "Applicants read their own applications; admins read all"
  on public.cohort_applications for select
  to authenticated
  using (profile_id = (select auth.uid()) or private.is_admin());

create policy "Signed in users apply to a published programme as themselves"
  on public.cohort_applications for insert
  to authenticated
  with check (profile_id = (select auth.uid()) and private.program_is_published(program_id));

create policy "Applicants edit their answers while the application is open"
  on public.cohort_applications for update
  to authenticated
  using (profile_id = (select auth.uid()) and status in ('submitted', 'waitlisted'))
  with check (profile_id = (select auth.uid()) and status in ('submitted', 'waitlisted'));

-- Status, cohort and decision fields are set only by decide_application and
-- withdraw_application.
revoke all on public.cohort_applications from anon, authenticated;
grant select on public.cohort_applications to authenticated;
grant insert (program_id, profile_id, preferred_cohort_id, specialization, screening_answers)
  on public.cohort_applications to authenticated;
grant update (preferred_cohort_id, specialization, screening_answers)
  on public.cohort_applications to authenticated;
grant select, insert, update, delete on public.cohort_applications to service_role;

-- application_queue (view) ----------------------------------------------------

-- The admin review queue needs applicant names, and profiles are readable
-- only by their owner. Admins only; everyone else gets zero rows. Name,
-- avatar, region and public slug only: never phone or email.
create function private.application_queue_rows()
returns table (
  application_id      uuid,
  program_id          uuid,
  profile_id          uuid,
  display_name        text,
  avatar_url          text,
  region              text,
  public_slug         text,
  preferred_cohort_id uuid,
  specialization      text,
  screening_answers   jsonb,
  status              text,
  cohort_id           uuid,
  decision_note       text,
  decided_at          timestamptz,
  created_at          timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, a.program_id, a.profile_id, p.display_name, p.avatar_url, p.region,
         case when p.is_public then p.public_slug end,
         a.preferred_cohort_id, a.specialization, a.screening_answers, a.status,
         a.cohort_id, a.decision_note, a.decided_at, a.created_at
  from public.cohort_applications a
  join public.profiles p on p.id = a.profile_id
  where private.is_admin();
$$;

revoke execute on function private.application_queue_rows() from public;
grant execute on function private.application_queue_rows() to authenticated, service_role;

create view public.application_queue
  with (security_invoker = true)
as
  select * from private.application_queue_rows();

comment on view public.application_queue is
  'Applications with applicant name, avatar and region, for the admin review queue. Admins only. Never add phone or email here.';

revoke all on public.application_queue from anon, authenticated;
grant select on public.application_queue to authenticated, service_role;

-- cohort_notes ----------------------------------------------------------------

create table public.cohort_notes (
  id               uuid primary key default gen_random_uuid(),
  cohort_member_id uuid not null references public.cohort_members (id) on delete cascade,
  author_id        uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  body             text not null check (char_length(body) between 1 and 4000),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.cohort_notes is
  'Private mentor and coordinator notes about a cohort member. The member never sees them.';

create index cohort_notes_member_idx on public.cohort_notes (cohort_member_id, created_at desc);
create index cohort_notes_author_idx on public.cohort_notes (author_id);

alter table public.cohort_notes enable row level security;

create trigger cohort_notes_set_updated_at
  before update on public.cohort_notes
  for each row execute function private.set_updated_at();

create policy "Cohort staff and admins read notes"
  on public.cohort_notes for select
  to authenticated
  using (private.is_staff_for_member(cohort_member_id) or private.is_admin());

create policy "Cohort staff write notes as themselves"
  on public.cohort_notes for insert
  to authenticated
  with check (
    author_id = (select auth.uid())
    and (private.is_staff_for_member(cohort_member_id) or private.is_admin())
  );

create policy "Authors edit their own notes"
  on public.cohort_notes for update
  to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create policy "Authors and admins delete notes"
  on public.cohort_notes for delete
  to authenticated
  using (author_id = (select auth.uid()) or private.is_admin());

revoke all on public.cohort_notes from anon, authenticated;
grant select, delete on public.cohort_notes to authenticated;
grant insert (cohort_member_id, author_id, body) on public.cohort_notes to authenticated;
grant update (body) on public.cohort_notes to authenticated;
grant select, insert, update, delete on public.cohort_notes to service_role;

-- Functions -------------------------------------------------------------------

-- Locks the cohort and raises unless it can take one more active learner.
-- Callers hold the lock until their transaction ends, so two parallel
-- accepts cannot both take the last seat.
create function private.claim_cohort_seat(p_cohort_id uuid, p_program_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_cohort public.cohorts;
  v_active integer;
begin
  select * into v_cohort from public.cohorts where id = p_cohort_id for update;
  if v_cohort.id is null or v_cohort.program_id <> p_program_id then
    raise exception 'That cohort is not part of this programme' using errcode = '22023';
  end if;
  if v_cohort.status in ('completed', 'cancelled') then
    raise exception 'That cohort is closed' using errcode = '22023';
  end if;
  select count(*) into v_active from public.cohort_members
  where cohort_id = p_cohort_id and role = 'learner' and status = 'active';
  if v_active >= v_cohort.max_size then
    raise exception 'Cohort is full' using errcode = '53400';
  end if;
end;
$$;

revoke execute on function private.claim_cohort_seat(uuid, uuid) from public, anon, authenticated;

-- Admin decision on an application: accepted (into a cohort of the same
-- programme, within its size cap; creates the learner membership with the
-- application's specialization), waitlisted or declined. Accepting a
-- waitlisted application is the waitlist conversion.
create function public.decide_application(
  p_application_id uuid,
  p_decision text,
  p_cohort_id uuid default null,
  p_note text default null
)
returns public.cohort_applications
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_app public.cohort_applications;
begin
  if not private.is_admin() then
    raise exception 'Only admins decide applications' using errcode = '42501';
  end if;
  if p_decision is null or p_decision not in ('accepted', 'waitlisted', 'declined') then
    raise exception 'Unknown decision %', p_decision using errcode = '22023';
  end if;

  select * into v_app from public.cohort_applications where id = p_application_id for update;
  if v_app.id is null then
    raise exception 'Application not found' using errcode = 'P0002';
  end if;
  if v_app.status not in ('submitted', 'waitlisted') then
    raise exception 'This application was already %', v_app.status using errcode = '22023';
  end if;

  if p_decision = 'accepted' then
    if p_cohort_id is null then
      raise exception 'Choose a cohort to accept into' using errcode = '22023';
    end if;
    if exists (
      select 1 from public.cohort_members m join public.cohorts c on c.id = m.cohort_id
      where m.profile_id = v_app.profile_id and m.role = 'learner' and m.status = 'active'
        and c.program_id = v_app.program_id
    ) then
      raise exception 'Already an active learner in this programme' using errcode = '23505';
    end if;
    perform private.claim_cohort_seat(p_cohort_id, v_app.program_id);
    insert into public.cohort_members (cohort_id, profile_id, role, specialization)
    values (p_cohort_id, v_app.profile_id, 'learner', v_app.specialization);
  end if;

  update public.cohort_applications
     set status = p_decision,
         cohort_id = case when p_decision = 'accepted' then p_cohort_id end,
         decision_note = p_note,
         decided_by = (select auth.uid()),
         decided_at = now()
   where id = p_application_id
  returning * into v_app;

  return v_app;
end;
$$;

revoke execute on function public.decide_application(uuid, text, uuid, text) from public, anon;
grant execute on function public.decide_application(uuid, text, uuid, text) to authenticated, service_role;

-- The applicant withdraws an open application.
create function public.withdraw_application(p_application_id uuid)
returns public.cohort_applications
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_app public.cohort_applications;
begin
  update public.cohort_applications
     set status = 'withdrawn'
   where id = p_application_id
     and profile_id = (select auth.uid())
     and status in ('submitted', 'waitlisted')
  returning * into v_app;
  if v_app.id is null then
    raise exception 'No open application of yours with that id' using errcode = 'P0002';
  end if;
  return v_app;
end;
$$;

revoke execute on function public.withdraw_application(uuid) from public, anon;
grant execute on function public.withdraw_application(uuid) to authenticated, service_role;

-- A learner chooses their specialization; cohort staff or an admin may set
-- it for them. A learner cannot switch once they have submitted work for a
-- specialization week (staff and admins still can).
create function public.choose_specialization(p_cohort_member_id uuid, p_specialization text)
returns public.cohort_members
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_member public.cohort_members;
  v_is_staff boolean;
begin
  select * into v_member from public.cohort_members where id = p_cohort_member_id;
  if v_member.id is null or v_member.role <> 'learner' then
    raise exception 'Learner membership not found' using errcode = 'P0002';
  end if;

  v_is_staff := private.is_cohort_staff(v_member.cohort_id) or private.is_admin();
  if not v_is_staff then
    if v_member.profile_id is distinct from v_uid then
      raise exception 'Not your membership' using errcode = '42501';
    end if;
    if v_member.status <> 'active' then
      raise exception 'Only active learners choose a specialization' using errcode = '42501';
    end if;
    if v_member.specialization is distinct from p_specialization and exists (
      select 1 from public.submissions s
      join public.program_weeks w on w.id = s.program_week_id
      where s.profile_id = v_uid and w.specialization is not null and s.status <> 'draft'
        and w.program_id = (select program_id from public.cohorts where id = v_member.cohort_id)
    ) then
      raise exception 'Specialization is locked once specialization work is submitted; ask your mentor' using errcode = '42501';
    end if;
  end if;

  update public.cohort_members set specialization = p_specialization
   where id = p_cohort_member_id
  returning * into v_member;
  return v_member;
end;
$$;

revoke execute on function public.choose_specialization(uuid, text) from public, anon;
grant execute on function public.choose_specialization(uuid, text) to authenticated, service_role;

-- Defer a learner to a later cohort of the same programme (founder rule:
-- falling behind past the grace period defers, progress kept). Submissions
-- are keyed on the learner and programme week, not the cohort, so the new
-- cohort sees all earlier work. Called by staff of the learner's cohort or
-- an admin. With no target the learner is marked deferred and waits; call
-- again with a target to place them. Returns the new membership when
-- placed, otherwise the deferred one.
create function public.defer_learner(p_cohort_member_id uuid, p_to_cohort_id uuid default null)
returns public.cohort_members
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_member public.cohort_members;
  v_from public.cohorts;
  v_to public.cohorts;
  v_new public.cohort_members;
begin
  select * into v_member from public.cohort_members where id = p_cohort_member_id for update;
  if v_member.id is null or v_member.role <> 'learner' then
    raise exception 'Learner membership not found' using errcode = 'P0002';
  end if;
  if not (private.is_cohort_staff(v_member.cohort_id) or private.is_admin()) then
    raise exception 'Only cohort staff or admins defer learners' using errcode = '42501';
  end if;
  if not (v_member.status = 'active' or (v_member.status = 'deferred' and v_member.deferred_to is null)) then
    raise exception 'This learner is already %', v_member.status using errcode = '22023';
  end if;

  select * into v_from from public.cohorts where id = v_member.cohort_id;

  if p_to_cohort_id is not null then
    select * into v_to from public.cohorts where id = p_to_cohort_id;
    if v_to.id is null or v_to.program_id <> v_from.program_id then
      raise exception 'That cohort is not part of this programme' using errcode = '22023';
    end if;
    if v_to.starts_on <= v_from.starts_on then
      raise exception 'Defer to a cohort that starts later' using errcode = '22023';
    end if;
    perform private.claim_cohort_seat(v_to.id, v_to.program_id);
    insert into public.cohort_members (cohort_id, profile_id, role, specialization)
    values (v_to.id, v_member.profile_id, 'learner', v_member.specialization)
    returning * into v_new;
  end if;

  update public.cohort_members
     set status = 'deferred',
         deferred_to = p_to_cohort_id,
         deferred_at = coalesce(deferred_at, now())
   where id = p_cohort_member_id
  returning * into v_member;

  if p_to_cohort_id is not null then
    return v_new;
  end if;
  return v_member;
end;
$$;

revoke execute on function public.defer_learner(uuid, uuid) from public, anon;
grant execute on function public.defer_learner(uuid, uuid) to authenticated, service_role;
