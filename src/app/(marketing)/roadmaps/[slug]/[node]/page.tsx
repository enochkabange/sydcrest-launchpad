import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Markdown } from "@/components/roadmaps/markdown";
import { ShareButton } from "@/components/roadmaps/share-button";
import { StudyBuddyPrompt } from "@/components/study-buddy/study-buddy-prompt";
import { ResourceCards, TopicNeighbours, TopicSummary } from "@/components/roadmaps/topic";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { markdownToText } from "@/lib/roadmaps/markdown";
import { getNodeDetail, getPublishedNode, getPublishedPaths } from "@/lib/roadmaps/public";
import {
  learnPath,
  nodePath,
  NOT_FOUND_METADATA,
  PLACEHOLDER_SLUG,
  roadmapMetadata,
  roadmapPath,
} from "@/lib/roadmaps/seo";
import { locateNode, type TreeNode } from "@/lib/roadmaps/tree";
import { buildRoadmapView, locateInView } from "@/lib/roadmaps/view-model";

type Props = PageProps<"/roadmaps/[slug]/[node]">;

export async function generateStaticParams({ params }: { params: { slug: string } }) {
  const paths = await getPublishedPaths();
  const nodes = paths.find((p) => p.slug === params.slug)?.nodes ?? [];
  return nodes.length ? nodes.map((node) => ({ node })) : [{ node: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, node: nodeSlug } = await params;
  const found = await getPublishedNode(slug, nodeSlug);
  if (!found) return NOT_FOUND_METADATA;
  const { roadmap, node } = found;
  let description = node.summary;
  if (!description) {
    const { content } = await getNodeDetail(slug, node.id);
    description = content ? markdownToText(content.explanation_md) : null;
  }
  return roadmapMetadata({
    title: `${node.title} · ${roadmap.title}`,
    description: description ?? `${node.title}, a topic on the ${roadmap.title} roadmap, with free resources to learn it.`,
    path: nodePath(slug, nodeSlug),
    image: `/og/roadmaps/${slug}/${nodeSlug}`,
    type: "article",
  });
}

export default function NodePage({ params }: Props) {
  return (
    <Suspense fallback={<NodeSkeleton />}>
      <Node params={params} />
    </Suspense>
  );
}

async function Node({ params }: Pick<Props, "params">) {
  const { slug, node: nodeSlug } = await params;
  const found = await getPublishedNode(slug, nodeSlug);
  if (!found) notFound();
  const { roadmap, tree } = found;
  const located = locateNode(tree, nodeSlug);
  if (!located) notFound();
  const { node, ancestors } = located;
  const view = buildRoadmapView(tree);
  const inView = locateInView(view, nodeSlug);
  if (!inView) notFound();
  const detail = await getNodeDetail(slug, node.id);
  const path = nodePath(slug, node.slug);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16 md:px-8 md:pt-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-content-2">
          <Crumb href="/roadmaps">Roadmaps</Crumb>
          <Crumb href={roadmapPath(slug)}>{roadmap.title}</Crumb>
          {ancestors.map((a) => (
            <Crumb key={a.id} href={nodePath(slug, a.slug)} plain>
              {a.title}
            </Crumb>
          ))}
        </ol>
      </nav>

      <header className="mt-5">
        <TopicSummary node={inView.node} section={inView.section} sectionCount={view.sections.length} headingLevel={1} />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
          <Link href={learnPath(slug, node.slug)} className={buttonClasses("primary", "w-full sm:w-auto")}>
            Start learning
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <ShareButton path={path} title={`${node.title} · ${roadmap.title}`} text={`Learn ${node.title} on SydCrest Launchpad.`} />
        </div>
      </header>

      <Block title="What you will learn" id="explanation">
        {detail.content ? (
          <Markdown source={detail.content.explanation_md} />
        ) : (
          <ComingSoon>The written explanation for this topic is being prepared and reviewed. It is coming soon.</ComingSoon>
        )}
      </Block>

      <Block title="Practice task" id="practice">
        {detail.content?.practice_task_md ? (
          <Markdown source={detail.content.practice_task_md} />
        ) : (
          <ComingSoon>A practice task for this topic is coming soon.</ComingSoon>
        )}
      </Block>

      <Block title="Free resources" id="resources">
        {detail.resources.length ? (
          <ResourceCards resources={detail.resources} />
        ) : (
          <ComingSoon>Resources for this topic are coming soon.</ComingSoon>
        )}
      </Block>

      <div className="mt-10">
        <StudyBuddyPrompt nodeTitle={node.title} next={learnPath(slug, node.slug)} />
      </div>

      {node.children.length > 0 && (
        <Block title="Topics in this section" id="topics">
          <Subtopics slug={slug} nodes={node.children} />
        </Block>
      )}

      <TopicNeighbours slug={slug} previous={inView.previous} next={inView.next} className="mt-10 border-t border-line pt-6" />
    </article>
  );
}

/**
 * Links from this page to another topic are plain (document) links: a client
 * navigation to a topic under /roadmaps/[slug] is intercepted into the topic
 * panel, which belongs over the roadmap, not over this page.
 */
function Crumb({ href, plain = false, children }: { href: string; plain?: boolean; children: ReactNode }) {
  const Anchor = plain ? "a" : Link;
  return (
    <li className="flex items-center gap-2 after:text-content-3 after:content-['/'] last:after:content-none">
      <Anchor href={href} className="underline underline-offset-2 hover:text-content">
        {children}
      </Anchor>
    </li>
  );
}

function Block({ title, id, children }: { title: string; id: string; children: ReactNode }) {
  return (
    <section className="mt-10" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="text-2xl text-content">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ComingSoon({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border border-dashed border-line-strong bg-surface-sunken p-4 text-content-2">{children}</p>;
}

function Subtopics({ slug, nodes }: { slug: string; nodes: TreeNode[] }) {
  return (
    <ol className="flex flex-col divide-y divide-line rounded-lg border border-line bg-surface">
      {nodes.map((n) => (
        <li key={n.id}>
          <a href={nodePath(slug, n.slug)} className="flex min-h-11 items-center gap-3 px-4 py-2 hover:bg-surface-sunken">
            <span className="w-10 shrink-0 text-sm text-content-3 tabular-nums">{n.number}</span>
            <span className="flex-1 text-content">{n.title}</span>
            <ArrowRight aria-hidden className="size-4 text-content-3" />
          </a>
        </li>
      ))}
    </ol>
  );
}

function NodeSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl animate-pulse px-4 pt-6 pb-16 md:px-8 md:pt-10" aria-busy="true">
      <div className="h-4 w-48 rounded bg-surface-sunken" />
      <div className="mt-8 h-10 w-3/4 rounded bg-surface-sunken" />
      <div className="mt-4 h-5 w-full rounded bg-surface-sunken" />
      <div className="mt-6 h-11 w-40 rounded bg-surface-sunken" />
      <div className="mt-10 h-48 rounded-lg bg-surface-sunken" />
    </div>
  );
}
