# Roadmap views

How a roadmap page is built, in layers, so a design pass can restyle the
roadmap (or add a new way of drawing it) by touching tokens and view
components only. Issue #129. The map's look follows the founder approved
mockup (dark theme): spine, section blocks, topics branching left and right on
wide screens, a transit line on phones, a legend, Map and List, and an overall
progress bar.

Issue #244 added the modern experience on the same layers: time estimates,
the learner's next step, a pan and zoom map with a minimap, a phone journey
view, search, collapsible sections, a hide optional switch, the WAI-ARIA tree
pattern, links between tracks, a richer topic panel and a filterable index
(section 6).

```
roadmap_nodes (kind, choice_group)          layer 1  content semantics
roadmaps (leads_to, level)
node_estimate_inputs (view)
        │  getPublishedRoadmap (cached)
        ▼
roadmapViewOf → buildRoadmapView            layer 2  view model (pure)
        │
        ▼
ROADMAP_VIEWS: map │ outline │ journey      layer 3  renderers (swappable)
        │  links to /roadmaps/[slug]/[node]
        ▼
@panel/(.)[node] → TopicPanel + TopicSummary  layer 4  topic panel (route)

--color-roadmap-* tokens                    layer 5  design tokens
```

## 1. Content semantics

`roadmap_nodes` has two optional columns (migration
`20261027105908_roadmap_node_kinds.sql`, pgTAP in
`supabase/tests/database/roadmap_node_kinds.test.sql`):

| Column | Values | Null means |
| --- | --- | --- |
| `kind` | `section`, `topic`, `checkpoint` | derive from the tree: top level is a section, deeper is a topic |
| `choice_group` | slug style key, 2 to 40 chars | not part of a choice |

Siblings sharing a `choice_group` are "pick one of these" alternatives.
`is_optional` is unchanged. RLS is unchanged (the table's policies cover the
new columns).

Drafts (`src/content/roadmaps/types.ts`) carry the same fields as optional
`kind` and `choice_group` on `NodeDraft`. The admin import writes them (null
when a draft leaves them out) and the admin node form edits them (Kind:
Automatic, Section, Topic, Checkpoint; Choice group). None of the 26 tracks
uses them yet, so no checkpoint or choice shows on a live roadmap. Writing
checkpoint and choice content is a content task, not a view task.

## 2. The view model

`src/lib/roadmaps/view-model.ts`, tested in `view-model.test.ts`. Pure: no
React, no I/O.

```ts
buildRoadmapView(tree, progress?) → RoadmapView
withProgress(view, progress | null) → RoadmapView   // same structure, statuses and counts filled
locateInView(view, slug) → { node, section, previous, next } | null
sectionOf(view, nodeId) → ViewSection | undefined
```

`RoadmapView`:

