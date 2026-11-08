---
category: App shell
---

# HubPage

What a phone tab opens: the group's title, description and every destination as a card.

## When to use

Rendered by /learn, /mentors and /earn. Everything is two taps from anywhere. Role cards stream in from their own island.

## Props

id: "learn" | "mentors" | "community" | "earn" | "you".

## Where it is used

/learn, /mentors, /earn

## Source

`src/components/app-shell/hub.tsx`. Exported as `HubPage`.

## Notes

- Live: the role island reads window.SydCrestPreview.viewer.roles.
