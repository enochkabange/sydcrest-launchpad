import "server-only";
import { revalidateTag } from "next/cache";
import { OPPORTUNITIES_TAG } from "./public";

/**
 * Refresh the public board, detail pages and sitemap after any write to
 * opportunities (create, edit, open, close, delete). Expires at once so the
 * poster sees the change on the next load. Call it from the admin actions
 * here and from the organisation actions in #161.
 */
export function revalidateOpportunities() {
  revalidateTag(OPPORTUNITIES_TAG, { expire: 0 });
}
