---
category: Mentors
---

# BookingStatusBadge

A booking's status as a tinted pill: requested, accepted, declined, completed or cancelled.

## When to use

Use in the bookings inbox and thread. Exported from the code as StatusBadge.

## Props

status: "requested" | "accepted" | "declined" | "completed" | "cancelled".

## Where it is used

/bookings, /bookings/[id]

## Source

`src/components/bookings/bits.tsx` (exported there as `StatusBadge`). Exported as `BookingStatusBadge`.
