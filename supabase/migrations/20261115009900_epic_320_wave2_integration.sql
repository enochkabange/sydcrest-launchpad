-- Integration of epic #320 wave 2 (people console and data rights #332/#333,
-- My progress #337, matching #336). The My progress migration redefined
-- private.is_event_name with its own addition only; this migration (after all
-- of wave 2) defines it with every accepted name. run_analytics_maintenance is
-- unchanged from wave 1 (no wave 2 unit redefines it).

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
    'outcome_checkin_answered', 'progress_viewed'
    -- Phase 1 names, kept until a contract migration removes them
    'signup_started', 'signup_completed', 'onboarding_completed', 'roadmap_viewed', 'node_opened',
    'path_quiz_started', 'path_quiz_completed', 'achievement_shared', 'profile_published'
  ]);
$$;
