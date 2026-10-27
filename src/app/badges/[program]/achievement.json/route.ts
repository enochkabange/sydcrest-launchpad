import { buildAchievementDocument } from "@/lib/certificates/open-badges";
import { jsonLd } from "@/lib/certificates/json-response";
import { getProgramForBadge } from "@/lib/certificates/server";
import { SITE_URL } from "@/lib/site";

/** The Open Badges 3.0 Achievement for a published programme. */
export async function GET(_request: Request, { params }: RouteContext<"/badges/[program]/achievement.json">) {
  const { program: slug } = await params;
  const program = await getProgramForBadge(slug);
  if (!program) return jsonLd({ error: "Not found" }, { status: 404, cache: "no-store" });
  return jsonLd(buildAchievementDocument(SITE_URL, program));
}
