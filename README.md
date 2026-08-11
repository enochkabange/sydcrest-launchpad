# SydCrest Launchpad

Tech talent development platform for Ghana. Strategy lives in
`../MASTER_PLAN.md`; this file is how to run the thing.

**Status:** Phase A foundation. Design system complete and verified; backend
restructured and booting; core learning routes scaffolded but not implemented.
Nothing is deployed yet.

```
frontend/                     Vite + React + Tailwind v4
  src/styles/tokens.css       Design tokens — colour, type, motion, themes
  src/components/ui/          26 primitives
  src/Showcase.jsx            Renders every primitive; the build harness
  public/fonts/               Urbanist variable woff2, 28KB, self-hosted
backend/                      Express + Supabase + Claude
  src/index.js                App, security middleware, route mounting
  src/middleware/auth.js      JWT + 5-level role hierarchy
  src/routes/                 auth, admin, opportunities implemented;
                              learning, projects, sessions scaffolded (501)
  supabase/schema.sql         24 tables
docs/
  design-system.md            Usage rules — read before building UI
  backend-notes.md            Migration decisions, bugs fixed, known gaps
  design-system-reference.html  Visual reference (published as an Artifact)
```

## Running locally

Two terminals.

```bash
# Backend — http://localhost:3001
cd backend
cp .env.example .env          # Supabase keys + JWT_SECRET at minimum
npm install
npm run dev

# Frontend — http://localhost:5173
cd frontend
npm install
npm run dev
```

`frontend` currently renders `Showcase.jsx`, not the product. It is the harness
that compiles every primitive and resolves every Tailwind class — **add each new
component to it**, because a class that fails to generate produces no error,
only a missing colour.

## Next steps (Phase A → B)

1. **Supabase project** — run `backend/supabase/schema.sql`, then write RLS
   policies for all 24 tables.
2. **Push to GitHub** — `git remote add origin … && git push -u origin main`.
3. **Deploy** — Railway for `backend/` (start command `node src/index.js`),
   Vercel for `frontend/` (root directory `frontend`).
4. **Split `App.jsx`** — the old 67KB monolith in
   `../Sydcrest launchpad Platform/` onto the primitives in
   `frontend/src/components/ui/`.
5. **Implement the scaffolded routes** — `learning`, `projects`, `sessions`.

Exit test for Phase A: register → login → see a dashboard, on real URLs.

## Non-code work on the critical path

Tracked in `../MASTER_PLAN.md`, and easy to lose behind the code:

- Company registration + Data Protection Commission registration — **blocks all
  grant and sponsor money**
- Anthropic / AWS / GitHub / Google startup credits — flagged "Immediately"
- Curriculum review by 2–3 working Ghanaian engineers before January
- Mentor recruitment (target 3–5 volunteers by Nov)
- Ask Beet Agency for the vector logo source (`.ai`/`.svg`) — see
  `docs/design-system.md` §1
