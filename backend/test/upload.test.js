const { app, request, supabase, registerUser, deleteUser } = require('./helpers');

describe('project file upload', () => {
  const cleanup = [];
  const projectIds = [];
  afterEach(async () => {
    await Promise.all(projectIds.splice(0).map(async (id) => {
      const { data: files } = await supabase.storage.from('project-submissions').list(id);
      if (files?.length) await supabase.storage.from('project-submissions').remove(files.map((f) => `${id}/${f.name}`));
      await supabase.from('projects').delete().eq('id', id);
    }));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('attaches a file to the mentee\'s own project and sets a public file_url', async () => {
    const { token, email } = await registerUser('mentee');
    cleanup.push(email);

    const submit = await request(app).post('/api/projects').set('Authorization', `Bearer ${token}`).send({
      week_number: 1, title: 'Portfolio',
    });
    const projectId = submit.body.project.id;
    projectIds.push(projectId);

    const res = await request(app)
      .post(`/api/projects/${projectId}/upload`)
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('hello world'), 'notes.txt');

    expect(res.status).toBe(201);
    expect(res.body.project.file_url).toMatch(/project-submissions.*notes|\.txt/);
  });

  it('rejects an upload to a project owned by someone else', async () => {
    const owner = await registerUser('mentee');
    const other = await registerUser('mentee');
    cleanup.push(owner.email, other.email);

    const submit = await request(app).post('/api/projects').set('Authorization', `Bearer ${owner.token}`).send({
      week_number: 1, title: 'Portfolio',
    });
    projectIds.push(submit.body.project.id);

    const res = await request(app)
      .post(`/api/projects/${submit.body.project.id}/upload`)
      .set('Authorization', `Bearer ${other.token}`)
      .attach('file', Buffer.from('hello world'), 'notes.txt');

    expect(res.status).toBe(404);
  });

  it('rejects a request with no file', async () => {
    const { token, email } = await registerUser('mentee');
    cleanup.push(email);

    const submit = await request(app).post('/api/projects').set('Authorization', `Bearer ${token}`).send({
      week_number: 1, title: 'Portfolio',
    });
    projectIds.push(submit.body.project.id);

    const res = await request(app).post(`/api/projects/${submit.body.project.id}/upload`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });
});
