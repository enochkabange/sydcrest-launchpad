-- Schema B (issue #158), part 4: the skill catalogue and verified skills.
--
-- Founder decision (Product Enrichment §7.5): the verified SydCrest badge is
-- earned, never bought, in one of these ways:
--   1. path_completion: finishing a roadmap mapped to the skill, meaning the
--      roadmap_completed achievement (every required topic quiz verified);
--   2. assessment: passing the skill's quiz assessment (graded server side
--      against a key nobody else can read, with a retry wait after a fail);
--   3. portfolio_review: a mentor or admin approving submitted work, so an
--      outside expert who already has the skill need not redo a course.
-- No signed in role can write verified_skills. Every row comes from
-- private.issue_verified_skill, called by the functions and trigger below.
-- Verified skills feed public profiles, expert pages and the talent
-- directory (private.has_verified_skill), and never involve payment.

-- skills ----------------------------------------------------------------------

create table public.skills (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{0,48}[a-z0-9]$'),
  name         text not null check (char_length(name) between 1 and 80),
  summary      text check (char_length(summary) <= 1000),
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.skills is
  'The skill catalogue. Anyone reads published skills; admins write.';

alter table public.skills enable row level security;

create trigger skills_set_updated_at
  before update on public.skills
  for each row execute function private.set_updated_at();

create function private.skill_is_published(p_skill_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.skills where id = p_skill_id and is_published);
$$;

revoke execute on function private.skill_is_published(uuid) from public;
grant execute on function private.skill_is_published(uuid) to anon, authenticated, service_role;

create policy "Published skills are public; admins see all"
  on public.skills for select
  to anon, authenticated
  using (is_published or (select private.is_admin()));
create policy "Admins insert skills"
  on public.skills for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update skills"
  on public.skills for update to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete skills"
  on public.skills for delete to authenticated using ((select private.is_admin()));

revoke all on public.skills from anon, authenticated;
grant select on public.skills to anon, authenticated;
grant insert, update, delete on public.skills to authenticated;
grant select, insert, update, delete on public.skills to service_role;

-- skill_roadmaps --------------------------------------------------------------

-- By roadmaps.slug (as program_week_nodes does), so mappings survive
-- re imports of roadmap content.
create table public.skill_roadmaps (
  skill_id     uuid not null references public.skills (id) on delete cascade,
  roadmap_slug text not null check (roadmap_slug ~ '^[a-z0-9][a-z0-9-]{0,78}[a-z0-9]$'),
  created_at   timestamptz not null default now(),
  primary key (skill_id, roadmap_slug)
);

comment on table public.skill_roadmaps is
  'Roadmaps (by slug) whose completion verifies the skill. A roadmap can map to several skills.';

create index skill_roadmaps_roadmap_idx on public.skill_roadmaps (roadmap_slug);

alter table public.skill_roadmaps enable row level security;

create policy "Mappings of published skills are public; admins see all"
  on public.skill_roadmaps for select
  to anon, authenticated
  using (private.skill_is_published(skill_id) or (select private.is_admin()));
create policy "Admins insert mappings"
  on public.skill_roadmaps for insert to authenticated with check ((select private.is_admin()));
create policy "Admins delete mappings"
  on public.skill_roadmaps for delete to authenticated using ((select private.is_admin()));

revoke all on public.skill_roadmaps from anon, authenticated;
grant select on public.skill_roadmaps to anon, authenticated;
grant insert (skill_id, roadmap_slug), delete on public.skill_roadmaps to authenticated;
grant select, insert, update, delete on public.skill_roadmaps to service_role;

-- skill_assessments -----------------------------------------------------------

create table public.skill_assessments (
  id                uuid primary key default gen_random_uuid(),
  skill_id          uuid not null references public.skills (id) on delete cascade,
  kind              text not null check (kind in ('quiz', 'portfolio')),
  title             text not null check (char_length(title) between 1 and 120),
  instructions      text check (char_length(instructions) <= 4000),
  questions         jsonb not null default '[]' check (jsonb_typeof(questions) = 'array'),
  pass_threshold    smallint not null default 80 check (pass_threshold between 1 and 100),
  retry_after_hours smallint not null default 24 check (retry_after_hours between 0 and 720),
  is_published      boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint skill_assessments_quiz_has_questions
    check (kind = 'portfolio' or not is_published or jsonb_array_length(questions) > 0)
);

comment on table public.skill_assessments is
  'How to earn a skill without the path: a quiz (questions here, key in skill_assessment_answers) or a portfolio reviewed by a mentor or admin.';
comment on column public.skill_assessments.questions is
  'Quiz only: [{"id":"q1","prompt":"...","options":["...","..."]}]. No answers here.';
comment on column public.skill_assessments.retry_after_hours is
  'Wait after a failed quiz or rejected portfolio before trying again.';

create index skill_assessments_skill_idx on public.skill_assessments (skill_id);

alter table public.skill_assessments enable row level security;

create trigger skill_assessments_set_updated_at
  before update on public.skill_assessments
  for each row execute function private.set_updated_at();

create policy "Published assessments of published skills are public; admins see all"
  on public.skill_assessments for select
  to anon, authenticated
  using ((is_published and private.skill_is_published(skill_id)) or (select private.is_admin()));
create policy "Admins insert assessments"
  on public.skill_assessments for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update assessments"
  on public.skill_assessments for update to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete assessments"
  on public.skill_assessments for delete to authenticated using ((select private.is_admin()));

revoke all on public.skill_assessments from anon, authenticated;
grant select on public.skill_assessments to anon, authenticated;
grant insert, update, delete on public.skill_assessments to authenticated;
grant select, insert, update, delete on public.skill_assessments to service_role;

-- Answer keys in their own table, as node_quiz_answers: admins only.
create table public.skill_assessment_answers (
  assessment_id uuid primary key references public.skill_assessments (id) on delete cascade,
  answer_key    jsonb not null check (jsonb_typeof(answer_key) = 'object'),
  updated_at    timestamptz not null default now()
);

comment on table public.skill_assessment_answers is
  'Quiz answer keys {"q1": 2}. Admins only; submit_skill_quiz grades as definer.';

alter table public.skill_assessment_answers enable row level security;

create trigger skill_assessment_answers_set_updated_at
  before update on public.skill_assessment_answers
  for each row execute function private.set_updated_at();

create policy "Admins read answer keys"
  on public.skill_assessment_answers for select to authenticated using ((select private.is_admin()));
create policy "Admins insert answer keys"
  on public.skill_assessment_answers for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update answer keys"
  on public.skill_assessment_answers for update to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete answer keys"
  on public.skill_assessment_answers for delete to authenticated using ((select private.is_admin()));

revoke all on public.skill_assessment_answers from anon, authenticated;
grant select, insert, update, delete on public.skill_assessment_answers to authenticated;
grant select, insert, update, delete on public.skill_assessment_answers to service_role;

-- skill_assessment_attempts ---------------------------------------------------

-- Mentors and admins review portfolios.
create function private.is_skill_reviewer()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role in ('mentor', 'admin')
  );
