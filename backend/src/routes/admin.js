const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { supabase } = require('../config/supabase');
const { auth, requireLevel, audit } = require('../middleware/auth');
const { TRACKS: DMP_TRACKS, buildWeeks } = require('../data/dmp-curriculum');

// All admin routes require at least cohort_admin level
router.use(auth, requireLevel('cohort_admin'));

// ── PLATFORM STATS (platform_admin+) ─────────────────────────
router.get('/stats', requireLevel('platform_admin'), async (req, res) => {
  const [mentees, mentors, cohorts, bookings, projects, revenue] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'mentee'),
    supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'mentor'),
    supabase.from('cohorts').select('id', { count: 'exact' }).eq('is_active', true),
    supabase.from('bookings').select('total_amount').eq('payment_status', 'released'),
    supabase.from('projects').select('id', { count: 'exact' }).eq('status', 'approved'),
    supabase.from('bookings').select('total_amount').eq('payment_status', 'released'),
  ]);

  const totalRevenue = (revenue.data || []).reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);
  const platformFee = totalRevenue * 0.15;

  res.json({
    mentees: mentees.count || 0,
    mentors: mentors.count || 0,
    active_cohorts: cohorts.count || 0,
    approved_projects: projects.count || 0,
    total_gmv: totalRevenue.toFixed(2),
    platform_revenue: platformFee.toFixed(2),
  });
});

// ── USER MANAGEMENT (platform_admin+) ─────────────────────────
router.get('/users', requireLevel('platform_admin'), async (req, res) => {
  const { role, region, status, search, page = 1, limit = 50 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let query = supabase.from('profiles').select('*', { count: 'estimated' });
  if (role) query = query.eq('role', role);
  if (region) query = query.eq('region', region);
  if (status === 'active') query = query.eq('is_active', true);
  if (status === 'inactive') query = query.eq('is_active', false);
  if (search) query = query.ilike('full_name', `%${search}%`);
  query = query.order('created_at', { ascending: false }).range(offset, offset + parseInt(limit) - 1);

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ users: data, total: count, page: parseInt(page), limit: parseInt(limit) });
});

// PATCH /api/admin/users/:id – update user (deactivate, change role)
router.patch('/users/:id', requireLevel('platform_admin'), audit('user.update'), async (req, res) => {
  const allowed = ['is_active', 'role', 'region', 'bio'];
  // super_admin can change roles, platform_admin can only deactivate
  if (req.body.role && req.user.role !== 'super_admin')
    return res.status(403).json({ error: 'Only super_admin can change roles' });

  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const { data, error } = await supabase.from('profiles').update(updates).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data });
});

// POST /api/admin/users/:id/reset-password – force password reset
router.post('/users/:id/reset-password', requireLevel('super_admin'), async (req, res) => {
  // Increment token_version to invalidate all existing JWTs
  await supabase.from('profiles').update({ token_version: supabase.sql`coalesce(token_version, 0) + 1` }).eq('id', req.params.id);
  res.json({ success: true, message: 'All sessions invalidated. User must log in again.' });
});

// ── COHORT MANAGEMENT ─────────────────────────────────────────
// ── PROGRAMS (PLATFORM_SPEC.md §2) ────────────────────────────
// The entity cohorts attach to. Read is cohort_admin+ (same as this
// router's own base gate) — anyone who creates a cohort needs to see the
// options. Write is platform_admin+, same level POST /cohorts already
// requires — a new program is a bigger structural decision than a cohort.
router.get('/programs', async (req, res) => {
  const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ programs: data });
});

router.post('/programs', requireLevel('platform_admin'), audit('program.create'), async (req, res) => {
  const { name, slug, description, duration_weeks, eligibility_min_age, eligibility_max_age, eligibility_notes, certification_criteria } = req.body;
  if (!name || !slug) return res.status(400).json({ error: 'name and slug required' });

  const { data, error } = await supabase
    .from('programs')
    .insert({ name, slug, description, duration_weeks, eligibility_min_age, eligibility_max_age, eligibility_notes, certification_criteria })
    .select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ program: data });
});

