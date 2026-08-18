const { app, request, supabase, registerAdmin, deleteUser } = require('./helpers');

describe('mentor applications', () => {
  const cleanup = [];
  const mentorAppIds = [];

  afterEach(async () => {
    await Promise.all(mentorAppIds.splice(0).map((id) => supabase.from('mentor_applications').delete().eq('id', id)));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('submits a mentor application and the reference code checks status via the shared status endpoint', async () => {
    const submit = await request(app).post('/api/mentor-applications').send({
      full_name: 'Kwabena Mensah',
      email: 'kwabena.mentor@example.test',
      expertise_areas: ['React', 'Node.js'],
      portfolio_url: 'https://example.test/kwabena',
      bio: 'Senior engineer, 6 years, wants to give back.',
      reference_1_name: 'Ama Boateng', reference_1_contact: 'ama@example.test',
      reference_2_name: 'Yaw Darko', reference_2_contact: 'yaw@example.test',
    });
    expect(submit.status).toBe(201);
    mentorAppIds.push((await supabase.from('mentor_applications').select('id').eq('reference_code', submit.body.reference_code).single()).data.id);

    // Same /api/applications/status endpoint the learner pipeline uses —
    // it falls back to mentor_applications when there's no match in
    // applications.
    const status = await request(app).get('/api/applications/status').query({
      email: 'kwabena.mentor@example.test', reference_code: submit.body.reference_code,
    });
    expect(status.status).toBe(200);
    expect(status.body.application.status).toBe('applied');
  });

  it('mentee, mentor, and cohort_admin are blocked from the mentor review queue', async () => {
    for (const role of ['mentee', 'mentor', 'cohort_admin']) {
      const user = await registerAdmin(role);
      cleanup.push(user.email);
      const list = await request(app).get('/api/mentor-applications').set('Authorization', `Bearer ${user.token}`);
      expect(list.status).toBe(403);
    }
  });

  it('refuses to accept a mentor application until references_checked is true', async () => {
    const submit = await request(app).post('/api/mentor-applications').send({
      full_name: 'Unchecked Mentor', email: 'unchecked@example.test',
    });
    const appId = (await supabase.from('mentor_applications').select('id').eq('reference_code', submit.body.reference_code).single()).data.id;
    mentorAppIds.push(appId);

    const reviewer = await registerAdmin('reviewer');
    cleanup.push(reviewer.email);

    const acceptBlocked = await request(app).patch(`/api/mentor-applications/${appId}`).set('Authorization', `Bearer ${reviewer.token}`).send({
      status: 'accepted',
    });
    expect(acceptBlocked.status).toBe(400);

    const checkRefs = await request(app).patch(`/api/mentor-applications/${appId}`).set('Authorization', `Bearer ${reviewer.token}`).send({
      references_checked: true,
    });
    expect(checkRefs.status).toBe(200);
    expect(checkRefs.body.application.references_checked).toBe(true);

    const acceptNow = await request(app).patch(`/api/mentor-applications/${appId}`).set('Authorization', `Bearer ${reviewer.token}`).send({
      status: 'accepted',
    });
    expect(acceptNow.status).toBe(200);
    expect(acceptNow.body.application.status).toBe('accepted');
    expect(acceptNow.body.application.reviewer_id).toBe(reviewer.profile.id);
  });

  it('accepts references_checked and status: accepted in the same call', async () => {
    const submit = await request(app).post('/api/mentor-applications').send({
      full_name: 'One Step Mentor', email: 'one-step@example.test',
    });
    const appId = (await supabase.from('mentor_applications').select('id').eq('reference_code', submit.body.reference_code).single()).data.id;
    mentorAppIds.push(appId);

    const reviewer = await registerAdmin('reviewer');
    cleanup.push(reviewer.email);

    const accept = await request(app).patch(`/api/mentor-applications/${appId}`).set('Authorization', `Bearer ${reviewer.token}`).send({
      status: 'accepted', references_checked: true, reviewer_notes: 'Verified both references by phone.',
    });
    expect(accept.status).toBe(200);
    expect(accept.body.application.status).toBe('accepted');
  });

  it('rejecting a mentor application does not require references_checked', async () => {
    const submit = await request(app).post('/api/mentor-applications').send({
      full_name: 'Rejected Mentor', email: 'rejected-mentor@example.test',
    });
    const appId = (await supabase.from('mentor_applications').select('id').eq('reference_code', submit.body.reference_code).single()).data.id;
    mentorAppIds.push(appId);

    const reviewer = await registerAdmin('reviewer');
    cleanup.push(reviewer.email);

    const reject = await request(app).patch(`/api/mentor-applications/${appId}`).set('Authorization', `Bearer ${reviewer.token}`).send({
      status: 'rejected',
    });
    expect(reject.status).toBe(200);
    expect(reject.body.application.status).toBe('rejected');
  });
});
