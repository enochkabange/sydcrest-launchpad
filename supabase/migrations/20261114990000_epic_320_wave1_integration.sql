-- Integration of epic #320 wave 1 (readiness #328, early warning #325/#330,
-- content quality #326, experiments #327, outcomes #329). Each unit's
-- migration redefined two shared functions with only its own additions; the
-- last one applied wins, so this migration (after all of them) defines both
-- with everything:
-- 1. private.is_event_name: every accepted event name (union of all units).
-- 2. public.run_analytics_maintenance: rollups, first touch, learner
--    attributes, readiness, risk (reads fresh attributes), then the purge.

create or replace function private.is_event_name(p_name text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select p_name = any (array[
    'page_view', 'web_vital', 'form_started', 'form_submitted', 'share_clicked', 'client_error',
    'server_error', 'action_failed', 'signup', 'sign_in', 'sign_out', 'welcome_completed',
    'password_reset_requested', 'password_updated', 'profile_updated', 'public_profile_updated',
    'whatsapp_consent_set', 'display_prefs_saved', 'milestone_posts_set', 'waitlist_joined',
    'quiz_run', 'path_saved', 'path_viewed', 'lesson_opened', 'node_started', 'quiz_submitted',
    'node_completed', 'review_completed', 'weekly_goal_set', 'study_buddy_message',
    'skill_quiz_submitted', 'skill_portfolio_submitted', 'skill_portfolio_reviewed',
    'path_skills_claimed', 'application_submitted', 'application_withdrawn', 'application_decided',
    'specialisation_chosen', 'submission_saved', 'submission_graded', 'peer_review_assigned',
    'peer_review_submitted', 'learner_deferred', 'certificate_issued', 'certificate_revoked',
    'expert_applied', 'expert_application_decided', 'offer_created', 'offer_updated',
    'booking_requested', 'booking_status_changed', 'booking_message_sent', 'booking_reviewed',
    'brief_created', 'pitch_submitted', 'pitch_withdrawn', 'pitch_decided', 'opportunity_created',
    'opportunity_reported', 'opportunity_saved', 'opportunity_unsaved', 'outcome_reported',
    'outcome_decided', 'talent_listing_saved', 'talent_contact_requested',
    'talent_contact_responded', 'organisation_created', 'organisation_member_invited',
    'organisation_invite_accepted', 'organisation_decided', 'post_created', 'reply_created',
    'reaction_set', 'content_reported', 'content_moderated', 'event_rsvp', 'event_checked_in',
    'event_feedback_sent', 'chapter_joined', 'chapter_left', 'profile_followed',
    'profile_reported', 'invite_sent', 'notification_opened', 'notifications_read_all',
    'visit_started', 'learner_profile_saved', 'profile_field_updated', 'session_started',
    'lesson_left', 'resource_opened', 'quiz_question_answered', 'quiz_retried', 'search_performed',
    'filter_applied', 'submission_resubmitted', 'deadline_met', 'deadline_missed',
    'opportunity_viewed', 'opportunity_apply_opened', 'opportunity_applied',
    'opportunity_application_withdrawn', 'opportunity_applicant_moved', 'mentor_contact_logged',
    'lesson_feedback_given', 'experiment_exposed', 'outcome_checkin_sent',
    'outcome_checkin_answered'
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed', 'node_opened',
    'path_quiz_started', 'path_quiz_completed', 'achievement_shared', 'profile_published'
  ]);
$$;

create or replace function public.run_analytics_maintenance(p_days integer default 3)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_days integer := least(greatest(coalesce(p_days, 3), 1), 400);
  v_to date := (now() at time zone 'UTC')::date;
  v_from date := v_to - (v_days - 1);
  v_purged integer;
  v_linked integer;
  v_learners integer;
  v_readiness integer;
  v_risk integer;
begin
  perform private.refresh_analytics_rollups(v_from, v_to);
  -- Link before the purge, while the visits are still there; attributes read the first touch.
  v_linked := private.link_first_touch();
  v_learners := private.refresh_learner_attributes();
  v_readiness := private.refresh_readiness();
  -- Risk reads the fresh attributes.
  v_risk := private.refresh_learner_risk();
  v_purged := private.purge_old_events();
  return jsonb_build_object('from', v_from, 'to', v_to, 'purged', v_purged, 'linked', v_linked,
                            'learners', v_learners, 'readiness', v_readiness, 'risk', v_risk);
end;
$$;

comment on function public.run_analytics_maintenance(integer) is
  'Daily cron (service role): rebuilds the analytics rollups for the last p_days UTC days, keeps new members'' first touch, recomputes learner_attributes, readiness_scores and learner_risk, and deletes raw events older than 13 months.';
