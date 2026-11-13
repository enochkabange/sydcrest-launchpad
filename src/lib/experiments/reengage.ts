import "server-only";
import type { AdminClient } from "@/lib/messaging/admin";
import type { ReengageExperiment } from "@/lib/messaging/reengage";
import { assign, parseVariants } from "./assign";
import { recordExposure } from "./record";

/** The holdout on the weekly WhatsApp nudge (issue #327), seeded running by its migration. */
export const REENGAGE_HOLDOUT = "reengage_holdout";

/**
 * The holdout for the re-engagement job, or null when the experiment is not
 * running (then everyone due a nudge gets one). Learners are assigned by
 * their profile id, so the same people stay held out week after week.
 *
 * The job has no browser, so it cannot see a device's analytics switch; the
 * arm is noted for everyone it considers (the privacy page says so).
 */
export async function reengageHoldout(
  admin: AdminClient,
): Promise<ReengageExperiment | null> {
  const { data, error } = await admin.rpc("running_experiment", {
    p_key: REENGAGE_HOLDOUT,
  });
  if (error) {
    console.error("[messaging] could not read the reengage holdout", {
      code: error.code,
      message: error.message,
    });
    return null;
  }
  const variants = parseVariants(data);
  if (!variants) return null;
  return {
    arm: (candidate) =>
      assign(REENGAGE_HOLDOUT, candidate.profileId, variants) === "holdout"
        ? "holdout"
        : "nudge",
    record: (candidate, arm) =>
      recordExposure(admin, REENGAGE_HOLDOUT, arm, {
        profileId: candidate.profileId,
      }),
  };
}
