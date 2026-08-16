/**
 * Test helpers — integration tests, not unit tests.
 *
 * These run against the REAL Supabase project (SUPABASE_URL from .env),
 * the same one local dev and production use. Deliberate: the two worst
 * bugs found in this codebase (RLS infinite recursion, session bleed on
 * the shared service-role client) are both things a mocked Supabase
 * client would never have caught — they only exist at the boundary
 * between the app and a real Postgres instance with real RLS policies.
 * Every test that creates data MUST clean it up (afterEach below), same
 * discipline as the manual curl+cleanup verification this replaces.
 */
const request = require('supertest');

// index.js must load first — its `require('dotenv').config()` is what
// populates process.env before config/supabase.js's env-var check runs.
// Requiring supabase.js directly, first, would fail that check.
const app = require('../src/index');
const { supabase } = require('../src/config/supabase');

// crypto.randomUUID(), not a per-process counter: vitest runs test files in
// separate worker processes, each with its own counter starting at 0 — two
// files registering a user in the same millisecond could otherwise collide
// on email, which is exactly the "Database error creating new user" this
// was hitting intermittently.
const uniqueEmail = (label) => `test-${label}-${require('crypto').randomUUID()}@example.test`;

/** Registers a real user via the real API and returns { token, profile }. */
async function registerUser(role = 'mentee', overrides = {}) {
  const email = uniqueEmail(role);
  const res = await request(app).post('/api/auth/register').send({
    full_name: `Test ${role[0].toUpperCase()}${role.slice(1)}`,
    email,
    password: 'TestPass123!',
    role,
    ...overrides,
  });
  if (res.status !== 201) throw new Error(`registerUser failed: ${res.status} ${JSON.stringify(res.body)}`);
  return { token: res.body.token, profile: res.body.profile, email };
}

/** /api/auth/register only accepts role: mentee|mentor (by design — nobody
    self-registers as an admin). Test admin accounts the same way a real
    super_admin would create one: register normally, then promote via the
    service-role client directly. The existing JWT stays valid — it only
    encodes profileId/tokenVersion, and auth middleware re-fetches the
    profile (with its now-updated role) on every request. */
async function registerAdmin(role) {
  const user = await registerUser('mentee');
  const { error } = await supabase.from('profiles').update({ role }).eq('id', user.profile.id);
  if (error) throw error;
  user.profile.role = role;
  return user;
}

/** Deletes a test user's profile + auth.users row, and its email pattern
    guarantees this never touches real data (see uniqueEmail above). */
async function deleteUser(email) {
  await supabase.from('profiles').delete().eq('email', email);
  const { data } = await supabase.auth.admin.listUsers();
  const match = data?.users?.find((u) => u.email === email);
  if (match) await supabase.auth.admin.deleteUser(match.id);
}

async function createCohort(mentorId, overrides = {}) {
  const { data, error } = await supabase
    .from('cohorts')
    .insert({ name: 'Test Cohort', track: 'frontend', mentor_id: mentorId, ...overrides })
    .select().single();
  if (error) throw error;
  return data;
}

async function enroll(menteeId, cohortId) {
  const { data, error } = await supabase.from('enrollments').insert({ mentee_id: menteeId, cohort_id: cohortId }).select().single();
  if (error) throw error;
  return data;
}

/* Every table with a cohort_id FK, except enrollments — schema.sql gives
   enrollments.cohort_id ON DELETE CASCADE but deliberately not the rest
   (learning_paths, sessions, projects, project_rubrics, posts). Deleting
   a cohort while any of those still reference it fails the DELETE with a
   foreign-key violation. This helper's previous version didn't check the
   `error` Supabase returns on a failed delete, so that failure was
   silent — the cohort just... stayed, and 21 orphaned "T"/"Test Cohort"
   rows accumulated in the real Supabase project across several runs
   before this was caught via the admin dashboard's Overview tab. */
async function cleanupCohort(cohortId) {
  for (const table of ['enrollments', 'learning_paths', 'sessions', 'projects', 'project_rubrics', 'posts']) {
    const { error } = await supabase.from(table).delete().eq('cohort_id', cohortId);
    if (error) throw new Error(`cleanupCohort: failed to clear ${table} for cohort ${cohortId}: ${error.message}`);
  }
  const { error } = await supabase.from('cohorts').delete().eq('id', cohortId);
  if (error) throw new Error(`cleanupCohort: failed to delete cohort ${cohortId}: ${error.message}`);
}

module.exports = { app, request, supabase, registerUser, registerAdmin, deleteUser, createCohort, enroll, cleanupCohort };
