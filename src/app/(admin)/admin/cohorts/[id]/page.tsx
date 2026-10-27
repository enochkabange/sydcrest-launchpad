import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/layout";
import { Card, EmptyState, Pill } from "@/components/mentor/fields";
import { requireAdmin } from "@/lib/admin";
import { nameOf, shortDate, type RosterRow } from "@/lib/mentor/data";
import { MEMBER_STATUS_LABEL, ROLE_LABEL } from "@/lib/mentor/progress";
import { addStaff, removeStaff, setStaffRole, updateCohort } from "../actions";
import { AddStaffForm, CohortForm } from "../forms";

export const metadata: Metadata = { title: "Edit cohort" };

export default function CohortPage({ params }: PageProps<"/admin/cohorts/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/cohorts" className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-semibold text-content-2 hover:text-content">
        <ChevronLeft aria-hidden="true" className="size-4" />
        Cohorts
      </Link>
      <Suspense fallback={<div aria-busy="true" className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Editor params={params} />
      </Suspense>
    </div>
  );
}

async function Editor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const [{ data: cohort }, { data: roster }] = await Promise.all([
    supabase.from("cohorts").select("id, name, starts_on, max_size, status, program_id, programs!inner(title)").eq("id", id).maybeSingle(),
    supabase.from("cohort_roster").select("*").eq("cohort_id", id),
  ]);
  if (!cohort) notFound();
  const members = (roster ?? []) as RosterRow[];
  const staff = members.filter((m) => m.role !== "learner");
  const learners = members.filter((m) => m.role === "learner");
  const programTitle = (cohort.programs as unknown as { title: string }).title;

  return (
    <>
      <header className="flex flex-col gap-1">
        <h1 className="text-title text-content">{cohort.name}</h1>
        <p className="text-lead text-content-2">
          {programTitle}. Starts {shortDate(cohort.starts_on)}.{" "}
          <Link href={`/mentor?cohort=${cohort.id}`} className="text-content-link underline">
            Open in the mentor console
          </Link>
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-10">
        <Card title="Details">
          <CohortForm action={updateCohort.bind(null, cohort.id)} programs={[]} cohort={cohort} submitLabel="Save cohort" />
        </Card>
        <div className="flex flex-col gap-6">
          <section aria-labelledby="staff-heading" className="flex flex-col gap-3">
            <h2 id="staff-heading" className="text-subtitle text-content">
              Mentors and coordinators
            </h2>
            {staff.length === 0 ? (
              <EmptyState title="No staff yet">Add at least one mentor so learners have someone to grade their work.</EmptyState>
            ) : (
              <DataTable
                caption="Staff of this cohort"
                rowKey={(m) => m.member_id}
                rows={staff}
                columns={[
                  { header: "Name", cell: (m) => <span className="font-semibold text-content">{nameOf(m)}</span> },
                  { header: "Role", cell: (m) => <Pill>{ROLE_LABEL[m.role] ?? m.role}</Pill> },
                  {
                    header: "Actions",
                    align: "end",
                    cell: (m) => {
                      const other = m.role === "mentor" ? "coordinator" : "mentor";
                      return (
                        <div className="flex flex-wrap justify-end gap-1">
                          <form action={setStaffRole.bind(null, m.member_id, other)}>
                            <Button type="submit" variant="ghost">
                              Make {other}
                              <span className="sr-only">: {nameOf(m)}</span>
                            </Button>
                          </form>
                          <form action={removeStaff.bind(null, m.member_id)}>
                            <Button type="submit" variant="ghost">
                              Remove<span className="sr-only"> {nameOf(m)}</span>
                            </Button>
                          </form>
                        </div>
                      );
                    },
                  },
                ]}
              />
            )}
            <Card title="Add a mentor or coordinator">
              <AddStaffForm action={addStaff.bind(null, cohort.id)} />
            </Card>
          </section>
          <section aria-labelledby="learners-heading" className="flex flex-col gap-3">
            <h2 id="learners-heading" className="text-subtitle text-content">
              Learners ({learners.filter((l) => l.status === "active").length} of {cohort.max_size} places)
            </h2>
            {learners.length === 0 ? (
              <EmptyState title="No learners yet">Learners join when an application is accepted into this cohort.</EmptyState>
            ) : (
              <DataTable
                caption="Learners in this cohort"
                rowKey={(m) => m.member_id}
                rows={learners}
                columns={[
                  { header: "Name", cell: (m) => <span className="text-content">{nameOf(m)}</span> },
                  { header: "Status", align: "end", cell: (m) => <Pill>{MEMBER_STATUS_LABEL[m.status] ?? m.status}</Pill> },
                ]}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
}
