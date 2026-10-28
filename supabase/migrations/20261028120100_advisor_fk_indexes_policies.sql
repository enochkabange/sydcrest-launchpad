-- Performance advisor follow ups (issues #192 and #193), from the staging run.
--
-- 1. Foreign keys without a covering index (lint 0001): an index each, so
--    deletes on the referenced row and joins on the key do not scan.
-- 2. submissions had two permissive SELECT policies for authenticated (lint
--    0006, every row checks both). Merged into one policy with the same
--    semantics: owners read all of theirs; cohort staff and admins read sent
--    work (not drafts).

-- 1. Covering indexes --------------------------------------------------------------

create index if not exists cohort_applications_cohort_idx
  on public.cohort_applications (cohort_id);
create index if not exists cohort_applications_decided_by_idx
  on public.cohort_applications (decided_by);
create index if not exists cohort_applications_preferred_cohort_idx
  on public.cohort_applications (preferred_cohort_id);
create index if not exists community_events_created_by_idx
  on public.community_events (created_by);
create index if not exists community_posts_hidden_by_idx
  on public.community_posts (hidden_by);
create index if not exists community_replies_hidden_by_idx
  on public.community_replies (hidden_by);
create index if not exists event_checkins_checked_in_by_idx
  on public.event_checkins (checked_in_by);
create index if not exists event_feedback_profile_idx
  on public.event_feedback (profile_id);
create index if not exists skill_attempts_assessment_idx
  on public.skill_assessment_attempts (assessment_id);
create index if not exists skill_attempts_reviewer_idx
  on public.skill_assessment_attempts (reviewer_id);
create index if not exists skill_attempts_skill_idx
  on public.skill_assessment_attempts (skill_id);
create index if not exists submissions_program_week_idx
  on public.submissions (program_id, program_week_id);
create index if not exists verified_skills_issued_by_idx
  on public.verified_skills (issued_by);
create index if not exists verified_skills_revoked_by_idx
  on public.verified_skills (revoked_by);

-- 2. One SELECT policy on submissions ------------------------------------------------

drop policy "Learners read their own submissions" on public.submissions; -- allow-destructive: merged into the policy below, same semantics (advisor lint 0006)
drop policy "Cohort staff and admins read sent submissions" on public.submissions; -- allow-destructive: merged into the policy below, same semantics (advisor lint 0006)

create policy "Owners read their submissions; cohort staff and admins read sent ones"
  on public.submissions for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or (
      status <> 'draft'
      and (private.is_staff_for_learner(profile_id, program_id) or (select private.is_admin()))
    )
  );