$$;

revoke execute on function private.is_skill_reviewer() from public;
grant execute on function private.is_skill_reviewer() to authenticated, service_role;

create table public.skill_assessment_attempts (
  id             uuid primary key default gen_random_uuid(),
  assessment_id  uuid not null references public.skill_assessments (id) on delete cascade,
  skill_id       uuid not null references public.skills (id) on delete cascade,
  profile_id     uuid not null references public.profiles (id) on delete cascade,
  kind           text not null check (kind in ('quiz', 'portfolio')),
  status         text not null check (status in ('passed', 'failed', 'pending_review', 'approved', 'rejected')),
  answers        jsonb check (answers is null or jsonb_typeof(answers) = 'object'),
  score          smallint check (score between 0 and 100),
  portfolio_url  text check (char_length(portfolio_url) <= 500 and portfolio_url ~ '^https://'),
  portfolio_note text check (char_length(portfolio_note) <= 2000),
  reviewer_id    uuid references public.profiles (id) on delete set null,
  review_note    text check (char_length(review_note) <= 2000),
  reviewed_at    timestamptz,
  submitted_at   timestamptz not null default now(),
  constraint skill_attempts_kind_status check (
    (kind = 'quiz' and status in ('passed', 'failed') and score is not null)
    or (kind = 'portfolio' and status in ('pending_review', 'approved', 'rejected') and portfolio_url is not null)
  ),
  constraint skill_attempts_reviewed check ((status in ('approved', 'rejected')) = (reviewed_at is not null))
);

