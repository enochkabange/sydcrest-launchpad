---
category: Layout
---

# MainWithRail

A main column plus a right rail (320px at lg, 360px at xl); below lg they stack in DOM order.

## When to use

Use for app home screens (the thing to do next in main, context in the rail), lists with filters, and admin record pages. `railFirst` puts filters above the list on phones; `railFrom="lg"` hides a rail that only repeats what the tab bar reaches; `spaced={false}` when children carry their own margins. Each rail card is its own Suspense island in the app.

## Props

children; rail: ReactNode; railLabel: string; railFirst?: boolean; sticky?: boolean; spaced?: boolean (default true); railFrom?: "always" | "lg"; className?: string.

## Where it is used

/admin/applications, /admin/cohorts, /admin/events/[id], /admin/events/new, /admin/outcomes, /admin/skills

## Source

`src/components/ui/layout.tsx`. Exported as `MainWithRail`.
