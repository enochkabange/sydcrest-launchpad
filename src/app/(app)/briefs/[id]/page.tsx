import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { BadgeCheck } from "lucide-react";
import {
  BriefFacts,
  BriefStatusPill,
  KindPill,
  PitchStatusPill,
  PosterLine,
  SkillList,
  Skeleton,
  pitchCount,
} from "@/components/briefs/brief-bits";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { getCurrentUser } from "@/lib/auth";
import { briefKindLabel, briefStatusLabel, budgetLabel, formatDate } from "@/lib/briefs/briefs";
import {
  getBrief,
  getMyActiveOffers,
  getPitchesForBrief,
  getViewer,
  type Brief,
  type PitchView,
  type Viewer,
} from "@/lib/briefs/queries";
import { categoryLabel } from "@/lib/experts/categories";
import { offerKindLabel, SOFT_LAUNCH_PRICE } from "@/lib/experts/offers";
import { BriefStatusControls, PitchDecision, WithdrawPitch } from "./decision-buttons";
import { PitchForm } from "./pitch-form";

export const metadata: Metadata = { title: "Brief", robots: { index: false } };

export default function BriefPage({ params, searchParams }: PageProps<"/briefs/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/briefs" className="inline-flex min-h-11 w-fit items-center text-sm font-semibold text-content-link underline">
        All briefs
      </Link>
      <Suspense
        fallback={
          <MainWithRail railLabel="About this brief" rail={<Skeleton className="h-72" />}>
            <Skeleton className="h-96" />
          </MainWithRail>
        }
      >
        <BriefArea params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function BriefArea({ params, searchParams }: PageProps<"/briefs/[id]">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/briefs/${id}`)}`);
  if (!user.hasAgeAndConsent) redirect(`/welcome?next=${encodeURIComponent(`/briefs/${id}`)}`);

  const [brief, viewer] = await Promise.all([getBrief(id), getViewer(user.id)]);
  if (!brief) notFound();
  const pitches = await getPitchesForBrief(brief.id);
  const manage = !!brief.can_manage;
  const mine = pitches.find((p) => p.expertId === user.id) ?? null;

  return (
    <MainWithRail railLabel="About this brief" rail={<BriefRail brief={brief} manage={manage} />}>
      {query.posted === "1" && manage && (
        <Alert tone="success">Your brief is posted. Approved experts whose skills match are being told about it.</Alert>
      )}
      <BriefDetails brief={brief} />
      {manage ? (
        <PitchList brief={brief} pitches={pitches} />
      ) : mine ? (
        <MyPitch pitch={mine} brief={brief} />
      ) : (
        <PitchArea brief={brief} viewer={viewer} />
      )}
    </MainWithRail>
  );
}

function BriefDetails({ brief }: { brief: Brief }) {
  const cats = brief.categories.map(categoryLabel).filter((c): c is string => !!c);
  return (
    <article aria-labelledby="brief-title" className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-5 lg:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <KindPill kind={brief.kind} />
        <BriefStatusPill status={brief.status} />
        <span className="text-xs text-content-3">Posted {formatDate(brief.created_at)}</span>
      </div>
      <h1 id="brief-title" className="text-title text-content">
        {brief.title}
      </h1>
      <PosterLine brief={brief} />
      <div className="max-w-reading text-body whitespace-pre-line text-content">{brief.description}</div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-content">Skills</h2>
        <SkillList skills={brief.skills} />
      </div>
      {cats.length > 0 && <p className="text-sm text-content-2">Categories: {cats.join(", ")}</p>}
      {/* Phones and tablets: the rail with these facts comes after the pitches. */}
      <div className="border-t border-line pt-4 lg:hidden">
        <BriefFacts brief={brief} />
      </div>
    </article>
  );
}

