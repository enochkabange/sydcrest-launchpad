const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    // Every test hits the real Supabase project over the network (see
    // test/helpers.js) — 5s default is too tight for a register + a few
    // chained DB calls in one test.
    testTimeout: 20000,
    hookTimeout: 20000,
    // These are integration tests against the real Supabase Auth admin API
    // (see test/helpers.js), which has its own internal rate limits — five
    // files hammering it in parallel workers produced intermittent
    // "Database error creating new user" / empty-body failures that had
    // nothing to do with the code under test. Sequential is slower but
    // deterministic, which matters more for a CI gate than raw speed.
    fileParallelism: false,
    // The backend is CommonJS throughout (no "type": "module"), and vitest
    // itself is ESM-only — `require('vitest')` fails. Globals sidesteps
    // that: describe/it/expect become ambient, no import needed in tests.
    globals: true,
  },
});
