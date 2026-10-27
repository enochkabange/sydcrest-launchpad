import type { ReactNode } from "react";
import Link from "@/components/ui/link";
import { Initials } from "@/components/social/profile-bits";
import { buttonClasses } from "@/components/ui/button";
import { CHAPTERS, COMMUNITY_SIZE } from "@/content/marketing";
import { getMyProfile, requireUser } from "@/lib/auth";
import { latestSavedAnswers, resultFor } from "@/lib/path/server";
import { regionLabel } from "@/lib/regions";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * The dashboard's right rail (lg and up). Only data the app already has:
 * the saved path quiz result, the public leaderboard and the community facts
 * on record. Each card reads at request time, so the page renders each one
 * inside its own <Suspense>.
 */

function RailCard({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
      <h2 className="text-h3 text-content">{title}</h2>
      {children}
      {action}
    </section>
  );
}

const railLink = "inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link hover:underline";

export function RailCardSkeleton({ tall = false }: { tall?: boolean }) {
  return <div className={`${tall ? "h-72" : "h-40"} animate-skeleton rounded-lg bg-surface-sunken`} aria-hidden="true" />;
}

/** Your path and its weekly plan, from the latest saved quiz. */
export async function PathAndPlan() {
  const user = await requireUser();
  const saved = await latestSavedAnswers(user.id);
  if (!saved) {
    return (
      <RailCard
        title="Your path"
        action={
          <Link href="/start" className={buttonClasses("secondary", "self-start")}>
            Take the quiz
          </Link>
        }
      >
        <p className="text-sm text-content-2">
          Answer five quick questions to get a track, a starting point and a weekly plan. They will show here.
        </p>
      </RailCard>
    );
  }
  const { trackTitle, nextAction, plan } = await resultFor(saved);
  return (
    <>
      <RailCard
        title="Your path"
        action={
          <Link href="/path" className={railLink}>
            See your full path
          </Link>
        }
      >
        <p className="text-sm text-content-3">Recommended track</p>
        <p className="-mt-2 font-semibold text-content">{trackTitle}</p>
        <div className="flex flex-col gap-1 border-t border-line pt-3">
          <p className="text-sm text-content-3">Next step</p>
          {nextAction.href ? (
            <Link href={nextAction.href} className="font-semibold">
              {nextAction.label}
            </Link>
          ) : (
            <p className="font-semibold text-content">{nextAction.label}</p>
          )}
        </div>
      </RailCard>
      <RailCard title="Your weekly plan">
        <p className="text-sm text-content-2">{plan.summary}</p>
        <ol className="flex flex-col divide-y divide-line">
          {plan.sessions.map((s) => (
            <li key={s.title} className="flex items-baseline justify-between gap-3 py-2 text-sm">
              <span className="text-content">{s.title}</span>
              <span className="shrink-0 text-content-3">{s.minutes} min</span>
            </li>
          ))}
        </ol>
      </RailCard>
    </>
  );
}

/** Top five on the topics passed board; the same public data /leaderboards shows. */
export async function LeaderboardSnapshot() {
  const supabase = await createPublicClient();
  const { data } = await supabase
    .from("public_profile_stats")
    .select("id, public_slug, display_name, nodes_completed")
    .gt("nodes_completed", 0)
    .order("nodes_completed", { ascending: false })
    .order("display_name", { ascending: true })
    .limit(5);
  const rows = data ?? [];
  return (
    <RailCard
      title="Leaderboard"
      action={
        <Link href="/leaderboards" className={railLink}>
          See all leaderboards
        </Link>
      }
    >
      {rows.length === 0 ? (
        <p className="text-sm text-content-2">
          Nobody is on the board yet. Pass a checkpoint quiz and make your profile public to be the first.
        </p>
      ) : (
        <ol className="flex flex-col">
          {rows.map((r, i) => {
            const name = r.display_name ?? "Launchpad learner";
            return (
              <li key={r.id}>
                <Link
                  href={`/u/${r.public_slug}`}
                  className="flex min-h-11 items-center gap-3 rounded-md text-content no-underline hover:bg-surface-sunken"
                >
                  <span className="w-5 shrink-0 text-right text-sm font-semibold text-content-3">{i + 1}</span>
                  <Initials name={name} />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{name}</span>
                  <span className="shrink-0 text-sm text-content-2">{r.nodes_completed} topics</span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </RailCard>
  );
}

/** The learner's regional chapter (if it is one of the five) and the WhatsApp community, as on record. */
export async function CommunityCard() {
  const profile = await getMyProfile();
  const region = regionLabel(profile.region);
  const index = CHAPTERS.findIndex((c) => c.region === region);
  const chapter = index >= 0 ? CHAPTERS[index] : null;
  return (
    <RailCard
      title="Community"
      action={
        <Link href="/profile" className={railLink}>
          WhatsApp updates on your profile
        </Link>
      }
    >
      <p className="text-sm text-content-2">
        {chapter
          ? `Your local chapter is ${chapter.city}. ${index === 0 ? "It is being set up now." : "It is planned, after Tamale."}`
          : "Chapters start in the five northern regional capitals, beginning with Tamale."}
      </p>
      <p className="text-sm text-content-2">Our WhatsApp community has {COMMUNITY_SIZE} members learning together.</p>
    </RailCard>
  );
}
