import { roadmapOgImage } from "@/lib/roadmaps/og";
import { getPublishedNode } from "@/lib/roadmaps/public";

/** Share card for one topic of a published roadmap. */
export async function GET(_request: Request, { params }: RouteContext<"/og/roadmaps/[slug]/[node]">) {
  const { slug, node: nodeSlug } = await params;
  const found = await getPublishedNode(slug, nodeSlug);
  if (!found) return new Response("Not found", { status: 404 });
  return roadmapOgImage(found.node.title, `Part of the ${found.roadmap.title} roadmap.`);
}
