import { Bell } from "lucide-react";
import Link from "@/components/ui/link";

/**
 * Placeholder slot for NotificationBell (PR #189, not on main yet): a plain
 * link to /notifications with no unread count. When #189 lands, replace the
 * body with `<NotificationBell variant={variant} className={className} />`
 * from src/components/notifications/notification-bell.tsx; the props match.
 */
export function ShellBell({ variant = "icon", className = "" }: { variant?: "icon" | "row"; className?: string }) {
  const row = variant === "row";
  return (
    <Link
      href="/notifications"
      aria-label="Notifications"
      data-testid="notification-bell"
      className={`relative inline-flex min-h-11 items-center gap-3 rounded-md text-content-2 no-underline hover:bg-surface-sunken hover:text-content ${row ? "px-3 text-sm font-semibold" : "min-w-11 justify-center"} ${className}`}
    >
      <Bell aria-hidden className="size-5" />
      {row && <span>Notifications</span>}
    </Link>
  );
}
