const { app, request, supabase, registerUser, registerAdmin, deleteUser, cleanupCohort } = require('./helpers');

describe('chat — direct messages', () => {
  const cleanup = [];

  afterEach(async () => {
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('a mentee DMs a mentor: creates the conversation, both can read/post, and a repeat call is idempotent', async () => {
    const mentee = await registerUser('mentee');
    const mentor = await registerUser('mentor');
    cleanup.push(mentee.email, mentor.email);

    const create = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${mentee.token}`).send({
      other_profile_id: mentor.profile.id,
    });
    expect(create.status).toBe(201);
    const conversationId = create.body.conversation.id;

    const again = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${mentee.token}`).send({
      other_profile_id: mentor.profile.id,
    });
    expect(again.status).toBe(200);
    expect(again.body.conversation.id).toBe(conversationId);

    // Mentor-initiated should land on the same conversation, not a second one.
    const fromMentor = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${mentor.token}`).send({
      other_profile_id: mentee.profile.id,
    });
    expect(fromMentor.body.conversation.id).toBe(conversationId);

    const send = await request(app).post(`/api/chat/conversations/${conversationId}/messages`).set('Authorization', `Bearer ${mentee.token}`).send({
      content: 'Hi, are you free to chat about my project?',
    });
    expect(send.status).toBe(201);

    const read = await request(app).get(`/api/chat/conversations/${conversationId}/messages`).set('Authorization', `Bearer ${mentor.token}`);
    expect(read.status).toBe(200);
    expect(read.body.messages).toHaveLength(1);
    expect(read.body.messages[0].content).toBe('Hi, are you free to chat about my project?');

    const list = await request(app).get('/api/chat/conversations').set('Authorization', `Bearer ${mentor.token}`);
    expect(list.status).toBe(200);
    const conv = list.body.conversations.find((c) => c.id === conversationId);
    expect(conv.type).toBe('dm');
    expect(conv.display_name).toBe(mentee.profile.full_name);
    expect(conv.unread_count).toBe(1);
  });

  it('rejects two mentees or two mentors, and messaging yourself', async () => {
    const menteeA = await registerUser('mentee');
    const menteeB = await registerUser('mentee');
    const mentorA = await registerUser('mentor');
    const mentorB = await registerUser('mentor');
    cleanup.push(menteeA.email, menteeB.email, mentorA.email, mentorB.email);

    const twoMentees = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${menteeA.token}`).send({ other_profile_id: menteeB.profile.id });
    expect(twoMentees.status).toBe(400);

    const twoMentors = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${mentorA.token}`).send({ other_profile_id: mentorB.profile.id });
    expect(twoMentors.status).toBe(400);

    const self = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${menteeA.token}`).send({ other_profile_id: menteeA.profile.id });
    expect(self.status).toBe(400);
  });

  it('non-participants are blocked from reading, posting, and marking read', async () => {
    const mentee = await registerUser('mentee');
    const mentor = await registerUser('mentor');
    const outsider = await registerUser('mentee');
    cleanup.push(mentee.email, mentor.email, outsider.email);

    const create = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${mentee.token}`).send({ other_profile_id: mentor.profile.id });
    const conversationId = create.body.conversation.id;

    const read = await request(app).get(`/api/chat/conversations/${conversationId}/messages`).set('Authorization', `Bearer ${outsider.token}`);
    expect(read.status).toBe(403);
    const post = await request(app).post(`/api/chat/conversations/${conversationId}/messages`).set('Authorization', `Bearer ${outsider.token}`).send({ content: 'hi' });
    expect(post.status).toBe(403);
    const markRead = await request(app).patch(`/api/chat/conversations/${conversationId}/read`).set('Authorization', `Bearer ${outsider.token}`);
    expect(markRead.status).toBe(403);
  });

  it('?since= only returns newer messages, and unread clears after marking read', async () => {
    const mentee = await registerUser('mentee');
    const mentor = await registerUser('mentor');
    cleanup.push(mentee.email, mentor.email);

    const create = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${mentee.token}`).send({ other_profile_id: mentor.profile.id });
    const conversationId = create.body.conversation.id;

    await request(app).post(`/api/chat/conversations/${conversationId}/messages`).set('Authorization', `Bearer ${mentee.token}`).send({ content: 'first' });
    const cutoff = new Date().toISOString();
    await new Promise((r) => setTimeout(r, 50));
    await request(app).post(`/api/chat/conversations/${conversationId}/messages`).set('Authorization', `Bearer ${mentee.token}`).send({ content: 'second' });

    const since = await request(app).get(`/api/chat/conversations/${conversationId}/messages?since=${encodeURIComponent(cutoff)}`).set('Authorization', `Bearer ${mentor.token}`);
    expect(since.body.messages).toHaveLength(1);
    expect(since.body.messages[0].content).toBe('second');

    await request(app).patch(`/api/chat/conversations/${conversationId}/read`).set('Authorization', `Bearer ${mentor.token}`);
    const list = await request(app).get('/api/chat/conversations').set('Authorization', `Bearer ${mentor.token}`);
    expect(list.body.conversations.find((c) => c.id === conversationId).unread_count).toBe(0);
  });

  it('soft-delete is sender-only', async () => {
    const mentee = await registerUser('mentee');
    const mentor = await registerUser('mentor');
    cleanup.push(mentee.email, mentor.email);

    const create = await request(app).post('/api/chat/conversations/dm').set('Authorization', `Bearer ${mentee.token}`).send({ other_profile_id: mentor.profile.id });
    const conversationId = create.body.conversation.id;
    const send = await request(app).post(`/api/chat/conversations/${conversationId}/messages`).set('Authorization', `Bearer ${mentee.token}`).send({ content: 'oops' });
    const messageId = send.body.message.id;

    const wrongUser = await request(app).delete(`/api/chat/conversations/${conversationId}/messages/${messageId}`).set('Authorization', `Bearer ${mentor.token}`);
    expect(wrongUser.status).toBe(403);

    const owner = await request(app).delete(`/api/chat/conversations/${conversationId}/messages/${messageId}`).set('Authorization', `Bearer ${mentee.token}`);
    expect(owner.status).toBe(200);

    const read = await request(app).get(`/api/chat/conversations/${conversationId}/messages`).set('Authorization', `Bearer ${mentor.token}`);
    expect(read.body.messages).toHaveLength(0);
  });
});

