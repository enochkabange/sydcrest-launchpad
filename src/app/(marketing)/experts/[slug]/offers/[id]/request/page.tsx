import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ExpertAvatar, TrustFacts } from "@/components/experts/expert-bits";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { Container, MainWithRail } from "@/components/ui/layout";
import { getCurrentUser } from "@/lib/auth";
import { findOpenRequest } from "@/lib/bookings/data";
import { bookingPath } from "@/lib/bookings/model";
import type { DirectoryExpert } from "@/lib/experts/directory";
import {
  SOFT_LAUNCH_PRICE,
  expertPath,
  offerFacts,
  offerKindLabel,
  offerPath,
  requestPath,
} from "@/lib/experts/offers";
import { getOffer, type PublicOffer } from "@/lib/experts/queries";
import { createClient } from "@/lib/supabase/server";
import { RequestForm } from "./request-form";

type Props = PageProps<"/experts/[slug]/offers/[id]/request">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, id } = await params;
  const found = await getOffer(slug, id);
  return {
    title: found ? `Request ${found.offer.title}` : "Offer not found",
    robots: { index: false },
  };
}

export default function RequestPage({ params }: Props) {
  return (
    <Container className="pt-6 pb-16 md:pt-10 xl:pt-14 xl:pb-24">
      <Suspense fallback={<RequestSkeleton />}>
        <Request params={params} />
      </Suspense>
    </Container>
  );
}

async function Request({ params }: Pick<Props, "params">) {
  const { slug, id } = await params;
  const found = await getOffer(slug, id);
  if (!found) notFound();
  const { expert, offer } = found;
  const first = expert.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-content-2">
          <li>
            <Link href={expertPath(expert.slug)} className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-content">
              {expert.name}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={offerPath(expert.slug, offer.id)}
              className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-content"
            >
              {offer.title}
            </Link>
          </li>
        </ol>
      </nav>

      <MainWithRail railLabel="About this offer" rail={<OfferCard expert={expert} offer={offer} />}>
        <header className="flex flex-col gap-2">
          <p className="text-xs font-bold tracking-widest text-content-3 uppercase">Request</p>
          <h1 className="text-title text-content">{offer.title}</h1>
          <p className="max-w-reading text-lead text-content-2">
            Tell {first} what you need. {first} accepts or declines, and you agree the details together in your booking
            thread.
          </p>
        </header>
        <section className="max-w-2xl rounded-lg border border-line bg-surface p-5 lg:p-6">
          <RequestArea expert={expert} offer={offer} />
        </section>
      </MainWithRail>
    </div>
  );
}

/** Reads the session: signed out visitors sign in and come straight back. */
async function RequestArea({ expert, offer }: { expert: DirectoryExpert; offer: PublicOffer }) {
  const here = requestPath(expert.slug, offer.id);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(here)}`);
  if (!user.hasAgeAndConsent) redirect(`/welcome?next=${encodeURIComponent(here)}`);
  const first = expert.name.split(" ")[0];

  if (user.id === expert.profileId) {
    return (
      <Notice action={<Link href={offerPath(expert.slug, offer.id)} className={buttonClasses("secondary")}>Back to the offer</Link>}>
        This is your own offer. People who find it on your page will request it here.
      </Notice>
    );
  }
  if (!expert.acceptingRequests) {
    return (
      <Notice action={<Link href="/experts" className={buttonClasses("secondary")}>Find another expert</Link>}>
        {first} is not taking new requests right now.
      </Notice>
    );
  }
  const supabase = await createClient();
  const open = await findOpenRequest(supabase, user.id, expert.profileId);
  if (open) {
    return (
      <Notice action={<Link href={bookingPath(open)} className={buttonClasses("primary")}>Open your request</Link>}>
        You already have a request waiting with {first}. Once {first} replies you can send another.
      </Notice>
    );
  }
  return <RequestForm slug={expert.slug} offerId={offer.id} expertFirstName={first} />;
}

function Notice({ children, action }: { children: ReactNode; action: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-content-2">{children}</p>
      {action}
    </div>
  );
}

function OfferCard({ expert, offer }: { expert: DirectoryExpert; offer: PublicOffer }) {
  const facts = offerFacts(offer);
  return (
    <div className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-5 xl:p-6">
      <Link href={expertPath(expert.slug)} className="group flex items-center gap-3">
        <ExpertAvatar expert={expert} size="sm" />
        <span className="flex min-w-0 flex-col">
          <span className="font-semibold text-content group-hover:underline">{expert.name}</span>
          <span className="line-clamp-2 text-sm text-content-2">{expert.headline}</span>
        </span>
      </Link>
      <TrustFacts expert={expert} layout="stacked" />
      <dl className="flex flex-col gap-3 border-t border-line pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-content-3">Type</dt>
          <dd className="text-right font-semibold text-content">{offerKindLabel(offer.kind)}</dd>
        </div>
        {facts.map((f) => (
          <div key={f.label} className="flex justify-between gap-4">
            <dt className="text-content-3">{f.label}</dt>
            <dd className="text-right font-semibold text-content">{f.value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4">
          <dt className="text-content-3">Price</dt>
          <dd className="text-right font-semibold text-success-fg">{SOFT_LAUNCH_PRICE}</dd>
        </div>
      </dl>
      <p className="rounded-md bg-surface-sunken p-3 text-sm text-content-2">
        Nothing is charged while the marketplace is in its soft launch. Never send money to anyone you meet here.
      </p>
    </div>
  );
}

function RequestSkeleton() {
  return (
    <div aria-busy="true" className="flex animate-pulse flex-col gap-6">
      <div className="h-5 w-40 rounded bg-surface-sunken" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-4">
          <div className="h-10 w-2/3 rounded bg-surface-sunken" />
          <div className="h-80 rounded-lg bg-surface-sunken" />
        </div>
        <div className="h-72 rounded-lg bg-surface-sunken" />
      </div>
    </div>
  );
}
