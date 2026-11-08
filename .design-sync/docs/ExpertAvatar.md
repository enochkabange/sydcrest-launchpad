---
category: Mentors
---

# ExpertAvatar

The expert's own photo when they set one, else their initials. SydCrest never invents photos.

## When to use

Use wherever an expert is named. Sizes sm (48px), md (64px), lg (80px, 96px from lg).

## Props

expert: { name: string; avatarUrl: string | null }; size?: "sm" | "md" | "lg".

## Where it is used

/experts/[slug], offer pages, ExpertCard

## Source

`src/components/experts/expert-bits.tsx`. Exported as `ExpertAvatar`.
