import type { Metadata } from "next";
import type { OgCard } from "@/components/marketing/og-card";

/**
 * Title, description, canonical and Open Graph for a public page. URLs are
 * relative and resolve against `metadataBase` in the root layout. The share
 * image is the branded card served by `src/app/og/[page]/route.tsx`.
 */
export function pageMetadata({
  title,
  description,
  path,
  og,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  og: OgCard;
  absoluteTitle?: boolean;
}): Metadata {
  const image = { url: `/og/${og}`, width: 1200, height: 630, alt: ogAlt(title, absoluteTitle) };
  const ogTitle = absoluteTitle ? title : `${title} · SydCrest Launchpad`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: "SydCrest Launchpad",
      locale: "en_GH",
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [image] },
  };
}

function ogAlt(title: string, absolute: boolean) {
  return absolute ? title : `${title}, SydCrest Launchpad`;
}
