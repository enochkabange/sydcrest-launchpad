import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, MainWithRail, rowLinkClass } from "@/components/ui/layout";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { PortfolioToggle, SubmissionStatusBadge } from "@/components/cohort/submission";
import { buttonClasses } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { listMyWork, type WorkListItem } from "@/lib/submissions/queries";

export const metadata: Metadata = { title: "Your work" };

export default function WorkPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Your work</h1>
        <p className="max-w-reading text-lead text-content-2">
          Every assignment you have started, with its feedback and score. Graded work can go in your portfolio.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <WorkList />
      </Suspense>
    </div>
  );
}

function score(row: WorkListItem) {
  if (typeof row.finalScore === "number") return `${row.finalScore}`;
  if (typeof row.aiScore === "number") return `${row.aiScore} suggested`;
  return "Not scored";
}

async function WorkList() {
  const user = await requireUser();
  const work = await listMyWork(user.id);

  if (!work.length) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border border-dashed border-line-strong bg-surface-sunken p-6 lg:p-10">
        <h2 className="text-subtitle text-content">No work yet</h2>
        <p className="max-w-reading text-content-2">
          When you start a week&apos;s assignment in your cohort, it shows up here with its AI feedback, your mentor&apos;s
          feedback and your score.
        </p>
        <Link href="/cohort" className={buttonClasses("primary")}>
          Go to your cohort
        </Link>
      </div>
    );
  }

  const graded = work.filter((w) => w.status === "graded");
  const inPortfolio = graded.filter((w) => w.inPortfolio).length;

  return (
    <MainWithRail
      railLabel="Portfolio"
      rail={
        <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 lg:p-5">
          <h2 className="text-h3 text-content">Portfolio</h2>
          <p className="text-sm text-content-2">
            {graded.length === 0
              ? "Work can go in your portfolio once your mentor has graded it."
              : `${inPortfolio} of ${graded.length} graded ${graded.length === 1 ? "piece is" : "pieces are"} in your portfolio.`}
          </p>
          <p className="text-sm text-content-3">
            Your portfolio is the work you choose to show. People who view your public profile will be able to see it.
          </p>
        </section>
      }
    >
      <DataTable<WorkListItem>
        caption="Your assignments"
        rows={work}
        rowKey={(r) => r.id}
        columns={[
          {
            header: "Week",
            cell: (r) => (
              <Link href={`/cohort/work/${r.weekId}`} className={`flex flex-col font-semibold text-content ${rowLinkClass}`}>
                <span className="text-sm text-content-3 md:hidden">Week {r.weekNumber}</span>
                <span className="hidden md:inline">Week {r.weekNumber}</span>
                <span className="text-sm font-normal text-content-2 md:hidden">{displayTheme(r.theme)}</span>
              </Link>
            ),
            className: "min-w-0 flex-1 md:w-24 md:flex-none",
          },
          { header: "Theme", cell: (r) => <span className="text-content-2">{displayTheme(r.theme)}</span>, phone: "hide" },
          { header: "Status", cell: (r) => <SubmissionStatusBadge status={r.status} />, className: "shrink-0" },
          {
            header: "Score",
            cell: (r) => <span className="tabular-nums text-content-2">{score(r)}</span>,
            align: "end",
            phone: "hide",
          },
          {
            header: "Portfolio",
            cell: (r) =>
              r.status === "graded" ? (
                <div className="relative z-10">
                  <PortfolioToggle submissionId={r.id} inPortfolio={r.inPortfolio} compact />
                </div>
              ) : (
                <span className="text-sm text-content-3">After grading</span>
              ),
            phone: "hide",
          },
        ]}
      />
    </MainWithRail>
  );
}
