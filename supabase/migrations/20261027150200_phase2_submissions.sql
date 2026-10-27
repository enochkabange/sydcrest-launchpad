-- Phase 2, part 3: assignment submissions, peer review, submission files.
--
-- A submission is one learner's work for one programme week (text, a link
-- or a file in the private `submissions` bucket). It is keyed on the learner
-- and the week, not the cohort, so a deferred learner keeps their work in
-- the next cohort; cohort_id records where it was submitted.
--
-- Scoring is server only. Learners write their work through
-- save_submission and may only toggle in_portfolio directly. AI feedback is
-- written by server code with the secret key (record_ai_review). Mentors,
-- coordinators and admins set the final score through grade_submission.
-- Nobody signed in has an insert or update grant on the score columns.
--
-- Peer reviewers never read submissions directly: column grants are per
-- role, so a row policy would also hand them the AI and mentor scores. They
-- read the work they were assigned through the peer_review_submissions view,
-- which carries the work and nothing else.

-- submissions -------------------------------------------------------------------

create table public.submissions (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid not null references public.profiles (id) on delete cascade,
  program_id      uuid not null references public.programs (id) on delete restrict,
  program_week_id uuid not null,
  cohort_id       uuid not null references public.cohorts (id) on delete restrict,
  status          text not null default 'draft'
                    check (status in ('draft', 'submitted', 'ai_reviewed', 'returned', 'graded')),
  attempt         smallint not null default 1 check (attempt between 1 and 100),
  body_text       text check (char_length(body_text) <= 20000),
  link_url        text check (link_url ~ '^https?://' and char_length(link_url) <= 2000),
  -- Object name in the submissions bucket; the first folder is always the
  -- owner, so a learner cannot attach (and expose to their mentor or peer)
  -- somebody else's file.
  file_path       text check (char_length(file_path) <= 500),
  ai_feedback     jsonb check (ai_feedback is null or jsonb_typeof(ai_feedback) = 'object'),
  ai_score        smallint check (ai_score between 0 and 100),
  ai_model        text,
  ai_reviewed_at  timestamptz,
  mentor_feedback text check (char_length(mentor_feedback) <= 8000),
  final_score     smallint check (final_score between 0 and 100),
  graded_by       uuid references public.profiles (id) on delete set null,
  graded_at       timestamptz,
  in_portfolio    boolean not null default false,
  submitted_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  foreign key (program_id, program_week_id)
    references public.program_weeks (program_id, id) on delete restrict,
  constraint submissions_once unique (profile_id, program_week_id),
  constraint submissions_file_is_owners check (file_path is null or split_part(file_path, '/', 1) = profile_id::text),
  constraint submissions_graded_has_score check ((status = 'graded') = (final_score is not null and graded_at is not null)),
  constraint submissions_portfolio_needs_grade check (not in_portfolio or status = 'graded'),
  constraint submissions_sent_has_content check (
    status = 'draft'
    or (submitted_at is not null and (body_text is not null or link_url is not null or file_path is not null))
  )
);

comment on table public.submissions is
  'One learner''s work for one programme week. Status: draft, submitted, ai_reviewed, returned (mentor asked for changes), graded (final_score set).';
comment on column public.submissions.file_path is
  'Object name in the private submissions bucket: <profile_id>/<anything>. Read it with a signed URL.';
comment on column public.submissions.ai_feedback is
  'AI rubric review, written by record_ai_review (service role only). Shape is the AI route''s, e.g. {"summary","criteria":[{"id","points","comment"}]}.';
comment on column public.submissions.final_score is
  'Mentor''s final score 0 to 100; a week passes at programs.pass_score. Set by grade_submission only.';
comment on column public.submissions.in_portfolio is
  'The learner''s choice to show graded work on their portfolio. The only column a learner updates directly.';

create index submissions_program_idx on public.submissions (program_id, status);
create index submissions_week_idx on public.submissions (program_week_id);
create index submissions_cohort_idx on public.submissions (cohort_id, status);
create index submissions_file_idx on public.submissions (file_path) where file_path is not null;
create index submissions_graded_by_idx on public.submissions (graded_by);

alter table public.submissions enable row level security;

create trigger submissions_set_updated_at
  before update on public.submissions
  for each row execute function private.set_updated_at();

create policy "Learners read their own submissions"
  on public.submissions for select
  to authenticated
  using (profile_id = (select auth.uid()));

