import { Suspense } from "react";
import { Bell } from "lucide-react";
import Link from "@/components/ui/link";
import { getUnreadCount } from "@/lib/notifications/server";

/**
 * The bell for the app shell header: a link to /notifications with the
 * unread count. Self contained: it reads the session inside its own
 * <Suspense>, so it can sit in a static layout. Until the count streams in
 * (or if it cannot be read) it is a plain bell with no badge.
 *
 * `variant="row"` shows the word "Notifications" beside the bell, for a
 * sidebar list; the default is the icon alone for a compact header.
 */
export function NotificationBell({ variant = "icon", className = "" }: { variant?: "icon" | "row"; className?: string }) {
  return (
    <Suspense fallback={<BellLink count={null} variant={variant} className={className} />}>
      <BellWithCount variant={variant} className={className} />
    </Suspense>
  );
}

async function BellWithCount({ variant, className }: { variant: "icon" | "row"; className: string }) {
  const count = await getUnreadCount().catch(() => null);
  return <BellLink count={count} variant={variant} className={className} />;
}

export function badgeText(count: number) {
  return count > 9 ? "9+" : String(count);
}

export function bellLabel(count: number | null) {
  if (!count) return "Notifications";
  return `Notifications, ${count} unread`;
}

function BellLink({ count, variant, className }: { count: number | null; variant: "icon" | "row"; className: string }) {
  const unread = count !== null && count > 0;
  const row = variant === "row";
  return (
    <Link
      href="/notifications"
      aria-label={bellLabel(count)}
      data-testid="notification-bell"
      className={`relative inline-flex min-h-11 items-center gap-3 rounded-md text-content-2 hover:bg-surface-sunken hover:text-content ${row ? "px-3 text-sm font-semibold" : "min-w-11 justify-center"} ${className}`}
    >
      <span className="relative inline-flex">
        <Bell aria-hidden className="size-5" />
        {unread && (
          <span
            aria-hidden
            className="absolute -top-1.5 -right-2 inline-flex min-w-5 items-center justify-center rounded-full bg-danger-fg px-1 text-[0.6875rem] leading-5 font-bold text-content-inv"
          >
            {badgeText(count)}
          </span>
        )}
      </span>
      {row && <span>Notifications</span>}
    </Link>
  );
}
