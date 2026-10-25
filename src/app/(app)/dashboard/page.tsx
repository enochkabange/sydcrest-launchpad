import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { Suspense } from "react";
import { getMyProfile, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { nextUnfinished, requiredProgress } from "@/components/learn/next-node";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = { title: "Home" };

async function Greeting() {
  const profile = await getMyProfile();
  const firstName = profile.display_name?.split(" ")[0];
  return (
    <>
      <h1 className="text-3xl text-content">{firstName ? `Welcome, ${firstName}` : "Welcome"}</h1>
      {!profile.region && (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-line p-5">
          <p className="text-content-2">
            Add your region so we can connect you with your local chapter and events near you.
          </p>
          <Link href="/profile" className={buttonClasses("secondary")}>
            Add your region
          </Link>
        </div>
      )}
    </>
  );
}

/**
 * Roadmaps the learner has started, with how far along they are and the next
 * topic to open. Anyone who has not started one sees an honest empty state.
 */
async function Learning() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: progress } = await supabase
    .from("roadmap_progress")
    .select("node_id, status, updated_at, roadmap_nodes(roadmap_id)")
    .eq("profile_id", user.id)
    .neq("status", "not_started")
    .order("updated_at", { ascending: false });

  // Most recently touched roadmap first.
  const roadmapIds = [...new Set((progress ?? []).flatMap((p) => (p.roadmap_nodes ? [p.roadmap_nodes.roadmap_id] : [])))];

  if (!roadmapIds.length) {
    return (
      <section className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 className="text-lg text-content">Start a roadmap</h2>
        <p className="text-content-2">
          Pick a free roadmap written for the Ghanaian job market. Your progress and your next topic will show up here.
        </p>
        <Link href="/roadmaps" className={buttonClasses("primary")}>
          Browse roadmaps
        </Link>
      </section>
    );
  }

  const [{ data: roadmaps }, { data: nodes }] = await Promise.all([
    supabase.from("roadmaps").select("id, slug, title").in("id", roadmapIds),
    supabase.from("roadmap_nodes").select("id, roadmap_id, slug, title, position, is_optional").in("roadmap_id", roadmapIds),
  ]);
  const doneIds = new Set((progress ?? []).filter((p) => p.status === "done").map((p) => p.node_id));

  const cards = roadmapIds.flatMap((id) => {
    const roadmap = roadmaps?.find((r) => r.id === id);
    if (!roadmap) return [];
    const roadmapNodes = (nodes ?? []).filter((n) => n.roadmap_id === id);
    return [{ roadmap, next: nextUnfinished(roadmapNodes, doneIds), ...requiredProgress(roadmapNodes, doneIds) }];
  });

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl text-content">Your roadmaps</h2>
      <ul className="flex flex-col gap-3">
        {cards.map(({ roadmap, next, done, total, complete }) => (
          <li key={roadmap.id} className="flex flex-col gap-3 rounded-lg border border-line p-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-content">{roadmap.title}</h3>
              <p className="text-sm text-content-2">
                {complete ? "Roadmap complete. " : ""}
                {done} of {total} required topics done
              </p>
            </div>
            <div
              role="progressbar"
              aria-label={`${roadmap.title} progress`}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={done}
              className="h-2 overflow-hidden rounded-full"
              style={{ background: "var(--progress-track)" }}
            >
              <div
                className="h-full origin-left rounded-full"
                style={{
                  background: complete ? "var(--progress-complete)" : "var(--progress-active)",
                  transform: `scaleX(${total ? done / total : 0})`,
                }}
              />
            </div>
            {next && (
              <Link href={`/learn/${roadmap.slug}/${next.slug}`} className={buttonClasses("primary", "self-start")}>
                Next: {next.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <Link href="/roadmaps" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link">
        Browse more roadmaps
      </Link>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<div className="h-9 w-48 animate-skeleton rounded-md bg-surface-sunken" />}>
        <Greeting />
      </Suspense>
      <Suspense fallback={<div className="h-32 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Learning />
      </Suspense>
    </div>
  );
}
