const { app, request, registerUser, deleteUser } = require('./helpers');

/* Skipped if a real key is ever set (CI or local) — this test is
   specifically about the unconfigured path, not a statement that AI
   should never work. See services/claude.js. */
describe.skipIf(Boolean(process.env.ANTHROPIC_API_KEY))('AI endpoints without ANTHROPIC_API_KEY', () => {
  const cleanup = [];
  afterEach(async () => { await Promise.all(cleanup.splice(0).map(deleteUser)); });

  it('every AI route returns a clear 503 instead of a raw SDK auth error', async () => {
    const { token, email } = await registerUser('mentee');
    cleanup.push(email);

    const calls = [
      request(app).post('/api/learning/paths/generate').set('Authorization', `Bearer ${token}`).send({ track: 'frontend' }),
      request(app).post('/api/learning/chat').set('Authorization', `Bearer ${token}`).send({ messages: [{ role: 'user', content: 'hi' }] }),
      request(app).post('/api/learning/quiz/generate').set('Authorization', `Bearer ${token}`).send({ week_number: 1, track: 'frontend' }),
      request(app).post('/api/projects/00000000-0000-0000-0000-000000000000/ai-assess').set('Authorization', `Bearer ${token}`),
    ];

    for (const call of await Promise.all(calls)) {
      expect(call.status).toBe(503);
      expect(call.body.error).toMatch(/not configured/i);
    }
  });
});
