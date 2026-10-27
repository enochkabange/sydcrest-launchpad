import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getMyProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Alert } from "@/components/ui/alert";
import { formatRate, formatWeek, funnelTotals } from "@/lib/analytics/funnel";

export const metadata: Metadata = { title: "Funnel", robots: { index: false } };

const WEEKS = 12;

/** Reads the session and the funnel, so it streams in behind Suspense. */
async function FunnelTable() {
  // Own admin check: the funnel function refuses non admins too, but a
  // learner should see a plain 404, not an error.
  const profile = await getMyProfile();
  if (profile.role !== "admin") notFound();

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("funnel_by_week", { p_weeks: WEEKS });
  if (error) {
    console.error("funnel_by_week failed", { code: error.code, message: error.message });
    return <Alert tone="danger">We couldn&apos;t load the funnel. Try again in a moment.</Alert>;
  }

  const weeks = data ?? [];
  const totals = funnelTotals(weeks);

  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "Visitors", value: totals.visits, note: `Last ${WEEKS} weeks` },
          { label: "Sign ups", value: totals.signups, note: totals.visits ? `${formatRate(totals.signups, totals.visits)} of visitors` : "No visitors yet" },
          {
            label: "Activated",
            value: totals.activations,
            note: totals.signups ? `${formatRate(totals.activations, totals.signups)} of sign ups` : "No sign ups yet",
          },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 rounded-lg border border-line p-4">
            <dt className="text-sm text-content-2">{stat.label}</dt>
            <dd className="text-3xl text-content tabular-nums">{stat.value}</dd>
            <dd className="text-sm text-content-2">{stat.note}</dd>
          </div>
        ))}
      </dl>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Visitors, sign ups and activations by week, newest first</caption>
          <thead className="bg-surface-sunken text-content-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Week of</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold whitespace-nowrap">Visitors</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold whitespace-nowrap">Sign ups</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold whitespace-nowrap">Activated</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold whitespace-nowrap">Visit to sign up</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold whitespace-nowrap">Sign up to activated</th>
            </tr>
          </thead>
          <tbody className="text-content tabular-nums">
            {weeks.map((w) => (
              <tr key={w.week_start} className="border-t border-line">
                <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">{formatWeek(w.week_start)}</th>
                <td className="px-4 py-3 text-right">{w.visits}</td>
                <td className="px-4 py-3 text-right">{w.signups}</td>
                <td className="px-4 py-3 text-right">{w.activations}</td>
                <td className="px-4 py-3 text-right text-content-2">{formatRate(w.signups, w.visits)}</td>
                <td className="px-4 py-3 text-right text-content-2">{formatRate(w.activations, w.signups)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Admin only: visit to sign up to activation (first node completed), by week.
 * First party events only; no third party trackers.
 */
export default function FunnelPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-content">Funnel</h1>
        <p className="text-content-2">
          Visitors are distinct browsers that viewed a page. Sign ups count new accounts. Activated
          counts learners whose first completed node fell in that week. Weeks start on Monday.
          Rates compare counts within the same week.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <FunnelTable />
      </Suspense>
    </div>
  );
}
