const { app, request, registerUser, deleteUser } = require('./helpers');

describe('auth', () => {
  const cleanup = [];
  afterEach(async () => { await Promise.all(cleanup.splice(0).map(deleteUser)); });

  it('registers and returns a working token', async () => {
    const { token, profile, email } = await registerUser('mentee');
    cleanup.push(email);

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.profile.id).toBe(profile.id);
  });

  it('rejects registration without a role', async () => {
    const res = await request(app).post('/api/auth/register').send({
      full_name: 'No Role', email: 'no-role@example.test', password: 'TestPass123!',
    });
    expect(res.status).toBe(400);
  });

  /* Regression test for the session-bleed bug: logging in used to call
     signInWithPassword() on the shared service-role client, silently
     switching every other request on that singleton onto the logged-in
     user's RLS-restricted context until the next login. If this ever
     comes back, an unrelated route hit right after a login is the
     fastest way to see it fail — RLS would reject or empty-filter a
     service-role query that should see everything. */
  it('logging in does not corrupt the shared service-role client for other requests', async () => {
    const { email } = await registerUser('mentee');
    cleanup.push(email);

    const login = await request(app).post('/api/auth/login').send({ email, password: 'TestPass123!' });
    expect(login.status).toBe(200);
    const { token } = login.body;

    // Any route using the service-role `supabase` client, right after login.
    const me = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(me.status).toBe(200);

    const paths = await request(app).get('/api/learning/paths').set('Authorization', `Bearer ${token}`);
    expect(paths.status).toBe(200);
  });

  it('rejects a request with no token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });
});
