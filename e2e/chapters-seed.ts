import { admin, insert } from "./supabase-admin";

/**
 * A chapter seeded through the local stack's service role, with optional
 * leads and members, for the chapters journeys (#163). Each call gets a
 * unique slug so parallel tests never share a chapter.
 */
export type SeededChapter = { id: string; slug: string; name: string };

export async function seedChapter(
  opts: {
    status?: "draft" | "launching" | "active" | "paused" | "closed";
    whatsappUrl?: string | null;
    summary?: string | null;
    leads?: string[];
    members?: string[];
  } = {},
): Promise<SeededChapter> {
  const tag = crypto.randomUUID().slice(0, 8);
  const slug = `tamale-e2e-${tag}`;
  const name = `Tamale test chapter ${tag}`;
  const [chapter] = await insert<{ slug: string; name: string }>("chapters", [
    {
      slug,
      name,
      region: "northern",
      city: "Tamale",
      status: opts.status ?? "launching",
      summary: opts.summary ?? null,
      whatsapp_url: opts.whatsappUrl ?? null,
    },
  ]);
  const people = [
    ...(opts.leads ?? []).map((id) => ({ chapter_id: chapter.id, profile_id: id, role: "lead" })),
    ...(opts.members ?? []).map((id) => ({ chapter_id: chapter.id, profile_id: id, role: "member" })),
  ];
  if (people.length) await admin("/rest/v1/chapter_members", { method: "POST", body: people });
  return { id: chapter.id, slug, name };
}

/** Members go with the chapter (on delete cascade). */
export async function deleteChapter(id: string) {
  await admin(`/rest/v1/chapters?id=eq.${id}`, { method: "DELETE" });
}

export async function setRegion(profileId: string, region: string) {
  await admin(`/rest/v1/profiles?id=eq.${profileId}`, { method: "PATCH", body: { region } });
}

/** Public profile, so the person shows by name on public lists and links to /u/slug. */
export async function makePublic(profileId: string, slug: string) {
  await admin(`/rest/v1/profiles?id=eq.${profileId}`, { method: "PATCH", body: { is_public: true, public_slug: slug } });
}