router.patch('/programs/:id', requireLevel('platform_admin'), audit('program.update'), async (req, res) => {
  const { data, error } = await supabase.from('programs').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ program: data });
});

router.get('/cohorts', async (req, res) => {
  let query = supabase.from('cohorts').select('*, profiles!mentor_id(full_name, email), enrollments(count)');
  // cohort_admin only sees their own cohorts
  if (!['platform_admin', 'super_admin'].includes(req.user.role))
    query = query.eq('mentor_id', req.user.id);

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ cohorts: data });
});

router.post('/cohorts', requireLevel('platform_admin'), audit('cohort.create'), async (req, res) => {
  const { name, track, program_id, mentor_id, start_date, end_date, total_weeks, max_size } = req.body;
  const { data, error } = await supabase.from('cohorts')
    .insert({ name, track, program_id, mentor_id, start_date, end_date, total_weeks, max_size })
    .select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ cohort: data });
});

router.patch('/cohorts/:id', requireLevel('cohort_admin'), async (req, res) => {
  // requireLevel only checks the caller's role, not that this is THEIR
  // cohort — a cohort_admin could otherwise edit any cohort in the
  // platform, not just the ones they run. platform_admin+ bypass this,
  // matching the read-side scoping in GET /cohorts above.
  if (!['platform_admin', 'super_admin'].includes(req.user.role)) {
    const { data: cohort } = await supabase.from('cohorts').select('mentor_id').eq('id', req.params.id).single();
    if (!cohort || cohort.mentor_id !== req.user.id)
      return res.status(403).json({ error: 'You do not run this cohort' });
  }

  const { data, error } = await supabase.from('cohorts').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ cohort: data });
});

function isMinor(dateOfBirth) {
  if (!dateOfBirth) return false;
  const dob = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) age--;
  return age < 18;
}

// POST /api/admin/cohorts/:id/enroll – PLATFORM_SPEC.md §5's guardian-
// consent auto-flag lives here: for each mentee, their most recent
// *accepted* application (§3) already has a date_of_birth from admissions
// review — if it implies a minor, the new enrollment is created with
// guardian_consent_required: true automatically. No separate "flag this
// mentee" admin action, no new roster UI just for this rare case.
router.post('/cohorts/:id/enroll', requireLevel('platform_admin'), async (req, res) => {
  const { mentee_ids } = req.body;

  const { data: mentees } = await supabase.from('profiles').select('id, email').in('id', mentee_ids);
  const emailById = new Map((mentees ?? []).map((m) => [m.id, m.email]));

  const rows = await Promise.all(mentee_ids.map(async (id) => {
    const email = emailById.get(id);
    let guardian_consent_required = false;
    if (email) {
      const { data: application } = await supabase
        .from('applications')
        .select('date_of_birth')
        .eq('email', email)
        .eq('status', 'accepted')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      guardian_consent_required = isMinor(application?.date_of_birth);
    }
    return { mentee_id: id, cohort_id: req.params.id, guardian_consent_required };
  }));

  const { data, error } = await supabase.from('enrollments').insert(rows).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ enrolled: data.length, guardian_consent_flagged: data.filter((e) => e.guardian_consent_required).length });
});

// GET /api/admin/cohorts/:id/enrollments – the onboarding roster
// (PLATFORM_SPEC.md §5): each enrolled mentee plus device-check/
// orientation/buddy/guardian-consent status. Same ownership scoping as
// PATCH /cohorts/:id — a cohort_admin only sees their own cohort's roster.
router.get('/cohorts/:id/enrollments', async (req, res) => {
  if (!['platform_admin', 'super_admin'].includes(req.user.role)) {
    const { data: cohort } = await supabase.from('cohorts').select('mentor_id').eq('id', req.params.id).single();
    if (!cohort || cohort.mentor_id !== req.user.id)
      return res.status(403).json({ error: 'You do not run this cohort' });
  }

  const { data, error } = await supabase
    .from('enrollments')
    .select('*, profiles!mentee_id(full_name, email)')
    .eq('cohort_id', req.params.id)
    .order('enrolled_at', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ enrollments: data });
});

