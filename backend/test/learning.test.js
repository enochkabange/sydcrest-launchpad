const { app, request, supabase, registerUser, deleteUser } = require('./helpers');

async function seedPath(menteeId, weekCount = 2) {
  const { data: path } = await supabase
    .from('learning_paths')
    .insert({ mentee_id: menteeId, title: 'Test Path', track: 'frontend', total_weeks: weekCount })
    .select().single();
  const weeks = [];
  for (let i = 1; i <= weekCount; i++) {
    const { data: week } = await supabase
      .from('learning_weeks')
      .insert({ path_id: path.id, week_number: i, theme: `Theme ${i}` })
      .select().single();
    weeks.push(week);
  }
  return { path, weeks };
}

describe('learning', () => {
  const cleanup = [];
  afterEach(async () => { await Promise.all(cleanup.splice(0).map(deleteUser)); });

  it('an account with no path gets an empty list, not an error', async () => {
    const { token, email } = await registerUser('mentee');
    cleanup.push(email);

    const res = await request(app).get('/api/learning/paths').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.paths).toEqual([]);
  });

  it('lists a path with computed completion percentage', async () => {
    const { token, profile, email } = await registerUser('mentee');
    cleanup.push(email);
    const { path } = await seedPath(profile.id, 2);

    const res = await request(app).get('/api/learning/paths').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    const listed = res.body.paths.find((p) => p.id === path.id);
    expect(listed.weeks_total).toBe(2);
    expect(listed.weeks_completed).toBe(0);
    expect(listed.percent_complete).toBe(0);
  });

  it('rejects a path that belongs to someone else with 404, not the data', async () => {
    const owner = await registerUser('mentee');
    const stranger = await registerUser('mentee');
    cleanup.push(owner.email, stranger.email);
    const { path } = await seedPath(owner.profile.id, 1);

    const res = await request(app).get(`/api/learning/weeks/${path.id}`).set('Authorization', `Bearer ${stranger.token}`);
    expect(res.status).toBe(404);
  });

  it('completing a week rolls up into the enrollment: streak starts at 1, not 0', async () => {
    // Regression test: last_active defaults to now() at enrollment creation,
    // not null — the first draft of this logic used that to mean "never
    // active" and left streak_days at its 0 default on a mentee's very
    // first completion. xp_points === 0 is the real "first ever" signal.
    const mentor = await registerUser('mentor');
    const mentee = await registerUser('mentee');
    cleanup.push(mentor.email, mentee.email);

    const { data: cohort } = await supabase.from('cohorts').insert({ name: 'T', track: 'frontend', mentor_id: mentor.profile.id }).select().single();
    await supabase.from('enrollments').insert({ mentee_id: mentee.profile.id, cohort_id: cohort.id });
    const { data: path } = await supabase.from('learning_paths').insert({ mentee_id: mentee.profile.id, cohort_id: cohort.id, title: 'T', track: 'frontend', total_weeks: 1 }).select().single();
    const { data: week } = await supabase.from('learning_weeks').insert({ path_id: path.id, week_number: 1, theme: 'T' }).select().single();

    const res = await request(app).post(`/api/learning/weeks/${week.id}/complete`).set('Authorization', `Bearer ${mentee.token}`).send({});
    expect(res.status).toBe(200);

    const { data: enrollment } = await supabase.from('enrollments').select('*').eq('mentee_id', mentee.profile.id).single();
    expect(enrollment.streak_days).toBe(1);
    expect(enrollment.xp_points).toBe(100);

    await supabase.from('enrollments').delete().eq('cohort_id', cohort.id);
    await supabase.from('cohorts').delete().eq('id', cohort.id);
  });

  it('completing the same week twice is rejected with 409', async () => {
    const { token, profile, email } = await registerUser('mentee');
    cleanup.push(email);
    const { weeks } = await seedPath(profile.id, 1);

    const first = await request(app).post(`/api/learning/weeks/${weeks[0].id}/complete`).set('Authorization', `Bearer ${token}`).send({});
    expect(first.status).toBe(200);
    const second = await request(app).post(`/api/learning/weeks/${weeks[0].id}/complete`).set('Authorization', `Bearer ${token}`).send({});
    expect(second.status).toBe(409);
  });
});
