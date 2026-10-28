import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { Suspense } from "react";
import { getMyProfile, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { nextUnfinished, requiredProgress } from "@/components/learn/next-node";
import { buttonClasses } from "@/components/ui/button";
import { ReportOutcomeCard } from "@/components/outcomes/report-outcome-card";
import { AutoGrid, MainWithRail } from "@/components/ui/layout";
import { getPublishedRoadmaps } from "@/lib/roadmaps/public";
import { roadmapPath } from "@/lib/roadmaps/seo";
import { Alert } from "@/components/ui/alert";
import { PASSWORD_CHANGED_NOTICE } from "@/lib/password-reset";
import { ThisWeek, ThisWeekSkeleton } from "@/components/learning-loop/this-week";
import {
  CommunityCard,
  LeaderboardSnapshot,
  PathAndPlan,
  RailCardSkeleton,
} from "./rail";

export const metadata: Metadata = { title: "Home" };

const NOTICES: Record<string, string> = {
  [PASSWORD_CHANGED_NOTICE]: "Your new password is saved. Use it the next time you sign in.",
};

/** A one off confirmation from the page that sent the learner here (`?notice=`). */
async function Notice({ searchParams }: { searchParams: PageProps<"/dashboard">["searchParams"] }) {
  const { notice } = await searchParams;
  const message = typeof notice === "string" ? NOTICES[notice] : undefined;
  return message ? <Alert tone="success">{message}</Alert> : null;
}

async function Greeting() {
  const profile = await getMyProfile();
  const firstName = profile.display_name?.split(" ")[0];
  return (
    <>
      <h1 className="text-title text-content">{firstName ? `Welcome, ${firstName}` : "Welcome"}</h1>
      {!profile.region && (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-line p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="max-w-reading text-content-2">
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
      <section className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex max-w-reading flex-col gap-3">
          <h2 className="text-h3 text-content">Start a roadmap</h2>
          <p className="text-content-2">
            Pick a free roadmap written for the Ghanaian job market. Your progress and your next topic will show up here.
          </p>
        </div>
        <Link href="/roadmaps" className={buttonClasses("primary", "shrink-0")}>
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
      <h2 className="text-subtitle text-content">Your roadmaps</h2>
      {/* One column on phones; two side by side from lg, a lone roadmap spans both. */}
      <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
        {cards.map(({ roadmap, next, done, total, complete }) => (
          <li
            key={roadmap.id}
            className="flex flex-col gap-3 rounded-lg border border-line p-5 lg:only:col-span-2 xl:p-6"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-h3 font-semibold text-content">{roadmap.title}</h3>
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
      <Link href="/roadmaps" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link hover:underline">
        Browse more roadmaps
      </Link>
    </section>
  );
}

/**
 * Published roadmaps the learner has not started, as a grid beside their own.
 * Desktop only: on phones "Browse more roadmaps" and the Roadmaps tab do this.
 */
async function Explore() {
  const user = await requireUser();
  const supabase = await createClient();
  const [roadmaps, { data: progress }] = await Promise.all([
    getPublishedRoadmaps(),
    supabase
      .from("roadmap_progress")
      .select("roadmap_nodes(roadmap_id)")
      .eq("profile_id", user.id)
      .neq("status", "not_started"),
  ]);
  const started = new Set((progress ?? []).flatMap((p) => (p.roadmap_nodes ? [p.roadmap_nodes.roadmap_id] : [])));
  const others = roadmaps.filter((r) => !started.has(r.id)).slice(0, 6);
  if (!others.length) return null;
  return (
    <section aria-labelledby="explore-heading" className="hidden flex-col gap-3 lg:flex">
      <h2 id="explore-heading" className="text-subtitle text-content">
        Explore roadmaps
      </h2>
      <AutoGrid as="ul" min="sm">
        {others.map((r) => (
          <li key={r.id}>
            <Link
              href={roadmapPath(r.slug)}
              className="flex h-full flex-col gap-1 rounded-lg border border-line p-4 no-underline transition-colors hover:border-line-strong hover:bg-surface-sunken"
            >
              <span className="font-semibold text-content">{r.title}</span>
              <span className="text-sm text-content-3">
                {r.node_count} {r.node_count === 1 ? "topic" : "topics"}
              </span>
            </Link>
          </li>
        ))}
      </AutoGrid>
    </section>
  );
}

/**
 * Main column: greeting, this week's goal, streak and review (issue #232),
 * the roadmaps in progress and others to explore.
 * Right rail from lg: path and weekly plan, a leaderboard snapshot and the
 * community. Phones keep the greeting and roadmaps; the tab bar reaches the rest.
 * Every block reads the session, so each is its own Suspense island.
 */
export default function DashboardPage({ searchParams }: PageProps<"/dashboard">) {
  return (
    <MainWithRail
      railLabel="Your path and community"
      railFrom="lg"
      rail={
        <>
          <Suspense fallback={<RailCardSkeleton tall />}>
            <PathAndPlan />
          </Suspense>
          <Suspense fallback={<RailCardSkeleton />}>
            <LeaderboardSnapshot />
          </Suspense>
          <Suspense fallback={<RailCardSkeleton />}>
            <CommunityCard />
          </Suspense>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <Suspense fallback={null}>
          <Notice searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<div className="h-9 w-48 animate-skeleton rounded-md bg-surface-sunken" />}>
          <Greeting />
        </Suspense>
        <Suspense fallback={<ThisWeekSkeleton />}>
          <ThisWeek />
        </Suspense>
        <Suspense fallback={<div className="h-32 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <Learning />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Explore />
      </Suspense>
      <ReportOutcomeCard />
    </MainWithRail>
  );
}
