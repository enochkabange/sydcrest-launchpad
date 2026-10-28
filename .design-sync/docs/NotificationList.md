---
category: Community
---

# NotificationList

The notification centre: unread count, mark all as read, and each notification with its icon, title, body and time.

## When to use

Use on /notifications. Plain forms posting to server actions, so it works before JavaScript loads. Unread rows sit on info-bg.

## Props

items: NotificationItem[]; unread: number; now: Date.

## Where it is used

/notifications

## Source

`src/components/notifications/notification-list.tsx`. Exported as `NotificationList`.
