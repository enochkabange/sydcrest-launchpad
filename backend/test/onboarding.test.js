const { app, request, supabase, registerUser, registerAdmin, deleteUser, createCohort, cleanupCohort } = require('./helpers');

function isoAgo(years) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d.toISOString().slice(0, 10);
}

async function createTestProgram() {
  const { data, error } = await supabase
    .from('programs')
    .insert({ name: 'Onboarding Test Program', slug: `onb-test-${Date.now()}`, is_active: true })
    .select().single();
  if (error) throw error;
  return data;
}

async function createAcceptedApplication({ program_id, email, date_of_birth }) {
  const { data, error } = await supabase
    .from('applications')
    .insert({
      program_id, full_name: 'Onboarding Test Applicant', email, date_of_birth,
      status: 'accepted', reference_code: `onb-${require('crypto').randomUUID()}`,
    })
    .select().single();
  if (error) throw error;
  return data;
}

describe('onboarding', () => {
  const cleanup = [];
  const cohortIds = [];
  const applicationIds = [];
  const programIds = [];

  afterEach(async () => {
    await Promise.all(applicationIds.splice(0).map((id) => supabase.from('applications').delete().eq('id', id)));
    await Promise.all(programIds.splice(0).map((id) => supabase.from('programs').delete().eq('id', id)));
    await Promise.all(cohortIds.splice(0).map(cleanupCohort));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('mentee self-service: device check and orientation complete stamp timestamps', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    const enrollRes = await request(app).post(`/api/admin/cohorts/${cohort.id}/enroll`).set('Authorization', `Bearer ${admin.token}`).send({
      mentee_ids: [mentee.profile.id],
    });
    expect(enrollRes.status).toBe(200);
    expect(enrollRes.body.enrolled).toBe(1);
    expect(enrollRes.body.guardian_consent_flagged).toBe(0);

    const before = await request(app).get('/api/onboarding/me').set('Authorization', `Bearer ${mentee.token}`);
    expect(before.status).toBe(200);
    expect(before.body.enrollment.device_check_completed_at).toBeNull();

    const deviceCheck = await request(app).post('/api/onboarding/device-check').set('Authorization', `Bearer ${mentee.token}`).send({
      device_type: 'Android phone', data_plan: '2GB/month', availability_hours: 'Weekday evenings',
    });
    expect(deviceCheck.status).toBe(200);
    expect(deviceCheck.body.enrollment.device_check_completed_at).toBeTruthy();
    expect(deviceCheck.body.enrollment.device_type).toBe('Android phone');

    const orientation = await request(app).post('/api/onboarding/orientation-complete').set('Authorization', `Bearer ${mentee.token}`);
    expect(orientation.status).toBe(200);
    expect(orientation.body.enrollment.orientation_completed_at).toBeTruthy();
  });

  it('auto-flags guardian_consent_required from a matching accepted minor application, and the roster/guardian-email/consent flow works end to end', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    const program = await createTestProgram();
    programIds.push(program.id);
    const application = await createAcceptedApplication({ program_id: program.id, email: mentee.email, date_of_birth: isoAgo(15) });
    applicationIds.push(application.id);

    const enrollRes = await request(app).post(`/api/admin/cohorts/${cohort.id}/enroll`).set('Authorization', `Bearer ${admin.token}`).send({
      mentee_ids: [mentee.profile.id],
    });
    expect(enrollRes.status).toBe(200);
    expect(enrollRes.body.guardian_consent_flagged).toBe(1);

    const roster = await request(app).get(`/api/admin/cohorts/${cohort.id}/enrollments`).set('Authorization', `Bearer ${admin.token}`);
    expect(roster.status).toBe(200);
    expect(roster.body.enrollments).toHaveLength(1);
    expect(roster.body.enrollments[0].guardian_consent_required).toBe(true);
    const enrollmentId = roster.body.enrollments[0].id;

    const guardianEmail = await request(app).patch(`/api/admin/enrollments/${enrollmentId}/guardian-email`).set('Authorization', `Bearer ${admin.token}`).send({
      guardian_email: 'guardian.zulaiha@example.test',
    });
    expect(guardianEmail.status).toBe(200);
    expect(guardianEmail.body.confirmation_url).toContain('/guardian-consent/');
    const token = guardianEmail.body.confirmation_url.split('/guardian-consent/')[1];

    const consentInfo = await request(app).get(`/api/onboarding/guardian-consent/${token}`);
    expect(consentInfo.status).toBe(200);
    expect(consentInfo.body.already_confirmed).toBe(false);
    expect(consentInfo.body.cohort_name).toBe(cohort.name);

    const confirm = await request(app).post(`/api/onboarding/guardian-consent/${token}`);
    expect(confirm.status).toBe(200);
    expect(confirm.body.success).toBe(true);

    const confirmAgain = await request(app).post(`/api/onboarding/guardian-consent/${token}`);
    expect(confirmAgain.status).toBe(200);
    expect(confirmAgain.body.already_confirmed).toBe(true);
  });

  it('does not flag guardian consent for an adult applicant, and refuses guardian-email when not flagged', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    const program = await createTestProgram();
    programIds.push(program.id);
    const application = await createAcceptedApplication({ program_id: program.id, email: mentee.email, date_of_birth: isoAgo(25) });
    applicationIds.push(application.id);

    const enrollRes = await request(app).post(`/api/admin/cohorts/${cohort.id}/enroll`).set('Authorization', `Bearer ${admin.token}`).send({
      mentee_ids: [mentee.profile.id],
    });
    expect(enrollRes.body.guardian_consent_flagged).toBe(0);

    const roster = await request(app).get(`/api/admin/cohorts/${cohort.id}/enrollments`).set('Authorization', `Bearer ${admin.token}`);
    const enrollmentId = roster.body.enrollments[0].id;

    const guardianEmail = await request(app).patch(`/api/admin/enrollments/${enrollmentId}/guardian-email`).set('Authorization', `Bearer ${admin.token}`).send({
      guardian_email: 'shouldnotmatter@example.test',
    });
    expect(guardianEmail.status).toBe(400);
  });

  it('a bogus guardian consent token 404s on both GET and POST', async () => {
    const get = await request(app).get('/api/onboarding/guardian-consent/not-a-real-token');
    expect(get.status).toBe(404);
    const post = await request(app).post('/api/onboarding/guardian-consent/not-a-real-token');
    expect(post.status).toBe(404);
  });

  it('pairs buddies symmetrically, is idempotent, and leaves an odd one out unpaired', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);

    const mentees = [];
    for (let i = 0; i < 3; i++) {
      const m = await registerUser('mentee');
      cleanup.push(m.email);
      mentees.push(m);
    }

    await request(app).post(`/api/admin/cohorts/${cohort.id}/enroll`).set('Authorization', `Bearer ${admin.token}`).send({
      mentee_ids: mentees.map((m) => m.profile.id),
    });

    const pair = await request(app).post(`/api/admin/cohorts/${cohort.id}/pair-buddies`).set('Authorization', `Bearer ${admin.token}`);
    expect(pair.status).toBe(200);
    expect(pair.body.paired).toBe(2);
    expect(pair.body.unpaired_leftover).toBe(1);

    const { data: rows } = await supabase.from('enrollments').select('mentee_id, buddy_id').eq('cohort_id', cohort.id);
    const buddyById = new Map(rows.map((r) => [r.mentee_id, r.buddy_id]));
    const paired = rows.filter((r) => r.buddy_id);
    expect(paired).toHaveLength(2);
    for (const row of paired) {
      expect(buddyById.get(row.buddy_id)).toBe(row.mentee_id); // symmetric
    }
    const unpaired = rows.filter((r) => !r.buddy_id);
    expect(unpaired).toHaveLength(1);

    // Idempotent: re-running doesn't touch the already-paired two, and
    // the unpaired third stays alone (no group-of-three).
    const again = await request(app).post(`/api/admin/cohorts/${cohort.id}/pair-buddies`).set('Authorization', `Bearer ${admin.token}`);
    expect(again.status).toBe(200);
    expect(again.body.paired).toBe(0);
    expect(again.body.unpaired_leftover).toBe(1);
  });

  it('mentee and mentor are blocked from onboarding admin routes', async () => {
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    const enrollBlocked = await request(app).post(`/api/admin/cohorts/${cohort.id}/enroll`).set('Authorization', `Bearer ${mentee.token}`).send({
      mentee_ids: [mentee.profile.id],
    });
    expect(enrollBlocked.status).toBe(403);

    const pairBlocked = await request(app).post(`/api/admin/cohorts/${cohort.id}/pair-buddies`).set('Authorization', `Bearer ${mentee.token}`);
    expect(pairBlocked.status).toBe(403);
  });

  it('/api/onboarding/me 404s when the caller has no enrollment', async () => {
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    const res = await request(app).get('/api/onboarding/me').set('Authorization', `Bearer ${mentee.token}`);
    expect(res.status).toBe(404);
  });
});
