import "server-only";
import { revalidateTag } from "next/cache";
import { ALL_SKILLS_TAG, SKILLS_TAG, skillTag } from "./public";

/**
 * Refresh /skills and /skills/[slug] after an admin write. With slugs (pass
 * the old and new slug on a rename) only those pages and the list; without,
 * every skill page. Expires at once so the admin sees the change next load.
 */
export function revalidateSkills(...slugs: string[]) {
  const now = { expire: 0 };
  if (slugs.length === 0) {
    revalidateTag(ALL_SKILLS_TAG, now);
    return;
  }
  revalidateTag(SKILLS_TAG, now);
  for (const slug of slugs) revalidateTag(skillTag(slug), now);
}
