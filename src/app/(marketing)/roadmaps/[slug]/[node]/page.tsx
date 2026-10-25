import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Video, Wrench } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Markdown } from "@/components/roadmaps/markdown";
import { NodeStatus } from "@/components/roadmaps/progress";
import { ShareButton } from "@/components/roadmaps/share-button";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { markdownToText } from "@/lib/roadmaps/markdown";
import { getNodeDetail, getPublishedNode, getPublishedPaths, type NodeDetail } from "@/lib/roadmaps/public";
import {
  learnPath,
  nodePath,
  NOT_FOUND_METADATA,
  PLACEHOLDER_SLUG,
  roadmapMetadata,
  roadmapPath,
} from "@/lib/roadmaps/seo";
import { locateNode, type TreeNode } from "@/lib/roadmaps/tree";

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
  const { node, ancestors, previous, next } = located;
  const detail = await getNodeDetail(slug, node.id);
  const path = nodePath(slug, node.slug);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16 md:px-8 md:pt-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-content-2">
          <Crumb href="/roadmaps">Roadmaps</Crumb>
          <Crumb href={roadmapPath(slug)}>{roadmap.title}</Crumb>
          {ancestors.map((a) => (
            <Crumb key={a.id} href={nodePath(slug, a.slug)}>
              {a.title}
            </Crumb>
          ))}
        </ol>
      </nav>

      <header className="mt-5">
        <p className="text-sm text-content-3">
          Topic {node.number} of the {roadmap.title} roadmap
          {node.is_optional && " · Optional"}
        </p>
        <h1 className="mt-1 text-3xl text-content md:text-4xl">{node.title}</h1>
        <div className="mt-3 min-h-0">
          <Suspense fallback={null}>
            <NodeStatus nodeId={node.id} />
          </Suspense>
        </div>
        {node.summary && <p className="mt-3 text-lg text-content-2">{node.summary}</p>}

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
          <Resources resources={detail.resources} />
        ) : (
          <ComingSoon>Resources for this topic are coming soon.</ComingSoon>
        )}
      </Block>

      {node.children.length > 0 && (
        <Block title="Topics in this section" id="topics">
          <Subtopics slug={slug} nodes={node.children} />
        </Block>
      )}

      <nav aria-label="Roadmap" className="mt-10 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
        {previous ? (
          <Link href={nodePath(slug, previous.slug)} className="flex min-h-11 flex-col rounded-lg border border-line p-4 hover:bg-surface-sunken">
            <span className="flex items-center gap-1 text-sm text-content-3">
              <ArrowLeft aria-hidden className="size-4" /> Previous
            </span>
            <span className="text-content">{previous.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link href={nodePath(slug, next.slug)} className="flex min-h-11 flex-col rounded-lg border border-line p-4 text-right hover:bg-surface-sunken">
            <span className="flex items-center justify-end gap-1 text-sm text-content-3">
              Next <ArrowRight aria-hidden className="size-4" />
            </span>
            <span className="text-content">{next.title}</span>
          </Link>
        ) : (
          <Link href={roadmapPath(slug)} className="flex min-h-11 flex-col rounded-lg border border-line p-4 text-right hover:bg-surface-sunken">
            <span className="text-sm text-content-3">End of the roadmap</span>
            <span className="text-content">Back to the outline</span>
          </Link>
        )}
      </nav>
    </article>
  );
}

function Crumb({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 after:text-content-3 after:content-['/'] last:after:content-none">
      <Link href={href} className="underline underline-offset-2 hover:text-content">
        {children}
      </Link>
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

const KIND = {
  article: { label: "Article", Icon: BookOpen },
  video: { label: "Video", Icon: Video },
  practice: { label: "Practice", Icon: Wrench },
} as const;

function Resources({ resources }: { resources: NodeDetail["resources"] }) {
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

function Subtopics({ slug, nodes }: { slug: string; nodes: TreeNode[] }) {
  return (
    <ol className="flex flex-col divide-y divide-line rounded-lg border border-line bg-surface">
      {nodes.map((n) => (
        <li key={n.id}>
          <Link href={nodePath(slug, n.slug)} className="flex min-h-11 items-center gap-3 px-4 py-2 hover:bg-surface-sunken">
            <span className="w-10 shrink-0 text-sm text-content-3 tabular-nums">{n.number}</span>
            <span className="flex-1 text-content">{n.title}</span>
            <ArrowRight aria-hidden className="size-4 text-content-3" />
          </Link>
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
