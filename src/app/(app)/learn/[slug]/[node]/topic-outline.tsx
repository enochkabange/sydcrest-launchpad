import Link from "@/components/ui/link";
import { NodeMark } from "@/components/roadmaps/progress";
import { buildNodeTree, flattenTree, progressSummary, type FlatNode, type ProgressStatus } from "@/lib/roadmaps/tree";

/**
 * The roadmap's topics beside the lesson on wide screens: how far along the
 * learner is, and every topic in reading order with the current one marked.
 * Uses only what the study page already loads; phones reach the same outline
 * through the roadmap link at the top of the lesson.
 */
export function TopicOutline({
  roadmap,
  nodes,
  currentId,
  progress,
}: {
  roadmap: { slug: string; title: string };
  nodes: FlatNode[];
  currentId: string;
  progress: ReadonlyMap<string, ProgressStatus>;
}) {
  const flat = flattenTree(buildNodeTree(nodes));
  const { done, total } = progressSummary(nodes, progress);
  const complete = total > 0 && done === total;

  return (
    <nav aria-label={`Topics in ${roadmap.title}`} className="flex flex-col gap-4 rounded-lg border border-line p-4">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-content">{roadmap.title}</p>
        <p className="text-sm text-content-2">
          {done} of {total} required topics done
        </p>
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
      </div>
      <ol className="-mx-2 flex max-h-[calc(100dvh-16rem)] flex-col overflow-y-auto border-t border-line pt-2">
        {flat.map((n) => {
          const current = n.id === currentId;
          return (
            <li key={n.id}>
              <Link
                href={`/learn/${roadmap.slug}/${n.slug}`}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-11 items-center gap-2 rounded-md py-1.5 pr-2 text-sm transition-colors ${
                  current ? "bg-info-bg font-semibold text-info-fg" : "text-content hover:bg-surface-sunken"
                }`}
                style={{ paddingLeft: `${0.5 + n.depth * 0.75}rem` }}
              >
                <span className="w-8 shrink-0 text-content-3 tabular-nums">{n.number}</span>
                <span className="flex-1">{n.title}</span>
                <NodeMark nodeId={n.id} />
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
