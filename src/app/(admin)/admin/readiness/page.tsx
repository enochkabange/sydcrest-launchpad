import type { Metadata } from "next";
import { Suspense } from "react";
import { DataTable, type Column } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { enough, formatCount, formatShare, MIN_SAMPLE, NOT_ENOUGH, rate } from "@/lib/insights/metrics";
import { deviceLabel } from "@/lib/learners/attributes";
import { EDUCATION, INTERNET } from "@/lib/learner-profile";
import {
  BANDS,
  FAIRNESS_GAP,
  fairnessReport,
  histogram,
  PARTS,
  WEIGHTS,
  type DimensionReport,
  type GroupLine,
  type ReportRow,
} from "@/lib/readiness/score";
import { regionLabel } from "@/lib/regions";

export const metadata: Metadata = { title: "Readiness", robots: { index: false } };

const AGE_LABELS: Record<string, string> = { "18_24": "18 to 24", "25_29": "25 to 29", "30_34": "30 to 34", "35_plus": "35 and over" };

function groupLabel(dimension: string, grp: string, titles: Map<string, string>): string {
  if (grp === "unknown") return "Not known";
  switch (dimension) {
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
    case "track":
      return titles.get(grp) ?? grp;
    default:
      return grp;
  }
}

function average(value: number | null): string {
  return value === null ? NOT_ENOUGH : value.toFixed(1);
}

function gapText(g: GroupLine): string {
  if (g.gap === null) return "–";
  const points = Math.abs(g.gap).toFixed(1);
  return g.gap >= 0 ? `+${points}` : `−${points}`;
}

function shareOf(part: number, whole: number): string {
  const r = rate(part, whole);
  return r === null ? "–" : formatShare(r);
}

function Tile({ value, label, detail }: { value: string; label: string; detail?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <span className="text-3xl font-bold text-content tabular-nums">{value}</span>
      <span className="text-sm font-semibold text-content">{label}</span>
      {detail && <span className="text-sm text-content-2">{detail}</span>}
    </div>
  );
}

