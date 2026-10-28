---
category: Actions
---

# Button

The one button: primary for the main action on a screen, secondary beside it, ghost for quiet row actions.

## When to use

Use for every action. One primary per view. Links that look like buttons use `buttonClasses(variant)` on a `Link` instead of wrapping a button in a link. Every button is at least 44px tall (`min-h-11`).

## Props

variant?: "primary" | "secondary" | "ghost" (default primary), plus every native <button> prop; type defaults to "button".

## Where it is used

src/app/.../admin/applications/decision-form.tsx, /admin/chapters/[id], src/app/.../admin/chapters/chapter-form.tsx, /admin/cohorts/[id], src/app/.../admin/cohorts/forms.tsx, src/app/.../admin/content/content-forms.tsx

## Source

`src/components/ui/button.tsx`. Exported as `Button`.
