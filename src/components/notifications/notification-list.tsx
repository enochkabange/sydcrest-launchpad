import {
  BadgeCheck,
  Bell,
  Briefcase,
  CalendarDays,
  CalendarX,
  CheckCheck,
  GraduationCap,
  Handshake,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { timeAgo, type NotificationIcon } from "@/lib/notifications/render";
import type { NotificationItem } from "@/lib/notifications/server";
import {
  deleteNotification,
  markAllNotificationsRead,
  markNotificationRead,
  openNotification,
} from "@/app/(app)/notifications/actions";

const ICONS: Record<NotificationIcon, LucideIcon> = {
  reply: MessageCircle,
  chapter: Users,
  event: CalendarDays,
  "event-cancelled": CalendarX,
  skill: BadgeCheck,
  booking: Handshake,
  cohort: GraduationCap,
  opportunity: Briefcase,
  general: Bell,
};

/**
 * The notification centre list. Plain forms posting to Server Actions, so
 * it works before any JavaScript loads. Opening a notification marks it
 * read and goes to its target.
 */
export function NotificationList({ items, unread, now }: { items: NotificationItem[]; unread: number; now: Date }) {
  return (
    <section aria-labelledby="notifications-list-heading" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="notifications-list-heading" className="text-h3 text-content">
          {unread > 0 ? `${unread} unread` : "All caught up"}
        </h2>
        {unread > 0 && (
          <form action={markAllNotificationsRead}>
            <Button type="submit" variant="secondary">
              <CheckCheck aria-hidden className="size-4" />
              Mark all as read
            </Button>
          </form>
        )}
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <NotificationRow key={item.id} item={item} now={now} />
        ))}
      </ul>
    </section>
  );
}

function NotificationRow({ item, now }: { item: NotificationItem; now: Date }) {
  const Icon = ICONS[item.icon];
  const when = timeAgo(item.createdAt, now);
  return (
    <li
      data-testid="notification"
      data-read={item.read ? "true" : "false"}
      className={`flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start sm:gap-4 ${
        item.read ? "border-line bg-surface" : "border-info-fg/30 bg-info-bg"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span
          aria-hidden
          className={`mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full ${item.read ? "bg-surface-sunken text-content-3" : "bg-surface text-info-fg"}`}
        >
          <Icon className="size-5" />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <form action={openNotification}>
            <input type="hidden" name="id" value={item.id} />
            <button
              type="submit"
              className={`min-h-11 text-left text-base break-words text-content underline-offset-2 hover:underline sm:min-h-0 ${item.read ? "font-normal" : "font-semibold"}`}
            >
              {!item.read && <span className="sr-only">Unread: </span>}
              {item.title}
            </button>
          </form>
          {item.body && <p className="text-sm break-words text-content-2">{item.body}</p>}
          <p className="text-xs text-content-3">
            <time dateTime={item.createdAt}>{when}</time>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2 pl-13 sm:pl-0">
        {!item.read && (
          <form action={markNotificationRead}>
            <input type="hidden" name="id" value={item.id} />
            <Button type="submit" variant="ghost" aria-label={`Mark read: ${item.title}`}>
              Mark read
            </Button>
          </form>
        )}
        <form action={deleteNotification}>
          <input type="hidden" name="id" value={item.id} />
          <Button type="submit" variant="ghost" aria-label={`Delete: ${item.title}`}>
            Delete
          </Button>
        </form>
      </div>
    </li>
  );
}
