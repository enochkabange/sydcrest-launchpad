import { ArrowRight, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/marketing/section";
import { CardProgress } from "@/components/roadmaps/index/card-progress";
import { Recommended } from "@/components/roadmaps/index/recommended";
import { RoadmapFilters } from "@/components/roadmaps/index/roadmap-filters";
import Link from "@/components/ui/link";
import { Container } from "@/components/ui/layout";
import { PHONE_FRIENDLY } from "@/lib/path/recommend";
import { facetsFor, FIELD_LABELS, filterOptions, LEVEL_LABELS } from "@/lib/roadmaps/catalogue";
import { formatMinutes } from "@/lib/roadmaps/estimates";
import { getPublishedRoadmaps, type RoadmapSummary } from "@/lib/roadmaps/public";
import { roadmapMetadata, roadmapPath } from "@/lib/roadmaps/seo";

export const metadata = roadmapMetadata({
  title: "Learning roadmaps",
  description:
    "Free, step by step roadmaps into tech careers, written for learners in Ghana. See every topic, the free resources to learn it, and a practice task for each step.",
  path: "/roadmaps",
  image: "/og/roadmaps",
});

/**
 * Prerendered from cached, published content; refreshed by revalidateRoadmap.
 * The learner's recommendation and the progress on each card are request
 * time islands with reserved space (issue #244).
 */
export default async function RoadmapsPage() {
  const roadmaps = await getPublishedRoadmaps();
  const phone = PHONE_FRIENDLY as ReadonlySet<string>;
  const items = roadmaps.map((r) => ({ slug: r.slug, facets: facetsFor(r, phone), card: <RoadmapCard roadmap={r} phone={phone} /> }));

  return (
    <>
      <PageHeader
        eyebrow="Roadmaps"
        title="Learning roadmaps"
        lead={
          <p>
            Pick a career path and see every topic in order, with free resources and a practice task for each step.
            Written for learners in Ghana, and free to follow.
          </p>
        }
      />

      <Container className="pb-16 xl:pb-24">
        {roadmaps.length === 0 ? (
          <div className="max-w-reading rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
            <p className="font-semibold text-content">Roadmaps are coming soon.</p>
            <p className="mt-1">The first roadmaps are being written and reviewed. They will appear here once they are ready.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <Recommended roadmaps={roadmaps} />
            <RoadmapFilters items={items} options={filterOptions(items.map((i) => i.facets))} />
          </div>
        )}
      </Container>
    </>
  );
}

function RoadmapCard({ roadmap: r, phone }: { roadmap: RoadmapSummary; phone: ReadonlySet<string> }) {
  const facets = facetsFor(r, phone);
  return (
    <Link
      href={roadmapPath(r.slug)}
      className="flex h-full flex-col gap-2 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-sunken xl:p-6"
    >
      <h2 className="text-subtitle text-content">{r.title}</h2>
      <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-content-3">
        {facets.field && <span>{FIELD_LABELS[facets.field] ?? facets.field}</span>}
        {facets.level && <span>{LEVEL_LABELS[facets.level]}</span>}
        {facets.phone && (
          <span className="inline-flex items-center gap-1">
            <Smartphone aria-hidden className="size-3.5" />
            Works on a phone
          </span>
        )}
      </p>
      {r.description && <p className="line-clamp-3 text-content-2">{r.description}</p>}
      <span className="mt-auto flex items-center justify-between pt-2 text-sm text-content-2">
        <span>
          {r.node_count} {r.node_count === 1 ? "topic" : "topics"}
          {r.required_minutes > 0 && <>, {formatMinutes(r.required_minutes)}</>}
        </span>
        <ArrowRight aria-hidden className="size-4 text-content-3" />
      </span>
      <CardProgress requiredIds={r.required_ids} title={r.title} />
    </Link>
  );
}
