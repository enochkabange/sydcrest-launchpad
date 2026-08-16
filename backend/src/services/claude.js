/**
 * Shared Claude client for the AI features gated behind ANTHROPIC_API_KEY:
 * learning path/quiz generation, Study Buddy chat, and project AI-assess.
 *
 * Model: claude-sonnet-5, per the explicit cost decision in opportunities.js
 * (MASTER_PLAN §11) — the pilot cohort is free, so spend discipline matters
 * more than peak quality. Revisit once there's real usage data to weigh
 * against Opus 5's ~2.5x input cost.
 *
 * Same no-key-no-crash convention as services/whatsapp.js and
 * services/hubtel.js: `requireAI` middleware returns a clear 503 instead of
 * every route re-deriving its own "is this configured" check, and instead
 * of the Anthropic SDK's own auth error (opaque to a caller that doesn't
 * know this platform's env vars) reaching the client.
 */
const { supabase } = require('../config/supabase');

const enabled = Boolean(process.env.ANTHROPIC_API_KEY);
const MODEL = 'claude-sonnet-5';

// MASTER_PLAN §6 requires per-user daily caps "on top of the existing rate
// limiters" (those are per-minute, in index.js). 20/day is generous for a
// pilot-scale cohort and cheap to raise via env once there's real usage data.
const DAILY_CAP = Number(process.env.AI_DAILY_CAP) || 20;

let client = null;
if (enabled) {
  const Anthropic = require('@anthropic-ai/sdk');
  client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function requireAI(req, res, next) {
  if (!enabled) return res.status(503).json({ error: 'AI features are not configured on this platform yet.' });
  next();
}

/* Counts today's audit_logs rows this route's own audit('ai.*') middleware
   writes — no separate usage table needed, audit_logs already has the
   user_id/created_at index this needs. Fails open on a query error: a
   logging hiccup shouldn't be the thing that blocks a learner mid-lesson. */
async function requireDailyAiCap(req, res, next) {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('audit_logs')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', req.user.id)
    .like('action', 'ai.%')
    .gte('created_at', startOfDay.toISOString());

  if (error) { console.error(error); return next(); }
  if (count >= DAILY_CAP)
    return res.status(429).json({ error: `Daily AI usage limit reached (${DAILY_CAP}). Try again tomorrow.` });
  next();
}

/** Strips the ```json fences Claude sometimes wraps structured output in,
    then parses. Every AI route below asks for JSON-only output but doesn't
    fully trust that instruction was followed. */
function parseJsonResponse(text) {
  return JSON.parse(text.replace(/```json?|```/g, '').trim());
}

module.exports = { client, enabled, MODEL, DAILY_CAP, requireAI, requireDailyAiCap, parseJsonResponse };
