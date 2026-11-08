---
category: Learn
---

# ResourceRows

Free resources as compact rows with a kind badge (Article, Video, Practice), for the topic panel.

## When to use

Use in the topic panel. Links open in a new tab and say so to screen readers. Badge colours are roadmap-badge-* tokens.

## Props

resources: { id: string; label: string; url: string; kind: "article" | "video" | "practice"; source: string | null }[].

## Where it is used

/roadmaps/[slug] topic panel

## Source

`src/components/roadmaps/topic.tsx`. Exported as `ResourceRows`.
