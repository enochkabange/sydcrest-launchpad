/**
 * Project routes — submission and mentor review.
 *
 * Phase B's exit test runs through here: a learner submits, a mentor
 * reviews. `projects` and `project_rubrics` exist in schema.sql.
 *
 * AI assessment (Phase C) is left as a 501 — same reasoning as the AI
 * endpoints in learning.js and opportunities.js: needs a model/cost
 * decision, not a default picked quietly here.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { auth, requireLevel } = require('../middleware/auth');

const notYet = (phase) => (req, res) =>
  res.status(501).json({
    error: 'Not implemented',
    detail: `${req.method} ${req.baseUrl}${req.path} is scheduled for ${phase}.`,
  });

const REVIEW_STATUSES = ['mentor_reviewed', 'revision_requested', 'approved'];

/* A mentor/cohort_admin can only review projects in a cohort they actually
   run — being ANY mentor isn't enough, or one mentor could review (and see
   feedback on) another mentor's mentees. platform_admin/super_admin see
   everything, matching the RLS policies in policies.sql. */
async function canReviewCohort(user, cohortId) {
  if (['platform_admin', 'super_admin'].includes(user.role)) return true;
  if (!['mentor', 'cohort_admin'].includes(user.role) || !cohortId) return false;
  const { data } = await supabase.from('cohorts').select('id').eq('id', cohortId).eq('mentor_id', user.id).maybeSingle();
  return data != null;
}

router.use(auth);

// GET /api/projects – mentee: own submissions. mentor/cohort_admin: projects
// in cohorts they run. platform_admin/super_admin: everything.
router.get('/', async (req, res) => {
  let query = supabase
    .from('projects')
    .select('*, profiles!mentee_id(full_name, email)')
    .order('created_at', { ascending: false });

  if (req.user.role === 'mentee') {
    query = query.eq('mentee_id', req.user.id);
  } else if (['mentor', 'cohort_admin'].includes(req.user.role)) {
    const { data: cohorts } = await supabase.from('cohorts').select('id').eq('mentor_id', req.user.id);
    const cohortIds = (cohorts || []).map((c) => c.id);
    if (cohortIds.length === 0) return res.json({ projects: [] });
    query = query.in('cohort_id', cohortIds);
  }
  // platform_admin / super_admin: no filter.

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ projects: data });
});

// POST /api/projects – mentee submits a project for a given curriculum week
router.post('/', async (req, res) => {
  if (req.user.role !== 'mentee') return res.status(403).json({ error: 'Only mentees submit projects' });

  const { cohort_id, week_number, title, description, submission_url, file_url } = req.body;
  if (!week_number || !title) return res.status(400).json({ error: 'week_number and title required' });

  const { data, error } = await supabase
    .from('projects')
    .insert({
      mentee_id: req.user.id,
      cohort_id,
      week_number,
      title,
      description,
      submission_url,
      file_url,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    })
    .select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ project: data });
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  const { data: project, error } = await supabase
    .from('projects')
    .select('*, profiles!mentee_id(full_name, email)')
    .eq('id', req.params.id)
    .single();
  if (error || !project) return res.status(404).json({ error: 'Project not found' });

  const isOwner = project.mentee_id === req.user.id;
  if (!isOwner && !(await canReviewCohort(req.user, project.cohort_id)))
    return res.status(404).json({ error: 'Project not found' });

  res.json({ project });
});

// POST /api/projects/:id/review – mentor/cohort_admin of that cohort (or
// platform_admin+) leaves feedback and moves the project out of "submitted".
router.post('/:id/review', requireLevel('mentor'), async (req, res) => {
  const { status, mentor_feedback, final_score } = req.body;
  if (!REVIEW_STATUSES.includes(status))
    return res.status(400).json({ error: `status must be one of: ${REVIEW_STATUSES.join(', ')}` });

  const { data: project } = await supabase.from('projects').select('cohort_id').eq('id', req.params.id).single();
  if (!project) return res.status(404).json({ error: 'Project not found' });
  if (!(await canReviewCohort(req.user, project.cohort_id)))
    return res.status(403).json({ error: 'You do not run this cohort' });

  const { data, error } = await supabase
    .from('projects')
    .update({ status, mentor_feedback, final_score, reviewed_at: new Date().toISOString() })
    .eq('id', req.params.id)
    .select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ project: data });
});

router.post('/:id/ai-assess', notYet('Phase C'));

module.exports = router;
