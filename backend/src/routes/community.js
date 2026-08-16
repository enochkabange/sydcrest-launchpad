/**
 * Community — cohort feed (posts, likes, replies) and public events.
 *
 * Scoped to a cohort, not a global feed — WhatsApp remains the primary
 * channel per MASTER_PLAN §7, this supplements it for in-app context
 * (a post pinned to "Week 4 struggling with git rebase", say) rather than
 * replacing it. Every write is gated on real cohort membership, mirroring
 * auth_in_cohort() in policies.sql — the backend's service-role client
 * bypasses RLS, so this is the actual enforcement, not defense in depth.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { auth } = require('../middleware/auth');

async function isInCohort(user, cohortId) {
  if (['platform_admin', 'super_admin'].includes(user.role)) return true;
  if (!cohortId) return false;
  const [{ data: enrollment }, { data: cohort }] = await Promise.all([
    supabase.from('enrollments').select('id').eq('cohort_id', cohortId).eq('mentee_id', user.id).maybeSingle(),
    supabase.from('cohorts').select('mentor_id').eq('id', cohortId).maybeSingle(),
  ]);
  return enrollment != null || cohort?.mentor_id === user.id;
}

router.use(auth);

// GET /api/community/posts?cohort_id=... – pinned first, then newest
router.get('/posts', async (req, res) => {
  const { cohort_id } = req.query;
  if (!cohort_id) return res.status(400).json({ error: 'cohort_id required' });
  if (!(await isInCohort(req.user, cohort_id))) return res.status(403).json({ error: 'Not a member of this cohort' });

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, profiles!author_id(full_name, avatar_url)')
    .eq('cohort_id', cohort_id)
    .eq('is_deleted', false)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });

  // Which of these the caller has liked, so the client can render filled
  // vs outline without a second round trip per post.
  const { data: likes } = await supabase
    .from('post_likes')
    .select('post_id')
    .eq('user_id', req.user.id)
    .in('post_id', posts.map((p) => p.id));
  const likedIds = new Set((likes || []).map((l) => l.post_id));

  res.json({ posts: posts.map((p) => ({ ...p, liked_by_me: likedIds.has(p.id) })) });
});

// POST /api/community/posts – { cohort_id, content }
router.post('/posts', async (req, res) => {
  const { cohort_id, content } = req.body;
  if (!cohort_id || !content?.trim()) return res.status(400).json({ error: 'cohort_id and content required' });
  if (!(await isInCohort(req.user, cohort_id))) return res.status(403).json({ error: 'Not a member of this cohort' });

  const { data, error } = await supabase
    .from('posts')
    .insert({ author_id: req.user.id, cohort_id, content: content.trim() })
    .select('*, profiles!author_id(full_name, avatar_url)').single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ post: { ...data, liked_by_me: false } });
});

// POST /api/community/posts/:id/like – toggles; counters update via the
// handle_post_like trigger in schema.sql, not here.
router.post('/posts/:id/like', async (req, res) => {
  const { data: post } = await supabase.from('posts').select('cohort_id').eq('id', req.params.id).single();
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (!(await isInCohort(req.user, post.cohort_id))) return res.status(403).json({ error: 'Not a member of this cohort' });

  const { data: existing } = await supabase
    .from('post_likes').select('*').eq('post_id', req.params.id).eq('user_id', req.user.id).maybeSingle();

  if (existing) {
    await supabase.from('post_likes').delete().eq('post_id', req.params.id).eq('user_id', req.user.id);
  } else {
    await supabase.from('post_likes').insert({ post_id: req.params.id, user_id: req.user.id });
  }

  const { data: updated } = await supabase.from('posts').select('likes_count').eq('id', req.params.id).single();
  res.json({ liked: !existing, likes_count: updated.likes_count });
});

// POST /api/community/posts/:id/replies – { content }
router.post('/posts/:id/replies', async (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) return res.status(400).json({ error: 'content required' });

  const { data: post } = await supabase.from('posts').select('cohort_id').eq('id', req.params.id).single();
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (!(await isInCohort(req.user, post.cohort_id))) return res.status(403).json({ error: 'Not a member of this cohort' });

  const { data, error } = await supabase
    .from('post_replies')
    .insert({ post_id: req.params.id, author_id: req.user.id, content: content.trim() })
    .select('*, profiles!author_id(full_name, avatar_url)').single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ reply: data });
});

// GET /api/community/events – public events, or everything for admins
router.get('/events', async (req, res) => {
  let query = supabase.from('events').select('*').order('event_date', { ascending: true });
  if (!['platform_admin', 'super_admin'].includes(req.user.role)) query = query.eq('is_public', true);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ events: data });
});

module.exports = router;
