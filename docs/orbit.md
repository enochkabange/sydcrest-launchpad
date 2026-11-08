# Orbit: SydCrest's design system

**Orbit** is SydCrest Launchpad's design system. It lives in the Claude
Design project `094f71d0-381c-4905-9ee6-69fda04c7e73`, which started as a
sync of this repo on 28 October 2026 (85 components, now shown as
"Legacy / ..."). Since 3 November 2026 Claude Design owns that project: the
founder guides it, and Claude builds what it produces into this codebase.

## No code sync

Design flows one way: Claude Design, then a handoff, then code. Never run
`/design-sync` against the Orbit project; the sync anchor, the adherence
linter and the local `projectId` pin were removed on purpose. Claude Design
may replace, restyle or remove the legacy parts. `ORBIT_NEW.md` in the
project lists the Orbit files and the legacy parts they replace.

## What Claude Design must respect

These come from the product:
- British English; no dashes in copy; device neutral wording.
- Phone first, but desktop is equal: no stretched phone layouts.
- No fake photos, ratings, outcomes or numbers; initials avatars.
- Light and dark themes; WCAG AA contrast; visible focus; reduced motion.
- Who each page is for and its one job: `docs/page-guide.md`; user types and
  rules: `docs/user-types.md`; decisions D1 to D9: `docs/founder-decisions.md`.

## Handoff (Claude Design to code)

From Claude Design: the handoff file and the template code for each new or
changed screen and component, plus `ORBIT_NEW.md`.

Claude then:
1. Adds or changes tokens in `src/styles/tokens.css` (light and dark), keeping
   existing semantic names where meanings match.
2. Builds new components in `src/components/ui` or the feature folders, and
   updates existing ones the design changed.
3. Keeps behaviour, data loading, access rules and tests unchanged; updates
   e2e selectors and screenshots; runs the a11y sweep in both themes.
4. Implements D8 (role aware home) and D9 (lead with the path quiz).
5. Marks the built items as "in code" in `ORBIT_NEW.md` (the founder or
   Claude Design updates it in the project).