// POST /api/admin/cohorts/:id/pair-buddies – idempotent, same shape as
// assign-curriculum: only pairs mentees who don't already have a
// buddy_id. Odd one out is left unpaired (documented, not a group-of-
// three) — safe to re-run after new enrollments land.
router.post('/cohorts/:id/pair-buddies', requireLevel('cohort_admin'), audit('cohort.pair_buddies'), async (req, res) => {
  if (!['platform_admin', 'super_admin'].includes(req.user.role)) {
    const { data: cohort } = await supabase.from('cohorts').select('mentor_id').eq('id', req.params.id).single();
    if (!cohort || cohort.mentor_id !== req.user.id)
      return res.status(403).json({ error: 'You do not run this cohort' });
  }

  const { data: unpaired, error } = await supabase
    .from('enrollments')
    .select('id, mentee_id')
    .eq('cohort_id', req.params.id)
    .is('buddy_id', null);
  if (error) return res.status(500).json({ error: error.message });

  // Fisher-Yates shuffle so pairing isn't just enrollment order.
  const shuffled = [...unpaired];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  let paired = 0;
  for (let i = 0; i + 1 < shuffled.length; i += 2) {
    const [a, b] = [shuffled[i], shuffled[i + 1]];
    await supabase.from('enrollments').update({ buddy_id: b.mentee_id }).eq('id', a.id);
    await supabase.from('enrollments').update({ buddy_id: a.mentee_id }).eq('id', b.id);
    paired += 2;
  }

  res.json({ paired, unpaired_leftover: shuffled.length % 2 });
});

// PATCH /api/admin/enrollments/:id/guardian-email – sets the guardian's
// email and generates a fresh consent token, returning the confirmation
// URL for the admin to relay directly (see onboarding.js's header
// comment on why this isn't auto-sent).
router.patch('/enrollments/:id/guardian-email', requireLevel('cohort_admin'), audit('enrollment.guardian_email_set'), async (req, res) => {
  const { guardian_email } = req.body;
  if (!guardian_email) return res.status(400).json({ error: 'guardian_email required' });

  const { data: enrollment } = await supabase.from('enrollments').select('guardian_consent_required').eq('id', req.params.id).single();
  if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
  if (!enrollment.guardian_consent_required)
    return res.status(400).json({ error: 'This enrollment was not flagged as needing guardian consent.' });

  const token = crypto.randomBytes(16).toString('hex');
  const { data, error } = await supabase
    .from('enrollments')
    .update({ guardian_email, guardian_consent_token: token })
    .eq('id', req.params.id)
    .select().single();
  if (error) return res.status(400).json({ error: error.message });

  res.json({ enrollment: data, confirmation_url: `${process.env.CLIENT_URL}/guardian-consent/${token}` });
});

