import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/marketing/section";
import Link from "@/components/ui/link";
import { getPublishedRoadmaps } from "@/lib/roadmaps/public";
import { roadmapMetadata, roadmapPath } from "@/lib/roadmaps/seo";

export const metadata = roadmapMetadata({
  title: "Learning roadmaps",
  description:
    "Free, step by step roadmaps into tech careers, written for learners in Ghana. See every topic, the free resources to learn it, and a practice task for each step.",
  path: "/roadmaps",
  image: "/og/roadmaps",
});

/** Prerendered from cached, published content; refreshed by revalidateRoadmap. */
export default async function RoadmapsPage() {
  const roadmaps = await getPublishedRoadmaps();

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

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-8">
        {roadmaps.length === 0 ? (
          <div className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
            <p className="font-semibold text-content">Roadmaps are coming soon.</p>
            <p className="mt-1">The first roadmaps are being written and reviewed. They will appear here once they are ready.</p>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((r) => (
              <li key={r.id}>
                <Link
                  href={roadmapPath(r.slug)}
                  className="flex h-full flex-col gap-2 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-sunken"
                >
                  <h2 className="text-xl text-content">{r.title}</h2>
                  {r.description && <p className="line-clamp-3 text-content-2">{r.description}</p>}
                  <span className="mt-auto flex items-center justify-between pt-2 text-sm text-content-2">
                    {r.node_count} {r.node_count === 1 ? "topic" : "topics"}
                    <ArrowRight aria-hidden className="size-4 text-content-3" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
