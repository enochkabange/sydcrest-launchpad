<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules

Read these before any change. They apply to every agent and every PR.

**Plan and scope**
- Work from one GitHub issue. Its acceptance criteria are the scope; anything else becomes a new issue, not part of your PR. PR body starts with `Closes #n`.
- Architecture and order: `docs/workflow.md`, `docs/ci-cd.md`, and the planning suite (`~/Documents/Vault 77/Sydcrest/Planning/10_FRESH_START_DECISIONS.md`, `08_TECHNICAL_BUILD.md`, `09_BUILD_PROMPT_PHASE1.md` for feature intent).

**Hard constraints (never violate)**
- Roadmap content is original and localised for Ghana. Never copy, adapt, scrape or host roadmap.sh content; linking out is fine.
- The platform never holds user funds. Any payment work uses provider split settlement.
- No fake photos, ratings, testimonials or outcomes. Empty states say honestly that something is coming.
- Demo, seed and test content uses Northern Ghanaian names (Wumpini, Abdul-Rahman, Mariama, Fuseini).
- No dashes or em dashes in user facing copy.
- Under 18s are blocked at sign up.

**Stack conventions**
- Next.js 16 App Router with Cache Components: request-time reads (cookies, auth) sit inside `<Suspense>`; never await the session at the top of a layout. Read the bundled docs in `node_modules/next/dist/docs/` before using an API.
- Auth: Supabase Auth via `@supabase/ssr`. Authorize with `src/lib/auth.ts` (`getClaims`), never `getSession`. Server Actions re-check the user.
- Database: every change is a migration in `supabase/migrations/` (`supabase migration new <name>`), additive only (expand then contract). Every new table: RLS enabled in the same migration, column grants where users must not edit a field, and a pgTAP test in `supabase/tests/database/`. Regenerate `src/lib/supabase/database.types.ts` with the pinned CLI (`supabase gen types typescript --local`).
- AI: Anthropic SDK in server code only. Models: `claude-haiku-5-5` for routine turns, `claude-sonnet-5-5` for reasoning. Respond 503 when the key is missing. Use prompt caching for stable context.
- External services (Twilio, email, payments) no-op safely when unkeyed.
- UI: semantic tokens from `src/styles/tokens.css` (`bg-surface`, `text-content-2`), never raw colours; base styles inside `@layer`. Reuse `src/components/ui`. Phone first, desktop equal: 44px targets, bottom tab bar under md, no hamburger; at md and above use the width (top navigation, multi column layouts where content allows, hover and focus states), never a phone column stretched or stranded on a wide screen. Copy is device neutral (see the Devices section of `src/content/CONTENT_GUIDE.md`). Native `<select>`.
- Desktop composition (issue #154, `docs/design-system.md` §8): every screen defines its lg (1024) and xl (1280) composition with the primitives in `src/components/ui/layout.tsx` (`Container`, `SplitHero`, `SectionGrid`, `AutoGrid`, `MainWithRail`, `DataTable`). Content sits in the `page` container (1280px); anything narrower is only for reading text (`max-w-reading`). Headings and leads use the type scale utilities (`text-display`, `text-h1` to `text-h3`, `text-title`, `text-subtitle`, `text-lead`, `text-body`), never a raw `text-3xl` with breakpoint overrides. Phones keep one column in the same order. Check new screens at 390, 1440 and 1920 (`e2e/screens.spec.ts`).
- Tests: unit (Vitest) for logic, pgTAP for RLS, Playwright (`e2e/`) for user journeys against the local stack only.

**Before opening a PR:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and with the local stack running `supabase db reset && supabase test db` (plus `pnpm e2e` if you touched a journey).
