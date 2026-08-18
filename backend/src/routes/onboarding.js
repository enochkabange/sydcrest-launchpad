/**
 * Onboarding — PLATFORM_SPEC.md §5. Mixes mentee-authenticated self-
 * service (device check, orientation) with a public guardian-facing
 * confirmation, same "mixed trust boundary, gate per route" shape as
 * applications.js, so this is its own router rather than living under an
 * existing one with a blanket auth gate.
 *
 * Guardian consent has no real email service behind it — this codebase
 * has never wired up Resend or any general-purpose outbound mailer (a
 * known, separately-tracked gap; Supabase Auth's own password-reset
 * email can't be reused here since a guardian has no Supabase Auth
 * account for it to target). The token/link this generates is real and
 * secure; its *delivery* is manual — an admin copies the link from
 * PATCH /api/admin/enrollments/:id/guardian-email and relays it to the
 * guardian directly. Same honest "not auto-sent, here's what to do
 * instead" pattern as services/hubtel.js and services/whatsapp.js.
 */
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { auth } = require('../middleware/auth');

async function getActiveEnrollment(menteeId) {
  const { data } = await supabase
    .from('enrollments')
    .select('*, cohorts(name)')
    .eq('mentee_id', menteeId)
    .order('enrolled_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

// GET /api/onboarding/me – the caller's most recent enrollment's
// onboarding state, plus their buddy's name if paired.
router.get('/me', auth, async (req, res) => {
  const enrollment = await getActiveEnrollment(req.user.id);
  if (!enrollment) return res.status(404).json({ error: 'No enrollment found' });

  let buddy = null;
  if (enrollment.buddy_id) {
    const { data } = await supabase.from('profiles').select('full_name').eq('id', enrollment.buddy_id).single();
    buddy = data;
  }

  res.json({ enrollment: { ...enrollment, buddy_name: buddy?.full_name ?? null } });
});

// POST /api/onboarding/device-check
router.post('/device-check', auth, [
  body('device_type').optional({ nullable: true }).trim(),
  body('data_plan').optional({ nullable: true }).trim(),
  body('availability_hours').optional({ nullable: true }).trim(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const enrollment = await getActiveEnrollment(req.user.id);
  if (!enrollment) return res.status(404).json({ error: 'No enrollment found' });

  const { device_type, data_plan, availability_hours } = req.body;
  const { data, error } = await supabase
    .from('enrollments')
    .update({ device_type, data_plan, availability_hours, device_check_completed_at: new Date().toISOString() })
    .eq('id', enrollment.id)
    .select().single();
  if (error) return res.status(400).json({ error: error.message });

  res.json({ enrollment: data });
});

// POST /api/onboarding/orientation-complete
router.post('/orientation-complete', auth, async (req, res) => {
  const enrollment = await getActiveEnrollment(req.user.id);
  if (!enrollment) return res.status(404).json({ error: 'No enrollment found' });

  const { data, error } = await supabase
    .from('enrollments')
    .update({ orientation_completed_at: new Date().toISOString() })
    .eq('id', enrollment.id)
    .select().single();
  if (error) return res.status(400).json({ error: error.message });

  res.json({ enrollment: data });
});

// GET /api/onboarding/guardian-consent/:token – public. Returns only
// what a guardian needs to recognize the request, not the enrollment's
// internal state.
router.get('/guardian-consent/:token', async (req, res) => {
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('guardian_consent_confirmed_at, mentee_id, cohorts(name)')
    .eq('guardian_consent_token', req.params.token)
    .maybeSingle();
  if (!enrollment) return res.status(404).json({ error: 'This consent link is invalid.' });

  const { data: mentee } = await supabase.from('profiles').select('full_name').eq('id', enrollment.mentee_id).single();

  res.json({
    mentee_name: mentee?.full_name,
    cohort_name: enrollment.cohorts?.name,
    already_confirmed: Boolean(enrollment.guardian_consent_confirmed_at),
  });
});

// POST /api/onboarding/guardian-consent/:token – public.
router.post('/guardian-consent/:token', async (req, res) => {
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id, guardian_consent_confirmed_at')
    .eq('guardian_consent_token', req.params.token)
    .maybeSingle();
  if (!enrollment) return res.status(404).json({ error: 'This consent link is invalid.' });
  if (enrollment.guardian_consent_confirmed_at) return res.json({ success: true, already_confirmed: true });

  const { error } = await supabase
    .from('enrollments')
    .update({ guardian_consent_confirmed_at: new Date().toISOString() })
    .eq('id', enrollment.id);
  if (error) return res.status(400).json({ error: error.message });

  res.json({ success: true });
});

module.exports = router;
