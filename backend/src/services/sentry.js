/**
 * Sentry error monitoring — MASTER_PLAN Phase D requires this live before
 * the pilot. Same no-key-no-crash convention as services/claude.js: inert
 * with no SENTRY_DSN, active the moment one is set, no route or middleware
 * needs its own "is this configured" check.
 *
 * Loaded first in index.js (before other requires) per Sentry's own
 * guidance — auto-instrumentation only covers what's imported after init.
 */
const Sentry = require('@sentry/node');

const enabled = Boolean(process.env.SENTRY_DSN);

if (enabled) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    // Pilot-scale traffic — sampling everything would cost nothing at this
    // volume, but 10% keeps the habit of not defaulting to 100% as traffic
    // grows.
    tracesSampleRate: 0.1,
  });
}

module.exports = { Sentry, enabled };
