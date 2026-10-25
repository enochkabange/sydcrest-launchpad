import type { Metadata } from "next";

/** Placeholder param for build validation when nothing is published yet (Cache Components needs one). */
export const PLACEHOLDER_SLUG = "__none__";

export const roadmapPath = (slug: string) => `/roadmaps/${slug}`;
export const nodePath = (slug: string, node: string) => `/roadmaps/${slug}/${node}`;
export const learnPath = (slug: string, node: string) => `/learn/${slug}/${node}`;

/** Cuts text at a word boundary so meta descriptions and share cards stay tidy. */
export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  // A space right after the last kept character still counts as a word end.
  const space = clean.slice(0, max).lastIndexOf(" ");
  const cut = space > max * 0.6 ? clean.slice(0, space) : clean.slice(0, max - 1);
  return `${cut.replace(/[\s.,;:]+$/, "")}…`;
}

/**
 * Title, description, canonical and Open Graph for a roadmap page. The title
 * goes through the root layout's "%s · SydCrest Launchpad" template; the
 * share image is a branded card from src/app/og/roadmaps.
 */
export function roadmapMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  type?: "website" | "article";
}): Metadata {
  const ogTitle = `${title} · SydCrest Launchpad`;
  const desc = truncate(description, 160);
  const images = [{ url: image, width: 1200, height: 630, alt: `${title}, SydCrest Launchpad` }];
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: desc,
      url: path,
      siteName: "SydCrest Launchpad",
      locale: "en_GH",
      type,
      images,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: desc, images },
  };
}

export const NOT_FOUND_METADATA: Metadata = { title: "Roadmap not found", robots: { index: false } };
