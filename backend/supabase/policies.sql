-- ============================================================
--  SydCrest Launchpad — RLS policies for the 23 tables that
--  don't yet have any (profiles already has its two, in schema.sql).
--
--  Context: the backend's route handlers use the SERVICE-ROLE
--  client (see src/config/supabase.js), which bypasses RLS
--  entirely — these policies are defence in depth, not the
--  primary authorization layer. They matter concretely for:
--    1. Realtime subscriptions (notifications, chat_messages,
--       posts, bookings, opp_messages) — Realtime goes through
--       the `authenticated` key and DOES enforce RLS, so a
--       missing/wrong policy here means either a silent
--       under-delivery (nobody gets the row) or an over-delivery
--       (wrong people see it).
--    2. Any future direct-from-browser Supabase usage via the
--       anon/authenticated key (supabaseAnon in config/supabase.js).
--
--  Run in Supabase SQL Editor, after schema.sql.
-- ============================================================

-- ─── HELPERS ─────────────────────────────────────────────────
-- profiles.id (not auth.uid()) is the FK every other table points
-- to, so every policy below needs this translation. STABLE (not
-- SECURITY DEFINER): it only ever needs to read the caller's own
-- profile row, which the existing "Own profile" policy already
-- permits, so no elevated privilege is required.
create or replace function auth_profile_id() returns uuid as $$
  select id from profiles where user_id = auth.uid() limit 1;
$$ language sql stable;

create or replace function auth_is_admin() returns boolean as $$
  select exists (
    select 1 from profiles
    where user_id = auth.uid() and role in ('platform_admin','super_admin')
  );
$$ language sql stable;

-- True if the caller is enrolled in the cohort, is its assigned
-- mentor, or is an admin. Backs every "cohort community" policy
-- below (posts, project_rubrics, learning content visibility).
create or replace function auth_in_cohort(p_cohort_id uuid) returns boolean as $$
  select auth_is_admin()
    or exists (select 1 from enrollments e where e.cohort_id = p_cohort_id and e.mentee_id = auth_profile_id())
    or exists (select 1 from cohorts c where c.id = p_cohort_id and c.mentor_id = auth_profile_id());
$$ language sql stable;

-- ─── PROGRAMS ────────────────────────────────────────────────
alter table programs enable row level security;
create policy "Anyone authenticated can view active programs" on programs for select using (is_active = true or auth_is_admin());
create policy "Admins manage programs" on programs for insert with check (auth_is_admin());
create policy "Admins update programs" on programs for update using (auth_is_admin());
create policy "Admins delete programs" on programs for delete using (auth_is_admin());

create or replace function auth_is_reviewer() returns boolean as $$
  select auth_is_admin() or exists (
    select 1 from profiles where user_id = auth.uid() and role = 'reviewer'
  );
$$ language sql stable;

-- ─── APPLICATIONS ────────────────────────────────────────────
-- No public select policy: status lookup goes through the backend's
-- service-role client with an explicit email+reference_code check, not
-- direct table access. No insert policy either — submission is
-- unauthenticated and goes through the service-role client too.
alter table applications enable row level security;
create policy "Reviewers and admins manage applications" on applications for select using (auth_is_reviewer());
create policy "Reviewers and admins update applications" on applications for update using (auth_is_reviewer());

-- ─── COHORTS ─────────────────────────────────────────────────
alter table cohorts enable row level security;
create policy "Members and admins can view" on cohorts for select using (auth_in_cohort(id));
create policy "Admins manage cohorts" on cohorts for insert with check (auth_is_admin());
create policy "Admins update cohorts" on cohorts for update using (auth_is_admin());
create policy "Admins delete cohorts" on cohorts for delete using (auth_is_admin());

-- ─── ENROLLMENTS ─────────────────────────────────────────────
alter table enrollments enable row level security;
create policy "Own enrollment or cohort staff" on enrollments for select using (
  mentee_id = auth_profile_id() or auth_in_cohort(cohort_id)
);
create policy "Admins create enrollments" on enrollments for insert with check (auth_is_admin());
create policy "Own progress or admin update" on enrollments for update using (
  mentee_id = auth_profile_id() or auth_is_admin()
);
create policy "Admins delete enrollments" on enrollments for delete using (auth_is_admin());

