import type { Metadata } from "next";
import { Suspense } from "react";
import { DataTable, type Column } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { formatCount, formatShare, MIN_SAMPLE, NOT_ENOUGH } from "@/lib/insights/metrics";
import { deviceLabel } from "@/lib/learners/attributes";
import { EDUCATION, INTERNET } from "@/lib/learner-profile";
import {
  auditBandLabel,
  auditByOpportunity,
  MATCH_RATE_GAP,
  MATCH_WEIGHTS,
  matchFairness,
  RATES,
  type AuditDimension,
  type AuditRow,
  type FunnelRow,
  type RateLine,
} from "@/lib/matching/match";
import { regionLabel } from "@/lib/regions";

export const metadata: Metadata = { title: "Matching", robots: { index: false } };

const AGE_LABELS: Record<string, string> = { "18_24": "18 to 24", "25_29": "25 to 29", "30_34": "30 to 34", "35_plus": "35 and over" };

function groupLabel(dimension: string, grp: string): string {
  if (grp === "unknown") return "Not known";
  switch (dimension) {
    case "band":
      return auditBandLabel(grp);
    case "region":
      return regionLabel(grp) ?? grp;
    case "device":
      return deviceLabel(grp);
    case "internet":
      return INTERNET.find((o) => o.value === grp)?.label ?? grp;
    case "education":
      return EDUCATION.find((o) => o.value === grp)?.label ?? grp;
    case "age":
      return AGE_LABELS[grp] ?? grp;
    default:
      return grp;
  }
}

function share(value: number | null): string {
  return value === null ? NOT_ENOUGH : formatShare(value);
}

