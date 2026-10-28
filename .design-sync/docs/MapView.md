---
category: Learn
---

# MapView

The default roadmap renderer: a transit line on phones, a branching map from md with sections on a spine and topics left and right.

## When to use

Rendered by /roadmaps/[slug] through ROADMAP_VIEWS. Draw from `view` only and link every node. Learner state arrives as islands; links restyle themselves from `data-progress` and `data-complete`. Restyle through the --color-roadmap-* tokens first.

## Props

slug: string; view: RoadmapView (see index.d.ts; built by buildRoadmapView in src/lib/roadmaps/view-model.ts).

## Where it is used

/roadmaps/[slug]

## Source

`src/components/roadmaps/views/map-view.tsx`. Exported as `MapView`.

## Notes

- Live: the progress islands read the view you pass (statuses and counts) because the bundle stubs liveView to return it.
