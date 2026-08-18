const { app, request, supabase, registerAdmin, deleteUser, cleanupCohort } = require('./helpers');

describe('programs', () => {
  const cleanup = [];
  const programIds = [];
  const cohortIds = [];
  afterEach(async () => {
    // Cohorts before programs — cohorts.program_id references programs(id).
    await Promise.all(cohortIds.splice(0).map(cleanupCohort));
    await Promise.all(programIds.splice(0).map((id) => supabase.from('programs').delete().eq('id', id)));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('platform_admin creates a program and it appears in the list', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);

    const create = await request(app).post('/api/admin/programs').set('Authorization', `Bearer ${admin.token}`).send({
      name: 'Test Program', slug: `test-program-${Date.now()}`, description: 'A test program',
      duration_weeks: 8, eligibility_min_age: 18, eligibility_max_age: 30,
      certification_criteria: { min_completion_pct: 80, requires_all_projects: true, requires_peer_review: false },
    });
    expect(create.status).toBe(201);
    programIds.push(create.body.program.id);

    const list = await request(app).get('/api/admin/programs').set('Authorization', `Bearer ${admin.token}`);
    expect(list.status).toBe(200);
    expect(list.body.programs.some((p) => p.id === create.body.program.id)).toBe(true);
  });

  it('cohort_admin can list programs but cannot create one', async () => {
    const cohortAdmin = await registerAdmin('cohort_admin');
    cleanup.push(cohortAdmin.email);

    const list = await request(app).get('/api/admin/programs').set('Authorization', `Bearer ${cohortAdmin.token}`);
    expect(list.status).toBe(200);

    const create = await request(app).post('/api/admin/programs').set('Authorization', `Bearer ${cohortAdmin.token}`).send({
      name: 'Nope', slug: `nope-${Date.now()}`,
    });
    expect(create.status).toBe(403);
  });

  it('rejects a program with no name or slug', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);

    const res = await request(app).post('/api/admin/programs').set('Authorization', `Bearer ${admin.token}`).send({ description: 'missing required fields' });
    expect(res.status).toBe(400);
  });

  it('updates a program via PATCH', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);

    const create = await request(app).post('/api/admin/programs').set('Authorization', `Bearer ${admin.token}`).send({
      name: 'Original Name', slug: `patch-test-${Date.now()}`,
    });
    programIds.push(create.body.program.id);

    const update = await request(app).patch(`/api/admin/programs/${create.body.program.id}`).set('Authorization', `Bearer ${admin.token}`).send({
      name: 'Updated Name', is_active: false,
    });
    expect(update.status).toBe(200);
    expect(update.body.program.name).toBe('Updated Name');
    expect(update.body.program.is_active).toBe(false);
  });

  it('a cohort created with a program_id stores the link', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);

    const program = await request(app).post('/api/admin/programs').set('Authorization', `Bearer ${admin.token}`).send({
      name: 'Cohort Link Program', slug: `cohort-link-${Date.now()}`,
    });
    programIds.push(program.body.program.id);

    const cohort = await request(app).post('/api/admin/cohorts').set('Authorization', `Bearer ${admin.token}`).send({
      name: 'Program-linked cohort', track: 'seo', program_id: program.body.program.id, total_weeks: 12, max_size: 20,
    });
    expect(cohort.status).toBe(201);
    expect(cohort.body.cohort.program_id).toBe(program.body.program.id);
    cohortIds.push(cohort.body.cohort.id);
  });
});
