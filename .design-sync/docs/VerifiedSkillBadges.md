---
category: Learn
---

# VerifiedSkillBadges

Verified skill badges: a tinted badge with a check, visibly different from self declared skills.

## When to use

Use on profiles (`full`: one badge per row with how and when it was earned, linking to the skill page) and on cards and directory rows (`compact` chips). Renders nothing for an empty list.

## Props

skills: { slug: string; name: string; source: "path_completion" | "assessment" | "portfolio_review"; issuedAt: string }[]; variant?: "full" | "compact"; label?: string.

## Where it is used

/u/[slug], /experts/[slug], /profile, ExpertCard, TalentCard

## Source

`src/components/skills/verified-skill-badges.tsx`. Exported as `VerifiedSkillBadges`.
