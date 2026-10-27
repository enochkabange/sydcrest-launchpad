/**
 * Seeds a chapter with members and posts for the community feed specs (#162),
 * through the shared service role helpers. Test code only. Each call makes
 * its own chapter so parallel tests never share a feed.
 */
import { admin, insert } from "./supabase-admin";
import { createLearner, type Learner } from "./learners";

export type SeededChapter = {
  chapterId: string;
  name: string;
  whatsappUrl: string;
  lead: Learner;
  postIds: string[];
  pinnedId: string;
};

function hoursAgo(h: number) {
  return new Date(Date.now() - h * 3_600_000).toISOString();
}

/**
 * An active chapter with a lead and the given members, a pinned post by the
 * lead from long ago, and `older` posts by members spread over past hours
 * (outside the hourly limit) so the feed needs "Load more".
 */
export async function seedChapter(members: Learner[], older = 0): Promise<SeededChapter> {
  const suffix = crypto.randomUUID().slice(0, 8);
  const whatsappUrl = `https://chat.whatsapp.com/E2eTamale${suffix}`;
  const name = `Tamale Test ${suffix}`;
  const [chapter] = await insert("chapters", [
    {
      slug: `e2e-tamale-${suffix}`,
      name,
      region: "northern",
      city: "Tamale",
      status: "active",
      whatsapp_url: whatsappUrl,
    },
  ]);
  const lead = await createLearner("Abdul-Rahman Iddrisu");
  await insert("chapter_members", [
    { chapter_id: chapter.id, profile_id: lead.id, role: "lead" },
    ...members.map((m) => ({ chapter_id: chapter.id, profile_id: m.id, role: "member" })),
  ]);

  const [pinned] = await insert("community_posts", [
    {
      author_id: lead.id,
      scope: "chapter",
      chapter_id: chapter.id,
      body: "Welcome to the chapter feed. **Skillshop** every first Saturday at the hub.",
      pinned_at: hoursAgo(200),
      created_at: hoursAgo(300),
    },
  ]);
  const author = members[0] ?? lead;
  const posts = await insert(
    "community_posts",
    Array.from({ length: older }, (_, i) => ({
      author_id: author.id,
      scope: "chapter",
      chapter_id: chapter.id,
      body: `Week ${older - i} notes from the Tamale study group`,
      created_at: hoursAgo(2 + i),
    })),
  );
  return { chapterId: chapter.id, name, whatsappUrl, lead, postIds: posts.map((p) => p.id), pinnedId: pinned.id };
}

/** Puts `count` posts by this person into the last hour, to reach the posting limit. */
export async function fillHourlyLimit(seeded: SeededChapter, authorId: string, count = 10) {
  await insert(
    "community_posts",
    Array.from({ length: count }, (_, i) => ({
      author_id: authorId,
      scope: "chapter",
      chapter_id: seeded.chapterId,
      body: `Quick note ${i + 1}`,
      created_at: new Date(Date.now() - (i + 1) * 60_000).toISOString(),
    })),
  );
}

export async function deleteChapter(seeded: SeededChapter) {
  const posts = await admin<{ id: string }[]>(`/rest/v1/community_posts?chapter_id=eq.${seeded.chapterId}&select=id`);
  const replies = posts.length
    ? await admin<{ id: string }[]>(`/rest/v1/community_replies?post_id=in.(${posts.map((p) => p.id).join(",")})&select=id`)
    : [];
  const targets = [...posts, ...replies].map((r) => r.id);
  if (targets.length) await admin(`/rest/v1/reports?target_id=in.(${targets.join(",")})`, { method: "DELETE" });
  await admin(`/rest/v1/chapters?id=eq.${seeded.chapterId}`, { method: "DELETE" });
}
