import { badgeImage } from "@/lib/certificates/og";
import { getProgramForBadge } from "@/lib/certificates/server";

/** The programme's badge image (600px PNG), the Achievement image in every credential. */
export async function GET(_request: Request, { params }: RouteContext<"/badges/[program]/image.png">) {
  const { program: slug } = await params;
  const program = await getProgramForBadge(slug);
  if (!program) return new Response("Not found", { status: 404 });
  const response = badgeImage(program.title);
  response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  return response;
}
