import { connection } from "next/server";
import { runAnalyticsMaintenance } from "@/lib/analytics/maintenance";
import { reengageHoldout } from "@/lib/experiments/reengage";
import { runAccountDeletions } from "@/lib/data-rights/deletion";
import { createAdminClient } from "@/lib/messaging/admin";
import { WHATSAPP_CONSENT_VERSION } from "@/lib/messaging/consent";
import { isAuthorizedCron } from "@/lib/messaging/cron-auth";
import { runReengage } from "@/lib/messaging/reengage";
import { supabaseReengageStore } from "@/lib/messaging/reengage-store";
import { sendServiceEmail } from "@/lib/messaging/email";
import { sendWhatsApp } from "@/lib/messaging/send";
import { firstName } from "@/lib/messaging/templates";
import { runOutcomeCheckins } from "@/lib/outcomes/checkins-run";
import { supabaseCheckinStore } from "@/lib/outcomes/checkins-store";
import { checkinHref } from "@/lib/outcomes/checkins";
import { todayIso } from "@/lib/outcomes/validation";
import { SITE_URL } from "@/lib/site";

/**
 * Daily re engagement nudge (scheduled in vercel.json). Messages consenting
 * learners who have been inactive for a week, at most once a week each,
 * except the reengage_holdout share, who get none (issue #327).
 * Then runs analytics maintenance (rollups and 13 month retention, issue
 * #242), here because the plan allows two crons, the outcome check ins
 * due today (#329), and deletes accounts whose 30 day grace period has
 * passed (issue #333). Each step is isolated: one failing does not stop the
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
      experiment: await reengageHoldout(admin),
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
      sendEmail: (email, checkin, displayName) =>
        sendServiceEmail({
          to: email,
          subject: `Your ${checkin.months} month check in`,
          text: [
            `Hello ${firstName(displayName) || "there"},`,
            "",
            `It has been ${checkin.months} months since you finished on SydCrest. Two minutes to tell us how you are doing helps us support you and the learners after you:`,
            "",
            `${SITE_URL}${checkinHref(checkin.id)}`,
            "",
            "Every question is optional. Thank you.",
            "SydCrest",
          ].join("\n"),
        }),
    });
    console.info(`[outcomes] check ins ${JSON.stringify(checkins)}`);
  } catch (cause) {
    console.error("[outcomes] check ins failed", { message: cause instanceof Error ? cause.message : String(cause) });
    checkins = { error: "check ins failed" };
  }


  const deletions = await runAccountDeletions(admin);
  const failed = "error" in summary || !analytics.ok || "error" in checkins || !deletions.ok;
  return Response.json({ ...summary, analytics, checkins, deletions }, { status: failed ? 500 : 200 });
}
