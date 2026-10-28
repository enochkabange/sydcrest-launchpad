---
category: Mentors
---

# SkillChips

Self declared skills as neutral chips, with "and N more" past `max`.

## When to use

Use for skills a person typed in. Earned skills use VerifiedSkillBadges, which look different on purpose. Renders nothing for an empty list.

## Props

skills: string[]; max?: number.

## Where it is used

/experts/[slug], ExpertCard

## Source

`src/components/experts/expert-bits.tsx`. Exported as `SkillChips`.
