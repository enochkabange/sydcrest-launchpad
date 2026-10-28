import { Suspense } from "react";
import { getMyProgress } from "@/lib/roadmaps/progress";

/**
 * A signed in learner's progress on a roadmap card (issue #244). Request time
 * island in a slot that reserves its height, so cards never grow when it
 * arrives. One progress query for the whole page (getMyProgress is memoised
 * per request). Nothing for visitors or untouched roadmaps.
 */
export function CardProgress({ requiredIds, title }: { requiredIds: string[]; title: string }) {
  return (
    <div className="min-h-7">
      <Suspense fallback={null}>
        <LiveCardProgress requiredIds={requiredIds} title={title} />
      </Suspense>
    </div>
  );
}

async function LiveCardProgress({ requiredIds, title }: { requiredIds: string[]; title: string }) {
  const progress = await getMyProgress();
  if (!progress) return null;
  const total = requiredIds.length;
  const done = requiredIds.filter((id) => progress.get(id) === "done").length;
  const started = requiredIds.some((id) => progress.has(id) && progress.get(id) !== "not_started");
  if (!started || total === 0) return null;
  const percent = Math.round((done / total) * 100);
  return (
    <div className="flex items-center gap-3 text-sm" data-testid="card-progress">
      <div
        role="progressbar"
        aria-label={`${title} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-1.5 flex-1 overflow-hidden rounded-sm bg-roadmap-track"
      >
        <div className="h-full bg-roadmap-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="shrink-0 text-content-2 tabular-nums">
        {done === total ? "Complete" : `${done} of ${total} done`}
      </span>
    </div>
  );
}
