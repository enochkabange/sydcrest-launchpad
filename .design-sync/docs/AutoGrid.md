---
category: Layout
---

# AutoGrid

Cards of unknown count: as many columns as fit at the minimum card width, one column on phones.

## When to use

Use for lists of cards (roadmaps, events, experts, hub cards). Minimum widths: sm 14rem, md 18rem (default), lg 22rem.

## Props

min?: "sm" | "md" | "lg" (default md); as?: "div" | "ul" | "ol"; className?: string; children.

## Where it is used

/briefs, /chapters, /dashboard, /events, /events/recordings, /expert

## Source

`src/components/ui/layout.tsx`. Exported as `AutoGrid`.
