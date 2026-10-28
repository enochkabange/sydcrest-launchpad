import { Check, Flag } from "lucide-react";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { formatEstimate } from "@/lib/roadmaps/estimates";
import { nodePath } from "@/lib/roadmaps/seo";
import type { ProgressStatus } from "@/lib/roadmaps/tree";
import type { RoadmapView, ViewNode, ViewSection } from "@/lib/roadmaps/view-model";
import { STATUS_LABELS, ViewNodeMark } from "../progress";
import { liveView } from "./live";
import { MapCanvas } from "./map-canvas";
import { choiceLabel, NodeBadges, SectionMeta } from "./node-meta";
import { RoadmapTree, SectionToggle, SectionTreeItem, TreeGroup } from "./tree";
import type { RoadmapViewProps } from "./types";

/**
 * The "Map" view (the default from md). One DOM for every width:
 * - below md, a transit line: a spine down the left, a numbered stop per
 *   section and a dot per topic;
 * - from md, a spine down the middle, each section a block on it and its
 *   topics branching left and right, inside a pan and zoom canvas with a
 *   minimap (MapCanvas).
 *
 * It is a WAI-ARIA tree (tree.tsx): sections are items that open and close,
 * topics and checkpoints are items inside them, every item a real link.
 *
 * Learner state streams in as small islands (a status marker per topic and a
 * count per section). A topic recolours itself from its marker with
 * `has-[[data-progress=...]]` and `has-[[data-up-next]]`, so the prerendered
 * link never waits for the learner and visitors download no duplicate markup.
 */
export function MapView({ slug, view }: RoadmapViewProps) {
  const firstId = view.sections[0]?.node.id;
  return (
    <div>
      <Legend view={view} />
      <div className="mt-4 md:mt-3">
        <MapCanvas>
          <RoadmapTree
            label="Roadmap map"
            className="relative before:absolute before:inset-y-0 before:left-[16.5px] before:w-[3px] before:bg-roadmap-spine md:before:left-1/2 md:before:-translate-x-1/2"
          >
            {view.sections.map((section) => (
              <MapSection key={section.node.id} slug={slug} view={view} section={section} first={section.node.id === firstId} />
            ))}
          </RoadmapTree>
          <p className="relative z-10 flex pt-6 md:justify-center md:pt-7">
            <span className="rounded-lg bg-roadmap-node-done px-5 py-3 font-bold text-roadmap-node-done-fg">End of the roadmap</span>
          </p>
        </MapCanvas>
      </div>
    </div>
  );
}

function Legend({ view }: { view: RoadmapView }) {
  const nodes = Object.values(view.byId);
  const swatch = "h-3.5 w-5.5 shrink-0 rounded-sm";
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-line px-4 py-3 text-sm text-content-2">
      <span className="sr-only">Key:</span>
      <LegendItem swatch={<span className={`${swatch} bg-roadmap-section`} />}>Section</LegendItem>
      <LegendItem swatch={<span className={`${swatch} border border-roadmap-node-border bg-roadmap-node`} />}>Topic</LegendItem>
      {nodes.some((n) => n.optional) && (
        <LegendItem swatch={<span className={`${swatch} border border-dashed border-roadmap-node-optional-border`} />}>Optional</LegendItem>
      )}
      <LegendItem swatch={<span className={`${swatch} bg-roadmap-node-done`} />}>Done</LegendItem>
      <LegendItem swatch={<span className={`${swatch} border-2 border-roadmap-node-progress bg-roadmap-node`} />}>In progress</LegendItem>
      <LegendItem swatch={<span className={`${swatch} border border-roadmap-node-border bg-roadmap-node ring-2 ring-roadmap-up-next`} />}>Up next</LegendItem>
      {nodes.some((n) => n.kind === "checkpoint") && (
        <LegendItem swatch={<span className={`${swatch} rounded-full border border-dashed border-roadmap-checkpoint`} />}>Checkpoint</LegendItem>
      )}
      <span className="w-full text-content-3 sm:ml-auto sm:w-auto">Select any topic to see what it covers.</span>
    </div>
  );
}

