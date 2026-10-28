---
category: Forms
---

# TextField

A labelled text input with an optional hint and error, wired for screen readers.

## When to use

Use for every single line input. Give it an id; the label, hint and error ids derive from it. Fields post by `name` (it defaults to the id). Errors use aria-invalid plus aria-describedby, never colour alone.

## Props

id: string; label: string; hint?: string; error?: string; plus native <input> props.

## Where it is used

src/app/.../admin/chapters/chapter-form.tsx, src/app/.../admin/cohorts/forms.tsx, src/app/.../admin/content/content-forms.tsx, src/app/.../admin/events/access-forms.tsx, src/app/.../admin/events/event-form.tsx, src/app/.../admin/roadmaps/node-form.tsx

## Source

`src/components/ui/field.tsx`. Exported as `TextField`.
