import type { Metadata } from "next";
import { Suspense } from "react";
import { StatusLabel } from "@/components/opportunities/meta";
import { opportunitiesPath, opportunityPath, savedOpportunitiesPath } from "@/components/opportunities/paths";
import { SaveControls } from "@/components/opportunities/save-controls";
import { SuggestedForYou } from "@/components/opportunities/suggested";
import { buttonClasses } from "@/components/ui/button";
import { DataTable, MainWithRail, rowLinkClass, type Column } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { requireUser } from "@/lib/auth";
import { getMySavedOpportunities, type SavedOpportunity } from "@/lib/opportunities/learner";
import { accraToday, deadlineLabel, kindLabel } from "@/lib/opportunities/model";

export const metadata: Metadata = { title: "Saved opportunities" };

/**
 * The learner's private list (issue #159): saved and applied opportunities,
 * with suggestions from their path in the rail. Only the learner sees it.
 */
export default function SavedOpportunitiesPage() {
  return (
    <MainWithRail
      railLabel="Suggested for you"
      rail={
        <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <SuggestedForYou variant="rail" />
        </Suspense>
      }
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Saved opportunities</h1>
        <p className="max-w-reading text-lead text-content-2">
          Keep track of what you want to apply for and what you have applied for. Only you can see this list.
        </p>
      </div>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <SavedList />
      </Suspense>
    </MainWithRail>
  );
}

async function SavedList() {
  const user = await requireUser();
  const saved = await getMySavedOpportunities(user.id);
  const today = accraToday();

  if (!saved.length) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-content">Nothing saved yet.</p>
          <p className="max-w-reading text-content-2">
            Save opportunities from the board to come back to them, then mark them as applied once you have sent your
            application.
          </p>
        </div>
        <Link href={opportunitiesPath} className={buttonClasses("primary", "shrink-0")}>
          Browse opportunities
        </Link>
      </div>
    );
  }

  const applied = saved.filter((s) => s.status === "applied").length;
  const columns: Column<SavedOpportunity>[] = [
    {
      header: "Opportunity",
      cell: ({ opportunity: o }) => (
        <span className="flex min-w-0 flex-col">
          <Link href={opportunityPath(o.slug)} className={`font-semibold text-content ${rowLinkClass}`}>
            {o.title}
          </Link>
          <span className="text-sm text-content-2">
            {o.organisation_name}, {kindLabel(o.kind).toLowerCase()}
          </span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Status", cell: (s) => <StatusLabel status={s.status} />, className: "shrink-0" },
    {
      header: "Deadline",
      cell: ({ opportunity: o }) => deadlineLabel(o.deadline, today),
      className: "text-sm text-content-2 md:whitespace-nowrap",
      phone: "hide",
    },
    {
      header: "Actions",
      cell: (s) => (
        <span className="relative z-10 block">
          <SaveControls opportunityId={s.opportunity.id} title={s.opportunity.title} status={s.status} back={savedOpportunitiesPath} compact />
        </span>
      ),
      phone: "hide",
    },
  ];

  return (
    <section aria-labelledby="saved-heading" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="saved-heading" className="text-subtitle text-content">
          Your list
        </h2>
        <p className="text-sm text-content-2">
          {saved.length} saved, {applied} applied
        </p>
      </div>
      <DataTable caption="Your saved opportunities" columns={columns} rows={saved} rowKey={(s) => s.opportunity.id} />
      <p className="text-sm text-content-3">Opportunities leave this list once they close or their deadline passes.</p>
    </section>
  );
}
