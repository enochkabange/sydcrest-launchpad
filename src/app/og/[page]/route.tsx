import { isOgCard, OG_CARDS, ogImage } from "@/components/marketing/og-card";

/** Branded 1200x630 Open Graph cards, one per marketing page, prerendered at build time. */
export function generateStaticParams() {
  return Object.keys(OG_CARDS).map((page) => ({ page }));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[page]">) {
  const { page } = await params;
  if (!isOgCard(page)) return new Response("Not found", { status: 404 });
  const { headline, subline } = OG_CARDS[page];
  return ogImage(headline, subline);
}
