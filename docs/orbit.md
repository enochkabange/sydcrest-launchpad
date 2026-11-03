# Orbit: SydCrest's design system

**Orbit** is SydCrest Launchpad's design system. It builds on the current
UI: the Claude Design project synced from this repo on 28 October 2026
(`094f71d0-381c-4905-9ee6-69fda04c7e73`, 85 components). The founder guides
Claude Design to add new elements alongside the synced ones; Claude
implements what it produces in this codebase.

## Two kinds of files in the Claude Design project

1. **Synced from code.** Everything the `/design-sync` run uploaded. The exact
   list is the anchor file `_ds_sync.json` in the project (and `ds-bundle/`
   locally). These mirror the code; a refresh may replace or delete them.
2. **New from Claude Design.** Anything Claude Design creates. Claude Design
   keeps them clearly apart so a refresh can tell them from synced files:
   - put new components in their own group, `@dsCard group="Orbit new"`, or
     under a path such as `components/orbit-new/<Name>/`;
   - list every new or changed file in `ORBIT_NEW.md` at the project root
     (path, what it is, which synced component it replaces, if any).

## The refresh rule

A `/design-sync` refresh may only replace or delete files listed in the
previous `_ds_sync.json` anchor. It never deletes, overwrites or moves a file
the anchor does not list, and never touches `ORBIT_NEW.md`. Before a
refresh, read `ORBIT_NEW.md` and the remote file list, and stop if a planned
delete or write would hit a non-anchored path.

When a new Orbit element is built into the code, the next refresh syncs the
coded version under its real name; then mark it as "in code" in
`ORBIT_NEW.md` so the designed draft and the synced component aren't
confused.

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
5. Runs a `/design-sync` refresh under the refresh rule above.
