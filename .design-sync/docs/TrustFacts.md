---
category: Mentors
---

# TrustFacts

Trust signals backed by real rows only: a rating after the first review, sessions after the first completed booking, response time after three answered requests.

## When to use

Use on expert cards and pages; `stacked` in a rail. With nothing to show it says so plainly.

## Props

expert: DirectoryExpert; layout?: "inline" | "stacked".

## Where it is used

/experts/[slug], offer pages, ExpertCard

## Source

`src/components/experts/expert-bits.tsx`. Exported as `TrustFacts`.

## Notes

- The samples avoid ratings on purpose: no invented reviews.
