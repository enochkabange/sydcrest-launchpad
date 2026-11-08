---
category: Forms
---

# CheckboxGroup

A fieldset of checkboxes sharing one name: one column on phones, two from sm, each row a 44px target.

## When to use

Use when the form posts every ticked value (skills, languages, categories). `legendStyle="field"` sizes the legend like a field label inside a longer fieldset.

## Props

name: string; legend: string; legendStyle?: "section" | "field"; hint?: string; options: readonly { value: string; label: string }[]; checked: readonly string[]; error?: string.

## Where it is used

src/app/.../expert/profile-form.tsx, src/app/.../experts/apply/apply-form.tsx

## Source

`src/components/ui/field.tsx`. Exported as `CheckboxGroup`.
