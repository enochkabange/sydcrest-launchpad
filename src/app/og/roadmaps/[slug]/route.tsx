import { roadmapOgImage } from "@/lib/roadmaps/og";
import { getPublishedRoadmap } from "@/lib/roadmaps/public";

/** Share card for a published roadmap. */
export async function GET(_request: Request, { params }: RouteContext<"/og/roadmaps/[slug]">) {
  const { slug } = await params;
  const roadmap = await getPublishedRoadmap(slug);
  if (!roadmap) return new Response("Not found", { status: 404 });
  const topics = roadmap.nodes.length;
  return roadmapOgImage(roadmap.title, `A free roadmap with ${topics} ${topics === 1 ? "topic" : "topics"}.`);
}
