"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { track, trackRefusal } from "@/lib/analytics/track";
import { classifyError, errorCode } from "@/lib/analytics/refusal";
import { requireUser } from "@/lib/auth";
import { SITE_URL } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { buildAudienceFilters, holdoutShare, parseDraft, SEND_CAP, type DraftErrors } from "./audience";
import { deliverWhatsApp } from "./composer-server";

/**
 * The composer's two actions (#334): check the audience size, and send.
 * Each re-checks the user; the database checks the rest (public.send_message):
 * who may send for which chapter, the cap, the daily limit, consent for
 * WhatsApp, and the frequency cap. `chapterId` is bound by the page (a
 * chapter lead's chapter, or null for a staff send) and always wins over any
 * chapter in the form.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type AudienceCheck = { size: number; error?: undefined } | { size?: undefined; error: string };

function chapterOrNull(chapterId: string | null): string | null {
  return chapterId && UUID.test(chapterId) ? chapterId : null;
}

function friendly(error: { code?: string; message?: string }): string {
  switch (error.code) {
    case "42501":
      return "You can only message members of a chapter you lead.";
    case "54000":
      return error.message?.startsWith("Over")
        ? `That is more than ${SEND_CAP} people. Narrow the audience and try again.`
        : "You have sent several messages today. Try again tomorrow.";
    case "P0002":
      return "Nobody matches these filters right now. Try fewer filters.";
    case "22023":
      return "Check the message and the filters, then try again.";
    default:
      return "We could not do that. Try again.";
  }
}

export async function checkAudience(chapterId: string | null, formData: FormData): Promise<AudienceCheck> {
  await requireUser();
  const chapter = chapterOrNull(chapterId);
  const channel = formData.get("channel") === "whatsapp" ? "whatsapp" : "in_app";
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("message_audience_size", {
    p_filters: buildAudienceFilters(formData, chapter),
    p_channel: channel,
    p_chapter_id: chapter ?? undefined,
  });
  if (error) return { error: friendly(error) };
  return { size: data ?? 0 };
}

export type SendState = {
  error?: string;
  errors?: DraftErrors;
  sent?: { id: string; audience: number; held: number; delivered: number; channel: "in_app" | "whatsapp" };
};

export async function sendComposedMessage(chapterId: string | null, _prev: SendState, formData: FormData): Promise<SendState> {
  await requireUser();
  const chapter = chapterOrNull(chapterId);
  const { draft, errors } = parseDraft(formData);
  if (Object.keys(errors).length) return { errors };
  if (formData.get("confirm") !== "on") return { error: "Tick the box to confirm who gets this message." };

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("send_message", {
    p_filters: buildAudienceFilters(formData, chapter),
    p_channel: draft.channel,
    p_template: draft.template,
    p_title: draft.title,
    p_body: draft.body,
    p_href: draft.href ?? "",
    p_holdout_share: holdoutShare(formData.get("holdout")),
    p_chapter_id: chapter ?? undefined,
  });
  const row = data?.[0];
  if (error || !row) {
    if (error) await trackRefusal("message_sent", classifyError(error), errorCode(error));
    return { error: error ? friendly(error) : "We could not send that. Try again." };
  }

  await track("message_sent", {
    channel: draft.channel,
    scope: chapter ? "chapter" : "staff",
    audience: row.audience,
    holdout: row.held_out,
  });

  if (draft.channel === "whatsapp") {
    const url = new URL(draft.href ?? "/notifications", SITE_URL).toString();
    after(async () => {
      try {
        await deliverWhatsApp(row.message_id, { title: draft.title, url });
      } catch (err) {
        console.error("[messaging] WhatsApp delivery failed", err instanceof Error ? err.message : String(err));
      }
    });
  }

  revalidatePath("/admin/messages");
  return {
    sent: { id: row.message_id, audience: row.audience, held: row.held_out, delivered: row.sent, channel: draft.channel },
  };
}
