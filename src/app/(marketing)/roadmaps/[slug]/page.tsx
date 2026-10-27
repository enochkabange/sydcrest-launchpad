import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SectionAccent } from "@/components/brand/illustrations";
import { RoadmapProgress } from "@/components/roadmaps/progress";
import { ShareButton } from "@/components/roadmaps/share-button";
import { ROADMAP_VIEWS } from "@/components/roadmaps/views/registry";
import { ActiveRoadmapView, RoadmapViewSwitcher } from "@/components/roadmaps/views/view-switcher";
import Link from "@/components/ui/link";
import { Container } from "@/components/ui/layout";
import { getPublishedPaths, getPublishedRoadmap } from "@/lib/roadmaps/public";
import { NOT_FOUND_METADATA, PLACEHOLDER_SLUG, roadmapMetadata, roadmapPath } from "@/lib/roadmaps/seo";
import { buildNodeTree } from "@/lib/roadmaps/tree";
import { buildRoadmapView } from "@/lib/roadmaps/view-model";

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
  // The structure only: learner state is filled in by islands inside <Suspense>.
  const view = buildRoadmapView(buildNodeTree(roadmap.nodes));
  const path = roadmapPath(slug);
  const sections = view.sections.length;
  const topics = roadmap.nodes.length;

  return (
    <Container className="pt-6 pb-16 md:pt-10 xl:pt-14 xl:pb-24">
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href="/roadmaps" className="underline underline-offset-2 hover:text-content">
          Roadmaps
        </Link>
      </nav>

      <header className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8 xl:gap-16">
        <div className="max-w-4xl">
          <SectionAccent />
          <h1 className="mt-3 text-title text-content">{roadmap.title}</h1>
          {roadmap.description && <p className="mt-3 max-w-reading text-lead text-content-2">{roadmap.description}</p>}
          <p className="mt-3 text-sm text-content-2">
            {sections} {sections === 1 ? "section" : "sections"}, {topics} {topics === 1 ? "topic" : "topics"}. Free to follow.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 md:w-80 xl:w-96">
          <div className="min-h-5">
            <Suspense fallback={null}>
              <RoadmapProgress view={view} />
            </Suspense>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-2">
            {sections > 0 && <RoadmapViewSwitcher views={ROADMAP_VIEWS.map(({ id, label }) => ({ id, label }))} />}
            <ShareButton path={path} title={`${roadmap.title} roadmap`} text={`Learn ${roadmap.title} step by step on SydCrest Launchpad.`} />
          </div>
        </div>
      </header>

      <section className="mt-8 xl:mt-12" aria-labelledby="outline-heading">
        <h2 id="outline-heading" className="text-h2 text-content lg:text-subtitle">
          The roadmap
        </h2>
        <p className="mt-1 text-content-2">Work through the sections in order. Select a topic to see what it covers.</p>
        <div className="mt-5">
          {sections === 0 ? (
            <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
              The topics for this roadmap are coming soon.
            </p>
          ) : (
            <ActiveRoadmapView
              views={ROADMAP_VIEWS.map(({ id, Component }) => ({ id, content: <Component slug={slug} view={view} /> }))}
            />
          )}
        </div>
      </section>
    </Container>
  );
}

function RoadmapSkeleton() {
  return (
    <div className="mx-auto w-full max-w-page animate-pulse px-4 pt-6 pb-16 md:px-8 md:pt-10" aria-busy="true">
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
