import "server-only";
import { requireAdmin } from "@/lib/admin";

/** Every chapter (drafts too) for the event form's chapter list. */
export async function chapterOptions() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("chapters").select("id, name, status").order("name");
  return (data ?? []).map((c) => ({ id: c.id, name: c.status === "draft" ? `${c.name} (draft)` : c.name }));
}
