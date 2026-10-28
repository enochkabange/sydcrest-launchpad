import { NotificationBell } from "@/components/notifications/notification-bell";

/** The app shell's bell: NotificationBell (link to /notifications with the unread count). */
export function ShellBell({ variant = "icon", className = "" }: { variant?: "icon" | "row"; className?: string }) {
  return <NotificationBell variant={variant} className={className} />;
}
