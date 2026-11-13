import { Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { getLearnerContext, getSkillCatalogue } from "@/lib/matching/learner";
import { rankForLearner } from "@/lib/matching/match";
import { getMySaveMap, getPathTracks, getViewer } from "@/lib/opportunities/learner";
import { isOpenOn, suggestFor, trackLabel } from "@/lib/opportunities/model";
import { getAccraToday, getOpenOpportunities } from "@/lib/opportunities/public";
import { AutoGrid } from "@/components/ui/layout";
import { OpportunityCard } from "./opportunity-card";
import { opportunitiesPath } from "./paths";
import { WhyThisFits } from "./why-fits";

/**
 * "Suggested for you": open opportunities tagged with the learner's path
 * track or a track they have readiness for, or needing a skill they have
 * verified, ranked by match score (#336: readiness for the track plus a
 * bonus per required skill verified), each with why it fits. Ranking only
 * orders suggestions; the board below still lists everything. A request time island:
 * render it inside <Suspense>. Signed out visitors and learners with no
 * matches see nothing here, so the board stays about the board; learners
 * without a path get one prompt to take the quiz.
 *
 * `variant="rail"` is a compact list for a side rail.
 */
export async function SuggestedForYou({ variant = "section" }: { variant?: "section" | "rail" }) {
  const viewer = await getViewer();
  if (!viewer) return null;
  const [pathTracks, ctx, catalogue] = await Promise.all([getPathTracks(viewer.id), getLearnerContext(), getSkillCatalogue()]);
  // ctx is null only when signed out, which returned above.
  const learner = ctx ?? { readiness: [], verifiedSkillIds: new Set<string>() };
  const tracks = [
    ...new Set([...(pathTracks ?? []), ...learner.readiness.flatMap((r) => (r.track ? [r.track] : []))]),
  ];

  if (!pathTracks && !tracks.length && !learner.verifiedSkillIds.size) {
    return (
      <section aria-labelledby="suggested-heading" className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-1">
          <h2 id="suggested-heading" className="text-h3 text-content">
            Suggested for you
          </h2>
          <p className="max-w-reading text-content-2">Take the path quiz and opportunities that fit your track will show here.</p>
        </div>
        <Link href="/start" className={buttonClasses("secondary", "shrink-0")}>
          Take the quiz
        </Link>
      </section>
    );
  }

  const [all, saves, today] = await Promise.all([getOpenOpportunities(), getMySaveMap(), getAccraToday()]);
  const open = all.filter((o) => isOpenOn(o, today) && !saves.has(o.id));
  // Track order first (path track, then starter, then readiness tracks), so ties keep it.
  const onTrack = suggestFor(open, tracks, { today, limit: open.length });
  const onTrackIds = new Set(onTrack.map((o) => o.id));
  const picks = rankForLearner([...onTrack, ...open.filter((o) => !onTrackIds.has(o.id))], learner, catalogue)
    .filter(({ o, match }) => onTrackIds.has(o.id) || match.score !== null)
    .slice(0, variant === "rail" ? 3 : 4);
  if (!picks.length) {
    if (variant === "section") return null;
    return (
      <section aria-labelledby="suggested-heading" className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 id="suggested-heading" className="text-h3 text-content">
          Suggested for you
        </h2>
        <p className="text-sm text-content-2">
          Nothing open matches your {trackLabel(tracks[0] ?? "") ?? "track"} path right now. New posts that fit will show here.
        </p>
        <Link href={opportunitiesPath} className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline">
          Browse every opportunity
        </Link>
      </section>
    );
  }

  const why = learner.readiness.length || learner.verifiedSkillIds.size
    ? "Best fit first, from your verified skills and your progress on each track."
    : `Matched to your ${trackLabel(tracks[0] ?? "") ?? "path"} path.`;
  if (variant === "rail") {
    return (
      <section aria-labelledby="suggested-heading" className="flex flex-col gap-3">
        <div>
          <h2 id="suggested-heading" className="text-h3 text-content">
            Suggested for you
          </h2>
          <p className="text-sm text-content-2">{why}</p>
        </div>
        <ul className="flex flex-col gap-3">
          {picks.map(({ o, match }) => (
            <li key={o.id}>
              <OpportunityCard o={o} today={today} headingLevel="h3" fit={<WhyThisFits match={match} compact />} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section aria-labelledby="suggested-heading" className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <Sparkles aria-hidden className="mt-1 size-5 shrink-0 text-content-accent" />
        <div>
          <h2 id="suggested-heading" className="text-subtitle text-content">
            Suggested for you
          </h2>
          <p className="text-content-2">{why}</p>
        </div>
      </div>
      <AutoGrid as="ul">
        {picks.map(({ o, match }) => (
          <li key={o.id}>
            <OpportunityCard o={o} today={today} headingLevel="h3" fit={<WhyThisFits match={match} compact />} />
          </li>
        ))}
      </AutoGrid>
    </section>
  );
}
