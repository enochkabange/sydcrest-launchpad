---
category: Layout
---

# Container

Centres content at one of three widths with the standard gutters (16px on phones, 32px from md).

## When to use

Wrap every screen's content. `page` (1280px) is the default; `wide` (1440px) for a band holding a big grid or the roadmap map; `reading` (about 70ch) ONLY for long running text.

## Props

width?: "page" | "wide" | "reading" (default page); as?: "div" | "section" | "article" | "header" | "main" | "footer"; className?: string; children; plus native div props. Emits data-container for the e2e width checks.

## Where it is used

the (marketing) layout, /events, /events/[slug], /events/recordings, /experts, /experts/[slug]

## Source

`src/components/ui/layout.tsx`. Exported as `Container`.
