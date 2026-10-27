# Roadmap views

How a roadmap page is built, in layers, so a design pass can restyle the
roadmap (or add a new way of drawing it) by touching tokens and view
components only. Issue #129. The map's look follows the founder approved
mockup (dark theme): spine, section blocks, topics branching left and right on
wide screens, a transit line on phones, a legend, Map and List, and an overall
progress bar.

```
roadmap_nodes (kind, choice_group)          layer 1  content semantics
        │  getPublishedRoadmap (cached)
        ▼
buildNodeTree → buildRoadmapView            layer 2  view model (pure)
        │
        ▼
ROADMAP_VIEWS: map │ outline                layer 3  renderers (swappable)
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

Each `ViewNode` has `id, slug, title, summary, number` ("2.3"), `depth`,
`kind` (resolved), `optional`, `choiceGroup`, `status` (`not_started`,
`in_progress`, `done`, or `null` when unknown), `sectionId`, `index`,
`previousId`, `nextId`, `place` (`{ n, of }`, "Topic 2 of 4") and `children`
(nodes deeper than a topic; empty on sections).

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
| `registry.ts` | `ROADMAP_VIEWS`: `{ id, label, Component }[]`. The first is the default. |
| `types.ts` | `RoadmapViewProps = { slug, view }` |
| `map-view.tsx` | `map` ("Map", default): transit line below md, branching map from md |
| `outline-view.tsx` | `outline` ("List"): the original outline, unchanged in look |
| `view-switcher.tsx` | client: the Map and List buttons and the active view |
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
(`sydcrest:roadmap-view`) and read with `useSyncExternalStore`: the server and
the first client render show the default (map) and the stored choice applies
straight after hydration, with no hydration mismatch.

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
pattern. e2e coverage is `e2e/roadmap-views.spec.ts` and `e2e/roadmaps.spec.ts`.

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

Orange (`node-progress`, `checkpoint`) is a fill or border only on light;
`checkpoint-label` is the text safe orange.
