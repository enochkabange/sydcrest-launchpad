import { ShareCard } from "@/components/share/share-card";
import Link from "@/components/ui/link";
import { requireUser } from "@/lib/auth";
import { achievementShareTarget, formatCardDate } from "@/lib/share/card";
import { SITE_URL } from "@/lib/site";
import { describeAchievement } from "@/lib/social/public-profile";
import { withAchievementTitles } from "@/lib/social/queries";
import { createClient } from "@/lib/supabase/server";
import { MilestonePostsToggle } from "./milestone-posts-toggle";

const SHAREABLE = ["roadmap_node_completed", "section_completed", "roadmap_completed", "streak"];

/**
 * The learner's milestones with a share card each, and the milestone posts
 * setting. Reads the session, so render inside <Suspense>.
 */
export async function MilestonesSection() {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data: profile }, { data: rows }] = await Promise.all([
    supabase.from("profiles").select("is_public, milestone_posts").eq("id", user.id).single(),
    supabase
      .from("achievements")
      .select("id, profile_id, type, ref_id, created_at")
      .eq("profile_id", user.id)
      .in("type", SHAREABLE)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);
  const milestones = (await withAchievementTitles(rows ?? []))
    .map((a) => ({ ...a, target: achievementShareTarget(a.id, a, SITE_URL) }))
    .filter((a) => a.target);
  const isPublic = profile?.is_public ?? false;

  return (
    <section aria-labelledby="milestones-heading" className="flex scroll-mt-8 flex-col gap-4 border-t border-line pt-6" id="milestones">
      <div className="flex flex-col gap-1">
        <h2 id="milestones-heading" className="text-subtitle text-content">
          Milestones
        </h2>
        <p className="text-content-2">
          Share a card of a milestone, sized for WhatsApp Status or as a square. Topics, sections and roadmaps count when you
          pass their checkpoint quizzes.
        </p>
      </div>

      {milestones.length === 0 ? (
        <p className="rounded-md bg-surface-sunken p-4 text-sm text-content-2">
          No milestones yet. Pass a checkpoint quiz in a roadmap and your first one shows here.
        </p>
      ) : (
        <>
          {!isPublic && (
            <p className="rounded-md bg-surface-sunken p-4 text-sm text-content-2">
              Cards show only what your public profile shows, so they need a public profile.{" "}
              <Link href="#public-profile-heading" className="font-semibold text-content-link underline">
                Make your profile public
              </Link>{" "}
              to share them.
            </p>
          )}
          <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
            {milestones.map((m) => (
              <li key={m.id} className="flex flex-col gap-2 p-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-content">{describeAchievement(m.type, m.ref_id, m.title)}</span>
                  <time dateTime={m.created_at} className="text-sm text-content-3">
                    {formatCardDate(m.created_at)}
                  </time>
                </div>
                {isPublic && m.target && <ShareCard {...m.target} buttonLabel="Share card" />}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-h3 text-content">Milestone posts</h3>
        <MilestonePostsToggle key={String(profile?.milestone_posts)} enabled={profile?.milestone_posts ?? false} />
      </div>
    </section>
  );
}
