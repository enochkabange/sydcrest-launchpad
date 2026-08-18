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
const { isMinorMentee } = require('../utils/age');
const video = require('../services/video');

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

// GET /api/sessions/roster – a mentor's own cohort mentees, for the
// "schedule a session" picker. GET /api/admin/cohorts/:id/enrollments
// does the same lookup but is gated at requireLevel('cohort_admin'), which
// excludes plain mentors — this is the mentor-reachable equivalent.
router.get('/roster', async (req, res) => {
  if (req.user.role !== 'mentor') return res.status(403).json({ error: 'Only mentors have a roster' });

  const { data: cohorts } = await supabase.from('cohorts').select('id').eq('mentor_id', req.user.id);
  const cohortIds = (cohorts ?? []).map((c) => c.id);
  if (cohortIds.length === 0) return res.json({ mentees: [] });

  const { data, error } = await supabase
    .from('enrollments')
    .select('cohort_id, guardian_consent_required, profiles!mentee_id(id, full_name)')
    .in('cohort_id', cohortIds);
  if (error) return res.status(500).json({ error: error.message });

  res.json({
    mentees: data.map((e) => ({
      id: e.profiles.id,
      full_name: e.profiles.full_name,
      cohort_id: e.cohort_id,
      is_minor: e.guardian_consent_required,
    })),
  });
});

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
//
// Safeguarding (PLATFORM_SPEC.md §11): a minor mentee never gets a
// private 1:1 video session. If the mentee is flagged
// (guardian_consent_required, via isMinorMentee), the request must be
// session_type: 'group' with at least one other attendee — a real
// DB-enforced group via session_attendees, not just a relabeled 1:1.
router.post('/', async (req, res) => {
  const { scheduled_at, duration_mins, meet_link, cohort_id, attendee_ids } = req.body;
  let session_type = req.body.session_type || '1:1';
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

  const menteeIsMinor = await isMinorMentee(supabase, mentee_id);
  if (menteeIsMinor) {
    if (session_type !== 'group' || !Array.isArray(attendee_ids) || attendee_ids.length === 0) {
      return res.status(400).json({
        error: 'This mentee is under 18 — sessions with them must be group sessions. Add at least one more attendee.',
      });
    }
    if (cohort_id) {
      const { data: validAttendees } = await supabase.from('enrollments').select('mentee_id').eq('cohort_id', cohort_id).in('mentee_id', attendee_ids);
      if ((validAttendees ?? []).length !== attendee_ids.length)
        return res.status(400).json({ error: 'All attendees must be enrolled in the same cohort' });
    }
  } else if (session_type === 'group' && (!Array.isArray(attendee_ids) || attendee_ids.length === 0)) {
    return res.status(400).json({ error: 'A group session needs at least one attendee' });
  }

  const { data, error } = await supabase
    .from('sessions')
    .insert({ mentee_id, mentor_id, cohort_id, scheduled_at, duration_mins, session_type, meet_link, status: 'scheduled' })
    .select().single();
  if (error) return res.status(400).json({ error: error.message });

  if (session_type === 'group' && Array.isArray(attendee_ids) && attendee_ids.length > 0) {
    await supabase.from('session_attendees').insert(attendee_ids.map((profile_id) => ({ session_id: data.id, profile_id })));
  }

  const room = await video.createRoom(`session-${data.id}`, { expiresAt: new Date(new Date(scheduled_at).getTime() + (duration_mins || 60) * 60000) });
  if (room.configured && room.url) {
    const { data: updated } = await supabase
      .from('sessions')
      .update({ daily_room_url: room.url, daily_room_name: room.name })
      .eq('id', data.id)
      .select().single();
    return res.status(201).json({ session: updated });
  }

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

// POST /api/sessions/:id/join – issues a per-participant Daily meeting
// token and stamps a server-side joined_at timestamp at issuance time
// (real attendance evidence, not a client-reported checkbox). 404 if the
// session has no daily_room_url — Daily wasn't configured when it was
// created, or this is a legacy plain-meet_link session; the client falls
// back to showing meet_link as a plain "Open link" affordance.
router.post('/:id/join', async (req, res) => {
  const { data: session } = await supabase.from('sessions').select('*').eq('id', req.params.id).single();
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const isMentee = session.mentee_id === req.user.id;
  const isMentor = session.mentor_id === req.user.id;
  let attendeeRow = null;
  if (!isMentee && !isMentor) {
    const { data } = await supabase.from('session_attendees').select('*').eq('session_id', session.id).eq('profile_id', req.user.id).maybeSingle();
    attendeeRow = data;
    if (!attendeeRow) return res.status(404).json({ error: 'Session not found' });
  }

  if (!session.daily_room_url) return res.status(404).json({ error: 'No video room for this session' });

  const result = await video.createMeetingToken(session.daily_room_name, { userName: req.user.full_name, isOwner: isMentor });
  if (!result.configured || result.error) return res.status(503).json({ error: result.error || 'Video is not configured' });

  const now = new Date().toISOString();
  if (isMentor) await supabase.from('sessions').update({ mentor_joined_at: now }).eq('id', session.id);
  else if (isMentee) await supabase.from('sessions').update({ mentee_joined_at: now }).eq('id', session.id);
  else await supabase.from('session_attendees').update({ joined_at: now }).eq('id', attendeeRow.id);

  res.json({ url: session.daily_room_url, token: result.token });
});

module.exports = router;
