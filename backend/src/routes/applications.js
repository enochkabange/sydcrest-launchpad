/**
 * Applications — admissions endpoints, PLATFORM_SPEC.md §3. Mounted at
 * bare /api in index.js (not /api/applications) because this router
 * defines two logical resources with different trust boundaries:
 * /programs/:slug + /applications (+/status) are public — submitting an
 * application happens before anyone has an account — while /applications
 * (GET) and /applications/:id (PATCH) are reviewer-only. Each route is
 * gated individually rather than with router.use(), which is also why
 * this doesn't live in admin.js: that router's own router.use(auth,
 * requireLevel('cohort_admin')) would block the 'reviewer' role, which
 * sits outside that hierarchy on purpose (see ROLE_LEVELS in
 * middleware/auth.js).
 */
const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const { body, query, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { auth, requireRole, audit } = require('../middleware/auth');

/* No router-wide auth gate here, unlike admin.js — this router mixes
   public routes (submit, status lookup) with reviewer-only ones (list,
   review), each gated individually. A router.use(auth, ...) would block
   the public routes; a router.use(requireLevel('cohort_admin')) would
   block the 'reviewer' role, which sits outside that hierarchy on
   purpose (see ROLE_LEVELS in middleware/auth.js). */

function generateReferenceCode() {
  return randomBytes(4).toString('hex').toUpperCase();
}

/** Same shape as the AI-generated quizzes (learning.js) and QuizBlock's
    client-side check (PathDetail.jsx) — one known shape across the
    codebase, not a second one invented for this. */
function scoreAnswers(questions, answers) {
  if (!Array.isArray(questions) || !Array.isArray(answers)) return null;
  return questions.reduce((score, q, i) => score + (answers[i] === q.correct_index ? 1 : 0), 0);
}

// GET /api/programs/:slug – public, read-only, only what an applicant
// needs to see. Deliberately not the full admin /api/admin/programs
// response (certification_criteria etc. isn't this audience's business).
router.get('/programs/:slug', async (req, res) => {
  const { data: program, error } = await supabase
    .from('programs')
    .select('id, name, slug, description, duration_weeks, eligibility_min_age, eligibility_max_age, eligibility_notes, screening_test')
    .eq('slug', req.params.slug)
    .eq('is_active', true)
    .single();
  if (error || !program) return res.status(404).json({ error: 'Program not found' });
  res.json({ program });
});

// POST /api/applications
router.post('/applications', [
  body('program_id').isUUID(),
  body('full_name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { program_id, full_name, email, phone, date_of_birth, region, gender, is_underserved, essay, screening_answers } = req.body;
  // The form sends "" for skipped optional fields — valid for a text
  // column, not for `date`, which Postgres rejects outright rather than
  // treating as null.
  const cleanDateOfBirth = date_of_birth || null;

  const { data: program } = await supabase.from('programs').select('screening_test').eq('id', program_id).single();
  if (!program) return res.status(400).json({ error: 'Unknown program' });

  const screening_score = program.screening_test?.questions
    ? scoreAnswers(program.screening_test.questions, screening_answers)
    : null;

  const { data, error } = await supabase
    .from('applications')
    .insert({
      program_id, full_name, email, phone, date_of_birth: cleanDateOfBirth, region, gender,
      is_underserved: Boolean(is_underserved), essay, screening_answers, screening_score,
      reference_code: generateReferenceCode(),
    })
    .select('reference_code').single();
  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ reference_code: data.reference_code });
});

// GET /api/applications/status?email=&reference_code= – both required.
// Reference code, not email alone, so a caller can't probe other
// applicants' status just by guessing an email address.
router.get('/applications/status', [
  query('email').isEmail().normalizeEmail(),
  query('reference_code').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { data: application } = await supabase
    .from('applications')
    .select('status, created_at, decided_at')
    .eq('email', req.query.email)
    .eq('reference_code', req.query.reference_code.toUpperCase())
    .maybeSingle();
  if (!application) return res.status(404).json({ error: 'No application found for that email and reference code' });

  res.json({ application });
});

// ── REVIEW (reviewer / platform_admin+, PLATFORM_SPEC.md §3) ──────────
const REVIEW_ROLES = ['reviewer', 'platform_admin', 'super_admin'];
const DECISION_STATUSES = ['accepted', 'waitlisted', 'rejected'];

// GET /api/applications?program_id=&status= – the review queue.
router.get('/applications', auth, requireRole(...REVIEW_ROLES), async (req, res) => {
  let q = supabase.from('applications').select('*, programs(name)').order('created_at', { ascending: true });
  if (req.query.program_id) q = q.eq('program_id', req.query.program_id);
  if (req.query.status) q = q.eq('status', req.query.status);

  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ applications: data });
});

// PATCH /api/applications/:id – record a review decision. Any
// reviewer/admin can revise a decision already made — the spot-check
// PLATFORM_SPEC.md §3 calls for, without a separate multi-reviewer table
// (50-150 applications/cycle doesn't need that machinery yet).
router.patch('/applications/:id', auth, requireRole(...REVIEW_ROLES), audit('application.review'), async (req, res) => {
  const { status, reviewer_notes } = req.body;
  if (status && !DECISION_STATUSES.includes(status) && status !== 'under_review')
    return res.status(400).json({ error: `status must be one of: under_review, ${DECISION_STATUSES.join(', ')}` });

  const updates = { reviewer_notes };
  if (status) {
    updates.status = status;
    if (DECISION_STATUSES.includes(status)) {
      updates.reviewer_id = req.user.id;
      updates.decided_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase.from('applications').update(updates).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ application: data });
});

module.exports = router;
