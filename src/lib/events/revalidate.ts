import "server-only";
import { revalidateTag } from "next/cache";
import { ALL_EVENTS_TAG, EVENTS_TAG, eventTag } from "./public";

/**
 * Refresh the cached public event pages after a host changes an event or a
 * recording. With slugs: those event pages plus the list, recordings and
 * sitemap (pass the old and new slug on a rename). Without: every event page.
 */
export function revalidateEvents(...slugs: string[]) {
  const now = { expire: 0 };
  if (slugs.length === 0) {
    revalidateTag(ALL_EVENTS_TAG, now);
    return;
  }
  revalidateTag(EVENTS_TAG, now);
  for (const slug of slugs) revalidateTag(eventTag(slug), now);
}
