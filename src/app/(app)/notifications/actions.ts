"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { renderNotification } from "@/lib/notifications/render";
import { createClient } from "@/lib/supabase/server";

/**
 * Notification centre mutations. Each re-checks the session; RLS and the
 * column grant mean a learner can only set read_at on, or delete, their own
 * rows. Marking read goes through mark_notifications_read.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function idFrom(formData: FormData): string | null {
  const id = formData.get("id");
  return typeof id === "string" && UUID.test(id) ? id : null;
}

export async function markAllNotificationsRead() {
  await requireUser();
  const supabase = await createClient();
  const { error } = await supabase.rpc("mark_notifications_read", {});
  if (error) console.error("notifications: mark all read failed", error.message);
  revalidatePath("/notifications");
}

export async function markNotificationRead(formData: FormData) {
  await requireUser();
  const id = idFrom(formData);
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.rpc("mark_notifications_read", { p_ids: [id] });
  if (error) console.error("notifications: mark read failed", error.message);
  revalidatePath("/notifications");
}

export async function deleteNotification(formData: FormData) {
  const user = await requireUser();
  const id = idFrom(formData);
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("notifications").delete().eq("id", id).eq("recipient_id", user.id);
  if (error) console.error("notifications: delete failed", error.message);
  revalidatePath("/notifications");
}

/**
 * Opens a notification: marks it read, then goes to its target. The target
 * is worked out again from the stored row, never taken from the form.
 */
export async function openNotification(formData: FormData) {
  const user = await requireUser();
  const id = idFrom(formData);
  if (!id) redirect("/notifications");
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .select("kind, payload, read_at")
    .eq("id", id)
    .eq("recipient_id", user.id)
    .maybeSingle();
  if (!data) redirect("/notifications");
  if (!data.read_at) {
    const { error } = await supabase.rpc("mark_notifications_read", { p_ids: [id] });
    if (error) console.error("notifications: mark read on open failed", error.message);
  }
  revalidatePath("/notifications");
  redirect(renderNotification(data.kind, data.payload).href ?? "/notifications");
}
