import { roadmapOgImage } from "@/lib/roadmaps/og";

/** Share card for /experts. Static, so it is prerendered at build time. */
export async function GET() {
  return roadmapOgImage("Find an expert", "Sessions, reviews and project help. Free during the soft launch.");
}
