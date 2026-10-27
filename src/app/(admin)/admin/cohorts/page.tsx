import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, MainWithRail, rowLinkClass } from "@/components/ui/layout";
import { Card, EmptyState, Pill } from "@/components/mentor/fields";
import { requireAdmin } from "@/lib/admin";
import { shortDate } from "@/lib/mentor/data";
import { COHORT_STATUS_LABEL, type CohortStatus } from "@/lib/mentor/progress";
import { createCohort } from "./actions";
import { CohortForm } from "./forms";

export const metadata: Metadata = { title: "Cohorts" };

export default function CohortsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-title text-content">Cohorts</h1>
      <Suspense fallback={<div aria-busy="true" className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Cohorts />
      </Suspense>
    </div>
  );
}

async function Cohorts() {
  const { supabase } = await requireAdmin();
  const [{ data: cohorts, error }, { data: programs }, { data: members }] = await Promise.all([
    supabase.from("cohorts").select("id, name, starts_on, max_size, status, program_id, programs!inner(title)").order("starts_on", { ascending: false }),
    supabase.from("programs").select("id, title, default_cohort_size").order("title"),
    supabase.from("cohort_members").select("cohort_id, role, status"),
  ]);
  if (error) throw new Error(`Could not load cohorts: ${error.message}`);

  const count = (cohortId: string, pred: (m: { role: string; status: string }) => boolean) =>
    (members ?? []).filter((m) => m.cohort_id === cohortId && pred(m)).length;

  const rows = (cohorts ?? []).map((c) => ({
    ...c,
    programTitle: (c.programs as unknown as { title: string }).title,
    learners: count(c.id, (m) => m.role === "learner" && m.status === "active"),
    staff: count(c.id, (m) => m.role !== "learner"),
  }));

  return (
    <MainWithRail
      railLabel="New cohort"
      rail={
        <Card title="New cohort">
          {(programs ?? []).length === 0 ? (
            <p className="text-sm text-content-2">Add a programme first. Cohorts belong to a programme.</p>
          ) : (
            <CohortForm action={createCohort} programs={programs ?? []} submitLabel="Create cohort" />
          )}
        </Card>
      }
    >
      {rows.length === 0 ? (
        <EmptyState title="No cohorts yet">Create the first one with the form. You can add mentors and coordinators next.</EmptyState>
      ) : (
        <DataTable
          caption="Cohorts, newest start first"
          rowKey={(c) => c.id}
          rows={rows}
          columns={[
            {
              header: "Cohort",
              cell: (c) => (
                <Link href={`/admin/cohorts/${c.id}`} className={`font-semibold text-content ${rowLinkClass}`}>
                  {c.name}
                </Link>
              ),
            },
            { header: "Programme", phone: "hide", cell: (c) => <span className="text-sm text-content-2">{c.programTitle}</span> },
            { header: "Starts", phone: "hide", cell: (c) => <span className="text-sm text-content-2">{shortDate(c.starts_on)}</span> },
            {
              header: "Status",
              cell: (c) => (
                <Pill tone={c.status === "running" ? "success" : c.status === "enrolling" ? "info" : "neutral"}>
                  {COHORT_STATUS_LABEL[c.status as CohortStatus] ?? c.status}
                </Pill>
              ),
            },
            {
              header: "Learners",
              align: "end",
              phone: "hide",
              cell: (c) => (
                <span className="text-sm text-content">
                  {c.learners} of {c.max_size}
                </span>
              ),
            },
            {
              header: "Staff",
              align: "end",
              phone: "hide",
              cell: (c) => <span className={`text-sm ${c.staff ? "text-content" : "font-semibold text-danger-fg"}`}>{c.staff || "None"}</span>,
            },
          ]}
        />
      )}
    </MainWithRail>
  );
}
