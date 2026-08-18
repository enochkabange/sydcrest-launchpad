-- ============================================================
--  SydCrest Launchpad – Enterprise Schema v2
--  Run in Supabase SQL Editor
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ─── ENUMS ───────────────────────────────────────────────────
create type user_role as enum ('mentee','mentor','cohort_admin','platform_admin','super_admin','reviewer');
create type application_status as enum ('applied','under_review','accepted','waitlisted','rejected');
create type mentee_status as enum ('active','at_risk','inactive','graduated');
create type project_status as enum ('draft','submitted','ai_reviewed','mentor_reviewed','revision_requested','approved');
create type event_type as enum ('workshop','game_show','hackathon','demo_day','summit');
create type booking_status as enum ('pending','confirmed','completed','cancelled','disputed');
create type payment_method as enum ('mtn_momo','vodafone_cash','airteltigo_money','card');
create type payment_status as enum ('pending','held_escrow','released','refunded','failed');
create type opp_type as enum ('job','school','scholarship','fellowship','internship');
create type opp_stage as enum ('researching','researched','roadmap','applying','submitted','outcome_positive','outcome_negative');
-- PLATFORM_SPEC.md §8 — the earlier achievements table (mentee_id, badge,
-- label, earned_at) was rebuilt: zero code ever referenced it, and it
-- lacked program/cohort scoping and typed milestones needed for the
-- public share-page mechanism. scope_key + unique(mentee_id, type,
-- scope_key) makes minting idempotent for the two trigger points that are
-- re-callable (application accept, project approval) without per-type
-- partial indexes.
create type achievement_type as enum ('accepted','enrolled','week_completed','project_approved','certified');
create type conversation_type as enum ('dm', 'cohort');

