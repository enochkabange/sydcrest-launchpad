/**
 * Applications — admissions (PLATFORM_SPEC.md §3) and mentor-vetting
 * (§4) endpoints. Mounted at bare /api in index.js (not /api/applications)
 * because this router defines several logical resources with different
 * trust boundaries: /programs/:slug + /applications(+/status) +
 * /mentor-applications (POST) are public — submitting happens before
 * anyone has an account — while /applications, /mentor-applications
 * (GET), and their /:id (PATCH) routes are reviewer-only. Each route is
 * gated individually rather than with router.use(), which is also why
 * this doesn't live in admin.js: that router's own router.use(auth,
 * requireLevel('cohort_admin')) would block the 'reviewer' role, which
 * sits outside that hierarchy on purpose (see ROLE_LEVELS in
 * middleware/auth.js).
 *
 * mentor_applications is a separate table from applications, not a
 * variant of it — see schema.sql's own comment on why forcing the same
 * program_id-scoped shape onto mentor vetting would be a mismatch.
 */
const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const { body, query, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { auth, requireRole, audit } = require('../middleware/auth');
const { isMinor } = require('../utils/age');
const { mintAchievement } = require('../services/achievements');
const { TRACKS: DMP_TRACKS, TRACK_LABELS: DMP_TRACK_LABELS, buildWeeks } = require('../data/dmp-curriculum');

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

// GET /api/programs – public, the Programs listing page. Same field
// allowlist as GET /api/programs/:slug (screening_test omitted here —
// only the detail/apply flow needs it).
router.get('/programs', async (req, res) => {
  const { data: programs, error } = await supabase
    .from('programs')
    .select('id, name, slug, description, duration_weeks')
    .eq('is_active', true)
    .order('created_at', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ programs });
});

// GET /api/programs/:slug/curriculum – public curriculum preview for the
// Programs detail page. DMP-only for now (404 for anything else) — same
// "no second program exists yet" honesty as Apply.jsx's own comment;
// this doesn't try to generalize a curriculum shape that only one real
// program has. Themes only, not the full objectives/resources/assignment
// text — a public preview, not the whole curriculum handed out for free.
router.get('/programs/:slug/curriculum', async (req, res) => {
  if (req.params.slug !== 'dmp') return res.status(404).json({ error: 'No curriculum preview for this program' });

  const tracks = DMP_TRACKS.map((track) => ({
    track,
    label: DMP_TRACK_LABELS[track],
    weeks: buildWeeks(track).map((w) => ({ week_number: w.week_number, theme: w.theme })),
  }));
  res.json({ tracks });
});

// POST /api/partner-inquiries – public Partnerships page form, §13. Same
// "no account needed" trust boundary as /applications.
router.post('/partner-inquiries', [
  body('org_name').trim().isLength({ min: 2 }),
  body('contact_name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { org_name, contact_name, email, phone, inquiry_type, message } = req.body;
  const { error } = await supabase
    .from('partner_inquiries')
    .insert({ org_name, contact_name, email, phone, inquiry_type: inquiry_type || 'other', message });
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ success: true });
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

  const email = req.query.email;
  const referenceCode = req.query.reference_code.toUpperCase();

  const { data: application } = await supabase
    .from('applications')
    .select('status, created_at, decided_at')
    .eq('email', email)
    .eq('reference_code', referenceCode)
    .maybeSingle();
  if (application) return res.json({ application });

  // Falls back to mentor_applications — one status-lookup UX regardless
  // of which pipeline the applicant went through. Reference codes are
  // random enough that a cross-table collision isn't a real concern.
  const { data: mentorApplication } = await supabase
    .from('mentor_applications')
    .select('status, created_at, decided_at')
    .eq('email', email)
    .eq('reference_code', referenceCode)
    .maybeSingle();
  if (mentorApplication) return res.json({ application: mentorApplication });

  res.status(404).json({ error: 'No application found for that email and reference code' });
});

// POST /api/mentor-applications
router.post('/mentor-applications', [
  body('full_name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { full_name, email, phone, expertise_areas, portfolio_url, bio, reference_1_name, reference_1_contact, reference_2_name, reference_2_contact } = req.body;

  const { data, error } = await supabase
    .from('mentor_applications')
    .insert({
      full_name, email, phone, expertise_areas, portfolio_url, bio,
      reference_1_name, reference_1_contact, reference_2_name, reference_2_contact,
      reference_code: generateReferenceCode(),
    })
    .select('reference_code').single();
  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ reference_code: data.reference_code });
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

  // PLATFORM_SPEC.md §8 — accepted applicants are pre-registration
  // (ApplicationStatus.jsx's own copy: "register with the same email to
  // get started"), so this only mints if a profile already happens to
  // exist for this email. The usual apply-then-register ordering is
  // covered by auth.js's register handler instead; whichever fires
  // second is a no-op via the unique(mentee_id, type, scope_key) constraint.
  if (data.status === 'accepted') {
    const { data: profile } = await supabase.from('profiles').select('id').eq('email', data.email).maybeSingle();
    if (profile) {
      await mintAchievement({
        mentee_id: profile.id, type: 'accepted', program_id: data.program_id,
        scope_key: `accepted:${data.program_id}`, label: 'Accepted into the program',
        is_minor: isMinor(data.date_of_birth), nudge_worthy: true,
      });
    }
  }

  res.json({ application: data });
});

// GET /api/mentor-applications?status= – the mentor review queue.
router.get('/mentor-applications', auth, requireRole(...REVIEW_ROLES), async (req, res) => {
  let q = supabase.from('mentor_applications').select('*').order('created_at', { ascending: true });
  if (req.query.status) q = q.eq('status', req.query.status);

  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ applications: data });
});

// PATCH /api/mentor-applications/:id – PLATFORM_SPEC.md §4's safeguarding
// tie-in: a mentor cannot be accepted until a reviewer has confirmed
// (references_checked, set via this same route or a prior call) that the
// references were actually contacted. Rejecting/waitlisting has no such
// gate — only acceptance grants access to mentees.
router.patch('/mentor-applications/:id', auth, requireRole(...REVIEW_ROLES), audit('mentor_application.review'), async (req, res) => {
  const { status, reviewer_notes, references_checked } = req.body;
  if (status && !DECISION_STATUSES.includes(status) && status !== 'under_review')
    return res.status(400).json({ error: `status must be one of: under_review, ${DECISION_STATUSES.join(', ')}` });

  const updates = { reviewer_notes };
  if (references_checked !== undefined) updates.references_checked = Boolean(references_checked);

  if (status) {
    if (status === 'accepted') {
      const { data: current } = await supabase.from('mentor_applications').select('references_checked').eq('id', req.params.id).single();
      const willBeChecked = updates.references_checked ?? current?.references_checked;
      if (!willBeChecked)
        return res.status(400).json({ error: 'References must be checked before a mentor can be accepted.' });
    }
    updates.status = status;
    if (DECISION_STATUSES.includes(status)) {
      updates.reviewer_id = req.user.id;
      updates.decided_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase.from('mentor_applications').update(updates).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ application: data });
});

module.exports = router;
