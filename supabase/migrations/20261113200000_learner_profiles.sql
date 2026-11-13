-- Learner profile v2 (epic #320, step 2): optional questions that shape a
-- learner's path, reminders and job matches (src/lib/learner-profile.ts, whose
-- option lists these checks must match; a unit test compares them).
--
-- Every answer is optional. Used for learning (path, pacing, low data
-- versions, reminders) and matching (filters and ranking); never an input to
-- the readiness score. Never collected: gender, ethnicity, religion, health
-- or disability, marital status.
--
-- The member reads and writes their own row; admins read every row (support
-- and, later, the learner timeline). Employers never read it directly.

-- 1. Event names ------------------------------------------------------------------------

create or replace function private.is_event_name(p_name text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select p_name = any (array[
    -- Taxonomy (issues #51 and #242)
    'page_view', 'web_vital', 'form_started', 'form_submitted', 'share_clicked',
    'client_error', 'server_error', 'action_failed', 'signup', 'sign_in',
    'sign_out', 'welcome_completed', 'password_reset_requested',
    'password_updated', 'profile_updated', 'public_profile_updated',
    'whatsapp_consent_set', 'display_prefs_saved', 'milestone_posts_set',
    'waitlist_joined', 'quiz_run', 'path_saved', 'path_viewed', 'lesson_opened',
    'node_started', 'quiz_submitted', 'node_completed', 'review_completed',
    'weekly_goal_set', 'study_buddy_message', 'skill_quiz_submitted',
    'skill_portfolio_submitted', 'skill_portfolio_reviewed', 'path_skills_claimed',
    'application_submitted', 'application_withdrawn', 'application_decided',
    'specialisation_chosen', 'submission_saved', 'submission_graded',
    'peer_review_assigned', 'peer_review_submitted', 'learner_deferred',
    'certificate_issued', 'certificate_revoked', 'expert_applied',
    'expert_application_decided', 'offer_created', 'offer_updated',
    'booking_requested', 'booking_status_changed', 'booking_message_sent',
    'booking_reviewed', 'brief_created', 'pitch_submitted', 'pitch_withdrawn',
    'pitch_decided', 'opportunity_created', 'opportunity_reported', 'opportunity_saved',
    'opportunity_unsaved', 'outcome_reported', 'outcome_decided',
    'talent_listing_saved', 'talent_contact_requested', 'talent_contact_responded',
    'organisation_created', 'organisation_member_invited',
    'organisation_invite_accepted', 'organisation_decided', 'post_created',
    'reply_created', 'reaction_set', 'content_reported', 'content_moderated',
    'event_rsvp', 'event_checked_in', 'event_feedback_sent', 'chapter_joined',
    'chapter_left', 'profile_followed', 'profile_reported', 'invite_sent',
    'notification_opened', 'notifications_read_all',
    -- Attribution (epic #320)
    'visit_started',
    -- Learner profile v2 (epic #320)
    'learner_profile_saved', 'profile_field_updated',
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed',
    'node_opened', 'path_quiz_started', 'path_quiz_completed', 'achievement_shared',
    'profile_published'
  ]);
$$;

-- 2. Table -------------------------------------------------------------------------------

create table public.learner_profiles (
  profile_id          uuid primary key references public.profiles (id) on delete cascade,
  main_goal           text check (main_goal = any (array['job', 'freelance', 'business', 'upskill', 'exploring'])),
  employment_status   text check (employment_status = any (array['student', 'national_service', 'looking', 'employed', 'self_employed'])),
  education           text check (education = any (array['jhs', 'shs', 'tvet', 'diploma', 'degree', 'postgraduate'])),
  field_of_study      text check (field_of_study = any (array['business', 'computing', 'engineering', 'science', 'health', 'agriculture', 'education', 'arts', 'social_science', 'general', 'other'])),
  experience          text check (experience = any (array['none', 'under_1', '1_2', '3_5', 'over_5'])),
  career_stage        text check (career_stage = any (array['first_job', 'changing', 'returning', 'growing'])),
  main_device         text check (main_device = any (array['smartphone', 'laptop', 'desktop', 'tablet', 'shared'])),
  internet            text check (internet = any (array['mobile_data', 'home_wifi', 'public_wifi', 'limited'])),
  study_hours         text check (study_hours = any (array['under_3', '3_5', '6_10', 'over_10'])),
  heard_from          text check (heard_from = any (array['whatsapp', 'friend', 'chapter', 'school', 'social', 'linkedin', 'search', 'radio_tv', 'partner', 'other'])),
  available_from      text check (available_from = any (array['now', '1_month', '3_months', 'later'])),
  min_pay_band        text check (min_pay_band = any (array['under_1000', '1000_2000', '2000_3500', '3500_5000', 'over_5000'])),
  study_times         text[] not null default '{}' check (study_times <@ array['morning', 'afternoon', 'evening', 'weekend']),
  industries          text[] not null default '{}' check (industries <@ array['tech', 'finance', 'telecoms', 'agriculture', 'retail', 'media', 'health', 'education', 'ngo', 'government', 'hospitality', 'logistics', 'energy']),
  languages           text[] not null default '{}' check (languages <@ array['english', 'twi', 'dagbani', 'ewe', 'ga', 'hausa', 'fante', 'dagaare', 'gonja', 'french', 'other']),
  work_styles         text[] not null default '{}' check (work_styles <@ array['remote', 'on_site', 'hybrid']),
  work_regions        text[] not null default '{}' check (work_regions <@ array['ahafo', 'ashanti', 'bono', 'bono_east', 'central', 'eastern', 'greater_accra', 'north_east', 'northern', 'oti', 'savannah', 'upper_east', 'upper_west', 'volta', 'western', 'western_north']),
  learning_styles     text[] not null default '{}' check (learning_styles <@ array['video', 'reading', 'practice', 'group']),
  tracks              text[] not null default '{}'
                        check (cardinality(tracks) <= 10
                               and array_to_string(tracks, ',') ~ '^([a-z0-9][a-z0-9-]{0,79}(,|$))*$'),
  willing_to_relocate boolean,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.learner_profiles is
  'Learner profile v2: optional answers about goals, access, interests, languages, work and learning preferences. Never a readiness score input. Described on /privacy#learner-profile.';
comment on column public.learner_profiles.min_pay_band is
  'Lowest monthly pay the learner would accept, as a band. A matching filter only; never shown to employers.';
comment on column public.learner_profiles.tracks is
  'Roadmap slugs the learner is interested in (up to 10).';

create trigger learner_profiles_updated_at
  before update on public.learner_profiles
  for each row execute function private.set_updated_at();

alter table public.learner_profiles enable row level security;

create policy "Members read their own learner profile, admins read all"
  on public.learner_profiles for select to authenticated
  using (profile_id = (select auth.uid()) or (select private.is_admin()));

create policy "Members add their own learner profile"
  on public.learner_profiles for insert to authenticated
  with check (profile_id = (select auth.uid()));

create policy "Members change their own learner profile"
  on public.learner_profiles for update to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

revoke all on public.learner_profiles from public, anon, authenticated;
grant select, insert, update on public.learner_profiles to authenticated;