| Field | Meaning |
| --- | --- |
| `sections[]` | `{ node, number, topics[], checkpoints[], choiceGroups[], counts }` in order |
| `byId`, `idBySlug` | lookups for every node |
| `order` | every node id in reading order (the topic page's previous and next) |
| `counts` | `{ done, total, started, complete, percent }` for the whole roadmap |
| `choiceGroups[]` | `{ key, parentId, nodeIds }` |
| `hasProgress` | built with a signed in learner's progress |
| `estimate`, `requiredEstimate` | `{ minutes, missing }`: every node, and required nodes only (section 6) |
| `upNextId` | the learner's next step: the first node in progress in reading order, else the first required node not done; null for visitors and when complete |
| `minutesLeft` | estimated minutes of required nodes not done (the whole roadmap without progress) |

Each `ViewNode` has `id, slug, title, summary, number` ("2.3"), `depth`,
`kind` (resolved), `optional`, `choiceGroup`, `status` (`not_started`,
`in_progress`, `done`, or `null` when unknown), `sectionId`, `index`,
`previousId`, `nextId`, `place` (`{ n, of }`, "Topic 2 of 4"), `children`
(nodes deeper than a topic; empty on sections), `minutes` (null without a
lesson) and two optional content slots, `difficulty` and `complexity`.
`ViewSection` also has `estimate`, `requiredEstimate` and the slots
`careerLevel` and `jobs`. The slots are null (or empty) until a content PR
adds the fields to `FlatNode` and the cached select; every view already draws
them when present (`NodeBadges` and `SectionMeta` in `views/node-meta.tsx`),
so filling them needs no view change.

Rules:
- A top level node is a section. A top level checkpoint closes the section
  before it (or is a section if it comes first).
- A section's direct children are its topics; checkpoint children close the
  section after its topics.
- Deeper nodes nest under their topic. No track is deeper than one level today.
- A node whose parent is missing is promoted to a section, never dropped.
- Counts use the same rule as roadmap completion (`progressSummary`):
  required (non optional) nodes done out of required nodes, the section node
  included. Choice groups do not change counts until the completion rule does.

## 3. Renderers

`src/components/roadmaps/views/`:

| File | Role |
| --- | --- |
| `registry.ts` | `ROADMAP_VIEWS`: `{ id, label, Component, auto? }[]`. `auto: "wide"` shows from md and `auto: "narrow"` below until the learner picks one. |
| `types.ts` | `RoadmapViewProps = { slug, view }` |
| `map-view.tsx` | `map` ("Map", auto wide): transit line below md, branching map from md inside `MapCanvas` |
| `outline-view.tsx` | `outline` ("List"): the outline, as a tree |
| `journey-view.tsx` | `journey` ("Journey", auto narrow): one vertical path, sticky section headers, every step the same size |
| `map-canvas.tsx` | client: pan, zoom, fit, reset, minimap (from md) |
| `tree.tsx` | client: `RoadmapTree`, `SectionTreeItem`, `SectionToggle`, `TreeGroup` (the tree pattern) |
| `roadmap-ui.tsx` | client: collapsed sections and hide optional, remembered on the device |
| `toolbar.tsx` | client: search, hide optional topics, open or close all sections |
| `node-meta.tsx` | `Minutes`, `NodeBadges`, `SectionMeta`, `choiceLabel`: the shared small pieces |
| `view-switcher.tsx` | client: the Map, List and Journey buttons and the active view |
| `live.ts` | `liveView(view)`: the view with the learner's progress, per request |

### Prerendered shell, request time islands

The roadmap page is prerendered. It builds the view **without progress** and
passes it to every renderer. Anything that depends on the learner is a small
async island inside `<Suspense>` that calls `liveView(view)` (memoised per
request, one progress query for the whole page). Never await progress at the
top of a renderer: that would make the page dynamic.

In the map, the status marker inside each topic link is the island. The link
restyles itself from the marker with Tailwind's `has-[[data-progress=done]]:`
variants, so visitors download no duplicate markup and the prerendered link
never waits. The section block does the same with `data-complete` from its
count island. The outline uses `ViewNodeMark` (the original check marks).

### The switcher

The server renders every view; `ActiveRoadmapView` mounts only the active one,
so only its islands run. The choice is stored in `localStorage`
(`sydcrest:roadmap-view`) and read with `useSyncExternalStore`. Until the
learner picks a view, the "auto" state mounts the wide view (map) inside
`max-md:hidden` and the narrow view (journey) inside `md:hidden`: CSS picks by
width, so the server, the first client render and the final page agree and a
phone never swaps views after load (no layout shift, #223). A stored choice
applies straight after hydration, with no hydration mismatch.

### Add a view

1. Write `my-view.tsx` exporting `function MyView({ slug, view }: RoadmapViewProps)`.
   Draw from `view` only; link every node with `nodePath(slug, node.slug)` (a
   real link, so the topic panel opens and keyboard users can reach it).
2. For learner state, add an island: `<Suspense fallback={<Thing status={null} />}><LiveThing view={view} /></Suspense>`
   where `LiveThing` awaits `liveView(view)`.
3. Add `{ id: "my-view", label: "My view", Component: MyView }` to `ROADMAP_VIEWS`.
4. Use `--color-roadmap-*` tokens (add new ones in both themes), 44px targets,
   visible focus, and check 390, 768, 1280 and 1440 widths.

### Restyle a view

Change the tokens first (section 5). Then the classes in the view component.
Keep: the `aria-label`s on the lists ("Roadmap map", "Roadmap outline"), links
as links, the `data-progress` and `data-complete` hooks, and the island
pattern, the tree roles (`role="tree"` on the root, `role="treeitem"` on
every link with `aria-level`, `role="none"` on wrapping list items) and the
`data-node-id`, `data-minimap`, `data-up-next` and `data-optional` hooks. e2e
coverage is `e2e/roadmap-views.spec.ts`, `e2e/roadmaps.spec.ts` and
`e2e/roadmap-modern.spec.ts`.

## 4. The topic panel

The topic page `/roadmaps/[slug]/[node]` stays a full, indexable page.

- `src/app/(marketing)/roadmaps/[slug]/layout.tsx` renders `children` and the
  `@panel` slot.
- `@panel/(.)[node]/page.tsx` intercepts a client navigation to a topic and
  renders it in `TopicPanel` (`src/components/roadmaps/topic-panel.tsx`): a
  modal `<dialog>`, a side panel from lg and a bottom sheet below. Focus is
  trapped by the dialog, Escape, the close button and a click on the backdrop
  go back in history, and focus returns to the topic link on the roadmap.
- `@panel/default.tsx` and `@panel/page.tsx` render nothing, so a reload or a
  shared link shows the full page and returning to the roadmap clears the slot.
- Previous and next inside the panel replace the history entry, so closing
  always returns to the roadmap.
- Next.js intercepts a client navigation to a topic from **any** page under
  `/roadmaps/[slug]`, including a full topic page. So links from the full topic
  page to other topics are plain `<a>` (document navigations, never
  intercepted), and `TopicPanel` reloads as a full page if it ever mounts
  without the roadmap behind it.

Shared pieces, in `src/components/roadmaps/topic.tsx`: `TopicSummary` (where
the topic sits, title, status, summary; h1 on the page, h2 in the panel),
`ResourceCards` (page), `ResourceRows` (panel, with a badge per kind) and
`TopicNeighbours`.

Status is read only everywhere. A topic is in progress once the learner opens
its lesson and done when they pass its quiz (`/learn`); topics without a quiz
follow the current rule until #128 is decided. The mockup's status buttons are
deliberately not built.

## 5. Tokens

`src/styles/tokens.css`, `--color-roadmap-*`, defined in `@theme` (so
utilities such as `bg-roadmap-node-done` exist) with light values, and
re-pointed in both dark blocks (`[data-theme="dark"]` and the
`prefers-color-scheme` default).

| Token | Used for |
| --- | --- |
| `spine` | the line the map hangs on, connectors |
| `section`, `section-fg`, `section-muted` | section blocks (ink on light, near white on dark) |
| `section-done`, `-done-fg`, `-done-muted`, `-done-border` | a section with every required node done |
| `node`, `node-fg`, `node-border`, `node-hover` | topics |
| `node-optional`, `-optional-fg`, `-optional-border` | optional topics (dashed) |
| `node-todo`, `node-done`, `node-done-fg`, `node-progress` | status: dots, fills, borders |
| `checkpoint`, `-bg`, `-fg`, `-label` | checkpoint pills |
| `track`, `fill` | the overall progress bar |
| `badge-article`, `badge-video`, `badge-practice` (+ `-fg`) | resource kinds in the panel |
| `scrim` | behind the topic panel |
| `canvas` | behind the pannable map |
| `minimap`, `minimap-view` | section blocks in the minimap, the visible area outline |
| `up-next` | the ring and label on the learner's next step |
| `choice` | the frame and tag of a pick one group |

Orange (`node-progress`, `checkpoint`) is a fill or border only on light;
`checkpoint-label` is the text safe orange.

## 6. The modern experience (issue #244)

### Time estimates

`src/lib/roadmaps/estimates.ts`, tested in `estimates.test.ts`. Per node with a
written lesson:

```
reading  = lesson words / 180 words a minute
practice = 15 minutes + practice task words / 180, when there is a task
quiz     = 1 minute a question
estimate = reading + practice + quiz, rounded up to the next 5 minutes (at least 5)
```

180 words a minute is a careful study pace for learners reading in a second
language (adult silent reading is around 240); the 15 minutes is the doing.
Free resources outside SydCrest are not counted. A node without a lesson has
no estimate (null), never a guess; totals add the known estimates. Copy always
says "about": "about 25 min", "about 11 hours". The numbers come from the
`node_estimate_inputs` view (word counts and quiz size, `security_invoker`,
so base table RLS applies), read once per roadmap in the cached
`getPublishedRoadmap` and once for the index in `getPublishedRoadmaps`, so the
cache holds integers, not markdown.

Time left: `minutesLeft` (required nodes not done) at the learner's weekly
study time from the path quiz (`weeklyPace(hours)` in
`src/lib/path/recommend.ts`, the same sessions as their weekly plan):
"About 50 min left, roughly 1 week at about 5 hours a week." Without saved
answers, the total only.

### Personal overlay and the continue bar

The status islands now also emit `data-up-next` on `view.upNextId`; the map
draws a ring, the outline and journey an "Up next" label. `ContinueBar`
(`src/components/roadmaps/continue-bar.tsx`) is a request time island whose
fallback is the visitor's "Start here" bar in the same reserved box, so
nothing below it moves. It reuses the learning loop for this week's goal
("This week: 1 of 3 topics").

### Map controls

`MapCanvas` wraps the server rendered map from md: one CSS transform, no
library. Drag with a mouse or pen (touch keeps native scrolling, and a drag
never opens a topic), the wheel pans until the edge and then the page
scrolls, Ctrl or Cmd with the wheel zooms at the pointer, `+` `-` `0` inside
the map, and buttons for zoom in, zoom out, fit to screen and reset. The
minimap measures `[data-minimap]` blocks and jumps on select. Focus moving
inside the map (tree keys, search) pans the item into view. Animated moves use
`transform` only and stop under reduced motion.

### Tree pattern, collapse and hide optional

Map and List are WAI-ARIA trees (`views/tree.tsx`, rules in
`src/lib/roadmaps/tree-nav.ts`): one item in the tab order (roving tabindex),
Up and Down, Home and End, Right opens or moves in, Left closes or moves to
the parent, type ahead. Enter follows the link (the topic panel). Sections
own their group with `aria-owns` and `aria-expanded`. Collapsed sections are
stored per roadmap (`sydcrest:roadmap-collapsed:<slug>`, validated against the
roadmap's section ids) and hide optional per device
(`sydcrest:roadmap-hide-optional`); both apply after hydration with
`useSyncExternalStore` and never throw when storage is blocked. Hidden items
drop out of the key order because the tree only walks visible items. The
journey is a plain ordered list of links.

### Search

`src/lib/roadmaps/search.ts` (pure, tested): every query word must start a
word of the title, summary or section title, title matches first, a number
such as "2.3" matches exactly. The toolbar uses the ARIA combobox pattern;
Enter opens the topic panel and fires `revealNode`, which opens the section
and pans the map to it.

### Builds on and Leads to

`roadmaps.leads_to` (track keys, migration
`20261029180000_roadmap_links_estimates.sql`) comes from each draft's typed
`leads_to: RoadmapTrack[]` through the import. "Builds on" is derived as the
inverse in `src/lib/roadmaps/links.ts`; unpublished tracks are skipped. A test
keeps every one of the 27 tracks linked and agrees with the path quiz's
prerequisites. `roadmaps.level` (first-steps, beginner, next-step) is the
index's level filter.

### Topic panel

Adds the time, the practice task's "Done looks like" outcome
(`practiceOutcome`), quiz and review status (`TopicLearnerStatus`, a request
time island) and the Study Buddy entry (`TopicStudyBuddy`).

### Index

`/roadmaps`: filters by field, time band (`TIME_BANDS`, set from the real
spread), works on a phone (`PHONE_FRIENDLY` in the path quiz) and level
(`src/lib/roadmaps/catalogue.ts`). Cards are server rendered and only hidden
by the client filter. Progress on each card and "Recommended for you" (from
the saved path answers, or the signed cookie) are request time islands with
reserved space; anyone without answers sees the "Find my path" prompt.
