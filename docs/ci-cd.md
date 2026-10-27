# SydCrest CI/CD (Supabase + Vercel)

Adapted from the Passmark pipeline. Solo-founder version: one gated deploy path
to production, plus a staging database that Vercel previews read from.

**This repo:** Next.js 16 on Vercel, pnpm, Node 24. Two Supabase projects:
`sydcrest` (production, `vgdnuztoemexrtooofme`) and `sydcrest-staging`
(`wyxeerwocbnqmjjzpgun`). Migrations in `supabase/migrations`, pgTAP tests in
`supabase/tests/database`. No edge functions yet.

## 1. How it flows

1. Open a PR. `ci.yml` runs **Checks** (lint, typecheck, unit tests, build) and
   **Migrations** (every migration applied from scratch on a throwaway local
   Supabase, database linter, pgTAP security tests, generated types up to date)
   and **E2E** (Playwright drives a production build against a local Supabase
   at phone and desktop widths; confirmation emails are read from Mailpit).
2. If the PR touches `supabase/migrations`, `staging-db.yml` pushes them to the
   staging project so the PR's Vercel preview works.
3. Vercel builds a preview for the PR (against staging, behind Vercel login).
4. Merge to `main`. `pipeline.yml` re-runs the checks, then deploys in order:
   1. Database migrations to production.
   2. (Edge functions, once they exist.)
   3. Frontend to Vercel.
   4. Health check: `/api/version` must report the merged commit.
5. Any failed step stops the run. Production stays as it was.

Why that order: the database must exist before a UI that needs it loads.
Migrations must stay compatible with the previous frontend for the minutes
between steps 1 and 3 (see Rules).

## 2. One-time setup

**GitHub**
- The repo is private on the free plan, so GitHub branch protection is not
  available. The guardrails below replace it (see "Guardrails").
- Environment: `Production` (created by Vercel's GitHub integration; the
  pipeline's deploy jobs use it).
- Actions secrets:

| Secret | Where to get it |
| --- | --- |
| `SUPABASE_ACCESS_TOKEN` | Supabase, Account, Access Tokens |
| `SUPABASE_DB_PASSWORD` | Production project, Database settings (reset if lost) |
| `SUPABASE_STAGING_DB_PASSWORD` | Staging project, Database settings |
| `VERCEL_TOKEN` | Vercel, Account Settings, Tokens |

Project refs, the Vercel org and project IDs, and the production URL are public
and live in the workflow files.

**Vercel**
- `vercel.json` turns off all Git-triggered deployments (previews included).
  Vercel's free plan allows 100 deployments a day, and automatic previews on
  every PR push used them up on 25 Oct, blocking a production deploy. CI (with
  e2e against a local stack) replaces previews; production deploys only through
  the pipeline. Re-enable previews (`"deploymentEnabled": {"main": false}`) on a
  paid plan.
- Env vars are public values only: `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Preview and Development point at
  staging, Production at production). Never put a `service_role` or secret key
  in a frontend variable.

**Supabase**
- Edge function secrets (Hubtel keys and similar), when they exist:
  `supabase secrets set ...`. Never in the repo.
- Know where the daily backups are (Database, Backups). Point-in-time recovery
  is a paid add-on.

**Local guard:** husky runs `eslint --fix` on staged files before each commit.

## 3. Workflows

| File | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | PR to `main` | Checks + Migrations (required to merge), E2E (reporting; required once stable) |
| `staging-db.yml` | PR touching migrations | `supabase db push` to staging |
| `pipeline.yml` | push to `main` | verify, migrate prod, deploy Vercel, version check |
| `uptime.yml` | every 30 minutes | fails (and emails) if the live site is down |
| `dependabot.yml` | weekly / monthly | dependency and Actions update PRs |

## 4. Guardrails (in place of branch protection)

| Guard | Where | What it stops |
| --- | --- | --- |
| Merged PR only | `pipeline.yml` gate | Any commit on `main` that did not come from a merged PR is not deployed, and an issue is opened |
| Full suite before deploy | `pipeline.yml` | Production deploys only after lint, types, unit tests, audit, build, database tests (pgTAP, types in sync) and e2e all pass |
| Migration guard | CI, staging push, pipeline | Editing or deleting a shipped migration; destructive SQL (drop, rename, type change, truncate, delete) without `-- allow-destructive: <reason>` on that line |
| Secret scan | CI (gitleaks) | Keys or passwords committed in a PR |
| Dependency audit | CI, pipeline | High or critical vulnerabilities in production dependencies |
| Smoke test and rollback | `pipeline.yml` | After a deploy, key pages must load and `/dashboard` must redirect; otherwise Vercel rolls back to the previous production deployment |
| Least privilege | every workflow | Each workflow gets only `contents: read`, plus what one job needs |
| Pre-push hook | `.husky/pre-push` | Accidental `git push` to `main` from a laptop |

## 5. Rules that prevent outages

1. **Migrations are expand then contract.** Add columns and tables first; never
   rename or drop in the same release as the code change. Remove old columns in
   a later release once nothing uses them.
2. **Never edit a migration that has shipped.** Add a new one with
   `supabase migration new <name>`.
3. **Regenerate types after every migration** with the same CLI version as CI (pinned in the workflows)
   (`supabase gen types typescript --local > src/lib/supabase/database.types.ts`).
   CI fails if they are stale.
4. **Row Level Security on every table**, policies in the same migration, and a
   pgTAP test per table in `supabase/tests/database`.
5. **Seed data must be idempotent** (upsert).
6. **Secrets stay out of the repo and out of frontend env vars.** Only the
   publishable key is public.
7. **One deploy path.** Only `pipeline.yml` ships to production.
8. **Use `set -euo pipefail`** in any shell step that pipes.
9. **End to end tests only ever run against the local stack.** They create
   accounts; staging and production must never collect test users.
10. **A 200 is not proof of a new deploy.** The pipeline compares
   `/api/version` with the merged commit.

## 6. Rollback

| Layer | How |
| --- | --- |
| Frontend | Vercel, Deployments, previous deployment, Promote (or `vercel rollback`). |
| Database | Forward fix with a new migration. For data loss, restore from backup. Avoid destructive migrations (rule 1). |

## 7. Day to day

```bash
git switch -c feature/thing
supabase start                 # local database (Docker)
supabase migration new thing   # if the schema changes
supabase db reset              # apply migrations from scratch
supabase test db               # pgTAP tests
pnpm build && pnpm e2e         # Playwright, with NEXT_PUBLIC_SUPABASE_* pointed at the local stack
pnpm dev
git push -u origin feature/thing
# open PR: Checks + Migrations + Vercel preview; merge; watch Pipeline in Actions
```