create policy "Cohort staff and admins read sent submissions"
  on public.submissions for select
  to authenticated
  using (
    status <> 'draft'
    and (private.is_staff_for_learner(profile_id, program_id) or private.is_admin())
  );

create policy "Learners choose which graded work is in their portfolio"
  on public.submissions for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

revoke all on public.submissions from anon, authenticated;
grant select on public.submissions to authenticated;
grant update (in_portfolio) on public.submissions to authenticated;
grant select, insert, update, delete on public.submissions to service_role;

-- peer_reviews ------------------------------------------------------------------

create table public.peer_reviews (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  reviewer_id   uuid not null references public.profiles (id) on delete cascade,
  assigned_by   uuid references public.profiles (id) on delete set null,
  status        text not null default 'assigned' check (status in ('assigned', 'submitted')),
  rubric_scores jsonb not null default '{}' check (jsonb_typeof(rubric_scores) = 'object'),
  comment       text check (char_length(comment) <= 4000),
  assigned_at   timestamptz not null default now(),
  submitted_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint peer_reviews_once unique (submission_id, reviewer_id),
  check ((status = 'submitted') = (submitted_at is not null))
);

comment on table public.peer_reviews is
  'A peer review assignment and, once submitted, rubric scores {"<criterion id>": points} and a comment. Written only by assign_peer_review and submit_peer_review.';

create index peer_reviews_reviewer_idx on public.peer_reviews (reviewer_id, status);
create index peer_reviews_assigned_by_idx on public.peer_reviews (assigned_by);

alter table public.peer_reviews enable row level security;

create trigger peer_reviews_set_updated_at
  before update on public.peer_reviews
  for each row execute function private.set_updated_at();

-- Who may see a submission: owner; cohort staff and admins once sent; an
-- assigned peer once sent. Definer so storage and peer review policies can
-- ask without the caller holding a select grant on submissions rows.
create function private.can_read_submission(p_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.submissions s
    where s.id = p_submission_id
      and (
        s.profile_id = (select auth.uid())
        or (s.status <> 'draft' and (
              private.is_staff_for_learner(s.profile_id, s.program_id)
              or private.is_admin()
              or exists (select 1 from public.peer_reviews pr
                         where pr.submission_id = s.id and pr.reviewer_id = (select auth.uid()))
           ))
      )
  );
$$;

revoke execute on function private.can_read_submission(uuid) from public;
grant execute on function private.can_read_submission(uuid) to authenticated, service_role;

create function private.owns_submission(p_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.submissions
    where id = p_submission_id and profile_id = (select auth.uid())
  );
$$;

revoke execute on function private.owns_submission(uuid) from public;
grant execute on function private.owns_submission(uuid) to authenticated, service_role;

create function private.is_staff_for_submission(p_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.submissions s
    where s.id = p_submission_id
      and private.is_staff_for_learner(s.profile_id, s.program_id)
  );
$$;

revoke execute on function private.is_staff_for_submission(uuid) from public;
grant execute on function private.is_staff_for_submission(uuid) to authenticated, service_role;

create policy "Reviewers, authors (once submitted), cohort staff and admins read peer reviews"
  on public.peer_reviews for select
  to authenticated
  using (
    reviewer_id = (select auth.uid())
    or (status = 'submitted' and private.owns_submission(submission_id))
    or private.is_staff_for_submission(submission_id)
    or private.is_admin()
  );

revoke all on public.peer_reviews from anon, authenticated;
grant select on public.peer_reviews to authenticated;
grant select, insert, update, delete on public.peer_reviews to service_role;

-- peer_review_submissions (view) ------------------------------------------------