comment on table public.skill_assessment_attempts is
  'Quiz attempts and portfolio submissions. Written only by submit_skill_quiz, submit_skill_portfolio and review_skill_portfolio.';

create index skill_attempts_profile_idx on public.skill_assessment_attempts (profile_id, assessment_id, submitted_at desc);
create index skill_attempts_pending_idx on public.skill_assessment_attempts (submitted_at) where status = 'pending_review';

alter table public.skill_assessment_attempts enable row level security;

create policy "Owners read attempts; reviewers read portfolios"
  on public.skill_assessment_attempts for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or (select private.is_admin())
    or (kind = 'portfolio' and (select private.is_skill_reviewer()))
  );

revoke all on public.skill_assessment_attempts from anon, authenticated;
grant select on public.skill_assessment_attempts to authenticated;
grant select, insert, update, delete on public.skill_assessment_attempts to service_role;

-- verified_skills -------------------------------------------------------------

create table public.verified_skills (
  id                uuid primary key default gen_random_uuid(),
  profile_id        uuid not null references public.profiles (id) on delete cascade,
  skill_id          uuid not null references public.skills (id) on delete cascade,
  source            text not null check (source in ('path_completion', 'assessment', 'portfolio_review')),
  source_ref        text check (char_length(source_ref) <= 100),
  issued_by         uuid references public.profiles (id) on delete set null,
  issued_at         timestamptz not null default now(),
  revoked_at        timestamptz,
  revoked_by        uuid references public.profiles (id) on delete set null,
  revocation_reason text check (char_length(revocation_reason) <= 500),
  constraint verified_skills_revocation check ((revoked_at is null) = (revocation_reason is null))
);

comment on table public.verified_skills is
  'Earned, never bought: path completion, a passed assessment or an approved portfolio. Issued only by private.issue_verified_skill.';
comment on column public.verified_skills.source_ref is
  'Evidence: the roadmap slug (path_completion) or the attempt id (assessment, portfolio_review).';
comment on column public.verified_skills.issued_by is
  'The reviewer for portfolio_review; null when the database issued it.';

-- One live badge per person per skill.
create unique index verified_skills_live_idx on public.verified_skills (profile_id, skill_id)
  where revoked_at is null;
create index verified_skills_skill_idx on public.verified_skills (skill_id) where revoked_at is null;

alter table public.verified_skills enable row level security;

create policy "Owners, public profiles' live skills, and admins"
  on public.verified_skills for select
  to anon, authenticated
  using (
    profile_id = (select auth.uid())
    or (revoked_at is null and private.is_public_profile(profile_id))
    or (select private.is_admin())
  );

revoke all on public.verified_skills from anon, authenticated;
grant select on public.verified_skills to anon, authenticated;
grant select, insert, update, delete on public.verified_skills to service_role;

