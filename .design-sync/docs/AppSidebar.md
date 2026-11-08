---
category: App shell
---

# AppSidebar

The signed in sidebar from md: logo, theme switch, bell, every nav group expanded, the user chip and legal links.

## When to use

Rendered once by the (app) layout. Never rebuild navigation per screen: it reads src/lib/nav/config.ts. Hidden below md, where PhoneTabBar takes over. No hamburger at any width.

## Props

No props. In the app it reads the viewer and pathname inside Suspense islands; in this bundle those come from window.SydCrestPreview.viewer and .pathname.

## Where it is used

src/app/(app)/layout.tsx

## Source

`src/components/app-shell/shell.tsx`. Exported as `AppSidebar`.

## Notes

- Live: the session islands are de-asynced in the bundle and read `window.SydCrestPreview` (viewer, pathname). The bell's unread count reads window.SydCrestPreview.unread (3 here).
