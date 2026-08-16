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

## Routes (updated — no longer scaffolds)

`learning`, `projects`, `sessions`, `marketplace`, and `community` are fully
implemented, not the 501 stubs described when this doc was first written.
`marketplace` was deliberately built ahead of `MASTER_PLAN.md`'s original
Phase F date, at the founder's explicit request — payment itself
(`services/hubtel.js`) is still unconfigured/unverified, so bookings land in
`pending_setup` rather than failing.

## Claude model

`src/routes/opportunities.js` pinned `claude-sonnet-4-20250514`, which is
deprecated. It now uses **`claude-opus-5`**; `learning.js`/`projects.js`'s
newer AI routes use **`claude-sonnet-5`** (see `services/claude.js`).

**This is a live cost decision, and it is yours to make.** `MASTER_PLAN.md`
§11 names AI spend as a risk and §6 requires per-user caps. Sonnet 5 is roughly
40% of Opus 5's input cost — used for Study Buddy and quiz/path generation;
Opus 5 stays the default for opportunity research and project assessment,
where quality matters more. Apply for Anthropic startup credits
(`MASTER_PLAN.md` §8 flags this as "Immediately") — that hasn't happened yet.

Every AI route (`learning.js`, `projects.js`, `opportunities.js`) now shares
`services/claude.js`'s `requireAI` (clean 503 with no key), `requireDailyAiCap`
(per-user daily cap via `audit_logs`, §6's other requirement — default 20/day,
`AI_DAILY_CAP` env to change it), and sends only the learner's first name to
Claude, never their full name.

## Known gaps before the pilot

- **RLS policies** — done, on all 24 tables (`supabase/policies.sql`).
- **Password reset, profile self-edit, project file upload** — done.
- **Hubtel MoMo payment** and **WhatsApp (Twilio) notifications** — both wired
  with the no-key-no-crash pattern but genuinely untested against real
  credentials; still the two live "unconfigured" integrations.
- **Sentry / uptime monitoring** — not integrated (`MASTER_PLAN.md` Phase D).
- **Privacy policy + ToS pages** — don't exist yet (`MASTER_PLAN.md` §6).
- **DMP curriculum seeding** — the actual 12-week curriculum (exists as a PDF)
  was never loaded into `learning_paths`/`learning_weeks` as seed data; today
  a mentee's only path to a curriculum is the AI-generate button or manual
  admin/SQL insertion.
- **Tests.** No longer true that nothing is exercised — `backend/test/` is a
  real integration suite against the live Supabase project (33 tests as of
  this note).

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
