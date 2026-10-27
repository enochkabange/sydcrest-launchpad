import { getExpert } from "@/lib/experts/queries";
import { roadmapOgImage } from "@/lib/roadmaps/og";

/** Share card for an approved expert: their name and headline, nothing else. */
export async function GET(_request: Request, { params }: RouteContext<"/og/experts/[slug]">) {
  const { slug } = await params;
  const expert = await getExpert(slug);
  if (!expert) return new Response("Not found", { status: 404 });
  return roadmapOgImage(expert.name, expert.headline);
}
