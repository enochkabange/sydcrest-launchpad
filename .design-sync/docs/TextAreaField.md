---
category: Forms
---

# TextAreaField

A multi line text field with the same label, hint and error wiring as TextField; three rows unless told otherwise.

## When to use

Use for posts, pitches, feedback and summaries. Fields post by `name` (it defaults to the id). Errors use aria-invalid plus aria-describedby, never colour alone.

## Props

id: string; label: string; hint?: string; error?: string; rows?: number (default 3); plus native <textarea> props.

## Where it is used

src/app/.../admin/chapters/chapter-form.tsx, src/app/.../admin/events/access-forms.tsx, src/app/.../admin/events/event-form.tsx, src/app/.../admin/organisations/decision-form.tsx, src/app/.../admin/roadmaps/node-form.tsx, src/app/.../admin/roadmaps/roadmap-form.tsx

## Source

`src/components/ui/field.tsx`. Exported as `TextAreaField`.
