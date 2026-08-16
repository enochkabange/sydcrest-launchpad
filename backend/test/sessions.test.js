const { app, request, supabase, registerUser, deleteUser, createCohort, enroll, cleanupCohort } = require('./helpers');

describe('sessions', () => {
  const cleanup = [];
  const cohorts = [];
  afterEach(async () => {
    await Promise.all(cohorts.splice(0).map(cleanupCohort));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('a mentor books with an actually-enrolled mentee, reschedules, and marks attendance', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id);

    const book = await request(app).post('/api/sessions').set('Authorization', `Bearer ${mentor.token}`).send({
      mentee_id: mentee.profile.id, scheduled_at: '2026-09-01T18:00:00Z', duration_mins: 30,
    });
    expect(book.status).toBe(201);
    const sessionId = book.body.session.id;

    const reschedule = await request(app).patch(`/api/sessions/${sessionId}`).set('Authorization', `Bearer ${mentee.token}`).send({
      scheduled_at: '2026-09-02T18:00:00Z',
    });
    expect(reschedule.status).toBe(200);

    const attend = await request(app).post(`/api/sessions/${sessionId}/attendance`).set('Authorization', `Bearer ${mentor.token}`).send({});
    expect(attend.status).toBe(200);
    expect(attend.body.session.status).toBe('completed');

    await supabase.from('sessions').delete().eq('id', sessionId);
  });

  it('a mentor cannot book with a mentee outside any cohort they run', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee'); // never enrolled anywhere
    cleanup.push(mentor.email, mentee.email);

    const res = await request(app).post('/api/sessions').set('Authorization', `Bearer ${mentor.token}`).send({
      mentee_id: mentee.profile.id, scheduled_at: '2026-09-01T18:00:00Z',
    });
    expect(res.status).toBe(403);
  });

  it('a mentee cannot set mentor_notes on their own session', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id);

    const book = await request(app).post('/api/sessions').set('Authorization', `Bearer ${mentor.token}`).send({
      mentee_id: mentee.profile.id, scheduled_at: '2026-09-01T18:00:00Z',
    });
    const sessionId = book.body.session.id;

    const res = await request(app).patch(`/api/sessions/${sessionId}`).set('Authorization', `Bearer ${mentee.token}`).send({ mentor_notes: 'sneaky' });
    expect(res.status).toBe(400);

    await supabase.from('sessions').delete().eq('id', sessionId);
  });
});
