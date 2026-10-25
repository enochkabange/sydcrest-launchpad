import { Circle, CircleCheck, CircleDot } from "lucide-react";
import Link from "@/components/ui/link";
import { getMyProgress } from "@/lib/roadmaps/progress";
import { progressSummary, type FlatNode, type ProgressStatus } from "@/lib/roadmaps/tree";

/*
 * Request time islands on otherwise cached pages. Each reads the learner's
 * progress (cookies), so render them inside <Suspense fallback={null}>: the
 * page shell stays prerendered and the marks stream in for signed in users.
 */

const LABELS: Record<ProgressStatus, string> = {
  done: "Done",
  in_progress: "In progress",
  not_started: "Not started",
};

function StatusIcon({ status }: { status: ProgressStatus }) {
  if (status === "done") return <CircleCheck aria-hidden className="size-5 text-success-fg" />;
  if (status === "in_progress") return <CircleDot aria-hidden className="size-5 text-info-fg" />;
  return <Circle aria-hidden className="size-5 text-content-3" />;
}

/** A small mark beside a node in the outline. Nothing for visitors. */
export async function NodeMark({ nodeId }: { nodeId: string }) {
  const progress = await getMyProgress();
  if (!progress) return null;
  const status = progress.get(nodeId) ?? "not_started";
  return (
    <span className="inline-flex shrink-0" title={LABELS[status]} data-progress={status}>
      <StatusIcon status={status} />
      <span className="sr-only">{LABELS[status]}</span>
    </span>
  );
}

/** "3 of 12 topics done" for learners; a sign in prompt for visitors. */
export async function RoadmapProgress({ nodes }: { nodes: FlatNode[] }) {
  const progress = await getMyProgress();
  if (!progress) {
    return (
      <p className="text-sm text-content-2">
        <Link href="/login" className="font-semibold text-content-link underline">
          Sign in
        </Link>{" "}
        to save your progress as you learn.
      </p>
    );
  }
  const { done, total, started } = progressSummary(nodes, progress);
  return (
    <p className="text-sm text-content-2" data-testid="roadmap-progress">
      {started ? `${done} of ${total} topics done.` : `You have not started yet. ${total} topics to go.`}
    </p>
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
      {LABELS[status]}
    </span>
  );
}
