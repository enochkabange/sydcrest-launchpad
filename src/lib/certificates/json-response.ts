/** JSON-LD documents for Open Badges, cached at the CDN for an hour. */
export function jsonLd(body: unknown, { status = 200, cache = "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" } = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": cache,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