function DimensionTable({ report, titles }: { report: DimensionReport; titles: Map<string, string> }) {
  const columns: Column<GroupLine>[] = [
    {
      header: "Group",
      cell: (g) => (
        <span className="font-semibold text-content">
          {groupLabel(report.dimension, g.grp, titles)}
          {g.flagged && <span className="ml-2 rounded-sm bg-warning-bg px-1.5 py-0.5 text-xs text-warning-fg">Check</span>}
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Learners", cell: (g) => formatCount(g.learners), align: "end" },
    { header: "Average", cell: (g) => average(g.average), align: "end", phone: "hide" },
    { header: "Gap", cell: (g) => gapText(g), align: "end", phone: "hide" },
    ...BANDS.map(
      (b): Column<GroupLine> => ({
        header: b.label,
        cell: (g) => shareOf(g[b.value], g.learners),
        align: "end",
        phone: "hide",
      }),
    ),
    {
      header: "Summary",
      cell: (g) => <span className="text-sm text-content-2 tabular-nums">{average(g.average)}</span>,
      align: "end",
      phone: "only",
    },
  ];
  return (
    <section aria-labelledby={`dim-${report.dimension}`} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={`dim-${report.dimension}`} className="text-h3 text-content">
          {report.label}
        </h3>
        <p className="text-sm text-content-2">
          Average {average(report.average)}
          {report.flags > 0 ? `, ${report.flags} ${report.flags === 1 ? "group" : "groups"} to check` : ""}
        </p>
      </div>
      {report.groups.length ? (
        <DataTable caption={`Readiness by ${report.label.toLowerCase()}`} columns={columns} rows={report.groups} rowKey={(g) => g.grp} />
      ) : (
        <p className="text-content-2">No scores yet.</p>
      )}
    </section>
  );
}

async function Report() {
  const { supabase } = await requireAdmin();
  const [{ data, error }, roadmaps] = await Promise.all([
    supabase.rpc("admin_readiness_report"),
    supabase.from("roadmaps").select("slug, title"),
  ]);
  if (error) throw new Error(`Could not load the readiness report: ${error.message}`);
  const rows = (data ?? []) as ReportRow[];
  const titles = new Map((roadmaps.data ?? []).map((r) => [r.slug, r.title]));
  const all = rows.find((r) => r.dimension === "all");
  const dims = fairnessReport(rows);
  const flags = dims.reduce((a, d) => a + d.flags, 0);
  const buckets = histogram(rows);
  const biggest = Math.max(1, ...buckets.map((b) => b.learners));

  if (!all) {
    return (
      <section className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
        <h2 className="text-h3 text-content">No scores yet</h2>
        <p className="max-w-reading text-content-2">
          Scores are worked out once a day for learners who have started a track or chosen one in About you. They appear here
          after the next daily run.
        </p>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <section
        aria-labelledby="check-heading"
        className={`flex flex-col gap-2 rounded-lg border p-5 xl:p-6 ${flags ? "border-warning-fg bg-warning-bg" : "border-line bg-surface"}`}
      >
        <h2 id="check-heading" className="text-h3 text-content">
          {flags ? `Fairness check: ${flags} ${flags === 1 ? "group differs" : "groups differ"}` : "Fairness check: passing"}
        </h2>
        <p className="max-w-reading text-content-2">
          A group is flagged when its average differs from the average for its whole dimension by more than {FAIRNESS_GAP} points.
          Groups under {MIN_SAMPLE} learners show {NOT_ENOUGH.toLowerCase()} and are never flagged. The score must not be shown to
          employers or used to rank anyone while a flag is open and unexplained.
        </p>
      </section>

      <section aria-labelledby="overall-heading" className="flex flex-col gap-3">
        <h2 id="overall-heading" className="text-subtitle text-content">
          All learners, at their best track
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:gap-6">
          <Tile value={formatCount(all.learners)} label="Learners scored" />
          <Tile value={average(enough(all.learners) ? all.score_sum / all.learners : null)} label="Average score" />
          {BANDS.map((b) => (
            <Tile
              key={b.value}
              value={shareOf(all[b.value], all.learners)}
              label={b.label}
              detail={`${formatCount(all[b.value])} learners`}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="spread-heading" className="flex flex-col gap-3">
        <h2 id="spread-heading" className="text-subtitle text-content">
          How scores spread
        </h2>
        <ol className="flex flex-col gap-1.5" aria-label="Learners by score, in steps of ten">
          {buckets.map((b) => (
            <li key={b.from} className="grid grid-cols-[5.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-sm">
              <span className="text-content-2 tabular-nums">
                {b.from} to {b.from === 90 ? 100 : b.from + 9}
              </span>
              <span className="h-3 rounded-sm bg-surface-sunken">
                <span className="block h-3 rounded-sm bg-action" style={{ width: `${(100 * b.learners) / biggest}%` }} />
              </span>
              <span className="text-end font-semibold text-content tabular-nums">{formatCount(b.learners)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="groups-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 id="groups-heading" className="text-subtitle text-content">
            By group
          </h2>
          <p className="max-w-reading text-sm text-content-2">
            These attributes are read here only to check the score; none of them is an input. Age comes from the date of birth given
            at sign up. Gender, ethnicity, religion and disability are not collected, so they cannot be checked. Track counts every
            track a learner has; the others count each learner once.
          </p>
        </div>
        <div className="grid gap-8 xl:grid-cols-2">
          {dims.map((d) => (
            <DimensionTable key={d.dimension} report={d} titles={titles} />
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Readiness score v1 for staff (epic #320 step 5) and its fairness report
 * (issue #328). Model card: docs/readiness.md. Not shown to learners or
 * employers until the founder approves the weights.
 */
export default function AdminReadinessPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Readiness</h1>
        <p className="max-w-reading text-lead text-content-2">
          A rule based score from 0 to 100 for each learner on each track they follow, and a check that it treats groups fairly.
          Staff only for now: the weights are a proposal waiting for approval.
        </p>
      </div>

      <section aria-labelledby="weights-heading" className="flex flex-col gap-3">
        <h2 id="weights-heading" className="text-subtitle text-content">
          How it is worked out
        </h2>
        <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
          {PARTS.map((p) => (
            <div key={p.key}>
              <dt className="font-semibold text-content">
                {p.label}: {WEIGHTS[p.key]} points
              </dt>
              <dd className="text-sm text-content-2">{p.source}</dd>
            </div>
          ))}
          <div>
            <dt className="font-semibold text-content">Bands</dt>
            <dd className="text-sm text-content-2">
              {BANDS.map((b) => `${b.label} from ${b.from}`).join(", ")}. A track with no skills mapped yet is scored out of the
              points it can give.
            </dd>
          </div>
        </dl>
        <p className="max-w-reading text-sm text-content-2">
          Never used: region, device, internet, study hours or times, age, education, work preferences or where someone first came
          from.
        </p>
      </section>

      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Report />
      </Suspense>
    </div>
  );
}
