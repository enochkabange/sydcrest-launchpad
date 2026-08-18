/**
 * Achievements — PLATFORM_SPEC.md §8. Mixes a public share page with
 * authenticated self-service (list, acknowledge), same "mixed trust
 * boundary, gate per route" shape as applications.js and onboarding.js.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { auth } = require('../middleware/auth');
const { renderOgPage, escapeHtml } = require('../utils/ogPage');

// GET /api/achievements/me?nudge=true – the caller's own achievements.
// ?nudge=true filters to nudge_worthy && !acknowledged_at, for the Learn
// banner; omit it for the quiet full list on Profile.
router.get('/achievements/me', auth, async (req, res) => {
  let q = supabase.from('achievements').select('*').eq('mentee_id', req.user.id).order('earned_at', { ascending: false });
  if (req.query.nudge === 'true') q = q.eq('nudge_worthy', true).is('acknowledged_at', null);
  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ achievements: data });
});

// POST /api/achievements/:id/acknowledge – owner-only, dismisses the nudge.
router.post('/achievements/:id/acknowledge', auth, async (req, res) => {
  const { data: achievement } = await supabase.from('achievements').select('mentee_id').eq('id', req.params.id).single();
  if (!achievement || achievement.mentee_id !== req.user.id) return res.status(404).json({ error: 'Achievement not found' });

  const { error } = await supabase.from('achievements').update({ acknowledged_at: new Date().toISOString() }).eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

// GET /api/achievements/:id – the shareable link. Server-rendered HTML
// (see utils/ogPage.js) for real Open Graph tags on a non-JS crawler.
router.get('/achievements/:id', async (req, res) => {
  const { data: achievement } = await supabase.from('achievements').select('*, profiles!mentee_id(full_name)').eq('id', req.params.id).maybeSingle();
  if (!achievement) {
    return res.status(404).send(renderOgPage(req, {
      title: 'Achievement not found', description: 'This link is invalid.',
      bodyHtml: '<h1>Not found</h1><p>This link is invalid.</p>',
    }));
  }
  if (achievement.is_minor) {
    return res.status(200).send(renderOgPage(req, {
      title: 'Achievement', description: 'This achievement is not publicly shareable.',
      bodyHtml: '<h1>Not available</h1><p>This achievement is not publicly shareable.</p>',
    }));
  }

  const name = achievement.profiles?.full_name ?? 'A SydCrest learner';
  const title = achievement.label;
  const description = `${name} earned this on SydCrest Launchpad.`;

  res.send(renderOgPage(req, {
    title, description,
    bodyHtml: `<h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>`,
  }));
});

module.exports = router;
