import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "@/components/ui/link";
import { ImpactReport } from "@/components/outcomes/impact-report";
import { PrintButton } from "@/components/outcomes/print-button";
import { requireAdmin } from "@/lib/admin";
import { requireUser } from "@/lib/auth";
import { parseCheckinMonths } from "@/lib/outcomes/checkins";
import { formatDay } from "@/lib/outcomes/labels";
import { adminReport, isReportScope, scopeName, sponsorReport } from "@/lib/outcomes/reports";
import { todayIso } from "@/lib/outcomes/validation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Impact report", robots: { index: false } };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * The printable impact report: ?sponsorship=<id> for a sponsor (its owners
 * and admins, and SydCrest admins), or ?scope=cohort|programme|chapter&id=<id>
 * for admins. &months=3|6|12, 6 by default.
 */
async function Report({ searchParams }: Pick<PageProps<"/print/outcomes">, "searchParams">) {
  const params = await searchParams;
  const months = parseCheckinMonths(params.months);
  const sponsorship = one(params.sponsorship);
  const scope = one(params.scope);
  const id = one(params.id);

  let title: string;
  let loaded: Awaited<ReturnType<typeof adminReport>> | null;
  let back: string;
  if (sponsorship && UUID.test(sponsorship)) {
    await requireUser();
    const supabase = await createClient();
    const { data: s } = await supabase
      .from("sponsorships")
      .select("scope, program_id, cohort_id, chapter_id, organisations(name, slug)")
      .eq("id", sponsorship)
      .maybeSingle();
    if (!s) notFound();
    loaded = await sponsorReport(supabase, sponsorship, months);
    if (!loaded) notFound();
    const covered = await scopeName(supabase, s.scope as "programme" | "cohort" | "chapter", (s.program_id ?? s.cohort_id ?? s.chapter_id)!);
    title = `${covered ?? "Sponsorship"}, for ${s.organisations?.name ?? "the sponsor"}`;
    back = `/org/${s.organisations?.slug ?? ""}/impact`;
  } else if (isReportScope(scope) && id && UUID.test(id)) {
    const { supabase } = await requireAdmin();
    const covered = await scopeName(supabase, scope, id);
    if (!covered) notFound();
    loaded = await adminReport(supabase, scope, id, months);
    title = covered;
    back = `/admin/check-ins?report=${scope}:${id}&months=${months}`;
  } else {
    notFound();
  }

  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={back} className="inline-flex min-h-11 items-center text-sm font-semibold text-content-2 hover:text-content">
          Back
        </Link>
        <PrintButton />
      </div>
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-content-2">SydCrest Launchpad impact report</p>
        <h1 className="text-title text-content">{title}</h1>
        <p className="text-content-2">
          {months} month outcome check ins, as of {formatDay(todayIso())}.
        </p>
      </header>
      <ImpactReport report={loaded.report} months={months} stories={loaded.stories} idPrefix="print" />
      <footer className="border-t border-line pt-4 text-sm text-content-3">
        Learners are asked 3, 6 and 12 months after they finish. Numbers are totals; names appear only with stories learners
        chose to share by name.
      </footer>
    </article>
  );
}

export default function PrintOutcomesPage({ searchParams }: PageProps<"/print/outcomes">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Report searchParams={searchParams} />
    </Suspense>
  );
}
