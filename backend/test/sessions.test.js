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

  it('rejects a 1:1 session with a minor mentee, accepts it as a group session with an attendee', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee'); // minor
    const buddy = await registerUser('mentee'); // group attendee
    cleanup.push(mentor.email, mentee.email, buddy.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id, { guardian_consent_required: true });
    await enroll(buddy.profile.id, cohort.id);

    const rejected = await request(app).post('/api/sessions').set('Authorization', `Bearer ${mentor.token}`).send({
      mentee_id: mentee.profile.id, scheduled_at: '2026-09-01T18:00:00Z',
    });
    expect(rejected.status).toBe(400);

    const accepted = await request(app).post('/api/sessions').set('Authorization', `Bearer ${mentor.token}`).send({
      mentee_id: mentee.profile.id, cohort_id: cohort.id, scheduled_at: '2026-09-01T18:00:00Z',
      session_type: 'group', attendee_ids: [buddy.profile.id],
    });
    expect(accepted.status).toBe(201);
    expect(accepted.body.session.session_type).toBe('group');

    const attendees = await supabase.from('session_attendees').select('*').eq('session_id', accepted.body.session.id);
    expect(attendees.data.length).toBe(1);
    expect(attendees.data[0].profile_id).toBe(buddy.profile.id);

    await supabase.from('sessions').delete().eq('id', accepted.body.session.id);
  });

  it('a non-minor mentee books a plain 1:1 session unaffected by the group requirement', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id);

    const res = await request(app).post('/api/sessions').set('Authorization', `Bearer ${mentor.token}`).send({
      mentee_id: mentee.profile.id, scheduled_at: '2026-09-01T18:00:00Z',
    });
    expect(res.status).toBe(201);
    expect(res.body.session.session_type).toBe('1:1');

    await supabase.from('sessions').delete().eq('id', res.body.session.id);
  });

  it('GET /api/sessions/roster returns a mentor\'s own cohort mentees with minor status', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id, { guardian_consent_required: true });

    const res = await request(app).get('/api/sessions/roster').set('Authorization', `Bearer ${mentor.token}`);
    expect(res.status).toBe(200);
    const entry = res.body.mentees.find((m) => m.id === mentee.profile.id);
    expect(entry.is_minor).toBe(true);
  });

  it('join route 404s for a session with no video room, and 404s for a non-participant', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    const outsider = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email, outsider.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id);

    const book = await request(app).post('/api/sessions').set('Authorization', `Bearer ${mentor.token}`).send({
      mentee_id: mentee.profile.id, scheduled_at: '2026-09-01T18:00:00Z',
    });
    const sessionId = book.body.session.id;

    // No DAILY_API_KEY in the test env, so no room was ever attached.
    const noRoom = await request(app).post(`/api/sessions/${sessionId}/join`).set('Authorization', `Bearer ${mentee.token}`).send({});
    expect(noRoom.status).toBe(404);

    const notAParticipant = await request(app).post(`/api/sessions/${sessionId}/join`).set('Authorization', `Bearer ${outsider.token}`).send({});
    expect(notAParticipant.status).toBe(404);

    await supabase.from('sessions').delete().eq('id', sessionId);
  });
});
