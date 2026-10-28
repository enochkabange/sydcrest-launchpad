---
category: Layout
---

# SectionGrid

A fixed column grid for a known number of peers; one column on phones.

## When to use

Use for three stages, four facts, two choices. `2` and `3` take their columns from md; `4` is two columns from sm and four from lg. When the count varies use AutoGrid.

## Props

cols: 2 | 3 | 4; as?: "div" | "ul" | "ol" | "dl"; className?: string; children.

## Where it is used

the (marketing) layout, /about, /accessibility, /briefs/mine, /business, /experts

## Source

`src/components/ui/layout.tsx`. Exported as `SectionGrid`.
