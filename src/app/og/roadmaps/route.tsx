import { roadmapOgImage } from "@/lib/roadmaps/og";

/** Share card for /roadmaps. Static, so it is prerendered at build time. */
export async function GET() {
  return roadmapOgImage("Learning roadmaps", "Free, step by step paths into tech careers.");
}
