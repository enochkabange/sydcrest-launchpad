/**
 * Real-time chat — PLATFORM_SPEC.md §11 (chat only; video is a separate
 * PR). Mentor<->mentee 1:1 and cohort group chat, delivered via short
 * polling rather than WebSockets/Supabase Realtime: the frontend has no
 * Supabase client today, and a dropped poll degrades more honestly on a
 * flaky mobile connection than a dropped socket needing its own
 * reconnection logic — same "pick what degrades honestly on the actual
 * target network" reasoning as the rest of this platform.
 *
 * Every mentor is already vetted (Mentor Vetting PR), so DM eligibility
 * is role-only (one side mentee, one side mentor) — no cohort/booking
 * relationship graph to build or maintain. Cohort group chat is
 * automatic: one conversation per cohort, membership synced at
 * cohort-create/enroll time in admin.js, not started by a user action.
 */
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { auth } = require('../middleware/auth');

router.use(auth);

async function isParticipant(conversationId, profileId) {
  const { data } = await supabase
    .from('conversation_participants').select('profile_id')
    .eq('conversation_id', conversationId).eq('profile_id', profileId).maybeSingle();
  return Boolean(data);
}

// GET /api/chat/conversations – the caller's conversations, cohort and DM
// alike, each with a display name, last message preview, and unread count.
router.get('/conversations', async (req, res) => {
  const { data: memberships } = await supabase
    .from('conversation_participants').select('conversation_id, last_read_at')
    .eq('profile_id', req.user.id);
  if (!memberships?.length) return res.json({ conversations: [] });

  const conversations = await Promise.all(memberships.map(async (m) => {
    const { data: conv } = await supabase.from('conversations').select('*, cohorts(name)').eq('id', m.conversation_id).single();

    let displayName = conv.cohorts?.name;
    if (conv.type === 'dm') {
      const { data: other } = await supabase
        .from('conversation_participants').select('profiles!profile_id(full_name)')
        .eq('conversation_id', conv.id).neq('profile_id', req.user.id).maybeSingle();
      displayName = other?.profiles?.full_name ?? 'Direct message';
    }

    const { data: lastMessage } = await supabase
      .from('chat_thread_messages').select('content, created_at, sender_id')
      .eq('conversation_id', conv.id).is('deleted_at', null)
      .order('created_at', { ascending: false }).limit(1).maybeSingle();

    let unreadQuery = supabase
      .from('chat_thread_messages').select('id', { count: 'exact', head: true })
      .eq('conversation_id', conv.id).is('deleted_at', null).neq('sender_id', req.user.id);
    if (m.last_read_at) unreadQuery = unreadQuery.gt('created_at', m.last_read_at);
    const { count: unread_count } = await unreadQuery;

    return { id: conv.id, type: conv.type, display_name: displayName, last_message: lastMessage ?? null, unread_count: unread_count ?? 0 };
  }));

  conversations.sort((a, b) => new Date(b.last_message?.created_at ?? 0) - new Date(a.last_message?.created_at ?? 0));
  res.json({ conversations });
});

// POST /api/chat/conversations/dm – { other_profile_id }. Idempotent:
// returns the existing DM conversation for this pair if one exists.
router.post('/conversations/dm', async (req, res) => {
  const { other_profile_id } = req.body;
  if (!other_profile_id) return res.status(400).json({ error: 'other_profile_id required' });
  if (other_profile_id === req.user.id) return res.status(400).json({ error: 'Cannot message yourself' });

  const { data: other } = await supabase.from('profiles').select('id, role').eq('id', other_profile_id).maybeSingle();
  if (!other) return res.status(404).json({ error: 'User not found' });

  const roles = [req.user.role, other.role].sort();
  if (roles[0] !== 'mentee' || roles[1] !== 'mentor')
    return res.status(400).json({ error: 'Direct messages are between a mentee and a mentor' });

  // Find an existing DM shared by both participants, rather than a
  // dedicated unique index — a DM conversation has no natural single
  // column to key uniqueness on, and this table is small per user.
  const { data: mine } = await supabase.from('conversation_participants').select('conversation_id').eq('profile_id', req.user.id);
  const { data: theirs } = await supabase.from('conversation_participants').select('conversation_id').eq('profile_id', other_profile_id);
  const shared = (mine ?? []).map((r) => r.conversation_id).filter((id) => (theirs ?? []).some((r) => r.conversation_id === id));
  if (shared.length) {
    const { data: existing } = await supabase.from('conversations').select('id').in('id', shared).eq('type', 'dm').maybeSingle();
    if (existing) return res.json({ conversation: existing });
  }

  const { data: conversation, error } = await supabase.from('conversations').insert({ type: 'dm' }).select().single();
  if (error) return res.status(400).json({ error: error.message });
  await supabase.from('conversation_participants').insert([
    { conversation_id: conversation.id, profile_id: req.user.id },
    { conversation_id: conversation.id, profile_id: other_profile_id },
  ]);
  res.status(201).json({ conversation });
});

// GET /api/chat/conversations/:id/messages?since= – poll endpoint.
// Returns messages after `since`, or the latest 50 if omitted.
router.get('/conversations/:id/messages', async (req, res) => {
  if (!(await isParticipant(req.params.id, req.user.id))) return res.status(403).json({ error: 'Not a participant of this conversation' });

  let q = supabase
    .from('chat_thread_messages').select('*, profiles!sender_id(full_name)')
    .eq('conversation_id', req.params.id).is('deleted_at', null);
  q = req.query.since ? q.gt('created_at', req.query.since).order('created_at', { ascending: true }) : q.order('created_at', { ascending: false }).limit(50);

  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ messages: req.query.since ? data : data.reverse() });
});

// POST /api/chat/conversations/:id/messages – { content }.
router.post('/conversations/:id/messages', async (req, res) => {
  if (!(await isParticipant(req.params.id, req.user.id))) return res.status(403).json({ error: 'Not a participant of this conversation' });
  const { content } = req.body;
  if (!content?.trim()) return res.status(400).json({ error: 'content required' });

  const { data, error } = await supabase
    .from('chat_thread_messages').insert({ conversation_id: req.params.id, sender_id: req.user.id, content: content.trim() })
    .select('*, profiles!sender_id(full_name)').single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: data });
});

// DELETE /api/chat/conversations/:id/messages/:messageId – soft delete,
// sender-only (PLATFORM_SPEC.md §11's [ASSUMPTION]: kept indefinitely
// otherwise, a user can delete their own).
router.delete('/conversations/:id/messages/:messageId', async (req, res) => {
  const { data: message } = await supabase.from('chat_thread_messages').select('sender_id').eq('id', req.params.messageId).single();
  if (!message) return res.status(404).json({ error: 'Message not found' });
  if (message.sender_id !== req.user.id) return res.status(403).json({ error: 'You can only delete your own messages' });

  const { error } = await supabase.from('chat_thread_messages').update({ deleted_at: new Date().toISOString() }).eq('id', req.params.messageId);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

// PATCH /api/chat/conversations/:id/read – stamps the caller's
// last_read_at, clearing the unread badge.
router.patch('/conversations/:id/read', async (req, res) => {
  if (!(await isParticipant(req.params.id, req.user.id))) return res.status(403).json({ error: 'Not a participant of this conversation' });

  const { error } = await supabase
    .from('conversation_participants').update({ last_read_at: new Date().toISOString() })
    .eq('conversation_id', req.params.id).eq('profile_id', req.user.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

module.exports = router;
