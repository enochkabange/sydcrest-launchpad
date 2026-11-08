# SydCrest Launchpad: how to build with this library

SydCrest Launchpad is a phone first learning platform for young people in Northern Ghana: Learn (roadmaps, lessons, quizzes, certificates), Mentors (experts, bookings, briefs), Community (feed, events, chapters) and Earn (opportunities, talent, outcomes). Every component here is the app's real React code, on `window.SydCrest`.

## Setup

- Load `styles.css` (it imports `fonts/fonts.css` and `_ds_bundle.css`) and `_ds_bundle.js`. No provider is needed for most components; render them straight from props.
- Font: Urbanist (self hosted variable face, weights 300 to 900). `styles.css` already names it, so body text and every component pick it up. Without `styles.css` text falls back to a serif.
- Theme: light by default; dark is `data-theme="dark"` on the `<html>` element, and only there. A nested `data-theme` wrapper does not switch tokens. With no attribute the page follows `prefers-color-scheme`.
- Roadmap views (`MapView`, `OutlineView`) must sit inside `RoadmapUi`; build their `view` with `roadmapViewOf({ nodes })` and add learner state with `withProgress(view, new Map([[nodeId, "done"]]))`. Both helpers are on `window.SydCrest`.
- Links: use `Link` (internal navigation). A link that looks like a button is `<Link className={buttonClasses("primary")}>`, never a `Button` inside a link.

## Styling idiom

Tailwind v4 utilities generated from semantic tokens. There is no Tailwind compiler in a design: only classes already in `styles.css` exist, so stay inside this vocabulary.

- Surfaces: `bg-surface`, `bg-surface-raised`, `bg-surface-sunken`. Text: `text-content`, `text-content-2` (secondary), `text-content-3` (muted), `text-content-link`, `text-content-inv`. Borders: `border-line`, `border-line-strong`.
- Actions: `bg-action`, `hover:bg-action-hover`, `text-action-fg`. Status pairs: `bg-info-bg text-info-fg`, `bg-success-bg text-success-fg`, `bg-warning-bg text-warning-fg`, `bg-danger-bg text-danger-fg`. Brand fills: `bg-sea-blue`, `bg-ink`.
- Type scale (never raw `text-3xl` with breakpoints): `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-title`, `text-subtitle`, `text-lead`, `text-body`.
- Widths: content sits in `Container` (page width 1280px, `max-w-page`); `max-w-reading` (70ch) only for running text.
- Never raw colours or hex values. Touch targets are at least 44px (`min-h-11`, which `Button` already has).

## Layout

Desktop is not a stretched phone. Compose screens with `Container`, `SplitHero`, `SectionGrid` (`cols={2 | 3 | 4}`), `AutoGrid` (`min="sm" | "md" | "lg"`), `MainWithRail` (main column plus a side rail from lg) and `DataTable`. Headings use `PageHeader` (eyebrow, title, lead, optional aside) and `Section`. Phones keep one column in the same order. App chrome: `AppTopBar` and `AppSidebar` on desktop, `TabList` (bottom tab bar) under md, no hamburger menus.

## Where the truth lives

`styles.css` and its imports are the styling truth; each component's `.d.ts` is its API and `.prompt.md` its usage notes and examples. Grep those before using a class or prop you have not seen.

## Product rules every design keeps

- British English (organisation, programme, colour). No dashes or em dashes in user facing copy; use full stops or commas.
- Device neutral wording: "your phone or computer", "your device"; never assume the reader holds a phone, and never call anything "phone only".
- No fake photos, star ratings, testimonials, learner counts or outcomes. People are shown with initials avatars (`ExpertAvatar`, `PersonAvatar`, `Initials`). Empty states say honestly that something is coming ("New on SydCrest, no reviews yet").
- Sample people use Northern Ghanaian names (Wumpini, Abdul-Rahman, Mariama, Fuseini, Hawa) and places (Tamale, Bolgatanga, Wa, Damongo, Nalerigu).

## Example

```jsx
const { Container, PageHeader, AutoGrid, OpportunityCard, Button } = window.SydCrest;

<Container className="py-8">
  <PageHeader eyebrow="Earn" title="Opportunities near you" lead="Internships, gigs and scholarships checked by our team." />
  <AutoGrid min="md" className="mt-6">
    <OpportunityCard
      today="2026-10-28"
      o={{ id: "o1", slug: "data-entry-intern", kind: "internship", title: "Data entry intern",
           summary: "Help a health NGO digitise field survey forms. Training provided.", description: "",
           organisation_name: "Northern Health Outreach", apply_url: null, apply_instructions: null,
           location: "Tamale", region: "northern", is_remote: false, deadline: "2026-11-09",
           eligibility: null, fields: [], skills: ["Excel"], tracks: ["data"], compensation_note: null,
           published_at: "2026-10-26", updated_at: "2026-10-26" }}
    />
  </AutoGrid>
  <Button variant="secondary" className="mt-6">See all opportunities</Button>
</Container>
```
