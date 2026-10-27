import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Video, Wrench } from "lucide-react";
import { Suspense, type ReactNode } from "react";
import Link from "@/components/ui/link";
import type { NodeDetail } from "@/lib/roadmaps/public";
import { nodePath, roadmapPath } from "@/lib/roadmaps/seo";
import type { ViewNode, ViewSection } from "@/lib/roadmaps/view-model";
import { NodeStatus } from "./progress";

/*
 * The pieces of a topic shared by the full topic page and the topic panel
 * that opens over the roadmap, so both always say the same thing.
 */

/** "Section 2 · HTML and CSS · Topic 2 of 4", for a node in a roadmap view. */
export function topicEyebrow(node: ViewNode, section: ViewSection, sectionCount: number) {
  const parts =
    node.kind === "section"
      ? [`Section ${section.number} of ${sectionCount}`]
      : [
          `Section ${section.number}`,
          section.node.title,
          node.kind === "checkpoint" ? "Checkpoint" : node.place ? `Topic ${node.place.n} of ${node.place.of}` : `Topic ${node.number}`,
        ];
  if (node.optional) parts.push("Optional");
  return parts.join(" · ");
}

/**
 * Where the topic sits, its title, the learner's status and its summary. The
 * heading is the page's h1, or the panel's h2 (labelled by `headingId`).
 * Status is read only: a topic becomes done by passing its quiz in the full
 * lesson, never from here.
 */
export function TopicSummary({
  node,
  section,
  sectionCount,
  headingLevel,
  headingId,
}: {
  node: ViewNode;
  section: ViewSection;
  sectionCount: number;
  headingLevel: 1 | 2;
  headingId?: string;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <div>
      <p className="text-sm text-content-3">{topicEyebrow(node, section, sectionCount)}</p>
      <Heading id={headingId} className={headingLevel === 1 ? "mt-1 text-title text-content" : "mt-2 text-h2 text-content lg:text-subtitle"}>
        {node.title}
      </Heading>
      <div className="mt-3 min-h-0">
        <Suspense fallback={null}>
          <NodeStatus nodeId={node.id} />
        </Suspense>
      </div>
      {node.summary && <p className={`mt-3 text-content-2 ${headingLevel === 1 ? "max-w-reading text-lead" : ""}`}>{node.summary}</p>}
    </div>
  );
}

const KIND = {
  article: { label: "Article", Icon: BookOpen, badge: "bg-roadmap-badge-article text-roadmap-badge-article-fg" },
  video: { label: "Video", Icon: Video, badge: "bg-roadmap-badge-video text-roadmap-badge-video-fg" },
  practice: { label: "Practice", Icon: Wrench, badge: "bg-roadmap-badge-practice text-roadmap-badge-practice-fg" },
} as const;

/** Free resources as cards, for the full topic page. */
export function ResourceCards({ resources }: { resources: NodeDetail["resources"] }) {
  return (
    <ul className="flex flex-col gap-3">
      {resources.map((r) => {
        const { label, Icon } = KIND[r.kind];
        return (
          <li key={r.id}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-3 rounded-lg border border-line bg-surface p-4 hover:bg-surface-sunken"
            >
              <Icon aria-hidden className="size-5 shrink-0 text-content-3" />
              <span className="flex flex-1 flex-col">
                <span className="font-semibold text-content">{r.label}</span>
                <span className="text-sm text-content-2">
                  {label}
                  {r.source && ` · ${r.source}`}
                </span>
              </span>
              <ExternalLink aria-hidden className="size-4 shrink-0 text-content-3" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Free resources as compact rows with a kind badge, for the topic panel. */
export function ResourceRows({ resources }: { resources: NodeDetail["resources"] }) {
  return (
    <ul className="flex flex-col">
      {resources.map((r) => {
        const { label, badge } = KIND[r.kind];
        return (
          <li key={r.id}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-13 items-center gap-3 border-b border-line py-2 text-content hover:bg-surface-sunken"
            >
              <span className={`shrink-0 rounded-sm px-2 py-0.5 text-xs font-bold ${badge}`}>{label}</span>
              <span className="flex-1">{r.label}</span>
              <ExternalLink aria-hidden className="size-4 shrink-0 text-content-3" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Previous and next in reading order.
 *
 * In the panel (`inPanel`) they are client links that `replace` the history
 * entry, so closing the panel (back) returns to the roadmap however many
 * topics the learner stepped through.
 *
 * On the full topic page they are plain links. Next.js intercepts a client
 * navigation to a topic from anywhere under /roadmaps/[slug], which would
 * open the panel over the topic page; a document navigation is never
 * intercepted, so the next topic opens as a full page.
 */
export function TopicNeighbours({
  slug,
  previous,
  next,
  inPanel = false,
  className = "",
}: {
  slug: string;
  previous: Pick<ViewNode, "slug" | "title"> | null;
  next: Pick<ViewNode, "slug" | "title"> | null;
  inPanel?: boolean;
  className?: string;
}) {
  const card = "flex min-h-11 flex-col rounded-lg border border-line p-4 hover:bg-surface-sunken";

  return (
    <nav aria-label="Roadmap" className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {previous ? (
        <TopicLink inPanel={inPanel} href={nodePath(slug, previous.slug)} className={card}>
          <span className="flex items-center gap-1 text-sm text-content-3">
            <ArrowLeft aria-hidden className="size-4" /> Previous
          </span>
          <span className="text-content">{previous.title}</span>
        </TopicLink>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <TopicLink inPanel={inPanel} href={nodePath(slug, next.slug)} className={`${card} text-right`}>
          <span className="flex items-center justify-end gap-1 text-sm text-content-3">
            Next <ArrowRight aria-hidden className="size-4" />
          </span>
          <span className="text-content">{next.title}</span>
        </TopicLink>
      ) : inPanel ? (
        <span className="hidden sm:block" />
      ) : (
        <Link href={roadmapPath(slug)} className={`${card} text-right`}>
          <span className="text-sm text-content-3">End of the roadmap</span>
          <span className="text-content">Back to the roadmap</span>
        </Link>
      )}
    </nav>
  );
}

function TopicLink({ inPanel, href, className, children }: { inPanel: boolean; href: string; className: string; children: ReactNode }) {
  return inPanel ? (
    <Link href={href} replace className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
