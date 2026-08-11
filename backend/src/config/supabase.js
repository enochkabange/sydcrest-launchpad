/**
 * Supabase clients.
 *
 * Two clients, deliberately separate:
 *   supabase       — service-role key. Bypasses Row Level Security. Server-side
 *                    only, never exposed to the browser. This is what the route
 *                    modules use, because authorisation is enforced by the JWT
 *                    middleware before a query runs.
 *   supabaseAnon   — anon key. Respects RLS. Use when acting *as* a learner.
 *
 * RLS is still required on all 24 tables (MASTER_PLAN §6) — it is defence in
 * depth behind the API, not a replacement for it. A service-role key that
 * leaks is a full database compromise, so it lives only in Railway env vars.
 */
const { createClient } = require('@supabase/supabase-js');

const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_ANON_KEY'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  /* Fail at boot, not on the first request. A half-configured server that
     accepts traffic and 500s on every query is worse than one that won't start. */
  throw new Error(
    `Missing required environment variables: ${missing.join(', ')}. ` +
    `Copy .env.example to .env and fill them in.`
  );
}

const options = {
  auth: { persistSession: false, autoRefreshToken: false },
};

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  options
);

const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  options
);

module.exports = { supabase, supabaseAnon };
