import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { AutoGrid, MainWithRail } from "@/components/ui/layout";
import { OfferSummary } from "@/components/experts/offer-summary";
import { createClient } from "@/lib/supabase/server";
import { siteOrigin } from "@/lib/site-url";
import { describeResponseTime } from "@/lib/market-apply/expert";
import { getMyExpertState } from "@/lib/market-apply/data";
import type { Cadence, OfferKind } from "@/lib/market-apply/offers";
import { ExpertProfileForm } from "./profile-form";
import { deleteOffer, setOfferActive } from "./actions";

export const metadata: Metadata = { title: "Expert dashboard" };

const OFFER_NOTICES: Record<string, string> = {
  added: "Offer added.",
  saved: "Offer saved.",
  deleted: "Offer deleted.",
};

function NotAnExpert() {
  return (
    <section className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:p-6">
      <div className="flex max-w-reading flex-col gap-2">
        <h2 className="text-subtitle text-content">You are not an expert yet</h2>
        <p className="text-content-2">
          Experts offer sessions, reviews, projects and gigs to learners. Apply to become one and your dashboard will
          appear here.
        </p>
      </div>
      <Link href="/experts/apply" className={buttonClasses("primary", "shrink-0")}>
        Become an expert
      </Link>
    </section>
  );
}