function LegendItem({ swatch, children }: { swatch: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="inline-flex">
        {swatch}
      </span>
      {children}
    </span>
  );
}

const OPTIONAL_HIDE = "group-data-[hide-optional]/roadmap:hidden";

function MapSection({ slug, view, section, first }: RoadmapViewProps & { section: ViewSection; first: boolean }) {
  const { node, number, topics, checkpoints } = section;
  const groupId = `map-group-${node.id}`;
  const hasGroup = topics.length + checkpoints.length > 0;
  const time = formatEstimate(section.estimate);
  return (
    <li role="none" className={`relative md:pt-7 ${node.optional ? OPTIONAL_HIDE : ""}`}>
      <div data-minimap="section" className="relative z-10 flex items-start gap-1 md:mx-auto md:w-[26rem] md:max-w-full md:flex-col md:items-stretch">
        <SectionTreeItem
          id={node.id}
          href={nodePath(slug, node.slug)}
          groupId={hasGroup ? groupId : undefined}
          label={node.title}
          first={first}
          className="group/section relative flex min-h-11 min-w-0 flex-1 items-start gap-3.5 rounded-md py-3 text-content max-md:hover:bg-surface-sunken md:w-full md:flex-col md:items-center md:gap-1 md:rounded-lg md:border-2 md:border-roadmap-section md:bg-roadmap-section md:px-6 md:py-4 md:text-center md:text-roadmap-section-fg md:hover:shadow-md md:has-[[data-complete]]:border-roadmap-section-done-border md:has-[[data-complete]]:bg-roadmap-section-done md:has-[[data-complete]]:text-roadmap-section-done-fg"
        >
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-md border-2 border-roadmap-section bg-roadmap-section font-extrabold text-roadmap-section-fg group-has-[[data-complete]]/section:border-roadmap-section-done-border group-has-[[data-complete]]/section:bg-roadmap-section-done group-has-[[data-complete]]/section:text-roadmap-section-done-fg md:hidden"
          >
            {number}
          </span>
          <span className="flex min-w-0 flex-col md:items-center md:gap-1" data-node-id={node.id}>
            <span className="sr-only text-xs font-bold tracking-widest text-roadmap-section-muted uppercase md:not-sr-only md:group-has-[[data-complete]]/section:text-roadmap-section-done-muted">
              Section {number}
            </span>
            <span className="text-base leading-snug font-bold md:text-xl">
              {node.title}
              {node.optional && <span className="ml-2 align-middle text-xs font-semibold">Optional</span>}
            </span>
            <SectionMeta section={section} className="text-content-2 md:text-roadmap-section-muted" />
            <span className="flex flex-wrap gap-x-2 md:justify-center">
              <Suspense fallback={<SectionCount section={section} status={null} />}>
                <LiveSectionCount view={view} section={section} />
              </Suspense>
              {time && (
                <span className="text-sm text-content-2 md:text-roadmap-section-muted md:group-has-[[data-complete]]/section:text-roadmap-section-done-muted">
                  · {time}
                </span>
              )}
            </span>
          </span>
        </SectionTreeItem>
        {hasGroup && (
          <SectionToggle
            id={node.id}
            title={node.title}
            className="md:absolute md:top-1 md:right-1 md:text-roadmap-section-muted md:hover:bg-transparent md:hover:text-roadmap-section-fg"
          />
        )}
      </div>

      {hasGroup && (
        <TreeGroup sectionId={node.id} id={groupId} label={`Section ${number} topics`}>
          {topics.length > 0 && (
            <li role="none" className="block">
              <ol role="none" className="flex flex-col md:grid md:grid-cols-2 md:gap-y-3.5 md:py-6">
                {topics.map((topic, i) => (
                  <li
                    key={topic.id}
                    role="none"
                    className={`relative flex items-center pl-12 md:pl-0 ${i % 2 === 0 ? "md:col-start-1 md:justify-end" : "md:col-start-2 md:flex-row-reverse md:justify-end"} ${topic.optional ? OPTIONAL_HIDE : ""}`}
                  >
                    <div data-minimap="topic" className="flex w-full flex-col md:w-72 lg:w-80">
                      <TopicLink slug={slug} view={view} node={topic} />
                      {topic.children.length > 0 && <Nested slug={slug} view={view} nodes={topic.children} />}
                    </div>
                    <span aria-hidden className="hidden h-0.5 w-12 shrink-0 bg-roadmap-spine md:block" />
                  </li>
                ))}
              </ol>
            </li>
          )}
          {checkpoints.map((checkpoint) => (
            <li key={checkpoint.id} role="none" className={`relative z-10 flex py-2 pl-12 md:justify-center md:pl-0 ${checkpoint.optional ? OPTIONAL_HIDE : ""}`}>
              <Link
                href={nodePath(slug, checkpoint.slug)}
                role="treeitem"
                aria-level={2}
                tabIndex={-1}
                data-label={checkpoint.title}
                data-node-id={checkpoint.id}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-dashed border-roadmap-checkpoint bg-roadmap-checkpoint-bg px-4 py-2 text-sm text-roadmap-checkpoint-fg has-[[data-up-next]]:ring-2 has-[[data-up-next]]:ring-roadmap-up-next md:hover:shadow-md"
              >
                <Flag aria-hidden className="size-4 shrink-0 text-roadmap-checkpoint" />
                <span>
                  <span className="font-bold text-roadmap-checkpoint-label">Checkpoint</span> · {checkpoint.title}
                </span>
                <Suspense fallback={null}>
                  <ViewNodeMark view={view} nodeId={checkpoint.id} />
                </Suspense>
              </Link>
            </li>
          ))}
        </TreeGroup>
      )}
    </li>
  );
}

