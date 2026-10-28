import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import type { Database } from "@/lib/supabase/database.types";
import { sortChapters } from "./model";

/**
 * Public chapter data for /chapters and /chapters/[slug], cached with
 * `use cache`. Reads are anonymous (publishable key, no cookies), so row
 * level security returns non draft chapters and their leads only, and the
 * results can be prerendered for everyone. Viewer specific parts (membership,
 * the full roster, lead tools) are read per request inside <Suspense>.
 */

export const CHAPTERS_TAG = "chapters";
export const chapterTag = (slug: string) => `chapter:${slug}`;
const chapterLeadsTag = (id: string) => `chapter-leads:${id}`;

/** After any chapter or lead change. Expires now, so the editor sees it on the next load. */
export function revalidateChapters(...slugs: string[]) {
  const now = { expire: 0 };
  revalidateTag(CHAPTERS_TAG, now);
  for (const slug of slugs) revalidateTag(chapterTag(slug), now);
}

function anonClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
  );
}

/** At build time (CI has no database) a failed read is empty; at runtime it throws and is not cached. */
async function guarded<T>(what: string, empty: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`Chapters: could not load ${what} at build time (${message}); rendering on demand.`);
      return empty;
    }
    throw new Error(`Could not load ${what}: ${message}`);
  }
}

export type PublicChapter = {
  id: string;
  slug: string;
  name: string;
  region: string;
  city: string;
  status: string;
  summary: string | null;
  whatsapp_url: string | null;
};

export type ChapterPerson = {
  profile_id: string;
  display_name: string;
  avatar_url: string | null;
  public_slug: string | null;
  role: "member" | "lead";
  joined_at: string;
};

const CHAPTER_COLUMNS = "id, slug, name, region, city, status, summary, whatsapp_url";

/** Every visible chapter (not drafts), in launch order. */
export async function getPublicChapters(): Promise<PublicChapter[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CHAPTERS_TAG);
  return guarded("chapters", [], async () => {
    const { data, error } = await anonClient().from("chapters").select(CHAPTER_COLUMNS);
    if (error) throw new Error(error.message);
    return sortChapters(data ?? []);
  });
}

export async function getPublicChapter(slug: string): Promise<PublicChapter | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CHAPTERS_TAG, chapterTag(slug));
  return guarded("chapter", null, async () => {
    const { data, error } = await anonClient().from("chapters").select(CHAPTER_COLUMNS).eq("slug", slug).maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });
}

/** Rows from chapter_roster with the nullable view columns narrowed. */
export function toPeople(
  rows: Database["public"]["Views"]["chapter_roster"]["Row"][] | null,
): (ChapterPerson & { chapter_id: string })[] {
  return (rows ?? []).flatMap((r) =>
    r.profile_id && r.chapter_id && r.joined_at && (r.role === "lead" || r.role === "member")
      ? [
          {
            chapter_id: r.chapter_id,
            profile_id: r.profile_id,
            display_name: r.display_name ?? "Launchpad learner",
            avatar_url: r.avatar_url,
            public_slug: r.public_slug,
            role: r.role,
            joined_at: r.joined_at,
          },
        ]
      : [],
  );
}

/** The leads of a visible chapter. Leads are public; members are not. */
export async function getChapterLeads(chapterId: string): Promise<ChapterPerson[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CHAPTERS_TAG, chapterLeadsTag(chapterId));
  return guarded("chapter leads", [], async () => {
    const { data, error } = await anonClient()
      .from("chapter_roster")
      .select("chapter_id, profile_id, display_name, avatar_url, public_slug, role, joined_at")
      .eq("chapter_id", chapterId)
      .eq("role", "lead")
      .order("joined_at");
    if (error) throw new Error(error.message);
    return toPeople(data);
  });
}
