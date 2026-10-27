import "server-only";
import { revalidateTag } from "next/cache";
import { OUTCOME_STATS_TAG } from "./public";

/**
 * Refresh the public /impact numbers after an admin verifies, rejects or
 * reopens an outcome. Expires at once so the next visit sees the new count.
 */
export function revalidateOutcomeStats() {
  revalidateTag(OUTCOME_STATS_TAG, { expire: 0 });
}
