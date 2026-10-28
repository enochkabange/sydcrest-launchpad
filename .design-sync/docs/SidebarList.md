---
category: App shell
---

# SidebarList

The sidebar navigation: Home, then every group (Learn, Mentors, Community, Earn, You) with its heading.

## When to use

Rendered by AppSidebar. Role items (Mentor console, Expert dashboard, Organisation, Admin) appear only for viewers with that role; the active item is tinted info-bg with aria-current.

## Props

roles: { admin: boolean; staff: boolean; expert: boolean; business: boolean }; pathname: string | null; ready?: boolean.

## Where it is used

AppSidebar

## Source

`src/components/app-shell/nav.tsx`. Exported as `SidebarList`.