function DimensionTable({ report }: { report: AuditDimension }) {
  const columns: Column<RateLine>[] = [
    {
      header: "Group",
      cell: (g) => (
        <span className="font-semibold text-content">
          {groupLabel(report.dimension, g.grp)}
          {g.flagged && <span className="ml-2 rounded-sm bg-warning-bg px-1.5 py-0.5 text-xs text-warning-fg">Check</span>}
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Shown", cell: (g) => formatCount(g.shown), align: "end" },
    ...RATES.map(
      (r): Column<RateLine> => ({
        header: r.label,
        cell: (g) => share(g[r.key]),
        align: "end",
        phone: "hide",
      }),
    ),
    { header: "Hired", cell: (g) => formatCount(g.hired), align: "end", phone: "only" },
  ];
  return (
    <section aria-labelledby={`dim-${report.dimension}`} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={`dim-${report.dimension}`} className="text-h3 text-content">
          {report.label}
        </h3>
        <p className="text-sm text-content-2">
          {RATES.map((r) => `${r.label} ${share(report.overall[r.key])}`).join(", ")}
          {report.flags > 0 ? `; ${report.flags} ${report.flags === 1 ? "group" : "groups"} to check` : ""}
        </p>
      </div>
      {report.groups.length ? (
        <DataTable caption={`Match rates by ${report.label.toLowerCase()}`} columns={columns} rows={report.groups} rowKey={(g) => g.grp} />
      ) : (
        <p className="text-content-2">Nobody has been shown an opportunity yet.</p>
      )}
    </section>
  );
}

type BandLine = AuditRow;

async function Audit() {
  const { supabase } = await requireAdmin();
  const [audit, fairness] = await Promise.all([supabase.rpc("admin_match_audit"), supabase.rpc("admin_match_fairness")]);
  if (audit.error) throw new Error(`Could not load the match audit: ${audit.error.message}`);
  if (fairness.error) throw new Error(`Could not load match rates: ${fairness.error.message}`);
  const opportunities = auditByOpportunity((audit.data ?? []) as AuditRow[]);
  const dims = matchFairness((fairness.data ?? []) as FunnelRow[]);
  const flags = dims.reduce((a, d) => a + d.flags, 0);

  if (!opportunities.length) {
    return (
      <section className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
        <h2 className="text-h3 text-content">Nothing to audit yet</h2>
        <p className="max-w-reading text-content-2">
          This fills in once signed in learners open opportunities or apply on SydCrest.
        </p>
      </section>
    );
  }

  const bandColumns: Column<BandLine>[] = [
    { header: "Band", cell: (b) => <span className="font-semibold text-content">{auditBandLabel(b.band)}</span>, className: "min-w-0 flex-1" },
    { header: "Shown", cell: (b) => formatCount(b.shown), align: "end" },
    { header: "Applied", cell: (b) => formatCount(b.applied), align: "end" },
    { header: "Shortlisted", cell: (b) => formatCount(b.shortlisted), align: "end", phone: "hide" },
    { header: "Hired", cell: (b) => formatCount(b.hired), align: "end", phone: "hide" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section
        aria-labelledby="check-heading"
        className={`flex flex-col gap-2 rounded-lg border p-5 xl:p-6 ${flags ? "border-warning-fg bg-warning-bg" : "border-line bg-surface"}`}
      >
        <h2 id="check-heading" className="text-h3 text-content">
          {flags ? `Match rates: ${flags} ${flags === 1 ? "group differs" : "groups differ"}` : "Match rates: no group stands out"}
        </h2>
        <p className="max-w-reading text-content-2">
          A group is flagged when its apply, shortlist or hire rate differs from the rate for its whole dimension by more than{" "}
          {Math.round(MATCH_RATE_GAP * 100)} points. Rates need at least {MIN_SAMPLE} people (shown for the apply rate, applied for
          the others), so smaller groups show {NOT_ENOUGH.toLowerCase()} and are never flagged.
        </p>
      </section>

      <section aria-labelledby="groups-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 id="groups-heading" className="text-subtitle text-content">
            Rates by group
          </h2>
          <p className="max-w-reading text-sm text-content-2">
            Every learner and opportunity pair counts once. These are the readiness fairness groups, read here only to check matching;
            none of them is a match input. Gender, ethnicity, religion and disability are not collected, so they cannot be checked.
          </p>
        </div>
        <div className="grid gap-8 xl:grid-cols-2">
          {dims.map((d) => (
            <DimensionTable key={d.dimension} report={d} />
          ))}
        </div>
      </section>

      <section aria-labelledby="per-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 id="per-heading" className="text-subtitle text-content">
            Per opportunity
          </h2>
          <p className="max-w-reading text-sm text-content-2">
            Who was shown each opportunity (opened it while signed in, or applied), who applied, was shortlisted (or went further) and
            was hired on SydCrest, by their readiness band for its track today.
          </p>
        </div>
        <div className="grid gap-8 xl:grid-cols-2">
          {opportunities.map((o) => (
            <section key={o.id} aria-label={o.title} data-testid="audit-opportunity" className="flex flex-col gap-3">
              <div>
                <h3 className="text-h3 text-content">{o.title}</h3>
                <p className="text-sm text-content-2">
                  {o.organisation_name}: {formatCount(o.totals.shown)} shown, {formatCount(o.totals.applied)} applied,{" "}
                  {formatCount(o.totals.shortlisted)} shortlisted, {formatCount(o.totals.hired)} hired
                </p>
              </div>
              <DataTable caption={`${o.title} by band`} columns={bandColumns} rows={o.bands} rowKey={(b) => b.band} />
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Matching audit (#336): per opportunity, who was shown, applied, shortlisted
 * and hired by readiness band, and the same rates by the readiness fairness
 * groups. Model card: docs/readiness.md, "Matching".
 */
export default function AdminMatchingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Matching</h1>
        <p className="max-w-reading text-lead text-content-2">
          The match score orders suggestions for each learner: their readiness for the opportunity&apos;s track plus{" "}
          {MATCH_WEIGHTS.skill_bonus} points for each skill it needs that they have verified. It never hides a listing. This page
          checks who it reaches and how they fare.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Audit />
      </Suspense>
    </div>
  );
}
