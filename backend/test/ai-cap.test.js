/**
 * requireDailyAiCap is exercised directly (not through a route) because the
 * routes it guards are all requireAI-gated first, and this suite runs
 * without ANTHROPIC_API_KEY set — a route-level test would only ever see
 * requireAI's 503 and never reach the cap check.
 */
const { supabase, registerUser, deleteUser } = require('./helpers');
const { requireDailyAiCap, DAILY_CAP } = require('../src/services/claude');

function mockRes() {
  const res = {};
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => { res.body = body; return res; };
  return res;
}

describe('requireDailyAiCap', () => {
  const cleanup = [];
  const logIds = [];
  afterEach(async () => {
    await Promise.all(logIds.splice(0).map((id) => supabase.from('audit_logs').delete().eq('id', id)));
    await Promise.all(cleanup.splice(0).map(deleteUser));
  });

  it('blocks once today\'s ai.* audit_logs count reaches the cap', async () => {
    const { profile, email } = await registerUser('mentee');
    cleanup.push(email);

    const rows = Array.from({ length: DAILY_CAP }, () => ({ user_id: profile.id, action: 'ai.chat' }));
    const { data: inserted, error } = await supabase.from('audit_logs').insert(rows).select('id');
    expect(error).toBeNull();
    logIds.push(...inserted.map((r) => r.id));

    const res = mockRes();
    let nextCalled = false;
    await requireDailyAiCap({ user: profile }, res, () => { nextCalled = true; });

    expect(nextCalled).toBe(false);
    expect(res.statusCode).toBe(429);
    expect(res.body.error).toMatch(/daily ai usage limit/i);
  });

  it('allows the call through below the cap', async () => {
    const { profile, email } = await registerUser('mentee');
    cleanup.push(email);

    const res = mockRes();
    let nextCalled = false;
    await requireDailyAiCap({ user: profile }, res, () => { nextCalled = true; });

    expect(nextCalled).toBe(true);
    expect(res.statusCode).toBeUndefined();
  });

  it('only counts today\'s usage, not a prior day\'s', async () => {
    const { profile, email } = await registerUser('mentee');
    cleanup.push(email);

    const yesterday = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    const rows = Array.from({ length: DAILY_CAP }, () => ({ user_id: profile.id, action: 'ai.chat', created_at: yesterday }));
    const { data: inserted, error } = await supabase.from('audit_logs').insert(rows).select('id');
    expect(error).toBeNull();
    logIds.push(...inserted.map((r) => r.id));

    const res = mockRes();
    let nextCalled = false;
    await requireDailyAiCap({ user: profile }, res, () => { nextCalled = true; });

    expect(nextCalled).toBe(true);
    expect(res.statusCode).toBeUndefined();
  });
});
