import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { describeSplit, parseVariants } from "@/lib/experiments/assign";
import { METRIC_LABELS, STATUS_LABELS } from "@/lib/experiments/report";
import { formatDay } from "@/lib/insights/filters";
import { AdminOnly } from "../admin-only";
import { NewExperimentForm, StatusForm } from "./forms";

export const metadata: Metadata = {
  title: "Experiments",
  robots: { index: false },
};

const ORDER: Record<string, number> = { running: 0, draft: 1, stopped: 2 };

async function ExperimentList() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("experiments")
    .select(
      "id, key, description, variants, status, metric, started_at, stopped_at, created_at",
    )
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load experiments: ${error.message}`);
  const experiments = [...data].sort(
    (a, b) => (ORDER[a.status] ?? 3) - (ORDER[b.status] ?? 3),
  );

  if (experiments.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line-strong bg-surface-sunken p-5 text-content-2">
        No experiments yet. Create one with the form; it starts as a draft.
      </p>
    );
  }
  return (
    <ul className="flex flex-col gap-4" aria-label="Experiments">
      {experiments.map((e) => {
        const variants = parseVariants(e.variants);
        return (
          <li
            key={e.id}
            className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5 md:flex-row md:items-start md:justify-between"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="text-subtitle break-all text-content">{e.key}</h3>
              <p className="text-sm font-semibold text-content-2">
                {STATUS_LABELS[e.status] ?? e.status}
                {e.started_at
                  ? ` since ${formatDay(e.started_at.slice(0, 10))}`
                  : ""}
                {e.stopped_at
                  ? `, stopped ${formatDay(e.stopped_at.slice(0, 10))}`
                  : ""}
              </p>
              {e.description && (
                <p className="max-w-reading text-content-2">{e.description}</p>
              )}
              <p className="text-sm text-content-2">
                Split: {variants ? describeSplit(variants) : "not readable"} ·{" "}
                {METRIC_LABELS[e.metric] ?? e.metric}
              </p>
            </div>
            <div className="shrink-0">
              <StatusForm id={e.id} status={e.status} label={e.key} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Admin: create, start and stop experiments, holdouts and feature flags (issue #327). */
export default function AdminExperimentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Experiments</h1>
        <p className="max-w-reading text-content-2">
          Test a change on a random share of people, hold a share back from a
          message, or roll a feature out bit by bit. Each person always gets the
          same variant. Never test prices or access to learning. Results are on
          the{" "}
          <Link href="/admin/insights/experiments">Experiments dashboard</Link>.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />
        }
      >
        <AdminOnly>
          <MainWithRail
            railLabel="New experiment"
            rail={
              <section
                aria-labelledby="new-heading"
                className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5"
              >
                <h2 id="new-heading" className="text-subtitle text-content">
                  New experiment
                </h2>
                <NewExperimentForm />
              </section>
            }
          >
            <section
              aria-labelledby="list-heading"
              className="flex flex-col gap-4"
            >
              <h2 id="list-heading" className="text-subtitle text-content">
                All experiments
              </h2>
              <Suspense
                fallback={
                  <div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />
                }
              >
                <ExperimentList />
              </Suspense>
            </section>
          </MainWithRail>
        </AdminOnly>
      </Suspense>
    </div>
  );
}
