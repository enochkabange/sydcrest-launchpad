---
category: Feedback
---

# Celebration

Shown after a topic is completed: what was earned, then the way forward.

## When to use

Use right after a quiz pass or a manual completion. It enters with the panel animation (transform and opacity only) and offers one next step.

## Props

heading: string; roadmapTitle: string; unlocked?: { node: boolean; roadmap: boolean }; note?: string; next: { href: string; title: string } | null.

## Where it is used

/learn/[slug]/[node] (inside Quiz and MarkComplete)

## Source

`src/components/learn/celebration.tsx`. Exported as `Celebration`.