// POST /api/admin/cohorts/:id/assign-curriculum – give the real DMP
// curriculum (data/dmp-curriculum.js) to every mentee currently enrolled in
// this cohort. Idempotent by design: skips any mentee who already has a
// learning_paths row for this cohort, so it's safe to re-run after new
// enrollments land rather than needing an auto-assign-on-enroll trigger.
router.post('/cohorts/:id/assign-curriculum', requireLevel('cohort_admin'), audit('cohort.assign_curriculum'), async (req, res) => {
  const { track } = req.body;
  if (!DMP_TRACKS.includes(track))
    return res.status(400).json({ error: `track must be one of: ${DMP_TRACKS.join(', ')}` });

  // Same ownership scoping as PATCH /cohorts/:id above.
  if (!['platform_admin', 'super_admin'].includes(req.user.role)) {
    const { data: cohort } = await supabase.from('cohorts').select('mentor_id').eq('id', req.params.id).single();
    if (!cohort || cohort.mentor_id !== req.user.id)
      return res.status(403).json({ error: 'You do not run this cohort' });
  }

  const { data: enrollments, error: enrollError } = await supabase
    .from('enrollments').select('mentee_id').eq('cohort_id', req.params.id);
  if (enrollError) return res.status(500).json({ error: enrollError.message });
  if (!enrollments.length) return res.json({ assigned: 0 });

  const { data: existingPaths, error: existingError } = await supabase
    .from('learning_paths').select('mentee_id').eq('cohort_id', req.params.id);
  if (existingError) return res.status(500).json({ error: existingError.message });
  const alreadyAssigned = new Set(existingPaths.map((p) => p.mentee_id));

  const toAssign = enrollments.map((e) => e.mentee_id).filter((id) => !alreadyAssigned.has(id));
  if (!toAssign.length) return res.json({ assigned: 0 });

  const weeks = buildWeeks(track);
  let assigned = 0;
  for (const mentee_id of toAssign) {
    const { data: path, error: pathError } = await supabase
      .from('learning_paths')
      .insert({ mentee_id, cohort_id: req.params.id, title: 'Delta Mentoring Program', track, total_weeks: weeks.length })
      .select().single();
    if (pathError) return res.status(400).json({ error: pathError.message });

    const { error: weeksError } = await supabase
      .from('learning_weeks').insert(weeks.map((w) => ({ ...w, path_id: path.id })));
    if (weeksError) return res.status(400).json({ error: weeksError.message });

    assigned += 1;
  }

  res.json({ assigned });
});

// ── AUDIT LOGS (super_admin only) ────────────────────────────
router.get('/audit-logs', requireLevel('super_admin'), async (req, res) => {
  const { user_id, action, from, to, page = 1 } = req.query;
  const offset = (parseInt(page) - 1) * 100;
  let query = supabase.from('audit_logs')
    .select('*, profiles!user_id(full_name, email)', { count: 'estimated' })
    .order('created_at', { ascending: false }).range(offset, offset + 99);
  if (user_id) query = query.eq('user_id', user_id);
  if (action) query = query.eq('action', action);
  if (from) query = query.gte('created_at', from);
  if (to) query = query.lte('created_at', to);
  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ logs: data, total: count });
});

// ── SYSTEM SETTINGS (super_admin only) ──────────────────────
router.get('/settings', requireLevel('super_admin'), async (req, res) => {
  const { data } = await supabase.from('system_settings').select('*');
  const settings = Object.fromEntries((data || []).map(s => [s.key, s.value]));
  res.json({ settings });
});

router.patch('/settings', requireLevel('super_admin'), audit('settings.update'), async (req, res) => {
  const updates = Object.entries(req.body).map(([key, value]) => ({ key, value: String(value) }));
  for (const u of updates) {
    await supabase.from('system_settings').upsert(u, { onConflict: 'key' });
  }
  res.json({ success: true });
});

// ── ANALYTICS ────────────────────────────────────────────────
router.get('/analytics', requireLevel('platform_admin'), async (req, res) => {
  const [weeklySignups, projectScores, bookingRevenue, atRiskCount] = await Promise.all([
    supabase.from('profiles').select('created_at').gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString()),
    supabase.from('projects').select('final_score').not('final_score', 'is', null),
    supabase.from('bookings').select('total_amount, created_at').eq('payment_status', 'released').gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString()),
    supabase.from('enrollments').select('id', { count: 'exact' }).eq('status', 'at_risk'),
  ]);

  const scores = projectScores.data?.map(p => p.final_score) || [];
  const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
  const monthlyRevenue = (bookingRevenue.data || []).reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);

  res.json({
    weekly_signups: weeklySignups.data?.length || 0,
    avg_project_score: avgScore,
    monthly_marketplace_revenue: monthlyRevenue.toFixed(2),
    at_risk_mentees: atRiskCount.count || 0,
  });
});

module.exports = router;
