import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { formatDay, isVerificationStatus, outcomeTypeLabel, STATUS_TONES } from "@/lib/outcomes/labels";
import { regionLabel } from "@/lib/regions";
import { decideOutcome } from "./actions";

export const metadata: Metadata = { title: "Outcomes", robots: { index: false } };

const FILTERS = [
  { slug: "pending", label: "To review" },
  { slug: "rejected", label: "Rejected" },
  { slug: "verified", label: "Verified" },
  { slug: "all", label: "All" },
] as const;

const ADMIN_STATUS: Record<string, string> = { pending: "To review", verified: "Verified", rejected: "Rejected" };

const NOTE_CLASS =
  "w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content placeholder:text-content-3";

async function Queue({ searchParams }: Pick<PageProps<"/admin/outcomes">, "searchParams">) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const raw = Array.isArray(params.status) ? params.status[0] : params.status;
  const filter = FILTERS.find((f) => f.slug === raw)?.slug ?? "pending";

  let query = supabase
    .from("outcome_queue")
    .select("id, display_name, region, type, title, organisation_name, started_on, evidence_url, evidence_note, verification_status, verification_note, verified_at, created_at")
    .order("created_at", { ascending: filter === "pending" });
  if (filter !== "all") query = query.eq("verification_status", filter);
  const { data, error } = await query.limit(200);
  if (error) throw new Error(`Could not load outcomes: ${error.message}`);
  const outcomes = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Outcome status" className="flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <Link
            key={f.slug}
            href={`/admin/outcomes?status=${f.slug}`}
            aria-current={f.slug === filter ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              f.slug === filter ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {outcomes.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
          {filter === "pending" ? "Nothing waiting for review. New reports from learners will appear here." : "No outcomes here."}
        </p>
      ) : (
        <ul className="flex flex-col gap-3 xl:gap-4">
          {outcomes.map((o) => {
            const status = o.verification_status && isVerificationStatus(o.verification_status) ? o.verification_status : "pending";
            const id = o.id!;
            return (
              <li key={id} className="flex flex-col gap-3 rounded-lg border border-line p-4 md:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-xs font-bold tracking-widest text-content-3 uppercase">{outcomeTypeLabel(o.type ?? "")}</p>
                    <h2 className="text-h3 text-content">
                      {o.title ? `${o.title}, ${o.organisation_name}` : o.organisation_name}
                    </h2>
                    <p className="text-sm text-content-2">
                      {o.display_name ?? "A learner"}
                      {o.region ? ` · ${regionLabel(o.region)}` : ""} · started {o.started_on ? formatDay(o.started_on) : "unknown"}
                    </p>
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-sm font-semibold ${STATUS_TONES[status]}`}>
                    {ADMIN_STATUS[status]}
                  </span>
                </div>

                <div className="flex flex-col gap-2 rounded-md bg-surface-sunken p-3 text-sm">
                  <p className="font-semibold text-content">Evidence</p>
                  {o.evidence_url && (
                    <a
                      href={o.evidence_url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex min-h-11 items-center break-all text-content-link underline"
                    >
                      {o.evidence_url}
                    </a>
                  )}
                  {o.evidence_note && <p className="whitespace-pre-line text-content-2">{o.evidence_note}</p>}
                  {!o.evidence_url && !o.evidence_note && <p className="text-content-3">None given.</p>}
                </div>

                {o.verification_note && (
                  <p className="text-sm text-content-2">
                    <span className="font-semibold text-content">Note to learner:</span> {o.verification_note}
                  </p>
                )}
                <p className="text-sm text-content-3">
                  Reported {o.created_at ? formatDay(o.created_at.slice(0, 10)) : ""}
                  {o.verified_at ? `, verified ${formatDay(o.verified_at.slice(0, 10))}` : ""}
                </p>

                {status !== "verified" ? (
                  <div className="flex flex-col gap-3 md:flex-row md:items-start">
                    <form action={decideOutcome.bind(null, id, "verified")}>
                      <Button type="submit">Verify</Button>
                    </form>
                    {status === "pending" && (
                      <details className="flex-1">
                        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-md px-4 text-sm font-semibold text-content-2 hover:bg-surface-sunken hover:text-content">
                          Ask for more evidence
                        </summary>
                        <form action={decideOutcome.bind(null, id, "rejected")} className="mt-2 flex flex-col gap-2">
                          <label htmlFor={`note-${id}`} className="text-sm font-semibold text-content">
                            Note to the learner
                          </label>
                          <textarea id={`note-${id}`} name="note" rows={3} maxLength={1000} required className={NOTE_CLASS} />
                          <Button type="submit" variant="secondary" className="self-start">
                            Reject with note
                          </Button>
                        </form>
                      </details>
                    )}
                  </div>
                ) : (
                  <form action={decideOutcome.bind(null, id, "pending")}>
                    <Button type="submit" variant="ghost">
                      Move back to review
                    </Button>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Checklist() {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
      <h2 className="text-h3 text-content">Before you verify</h2>
      <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-content-2">
        <li>The evidence names the learner and the organisation, client or funder.</li>
        <li>The start or award date matches what they reported.</li>
        <li>If in doubt, contact the organisation or ask the learner for more.</li>
      </ul>
      <p className="text-sm text-content-2">
        Verified outcomes count on the public impact page at once and on the North Star view when they started within the cohort
        window.
      </p>
    </section>
  );
}

export default function OutcomeQueuePage({ searchParams }: PageProps<"/admin/outcomes">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Outcomes</h1>
        <p className="max-w-reading text-content-2">Check what learners report before it counts toward the North Star.</p>
      </div>
      <MainWithRail railLabel="Verification checklist" rail={<Checklist />}>
        <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <Queue searchParams={searchParams} />
        </Suspense>
      </MainWithRail>
    </div>
  );
}
