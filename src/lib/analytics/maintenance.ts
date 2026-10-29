import "server-only";
import type { AdminClient } from "@/lib/messaging/admin";

export type MaintenanceResult = { ok: true; result: unknown } | { ok: false; error: string };

/**
 * Rebuilds the analytics rollups for the last `days` UTC days and purges raw
 * events older than 13 months (public.run_analytics_maintenance). Runs from
 * the daily /api/cron/reengage job, and on demand from /api/cron/analytics.
 * Never throws: a failure here must not stop the job it shares.
 */
export async function runAnalyticsMaintenance(admin: AdminClient, days = 3): Promise<MaintenanceResult> {
  try {
    const { data, error } = await admin.rpc("run_analytics_maintenance", { p_days: days });
    if (error) {
      console.error("[analytics] maintenance failed", { code: error.code, message: error.message });
      return { ok: false, error: error.code ?? "failed" };
    }
    console.info(`[analytics] maintenance ${JSON.stringify(data)}`);
    return { ok: true, result: data };
  } catch (cause) {
    console.error("[analytics] maintenance failed", { message: cause instanceof Error ? cause.message : String(cause) });
    return { ok: false, error: "failed" };
  }
}
