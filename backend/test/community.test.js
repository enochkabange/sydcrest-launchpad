const { app, request, registerUser, deleteUser, createCohort, enroll, cleanupCohort } = require('./helpers');

describe('community', () => {
  const cleanup = [];
  const cohorts = [];
  afterEach(async () => {
    await Promise.all(cohorts.splice(0).map(cleanupCohort));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('a cohort member posts, likes, and replies; counts round-trip', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id);

    const post = await request(app).post('/api/community/posts').set('Authorization', `Bearer ${mentee.token}`).send({
      cohort_id: cohort.id, content: 'Stuck on the rebase exercise',
    });
    expect(post.status).toBe(201);
    const postId = post.body.post.id;

    const like = await request(app).post(`/api/community/posts/${postId}/like`).set('Authorization', `Bearer ${mentor.token}`);
    expect(like.status).toBe(200);
    expect(like.body.liked).toBe(true);
    expect(like.body.likes_count).toBe(1);

    const reply = await request(app).post(`/api/community/posts/${postId}/replies`).set('Authorization', `Bearer ${mentor.token}`).send({ content: 'Office hours today' });
    expect(reply.status).toBe(201);

    const list = await request(app).get(`/api/community/posts?cohort_id=${cohort.id}`).set('Authorization', `Bearer ${mentee.token}`);
    expect(list.status).toBe(200);
    const listed = list.body.posts.find((p) => p.id === postId);
    expect(listed.likes_count).toBe(1);
    expect(listed.replies_count).toBe(1);
    expect(listed.post_replies).toHaveLength(1);
  });

  it('an outsider gets 403 on viewing, posting, and liking', async () => {
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    const outsider = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email, outsider.email);
    const cohort = await createCohort(mentor.profile.id);
    cohorts.push(cohort.id);
    await enroll(mentee.profile.id, cohort.id);

    const view = await request(app).get(`/api/community/posts?cohort_id=${cohort.id}`).set('Authorization', `Bearer ${outsider.token}`);
    expect(view.status).toBe(403);

    const post = await request(app).post('/api/community/posts').set('Authorization', `Bearer ${outsider.token}`).send({ cohort_id: cohort.id, content: 'x' });
    expect(post.status).toBe(403);
  });
});
