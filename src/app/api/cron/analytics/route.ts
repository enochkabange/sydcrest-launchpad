import { connection } from "next/server";
import { createAdminClient } from "@/lib/messaging/admin";
import { isAuthorizedCron } from "@/lib/messaging/cron-auth";
import { runAnalyticsMaintenance } from "@/lib/analytics/maintenance";

/**
 * Analytics maintenance on demand (issue #242). Not scheduled: the daily run
 * happens inside /api/cron/reengage (the plan allows two crons). Rebuilds
 * the daily rollups (events_daily, web_vitals_daily, errors_daily,
 * durations_daily, abandonment_daily) for the last three UTC days, so late
 * beacons and later successes are counted, and deletes raw events older than
 * 13 months. ?days=N (1 to 400) rebuilds further back, e.g. after a fix.
 */
export async function GET(request: Request) {
  await connection();
  if (!isAuthorizedCron(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    console.warn("[analytics] maintenance skipped: SUPABASE_SECRET_KEY is not set.");
    return Response.json({ skipped: "SUPABASE_SECRET_KEY is not set" }, { status: 503 });
  }

  const days = Number(new URL(request.url).searchParams.get("days") ?? "3");
  const outcome = await runAnalyticsMaintenance(admin, Number.isInteger(days) && days >= 1 && days <= 400 ? days : 3);
  return outcome.ok ? Response.json(outcome.result) : Response.json({ error: "maintenance failed" }, { status: 500 });
}
