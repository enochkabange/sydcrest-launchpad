/**
 * Learning routes — curriculum delivery, progress, AI study buddy.
 *
 * The core loop. `learning_paths`, `learning_weeks`, and `chat_messages`
 * already exist in schema.sql; this is where the 12-week DMP curriculum is
 * served and where Study Buddy streams over SSE.
 *
 * Phase C (AI path/quiz generation, chat) is implemented below using the
 * model decision in services/claude.js (Sonnet 5, MASTER_PLAN §11) — every
 * route is gated by requireAI, which 503s cleanly until ANTHROPIC_API_KEY
 * is actually set, same convention as Hubtel in marketplace.js.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { auth, audit } = require('../middleware/auth');
const { client, MODEL, requireAI, requireDailyAiCap, parseJsonResponse } = require('../services/claude');

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

// POST /api/learning/paths/generate – { track, total_weeks?, goals? }
router.post('/paths/generate', requireAI, requireDailyAiCap, audit('ai.path_generate'), async (req, res) => {
  const { track, total_weeks = 12, goals } = req.body;
  if (!track) return res.status(400).json({ error: 'track required' });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: 'You design practical, project-based coding curricula for self-taught tech talent in Ghana with limited bandwidth and low-end Android devices. Respond ONLY with valid JSON, no prose.',
      messages: [{
        role: 'user',
        content: `Design a ${total_weeks}-week ${track} curriculum.${goals ? ` Learner's stated goal: ${goals}.` : ''}
Each week builds on the last. Assignments should be small enough to finish on a phone hotspot connection.

Respond ONLY in this exact JSON shape:
{"title":"","tagline":"","weeks":[{"week_number":1,"theme":"","objectives":["",""],"resource_name":"","resource_url":"","assignment":""}]}`,
      }],
    });

    const text = response.content.map((b) => b.text || '').join('');
    const generated = parseJsonResponse(text);

    const { data: path, error: pathError } = await supabase
      .from('learning_paths')
      .insert({
        mentee_id: req.user.id, title: generated.title, tagline: generated.tagline,
        track, total_weeks: generated.weeks.length, raw_json: generated,
      })
      .select().single();
    if (pathError) return res.status(400).json({ error: pathError.message });

    const weeks = generated.weeks.map((w) => ({ ...w, path_id: path.id }));
    const { error: weeksError } = await supabase.from('learning_weeks').insert(weeks);
    if (weeksError) return res.status(400).json({ error: weeksError.message });

    res.status(201).json({ path });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Curriculum generation failed' });
  }
});

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

// POST /api/learning/chat – Study Buddy, streamed over SSE. { messages, context? }
// Persists both sides of the exchange to chat_messages so history survives
// a refresh — the client still sends full `messages` each call rather than
// this route reloading history itself, matching opportunities.js's
// /:id/assistant pattern.
router.post('/chat', requireAI, requireDailyAiCap, audit('ai.chat'), async (req, res) => {
  const { messages, context } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: 'messages required' });

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  if (lastUserMessage) {
    await supabase.from('chat_messages').insert({ mentee_id: req.user.id, role: 'user', content: lastUserMessage.content, context });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // First name only, per MASTER_PLAN §6: "no PII sent to Claude beyond
  // first name + learning context."
  const firstName = req.user.full_name?.split(' ')[0] || 'there';
  const systemPrompt = `You are Study Buddy, an encouraging but precise coding tutor for ${firstName}, a self-taught learner in Ghana's Delta Mentoring Program.${context ? ` Current context: ${context}.` : ''} Explain concepts with small, concrete code examples. Never just give away an assignment's answer outright — guide toward it.`;

  let fullReply = '';
  try {
    const stream = await client.messages.stream({
      model: MODEL, max_tokens: 1000, system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        fullReply += event.delta.text;
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();

    if (fullReply) {
      await supabase.from('chat_messages').insert({ mentee_id: req.user.id, role: 'assistant', content: fullReply, context });
    }
  } catch (err) {
    console.error(err);
    if (!res.headersSent) res.status(500).json({ error: 'Study Buddy failed' });
    else res.end();
  }
});

// POST /api/learning/quiz/generate – { week_number, track }
router.post('/quiz/generate', requireAI, requireDailyAiCap, audit('ai.quiz_generate'), async (req, res) => {
  const { week_number, track } = req.body;
  if (!week_number || !track) return res.status(400).json({ error: 'week_number and track required' });

  try {
    const response = await client.messages.create({
      model: MODEL, max_tokens: 1500,
      system: 'You write short comprehension quizzes for a self-taught coding curriculum. Respond ONLY with valid JSON, no prose.',
      messages: [{
        role: 'user',
        content: `Write a 5-question multiple-choice quiz testing week ${week_number} of a ${track} curriculum. Test understanding, not memorization of trivia.

Respond ONLY in this exact JSON shape:
{"questions":[{"question":"","options":["",""," ",""],"correct_index":0}]}`,
      }],
    });

    const text = response.content.map((b) => b.text || '').join('');
    const generated = parseJsonResponse(text);

    const { data: quiz, error } = await supabase
      .from('quizzes')
      .insert({
        mentee_id: req.user.id, week_number, track,
        questions: generated.questions, max_score: generated.questions.length,
      })
      .select().single();
    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Quiz generation failed' });
  }
});

module.exports = router;
