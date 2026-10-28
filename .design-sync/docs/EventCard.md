---
category: Community
---

# EventCard

One event in a list: date tile, kind, title, time, place and chips. The whole card is the link.

## When to use

Use in the /events grid and the dashboard. Past and cancelled events mute the date tile; cancelled titles strike through and carry a Cancelled chip.

## Props

event: PublicEvent; past?: boolean.

## Where it is used

/events, /dashboard

## Source

`src/components/events/event-card.tsx`. Exported as `EventCard`.
