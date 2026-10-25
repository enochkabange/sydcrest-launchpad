import { connection } from "next/server";
import { createAdminClient } from "@/lib/messaging/admin";
import { WHATSAPP_CONSENT_VERSION } from "@/lib/messaging/consent";
import { isAuthorizedCron } from "@/lib/messaging/cron-auth";
import { runReengage } from "@/lib/messaging/reengage";
import { supabaseReengageStore } from "@/lib/messaging/reengage-store";
import { sendWhatsApp } from "@/lib/messaging/send";
import { firstName } from "@/lib/messaging/templates";
import { SITE_URL } from "@/lib/site";

/**
 * Daily re engagement nudge (scheduled in vercel.json). Messages consenting
 * learners who have been inactive for a week, at most once a week each.
 */
export async function GET(request: Request) {
  await connection();
  if (!isAuthorizedCron(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    console.warn("[messaging] reengage skipped: SUPABASE_SECRET_KEY is not set.");
    return Response.json({ skipped: "SUPABASE_SECRET_KEY is not set" }, { status: 503 });
  }

  const url = `${SITE_URL.replace(/^https?:\/\//, "")}/dashboard`;
  const summary = await runReengage({
    store: supabaseReengageStore(admin),
    version: WHATSAPP_CONSENT_VERSION,
    send: (learner) => sendWhatsApp(learner.phone, "reengage", { name: firstName(learner.displayName), url }),
  });
  console.info(`[messaging] reengage ${JSON.stringify(summary)}`);
  return Response.json(summary);
}
