import { Circle, CircleCheck, CircleDot } from "lucide-react";
import Link from "@/components/ui/link";
import { getMyProgress } from "@/lib/roadmaps/progress";
import type { ProgressStatus } from "@/lib/roadmaps/tree";
import type { RoadmapView } from "@/lib/roadmaps/view-model";
import { liveView } from "./views/live";

/*
 * Request time islands on otherwise cached pages. Each reads the learner's
 * progress (cookies), so render them inside <Suspense fallback={null}>: the
 * page shell stays prerendered and the marks stream in for signed in users.
 */

export const STATUS_LABELS: Record<ProgressStatus, string> = {
  done: "Done",
  in_progress: "In progress",
  not_started: "Not started",
};

function StatusIcon({ status }: { status: ProgressStatus }) {
  if (status === "done") return <CircleCheck aria-hidden className="size-5 text-success-fg" />;
  if (status === "in_progress") return <CircleDot aria-hidden className="size-5 text-info-fg" />;
  return <Circle aria-hidden className="size-5 text-content-3" />;
}

/** The mark beside a node in the outline. */
export function ProgressMark({ status }: { status: ProgressStatus }) {
  return (
    <span className="inline-flex shrink-0" title={STATUS_LABELS[status]} data-progress={status}>
      <StatusIcon status={status} />
      <span className="sr-only">{STATUS_LABELS[status]}</span>
    </span>
  );
}

/** A small mark beside a node in the outline. Nothing for visitors. */
export async function NodeMark({ nodeId }: { nodeId: string }) {
  const progress = await getMyProgress();
  if (!progress) return null;
  return <ProgressMark status={progress.get(nodeId) ?? "not_started"} />;
}

/** The outline mark for one node of a roadmap view, with "Up next" on the learner's next step. Nothing for visitors. */
export async function ViewNodeMark({ view, nodeId }: { view: RoadmapView; nodeId: string }) {
  const live = await liveView(view);
  const status = live.byId[nodeId]?.status;
  if (!status) return null;
  if (live.upNextId !== nodeId) return <ProgressMark status={status} />;
  return (
    <span data-up-next className="inline-flex shrink-0 items-center gap-1.5">
      <span className="rounded-full bg-roadmap-up-next px-2 py-0.5 text-xs font-bold text-content-inv">Up next</span>
      <ProgressMark status={status} />
    </span>
  );
}

/** "3 of 12 required topics done" and a progress bar for learners; a sign in prompt for visitors. */
export async function RoadmapProgress({ view }: { view: RoadmapView }) {
  const live = await liveView(view);
  if (!live.hasProgress) {
    return (
      <p className="text-sm text-content-2">
        <Link href="/login" className="font-semibold text-content-link underline">
          Sign in
        </Link>{" "}
        to save your progress as you learn.
      </p>
    );
  }
  const { done, total, started, percent } = live.counts;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <p className="font-semibold text-content" data-testid="roadmap-progress">
          {started ? `${done} of ${total} required topics done.` : `You have not started yet. ${total} required topics to go.`}
        </p>
        <span className="text-content-2 tabular-nums">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Roadmap progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-2 overflow-hidden rounded-sm bg-roadmap-track"
      >
        <div className="h-full bg-roadmap-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

/** The learner's status on a node page. Nothing for visitors. */
export async function NodeStatus({ nodeId }: { nodeId: string }) {
  const progress = await getMyProgress();
  if (!progress) return null;
  const status = progress.get(nodeId) ?? "not_started";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-sm text-content-2">
      <StatusIcon status={status} />
      {STATUS_LABELS[status]}
    </span>
  );
}
