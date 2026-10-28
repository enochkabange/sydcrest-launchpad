import { Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { getMySaveMap, getPathTracks, getViewer } from "@/lib/opportunities/learner";
import { suggestFor, trackLabel } from "@/lib/opportunities/model";
import { getAccraToday, getOpenOpportunities } from "@/lib/opportunities/public";
import { AutoGrid } from "@/components/ui/layout";
import { OpportunityCard } from "./opportunity-card";
import { opportunitiesPath } from "./paths";

/**
 * "Suggested for you": open opportunities tagged with the learner's path
 * track (simple match; verified skills join in #158). A request time island:
 * render it inside <Suspense>. Signed out visitors and learners with no
 * matches see nothing here, so the board stays about the board; learners
 * without a path get one prompt to take the quiz.
 *
 * `variant="rail"` is a compact list for a side rail.
 */
export async function SuggestedForYou({ variant = "section" }: { variant?: "section" | "rail" }) {
  const viewer = await getViewer();
  if (!viewer) return null;
  const tracks = await getPathTracks(viewer.id);

  if (!tracks) {
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
  const picks = suggestFor(all, tracks, { today, exclude: saves.keys(), limit: variant === "rail" ? 3 : 4 });
  if (!picks.length) {
    if (variant === "section") return null;
    return (
      <section aria-labelledby="suggested-heading" className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 id="suggested-heading" className="text-h3 text-content">
          Suggested for you
        </h2>
        <p className="text-sm text-content-2">
          Nothing open matches your {trackLabel(tracks[0]) ?? "track"} path right now. New posts that fit will show here.
        </p>
        <Link href={opportunitiesPath} className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline">
          Browse every opportunity
        </Link>
      </section>
    );
  }

  const why = `Matched to your ${trackLabel(tracks[0]) ?? "path"} path.`;
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
          {picks.map((o) => (
            <li key={o.id}>
              <OpportunityCard o={o} today={today} headingLevel="h3" />
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
        {picks.map((o) => (
          <li key={o.id}>
            <OpportunityCard o={o} today={today} headingLevel="h3" />
          </li>
        ))}
      </AutoGrid>
    </section>
  );
}
