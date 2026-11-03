# Orbit: SydCrest's design system

Orbit is the new design system for SydCrest Launchpad, started on a clean
slate in Claude Design on 3 November 2026. The founder guides it; Claude
implements what it produces in this codebase.

## Where things live

- **Orbit (new):** a fresh Claude Design project, created and steered by the
  founder. Claude Design reads this public repository
  (`enochkabange/sydcrest-launchpad`) for context, but Orbit's components are
  new, not the current ones.
- **Legacy (current UI):** the Claude Design project "SydCrest Launchpad",
  synced from this repo on 28 October 2026
  (`094f71d0-381c-4905-9ee6-69fda04c7e73`). Kept untouched as the record of the
  current UI and of how component names map to code. Rename it
  "SydCrest Launchpad (legacy)"; do not attach it to new designs.
- **The `/design-sync` setup in `.design-sync/`** targets the legacy project
  and is paused. After Orbit lands in code, repoint `.design-sync/config.json`
  at the Orbit project and run `/design-sync` so code and design match again.

## What Claude Design must respect

These come from the product, not the old visual design:
- British English; no dashes in copy; device neutral wording.
- Phone first, but desktop is equal: no stretched phone layouts.
- No fake photos, ratings, outcomes or numbers; initials avatars.
- Light and dark themes; WCAG AA contrast; visible focus; reduced motion.
- Who each page is for and its one job: `docs/page-guide.md`; user types and
  rules: `docs/user-types.md`; decisions D1 to D9: `docs/founder-decisions.md`.

## Handoff checklist (Claude Design to code)

When a design is ready, export from Claude Design:
1. The handoff file (tokens, components, layouts, notes).
2. The template code for each screen and component.

Claude then:
1. Turns Orbit tokens into `src/styles/tokens.css` (light and dark), keeping
   the semantic token names the app already uses where meanings match, and
   adding Orbit names where they don't.
2. Builds Orbit components in `src/components/ui` (and feature folders),
   replacing the current ones screen by screen, behind no flags.
3. Keeps behaviour, data loading, access rules and tests unchanged; updates
   e2e selectors and screenshots; runs the a11y sweep in both themes.
4. Implements D8 (role aware home) and D9 (lead with the path quiz) as part
   of the Orbit home page.
5. Repoints `/design-sync` at Orbit and syncs.
