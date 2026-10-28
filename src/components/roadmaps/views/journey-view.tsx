import { Check, Flag } from "lucide-react";
import { Suspense, type ReactNode } from "react";
import Link from "@/components/ui/link";
import { formatEstimate } from "@/lib/roadmaps/estimates";
import { nodePath } from "@/lib/roadmaps/seo";
import type { ProgressStatus } from "@/lib/roadmaps/tree";
import type { RoadmapView, ViewNode, ViewSection } from "@/lib/roadmaps/view-model";
import { STATUS_LABELS } from "../progress";
import { liveView } from "./live";
import { choiceLabel, Minutes, NodeBadges, SectionMeta } from "./node-meta";
import type { RoadmapViewProps } from "./types";

const OPTIONAL_HIDE = "group-data-[hide-optional]/roadmap:hidden";

/**
 * The "Journey" view (the default below md): the roadmap as one vertical
 * path, one step at a time. Each section's header sticks to the top while
 * its steps scroll past, so the learner always knows where they are. Every
 * step is the same size whatever the learner's state, so nothing moves when
 * the status islands arrive: the step up next gets a ring and an "Up next"
 * label in space the card already reserves.
 *
 * A plain ordered list of links (natural tab order), not a tree: it has no
 * open and close. Choice groups are framed with "Pick one".
 */
export function JourneyView({ slug, view }: RoadmapViewProps) {
  return (
    <ol aria-label="Roadmap journey" className="mx-auto flex max-w-reading flex-col gap-6">
      {view.sections.map((section) => (
        <JourneySection key={section.node.id} slug={slug} view={view} section={section} />
      ))}
      <li className="flex items-center gap-3 pl-1">
        <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-roadmap-node-done text-roadmap-node-done-fg">
          <Flag className="size-4" />
        </span>
        <span className="font-bold text-content">End of the roadmap</span>
      </li>
    </ol>
  );
}

function JourneySection({ slug, view, section }: RoadmapViewProps & { section: ViewSection }) {
  const { node, number } = section;
  const headingId = `journey-section-${node.id}`;
  const time = formatEstimate(section.estimate);
  const steps = [node, ...section.topics, ...section.checkpoints];

  // Consecutive members of one choice group share a frame.
  const runs: { key: string | null; nodes: ViewNode[] }[] = [];
  for (const step of steps) {
    const last = runs.at(-1);
    if (step.choiceGroup && last?.key === step.choiceGroup) last.nodes.push(step);
    else runs.push({ key: step.kind === "section" ? null : step.choiceGroup, nodes: [step] });
  }

  return (
    <li className={node.optional ? OPTIONAL_HIDE : ""}>
      <section aria-labelledby={headingId}>
        <header className="sticky top-0 z-10 -mx-4 border-b border-line bg-surface/95 px-4 py-2 backdrop-blur-sm md:mx-0 md:rounded-t-lg">
          <p className="text-xs font-bold tracking-widest text-content-3 uppercase">
            Section {number} of {view.sections.length}
          </p>
          <h3 id={headingId} className="text-h3 text-content">
            {node.title}
          </h3>
          <p className="flex flex-wrap gap-x-2 text-sm text-content-2">
            <Suspense fallback={<span>{plural(section.topics.length, "topic")}</span>}>
              <LiveSectionDone view={view} section={section} />
            </Suspense>
            {time && <span>· {time}</span>}
          </p>
          <SectionMeta section={section} className="text-content-2" />
        </header>

        <ol className="relative mt-3 flex flex-col gap-2 before:absolute before:inset-y-2 before:left-[21px] before:w-[3px] before:bg-roadmap-spine">
          {runs.map((run, i) =>
            run.key && run.nodes.length > 1 ? (
              <li key={`${run.key}-${i}`} className="relative ml-11 rounded-lg border border-dashed border-roadmap-choice p-2">
                <p className="px-1 pb-1 text-xs font-bold text-content-2">Pick one</p>
                <ol className="flex flex-col gap-2">
                  {run.nodes.map((step) => (
                    <Step key={step.id} slug={slug} view={view} node={step} framed />
                  ))}
                </ol>
              </li>
            ) : (
              run.nodes.map((step) => <Step key={step.id} slug={slug} view={view} node={step} />)
            ),
          )}
        </ol>
      </section>
    </li>
  );
}

