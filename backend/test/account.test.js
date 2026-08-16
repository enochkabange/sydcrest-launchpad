const { app, request, registerUser, deleteUser } = require('./helpers');
const { supabaseAnon } = require('../src/config/supabase');

describe('account basics', () => {
  const cleanup = [];
  afterEach(async () => { await Promise.all(cleanup.splice(0).map(deleteUser)); });

  describe('PATCH /api/auth/me', () => {
    it('updates editable fields and leaves email/role untouched', async () => {
      const { token, email } = await registerUser('mentee');
      cleanup.push(email);

      const res = await request(app)
        .patch('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ full_name: 'Fuseini Alhassan', phone: '+233201234567', region: 'Northern', bio: 'Self-taught, building in public.' });

      expect(res.status).toBe(200);
      expect(res.body.profile.full_name).toBe('Fuseini Alhassan');
      expect(res.body.profile.phone).toBe('+233201234567');
      expect(res.body.profile.region).toBe('Northern');
      expect(res.body.profile.bio).toBe('Self-taught, building in public.');
      expect(res.body.profile.email).toBe(email);
      expect(res.body.profile.role).toBe('mentee');
    });

    it('rejects an update with no editable fields', async () => {
      const { token, email } = await registerUser('mentee');
      cleanup.push(email);

      const res = await request(app).patch('/api/auth/me').set('Authorization', `Bearer ${token}`).send({});
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/reset-password', () => {
    it('resets the password given a valid Supabase access_token, and invalidates old sessions', async () => {
      const { token, email } = await registerUser('mentee');
      cleanup.push(email);

      const signIn = await supabaseAnon.auth.signInWithPassword({ email, password: 'TestPass123!' });
      expect(signIn.error).toBeNull();
      const accessToken = signIn.data.session.access_token;

      const reset = await request(app).post('/api/auth/reset-password').send({
        access_token: accessToken, new_password: 'NewPass456!',
      });
      expect(reset.status).toBe(200);

      // Old password no longer works.
      const oldLogin = await request(app).post('/api/auth/login').send({ email, password: 'TestPass123!' });
      expect(oldLogin.status).toBe(401);

      // New password does.
      const newLogin = await request(app).post('/api/auth/login').send({ email, password: 'NewPass456!' });
      expect(newLogin.status).toBe(200);

      // The pre-reset JWT is now stale (token_version bumped) — reused it
      // must be rejected, matching change-password's own guarantee.
      const staleUse = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
      expect(staleUse.status).toBe(401);
    });

    it('rejects a garbage access_token', async () => {
      const res = await request(app).post('/api/auth/reset-password').send({
        access_token: 'not-a-real-token', new_password: 'NewPass456!',
      });
      expect(res.status).toBe(401);
    });
  });
});
