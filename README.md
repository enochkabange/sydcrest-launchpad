# SydCrest Launchpad

The platform for SydCrest, a social enterprise taking young Ghanaians, starting in
the north, from "where do I start" to employable and earning tech talent.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase · Vercel

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm lint
```

## Where things are

- `src/styles/tokens.css` · the design tokens. Read `docs/design-system.md` before writing UI.
- `src/components/brand/` · logo and illustrations.
- `src/content/dmp/` · the Delta Mentoring Program 12-week curriculum.

The plan this is built against (Phase 1 roadmap tool, data model, PR order) lives
outside the repo in the SydCrest planning suite, `10_FRESH_START_DECISIONS.md`
first. The previous codebase is preserved at tag `archive/v0-2026-10-24`.
