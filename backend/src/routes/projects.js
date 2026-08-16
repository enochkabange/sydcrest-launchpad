/**
 * Project routes — submission and mentor review.
 *
 * Phase B's exit test runs through here: a learner submits, a mentor
 * reviews. `projects` and `project_rubrics` exist in schema.sql.
 *
 * AI assessment uses the model decision in services/claude.js (Sonnet 5,
 * MASTER_PLAN §11) — gives the mentee a quick first pass before a mentor's
 * time is spent, gated by requireAI same as learning.js's AI routes.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { randomUUID } = require('crypto');
const { supabase } = require('../config/supabase');
const { auth, requireLevel } = require('../middleware/auth');
const { client, MODEL, requireAI, parseJsonResponse } = require('../services/claude');

const REVIEW_STATUSES = ['mentor_reviewed', 'revision_requested', 'approved'];

/* Memory storage, not disk — Railway's filesystem is ephemeral per deploy,
   so anything written to disk here would vanish on the next restart. The
   file only passes through this process on its way to Supabase Storage. */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // matches the bucket's own 10MB limit
});
const STORAGE_BUCKET = 'project-submissions';

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

// POST /api/projects/:id/upload – mentee attaches a file to their own
// project (screenshot, zip, PDF — bucket is public since submissions
// aren't sensitive, matching the simplicity call in the task plan).
// multer parses multipart before this handler runs; a bad/missing file
// surfaces as its own error via the error-handling middleware in index.js.
router.post('/:id/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) return res.status(400).json({ error: err.message });
    if (err) return next(err);
    next();
  });
}, async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'file required' });

  const { data: project } = await supabase.from('projects').select('mentee_id').eq('id', req.params.id).single();
  if (!project) return res.status(404).json({ error: 'Project not found' });
  if (project.mentee_id !== req.user.id) return res.status(404).json({ error: 'Project not found' });

  const ext = req.file.originalname.includes('.') ? req.file.originalname.split('.').pop() : '';
  const path = `${req.params.id}/${randomUUID()}${ext ? `.${ext}` : ''}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, req.file.buffer, { contentType: req.file.mimetype, upsert: false });
  if (uploadError) return res.status(400).json({ error: uploadError.message });

  const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);

  const { data: updated, error } = await supabase
    .from('projects')
    .update({ file_url: publicUrl })
    .eq('id', req.params.id)
    .select().single();
  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ project: updated });
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

// POST /api/projects/:id/ai-assess – mentee gets a quick first pass before
// a mentor's time is spent. Only moves status submitted -> ai_reviewed;
// never downgrades a project a mentor has already reviewed or approved.
router.post('/:id/ai-assess', requireAI, async (req, res) => {
  const { data: project } = await supabase.from('projects').select('*').eq('id', req.params.id).single();
  if (!project) return res.status(404).json({ error: 'Project not found' });
  if (project.mentee_id !== req.user.id && !(await canReviewCohort(req.user, project.cohort_id)))
    return res.status(404).json({ error: 'Project not found' });

  try {
    const response = await client.messages.create({
      model: MODEL, max_tokens: 1000,
      system: 'You give brief, constructive first-pass feedback on a coding bootcamp project submission, before a human mentor reviews it. Respond ONLY with valid JSON, no prose.',
      messages: [{
        role: 'user',
        content: `Project: "${project.title}" (week ${project.week_number})
Description: ${project.description || 'none given'}
Submission: ${project.submission_url || project.file_url || 'no link given'}

Respond ONLY in this exact JSON shape:
{"strengths":[""],"areas_to_improve":[""],"summary":"","suggested_score":0}`,
      }],
    });

    const text = response.content.map((b) => b.text || '').join('');
    const feedback = parseJsonResponse(text);

    const { data: updated, error } = await supabase
      .from('projects')
      .update({ ai_feedback: feedback, status: project.status === 'submitted' ? 'ai_reviewed' : project.status })
      .eq('id', req.params.id)
      .select().single();
    if (error) return res.status(400).json({ error: error.message });

    res.json({ project: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI assessment failed' });
  }
});

module.exports = router;