describe('chat — cohort group chat', () => {
  const cleanup = [];
  const cohortIds = [];

  afterEach(async () => {
    await Promise.all(cohortIds.splice(0).map(cleanupCohort));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('cohort creation auto-creates a conversation with the mentor, and enroll adds mentees without duplicating existing participants', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);

    const cohort = await request(app).post('/api/admin/cohorts').set('Authorization', `Bearer ${admin.token}`).send({
      name: 'Chat Test Cohort', track: 'frontend', mentor_id: mentor.profile.id, total_weeks: 12, max_size: 20,
    });
    expect(cohort.status).toBe(201);
    cohortIds.push(cohort.body.cohort.id);

    const { data: conv } = await supabase.from('conversations').select('id').eq('cohort_id', cohort.body.cohort.id).single();
    const { data: mentorParticipant } = await supabase.from('conversation_participants').select('*').eq('conversation_id', conv.id).eq('profile_id', mentor.profile.id).maybeSingle();
    expect(mentorParticipant).toBeTruthy();

    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);
    const enroll = await request(app).post(`/api/admin/cohorts/${cohort.body.cohort.id}/enroll`).set('Authorization', `Bearer ${admin.token}`).send({
      mentee_ids: [mentee.profile.id],
    });
    expect(enroll.status).toBe(200);

    const { data: participants } = await supabase.from('conversation_participants').select('profile_id').eq('conversation_id', conv.id);
    expect(participants.map((p) => p.profile_id).sort()).toEqual([mentee.profile.id, mentor.profile.id].sort());

    // Re-running enroll (e.g. a second mentee) shouldn't duplicate the mentor's row.
    const mentee2 = await registerUser('mentee');
    cleanup.push(mentee2.email);
    await request(app).post(`/api/admin/cohorts/${cohort.body.cohort.id}/enroll`).set('Authorization', `Bearer ${admin.token}`).send({
      mentee_ids: [mentee2.profile.id],
    });
    const { data: after } = await supabase.from('conversation_participants').select('profile_id').eq('conversation_id', conv.id);
    expect(after).toHaveLength(3);

    const menteeMessage = await request(app).post(`/api/chat/conversations/${conv.id}/messages`).set('Authorization', `Bearer ${mentee.token}`).send({ content: 'Hello cohort!' });
    expect(menteeMessage.status).toBe(201);

    const mentorRead = await request(app).get(`/api/chat/conversations/${conv.id}/messages`).set('Authorization', `Bearer ${mentor.token}`);
    expect(mentorRead.status).toBe(200);
    expect(mentorRead.body.messages).toHaveLength(1);

    const outsider = await registerUser('mentee');
    cleanup.push(outsider.email);
    const outsiderRead = await request(app).get(`/api/chat/conversations/${conv.id}/messages`).set('Authorization', `Bearer ${outsider.token}`);
    expect(outsiderRead.status).toBe(403);
  });
});
