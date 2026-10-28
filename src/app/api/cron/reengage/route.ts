import { connection } from "next/server";
import { runAnalyticsMaintenance } from "@/lib/analytics/maintenance";
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
 * Then runs analytics maintenance (rollups and 13 month retention, issue
 * #242), here because the plan allows two crons. Each step is isolated: one
 * failing does not stop the other.
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
  let summary: Awaited<ReturnType<typeof runReengage>> | { error: string };
  try {
    summary = await runReengage({
      store: supabaseReengageStore(admin),
      version: WHATSAPP_CONSENT_VERSION,
      send: (learner) => sendWhatsApp(learner.phone, "reengage", { name: firstName(learner.displayName), url }),
    });
    console.info(`[messaging] reengage ${JSON.stringify(summary)}`);
  } catch (cause) {
    console.error("[messaging] reengage failed", { message: cause instanceof Error ? cause.message : String(cause) });
    summary = { error: "reengage failed" };
  }
  const analytics = await runAnalyticsMaintenance(admin);
  const failed = "error" in summary || !analytics.ok;
  return Response.json({ ...summary, analytics }, { status: failed ? 500 : 200 });
}
