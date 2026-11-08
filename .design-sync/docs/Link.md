---
category: Actions
---

# Link

The app's link. A drop in replacement for `next/link` that skips prefetching when the learner is saving data or on a 2G class connection, because prefetch spends prepaid data on pages the learner may never open. Navigation still works; it fetches on tap.

## When to use

Use for every internal navigation instead of a raw `<a>` or `next/link`. A link that should look like a button keeps the `Link` and takes `className={buttonClasses("primary" | "secondary" | "ghost")}`; never wrap a `Button` in a link.

## Props

Same as `next/link`: `href` (string or URL object), `prefetch?`, `replace?`, `scroll?`, plus every native anchor prop (`className`, `aria-*`, `children`).

## Source

`src/components/ui/link.tsx`. Exported as `Link`.