const TOPIC_BASE =
  "group/topic flex min-h-11 w-full items-center gap-2.5 rounded-md py-2 max-md:hover:bg-surface-sunken has-[[data-progress=in_progress]]:font-semibold has-[[data-up-next]]:ring-2 has-[[data-up-next]]:ring-roadmap-up-next has-[[data-up-next]]:ring-offset-2 has-[[data-up-next]]:ring-offset-surface md:min-h-13 md:border md:px-4 md:py-3 md:leading-snug md:hover:shadow-md md:has-[[data-progress=in_progress]]:font-normal";
const TOPIC_REQUIRED = "text-roadmap-node-fg md:border-roadmap-node-border md:bg-roadmap-node";
const TOPIC_OPTIONAL =
  "text-roadmap-node-optional-fg md:border-dashed md:border-roadmap-node-optional-border md:bg-roadmap-node-optional";
const TOPIC_STATUS =
  "md:has-[[data-progress=done]]:border-solid md:has-[[data-progress=done]]:border-roadmap-node-done md:has-[[data-progress=done]]:bg-roadmap-node-done md:has-[[data-progress=done]]:text-roadmap-node-done-fg md:has-[[data-progress=in_progress]]:border-2 md:has-[[data-progress=in_progress]]:border-solid md:has-[[data-progress=in_progress]]:border-roadmap-node-progress md:has-[[data-progress=in_progress]]:bg-roadmap-node md:has-[[data-progress=in_progress]]:text-roadmap-node-fg";

function TopicLink({ slug, view, node }: RoadmapViewProps & { node: ViewNode }) {
  const choice = choiceLabel(view, node);
  return (
    <Link
      href={nodePath(slug, node.slug)}
      role="treeitem"
      aria-level={2}
      tabIndex={-1}
      data-label={node.title}
      data-node-id={node.id}
      className={`${TOPIC_BASE} ${node.optional ? TOPIC_OPTIONAL : TOPIC_REQUIRED} ${TOPIC_STATUS}`}
    >
      <Suspense fallback={<StatusMarker status={null} upNext={false} />}>
        <LiveStatusMarker view={view} nodeId={node.id} />
      </Suspense>
      <span className="flex-1">{node.title}</span>
      <NodeBadges node={node} />
      {choice && <Tag>{choice}</Tag>}
      {node.optional && <Tag>Optional</Tag>}
      {node.minutes !== null && (
        <span className="shrink-0 text-xs whitespace-nowrap opacity-80 tabular-nums">
          <span className="sr-only">about </span>
          {node.minutes} min
        </span>
      )}
    </Link>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 rounded-sm border border-current/40 px-1.5 py-0.5 text-xs font-semibold opacity-90">{children}</span>
  );
}

