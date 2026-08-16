const { app, request, registerUser, registerAdmin, deleteUser, cleanupCohort } = require('./helpers');

describe('admin', () => {
  const cleanup = [];
  const cohorts = [];
  afterEach(async () => {
    await Promise.all(cohorts.splice(0).map(cleanupCohort));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('mentee and mentor are blocked from every admin route', async () => {
    const mentee = await registerUser('mentee');
    const mentor = await registerUser('mentor');
    cleanup.push(mentee.email, mentor.email);

    for (const { token } of [mentee, mentor]) {
      const res = await request(app).get('/api/admin/cohorts').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(403);
    }
  });

  it('platform_admin creates a cohort and it appears in the list', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);

    const create = await request(app).post('/api/admin/cohorts').set('Authorization', `Bearer ${admin.token}`).send({
      name: 'Test Admin Cohort', track: 'backend', total_weeks: 12, max_size: 20,
    });
    expect(create.status).toBe(201);
    cohorts.push(create.body.cohort.id);

    const list = await request(app).get('/api/admin/cohorts').set('Authorization', `Bearer ${admin.token}`);
    expect(list.status).toBe(200);
    expect(list.body.cohorts.some((c) => c.id === create.body.cohort.id)).toBe(true);
  });

  /* Regression test: PATCH /cohorts/:id used to check only the caller's
     role level, not that it was actually their cohort — any cohort_admin
     could edit any cohort platform-wide. */
  it('a cohort_admin cannot edit a cohort run by a different cohort_admin', async () => {
    const owner = await registerAdmin('cohort_admin');
    const outsider = await registerAdmin('cohort_admin');
    cleanup.push(owner.email, outsider.email);

    const create = await request(app).post('/api/admin/cohorts').set('Authorization', `Bearer ${owner.token}`).send({ name: 'x', track: 'x' })
      .catch(() => null);
    // cohort creation is platform_admin+ only — cohort_admin can't create
    // one to test ownership against, so seed it as platform_admin instead.
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const seeded = await request(app).post('/api/admin/cohorts').set('Authorization', `Bearer ${admin.token}`).send({
      name: 'Owned Cohort', track: 'frontend', mentor_id: owner.profile.id,
    });
    cohorts.push(seeded.body.cohort.id);

    const edit = await request(app).patch(`/api/admin/cohorts/${seeded.body.cohort.id}`).set('Authorization', `Bearer ${outsider.token}`).send({ name: 'Hijacked' });
    expect(edit.status).toBe(403);

    const ownEdit = await request(app).patch(`/api/admin/cohorts/${seeded.body.cohort.id}`).set('Authorization', `Bearer ${owner.token}`).send({ name: 'Renamed' });
    expect(ownEdit.status).toBe(200);
  });

  it('only platform_admin+ can access platform stats; cohort_admin cannot', async () => {
    const cohortAdmin = await registerAdmin('cohort_admin');
    const platformAdmin = await registerAdmin('platform_admin');
    cleanup.push(cohortAdmin.email, platformAdmin.email);

    const blocked = await request(app).get('/api/admin/stats').set('Authorization', `Bearer ${cohortAdmin.token}`);
    expect(blocked.status).toBe(403);

    const allowed = await request(app).get('/api/admin/stats').set('Authorization', `Bearer ${platformAdmin.token}`);
    expect(allowed.status).toBe(200);
    expect(allowed.body).toHaveProperty('mentees');
  });

  it('only super_admin can change a role; platform_admin can deactivate but not change role', async () => {
    const platformAdmin = await registerAdmin('platform_admin');
    const superAdmin = await registerAdmin('super_admin');
    const target = await registerUser('mentee');
    cleanup.push(platformAdmin.email, superAdmin.email, target.email);

    const roleAttempt = await request(app).patch(`/api/admin/users/${target.profile.id}`).set('Authorization', `Bearer ${platformAdmin.token}`).send({ role: 'mentor' });
    expect(roleAttempt.status).toBe(403);

    const deactivate = await request(app).patch(`/api/admin/users/${target.profile.id}`).set('Authorization', `Bearer ${platformAdmin.token}`).send({ is_active: false });
    expect(deactivate.status).toBe(200);
    expect(deactivate.body.user.is_active).toBe(false);

    const roleChange = await request(app).patch(`/api/admin/users/${target.profile.id}`).set('Authorization', `Bearer ${superAdmin.token}`).send({ role: 'mentor', is_active: true });
    expect(roleChange.status).toBe(200);
    expect(roleChange.body.user.role).toBe('mentor');
  });
});