-- ─── LEARNING PATHS / WEEKS ──────────────────────────────────
alter table learning_paths enable row level security;
create policy "Own path or cohort staff" on learning_paths for select using (
  mentee_id = auth_profile_id() or auth_in_cohort(cohort_id)
);
create policy "Own path insert" on learning_paths for insert with check (
  mentee_id = auth_profile_id() or auth_is_admin()
);
create policy "Own path or admin update" on learning_paths for update using (
  mentee_id = auth_profile_id() or auth_is_admin()
);

alter table learning_weeks enable row level security;
create policy "Own week or cohort staff" on learning_weeks for select using (
  exists (
    select 1 from learning_paths p
    where p.id = learning_weeks.path_id
      and (p.mentee_id = auth_profile_id() or auth_in_cohort(p.cohort_id))
  )
);
create policy "Own week update" on learning_weeks for update using (
  exists (
    select 1 from learning_paths p
    where p.id = learning_weeks.path_id and p.mentee_id = auth_profile_id()
  ) or auth_is_admin()
);

-- ─── SESSIONS ────────────────────────────────────────────────
alter table sessions enable row level security;
create policy "Participants and admins" on sessions for select using (
  mentor_id = auth_profile_id() or mentee_id = auth_profile_id() or auth_is_admin()
);
create policy "Mentor or admin books" on sessions for insert with check (
  mentor_id = auth_profile_id() or auth_is_admin()
);
create policy "Participants update" on sessions for update using (
  mentor_id = auth_profile_id() or mentee_id = auth_profile_id() or auth_is_admin()
);

-- ─── PROJECTS / RUBRICS ──────────────────────────────────────
alter table projects enable row level security;
create policy "Own project or cohort staff" on projects for select using (
  mentee_id = auth_profile_id() or auth_in_cohort(cohort_id)
);
create policy "Own project insert" on projects for insert with check (mentee_id = auth_profile_id());
create policy "Own project or reviewer update" on projects for update using (
  mentee_id = auth_profile_id() or auth_in_cohort(cohort_id)
);

alter table project_rubrics enable row level security;
create policy "Cohort members view rubrics" on project_rubrics for select using (auth_in_cohort(cohort_id));
create policy "Admins manage rubrics" on project_rubrics for insert with check (auth_is_admin());
create policy "Admins update rubrics" on project_rubrics for update using (auth_is_admin());

-- ─── COMMUNITY: POSTS / LIKES / REPLIES ──────────────────────
-- Realtime table — this SELECT policy is what actually gates who
-- receives post broadcasts, not just REST reads.
alter table posts enable row level security;
create policy "Cohort members view posts" on posts for select using (
  auth_in_cohort(cohort_id) and not is_deleted
);
create policy "Cohort members post" on posts for insert with check (
  author_id = auth_profile_id() and auth_in_cohort(cohort_id)
);
create policy "Author or admin edits post" on posts for update using (
  author_id = auth_profile_id() or auth_is_admin()
);

alter table post_likes enable row level security;
create policy "Cohort members view likes" on post_likes for select using (
  exists (select 1 from posts p where p.id = post_likes.post_id and auth_in_cohort(p.cohort_id))
);
create policy "Own like insert" on post_likes for insert with check (user_id = auth_profile_id());
create policy "Own like delete" on post_likes for delete using (user_id = auth_profile_id());

alter table post_replies enable row level security;
create policy "Cohort members view replies" on post_replies for select using (
  exists (select 1 from posts p where p.id = post_replies.post_id and auth_in_cohort(p.cohort_id))
  and not is_deleted
);
create policy "Cohort members reply" on post_replies for insert with check (
  author_id = auth_profile_id()
  and exists (select 1 from posts p where p.id = post_replies.post_id and auth_in_cohort(p.cohort_id))
);
create policy "Author or admin edits reply" on post_replies for update using (
  author_id = auth_profile_id() or auth_is_admin()
);

-- ─── CHAT (Study Buddy) ──────────────────────────────────────
-- Realtime table. Private by design — this is a 1:1 AI conversation.
alter table chat_messages enable row level security;
create policy "Own chat only" on chat_messages for select using (
  mentee_id = auth_profile_id() or auth_is_admin()
);
create policy "Own chat insert" on chat_messages for insert with check (mentee_id = auth_profile_id());

-- ─── QUIZZES ─────────────────────────────────────────────────
alter table quizzes enable row level security;
create policy "Own quizzes" on quizzes for select using (mentee_id = auth_profile_id() or auth_is_admin());
create policy "Own quiz insert" on quizzes for insert with check (mentee_id = auth_profile_id());
create policy "Own quiz update" on quizzes for update using (mentee_id = auth_profile_id());

