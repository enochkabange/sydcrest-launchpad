---
category: App shell
---

# AppTopBar

Logo, theme switch, bell and the You menu; the phone header in the app, and with `links` the full top bar on public pages.

## When to use

The app layout renders it without links (hidden from md, where the sidebar takes over). Public and marketing layouts pass `links` for signed in users, adding the five destinations as a row from md.

## Props

links?: boolean.

## Where it is used

src/app/(app)/layout.tsx and the public layouts

## Source

`src/components/app-shell/shell.tsx`. Exported as `AppTopBar`.
