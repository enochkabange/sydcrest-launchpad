---
category: Layout
---

# DataTable

Tabular content as a real table from md, and one compact line per row on phones, from one element tree.

## When to use

Use for lists of people or records with comparable columns (admin lists, the opportunity board). Columns with `phone: "hide"` drop on phones; `phone: "only"` is a combined phone cell; `align: "end"` for numbers. Give one cell's link `rowLinkClass` to make the whole row the target.

## Props

caption: string; columns: Column<T>[] where Column<T> = { header: string; cell: (row: T) => ReactNode; align?: "start" | "end"; phone?: "show" | "hide" | "only"; className?: string }; rows: T[]; rowKey: (row: T) => string; rowClassName?: (row: T) => string | undefined.

## Where it is used

/admin/chapters, /admin/cohorts, /admin/cohorts/[id], /admin/events, /admin/impact, /admin/opportunities

## Source

`src/components/ui/layout.tsx`. Exported as `DataTable`.
