/**
 * Mentor session routes — booking and attendance.
 *
 * Backed by the `sessions` table. Timezones matter the moment a diaspora
 * mentor joins: store UTC, render in the learner's zone (scheduled_at is
 * timestamptz end to end — the client is responsible for local rendering).
 *
 * Unpaid, cohort-scoped 1:1s — not the paid marketplace (`bookings`,
 * `mentor_listings`), which stays deferred to Phase F per marketplace.js.
 * A session can only be booked between a mentee and the mentor who
 * actually runs their cohort, not any two arbitrary users.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { auth } = require('../middleware/auth');

/* True if `menteeId` is enrolled in a cohort that `mentorId` runs. Guards
   session creation the same way canReviewCohort guards project review in
   projects.js — real relationship, not "any mentor can book any mentee". */
async function isRealMentorship(menteeId, mentorId) {
  const { data } = await supabase
    .from('enrollments')
    .select('id, cohorts!inner(mentor_id)')
    .eq('mentee_id', menteeId)
    .eq('cohorts.mentor_id', mentorId)
    .maybeSingle();
  return data != null;
}

router.use(auth);

// GET /api/sessions – mentee: sessions where they're the mentee. mentor/
// cohort_admin: sessions where they're the mentor. platform_admin+: all.
router.get('/', async (req, res) => {
  let query = supabase
    .from('sessions')
    .select('*, mentee:profiles!mentee_id(full_name, email), mentor:profiles!mentor_id(full_name, email)')
    .order('scheduled_at', { ascending: true });

  if (req.user.role === 'mentee') query = query.eq('mentee_id', req.user.id);
  else if (['mentor', 'cohort_admin'].includes(req.user.role)) query = query.eq('mentor_id', req.user.id);
  // platform_admin / super_admin: no filter.

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ sessions: data });
});

// POST /api/sessions – either side can propose one; the caller supplies the
// OTHER party's id, their own comes from the token.
router.post('/', async (req, res) => {
  const { scheduled_at, duration_mins, session_type, meet_link, cohort_id } = req.body;
  if (!scheduled_at) return res.status(400).json({ error: 'scheduled_at required' });

  let mentee_id, mentor_id;
  if (req.user.role === 'mentee') {
    mentee_id = req.user.id;
    mentor_id = req.body.mentor_id;
  } else if (['mentor', 'cohort_admin'].includes(req.user.role)) {
    mentor_id = req.user.id;
    mentee_id = req.body.mentee_id;
  } else {
    return res.status(403).json({ error: 'Only a mentee or mentor can book a session' });
  }
  if (!mentee_id || !mentor_id) return res.status(400).json({ error: 'mentee_id and mentor_id required' });

  if (!(await isRealMentorship(mentee_id, mentor_id)))
    return res.status(403).json({ error: 'This mentee is not enrolled in a cohort you run' });

  const { data, error } = await supabase
    .from('sessions')
    .insert({ mentee_id, mentor_id, cohort_id, scheduled_at, duration_mins, session_type, meet_link, status: 'scheduled' })
    .select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ session: data });
});

// PATCH /api/sessions/:id – either participant reschedules, adds their own
// notes, or cancels. platform_admin+ can edit any session.
router.patch('/:id', async (req, res) => {
  const { data: session } = await supabase.from('sessions').select('*').eq('id', req.params.id).single();
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const isParticipant = session.mentee_id === req.user.id || session.mentor_id === req.user.id;
  const isAdmin = ['platform_admin', 'super_admin'].includes(req.user.role);
  if (!isParticipant && !isAdmin) return res.status(404).json({ error: 'Session not found' });

  const allowed = ['scheduled_at', 'duration_mins', 'meet_link', 'status'];
  if (session.mentor_id === req.user.id || isAdmin) allowed.push('mentor_notes');
  if (session.mentee_id === req.user.id || isAdmin) allowed.push('mentee_notes');

  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'No valid fields to update' });

  const { data, error } = await supabase.from('sessions').update(updates).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ session: data });
});

// POST /api/sessions/:id/attendance – mark a session completed. Rating is
// the mentee rating the mentor's session, so only the mentee can set it.
router.post('/:id/attendance', async (req, res) => {
  const { data: session } = await supabase.from('sessions').select('*').eq('id', req.params.id).single();
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const isMentee = session.mentee_id === req.user.id;
  const isMentor = session.mentor_id === req.user.id;
  if (!isMentee && !isMentor) return res.status(404).json({ error: 'Session not found' });

  const updates = { status: 'completed' };
  if (isMentee && req.body.rating != null) updates.rating = req.body.rating;

  const { data, error } = await supabase.from('sessions').update(updates).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ session: data });
});

module.exports = router;
