const { app, request, supabase, registerAdmin, deleteUser } = require('./helpers');

async function createTestProgram(overrides = {}) {
  const { data, error } = await supabase
    .from('programs')
    .insert({
      name: 'Applications Test Program',
      slug: `apps-test-${Date.now()}`,
      is_active: true,
      screening_test: {
        questions: [
          { question: '2 + 2?', options: ['3', '4', '5'], correct_index: 1 },
          { question: 'Capital of Ghana?', options: ['Accra', 'Lagos', 'Nairobi'], correct_index: 0 },
        ],
      },
      ...overrides,
    })
    .select().single();
  if (error) throw error;
  return data;
}

describe('applications', () => {
  const programIds = [];
  const applicationIds = [];
  const cleanup = [];

  afterEach(async () => {
    await Promise.all(applicationIds.splice(0).map((id) => supabase.from('applications').delete().eq('id', id)));
    await Promise.all(programIds.splice(0).map((id) => supabase.from('programs').delete().eq('id', id)));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('GET /api/programs/:slug returns public program info', async () => {
    const program = await createTestProgram();
    programIds.push(program.id);

    const res = await request(app).get(`/api/programs/${program.slug}`);
    expect(res.status).toBe(200);
    expect(res.body.program.name).toBe('Applications Test Program');
    expect(res.body.program.screening_test.questions.length).toBe(2);
  });

  it('GET /api/programs lists active programs for the public Programs page', async () => {
    const program = await createTestProgram();
    programIds.push(program.id);

    const res = await request(app).get('/api/programs');
    expect(res.status).toBe(200);
    expect(res.body.programs.some((p) => p.id === program.id)).toBe(true);
  });

  it('GET /api/programs excludes inactive programs', async () => {
    const program = await createTestProgram({ is_active: false });
    programIds.push(program.id);

    const res = await request(app).get('/api/programs');
    expect(res.status).toBe(200);
    expect(res.body.programs.some((p) => p.id === program.id)).toBe(false);
  });

  it('GET /api/programs/dmp/curriculum returns real week themes per track', async () => {
    const res = await request(app).get('/api/programs/dmp/curriculum');
    expect(res.status).toBe(200);
    expect(res.body.tracks.length).toBe(3);
    for (const t of res.body.tracks) {
      expect(t.weeks.length).toBe(12);
      expect(t.weeks[0].theme).toBeTruthy();
    }
  });

  it('GET /api/programs/:slug/curriculum 404s for a non-DMP program', async () => {
    const program = await createTestProgram();
    programIds.push(program.id);

    const res = await request(app).get(`/api/programs/${program.slug}/curriculum`);
    expect(res.status).toBe(404);
  });

  it('404s for an unknown or inactive program slug', async () => {
    const res = await request(app).get('/api/programs/does-not-exist');
    expect(res.status).toBe(404);
  });

  it('submits an application, auto-scores the screening test, and the reference code checks status', async () => {
    const program = await createTestProgram();
    programIds.push(program.id);

    const submit = await request(app).post('/api/applications').send({
      program_id: program.id,
      full_name: 'Zulaiha Mahama',
      email: 'zulaiha.applicant@example.test',
      region: 'Northern',
      gender: 'female',
      is_underserved: true,
      essay: 'I want to learn digital marketing to grow my community.',
      screening_answers: [1, 0], // both correct
    });
    expect(submit.status).toBe(201);
    expect(submit.body.reference_code).toBeTruthy();

    const { data: row } = await supabase.from('applications').select('*').eq('reference_code', submit.body.reference_code).single();
    applicationIds.push(row.id);
    expect(row.screening_score).toBe(2);
    expect(row.status).toBe('applied');
    expect(row.is_underserved).toBe(true);

    const status = await request(app).get('/api/applications/status').query({
      email: 'zulaiha.applicant@example.test', reference_code: submit.body.reference_code,
    });
    expect(status.status).toBe(200);
    expect(status.body.application.status).toBe('applied');
  });

  // Regression test: the real Apply.jsx form sends "" for a skipped date
  // input, not undefined/omitted — Postgres rejects "" for a `date` column
  // outright ("invalid input syntax for type date"), caught via manual
  // browser testing, not by the tests above (which never send the field).
  it('accepts an empty string for date_of_birth as "not provided"', async () => {
    const program = await createTestProgram();
    programIds.push(program.id);

    const submit = await request(app).post('/api/applications').send({
      program_id: program.id, full_name: 'No DOB Given', email: 'no-dob@example.test',
      date_of_birth: '', region: '', gender: '',
    });
    expect(submit.status).toBe(201);
    applicationIds.push((await supabase.from('applications').select('id').eq('reference_code', submit.body.reference_code).single()).data.id);
  });

  it('rejects a status lookup with the wrong reference code', async () => {
    const program = await createTestProgram();
    programIds.push(program.id);

    const submit = await request(app).post('/api/applications').send({
      program_id: program.id, full_name: 'Test Applicant', email: 'wrong-ref@example.test',
    });
    applicationIds.push((await supabase.from('applications').select('id').eq('reference_code', submit.body.reference_code).single()).data.id);

    const status = await request(app).get('/api/applications/status').query({
      email: 'wrong-ref@example.test', reference_code: 'BADCODE',
    });
    expect(status.status).toBe(404);
  });

  it('allows reapplication: two applications for the same email and program both succeed', async () => {
    const program = await createTestProgram();
    programIds.push(program.id);

    const first = await request(app).post('/api/applications').send({
      program_id: program.id, full_name: 'Reapplicant', email: 'reapply@example.test',
    });
    const second = await request(app).post('/api/applications').send({
      program_id: program.id, full_name: 'Reapplicant', email: 'reapply@example.test',
    });
    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(first.body.reference_code).not.toBe(second.body.reference_code);

    const { data: rows } = await supabase.from('applications').select('id').eq('email', 'reapply@example.test');
    applicationIds.push(...rows.map((r) => r.id));
    expect(rows.length).toBe(2);
  });

  describe('review access', () => {
    it('mentee, mentor, and cohort_admin are all blocked from the review queue and decisions', async () => {
      const program = await createTestProgram();
      programIds.push(program.id);
      const submit = await request(app).post('/api/applications').send({
        program_id: program.id, full_name: 'Blocked Test', email: 'blocked@example.test',
      });
      applicationIds.push((await supabase.from('applications').select('id').eq('reference_code', submit.body.reference_code).single()).data.id);

      for (const role of ['mentee', 'mentor', 'cohort_admin']) {
        const user = await registerAdmin(role);
        cleanup.push(user.email);

        const list = await request(app).get('/api/applications').set('Authorization', `Bearer ${user.token}`);
        expect(list.status).toBe(403);

        const patch = await request(app).patch(`/api/applications/${applicationIds[0]}`).set('Authorization', `Bearer ${user.token}`).send({ status: 'accepted' });
        expect(patch.status).toBe(403);
      }
    });

    it('a reviewer can list and decide on an application', async () => {
      const program = await createTestProgram();
      programIds.push(program.id);
      const submit = await request(app).post('/api/applications').send({
        program_id: program.id, full_name: 'Reviewed Applicant', email: 'reviewed@example.test',
      });
      const appId = (await supabase.from('applications').select('id').eq('reference_code', submit.body.reference_code).single()).data.id;
      applicationIds.push(appId);

      const reviewer = await registerAdmin('reviewer');
      cleanup.push(reviewer.email);

      const list = await request(app).get('/api/applications').set('Authorization', `Bearer ${reviewer.token}`).query({ program_id: program.id });
      expect(list.status).toBe(200);
      expect(list.body.applications.some((a) => a.id === appId)).toBe(true);

      const decide = await request(app).patch(`/api/applications/${appId}`).set('Authorization', `Bearer ${reviewer.token}`).send({
        status: 'accepted', reviewer_notes: 'Strong essay, meets criteria.',
      });
      expect(decide.status).toBe(200);
      expect(decide.body.application.status).toBe('accepted');
      expect(decide.body.application.reviewer_id).toBe(reviewer.profile.id);
      expect(decide.body.application.decided_at).toBeTruthy();
    });
  });
});

describe('partner inquiries', () => {
  const inquiryIds = [];
  const cleanup = [];

  afterEach(async () => {
    await Promise.all(inquiryIds.splice(0).map((id) => supabase.from('partner_inquiries').delete().eq('id', id)));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('submits a partnership inquiry and a cohort_admin can list it', async () => {
    const submit = await request(app).post('/api/partner-inquiries').send({
      org_name: 'KNUST CS Club', contact_name: 'Ama Boateng', email: 'ama@example.test',
      inquiry_type: 'university', message: 'Interested in a cohort partnership.',
    });
    expect(submit.status).toBe(201);

    const admin = await registerAdmin('cohort_admin');
    cleanup.push(admin.email);

    const list = await request(app).get('/api/admin/partner-inquiries').set('Authorization', `Bearer ${admin.token}`);
    expect(list.status).toBe(200);
    const found = list.body.inquiries.find((i) => i.email === 'ama@example.test');
    expect(found).toBeTruthy();
    inquiryIds.push(found.id);
  });

  it('rejects a submission missing required fields', async () => {
    const res = await request(app).post('/api/partner-inquiries').send({ org_name: 'X' });
    expect(res.status).toBe(400);
  });
});