function Step({ slug, view, node, framed = false }: RoadmapViewProps & { node: ViewNode; framed?: boolean }) {
  const choice = framed ? null : choiceLabel(view, node);
  const label =
    node.kind === "section" ? "Section overview" : node.kind === "checkpoint" ? "Checkpoint" : node.place ? `Step ${node.place.n} of ${node.place.of}` : null;
  return (
    <li className={`relative ${node.optional ? OPTIONAL_HIDE : ""}`}>
      <Link
        href={nodePath(slug, node.slug)}
        data-node-id={node.id}
        className={`group/step relative flex min-h-16 items-start gap-3 rounded-lg border border-line bg-surface p-3 hover:bg-surface-sunken has-[[data-progress=done]]:border-roadmap-node-done has-[[data-progress=in_progress]]:border-roadmap-node-progress has-[[data-up-next]]:ring-2 has-[[data-up-next]]:ring-roadmap-up-next ${framed ? "" : "ml-11"} ${node.optional ? "border-dashed" : ""}`}
      >
        <Suspense fallback={<StepMarker status={null} upNext={false} framed={framed} kind={node.kind} />}>
          <LiveStepMarker view={view} node={node} framed={framed} />
        </Suspense>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          {label && <span className="text-xs text-content-3">{label}</span>}
          <span className="font-semibold text-content">{node.title}</span>
          {node.summary && <span className="line-clamp-2 text-sm text-content-2">{node.summary}</span>}
          <span className="flex min-h-6 flex-wrap items-center gap-2 pr-20 text-xs text-content-2">
            <Minutes minutes={node.minutes} />
            <NodeBadges node={node} />
            {node.optional && <Pill>Optional</Pill>}
            {choice && <Pill>{choice}</Pill>}
          </span>
        </span>
      </Link>
    </li>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-line px-2 py-0.5 font-medium">{children}</span>;
}

async function LiveStepMarker({ view, node, framed }: { view: RoadmapView; node: ViewNode; framed: boolean }) {
  const live = await liveView(view);
  return <StepMarker status={live.byId[node.id]?.status ?? null} upNext={live.upNextId === node.id} framed={framed} kind={node.kind} />;
}

/**
 * The dot on the path (outside the card, on the line) and, for the step up
 * next, an "Up next" label in the card's reserved right hand space.
 */
function StepMarker({
  status,
  upNext,
  framed,
  kind,
}: {
  status: ProgressStatus | null;
  upNext: boolean;
  framed: boolean;
  kind: ViewNode["kind"];
}) {
  const dot = framed
    ? "hidden"
    : "absolute top-1/2 -left-[2.125rem] flex size-6 -translate-y-1/2 items-center justify-center rounded-full border-[3px]";
  return (
    <span data-progress={status ?? undefined} data-up-next={upNext || undefined} className="contents">
      <span
        aria-hidden
        className={`${dot} ${
          status === "done"
            ? "border-roadmap-node-done bg-roadmap-node-done text-roadmap-node-done-fg"
            : status === "in_progress"
              ? "border-roadmap-node-progress bg-surface"
              : kind === "section"
                ? "border-roadmap-section bg-roadmap-section"
                : "border-roadmap-node-todo bg-surface"
        }`}
      >
        {status === "done" && <Check strokeWidth={3} className="size-3" />}
      </span>
      {upNext && (
        <span className="absolute right-3 bottom-3 rounded-full bg-roadmap-up-next px-2 py-0.5 text-xs font-bold text-content-inv">Up next</span>
      )}
      {status && <span className="sr-only">{upNext ? `Up next, ${STATUS_LABELS[status].toLowerCase()}` : STATUS_LABELS[status]}: </span>}
    </span>
  );
}

async function LiveSectionDone({ view, section }: { view: RoadmapView; section: ViewSection }) {
  const live = await liveView(view);
  const current = live.sections.find((s) => s.node.id === section.node.id) ?? section;
  if (!live.hasProgress) return <span>{plural(section.topics.length, "topic")}</span>;
  const { done, total, complete } = current.counts;
  return <span>{complete ? "Complete" : `${done} of ${total} required done`}</span>;
}

function plural(n: number, word: string) {
  return `${n} ${n === 1 ? word : `${word}s`}`;
}
