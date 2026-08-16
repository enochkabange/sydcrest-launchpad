const { app, request, supabase, registerUser, deleteUser, createCohort, enroll, cleanupCohort } = require('./helpers');

describe('projects', () => {
  const cleanup = [];
  const cohorts = [];
  afterEach(async () => {
    await Promise.all(cohorts.splice(0).map(cleanupCohort));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('a mentee submits, and the owning mentor can review it', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id);

    const submit = await request(app).post('/api/projects').set('Authorization', `Bearer ${mentee.token}`).send({
      cohort_id: cohort.id, week_number: 1, title: 'Portfolio', submission_url: 'https://example.com',
    });
    expect(submit.status).toBe(201);
    expect(submit.body.project.status).toBe('submitted');

    const review = await request(app).post(`/api/projects/${submit.body.project.id}/review`).set('Authorization', `Bearer ${mentor.token}`).send({
      status: 'approved', mentor_feedback: 'Nice work', final_score: 90,
    });
    expect(review.status).toBe(200);
    expect(review.body.project.status).toBe('approved');

    await supabase.from('projects').delete().eq('id', submit.body.project.id);
  });

  it('a mentor who does not run the cohort cannot review, and cannot even fetch the project', async () => {
    const mentor = await registerUser('mentor');
    const outsider = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, outsider.email, mentee.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id);

    const submit = await request(app).post('/api/projects').set('Authorization', `Bearer ${mentee.token}`).send({
      cohort_id: cohort.id, week_number: 1, title: 'Portfolio',
    });
    const projectId = submit.body.project.id;

    const review = await request(app).post(`/api/projects/${projectId}/review`).set('Authorization', `Bearer ${outsider.token}`).send({ status: 'approved' });
    expect(review.status).toBe(403);

    const fetch = await request(app).get(`/api/projects/${projectId}`).set('Authorization', `Bearer ${outsider.token}`);
    expect(fetch.status).toBe(404);

    await supabase.from('projects').delete().eq('id', projectId);
  });

  it('only a mentee can submit a project', async () => {
    const { token, email } = await registerUser('mentor');
    cleanup.push(email);
    const res = await request(app).post('/api/projects').set('Authorization', `Bearer ${token}`).send({ week_number: 1, title: 'x' });
    expect(res.status).toBe(403);
  });
});