/** Nodes deeper than a topic: rare, so drawn as a compact list under it, as level 3 items. */
function Nested({ slug, view, nodes, level = 3 }: RoadmapViewProps & { nodes: ViewNode[]; level?: number }) {
  return (
    <ul role="none" className="mt-1 flex flex-col border-l-2 border-roadmap-spine pl-3 text-sm md:ml-4">
      {nodes.map((node) => (
        <li key={node.id} role="none" className={node.optional ? OPTIONAL_HIDE : ""}>
          <Link
            href={nodePath(slug, node.slug)}
            role="treeitem"
            aria-level={level}
            tabIndex={-1}
            data-label={node.title}
            data-node-id={node.id}
            className="flex min-h-11 items-center gap-2 text-content hover:underline"
          >
            <span className="flex-1">{node.title}</span>
            <Suspense fallback={null}>
              <ViewNodeMark view={view} nodeId={node.id} />
            </Suspense>
          </Link>
          {node.children.length > 0 && <Nested slug={slug} view={view} nodes={node.children} level={level + 1} />}
        </li>
      ))}
    </ul>
  );
}

// Islands ---------------------------------------------------------------------

async function LiveStatusMarker({ view, nodeId }: { view: RoadmapView; nodeId: string }) {
  const live = await liveView(view);
  return <StatusMarker status={live.byId[nodeId]?.status ?? null} upNext={live.upNextId === nodeId} />;
}

/**
 * The topic's status: a dot on the spine below md, an icon in the box from
 * md. `data-progress` and `data-up-next` are what the link restyles itself
 * from. Null (a visitor or the prerendered shell) draws the plain not
 * started dot with no label.
 */
function StatusMarker({ status, upNext }: { status: ProgressStatus | null; upNext: boolean }) {
  const dot = "absolute top-1/2 -translate-y-1/2 rounded-full md:hidden";
  return (
    <span data-progress={status ?? undefined} data-up-next={upNext || undefined} className="contents">
      {status === "done" ? (
        <>
          <span aria-hidden className={`${dot} left-[9px] size-[18px] border-[3px] border-surface bg-roadmap-node-done`} />
          <Check aria-hidden strokeWidth={3} className="hidden size-[18px] shrink-0 md:block" />
        </>
      ) : status === "in_progress" ? (
        <>
          <span aria-hidden className={`${dot} left-[9px] size-[18px] border-4 border-roadmap-node-progress bg-surface`} />
          <span aria-hidden className="hidden size-2.5 shrink-0 rounded-full bg-roadmap-node-progress md:block" />
        </>
      ) : (
        <span aria-hidden className={`${dot} left-[10px] size-4 border-2 border-roadmap-node-todo bg-surface`} />
      )}
      {status && <span className="sr-only">{upNext ? `Up next, ${STATUS_LABELS[status].toLowerCase()}` : STATUS_LABELS[status]}: </span>}
    </span>
  );
}

async function LiveSectionCount({ view, section }: { view: RoadmapView; section: ViewSection }) {
  const live = await liveView(view);
  const current = live.sections.find((s) => s.node.id === section.node.id);
  return <SectionCount section={current ?? section} status={live.hasProgress ? "known" : null} />;
}

function SectionCount({ section, status }: { section: ViewSection; status: "known" | null }) {
  const cls =
    "text-sm text-content-2 md:text-roadmap-section-muted md:group-has-[[data-complete]]/section:text-roadmap-section-done-muted";
  const topics = section.topics.length;
  if (!status) {
    return <span className={cls}>{topics === 1 ? "1 topic" : `${topics} topics`}</span>;
  }
  const { done, total, complete } = section.counts;
  return (
    <span className={cls} data-complete={complete || undefined}>
      {complete ? "Complete" : `${done} of ${total} required done`}
    </span>
  );
}
