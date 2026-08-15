/**
 * Learning routes — curriculum delivery, progress, AI study buddy.
 *
 * The core loop. `learning_paths`, `learning_weeks`, and `chat_messages`
 * already exist in schema.sql; this is where the 12-week DMP curriculum is
 * served and where Study Buddy streams over SSE.
 *
 * Phase B (curriculum delivery + progress) is implemented below. Phase C
 * (AI path/quiz generation, Study Buddy chat) is still a 501 scaffold — each
 * of those needs a model/cost decision like the one made in opportunities.js
 * (MASTER_PLAN §11), not a default picked quietly here.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { auth } = require('../middleware/auth');

const notYet = (phase) => (req, res) =>
  res.status(501).json({
    error: 'Not implemented',
    detail: `${req.method} ${req.baseUrl}${req.path} is scheduled for ${phase}.`,
  });

router.use(auth);

// GET /api/learning/paths – the caller's learning paths, with completion %
router.get('/paths', async (req, res) => {
  const { data, error } = await supabase
    .from('learning_paths')
    .select('*, learning_weeks(id, status)')
    .eq('mentee_id', req.user.id)
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });

  const paths = data.map(({ learning_weeks, ...path }) => {
    const total = learning_weeks.length;
    const completed = learning_weeks.filter((w) => w.status === 'completed').length;
    return { ...path, weeks_total: total, weeks_completed: completed, percent_complete: total ? Math.round((completed / total) * 100) : 0 };
  });

  res.json({ paths });
});

router.post('/paths/generate', notYet('Phase C'));

// GET /api/learning/weeks/:pathId – ordered curriculum for one path
router.get('/weeks/:pathId', async (req, res) => {
  const { data: path } = await supabase
    .from('learning_paths')
    .select('id, mentee_id')
    .eq('id', req.params.pathId)
    .single();
  if (!path || path.mentee_id !== req.user.id) return res.status(404).json({ error: 'Learning path not found' });

  const { data, error } = await supabase
    .from('learning_weeks')
    .select('*')
    .eq('path_id', req.params.pathId)
    .order('week_number', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ weeks: data });
});

// POST /api/learning/weeks/:weekId/complete – mark a week done, roll progress
// up into the enrollment (current_week, xp_points, streak_days).
router.post('/weeks/:weekId/complete', async (req, res) => {
  const { score } = req.body;

  const { data: week } = await supabase
    .from('learning_weeks')
    .select('*, learning_paths!inner(id, mentee_id, cohort_id)')
    .eq('id', req.params.weekId)
    .single();
  if (!week || week.learning_paths.mentee_id !== req.user.id)
    return res.status(404).json({ error: 'Week not found' });
  if (week.status === 'completed')
    return res.status(409).json({ error: 'Week already completed' });

  const { data: updatedWeek, error } = await supabase
    .from('learning_weeks')
    .update({ status: 'completed', completed_at: new Date().toISOString(), score: score ?? week.score })
    .eq('id', req.params.weekId)
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });

  // Roll into the matching enrollment, if the path is tied to a cohort.
  // Not every path is (self-directed paths can have cohort_id null), so
  // this is best-effort — the week is already saved either way.
  const cohortId = week.learning_paths.cohort_id;
  if (cohortId) {
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('mentee_id', req.user.id)
      .eq('cohort_id', cohortId)
      .single();

    if (enrollment) {
      const now = new Date();
      // last_active defaults to now() at enrollment creation, so it is
      // never actually null — it can't distinguish "never completed
      // anything" from "was active minutes ago today". xp_points can:
      // it only moves via this endpoint, so 0 means this is the first
      // week this mentee has ever completed.
      const daysSince = Math.floor((now - new Date(enrollment.last_active)) / 86400000);
      const streak_days =
        enrollment.xp_points === 0 ? 1
        : daysSince === 0 ? enrollment.streak_days
        : daysSince === 1 ? enrollment.streak_days + 1
        : 1;

      await supabase
        .from('enrollments')
        .update({
          current_week: Math.max(enrollment.current_week, week.week_number + 1),
          xp_points: enrollment.xp_points + 100,
          streak_days,
          last_active: now.toISOString(),
        })
        .eq('id', enrollment.id);
    }
  }

  res.json({ week: updatedWeek });
});

router.post('/chat', notYet('Phase C — SSE, verify streaming through the Railway proxy early'));
router.post('/quiz/generate', notYet('Phase C'));

module.exports = router;
