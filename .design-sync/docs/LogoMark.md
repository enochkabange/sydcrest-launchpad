---
category: Brand
---

# LogoMark

The four angled bars alone, measured from the brand guideline's vector paths.

## When to use

Use for favicons, avatars, the phone header and tight spaces. `auto` follows the theme (full colour on light, onDark in dark); `onDark` turns the cool bars white on Sea Blue or ink; `mono` inherits currentColor. Never recolour single bars.

## Props

size?: number; variant?: "auto" | "color" | "onDark" | "mono"; className?: string; plus <svg> props.

## Where it is used

App top bar on phones (variant auto)

## Source

`src/components/brand/Logo.tsx`. Exported as `LogoMark`.