-- The caller's peer review assignments with the work to review: no author,
-- no AI feedback, no scores.
create function private.peer_review_submission_rows()
returns table (
  review_id       uuid,
  review_status   text,
  rubric_scores   jsonb,
  comment         text,
  assigned_at     timestamptz,
  submission_id   uuid,
  program_id      uuid,
  program_week_id uuid,
  body_text       text,
  link_url        text,
  file_path       text,
  submitted_at    timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select pr.id, pr.status, pr.rubric_scores, pr.comment, pr.assigned_at,
         s.id, s.program_id, s.program_week_id, s.body_text, s.link_url, s.file_path, s.submitted_at
  from public.peer_reviews pr
  join public.submissions s on s.id = pr.submission_id
  where pr.reviewer_id = (select auth.uid())
    and s.status <> 'draft';
$$;

revoke execute on function private.peer_review_submission_rows() from public;
grant execute on function private.peer_review_submission_rows() to authenticated, service_role;

create view public.peer_review_submissions
  with (security_invoker = true)
as
  select * from private.peer_review_submission_rows();

comment on view public.peer_review_submissions is
  'The caller''s peer review assignments with the work only: never the author, AI feedback or scores.';

revoke all on public.peer_review_submissions from anon, authenticated;
grant select on public.peer_review_submissions to authenticated, service_role;

-- Storage: private submissions bucket -------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'submissions', 'submissions', false, 52428800,
  array[
    'application/pdf', 'text/plain', 'image/png', 'image/jpeg', 'image/webp',
    'video/mp4', 'video/quicktime', 'video/webm',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
)
on conflict (id) do nothing;

-- Others reach a file only through a submission they may read whose
-- file_path is that object.
create function private.can_read_submission_file(p_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.submissions s
    where s.file_path = p_name and private.can_read_submission(s.id)
  );
$$;

revoke execute on function private.can_read_submission_file(text) from public;
grant execute on function private.can_read_submission_file(text) to authenticated, service_role;

-- A file attached to work that was sent stays as evidence until the work is
-- a draft again (never) or the learner detaches it by saving a new version.
create function private.submission_file_in_use(p_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.submissions s where s.file_path = p_name and s.status <> 'draft'
  );
$$;

revoke execute on function private.submission_file_in_use(text) from public;
grant execute on function private.submission_file_in_use(text) to authenticated, service_role;

create policy "Learners upload submission files to their own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Owners, cohort staff, admins and assigned peers read submission files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'submissions'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or private.can_read_submission_file(name)
    )
  );

create policy "Learners replace files in their own folder"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and not private.submission_file_in_use(name)
  )
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Learners delete files not attached to sent work"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and not private.submission_file_in_use(name)
  );

-- Functions -------------------------------------------------------------------

-- The learner saves their work for a week. Identity is auth.uid(); the
-- cohort is their active learner membership in the week's programme, and a
-- specialization week must match their specialization. p_submit false keeps
-- a draft (or a returned piece being revised); true sends it for review,
-- clears any earlier AI review and counts a new attempt. Graded work is
-- final unless a mentor returns it.
create function public.save_submission(
  p_program_week_id uuid,
  p_body_text text default null,
  p_link_url text default null,
  p_file_path text default null,
  p_submit boolean default true
)
returns public.submissions
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_week public.program_weeks;
  v_member public.cohort_members;
  v_existing public.submissions;
  v_row public.submissions;
  v_body text := nullif(trim(p_body_text), '');
  v_link text := nullif(trim(p_link_url), '');
  v_file text := nullif(trim(p_file_path), '');
begin
  if v_uid is null then
    raise exception 'Sign in to submit work' using errcode = '42501';
  end if;

  select * into v_week from public.program_weeks where id = p_program_week_id;
  if v_week.id is null then
    raise exception 'Week not found' using errcode = 'P0002';
  end if;

  select m.* into v_member
  from public.cohort_members m join public.cohorts c on c.id = m.cohort_id
  where m.profile_id = v_uid and m.role = 'learner' and m.status = 'active'
    and c.program_id = v_week.program_id
  limit 1;
  if v_member.id is null then
    raise exception 'Only active learners in this programme submit work' using errcode = '42501';
  end if;
  if v_week.specialization is not null and v_member.specialization is distinct from v_week.specialization then
    raise exception 'This week belongs to another specialization' using errcode = '42501';
  end if;

  if v_file is not null and split_part(v_file, '/', 1) <> v_uid::text then
    raise exception 'Files must be in your own folder' using errcode = '42501';
  end if;
  if p_submit and v_body is null and v_link is null and v_file is null then
    raise exception 'Add text, a link or a file before submitting' using errcode = '22023';
  end if;

  select * into v_existing from public.submissions
  where profile_id = v_uid and program_week_id = p_program_week_id
  for update;

  if v_existing.id is null then
    insert into public.submissions (
      profile_id, program_id, program_week_id, cohort_id, status,
      body_text, link_url, file_path, submitted_at
    )
    values (
      v_uid, v_week.program_id, v_week.id, v_member.cohort_id,
      case when p_submit then 'submitted' else 'draft' end,
      v_body, v_link, v_file, case when p_submit then now() end
    )
    returning * into v_row;
    return v_row;
  end if;

  if v_existing.status = 'graded' then
    raise exception 'This work is graded; ask your mentor to return it to change it' using errcode = '42501';
  end if;
  if not p_submit and v_existing.status in ('submitted', 'ai_reviewed') then
    raise exception 'This work is already submitted; submit again to update it' using errcode = '22023';
  end if;

  update public.submissions
     set body_text = v_body,
         link_url = v_link,
         file_path = v_file,
         cohort_id = v_member.cohort_id,
         status = case when p_submit then 'submitted' else status end,
         submitted_at = case when p_submit then now() else submitted_at end,
         attempt = case when p_submit and v_existing.status <> 'draft' then attempt + 1 else attempt end,
         ai_feedback = case when p_submit then null else ai_feedback end,
         ai_score = case when p_submit then null else ai_score end,
         ai_model = case when p_submit then null else ai_model end,
         ai_reviewed_at = case when p_submit then null else ai_reviewed_at end
   where id = v_existing.id
  returning * into v_row;
  return v_row;