-- ─── EVENTS ──────────────────────────────────────────────────
alter table events enable row level security;
create policy "Public events, admins see all" on events for select using (is_public or auth_is_admin());
create policy "Admins manage events" on events for insert with check (auth_is_admin());
create policy "Admins update events" on events for update using (auth_is_admin());

alter table event_registrations enable row level security;
create policy "Own registration or admin" on event_registrations for select using (
  user_id = auth_profile_id() or auth_is_admin()
);
create policy "Own registration insert" on event_registrations for insert with check (user_id = auth_profile_id());
create policy "Own registration delete" on event_registrations for delete using (user_id = auth_profile_id());

-- ─── MARKETPLACE ─────────────────────────────────────────────
alter table mentor_listings enable row level security;
create policy "Active listings are browsable" on mentor_listings for select using (
  is_active or mentor_id = auth_profile_id() or auth_is_admin()
);
create policy "Mentor manages own listing" on mentor_listings for insert with check (mentor_id = auth_profile_id());
create policy "Mentor updates own listing" on mentor_listings for update using (
  mentor_id = auth_profile_id() or auth_is_admin()
);

-- Realtime table.
alter table bookings enable row level security;
create policy "Participants and admins" on bookings for select using (
  mentor_id = auth_profile_id() or mentee_id = auth_profile_id() or auth_is_admin()
);
create policy "Mentee books" on bookings for insert with check (mentee_id = auth_profile_id());
create policy "Participants update booking" on bookings for update using (
  mentor_id = auth_profile_id() or mentee_id = auth_profile_id() or auth_is_admin()
);

-- ─── OPPORTUNITIES ───────────────────────────────────────────
alter table opportunities enable row level security;
create policy "Own opportunities" on opportunities for select using (
  user_id = auth_profile_id() or auth_is_admin()
);
create policy "Own opportunity insert" on opportunities for insert with check (user_id = auth_profile_id());
create policy "Own opportunity update" on opportunities for update using (user_id = auth_profile_id());
create policy "Own opportunity delete" on opportunities for delete using (user_id = auth_profile_id());

-- Realtime table.
alter table opp_messages enable row level security;
create policy "Own opp thread" on opp_messages for select using (
  user_id = auth_profile_id() or auth_is_admin()
);
create policy "Own opp thread insert" on opp_messages for insert with check (user_id = auth_profile_id());

-- ─── NOTIFICATIONS ───────────────────────────────────────────
-- Realtime table. Inserted by the backend (service role) only —
-- no user-facing insert policy needed.
alter table notifications enable row level security;
create policy "Own notifications" on notifications for select using (user_id = auth_profile_id());
create policy "Mark own notifications read" on notifications for update using (user_id = auth_profile_id());

-- ─── ACHIEVEMENTS ────────────────────────────────────────────
alter table achievements enable row level security;
create policy "Own achievements or admin" on achievements for select using (
  mentee_id = auth_profile_id() or auth_is_admin()
);

-- ─── RECOMMENDERS ────────────────────────────────────────────
-- Contains a recommender's phone number — treat as sensitive PII,
-- visible only to the owning mentee and admins, never cohort peers.
alter table recommenders enable row level security;
create policy "Own recommenders or admin" on recommenders for select using (
  mentee_id = auth_profile_id() or auth_is_admin()
);
create policy "Own recommender insert" on recommenders for insert with check (mentee_id = auth_profile_id());
create policy "Own recommender update" on recommenders for update using (mentee_id = auth_profile_id());
create policy "Own recommender delete" on recommenders for delete using (mentee_id = auth_profile_id());

-- ─── AUDIT LOGS ──────────────────────────────────────────────
-- Admin-only, full stop. No user, including the subject of a log
-- row, can read their own audit trail through this table.
alter table audit_logs enable row level security;
create policy "Admins only" on audit_logs for select using (auth_is_admin());

-- ─── SYSTEM SETTINGS ─────────────────────────────────────────
-- Feature flags (maintenance_mode, etc.) need to be client-readable;
-- only super_admin can change platform-wide behaviour.
alter table system_settings enable row level security;
create policy "Anyone signed in can read settings" on system_settings for select using (auth.uid() is not null);
create policy "Super admin writes settings" on system_settings for update using (
  exists (select 1 from profiles where user_id = auth.uid() and role = 'super_admin')
);
