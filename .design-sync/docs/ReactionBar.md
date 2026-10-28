---
category: Community
---

# ReactionBar

The four reactions (Like, Celebrate, Helpful, Support) as 44px toggle buttons with counts; optimistic, rolling back if the server refuses.

## When to use

Use on posts and replies. Read only shows only reactions that have counts.

## Props

target: "post" | "reply"; id: string; reactions: { like: number; celebrate: number; helpful: number; support: number }; mine: ("like" | "celebrate" | "helpful" | "support")[]; readOnly?: boolean.

## Where it is used

PostCard, ReplyCard

## Source

`src/components/community/reactions.tsx`. Exported as `ReactionBar`.
