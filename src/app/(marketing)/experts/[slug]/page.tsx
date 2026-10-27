import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { ExpertAvatar, JsonLd, SkillChips, TrustFacts, VerifiedBadge } from "@/components/experts/expert-bits";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { Container, MainWithRail } from "@/components/ui/layout";
import { categoryLabel } from "@/lib/experts/categories";
import type { DirectoryExpert } from "@/lib/experts/directory";
import { SOFT_LAUNCH_PRICE, offerKindLabel, offerPath, offerSummary, requestPath } from "@/lib/experts/offers";
import { getExpert, getOffers, getReviews, type PublicOffer } from "@/lib/experts/queries";
import { EXPERT_NOT_FOUND, expertsMetadata, profilePageJsonLd } from "@/lib/experts/seo";
import { regionLabel } from "@/lib/regions";
import { truncate } from "@/lib/roadmaps/seo";

export async function generateMetadata({ params }: PageProps<"/experts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const expert = await getExpert(slug);
  if (!expert) return EXPERT_NOT_FOUND;
  return expertsMetadata({
    title: truncate(`${expert.name}, ${expert.headline}`, 70),
    description: expert.bio ?? `${expert.name}: ${expert.headline}. Book a session on SydCrest Launchpad.`,
    path: `/experts/${expert.slug}`,
    image: `/og/experts/${expert.slug}`,
    type: "profile",
  });
}

export default function ExpertPage({ params }: PageProps<"/experts/[slug]">) {
  return (
    <Container className="pt-6 pb-16 md:pt-10 xl:pt-14 xl:pb-24">
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href="/experts" className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-content">
          Experts
        </Link>
      </nav>
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile params={params} />
      </Suspense>
    </Container>
  );
}