-- ─── PROFILES ────────────────────────────────────────────────
create table profiles (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  role            user_role not null default 'mentee',
  full_name       text not null,
  email           text not null unique,
  phone           text,
  region          text,
  avatar_url      text,
  bio             text,
  device_access   text default 'smartphone',
  is_active       boolean default true,
  token_version   int default 0,
  last_seen_at    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
alter table profiles enable row level security;
create policy "Own profile" on profiles for all using (auth.uid() = user_id);

/* SECURITY DEFINER is load-bearing, not decoration: this function is called
   from a policy ON profiles itself. A plain SQL function here would run
   under the CALLING role, re-triggering RLS on its own `from profiles`
   query — which re-evaluates this same policy — infinite recursion
   ("infinite recursion detected in policy for relation profiles"). Running
   as the function owner bypasses RLS for this one internal lookup, which
   is exactly the narrow, read-only escape hatch this needs. Redefined
   (not dropped) in policies.sql, where every other table's policies use
   it too — keep both definitions identical. */
create or replace function auth_is_admin() returns boolean as $$
  select exists (
    select 1 from profiles where user_id = auth.uid() and role in ('platform_admin','super_admin')
  );
$$ language sql stable security definer set search_path = public;

create policy "Admins see all" on profiles for select using (auth_is_admin());

-- ─── PROGRAMS ────────────────────────────────────────────────
-- PLATFORM_SPEC.md §2 — the entity everything downstream (admissions,
-- mentor vetting, certification criteria) is scoped per-program against.
-- Seeded with one row ("Delta Mentoring Program") on the live project;
-- cohorts.program_id below is nullable so existing legacy cohorts that
-- predate this model aren't forced to backfill.
create table programs (
  id                     uuid primary key default uuid_generate_v4(),
  name                   text not null,
  slug                   text not null unique,
  description            text,
  duration_weeks         int default 12,
  eligibility_min_age    int,
  eligibility_max_age    int,
  eligibility_notes      text,
  certification_criteria jsonb,
  screening_test         jsonb,
  is_active              boolean default true,
  created_at             timestamptz default now()
);

-- ─── APPLICATIONS ────────────────────────────────────────────
-- PLATFORM_SPEC.md §3 — public submission (no account required), reviewed
-- by the 'reviewer' role (separate from mentors, see user_role above).
-- No unique constraint on email: a rejected applicant can reapply next
-- cycle as a fresh row, not an update to the old one.
create table applications (
  id                uuid primary key default uuid_generate_v4(),
  program_id        uuid references programs(id) not null,
  reference_code    text not null unique,
  full_name         text not null,
  email             text not null,
  phone             text,
  date_of_birth     date,
  region            text,
  gender            text,
  is_underserved    boolean default false,
  essay             text,
  screening_answers jsonb,
  screening_score   int,
  status            application_status default 'applied',
  reviewer_id       uuid references profiles(id),
  reviewer_notes    text,
  decided_at        timestamptz,
  created_at        timestamptz default now()
);
create index on applications(program_id);
create index on applications(email);
create index on applications(status);

-- ─── MENTOR APPLICATIONS ─────────────────────────────────────
-- PLATFORM_SPEC.md §4 — a deliberately separate table from `applications`,
-- not a variant of it: a mentor isn't vetted for one program's cohort the
-- way a learner is, so forcing the same program_id-scoped shape would be
-- a schema mismatch, not real reuse. Shares the pattern (reference-code
-- lookup, application_status, reviewer role gate), not the table.
create table mentor_applications (
  id                  uuid primary key default uuid_generate_v4(),
  reference_code      text not null unique,
  full_name           text not null,
  email               text not null,
  phone               text,
  expertise_areas     text[],
  portfolio_url       text,
  bio                 text,
  reference_1_name    text,
  reference_1_contact text,
  reference_2_name    text,
  reference_2_contact text,
  -- The safeguarding tie-in: a reviewer confirms they actually contacted
  -- these references. The review route refuses to accept a mentor unless
  -- this is already true — see applications.js.
  references_checked  boolean default false,
  status              application_status default 'applied',
  reviewer_id         uuid references profiles(id),
  reviewer_notes      text,
  decided_at          timestamptz,
  created_at          timestamptz default now()
);
create index on mentor_applications(email);
create index on mentor_applications(status);

-- ─── COHORTS ─────────────────────────────────────────────────
create table cohorts (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  track         text not null,
  program_id    uuid references programs(id),
  mentor_id     uuid references profiles(id),
  start_date    date,
  end_date      date,
  total_weeks   int default 12,
  is_active     boolean default true,
  max_size      int default 20,
  created_at    timestamptz default now()
);

-- ─── ENROLLMENTS ─────────────────────────────────────────────
create table enrollments (
  id            uuid primary key default uuid_generate_v4(),
  mentee_id     uuid references profiles(id) on delete cascade,
  cohort_id     uuid references cohorts(id) on delete cascade,
  status        mentee_status default 'active',
  current_week  int default 1,
  xp_points     int default 0,
  streak_days   int default 0,
  last_active   timestamptz default now(),
  enrolled_at   timestamptz default now(),
  -- PLATFORM_SPEC.md §5 onboarding — device/connectivity check, async
  -- orientation, buddy pairing, guardian consent for minors. All
  -- nullable: onboarding is advisory (Learn.jsx banners toward it), not
  -- a hard gate on using the platform.
  device_type                   text,
  data_plan                     text,
  availability_hours            text,
  device_check_completed_at     timestamptz,
  orientation_completed_at      timestamptz,
  buddy_id                      uuid references profiles(id),
  -- Auto-set at enrollment time by cross-referencing the accepted
  -- application's date_of_birth (admin.js's /cohorts/:id/enroll) — not a
  -- manually-flagged field. guardian_consent_token has no real email
  -- service behind it (see onboarding.js's header comment): the admin
  -- relays the confirmation link directly, same honest pattern as every
  -- other unconfigured integration this session.
  guardian_consent_required     boolean default false,
  guardian_email                text,
  guardian_consent_token        text unique,
  guardian_consent_confirmed_at timestamptz,
  unique(mentee_id, cohort_id)
);

-- ─── LEARNING PATHS ──────────────────────────────────────────
create table learning_paths (
  id            uuid primary key default uuid_generate_v4(),
  mentee_id     uuid references profiles(id) on delete cascade,
  cohort_id     uuid references cohorts(id),
  title         text not null,
  tagline       text,
  track         text not null,
  total_weeks   int default 8,
  is_team       boolean default false,
  raw_json      jsonb,
  created_at    timestamptz default now()
);

create table learning_weeks (
  id            uuid primary key default uuid_generate_v4(),
  path_id       uuid references learning_paths(id) on delete cascade,
  week_number   int not null,
  theme         text not null,
  objectives    text[],
  resource_name text,
  resource_url  text,
  assignment    text,
  is_team_week  boolean default false,
  status        text default 'pending',
  completed_at  timestamptz,
  score         int,
  created_at    timestamptz default now()
);

-- ─── SESSIONS ────────────────────────────────────────────────
create table sessions (
  id            uuid primary key default uuid_generate_v4(),
  mentor_id     uuid references profiles(id),
  mentee_id     uuid references profiles(id),
  cohort_id     uuid references cohorts(id),
  scheduled_at  timestamptz not null,
  duration_mins int default 60,
  meet_link     text,
  session_type  text default '1:1',
  status        text default 'scheduled',
  mentor_notes  text,
  mentee_notes  text,
  rating        int check (rating between 1 and 5),
  created_at    timestamptz default now()
);

-- ─── PROJECTS ────────────────────────────────────────────────
create table projects (
  id              uuid primary key default uuid_generate_v4(),
  mentee_id       uuid references profiles(id) on delete cascade,
  cohort_id       uuid references cohorts(id),
  week_number     int not null,
  title           text not null,
  description     text,
  submission_url  text,
  file_url        text,
  status          project_status default 'draft',
  ai_feedback     jsonb,
  mentor_feedback text,
  final_score     int,
  in_portfolio    boolean default false,
  submitted_at    timestamptz,
  reviewed_at     timestamptz,
  created_at      timestamptz default now()
);

create table project_rubrics (
  id            uuid primary key default uuid_generate_v4(),
  cohort_id     uuid references cohorts(id),
  week_number   int not null,
  track         text not null,
  criteria      jsonb not null,
  created_at    timestamptz default now()
);

-- ─── COMMUNITY ───────────────────────────────────────────────
create table posts (
  id            uuid primary key default uuid_generate_v4(),
  author_id     uuid references profiles(id) on delete cascade,
  cohort_id     uuid references cohorts(id),
  content       text not null,
  is_pinned     boolean default false,
  likes_count   int default 0,
  replies_count int default 0,
  is_deleted    boolean default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table post_likes (
  post_id   uuid references posts(id) on delete cascade,
  user_id   uuid references profiles(id) on delete cascade,
  primary key (post_id, user_id)
);

create table post_replies (
  id        uuid primary key default uuid_generate_v4(),
  post_id   uuid references posts(id) on delete cascade,
  author_id uuid references profiles(id) on delete cascade,
  content   text not null,
  is_deleted boolean default false,
  created_at timestamptz default now()
);

-- ─── CHAT ────────────────────────────────────────────────────
create table chat_messages (
  id            uuid primary key default uuid_generate_v4(),
  mentee_id     uuid references profiles(id) on delete cascade,
  role          text not null check (role in ('user','assistant')),
  content       text not null,
  context       text,
  created_at    timestamptz default now()
);

-- ─── QUIZZES ─────────────────────────────────────────────────
create table quizzes (
  id            uuid primary key default uuid_generate_v4(),
  mentee_id     uuid references profiles(id),
  week_number   int not null,
  track         text not null,
  questions     jsonb not null,
  score         int,
  max_score     int,
  completed_at  timestamptz,
  created_at    timestamptz default now()
);

-- ─── EVENTS ──────────────────────────────────────────────────
create table events (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  description   text,
  event_type    event_type not null,
  event_date    timestamptz,
  location      text,
  meet_link     text,
  capacity      int,
  is_public     boolean default true,
  is_free       boolean default true,
  price_ghs     numeric(10,2) default 0,
  sponsor_name  text,
  created_by    uuid references profiles(id),
  created_at    timestamptz default now()
);

create table event_registrations (
  id          uuid primary key default uuid_generate_v4(),
  event_id    uuid references events(id) on delete cascade,
  user_id     uuid references profiles(id) on delete cascade,
  registered_at timestamptz default now(),
  unique(event_id, user_id)
);

-- ─── MARKETPLACE ─────────────────────────────────────────────
create table mentor_listings (
  id            uuid primary key default uuid_generate_v4(),
  mentor_id     uuid references profiles(id) on delete cascade unique,
  specialties   text[],
  hourly_rate   numeric(10,2) not null,
  is_active     boolean default true,
  total_sessions int default 0,
  avg_rating    numeric(3,2) default 0,
  bio           text,
  -- PLATFORM_SPEC.md §4 hard caseload cap. Null = unlimited. Counts
  -- distinct mentees who have ever booked, not session volume — a
  -- repeat booking from an existing mentee never counts against a full
  -- listing, only a genuinely new mentee does. See marketplace.js.
  max_mentees   int,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table bookings (
  id              uuid primary key default uuid_generate_v4(),
  mentor_id       uuid references profiles(id),
  mentee_id       uuid references profiles(id),
  listing_id      uuid references mentor_listings(id),
  session_focus   text,
  scheduled_at    timestamptz not null,
  duration_mins   int default 60,
  total_amount    numeric(10,2) not null,
  status          booking_status default 'pending',
  payment_method  payment_method,
  payment_status  payment_status default 'pending',
  payment_ref     text,
  escrow_released boolean default false,
  mentee_rating   int check (mentee_rating between 1 and 5),
  mentee_review   text,
  meet_link       text,
  created_at      timestamptz default now(),
  confirmed_at    timestamptz,
  completed_at    timestamptz
);

-- ─── OPPORTUNITIES (new) ─────────────────────────────────────
create table opportunities (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references profiles(id) on delete cascade,
  type            opp_type not null,
  title           text not null,
  org             text not null,
  location        text,
  deadline        text,
  notes           text,
  stage           opp_stage default 'researching',
  progress        int default 0,
  research_json   jsonb,
  roadmap_json    jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
create index on opportunities(user_id);

create table opp_messages (
  id          uuid primary key default uuid_generate_v4(),
  opp_id      uuid references opportunities(id) on delete cascade,
  user_id     uuid references profiles(id) on delete cascade,
  role        text not null check (role in ('user','assistant')),
  content     text not null,
  created_at  timestamptz default now()
);

-- ─── NOTIFICATIONS ───────────────────────────────────────────
create table notifications (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references profiles(id) on delete cascade,
  type          text not null,
  title         text not null,
  body          text not null,
  data          jsonb,
  is_read       boolean default false,
  created_at    timestamptz default now()
);
create index on notifications(user_id, is_read);

-- ─── ACHIEVEMENTS & CERTIFICATES ─────────────────────────────
-- is_minor is computed at mint time (enrollments.guardian_consent_required
-- for cohort-scoped types, isMinor(application.date_of_birth) for the
-- pre-enrollment 'accepted' type) and gates the public share/verify HTML
-- routes — a socially-shareable page is a different privacy posture from
-- the internal roster that guardian consent exists for in the first place.
-- nudge_worthy marks the milestones PLATFORM_SPEC.md §8 reserves the
-- in-app share nudge for (acceptance, halfway, certification) — weekly
-- progress is still logged here but stays quiet internal tracking.
create table achievements (
  id              uuid primary key default uuid_generate_v4(),
  mentee_id       uuid references profiles(id) on delete cascade,
  type            achievement_type not null,
  program_id      uuid references programs(id),
  cohort_id       uuid references cohorts(id),
  scope_key       text not null,
  label           text not null,
  is_minor        boolean not null default false,
  nudge_worthy    boolean not null default false,
  acknowledged_at timestamptz,
  earned_at       timestamptz default now(),
  unique(mentee_id, type, scope_key)
);

-- Self-issued Open Badges v3 (PLATFORM_SPEC.md §7) — no Credly dependency.
-- badge_json is the assertion payload served verbatim at
-- /api/certificates/:verificationId/badge.json for machine verification.
create table certificates (
  id              uuid primary key default uuid_generate_v4(),
  mentee_id       uuid references profiles(id) on delete cascade,
  program_id      uuid references programs(id),
  cohort_id       uuid references cohorts(id),
  verification_id text unique not null,
  badge_json      jsonb not null,
  issued_by       uuid references profiles(id),
  issued_at       timestamptz default now()
);

-- ─── REAL-TIME CHAT ──────────────────────────────────────────
-- PLATFORM_SPEC.md §11 (chat only — video is a separate PR). The existing
-- posts/post_replies community feed stays async and separate; this is
-- genuinely new infrastructure, delivered via short polling rather than
-- WebSockets/Supabase Realtime (see chat.js's header comment) since the
-- frontend has no Supabase client today and a dropped poll degrades more
-- honestly on a flaky mobile connection than a dropped socket does.
--
-- One conversation per cohort (type='cohort', unique cohort_id) plus
-- one per mentor<->mentee DM pair (type='dm', cohort_id null).
-- chat_thread_messages is a deliberately different name from
-- chat_messages — that table is Study Buddy's AI-chat log
-- (mentee_id, role, content), an unrelated shape.
create table conversations (
  id          uuid primary key default uuid_generate_v4(),
  type        conversation_type not null,
  cohort_id   uuid references cohorts(id),
  created_at  timestamptz default now(),
  unique(cohort_id)
);

create table conversation_participants (
  conversation_id uuid references conversations(id) on delete cascade,
  profile_id      uuid references profiles(id) on delete cascade,
  last_read_at    timestamptz,
  primary key (conversation_id, profile_id)
);

create table chat_thread_messages (
  id              uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_id       uuid references profiles(id) on delete cascade,
  content         text not null,
  deleted_at      timestamptz,
  created_at      timestamptz default now()
);
create index on chat_thread_messages(conversation_id, created_at);

-- ─── RECOMMENDERS ────────────────────────────────────────────
create table recommenders (
  id            uuid primary key default uuid_generate_v4(),
  mentee_id     uuid references profiles(id) on delete cascade,
  name          text not null,
  phone         text not null,
  relationship  text not null,
  signed        boolean default false,
  signed_at     timestamptz,
  created_at    timestamptz default now()
);

-- ─── AUDIT LOGS ──────────────────────────────────────────────
create table audit_logs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references profiles(id) on delete set null,
  action        text not null,
  resource_type text,
  resource_id   text,
  ip            text,
  user_agent    text,
  request_id    text,
  metadata      jsonb,
  created_at    timestamptz default now()
);
create index on audit_logs(user_id);
create index on audit_logs(action);
create index on audit_logs(created_at desc);

-- ─── SYSTEM SETTINGS ─────────────────────────────────────────
create table system_settings (
  key       text primary key,
  value     text not null,
  updated_at timestamptz default now()
);

insert into system_settings (key, value) values
  ('platform_fee_pct', '15'),
  ('max_cohort_size', '20'),
  ('ai_requests_per_min', '15'),
  ('maintenance_mode', 'false'),
  ('whatsapp_notifications', 'true'),
  ('momo_enabled', 'true');

-- ─── TRIGGERS ────────────────────────────────────────────────
create or replace function update_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;

create trigger profiles_updated_at before update on profiles for each row execute function update_updated_at();
create trigger mentor_listings_updated_at before update on mentor_listings for each row execute function update_updated_at();
create trigger posts_updated_at before update on posts for each row execute function update_updated_at();
create trigger opportunities_updated_at before update on opportunities for each row execute function update_updated_at();

-- Post likes counter
create or replace function handle_post_like() returns trigger as $$
begin
  if tg_op='INSERT' then update posts set likes_count=likes_count+1 where id=new.post_id;
  elsif tg_op='DELETE' then update posts set likes_count=likes_count-1 where id=old.post_id; end if;
  return null;
end; $$ language plpgsql;
create trigger post_likes_counter after insert or delete on post_likes for each row execute function handle_post_like();

-- Reply counter
create or replace function handle_post_reply() returns trigger as $$
begin
  if tg_op='INSERT' then update posts set replies_count=replies_count+1 where id=new.post_id; end if;
  return null;
end; $$ language plpgsql;
create trigger post_replies_counter after insert on post_replies for each row execute function handle_post_reply();

-- Update mentor avg rating
create or replace function update_mentor_rating(p_mentor_id uuid) returns void as $$
begin
  update mentor_listings set
    avg_rating = (select round(avg(mentee_rating)::numeric, 2) from bookings where mentor_id=p_mentor_id and mentee_rating is not null),
    total_sessions = (select count(*) from bookings where mentor_id=p_mentor_id and status='completed')
  where mentor_id = p_mentor_id;
end; $$ language plpgsql;

-- ─── REALTIME ────────────────────────────────────────────────
alter publication supabase_realtime add table notifications;
alter publication supabase_realtime add table chat_messages;
alter publication supabase_realtime add table posts;
alter publication supabase_realtime add table bookings;
alter publication supabase_realtime add table opp_messages;
