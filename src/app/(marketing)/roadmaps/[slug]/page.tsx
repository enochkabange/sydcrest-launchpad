import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SectionAccent } from "@/components/brand/illustrations";
import { RoadmapOutline } from "@/components/roadmaps/outline";
import { RoadmapProgress } from "@/components/roadmaps/progress";
import { ShareButton } from "@/components/roadmaps/share-button";
import Link from "@/components/ui/link";
import { getPublishedPaths, getPublishedRoadmap } from "@/lib/roadmaps/public";
import { NOT_FOUND_METADATA, PLACEHOLDER_SLUG, roadmapMetadata, roadmapPath } from "@/lib/roadmaps/seo";
import { buildNodeTree } from "@/lib/roadmaps/tree";

/**
 * Published roadmaps are prerendered at build; one published later is served
 * as an App Shell on its first visit, then cached (ISR with Cache Components).
 */
export async function generateStaticParams() {
  const paths = await getPublishedPaths();
  return paths.length ? paths.map(({ slug }) => ({ slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: PageProps<"/roadmaps/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = await getPublishedRoadmap(slug);
  if (!roadmap) return NOT_FOUND_METADATA;
  return roadmapMetadata({
    title: `${roadmap.title} roadmap`,
    description:
      roadmap.description ?? `Every topic on the ${roadmap.title} roadmap, with free resources and practice tasks.`,
    path: roadmapPath(slug),
    image: `/og/roadmaps/${slug}`,
  });
}

export default function RoadmapPage({ params }: PageProps<"/roadmaps/[slug]">) {
  return (
    <Suspense fallback={<RoadmapSkeleton />}>
      <Roadmap params={params} />
    </Suspense>
  );
}

async function Roadmap({ params }: Pick<PageProps<"/roadmaps/[slug]">, "params">) {
  const { slug } = await params;
  const roadmap = await getPublishedRoadmap(slug);
  if (!roadmap) notFound();
  const tree = buildNodeTree(roadmap.nodes);
  const path = roadmapPath(slug);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-16 md:px-8 md:pt-10">
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href="/roadmaps" className="underline underline-offset-2 hover:text-content">
          Roadmaps
        </Link>
      </nav>

      <header className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <SectionAccent />
          <h1 className="mt-3 text-3xl text-content md:text-5xl">{roadmap.title}</h1>
          {roadmap.description && <p className="mt-3 text-lg text-content-2">{roadmap.description}</p>}
          <p className="mt-3 text-sm text-content-2">
            {tree.length} {tree.length === 1 ? "section" : "sections"}, {roadmap.nodes.length}{" "}
            {roadmap.nodes.length === 1 ? "topic" : "topics"}. Free to follow.
          </p>
          <div className="mt-2 min-h-5">
            <Suspense fallback={null}>
              <RoadmapProgress nodes={roadmap.nodes} />
            </Suspense>
          </div>
        </div>
        <ShareButton path={path} title={`${roadmap.title} roadmap`} text={`Learn ${roadmap.title} step by step on SydCrest Launchpad.`} />
      </header>

      <section className="mt-8" aria-labelledby="outline-heading">
        <h2 id="outline-heading" className="text-2xl text-content">
          The roadmap
        </h2>
        <p className="mt-1 text-content-2">Work through the sections in order. Tap a topic to see what it covers.</p>
        <div className="mt-5">
          {tree.length === 0 ? (
            <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
              The topics for this roadmap are coming soon.
            </p>
          ) : (
            <RoadmapOutline slug={slug} tree={tree} />
          )}
        </div>
      </section>
    </div>
  );
}

function RoadmapSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-4 pt-6 pb-16 md:px-8 md:pt-10" aria-busy="true">
      <div className="h-4 w-24 rounded bg-surface-sunken" />
      <div className="mt-8 h-10 w-2/3 rounded bg-surface-sunken" />
      <div className="mt-4 h-5 w-full max-w-2xl rounded bg-surface-sunken" />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-lg bg-surface-sunken" />
        ))}
      </div>
    </div>
  );
}
