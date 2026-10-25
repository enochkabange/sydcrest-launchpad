/**
 * Which commit this deployment was built from. The pipeline sets
 * NEXT_PUBLIC_BUILD_SHA at build time and compares it after deploying, because
 * a 200 alone does not prove the new build is the one being served.
 */
export function GET() {
  return Response.json(
    { sha: process.env.NEXT_PUBLIC_BUILD_SHA ?? "local" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