-- The single issuer. Idempotent: a live badge for the skill means no op.
-- Returns the new row id, or null when nothing was issued.
create function private.issue_verified_skill(
  p_profile_id uuid,
  p_skill_id   uuid,
  p_source     text,
  p_source_ref text default null,
  p_issued_by  uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id    uuid;
  v_skill public.skills%rowtype;
begin
  select * into v_skill from public.skills where id = p_skill_id;
  if not found or not v_skill.is_published then
    return null;
  end if;
  insert into public.verified_skills (profile_id, skill_id, source, source_ref, issued_by)
  values (p_profile_id, p_skill_id, p_source, p_source_ref, p_issued_by)
  on conflict (profile_id, skill_id) where revoked_at is null do nothing
  returning id into v_id;
  if v_id is not null then
    perform private.notify(p_profile_id, 'verified_skill',
      jsonb_build_object('verified_skill_id', v_id, 'skill_id', v_skill.id,
                         'skill_slug', v_skill.slug, 'skill_name', v_skill.name, 'source', p_source));
  end if;
  return v_id;
end;
$$;

revoke execute on function private.issue_verified_skill(uuid, uuid, text, text, uuid) from public, anon, authenticated;
grant execute on function private.issue_verified_skill(uuid, uuid, text, text, uuid) to service_role;

-- True when the person holds at least one live verified skill. The talent
-- directory and expert ranking read this.
create function private.has_verified_skill(p_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.verified_skills v
    join public.skills s on s.id = v.skill_id and s.is_published
    where v.profile_id = p_profile_id and v.revoked_at is null
  );
$$;

revoke execute on function private.has_verified_skill(uuid) from public;
grant execute on function private.has_verified_skill(uuid) to anon, authenticated, service_role;

-- Path completion -------------------------------------------------------------

-- Issue every published skill mapped to the roadmap the person completed.
create function private.issue_path_skills(p_profile_id uuid, p_roadmap_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer := 0;
  v_slug  text;
  v_skill uuid;
begin
  select slug into v_slug from public.roadmaps where id = p_roadmap_id;
  if v_slug is null then
    return 0;
  end if;
  for v_skill in
    select sr.skill_id from public.skill_roadmaps sr where sr.roadmap_slug = v_slug
  loop
    if private.issue_verified_skill(p_profile_id, v_skill, 'path_completion', v_slug) is not null then
      v_count := v_count + 1;
    end if;
  end loop;
  return v_count;
end;
$$;

revoke execute on function private.issue_path_skills(uuid, uuid) from public, anon, authenticated;

-- roadmap_completed is minted only when every required topic is quiz
-- verified (verified completions, #128), so it is the path evidence.
create function private.after_roadmap_completed()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.type = 'roadmap_completed' and new.ref_id ~ '^[0-9a-f-]{36}$' then
    perform private.issue_path_skills(new.profile_id, new.ref_id::uuid);
  end if;
  return new;
end;
$$;

revoke execute on function private.after_roadmap_completed() from public, anon, authenticated;

create trigger achievements_issue_path_skills
  after insert on public.achievements
  for each row execute function private.after_roadmap_completed();

-- For skills mapped after the caller finished a roadmap: check every
-- roadmap_completed achievement again. Returns how many were issued.
create function public.claim_path_skills()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid   uuid := (select auth.uid());
  v_count integer := 0;
  v_ref   text;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  for v_ref in
    select a.ref_id from public.achievements a
    where a.profile_id = v_uid and a.type = 'roadmap_completed' and a.ref_id ~ '^[0-9a-f-]{36}$'
  loop
    v_count := v_count + private.issue_path_skills(v_uid, v_ref::uuid);
  end loop;
  return v_count;
end;
$$;

revoke execute on function public.claim_path_skills() from public, anon;
grant execute on function public.claim_path_skills() to authenticated, service_role;

-- Assessments -----------------------------------------------------------------

-- Refuses a new attempt while one is pending or within the retry wait after
-- a fail or a rejection.
create function private.check_skill_retry(p_profile_id uuid, p_assessment public.skill_assessments)
returns void
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_last public.skill_assessment_attempts%rowtype;
begin
  select * into v_last from public.skill_assessment_attempts
  where profile_id = p_profile_id and assessment_id = p_assessment.id
  order by submitted_at desc
  limit 1;
  if not found then
    return;
  end if;
  if v_last.status = 'pending_review' then
    raise exception 'Your portfolio is waiting for review' using errcode = '22023';
  end if;
  if v_last.status in ('failed', 'rejected')
     and coalesce(v_last.reviewed_at, v_last.submitted_at)
         + make_interval(hours => p_assessment.retry_after_hours) > now() then
    raise exception 'Try again later' using errcode = '22023';
  end if;
end;
$$;

revoke execute on function private.check_skill_retry(uuid, public.skill_assessments) from public, anon, authenticated;

-- Grade a quiz assessment against the hidden key. Returns the score and
-- whether it passed (not which answers were right: this is an exam, not a
-- learning check). A pass issues the verified skill.
create function public.submit_skill_quiz(p_assessment_id uuid, p_answers jsonb)
returns table (score smallint, passed boolean, verified_skill_id uuid)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid        uuid := (select auth.uid());
  v_assessment public.skill_assessments%rowtype;
  v_key        jsonb;
  v_total      integer := 0;
  v_correct    integer := 0;
  v_qid        text;
  v_attempt    uuid;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'object' then
    raise exception 'Answers must be an object of question id to option' using errcode = '22023';
  end if;
  select * into v_assessment from public.skill_assessments
  where id = p_assessment_id and kind = 'quiz' and is_published;
  if not found or not private.skill_is_published(v_assessment.skill_id) then
    raise exception 'Assessment not found' using errcode = 'P0002';
  end if;
  select answer_key into v_key from public.skill_assessment_answers where assessment_id = p_assessment_id;
  if v_key is null or v_key = '{}'::jsonb then
    raise exception 'This assessment has no answer key' using errcode = 'P0002';
  end if;
  -- Serialise attempts per person so the retry wait cannot be raced.
  perform pg_advisory_xact_lock(hashtextextended(v_uid::text || p_assessment_id::text, 0));
  perform private.check_skill_retry(v_uid, v_assessment);

  for v_qid in select jsonb_object_keys(v_key) loop
    v_total := v_total + 1;
    if (p_answers -> v_qid) = (v_key -> v_qid) then
      v_correct := v_correct + 1;
    end if;
  end loop;

  score := round(100.0 * v_correct / v_total)::smallint;
  passed := score >= v_assessment.pass_threshold;

  insert into public.skill_assessment_attempts (assessment_id, skill_id, profile_id, kind, status, answers, score)
  values (p_assessment_id, v_assessment.skill_id, v_uid, 'quiz',
          case when passed then 'passed' else 'failed' end, p_answers, score)
  returning id into v_attempt;

  verified_skill_id := case when passed then
    private.issue_verified_skill(v_uid, v_assessment.skill_id, 'assessment', v_attempt::text)
  end;
  return next;
end;
$$;

revoke execute on function public.submit_skill_quiz(uuid, jsonb) from public, anon;
grant execute on function public.submit_skill_quiz(uuid, jsonb) to authenticated, service_role;

-- Send work for a portfolio assessment. Returns the attempt id.
create function public.submit_skill_portfolio(p_assessment_id uuid, p_portfolio_url text, p_note text default null)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid        uuid := (select auth.uid());
  v_assessment public.skill_assessments%rowtype;
  v_id         uuid;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  select * into v_assessment from public.skill_assessments
  where id = p_assessment_id and kind = 'portfolio' and is_published;
  if not found or not private.skill_is_published(v_assessment.skill_id) then
    raise exception 'Assessment not found' using errcode = 'P0002';
  end if;
  if p_portfolio_url is null or p_portfolio_url !~ '^https://' then
    raise exception 'Share a https link to your work' using errcode = '22023';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(v_uid::text || p_assessment_id::text, 0));
  perform private.check_skill_retry(v_uid, v_assessment);

  insert into public.skill_assessment_attempts
    (assessment_id, skill_id, profile_id, kind, status, portfolio_url, portfolio_note)
  values (p_assessment_id, v_assessment.skill_id, v_uid, 'portfolio', 'pending_review',
          trim(p_portfolio_url), nullif(trim(p_note), ''))
  returning id into v_id;
  return v_id;
end;
$$;

revoke execute on function public.submit_skill_portfolio(uuid, text, text) from public, anon;
grant execute on function public.submit_skill_portfolio(uuid, text, text) to authenticated, service_role;

-- A mentor or admin approves or rejects a pending portfolio (never their
-- own). Approval issues the verified skill; either way the person is told.
create function public.review_skill_portfolio(p_attempt_id uuid, p_approve boolean, p_note text default null)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid     uuid := (select auth.uid());
  v_attempt public.skill_assessment_attempts%rowtype;
  v_skill   public.skills%rowtype;
  v_issued  uuid;
begin
  if not private.is_skill_reviewer() then
    raise exception 'Mentors and admins only' using errcode = '42501';
  end if;
  select * into v_attempt from public.skill_assessment_attempts
  where id = p_attempt_id and kind = 'portfolio'
  for update;
  if not found then
    raise exception 'Submission not found' using errcode = 'P0002';
  end if;
  if v_attempt.profile_id = v_uid then
    raise exception 'You cannot review your own work' using errcode = '42501';
  end if;
  if v_attempt.status <> 'pending_review' then
    raise exception 'Already reviewed' using errcode = '22023';
  end if;
  if not p_approve and nullif(trim(p_note), '') is null then
    raise exception 'Say what to improve' using errcode = '22023';
  end if;

  update public.skill_assessment_attempts
     set status = case when p_approve then 'approved' else 'rejected' end,
         reviewer_id = v_uid,
         review_note = nullif(trim(p_note), ''),
         reviewed_at = now()
   where id = p_attempt_id;

  if p_approve then
    v_issued := private.issue_verified_skill(v_attempt.profile_id, v_attempt.skill_id,
                                             'portfolio_review', v_attempt.id::text, v_uid);
  end if;
  select * into v_skill from public.skills where id = v_attempt.skill_id;
  perform private.notify(v_attempt.profile_id, 'skill_review',
    jsonb_build_object('attempt_id', v_attempt.id, 'skill_id', v_skill.id, 'skill_slug', v_skill.slug,
                       'skill_name', v_skill.name, 'approved', p_approve));
  return v_issued;
end;
$$;

revoke execute on function public.review_skill_portfolio(uuid, boolean, text) from public, anon;
grant execute on function public.review_skill_portfolio(uuid, boolean, text) to authenticated, service_role;

-- Admins withdraw a badge (misconduct, a mistaken approval). Reason required.
create function public.revoke_verified_skill(p_verified_skill_id uuid, p_reason text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if nullif(trim(p_reason), '') is null then
    raise exception 'Give a reason' using errcode = '22023';
  end if;
  update public.verified_skills
     set revoked_at = now(), revoked_by = (select auth.uid()), revocation_reason = trim(p_reason)
   where id = p_verified_skill_id and revoked_at is null;
  if not found then
    raise exception 'Verified skill not found' using errcode = 'P0002';
  end if;
end;
$$;

revoke execute on function public.revoke_verified_skill(uuid, text) from public, anon;
grant execute on function public.revoke_verified_skill(uuid, text) to authenticated, service_role;

-- portfolio_review_queue (view) -----------------------------------------------

-- Pending and reviewed portfolios with the person's name, for mentors and
-- admins. Profiles are owner only, so names come through here.
create function private.portfolio_review_rows()
returns table (
  attempt_id     uuid,
  assessment_id  uuid,
  skill_id       uuid,
  skill_name     text,
  profile_id     uuid,
  display_name   text,
  avatar_url     text,
  public_slug    text,
  status         text,
  portfolio_url  text,
  portfolio_note text,
  reviewer_id    uuid,
  review_note    text,
  reviewed_at    timestamptz,
  submitted_at   timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, a.assessment_id, a.skill_id, s.name, a.profile_id, p.display_name, p.avatar_url,
         case when p.is_public then p.public_slug end,
         a.status, a.portfolio_url, a.portfolio_note, a.reviewer_id, a.review_note,
         a.reviewed_at, a.submitted_at
  from public.skill_assessment_attempts a
  join public.skills s on s.id = a.skill_id
  join public.profiles p on p.id = a.profile_id
  where a.kind = 'portfolio' and private.is_skill_reviewer();
$$;

revoke execute on function private.portfolio_review_rows() from public;
grant execute on function private.portfolio_review_rows() to authenticated, service_role;

create view public.portfolio_review_queue
  with (security_invoker = true)
as
  select * from private.portfolio_review_rows();

comment on view public.portfolio_review_queue is
  'Portfolio submissions with the person''s name, for mentors and admins (others get zero rows). Never phone or email.';

revoke all on public.portfolio_review_queue from anon, authenticated;
grant select on public.portfolio_review_queue to authenticated, service_role;
