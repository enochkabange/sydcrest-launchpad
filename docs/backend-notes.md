# Backend notes

Structure, decisions, and known gaps in `backend/`. Companion to
`docs/design-system.md` on the frontend side.

## What was migrated

The March 2026 code dump had four real files and a solid `schema.sql`, but no
project around them. Migrated into `backend/src/`:

| From the dump | Now |
|---|---|
| `index.js` | `src/index.js` — Express app, security middleware, route mounting |
| `auth.js` | `src/middleware/auth.js` — JWT verification, 5-level role hierarchy, audit helper |
| `mnt/.../routes/auth.js` | `src/routes/auth.js` — register / login / me |
| `admin.js` | `src/routes/admin.js` |
| `opportunities.js` | `src/routes/opportunities.js` |
| `schema.sql` | `backend/supabase/schema.sql` — 24 tables |

Written from scratch because `index.js` required them and they did not exist:
`config/supabase.js`, `services/whatsapp.js`, and route scaffolds for
`learning`, `projects`, `sessions`, `marketplace`, `community`.

## Two production bugs found and fixed during migration

**1. IPv6 rate-limit bypass.** The rate limiter used
`keyGenerator: req => req.ip`, keying on the raw address. An IPv6 user holds a
whole /64 and can rotate through billions of addresses, bypassing the limit
completely. Fixed by deleting the override — `express-rate-limit`'s default
already groups IPv6 by subnet. The library surfaced this as a startup
`ValidationError`; it was not caught earlier because the app had never run.

**2. Missing `trust proxy`.** Railway terminates TLS at a load balancer, so
without `app.set('trust proxy', 1)` every request arrives carrying the proxy's
address. `req.ip` would be identical for all users: the rate limiter would
bucket the entire cohort together and audit logs would record one meaningless
IP. Set to `1` (one hop), not `true` — `true` trusts any `X-Forwarded-For` a
client sends, which is trivially spoofable.

## Scaffolded routes

`learning`, `projects`, `sessions`, `marketplace`, and `community` mount and
enforce auth, but their handlers return **501** with the phase that owns them.
This is deliberate: a caller gets a truthful answer rather than a 404 that
looks like a routing bug, and `index.js` boots without edits.

`marketplace` and `community` are deferred on purpose, not just unbuilt —
the pilot cohort is free (so payments stay off the critical path) and WhatsApp
is the real community channel in Ghana.

## Claude model

`src/routes/opportunities.js` pinned `claude-sonnet-4-20250514`, which is
deprecated. It now uses **`claude-opus-5`**.

**This is a live cost decision, and it is yours to make.** `MASTER_PLAN.md`
§11 names AI spend as a risk and §6 requires per-user caps. Sonnet 5 is roughly
40% of Opus 5's input cost and would likely be sufficient for Study Buddy and
quiz generation; Opus 5 is the better default for opportunity research and
project assessment, where quality matters more. Change the single `MODEL`
constant to split them, and apply for Anthropic startup credits first
(`MASTER_PLAN.md` §8 flags this as "Immediately").

## Known gaps before the pilot

- **RLS policies** on all 24 tables — `schema.sql` creates tables but no
  policies. Defence in depth behind the API (`MASTER_PLAN.md` §6).
- **Password reset** — `routes/auth.js` has register/login/me only.
- **File upload** for project submission — the frontend `FileUpload` component
  handles selection; the multipart endpoint doesn't exist yet.
- **No tests.** Nothing here has been exercised beyond a boot check and route
  probes with a fake Supabase URL.

## Running locally

```bash
cd backend
cp .env.example .env      # fill in Supabase + JWT_SECRET at minimum
npm install
npm run dev               # http://localhost:3001
curl http://localhost:3001/api/health
```

`/api/health` pings the database, so it hangs rather than 500s if
`SUPABASE_URL` points nowhere real.
