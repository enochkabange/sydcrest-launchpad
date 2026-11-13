import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { ImpactReport } from "@/components/outcomes/impact-report";
import { requireAdmin } from "@/lib/admin";
import { CHECKIN_MONTHS, parseCheckinMonths, responseRate } from "@/lib/outcomes/checkins";
import { adminReport, isReportScope, scopeName } from "@/lib/outcomes/reports";

export const metadata: Metadata = { title: "Check ins", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SELECT = "min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content";

/** "cohort:<uuid>" from the picker, or null. */
function parseTarget(value: string | string[] | undefined) {
  const v = Array.isArray(value) ? value[0] : value;
  const [scope, id] = (v ?? "").split(":");
  return isReportScope(scope) && UUID.test(id ?? "") ? { scope, id } : null;
}

async function Totals() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.rpc("admin_outcome_checkin_totals");
  if (error) throw new Error(`Could not load check in totals: ${error.message}`);
  return (
    <section aria-labelledby="totals-heading" className="flex flex-col gap-3">
      <h2 id="totals-heading" className="text-subtitle text-content">
        All check ins
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {CHECKIN_MONTHS.map((m) => {
          const row = data.find((r) => r.months === m);
          return (
            <div key={m} className="flex flex-col gap-1 rounded-lg border border-line p-4">
              <h3 className="font-semibold text-content">{m} months</h3>
              <p className="text-sm text-content-2">
                Sent {row?.sent ?? 0}, skipped {row?.skipped ?? 0} (another check in went out in the last 60 days)
              </p>
              <p className="text-sm text-content-2">Answered {responseRate(row?.answered ?? 0, row?.sent ?? 0)}</p>
              <p className="text-sm text-content-2">Agreed to be counted: {row?.shared ?? 0}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

async function ReportSection({ searchParams }: Pick<PageProps<"/admin/check-ins">, "searchParams">) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const months = parseCheckinMonths(params.months);
  const target = parseTarget(params.report);

  const [programmes, cohorts, chapters] = await Promise.all([
    supabase.from("programs").select("id, title").order("title"),
    supabase.from("cohorts").select("id, name, programs(title)").order("starts_on", { ascending: false }),
    supabase.from("chapters").select("id, name").order("name"),
  ]);
  const name = target ? await scopeName(supabase, target.scope, target.id) : null;
  const loaded = target && name ? await adminReport(supabase, target.scope, target.id, months) : null;

  return (
    <section aria-labelledby="report-heading" className="flex flex-col gap-4">
      <h2 id="report-heading" className="text-subtitle text-content">
        Impact report
      </h2>
      <form method="get" className="grid items-end gap-3 md:grid-cols-[2fr_1fr_auto]">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="report" className="text-sm font-semibold text-content">
            Report for
          </label>
          <select id="report" name="report" defaultValue={target ? `${target.scope}:${target.id}` : ""} className={SELECT}>
            <option value="">Choose a cohort, programme or chapter</option>
            <optgroup label="Cohorts">
              {(cohorts.data ?? []).map((c) => (
                <option key={c.id} value={`cohort:${c.id}`}>
                  {c.programs?.title ?? "Programme"}, {c.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Programmes">
              {(programmes.data ?? []).map((p) => (
                <option key={p.id} value={`programme:${p.id}`}>
                  {p.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Chapters">
              {(chapters.data ?? []).map((c) => (
                <option key={c.id} value={`chapter:${c.id}`}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="months" className="text-sm font-semibold text-content">
            Check in
          </label>
          <select id="months" name="months" defaultValue={String(months)} className={SELECT}>
            {CHECKIN_MONTHS.map((m) => (
              <option key={m} value={m}>
                {m} months
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={buttonClasses("primary")}>
          Show report
        </button>
      </form>

      {target && loaded && name ? (
        <div className="flex flex-col gap-4 rounded-lg border border-line p-5 xl:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-h3 text-content">{name}</h3>
            <Link
              href={`/print/outcomes?scope=${target.scope}&id=${target.id}&months=${months}`}
              className={buttonClasses("secondary")}
            >
              Printable version
            </Link>
          </div>
          <ImpactReport report={loaded.report} months={months} stories={loaded.stories} idPrefix="admin" />
        </div>
      ) : (
        <p className="text-content-2">
          Choose what to report on. Sponsors see the same report under Impact on their organisation page, with any number under
          five held back.
        </p>
      )}
    </section>
  );
}

/** Outcome check ins (#329): totals per milestone, and the impact report for any programme, cohort or chapter. */
export default function AdminCheckinsPage({ searchParams }: PageProps<"/admin/check-ins">) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Check ins</h1>
        <p className="max-w-reading text-content-2">
          Learners are asked how they are doing 3, 6 and 12 months after they finish a cohort or a track. The daily job sends
          them in app, and on WhatsApp to learners who turned it on.
        </p>
      </div>
      <Suspense fallback={<div className="h-32 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Totals />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <ReportSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
