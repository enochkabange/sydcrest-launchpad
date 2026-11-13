import { connection } from "next/server";
import { runAnalyticsMaintenance } from "@/lib/analytics/maintenance";
import { createAdminClient } from "@/lib/messaging/admin";
import { WHATSAPP_CONSENT_VERSION } from "@/lib/messaging/consent";
import { isAuthorizedCron } from "@/lib/messaging/cron-auth";
import { runReengage } from "@/lib/messaging/reengage";
import { supabaseReengageStore } from "@/lib/messaging/reengage-store";
import { sendWhatsApp } from "@/lib/messaging/send";
import { firstName } from "@/lib/messaging/templates";
import { runOutcomeCheckins } from "@/lib/outcomes/checkins-run";
import { supabaseCheckinStore } from "@/lib/outcomes/checkins-store";
import { checkinHref } from "@/lib/outcomes/checkins";
import { todayIso } from "@/lib/outcomes/validation";
import { SITE_URL } from "@/lib/site";

/**
 * Daily re engagement nudge (scheduled in vercel.json). Messages consenting
 * learners who have been inactive for a week, at most once a week each.
 * Then runs analytics maintenance (rollups and 13 month retention, issue
 * #242), here because the plan allows two crons, and the outcome check ins
 * due today (#329). Each step is isolated: one failing does not stop the
 * others.
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

  let checkins: Awaited<ReturnType<typeof runOutcomeCheckins>> | { error: string };
  try {
    checkins = await runOutcomeCheckins({
      store: supabaseCheckinStore(admin),
      today: todayIso(),
      sendWhatsApp: (phone, checkin, displayName) =>
        sendWhatsApp(phone, "alert", {
          name: firstName(displayName),
          title: `your ${checkin.months} month check in is ready, two minutes to tell us how you are doing`,
          url: `${SITE_URL.replace(/^https?:\/\//, "")}${checkinHref(checkin.id)}`,
        }),
    });
    console.info(`[outcomes] check ins ${JSON.stringify(checkins)}`);
  } catch (cause) {
    console.error("[outcomes] check ins failed", { message: cause instanceof Error ? cause.message : String(cause) });
    checkins = { error: "check ins failed" };
  }

  const failed = "error" in summary || !analytics.ok || "error" in checkins;
  return Response.json({ ...summary, analytics, checkins }, { status: failed ? 500 : 200 });
}
