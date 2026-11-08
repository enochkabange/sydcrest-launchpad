---
category: Forms
---

# SelectField

A labelled native select, on purpose: the Android picker beats any custom listbox.

## When to use

Use for choosing one of a known list (a region, a track, a cohort). Never replace with a custom dropdown. Fields post by `name` (it defaults to the id). Errors use aria-invalid plus aria-describedby, never colour alone.

## Props

id: string; label: string; hint?: string; error?: string; children (the <option>s); plus native <select> props.

## Where it is used

src/app/.../admin/applications/decision-form.tsx, src/app/.../admin/chapters/chapter-form.tsx, src/app/.../admin/cohorts/forms.tsx, src/app/.../admin/content/content-forms.tsx, src/app/.../admin/events/event-form.tsx, src/app/.../admin/roadmaps/node-form.tsx

## Source

`src/components/ui/field.tsx`. Exported as `SelectField`.