function BriefRail({ brief, manage }: { brief: Brief; manage: boolean }) {
  const budget = budgetLabel(brief.indicative_budget_ghs);
  return (
    <>
      <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 className="text-h3 text-content">At a glance</h2>
        <dl className="flex flex-col gap-3 text-sm">
          <Fact label="Kind" value={briefKindLabel(brief.kind)} />
          <Fact label="Status" value={briefStatusLabel(brief.status)} />
          {brief.organisation_name && <Fact label="Organisation" value={brief.organisation_name} />}
          <Fact label="Budget" value={budget ?? "Not given"} />
          <Fact label="Where" value={brief.is_remote ? (brief.location ? `Remote or ${brief.location}` : "Remote") : (brief.location ?? "Not given")} />
          {brief.deadline && <Fact label="Needed by" value={formatDate(brief.deadline)} />}
          <Fact label="Pitches" value={pitchCount(brief.pitch_count ?? 0)} />
        </dl>
        <p className="text-sm text-content-2">{SOFT_LAUNCH_PRICE}. Budgets and prices are a guide only.</p>
      </section>
      {manage && (brief.status === "open" || brief.status === "closed") && (
        <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
          <h2 className="text-h3 text-content">Manage this brief</h2>
          <p className="text-sm text-content-2">
            {brief.status === "open"
              ? "Close it to stop new pitches. You can still accept a pitch after you reopen it."
              : "This brief is closed to new pitches."}
          </p>
          <BriefStatusControls briefId={brief.id} status={brief.status} />
        </section>
      )}
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-content-3">{label}</dt>
      <dd className="text-content">{value}</dd>
    </div>
  );
}

function ExpertLine({ pitch }: { pitch: PitchView }) {
  const name = pitch.expert.slug ? (
    <Link href={`/experts/${pitch.expert.slug}`} className="font-semibold text-content-link underline">
      {pitch.expert.name}
    </Link>
  ) : (
    <span className="font-semibold text-content">{pitch.expert.name}</span>
  );
  return (
    <div className="flex flex-col gap-0.5">
      <p className="flex flex-wrap items-center gap-2">
        {name}
        {pitch.expert.isVerified && (
          <span className="inline-flex items-center gap-1 text-xs text-info-fg">
            <BadgeCheck aria-hidden className="size-3.5" />
            Verified by SydCrest
          </span>
        )}
      </p>
      {pitch.expert.headline && <p className="text-sm text-content-2">{pitch.expert.headline}</p>}
    </div>
  );
}

function PitchBody({ pitch }: { pitch: PitchView }) {
  const price = budgetLabel(pitch.indicativePriceGhs);
  return (
    <>
      <p className="max-w-reading whitespace-pre-line text-content">{pitch.message}</p>
      {(price || pitch.proposedTimeline) && (
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {price && (
            <div>
              <dt className="text-content-3">Indicative price</dt>
              <dd className="text-content">{price}</dd>
            </div>
          )}
          {pitch.proposedTimeline && (
            <div>
              <dt className="text-content-3">Timeline</dt>
              <dd className="text-content">{pitch.proposedTimeline}</dd>
            </div>
          )}
        </dl>
      )}
      {pitch.offer && (
        <div className="rounded-md border border-line bg-surface-sunken px-4 py-3 text-sm">
          <p className="text-content-3">Linked offer: {offerKindLabel(pitch.offer.kind)}</p>
          <p className="font-semibold text-content">{pitch.offer.title}</p>
          {pitch.offer.scope && <p className="text-content-2">{pitch.offer.scope}</p>}
          {pitch.offer.delivery_days && <p className="text-content-2">Delivered in {pitch.offer.delivery_days} days</p>}
        </div>
      )}
    </>
  );
}

function BookingLink({ bookingId }: { bookingId: string | null }) {
  if (!bookingId) return null;
  return (
    <Link href={`/bookings/${bookingId}`} className={buttonClasses("primary", "w-fit")}>
      Open the booking
    </Link>
  );
}

