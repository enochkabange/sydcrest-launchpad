# design-sync notes (SydCrest Launchpad)

Target: Claude Design project `094f71d0-381c-4905-9ee6-69fda04c7e73` (https://claude.ai/design/p/094f71d0-381c-4905-9ee6-69fda04c7e73). Shape: package (no Storybook).

## How this repo is built for the converter

- The app is a Next.js app, not a package, so `.design-sync/build/build-dist.mjs` (`cfg.buildCmd`) makes one: `dist-ds/` (gitignored) with `package.json` (name `sydcrest-launchpad`), an ESM `index.js` bundled from `.design-sync/build/entry.tsx`, a `.d.ts` tree from `tsc` (`tsconfig.dts.json`, `@/` aliases rewritten relative), and `styles.css` compiled from `src/styles/tokens.css` with the repo's Tailwind v4.
- The component list is curated in `.design-sync/build/entry.tsx` (85 components plus `RoadmapUi`, `roadmapViewOf`, `withProgress`, `buttonClasses`, `rowLinkClass`). Add a component there, author `.design-sync/previews/<Name>.tsx` and `.design-sync/docs/<Name>.md` (frontmatter `category:` sets the card group).
- `build-dist.mjs` shims `next/link`, `next/image`, `next/form`, `next/navigation` (`.design-sync/build/shims/`) and stubs every `"use server"` / `server-only` module, `@supabase/*`, `@anthropic-ai/*` and `next/*`. Stubs answer from `window.SydCrestPreview` (`viewer`, `user`, `unread`, `learningLoop`, `pathname`), which previews set at module top. Async server components under `src/components/` are de-asynced so they render in the browser.
- `process.env.NEXT_PUBLIC_SITE_URL` is defined as `https://launchpad.sydcrest.com` (the domain the repo's tests use) so share links in previews are not localhost. Assumption, not confirmed production config.
- React: the repo pins `react@19.3.1` with `react-dom@19.3.0`; `react-dom/client` refuses mismatched versions in the browser (`ReactDOM.createRoot is not a function`). Pass `--node-modules ./.ds-sync/react-nm/node_modules`, a scratch install of `react@19.3.1 react-dom@19.3.1` (`cd .ds-sync/react-nm && npm i react@19.3.1 react-dom@19.3.1`).
- Fonts: next/font defines `--font-urbanist` in the app; without it `--font-sans` is invalid and everything renders serif. `build-dist.mjs` appends `--font-urbanist: "Urbanist"` and `cfg.extraFonts` ships `.design-sync/build/urbanist.css` (the self hosted woff2).
- Designs get no Tailwind compiler, so `build-dist.mjs` safelists the semantic colour utilities, type scale and content widths with `@source inline(...)`. Also scans `.design-sync/previews/**/*.tsx`, so rebuild dist after editing a preview's classes. Tailwind only emits theme variables that are used: in previews use utilities (`bg-sea-blue`), not `var(--color-...)`.
- Dark theme switches only on `<html data-theme="dark">`; a nested `[data-theme]` wrapper does nothing (tokens.css scopes to `:root`). The earlier artifact sync re-pointed tokens to fake that; this sync ships tokens.css as is.
- Groups come from `.design-sync/docs/*.md` frontmatter (`docsDir`). `srcDir` is deliberately unset: dir-derived groups (`views`, `general`) were worse than the curated ones.

## Commands (from the repo root)

```sh
pnpm i --frozen-lockfile
node .design-sync/build/build-dist.mjs
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./.ds-sync/react-nm/node_modules --entry ./dist-ds/index.js --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
node .ds-sync/package-capture.mjs --out ./ds-bundle
# re-sync driver: node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./.ds-sync/react-nm/node_modules --entry ./dist-ds/index.js --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```

Converter deps: `.ds-sync/` with `npm i esbuild ts-morph @types/react playwright@1.64.1` (1.64.1 pins chromium 1248, which is cached on the founder's Mac).

## Previews

- All 85 have authored previews, ported from the earlier artifact sync's sample data (Northern Ghanaian names, no ratings or photos). Most use `React.createElement` through a `states` array; MapView, OutlineView, RoadmapProgress, TopicSummary, Link and SkipLink are JSX. Rewriting the rest as JSX would read better in `.prompt.md` examples.
- Roadmap previews share `.design-sync/previews/_roadmap.ts`: the first three sections of the real Data Analyst roadmap (`src/content/roadmaps/data.ts`) through the repo's `roadmapViewOf` / `withProgress`. No time estimates are invented, so estimate UI does not show.
- Card modes in `cfg.overrides`: column for wide cards; `TabList` column at 390 wide inside a transformed phone frame (it is `position: fixed` and `md:hidden`; bare, it captured blank); `MainWithRail` and `Section` column at 1280 wide so the lg layouts show.
- The capture harness freezes the clock in 2024, so relative dates in previews read as May 2024 in screenshots. Expected.

## Known render warns

- `[RENDER_THIN]` ThemeSwitch: an icon only toggle, no text by design.
- `[RENDER_THIN]` HeroGraphic: an illustration, no text by design.

## Excluded

- Not in the entry (not visual from props, or server action forms): `pwa/*`, `display/display-sync`, `marketing/nav-links`, `app-shell/viewer-frame`, every form that posts a server action (`credentials/*-form`, `events/feedback-form`, `mentor/forms`, `cohort/submission/*-form`), study buddy chat internals. Lesson anatomy, cohort, mentor work and credential cards are not synced yet; candidates for the next sync.

## Re-sync risks

- Preview sample data is inlined and shaped by hand to the current prop types (`@ts-nocheck` in ported files). A prop rename in `src/` will not fail the build; it shows up as a wrong or empty cell. Re-grade any component whose source changed.
- `build-dist.mjs` stub list (`OVERRIDES`) mirrors today's server modules (`lib/nav/viewer`, `lib/auth`, `lib/notifications/server`, `lib/learning-loop/server`, `lib/roadmaps/progress`, `components/roadmaps/views/live`). A new server dependency in a synced component renders null until it gets a stub.
- The React scratch install pins 19.3.1; if the repo moves React, reinstall `.ds-sync/react-nm` to the new matching pair.
- Uploaded with the Tailwind and esbuild versions in `pnpm-lock.yaml` (Tailwind 4.3.3, esbuild 0.28.2).
