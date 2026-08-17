const { app, request, supabase, registerUser, registerAdmin, deleteUser, createCohort, enroll, cleanupCohort } = require('./helpers');
const { buildWeeks } = require('../src/data/dmp-curriculum');

describe('POST /api/admin/cohorts/:id/assign-curriculum', () => {
  const cleanup = [];
  const cohorts = [];
  afterEach(async () => {
    await Promise.all(cohorts.splice(0).map(cleanupCohort));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('assigns the real DMP curriculum to every enrolled mentee, and re-running does not duplicate', async () => {
    const admin = await registerAdmin('platform_admin');
    const menteeA = await registerUser('mentee');
    const menteeB = await registerUser('mentee');
    cleanup.push(admin.email, menteeA.email, menteeB.email);

    const cohort = await createCohort(admin.profile.id);
    cohorts.push(cohort.id);
    await enroll(menteeA.profile.id, cohort.id);
    await enroll(menteeB.profile.id, cohort.id);

    const res = await request(app)
      .post(`/api/admin/cohorts/${cohort.id}/assign-curriculum`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send({ track: 'seo' });
    expect(res.status).toBe(200);
    expect(res.body.assigned).toBe(2);

    const { data: paths } = await supabase.from('learning_paths').select('*, learning_weeks(*)').eq('cohort_id', cohort.id);
    expect(paths.length).toBe(2);
    for (const path of paths) {
      expect(path.title).toBe('Delta Mentoring Program');
      expect(path.track).toBe('seo');
      expect(path.learning_weeks.length).toBe(12);
      const week7 = path.learning_weeks.find((w) => w.week_number === 7);
      expect(week7.theme).toMatch(/SEO/i);
    }

    // Re-running should skip both mentees, not double-assign.
    const rerun = await request(app)
      .post(`/api/admin/cohorts/${cohort.id}/assign-curriculum`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send({ track: 'seo' });
    expect(rerun.status).toBe(200);
    expect(rerun.body.assigned).toBe(0);

    const { data: pathsAfter } = await supabase.from('learning_paths').select('id').eq('cohort_id', cohort.id);
    expect(pathsAfter.length).toBe(2);
  });

  it('rejects an unknown track', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const cohort = await createCohort(admin.profile.id);
    cohorts.push(cohort.id);

    const res = await request(app)
      .post(`/api/admin/cohorts/${cohort.id}/assign-curriculum`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send({ track: 'frontend' });
    expect(res.status).toBe(400);
  });

  it('a cohort_admin who does not run the cohort is rejected', async () => {
    const owner = await registerAdmin('cohort_admin');
    const outsider = await registerAdmin('cohort_admin');
    cleanup.push(owner.email, outsider.email);
    const cohort = await createCohort(owner.profile.id);
    cohorts.push(cohort.id);

    const res = await request(app)
      .post(`/api/admin/cohorts/${cohort.id}/assign-curriculum`)
      .set('Authorization', `Bearer ${outsider.token}`)
      .send({ track: 'seo' });
    expect(res.status).toBe(403);
  });

  it('buildWeeks produces 12 ordered weeks with the right track fork', () => {
    for (const track of ['seo', 'social_media', 'google_ads']) {
      const weeks = buildWeeks(track);
      expect(weeks.length).toBe(12);
      expect(weeks.map((w) => w.week_number)).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
    }
  });
});
