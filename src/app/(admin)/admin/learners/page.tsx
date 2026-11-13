import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, rowLinkClass, type Column } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { STAGES, daysAgo, isStage, percent, stageLabel } from "@/lib/learners/attributes";
import { regionLabel } from "@/lib/regions";
import type { Database } from "@/lib/supabase/database.types";

export const metadata: Metadata = { title: "Learners", robots: { index: false } };

type Row = Database["public"]["Functions"]["admin_learners"]["Returns"][number];

function one(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

async function List({ searchParams }: Pick<PageProps<"/admin/learners">, "searchParams">) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const stage = isStage(one(params.stage)) ? one(params.stage) : null;
  const q = one(params.q).trim().slice(0, 120);
  const { data, error } = await supabase.rpc("admin_learners", { p_stage: stage ?? undefined, p_search: q || undefined, p_limit: 200 });
  if (error) throw new Error(`Could not load learners: ${error.message}`);
  const rows = data ?? [];
  const today = new Date().toISOString().slice(0, 10);

  const columns: Column<Row>[] = [
    {
      header: "Learner",
      cell: (r) => (
        <span className="flex min-w-0 flex-col">
          <Link href={`/admin/learners/${r.profile_id}`} className={`font-semibold text-content ${rowLinkClass}`}>
            {r.display_name || "No name yet"}
          </Link>
          <span className="text-sm text-content-2">
            {stageLabel(r.stage)} · {regionLabel(r.region) || "No region"}
          </span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Last active", cell: (r) => daysAgo(r.last_active_on, today), align: "end", phone: "hide" },
    { header: "Active days (30)", cell: (r) => r.active_days_30, align: "end", phone: "hide" },
    { header: "Topics done", cell: (r) => r.topics_completed, align: "end", phone: "hide" },
    { header: "On time", cell: (r) => percent(r.on_time_rate), align: "end", phone: "hide" },
    { header: "First came from", cell: (r) => r.first_touch_source ?? "–", align: "end", phone: "hide", className: "text-content-2" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Stage" className="flex flex-wrap gap-1">
        {[{ value: "", label: "Everyone" }, ...STAGES].map((s) => {
          const current = (stage ?? "") === s.value;
          const href = `/admin/learners${s.value ? `?stage=${s.value}` : ""}`;
          return (
            <Link
              key={s.value || "all"}
              href={href}
              aria-current={current ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
                current ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </nav>
      <form role="search" action="/admin/learners" className="flex flex-wrap items-end gap-2">
        {stage && <input type="hidden" name="stage" value={stage} />}
        <label htmlFor="q" className="flex min-w-0 flex-1 flex-col gap-1 text-sm font-semibold text-content-2">
          Name or exact email
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            className="min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content"
          />
        </label>
        <button type="submit" className="min-h-11 rounded-md border border-line-strong px-4 text-sm font-semibold text-content">
          Search
        </button>
      </form>
      {rows.length === 0 ? (
        <p className="text-content-2">No learners match. Attributes are computed daily, so someone who joined today appears tomorrow.</p>
      ) : (
        <DataTable caption="Learners" columns={columns} rows={rows} rowKey={(r) => r.profile_id} />
      )}
    </div>
  );
}

/** Admin: every member's computed learner attributes, by stage (epic #320 step 4). */
export default function LearnersPage({ searchParams }: PageProps<"/admin/learners">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Learners</h1>
        <p className="max-w-reading text-content-2">
          Computed once a day from progress, submissions, events and applications. Open a learner to see their timeline.
          Stages: {STAGES.map((s) => `${s.label.toLowerCase()} (${s.hint.toLowerCase()})`).join("; ")}.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <List searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
