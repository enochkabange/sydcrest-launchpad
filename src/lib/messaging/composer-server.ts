import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, type AdminClient } from "./admin";
import { RETURN_WINDOW_DAYS, type ResultRow } from "./audience";
import { WHATSAPP_CONSENT_KIND, WHATSAPP_CONSENT_VERSION } from "./consent";
import { sendWhatsApp } from "./send";
import { firstName } from "./templates";

/**
 * Server reads and the WhatsApp delivery for the audience composer (#334).
 * Reads go through the signed in person's client, so row level security and
 * the definer functions decide what comes back: staff see every send, a
 * chapter lead only their chapter's. Request time, so callers sit inside
 * <Suspense>.
 */

export type SentMessage = {
  id: string;
  channel: string;
  title: string;
  created_at: string;
  audience_count: number;
  holdout_count: number;
  chapter_id: string | null;
};

/** Recent sends, newest first: every one for staff, or one chapter's. */
export async function listSentMessages(chapterId?: string, limit = 30): Promise<SentMessage[]> {
  const supabase = await createClient();
  let query = supabase
    .from("message_sends")
    .select("id, channel, title, created_at, audience_count, holdout_count, chapter_id")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (chapterId) query = query.eq("chapter_id", chapterId);
  const { data, error } = await query;
  if (error) throw new Error(`Could not load messages: ${error.message}`);
  return data ?? [];
}

export type MessageDetail = SentMessage & { body: string | null; href: string | null; filters: unknown; holdout_share: number };

/** One send and its results, or null when it is not there or not yours to see. */
export async function getMessageResults(id: string): Promise<{ message: MessageDetail; rows: ResultRow[]; windowOpen: boolean } | null> {
  const supabase = await createClient();
  const { data: message } = await supabase
    .from("message_sends")
    .select("id, channel, title, body, href, filters, holdout_share, created_at, audience_count, holdout_count, chapter_id")
    .eq("id", id)
    .maybeSingle();
  if (!message) return null;
  const { data, error } = await supabase.rpc("message_results", { p_message_id: id });
  if (error) throw new Error(`Could not load results: ${error.message}`);
  const windowOpen = Date.now() - new Date(message.created_at).getTime() < RETURN_WINDOW_DAYS * 86_400_000;
  return { message, rows: data ?? [], windowOpen };
}

/** Published roadmaps, for the track filter. */
export async function getTrackOptions(): Promise<{ slug: string; title: string }[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("roadmaps").select("slug, title").eq("is_published", true).order("title");
  return data ?? [];
}

/** Chapters and cohorts, for the staff composer. */
export async function getStaffOptions() {
  const supabase = await createClient();
  const [chapters, cohorts] = await Promise.all([
    supabase.from("chapters").select("id, name").order("name"),
    supabase.from("cohorts").select("id, name").order("starts_on", { ascending: false }).limit(50),
  ]);
  return { chapters: chapters.data ?? [], cohorts: cohorts.data ?? [] };
}

/** Ids in groups small enough for a request address. */
function chunks<T>(items: T[], size = 150): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export type DeliveryCounts = { sent: number; skipped: number; failed: number; configured: boolean };

/**
 * Sends a message's queued WhatsApp recipients with the approved alert
 * template, then records each result. Consent is checked again here, against
 * the current wording: anyone whose live consent is for an older wording, or
 * for a different number, is skipped. Without the service key or Twilio
 * credentials nothing is sent and the rows stay queued or are skipped.
 */
export async function deliverWhatsApp(
  messageId: string,
  { title, url }: { title: string; url: string },
  admin: AdminClient | null = createAdminClient(),
): Promise<DeliveryCounts> {
  const counts: DeliveryCounts = { sent: 0, skipped: 0, failed: 0, configured: Boolean(admin) };
  if (!admin) return counts;

  const { data: queued, error } = await admin
    .from("message_recipients")
    .select("profile_id")
    .eq("message_id", messageId)
    .eq("status", "queued");
  if (error) throw new Error(`message_recipients: ${error.message}`);
  const ids = (queued ?? []).map((r) => r.profile_id);
  if (!ids.length) return counts;

  const consentRows: { profile_id: string; phone: string | null }[] = [];
  const profileRows: { id: string; phone: string | null; display_name: string | null }[] = [];
  for (const group of chunks(ids)) {
    const [consents, profiles] = await Promise.all([
      admin
        .from("consents")
        .select("profile_id, phone")
        .eq("kind", WHATSAPP_CONSENT_KIND)
        .eq("version", WHATSAPP_CONSENT_VERSION)
        .is("revoked_at", null)
        .in("profile_id", group),
      admin.from("profiles").select("id, phone, display_name").in("id", group),
    ]);
    if (consents.error) throw new Error(`consents: ${consents.error.message}`);
    if (profiles.error) throw new Error(`profiles: ${profiles.error.message}`);
    consentRows.push(...consents.data);
    profileRows.push(...profiles.data);
  }
  const consented = new Map(consentRows.map((c) => [c.profile_id, c.phone]));

  const outcome = new Map<string, "sent" | "skipped" | "failed">();
  const queue = [...profileRows];
  async function worker() {
    for (let p = queue.shift(); p; p = queue.shift()) {
      const consentPhone = consented.get(p.id);
      if (!p.phone || !consentPhone || consentPhone !== p.phone) {
        outcome.set(p.id, "skipped");
        continue;
      }
      const result = await sendWhatsApp(p.phone, "alert", { name: firstName(p.display_name), title, url });
      outcome.set(p.id, result.status);
      if (result.status === "skipped" && result.reason === "not_configured") counts.configured = false;
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  for (const id of ids) if (!outcome.has(id)) outcome.set(id, "skipped");

  for (const status of ["sent", "skipped", "failed"] as const) {
    const people = ids.filter((id) => outcome.get(id) === status);
    counts[status] = people.length;
    for (const group of chunks(people)) {
      const { error: updateError } = await admin
        .from("message_recipients")
        .update({ status, sent_at: status === "sent" ? new Date().toISOString() : null })
        .eq("message_id", messageId)
        .in("profile_id", group);
      if (updateError) console.error("[messaging] could not record WhatsApp results", updateError.message);
    }
  }
  return counts;
}