end;
$$;

revoke execute on function public.save_submission(uuid, text, text, text, boolean) from public, anon;
grant execute on function public.save_submission(uuid, text, text, text, boolean) to authenticated, service_role;

-- Server code (secret key) stores the AI rubric review. p_attempt is the
-- attempt the review was run on; a review of an older attempt, or of work
-- that was already graded or returned, is ignored and false is returned.
create function public.record_ai_review(
  p_submission_id uuid,
  p_attempt smallint,
  p_feedback jsonb,
  p_score smallint,
  p_model text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  if p_feedback is null or jsonb_typeof(p_feedback) <> 'object' then
    raise exception 'Feedback must be an object' using errcode = '22023';
  end if;
  if p_score is not null and p_score not between 0 and 100 then
    raise exception 'Score must be 0 to 100' using errcode = '22023';
  end if;

  update public.submissions
     set ai_feedback = p_feedback,
         ai_score = p_score,
         ai_model = p_model,
         ai_reviewed_at = now(),
         status = 'ai_reviewed'
   where id = p_submission_id
     and attempt = p_attempt
     and status in ('submitted', 'ai_reviewed')
  returning id into v_id;
  return v_id is not null;
end;
$$;

revoke execute on function public.record_ai_review(uuid, smallint, jsonb, smallint, text) from public, anon, authenticated;
grant execute on function public.record_ai_review(uuid, smallint, jsonb, smallint, text) to service_role;

-- A mentor or coordinator of the learner's cohort (or an admin) grades sent
-- work: sets the final score and feedback, or with p_return asks for
-- changes (no score; the learner revises and submits again).
create function public.grade_submission(
  p_submission_id uuid,
  p_final_score smallint,
  p_mentor_feedback text default null,
  p_return boolean default false
)
returns public.submissions
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_sub public.submissions;
begin
  select * into v_sub from public.submissions where id = p_submission_id for update;
  if v_sub.id is null then
    raise exception 'Submission not found' using errcode = 'P0002';
  end if;
  if not (private.is_staff_for_learner(v_sub.profile_id, v_sub.program_id) or private.is_admin()) then
    raise exception 'Only the learner''s mentors, coordinators or admins grade work' using errcode = '42501';
  end if;
  if v_sub.status = 'draft' then
    raise exception 'This work has not been submitted' using errcode = '22023';
  end if;
  if not p_return and (p_final_score is null or p_final_score not between 0 and 100) then
    raise exception 'Final score must be 0 to 100' using errcode = '22023';
  end if;

  update public.submissions
     set status = case when p_return then 'returned' else 'graded' end,
         final_score = case when p_return then null else p_final_score end,
         mentor_feedback = nullif(trim(p_mentor_feedback), ''),
         graded_by = (select auth.uid()),
         graded_at = case when p_return then null else now() end,
         in_portfolio = case when p_return then false else in_portfolio end
   where id = p_submission_id
  returning * into v_sub;
  return v_sub;
end;
$$;

revoke execute on function public.grade_submission(uuid, smallint, text, boolean) from public, anon;
grant execute on function public.grade_submission(uuid, smallint, text, boolean) to authenticated, service_role;

-- Cohort staff or an admin assigns a peer to review sent work. The reviewer
-- must be another active learner in the same programme. Assigning twice
-- returns the existing assignment.
create function public.assign_peer_review(p_submission_id uuid, p_reviewer_id uuid)
returns public.peer_reviews
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_sub public.submissions;
  v_row public.peer_reviews;
begin
  select * into v_sub from public.submissions where id = p_submission_id;
  if v_sub.id is null then
    raise exception 'Submission not found' using errcode = 'P0002';
  end if;
  if not (private.is_staff_for_learner(v_sub.profile_id, v_sub.program_id) or private.is_admin()) then
    raise exception 'Only cohort staff or admins assign peer reviews' using errcode = '42501';
  end if;
  if v_sub.status = 'draft' then
    raise exception 'This work has not been submitted' using errcode = '22023';
  end if;
  if p_reviewer_id = v_sub.profile_id then
    raise exception 'Learners cannot review their own work' using errcode = '22023';
  end if;
  if not exists (
    select 1 from public.cohort_members m join public.cohorts c on c.id = m.cohort_id
    where m.profile_id = p_reviewer_id and m.role = 'learner' and m.status = 'active'
      and c.program_id = v_sub.program_id
  ) then
    raise exception 'The reviewer must be an active learner in this programme' using errcode = '22023';
  end if;

  insert into public.peer_reviews (submission_id, reviewer_id, assigned_by)
  values (p_submission_id, p_reviewer_id, (select auth.uid()))
  on conflict on constraint peer_reviews_once do nothing
  returning * into v_row;

  if v_row.id is null then
    select * into v_row from public.peer_reviews
    where submission_id = p_submission_id and reviewer_id = p_reviewer_id;
  end if;
  return v_row;
end;
$$;

revoke execute on function public.assign_peer_review(uuid, uuid) from public, anon;
grant execute on function public.assign_peer_review(uuid, uuid) to authenticated, service_role;

-- The assigned reviewer submits (or updates) their review. Scores must cover
-- every criterion of the week's rubric (or the programme default) with
-- whole points from 0 to max_points; with no rubric, scores must be empty.
-- A comment is always required.
create function public.submit_peer_review(p_review_id uuid, p_rubric_scores jsonb, p_comment text)
returns public.peer_reviews
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_review public.peer_reviews;
  v_week_id uuid;
  v_rubric public.rubrics;
  v_scores jsonb := coalesce(p_rubric_scores, '{}');
  v_comment text := nullif(trim(p_comment), '');
begin
  select * into v_review from public.peer_reviews where id = p_review_id for update;
  if v_review.id is null or v_review.reviewer_id is distinct from (select auth.uid()) then
    raise exception 'Peer review not found' using errcode = 'P0002';
  end if;
  if jsonb_typeof(v_scores) <> 'object' then
    raise exception 'Scores must be an object of criterion id to points' using errcode = '22023';
  end if;
  if v_comment is null or char_length(v_comment) > 4000 then
    raise exception 'Write a comment (up to 4000 characters)' using errcode = '22023';
  end if;

  select program_week_id into v_week_id from public.submissions where id = v_review.submission_id;
  v_rubric := private.rubric_for_week(v_week_id);

  if v_rubric.id is null then
    if v_scores <> '{}' then
      raise exception 'This week has no rubric; leave scores empty' using errcode = '22023';
    end if;
  elsif exists (
      select 1 from jsonb_object_keys(v_scores) k
      where not exists (select 1 from jsonb_array_elements(v_rubric.criteria) c where c ->> 'id' = k)
    )
    or exists (
      select 1 from jsonb_array_elements(v_rubric.criteria) c
      where case when jsonb_typeof(v_scores -> (c ->> 'id')) = 'number'
                 then (v_scores ->> (c ->> 'id'))::numeric not between 0 and (c ->> 'max_points')::numeric
                   or (v_scores ->> (c ->> 'id'))::numeric <> trunc((v_scores ->> (c ->> 'id'))::numeric)
                 else true end
    ) then
    raise exception 'Score every rubric criterion with whole points from 0 to its maximum' using errcode = '22023';
  end if;

  update public.peer_reviews
     set rubric_scores = v_scores,
         comment = v_comment,
         status = 'submitted',
         submitted_at = now()
   where id = p_review_id
  returning * into v_review;
  return v_review;
end;
$$;

revoke execute on function public.submit_peer_review(uuid, jsonb, text) from public, anon;
grant execute on function public.submit_peer_review(uuid, jsonb, text) to authenticated, service_role;
