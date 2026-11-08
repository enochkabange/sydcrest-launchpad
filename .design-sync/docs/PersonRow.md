---
category: Community
---

# PersonRow

A person in a chapter: initials, name (linked when their profile is public) and an optional note.

## When to use

Use in chapter member lists and the admin chapter editor. `you` adds "(you)".

## Props

person: ChapterPerson; note?: string; you?: boolean.

## Where it is used

/chapters/[slug], /admin/chapters/[id]

## Source

`src/components/chapters/chapter-bits.tsx`. Exported as `PersonRow`.
