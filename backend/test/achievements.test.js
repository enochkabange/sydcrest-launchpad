const { app, request, supabase, registerUser, registerAdmin, deleteUser, createCohort, cleanupCohort } = require('./helpers');

async function createTestProgram(overrides = {}) {
  const { data, error } = await supabase
    .from('programs')
    .insert({ name: 'Achievements Test Program', slug: `ach-test-${Date.now()}`, is_active: true, ...overrides })
    .select().single();
  if (error) throw error;
  return data;
}

async function createAcceptedApplication({ program_id, email }) {
  const { data, error } = await supabase
    .from('applications')
    .insert({ program_id, full_name: 'Achievements Test Applicant', email, status: 'accepted', reference_code: `ach-${require('crypto').randomUUID()}` })
    .select().single();
  if (error) throw error;
  return data;
}

describe('achievements & milestones', () => {
  const cleanup = [];
  const cohortIds = [];
  const programIds = [];
  const applicationIds = [];

  afterEach(async () => {
    await Promise.all(applicationIds.splice(0).map((id) => supabase.from('applications').delete().eq('id', id)));
    await Promise.all(cohortIds.splice(0).map(cleanupCohort));
    // achievements minted with type 'accepted' (auth.js's register handler)
    // carry program_id but no cohort_id, so cleanupCohort's cohort-scoped
    // delete above never touches them — left in place, they silently fail
    // (unchecked error) the programs delete below via
    // achievements_program_id_fkey, orphaning the program row in
    // production forever. This is the actual root cause found while
    // debugging why "Achievements Test Program" rows kept reappearing.
    await Promise.all(programIds.map((id) => supabase.from('achievements').delete().eq('program_id', id)));
    await Promise.all(programIds.splice(0).map((id) => supabase.from('programs').delete().eq('id', id)));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('mints "accepted" exactly once whether registration happens before or after acceptance', async () => {
    const program = await createTestProgram();
    programIds.push(program.id);
    const admin = await registerAdmin('reviewer');
    cleanup.push(admin.email);

    const email1 = `accept-then-register-${Date.now()}@example.test`;
    const email2 = `register-then-accept-${Date.now()}@example.test`;

    // Order 1: accept, then register.
    const app1 = await createAcceptedApplication({ program_id: program.id, email: email1 });
    applicationIds.push(app1.id);
    // Re-PATCH the same decision — this route is re-callable (a reviewer
    // can revise), so this also proves the accept-handler mint is safe.
    await request(app).patch(`/api/applications/${app1.id}`).set('Authorization', `Bearer ${admin.token}`).send({ status: 'accepted' });
    await request(app).patch(`/api/applications/${app1.id}`).set('Authorization', `Bearer ${admin.token}`).send({ status: 'accepted' });

    const registered1 = await registerUser('mentee', { email: email1 });
    cleanup.push(registered1.email);

    const { data: rows1 } = await supabase.from('achievements').select('*').eq('mentee_id', registered1.profile.id).eq('type', 'accepted');
    expect(rows1).toHaveLength(1);

    // Order 2: register, then accept.
    const registered2 = await registerUser('mentee', { email: email2 });
    cleanup.push(registered2.email);
    const app2 = await createAcceptedApplication({ program_id: program.id, email: email2 });
    applicationIds.push(app2.id);
    // Application starts 'applied' via the helper insert (status:
    // 'accepted' set directly) — PATCH again to go through the real
    // accept-handler mint path now that the profile already exists.
    await request(app).patch(`/api/applications/${app2.id}`).set('Authorization', `Bearer ${admin.token}`).send({ status: 'accepted' });

    const { data: rows2 } = await supabase.from('achievements').select('*').eq('mentee_id', registered2.profile.id).eq('type', 'accepted');
    expect(rows2).toHaveLength(1);
  });

  it('mints "enrolled" on cohort enrollment', async () => {
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    await request(app).post(`/api/admin/cohorts/${cohort.id}/enroll`).set('Authorization', `Bearer ${admin.token}`).send({ mentee_ids: [mentee.profile.id] });

    const { data } = await supabase.from('achievements').select('*').eq('mentee_id', mentee.profile.id).eq('type', 'enrolled');
    expect(data).toHaveLength(1);
    expect(data[0].nudge_worthy).toBe(false);
  });

  it('mints "week_completed" per week, nudge_worthy only on the halfway week', async () => {
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);
    await supabase.from('enrollments').insert({ mentee_id: mentee.profile.id, cohort_id: cohort.id });

    const { data: path } = await supabase.from('learning_paths').insert({
      mentee_id: mentee.profile.id, cohort_id: cohort.id, title: 'T', track: 'frontend', total_weeks: 4,
    }).select().single();
    const { data: weeks } = await supabase.from('learning_weeks').insert([
      { path_id: path.id, week_number: 1, theme: 'W1' },
      { path_id: path.id, week_number: 2, theme: 'W2' },
    ]).select();
    const week1 = weeks.find((w) => w.week_number === 1);
    const week2 = weeks.find((w) => w.week_number === 2);

    await request(app).post(`/api/learning/weeks/${week1.id}/complete`).set('Authorization', `Bearer ${mentee.token}`).send({});
    await request(app).post(`/api/learning/weeks/${week2.id}/complete`).set('Authorization', `Bearer ${mentee.token}`).send({});

    const { data } = await supabase.from('achievements').select('*').eq('mentee_id', mentee.profile.id).eq('type', 'week_completed').order('scope_key');
    expect(data).toHaveLength(2);
    expect(data.find((a) => a.scope_key.endsWith(':1')).nudge_worthy).toBe(false);
    expect(data.find((a) => a.scope_key.endsWith(':2')).nudge_worthy).toBe(true); // ceil(4/2) = 2
  });

  it('mints "project_approved" exactly once even if a mentor re-reviews the same project', async () => {
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    const submit = await request(app).post('/api/projects').set('Authorization', `Bearer ${mentee.token}`).send({
      cohort_id: cohort.id, week_number: 1, title: 'A Project', submission_url: 'https://example.test',
    });
    const projectId = submit.body.project.id;

    await request(app).post(`/api/projects/${projectId}/review`).set('Authorization', `Bearer ${mentor.token}`).send({ status: 'approved' });
    await request(app).post(`/api/projects/${projectId}/review`).set('Authorization', `Bearer ${mentor.token}`).send({ status: 'approved' });

    const { data } = await supabase.from('achievements').select('*').eq('mentee_id', mentee.profile.id).eq('type', 'project_approved');
    expect(data).toHaveLength(1);
  });

  it('the public achievement page renders OG tags for a real one and blocks a minor\'s', async () => {
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id);
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    const { data: achievement } = await supabase.from('achievements').insert({
      mentee_id: mentee.profile.id, type: 'enrolled', cohort_id: cohort.id,
      scope_key: `enrolled:${cohort.id}`, label: 'Enrolled in a cohort', is_minor: false,
    }).select().single();

    const page = await request(app).get(`/api/achievements/${achievement.id}`);
    expect(page.status).toBe(200);
    expect(page.text).toContain('og:title');
    expect(page.text).toContain('Enrolled in a cohort');
    expect(page.text).not.toContain('<script');

    const { data: minorAchievement } = await supabase.from('achievements').insert({
      mentee_id: mentee.profile.id, type: 'enrolled', cohort_id: cohort.id,
      scope_key: `enrolled-minor:${cohort.id}`, label: 'Should not appear', is_minor: true,
    }).select().single();

    const blockedPage = await request(app).get(`/api/achievements/${minorAchievement.id}`);
    expect(blockedPage.status).toBe(200);
    expect(blockedPage.text).not.toContain('Should not appear');
    expect(blockedPage.text).toContain('Not available');
  });

  it('404s a bogus achievement id', async () => {
    const res = await request(app).get('/api/achievements/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });

  it('acknowledge is owner-only and dismisses the nudge', async () => {
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);
    const other = await registerUser('mentee');
    cleanup.push(other.email);

    const { data: achievement } = await supabase.from('achievements').insert({
      mentee_id: mentee.profile.id, type: 'accepted', scope_key: `accepted:test-${Date.now()}`,
      label: 'Accepted', nudge_worthy: true,
    }).select().single();

    const forbidden = await request(app).post(`/api/achievements/${achievement.id}/acknowledge`).set('Authorization', `Bearer ${other.token}`);
    expect(forbidden.status).toBe(404);

    const ok = await request(app).post(`/api/achievements/${achievement.id}/acknowledge`).set('Authorization', `Bearer ${mentee.token}`);
    expect(ok.status).toBe(200);

    const nudges = await request(app).get('/api/achievements/me?nudge=true').set('Authorization', `Bearer ${mentee.token}`);
    expect(nudges.body.achievements.find((a) => a.id === achievement.id)).toBeUndefined();
  });
});

describe('certification', () => {
  const cleanup = [];
  const cohortIds = [];
  const programIds = [];

  afterEach(async () => {
    await Promise.all(cohortIds.splice(0).map(cleanupCohort));
    await Promise.all(programIds.splice(0).map((id) => supabase.from('programs').delete().eq('id', id)));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  async function setUpReadyMentee({ requiresPeerReview = false } = {}) {
    const program = await createTestProgram({
      certification_criteria: { min_completion_pct: 80, requires_all_projects: true, requires_peer_review: requiresPeerReview },
    });
    programIds.push(program.id);
    const admin = await registerAdmin('platform_admin');
    cleanup.push(admin.email);
    const mentor = await registerUser('mentor');
    cleanup.push(mentor.email);
    const cohort = await createCohort(mentor.profile.id, { program_id: program.id });
    cohortIds.push(cohort.id);
    const mentee = await registerUser('mentee');
    cleanup.push(mentee.email);

    await supabase.from('enrollments').insert({ mentee_id: mentee.profile.id, cohort_id: cohort.id });
    const { data: path } = await supabase.from('learning_paths').insert({
      mentee_id: mentee.profile.id, cohort_id: cohort.id, title: 'T', track: 'frontend', total_weeks: 2,
    }).select().single();
    await supabase.from('learning_weeks').insert([
      { path_id: path.id, week_number: 1, theme: 'W1', status: 'completed' },
      { path_id: path.id, week_number: 2, theme: 'W2', status: 'completed' },
    ]);
    await supabase.from('projects').insert({ mentee_id: mentee.profile.id, cohort_id: cohort.id, week_number: 1, title: 'P1', status: 'approved' });

    return { admin, mentor, cohort, mentee };
  }

  it('flags a mentee ready once they meet the program\'s certification_criteria', async () => {
    const { admin, cohort, mentee } = await setUpReadyMentee();

    const candidates = await request(app).get(`/api/admin/cohorts/${cohort.id}/certification-candidates`).set('Authorization', `Bearer ${admin.token}`);
    expect(candidates.status).toBe(200);
    const candidate = candidates.body.candidates.find((c) => c.mentee_id === mentee.profile.id);
    expect(candidate.ready).toBe(true);
    expect(candidate.completion_pct).toBe(100);
  });

  it('reports not-ready when requires_peer_review is set, since no peer-review system exists', async () => {
    const { admin, cohort, mentee } = await setUpReadyMentee({ requiresPeerReview: true });

    const candidates = await request(app).get(`/api/admin/cohorts/${cohort.id}/certification-candidates`).set('Authorization', `Bearer ${admin.token}`);
    const candidate = candidates.body.candidates.find((c) => c.mentee_id === mentee.profile.id);
    expect(candidate.ready).toBe(false);
  });

  it('certifies a ready mentee: creates a certificate, mints "certified", sets enrollment graduated, and refuses to double-certify', async () => {
    const { admin, cohort, mentee } = await setUpReadyMentee();
    const { data: enrollment } = await supabase.from('enrollments').select('id').eq('mentee_id', mentee.profile.id).eq('cohort_id', cohort.id).single();

    const certify = await request(app).post(`/api/admin/enrollments/${enrollment.id}/certify`).set('Authorization', `Bearer ${admin.token}`);
    expect(certify.status).toBe(200);
    expect(certify.body.certificate.verification_id).toBeTruthy();
    expect(certify.body.certificate.badge_json.type).toContain('OpenBadgeCredential');

    const { data: updatedEnrollment } = await supabase.from('enrollments').select('status').eq('id', enrollment.id).single();
    expect(updatedEnrollment.status).toBe('graduated');

    const { data: achievements } = await supabase.from('achievements').select('*').eq('mentee_id', mentee.profile.id).eq('type', 'certified');
    expect(achievements).toHaveLength(1);
    expect(achievements[0].nudge_worthy).toBe(true);

    const again = await request(app).post(`/api/admin/enrollments/${enrollment.id}/certify`).set('Authorization', `Bearer ${admin.token}`);
    expect(again.status).toBe(400);

    const verificationId = certify.body.certificate.verification_id;
    const badge = await request(app).get(`/api/certificates/${verificationId}/badge.json`);
    expect(badge.status).toBe(200);
    expect(badge.body.credentialSubject.achievement.name).toBeTruthy();

    const page = await request(app).get(`/api/certificates/${verificationId}`);
    expect(page.status).toBe(200);
    expect(page.text).toContain('og:title');
    expect(page.text).toContain('Verification ID');
  });

  it('404s a bogus verification id on both the page and badge.json', async () => {
    const page = await request(app).get('/api/certificates/deadbeef00000000');
    expect(page.status).toBe(404);
    const badge = await request(app).get('/api/certificates/deadbeef00000000/badge.json');
    expect(badge.status).toBe(404);
  });

  it('mentee is blocked from certification-candidates, and a cohort_admin who does not run this cohort is blocked too', async () => {
    const { cohort } = await setUpReadyMentee();
    const outsiderMentee = await registerUser('mentee');
    cleanup.push(outsiderMentee.email);

    const blocked = await request(app).get(`/api/admin/cohorts/${cohort.id}/certification-candidates`).set('Authorization', `Bearer ${outsiderMentee.token}`);
    expect(blocked.status).toBe(403);

    // Same ownership check as pair-buddies/enrollments: a cohort_admin
    // clears the router-wide level gate but doesn't run *this* cohort.
    const otherAdmin = await registerAdmin('cohort_admin');
    cleanup.push(otherAdmin.email);
    const notOwner = await request(app).get(`/api/admin/cohorts/${cohort.id}/certification-candidates`).set('Authorization', `Bearer ${otherAdmin.token}`);
    expect(notOwner.status).toBe(403);
  });
});
