import "server-only";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { renderNotification, type RenderedNotification } from "./render";

/**
 * Reads for the notification centre, through the learner's own client: RLS
 * returns only rows where they are the recipient. Request time (cookies), so
 * callers sit inside <Suspense>.
 */

/** How many notifications the centre lists. Older ones stay until the learner deletes them. */
export const LIST_LIMIT = 50;

export type NotificationItem = RenderedNotification & {
  id: string;
  kind: string;
  createdAt: string;
  read: boolean;
};

/** Unread count for the bell, or null when signed out or the read fails (the bell then shows no badge). */
export async function getUnreadCount(): Promise<number | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("recipient_id", user.id)
    .is("read_at", null);
  if (error) {
    console.error("notifications: unread count failed", error.message);
    return null;
  }
  return count ?? 0;
}

export async function listNotifications(userId: string): Promise<{ items: NotificationItem[]; unread: number }> {
  const supabase = await createClient();
  const [rows, unread] = await Promise.all([
    supabase
      .from("notifications")
      .select("id, kind, payload, read_at, created_at")
      .eq("recipient_id", userId)
      .order("created_at", { ascending: false })
      .limit(LIST_LIMIT),
    supabase.from("notifications").select("id", { count: "exact", head: true }).eq("recipient_id", userId).is("read_at", null),
  ]);
  if (rows.error) throw new Error(`Could not load notifications: ${rows.error.message}`);
  return {
    items: rows.data.map((row) => ({
      ...renderNotification(row.kind, row.payload),
      id: row.id,
      kind: row.kind,
      createdAt: row.created_at,
      read: row.read_at !== null,
    })),
    unread: unread.count ?? rows.data.filter((r) => r.read_at === null).length,
  };
}
