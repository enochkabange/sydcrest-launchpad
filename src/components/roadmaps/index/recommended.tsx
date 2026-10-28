import { ArrowRight, Compass } from "lucide-react";
import { Suspense } from "react";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { getCurrentUser } from "@/lib/auth";
import { readAnswersCookie } from "@/lib/path/cookie";
import { chooseTrack, starterFor } from "@/lib/path/recommend";
import { latestSavedAnswers } from "@/lib/path/server";
import type { RoadmapSummary } from "@/lib/roadmaps/public";
import { roadmapPath } from "@/lib/roadmaps/seo";

/**
 * "Recommended for you" from the path quiz (issue #244): the learner's saved
 * answers, or the signed cookie a visitor's answers wait in. A request time
 * island; its fallback is the honest "take the quiz" prompt in the same box,
 * which is also what anyone without answers sees, so nothing shifts.
 */
const BOX = "flex min-h-32 flex-col gap-3 rounded-lg border border-line bg-surface p-5 md:flex-row md:items-center md:gap-6 xl:p-6";

export function Recommended({ roadmaps }: { roadmaps: RoadmapSummary[] }) {
  return (
    <Suspense fallback={<TakeTheQuiz />}>
      <LiveRecommended roadmaps={roadmaps} />
    </Suspense>
  );
}

function TakeTheQuiz() {
  return (
    <section aria-labelledby="recommended-heading" className={BOX}>
      <Compass aria-hidden className="size-8 shrink-0 text-content-accent" />
      <div className="flex-1">
        <h2 id="recommended-heading" className="text-h3 text-content">
          Not sure where to start?
        </h2>
        <p className="mt-1 text-content-2">Answer a few questions about your goals, time and device and we will suggest a roadmap.</p>
      </div>
      <Link href="/start" className={buttonClasses("secondary", "shrink-0")}>
        Find my path
      </Link>
    </section>
  );
}

async function LiveRecommended({ roadmaps }: { roadmaps: RoadmapSummary[] }) {
  const user = await getCurrentUser();
  const answers = (user ? await latestSavedAnswers(user.id) : null) ?? (await readAnswersCookie());
  if (!answers) return <TakeTheQuiz />;
  const choice = chooseTrack(answers);
  const pick = roadmaps.find((r) => r.track === choice.track);
  if (!pick) return <TakeTheQuiz />;
  const starter = starterFor(answers, choice.track);
  const alongside = starter ? roadmaps.find((r) => r.track === starter.track) : null;

  return (
    <section aria-labelledby="recommended-heading" className={BOX} data-testid="recommended">
      <Compass aria-hidden className="size-8 shrink-0 text-content-accent" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-content-3" id="recommended-heading">
          Recommended for you
        </p>
        <p className="mt-1 text-h3 text-content">{pick.title}</p>
        <p className="mt-1 text-content-2">
          {choice.reasons[0]}
          {alongside && (
            <>
              {" "}
              Start alongside{" "}
              <Link href={roadmapPath(alongside.slug)} className="font-semibold text-content-link underline">
                {alongside.title}
              </Link>
              .
            </>
          )}
        </p>
      </div>
      <Link href={roadmapPath(pick.slug)} className={buttonClasses("primary", "shrink-0")}>
        Open the roadmap
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </section>
  );
}