function PitchList({ brief, pitches }: { brief: Brief; pitches: PitchView[] }) {
  return (
    <section id="pitches" aria-labelledby="pitches-heading" className="flex scroll-mt-8 flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="pitches-heading" className="text-subtitle text-content">
          Pitches
        </h2>
        <p className="text-sm text-content-2">{pitchCount(pitches.length)}</p>
      </div>
      {pitches.length === 0 ? (
        <div className="flex flex-col gap-2 rounded-lg border border-dashed border-line-strong p-6 xl:p-8">
          <p className="font-semibold text-content">No pitches yet</p>
          <p className="max-w-reading text-content-2">
            {brief.status === "open"
              ? "Experts whose skills match have been told. Pitches show here as they arrive, and we notify you for each one."
              : "This brief is not taking pitches right now."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {pitches.map((p) => (
            <li key={p.id}>
              <article
                aria-label={`Pitch from ${p.expert.name}`}
                className={`flex flex-col gap-4 rounded-lg border bg-surface p-5 lg:p-6 ${p.status === "accepted" ? "border-success-fg/40" : "border-line"}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <ExpertLine pitch={p} />
                  <div className="flex items-center gap-2">
                    <PitchStatusPill status={p.status} />
                    <span className="text-xs text-content-3">{formatDate(p.createdAt)}</span>
                  </div>
                </div>
                <PitchBody pitch={p} />
                {p.status === "submitted" && brief.status === "open" && <PitchDecision pitchId={p.id} expertName={p.expert.name} />}
                {p.status === "accepted" && <BookingLink bookingId={p.bookingId} />}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function MyPitch({ pitch, brief }: { pitch: PitchView; brief: Brief }) {
  return (
    <section aria-labelledby="my-pitch-heading" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="my-pitch-heading" className="text-subtitle text-content">
          Your pitch
        </h2>
        <PitchStatusPill status={pitch.status} />
      </div>
      <PitchBody pitch={pitch} />
      {pitch.status === "submitted" && (
        <div className="flex flex-col gap-3 border-t border-line pt-4">
          <p className="text-sm text-content-2">
            {brief.status === "open"
              ? "We will tell you when the poster decides."
              : "This brief is closed to new pitches for now. Your pitch stays with the poster."}
          </p>
          <WithdrawPitch pitchId={pitch.id} />
        </div>
      )}
      {pitch.status === "accepted" && (
        <div className="flex flex-col gap-3 border-t border-line pt-4">
          <p className="text-content-2">Your pitch was accepted. Agree the details with the poster in your booking.</p>
          <BookingLink bookingId={pitch.bookingId} />
        </div>
      )}
      {pitch.status === "declined" && <p className="text-sm text-content-2">The poster chose another pitch this time. Thank you for pitching.</p>}
    </section>
  );
}

async function PitchArea({ brief, viewer }: { brief: Brief; viewer: Viewer }) {
  if (brief.status !== "open") {
    return <Note title="Not taking pitches">This brief is {briefStatusLabel(brief.status).toLowerCase()}, so it is not taking new pitches.</Note>;
  }
  if (!viewer.isApprovedExpert) {
    return (
      <Note title="Only approved experts can pitch">
        Experts are approved by the SydCrest team before they can pitch on briefs. You can still{" "}
        <Link href="/briefs/new" className="font-semibold text-content-link underline">
          post a brief of your own
        </Link>
        .
      </Note>
    );
  }
  if (brief.organisation_id && viewer.postableOrgs.some((o) => o.id === brief.organisation_id)) {
    return <Note title="This is your organisation's brief">Members of the posting organisation cannot pitch on it.</Note>;
  }
  const offers = await getMyActiveOffers(viewer.id);
  return (
    <section aria-labelledby="pitch-heading" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 lg:p-8">
      <div className="flex flex-col gap-1">
        <h2 id="pitch-heading" className="text-subtitle text-content">
          Pitch on this brief
        </h2>
        <p className="max-w-reading text-content-2">
          Say how you would help and what you have done before. The poster sees your name and headline from your expert page.
        </p>
      </div>
      <PitchForm briefId={brief.id} offers={offers.map((o) => ({ id: o.id, label: `${offerKindLabel(o.kind)}: ${o.title}` }))} />
    </section>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 lg:p-6">
      <h2 className="font-semibold text-content">{title}</h2>
      <p className="max-w-reading text-content-2">{children}</p>
    </section>
  );
}
