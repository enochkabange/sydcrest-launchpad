---
category: Forms
---

# CheckboxField

A checkbox with its label beside it; the whole row is a 44px target and the label may hold links.

## When to use

Use for a single yes or no (consent, a preference). For several options under one name use CheckboxGroup.

## Props

id: string; children: ReactNode (the label); error?: string; plus native <input> props except type.

## Where it is used

src/app/.../admin/content/content-forms.tsx, src/app/.../admin/events/access-forms.tsx, src/app/.../admin/roadmaps/node-form.tsx, src/app/.../admin/roadmaps/resource-form.tsx, src/app/.../age-consent-fields.tsx, src/app/.../business/new/create-form.tsx

## Source

`src/components/ui/field.tsx`. Exported as `CheckboxField`.
