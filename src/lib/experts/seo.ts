import type { Metadata } from "next";
import { truncate } from "@/lib/roadmaps/seo";
import { SITE_URL } from "@/lib/site";
import type { DirectoryExpert } from "./directory";
import { expertPath, offerKindLabel, offerPath } from "./offers";

/**
 * Title, description, canonical and Open Graph for the expert pages. The
 * title goes through the root layout's "%s · SydCrest Launchpad" template;
 * share cards come from src/app/og/experts.
 */
export function expertsMetadata({
  title,
  description,
  path,
  image = "/og/experts",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "profile";
}): Metadata {
  const ogTitle = `${title} · SydCrest Launchpad`;
  const desc = truncate(description, 160);
  const images = [{ url: image, width: 1200, height: 630, alt: `${title}, SydCrest Launchpad` }];
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { title: ogTitle, description: desc, url: path, siteName: "SydCrest Launchpad", locale: "en_GH", type, images },
    twitter: { card: "summary_large_image", title: ogTitle, description: desc, images },
  };
}

export const EXPERT_NOT_FOUND: Metadata = { title: "Expert not found", robots: { index: false } };

const abs = (path: string) => new URL(path, SITE_URL).toString();

/** schema.org Person for an expert, the mainEntity of their ProfilePage. */
function person(e: DirectoryExpert) {
  return {
    "@type": "Person",
    "@id": `${abs(expertPath(e.slug))}#person`,
    name: e.name,
    description: e.headline,
    url: abs(expertPath(e.slug)),
    ...(e.avatarUrl ? { image: e.avatarUrl } : {}),
    ...(e.skills.length ? { knowsAbout: e.skills } : {}),
    ...(e.languages.length ? { knowsLanguage: e.languages } : {}),
    ...(e.links.length ? { sameAs: e.links } : {}),
  };
}

/**
 * ProfilePage structured data. No rating here: schema.org has no
 * aggregateRating on Person, and the page shows the real one in text.
 */
export function profilePageJsonLd(e: DirectoryExpert) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: abs(expertPath(e.slug)),
    ...(e.approvedAt ? { dateCreated: e.approvedAt } : {}),
    mainEntity: person(e),
  };
}

/** A Service offered by the expert. Free during the soft launch, so the price is 0 cedis. */
export function offerJsonLd(e: DirectoryExpert, offer: { id: string; kind: string; title: string; description: string }) {
  const url = abs(offerPath(e.slug, offer.id));
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.title,
    description: truncate(offer.description, 300),
    serviceType: offerKindLabel(offer.kind),
    url,
    provider: person(e),
    offers: { "@type": "Offer", price: 0, priceCurrency: "GHS", url, availability: e.acceptingRequests ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
  };
}
