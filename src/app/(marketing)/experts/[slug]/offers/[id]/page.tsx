import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ExpertAvatar, JsonLd, SkillChips, TrustFacts, VerifiedBadge } from "@/components/experts/expert-bits";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { Container, MainWithRail } from "@/components/ui/layout";
import type { DirectoryExpert } from "@/lib/experts/directory";
import {
  SOFT_LAUNCH_PRICE,
  expertPath,
  offerFacts,
  offerKindLabel,
  offerPath,
  offerSummary,
  requestPath,
} from "@/lib/experts/offers";
import { getOffer, type PublicOffer } from "@/lib/experts/queries";
import { EXPERT_NOT_FOUND, expertsMetadata, offerJsonLd } from "@/lib/experts/seo";

export async function generateMetadata({ params }: PageProps<"/experts/[slug]/offers/[id]">): Promise<Metadata> {
  const { slug, id } = await params;
  const found = await getOffer(slug, id);
  if (!found) return { ...EXPERT_NOT_FOUND, title: "Offer not found" };
  const { expert, offer } = found;
  return expertsMetadata({
    title: `${offer.title} with ${expert.name}`,
    description: offer.description,
    path: offerPath(expert.slug, offer.id),
    image: `/og/experts/${expert.slug}`,
  });
}

export default function OfferPage({ params }: PageProps<"/experts/[slug]/offers/[id]">) {
  return (
    <Container className="pt-6 pb-16 md:pt-10 xl:pt-14 xl:pb-24">
      <Suspense fallback={<OfferSkeleton />}>
        <Offer params={params} />
      </Suspense>
    </Container>
  );
}

async function Offer({ params }: Pick<PageProps<"/experts/[slug]/offers/[id]">, "params">) {
  const { slug, id } = await params;
  const found = await getOffer(slug, id);
  if (!found) notFound();
  const { expert, offer, others } = found;
  const facts = offerFacts(offer);

  return (
    <article className="flex flex-col gap-6">
      <JsonLd data={offerJsonLd(expert, offer)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-content-2">
          <li>
            <Link href="/experts" className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-content">
              Experts
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={expertPath(expert.slug)}
              className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-content"
            >
              {expert.name}
            </Link>
          </li>
        </ol>
      </nav>

      <MainWithRail sticky railLabel="Request this offer" rail={<RequestCard expert={expert} offer={offer} />}>
        <header className="flex flex-col gap-3">
          <p className="text-xs font-bold tracking-widest text-content-3 uppercase">{offerKindLabel(offer.kind)}</p>
          <h1 className="text-title text-content">{offer.title}</h1>
          <p className="text-sm font-semibold text-success-fg">{SOFT_LAUNCH_PRICE}</p>
          {/* Phones reach the request card only after the details; give them the action up front too. */}
          {expert.acceptingRequests && (
            <Link href={requestPath(expert.slug, offer.id)} aria-label={`Request ${offer.title}`} className={buttonClasses("primary", "self-start lg:hidden")}>
              Request
            </Link>
          )}
        </header>

        <section aria-labelledby="description-heading" className="flex flex-col gap-3">
          <h2 id="description-heading" className="text-subtitle text-content">
            What it is
          </h2>
          <p className="max-w-reading whitespace-pre-line text-content-2">{offer.description}</p>
        </section>

        {offer.scope && (
          <section aria-labelledby="scope-heading" className="flex flex-col gap-3">
            <h2 id="scope-heading" className="text-subtitle text-content">
              What you get
            </h2>
            <p className="max-w-reading whitespace-pre-line text-content-2">{offer.scope}</p>
          </section>
        )}

        {facts.length > 0 && (
          <section aria-labelledby="terms-heading" className="flex flex-col gap-3">
            <h2 id="terms-heading" className="text-subtitle text-content">
              The details
            </h2>
            <dl className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1 rounded-lg border border-line p-4">
                  <dt className="text-sm text-content-3">{f.label}</dt>
                  <dd className="font-semibold text-content">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {offer.skills.length > 0 && (
          <section aria-labelledby="offer-skills-heading" className="flex flex-col gap-3">
            <h2 id="offer-skills-heading" className="text-subtitle text-content">
              Skills covered
            </h2>
            <SkillChips skills={offer.skills} />
          </section>
        )}

        {others.length > 0 && (
          <section aria-labelledby="more-heading" className="flex flex-col gap-3">
            <h2 id="more-heading" className="text-subtitle text-content">
              More from {expert.name.split(" ")[0]}
            </h2>
            <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
              {others.map((o) => (
                <li key={o.id}>
                  <Link
                    href={offerPath(expert.slug, o.id)}
                    className="flex min-h-14 flex-col justify-center gap-0.5 px-4 py-3 transition-colors hover:bg-surface-sunken"
                  >
                    <span className="font-semibold text-content">{o.title}</span>
                    <span className="text-sm text-content-2">{offerSummary(o)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </MainWithRail>
    </article>
  );
}

/** The action and who it is with. On phones it follows the details; from lg it stays in view beside them. */
function RequestCard({ expert, offer }: { expert: DirectoryExpert; offer: PublicOffer }) {
  return (
    <div className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-5 xl:p-6">
      <div className="flex flex-col gap-1">
        <p className="text-h3 text-content">{SOFT_LAUNCH_PRICE}</p>
        <p className="text-sm text-content-2">Nothing is charged while the marketplace is in its soft launch.</p>
      </div>
      {expert.acceptingRequests ? (
        <div className="flex flex-col gap-2">
          <Link href={requestPath(expert.slug, offer.id)} aria-label={`Request ${offer.title}`} className={buttonClasses("primary", "w-full")}>
            Request
          </Link>
          <p className="text-sm text-content-3">You will need an account. {expert.name.split(" ")[0]} accepts or declines.</p>
        </div>
      ) : (
        <p className="rounded-md bg-surface-sunken p-3 text-sm text-content-2">
          {expert.name.split(" ")[0]} is not taking new requests right now.
        </p>
      )}
      <div className="flex flex-col gap-3 border-t border-line pt-5">
        <Link href={expertPath(expert.slug)} className="group flex items-center gap-3">
          <ExpertAvatar expert={expert} size="sm" />
          <span className="flex min-w-0 flex-col">
            <span className="font-semibold text-content group-hover:underline">{expert.name}</span>
            <span className="line-clamp-2 text-sm text-content-2">{expert.headline}</span>
          </span>
        </Link>
        {expert.isVerified && (
          <div>
            <VerifiedBadge />
          </div>
        )}
        <TrustFacts expert={expert} layout="stacked" />
      </div>
    </div>
  );
}

function OfferSkeleton() {
  return (
    <div aria-busy="true" className="flex animate-pulse flex-col gap-6">
      <div className="h-5 w-40 rounded bg-surface-sunken" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-4">
          <div className="h-10 w-2/3 rounded bg-surface-sunken" />
          <div className="h-40 rounded-lg bg-surface-sunken" />
        </div>
        <div className="h-72 rounded-lg bg-surface-sunken" />
      </div>
    </div>
  );
}