async function Offers() {
  const { user, expert } = await getMyExpertState();
  if (!expert) return null;
  const supabase = await createClient();
  const { data: offers, error } = await supabase
    .from("offers")
    .select("*")
    .eq("expert_id", user.id)
    .order("position")
    .order("created_at");
  if (error) throw new Error(`Could not load your offers: ${error.message}`);
  const canAdd = expert.status !== "delisted";

  return (
    <section aria-labelledby="offers-heading" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="offers-heading" className="text-subtitle text-content">
          Your offers
        </h2>
        {canAdd && (
          <Link href="/expert/offers/new" className={buttonClasses("primary")}>
            Add an offer
          </Link>
        )}
      </div>
      {expert.status === "pending" && (
        <p className="max-w-reading text-content-2">
          Offers you add now are drafts. They show on your expert page once you are approved.
        </p>
      )}
      {!offers?.length ? (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-line-strong p-5 xl:p-6">
          <p className="font-semibold text-content">No offers yet</p>
          <p className="max-w-reading text-content-2">
            An offer is something a learner can request from you: a one to one session, a group session, an async review,
            a project, recurring mentorship or a fixed scope gig. Every offer is free during the soft launch.
          </p>
        </div>
      ) : (
        <AutoGrid min="md" as="ul">
          {offers.map((offer) => (
            <li key={offer.id}>
              <OfferSummary
                offer={{ ...offer, kind: offer.kind as OfferKind, cadence: offer.cadence as Cadence | null }}
                status={
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-sm ${offer.is_active ? "bg-success-bg text-success-fg" : "border border-line text-content-2"}`}
                  >
                    {offer.is_active ? (expert.status === "approved" ? "Shown" : "Ready") : "Hidden"}
                  </span>
                }
                actions={
                  <>
                    <Link href={`/expert/offers/${offer.id}`} className={buttonClasses("secondary")}>
                      Edit<span className="sr-only"> {offer.title}</span>
                    </Link>
                    <form action={setOfferActive.bind(null, offer.id, !offer.is_active)}>
                      <Button type="submit" variant="ghost">
                        {offer.is_active ? "Hide" : "Show"}
                        <span className="sr-only"> {offer.title}</span>
                      </Button>
                    </form>
                    <form action={deleteOffer.bind(null, offer.id)}>
                      <Button type="submit" variant="ghost">
                        Delete<span className="sr-only"> {offer.title}</span>
                      </Button>
                    </form>
                  </>
                }
              />
            </li>
          ))}
        </AutoGrid>
      )}
    </section>
  );
}

async function ProfileEditor() {
  const [{ expert }, origin] = await Promise.all([getMyExpertState(), siteOrigin()]);
  if (!expert) return null;
  return (
    <section aria-labelledby="profile-heading" className="flex flex-col gap-4 border-t border-line pt-8">
      <div className="flex flex-col gap-1">
        <h2 id="profile-heading" className="text-subtitle text-content">
          Your expert profile
        </h2>
        <p className="max-w-reading text-content-2">This is what learners see on your expert page.</p>
      </div>
      <div className="max-w-2xl">
        <ExpertProfileForm
          origin={origin}
          initial={{
            slug: expert.slug,
            headline: expert.headline,
            bio: expert.bio,
            skills: expert.skills,
            links: expert.links,
            languages: expert.languages,
            region: expert.region,
            availability_note: expert.availability_note,
            accepting_requests: expert.accepting_requests,
            offers_free_intro: expert.offers_free_intro,
          }}
        />
      </div>
    </section>
  );
}

async function Main({ searchParams }: { searchParams: PageProps<"/expert">["searchParams"] }) {
  const [{ expert }, params] = await Promise.all([getMyExpertState(), searchParams]);
  if (!expert) return <NotAnExpert />;
  const notice = typeof params.offer === "string" ? OFFER_NOTICES[params.offer] : undefined;
  return (
    <div className="flex flex-col gap-8">
      {notice && <Alert tone="success">{notice}</Alert>}
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Offers />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <ProfileEditor />
      </Suspense>
    </div>
  );
}

/** Status, badges and response time beside the work from lg; after it on phones. */
async function StatusRail() {
  const { expert, application } = await getMyExpertState();
  if (!expert) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-line p-5">
        <h2 className="text-h3 font-semibold text-content">Free during the soft launch</h2>
        <p className="text-sm text-content-2">Learners do not pay for offers yet, and SydCrest takes nothing.</p>
      </div>
    );
  }
  const supabase = await createClient();
  const { data: listed } =
    expert.status === "approved"
      ? await supabase
          .from("public_experts")
          .select("median_response_hours, completed_bookings")
          .eq("profile_id", expert.profile_id)
          .maybeSingle()
      : { data: null };
  const responseTime = describeResponseTime(listed?.median_response_hours);

  const status = {
    approved: { label: "Listed", body: "Your expert page is live and learners can find you." },
    pending:
      application?.status === "submitted"
        ? { label: "In review", body: "An admin is reviewing your application. Your page goes live once you are approved." }
        : { label: "Not listed", body: "Send an application so an admin can review it and list you." },
    delisted: { label: "Delisted", body: expert.status_reason ?? "An admin has taken your page off the list." },
  }[expert.status];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-lg border border-line p-5">
        <h2 className="text-h3 font-semibold text-content">Status</h2>
        <p>
          <span className="rounded-full bg-info-bg px-2.5 py-0.5 text-sm font-semibold text-info-fg">{status.label}</span>
        </p>
        <p className="text-sm text-content-2">{status.body}</p>
        {(expert.is_verified || expert.is_featured) && (
          <ul className="flex flex-wrap gap-2" aria-label="Badges">
            {expert.is_verified && <li className="rounded-full border border-line px-2.5 py-0.5 text-sm text-content-2">Verified</li>}
            {expert.is_featured && <li className="rounded-full border border-line px-2.5 py-0.5 text-sm text-content-2">Featured</li>}
          </ul>
        )}
        {expert.status === "approved" ? (
          <Link href={`/experts/${expert.slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline">
            View your expert page
          </Link>
        ) : (
          (expert.status === "delisted" || application?.status !== "submitted") && (
            <Link href="/experts/apply" className={buttonClasses("secondary", "self-start")}>
              {application ? "See your application" : "Send your application"}
            </Link>
          )
        )}
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-line p-5">
        <h2 className="text-h3 font-semibold text-content">Response time</h2>
        <p className="text-sm text-content-2">
          {responseTime ??
            "Shown on your page once you have answered a few requests. It is measured from how quickly you reply, so it is always real."}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 className="text-h3 font-semibold text-content">Free during the soft launch</h2>
        <p className="text-sm text-content-2">
          Learners do not pay for offers yet, and SydCrest takes nothing. Any price you add is shown as indicative only.
        </p>
      </div>
    </div>
  );
}

export default function ExpertDashboardPage({ searchParams }: PageProps<"/expert">) {
  return (
    <MainWithRail
      railLabel="Expert status"
      sticky
      rail={
        <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <StatusRail />
        </Suspense>
      }
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-title text-content">Expert dashboard</h1>
        <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <Main searchParams={searchParams} />
        </Suspense>
      </div>
    </MainWithRail>
  );
}