async function Profile({ params }: Pick<PageProps<"/experts/[slug]">, "params">) {
  const { slug } = await params;
  const expert = await getExpert(slug);
  if (!expert) notFound();
  const [offers, reviews] = await Promise.all([getOffers(expert.profileId), getReviews(expert.profileId)]);
  const region = regionLabel(expert.region);

  return (
    <article className="mt-2 flex flex-col gap-8 xl:gap-12">
      <JsonLd data={profilePageJsonLd(expert)} />
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <ExpertAvatar expert={expert} size="lg" />
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-title text-content">{expert.name}</h1>
            <p className="max-w-reading text-lead text-content-2">{expert.headline}</p>
            {region && <p className="text-sm text-content-3">{region} Region</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {expert.isVerified && <VerifiedBadge />}
            {expert.offersFreeIntro && expert.acceptingRequests && (
              <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-xs font-semibold text-success-fg">Free intro call</span>
            )}
            {!expert.acceptingRequests && (
              <span className="rounded-full bg-surface-sunken px-2.5 py-0.5 text-xs font-semibold text-content-2 ring-1 ring-line">
                Not taking new requests right now
              </span>
            )}
          </div>
          <TrustFacts expert={expert} />
        </div>
      </header>

      <MainWithRail sticky railLabel={`About ${expert.name}`} rail={<DetailsCard expert={expert} />}>
        <section aria-labelledby="offers-heading" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="offers-heading" className="text-subtitle text-content">
              Offers
            </h2>
            <p className="text-sm text-content-2">{SOFT_LAUNCH_PRICE}</p>
          </div>
          {offers.length === 0 ? (
            <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
              {expert.name.split(" ")[0]} has not listed an offer yet. Check back soon.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {offers.map((o) => (
                <li key={o.id}>
                  <OfferCard expert={expert} offer={o} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {expert.bio && (
          <section aria-labelledby="about-heading" className="flex flex-col gap-3">
            <h2 id="about-heading" className="text-subtitle text-content">
              About
            </h2>
            <p className="max-w-reading whitespace-pre-line text-content-2">{expert.bio}</p>
          </section>
        )}

        <section aria-labelledby="reviews-heading" className="flex flex-col gap-4">
          <h2 id="reviews-heading" className="text-subtitle text-content">
            Reviews
          </h2>
          {reviews.length === 0 ? (
            <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
              No reviews yet. Only people who complete a session with {expert.name.split(" ")[0]} can leave one.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
              {reviews.map((r) => (
                <li key={r.id} className="flex flex-col gap-2 p-4 xl:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Stars rating={r.rating} />
                    <time dateTime={r.createdAt} className="text-sm text-content-3">
                      {formatDate(r.createdAt)}
                    </time>
                  </div>
                  {r.body && <p className="max-w-reading whitespace-pre-line text-content">{r.body}</p>}
                  <p className="text-sm text-content-3">
                    {r.reviewerName ?? "A SydCrest learner"}
                    {r.offerKind ? `, ${offerKindLabel(r.offerKind).toLowerCase()}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </MainWithRail>
    </article>
  );
}

function OfferCard({ expert, offer }: { expert: DirectoryExpert; offer: PublicOffer }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5 md:flex-row md:items-start md:justify-between md:gap-6 xl:p-6">
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="text-xs font-bold tracking-widest text-content-3 uppercase">{offerSummary(offer)}</p>
        <h3 className="text-h3 text-content">
          <Link href={offerPath(expert.slug, offer.id)} className="underline-offset-2 hover:underline">
            {offer.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-content-2">{offer.description}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2 md:flex-col md:items-stretch">
        {expert.acceptingRequests && (
          <Link href={requestPath(expert.slug, offer.id)} aria-label={`Request ${offer.title}`} className={buttonClasses("primary")}>
            Request
          </Link>
        )}
        <Link href={offerPath(expert.slug, offer.id)} aria-label={`Details of ${offer.title}`} className={buttonClasses("secondary")}>
          Details
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>
  );
}

function DetailsCard({ expert }: { expert: DirectoryExpert }) {
  const categories = expert.categories.map((c) => categoryLabel(c)).filter(Boolean) as string[];
  return (
    <div className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-5 xl:p-6">
      <TrustFacts expert={expert} layout="stacked" />
      {expert.availabilityNote && (
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-content">Availability</h2>
          <p className="text-sm text-content-2">{expert.availabilityNote}</p>
        </div>
      )}
      {expert.skills.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-content">Skills</h2>
          <SkillChips skills={expert.skills} />
        </div>
      )}
      {categories.length > 0 && (
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-content">Helps with</h2>
          <p className="text-sm text-content-2">{categories.join(", ")}</p>
        </div>
      )}
      {expert.languages.length > 0 && (
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-content">Languages</h2>
          <p className="text-sm text-content-2">{expert.languages.join(", ")}</p>
        </div>
      )}
      {expert.links.length > 0 && (
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-content">Work and links</h2>
          <ul className="flex flex-col">
            {expert.links.map((href) => (
              <li key={href}>
                <a
                  href={href}
                  rel="noopener noreferrer nofollow ugc"
                  target="_blank"
                  className="inline-flex min-h-11 max-w-full items-center gap-1.5 text-sm text-content-link underline underline-offset-2"
                >
                  <span className="truncate">{displayUrl(href)}</span>
                  <ExternalLink aria-hidden className="size-3.5 shrink-0" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {expert.approvedAt && <p className="text-sm text-content-3">Listed since {formatDate(expert.approvedAt, false)}</p>}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden
          className={`size-4 ${n <= rating ? "fill-current text-content-accent" : "text-line-strong"}`}
        />
      ))}
    </span>
  );
}

function displayUrl(href: string) {
  try {
    const u = new URL(href);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname === "/" ? "" : u.pathname}`;
  } catch {
    return href;
  }
}

function formatDate(iso: string, withDay = true) {
  return new Intl.DateTimeFormat("en-GB", {
    ...(withDay ? { day: "numeric" } : {}),
    month: "long",
    year: "numeric",
    timeZone: "Africa/Accra",
  }).format(new Date(iso));
}

function ProfileSkeleton() {
  return (
    <div aria-busy="true" className="mt-2 flex animate-pulse flex-col gap-8">
      <div className="flex items-center gap-6">
        <div className="size-20 rounded-full bg-surface-sunken lg:size-24" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="h-10 w-2/3 max-w-md rounded bg-surface-sunken" />
          <div className="h-5 w-full max-w-xl rounded bg-surface-sunken" />
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-4">
          <div className="h-36 rounded-lg bg-surface-sunken" />
          <div className="h-36 rounded-lg bg-surface-sunken" />
        </div>
        <div className="h-72 rounded-lg bg-surface-sunken" />
      </div>
    </div>
  );
}
