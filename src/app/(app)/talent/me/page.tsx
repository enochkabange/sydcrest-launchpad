import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { ActionButton } from "@/components/business/action-button";
import { Badge, Panel, Skeleton, formatDate } from "@/components/business/bits";
import { TalentCard } from "@/components/business/talent-card";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getPublicOrganisationNames } from "@/lib/organisations/queries";
import { contactStatusLabel } from "@/lib/talent/forms";
import { deleteListing, setListingActive } from "../actions";
import { ListingForm } from "./listing-form";
import { RespondForm } from "./respond-form";

export const metadata: Metadata = { title: "Talent directory listing" };

type Eligibility = { eligible: boolean; is_adult: boolean; certificates: number };

function readEligibility(value: unknown): Eligibility {
  const v = (value ?? {}) as Partial<Eligibility>;
  return { eligible: v.eligible === true, is_adult: v.is_adult === true, certificates: Number(v.certificates ?? 0) };
}

async function Listing() {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data: rawEligibility, error }, { data: listing }] = await Promise.all([
    supabase.rpc("talent_eligibility"),
    supabase
      .from("talent_listings")
      .select("headline, summary, skills, tracks, region, availability, open_to_remote, portfolio_url, is_active")
      .eq("profile_id", user.id)
      .maybeSingle(),
  ]);
  if (error) throw new Error(`Could not check eligibility: ${error.message}`);
  const eligibility = readEligibility(rawEligibility);

  if (!eligibility.eligible && !listing) {
    return (
      <Panel tone="sunken" title={eligibility.is_adult ? "Earn your place in the directory" : "The directory is for adults"}>
        <p className="max-w-reading text-content-2">
          {eligibility.is_adult
            ? "The talent directory lists learners with a SydCrest programme certificate, so organisations know the skills are real. Finish a programme and come back here to opt in."
            : "Only learners aged 18 and over can list themselves for organisations. Keep learning: your progress counts when you are ready."}
        </p>
        <Link href="/dashboard" className={buttonClasses("primary", "self-start")}>
          Keep learning
        </Link>
      </Panel>
    );
  }

  return (
    <>
      {listing && !eligibility.eligible && (
        <Panel tone="sunken" title="Your listing is hidden">
          <p className="max-w-reading text-content-2">
            Organisations cannot see your listing because you no longer have a live certificate. You can switch it off or
            remove it.
          </p>
          <div className="flex flex-wrap gap-2">
            {listing.is_active && <ActionButton action={setListingActive.bind(null, false)} label="Switch off" />}
            <ActionButton action={deleteListing} label="Remove listing" variant="ghost" confirm="Remove your listing?" />
          </div>
        </Panel>
      )}
      {eligibility.eligible && (
        <section aria-labelledby="listing-heading" className="flex max-w-2xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="listing-heading" className="text-subtitle text-content">
              Your listing
            </h2>
            {listing && <Badge tone={listing.is_active ? "success" : "neutral"}>{listing.is_active ? "Listed" : "Hidden"}</Badge>}
          </div>
          <ListingForm
            isNew={!listing}
            values={{
              headline: listing?.headline ?? "",
              summary: listing?.summary ?? null,
              skills: listing?.skills ?? [],
              tracks: listing?.tracks ?? [],
              region: listing?.region ?? null,
              availability: listing?.availability ?? "open_to_work",
              open_to_remote: listing?.open_to_remote ?? true,
              portfolio_url: listing?.portfolio_url ?? null,
              is_active: listing?.is_active ?? true,
            }}
          />
          {listing && (
            <div className="border-t border-line pt-4">
              <ActionButton action={deleteListing} label="Remove my listing" variant="ghost" confirm="Remove your listing from the directory?" />
            </div>
          )}
        </section>
      )}
    </>
  );
}

async function Requests() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talent_contact_requests")
    .select("id, organisation_id, message, status, shared_contact, created_at, responded_at")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load requests: ${error.message}`);
  const requests = data ?? [];
  if (requests.length === 0) return null;
  const names = await getPublicOrganisationNames([...new Set(requests.map((r) => r.organisation_id))]);

  return (
    <section aria-labelledby="requests-heading" className="flex flex-col gap-4">
      <h2 id="requests-heading" className="text-subtitle text-content">
        Requests to contact you
      </h2>
      <ul className="flex flex-col gap-3">
        {requests.map((r) => {
          const org = names.get(r.organisation_id);
          const orgName = org?.name ?? "An organisation";
          return (
            <li key={r.id} className="flex flex-col gap-3 rounded-lg border border-line p-4 xl:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-content">
                  {org ? (
                    <Link href={`/org/${org.slug}`} className="text-content-link underline">
                      {orgName}
                    </Link>
                  ) : (
                    orgName
                  )}
                </p>
                <Badge tone={r.status === "pending" ? "info" : r.status === "accepted" ? "success" : "neutral"}>{contactStatusLabel(r.status)}</Badge>
                <span className="text-sm text-content-3">{formatDate(r.created_at)}</span>
              </div>
              <p className="max-w-reading whitespace-pre-line text-content">{r.message}</p>
              {r.status === "pending" && <RespondForm requestId={r.id} organisation={orgName} />}
              {r.status === "accepted" && (
                <p className="text-sm text-content-2">
                  {r.shared_contact ? `You shared: ${r.shared_contact}` : "You accepted without sharing a contact detail."}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

async function Preview() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase.from("talent_directory").select("*").eq("profile_id", user.id).maybeSingle();
  if (!data) {
    return (
      <Panel title="What organisations see" tone="sunken">
        <p className="text-sm text-content-2">
          Your name, headline, region, tracks, skills, portfolio link and certificates. Never your email or phone number.
        </p>
      </Panel>
    );
  }
  return (
    <section aria-labelledby="preview-heading" className="flex flex-col gap-3">
      <h2 id="preview-heading" className="text-h3 text-content">
        What organisations see
      </h2>
      <TalentCard row={data} full />
      <p className="text-sm text-content-3">Never your email or phone number. You choose what to share when you accept a request.</p>
    </section>
  );
}

export default function TalentMePage() {
  return (
    <MainWithRail
      railLabel="Preview of your listing"
      sticky
      rail={
        <Suspense fallback={<Skeleton className="h-72" />}>
          <Preview />
        </Suspense>
      }
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-title text-content">Talent directory</h1>
        <p className="max-w-reading text-lead text-content-2">
          Let verified organisations find you for jobs, internships and gigs. You stay in control: they ask through
          SydCrest, and you decide whether to share how to reach you.
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Requests />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[40rem]" />}>
        <Listing />
      </Suspense>
    </MainWithRail>
  );
}
