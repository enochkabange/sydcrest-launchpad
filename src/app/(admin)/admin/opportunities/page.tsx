import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { adminOpportunitiesPath } from "@/components/opportunities/paths";
import { buttonClasses } from "@/components/ui/button";
import { DataTable, rowLinkClass, type Column } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { requireAdmin } from "@/lib/admin";
import { accraToday, deadlineLabel, isOpenOn, kindLabel } from "@/lib/opportunities/model";

export const metadata: Metadata = { title: "Opportunities", robots: { index: false } };

const FILTERS = [
  { slug: "all", label: "All" },
  { slug: "open", label: "Open" },
  { slug: "draft", label: "Drafts" },
  { slug: "closed", label: "Closed" },
] as const;

type Row = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  status: string;
  deadline: string | null;
  organisation_name: string;
  organisation_id: string | null;
  updated_at: string;
};

export default function AdminOpportunitiesPage({ searchParams }: PageProps<"/admin/opportunities">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-title text-content">Opportunities</h1>
          <p className="max-w-reading text-content-2">
            Jobs, internships, scholarships, grants and gigs on the public board. Open posts show until their deadline;
            verified organisations post their own from their organisation area.
          </p>
        </div>
        <Link href={`${adminOpportunitiesPath}/new`} className={buttonClasses("primary", "self-start md:self-auto")}>
          <Plus aria-hidden className="size-4" />
          Post an opportunity
        </Link>
      </div>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <List searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function List({ searchParams }: Pick<PageProps<"/admin/opportunities">, "searchParams">) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const raw = Array.isArray(params.status) ? params.status[0] : params.status;
  const filter = FILTERS.find((f) => f.slug === raw)?.slug ?? "all";

  let query = supabase
    .from("opportunities")
    .select("id, slug, title, kind, status, deadline, organisation_name, organisation_id, updated_at")
    .order("updated_at", { ascending: false })
    .limit(500);
  if (filter !== "all") query = query.eq("status", filter);
  const { data, error } = await query;
  if (error) throw new Error(`Could not load opportunities: ${error.message}`);
  const rows: Row[] = data ?? [];
  const today = accraToday();

  const columns: Column<Row>[] = [
    {
      header: "Opportunity",
      cell: (r) => (
        <span className="flex min-w-0 flex-col">
          <Link href={`${adminOpportunitiesPath}/${r.id}`} className={`font-semibold text-content ${rowLinkClass}`}>
            {r.title}
          </Link>
          <span className="text-sm text-content-2">
            {r.organisation_name}
            {r.organisation_id ? " (organisation post)" : ""}
          </span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Type", cell: (r) => kindLabel(r.kind), className: "text-sm text-content-2", phone: "hide" },
    { header: "Status", cell: (r) => <StatusCell row={r} today={today} />, className: "shrink-0" },
    {
      header: "Deadline",
      cell: (r) => deadlineLabel(r.deadline, today),
      className: "text-sm text-content-2 md:whitespace-nowrap",
      phone: "hide",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Opportunity status" className="flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <Link
            key={f.slug}
            href={`${adminOpportunitiesPath}?status=${f.slug}`}
            aria-current={f.slug === filter ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              f.slug === filter ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>
      {rows.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-content-2">
            {filter === "all" ? "Nothing posted yet. The public board shows an empty state until the first post opens." : "Nothing with this status."}
          </p>
          {filter === "all" && (
            <Link href={`${adminOpportunitiesPath}/new`} className={buttonClasses("secondary")}>
              Post the first one
            </Link>
          )}
        </div>
      ) : (
        <DataTable caption="Opportunities" columns={columns} rows={rows} rowKey={(r) => r.id} />
      )}
      {rows.some((r) => r.status === "open" && isOpenOn(r, today)) && (
        <p className="text-sm text-content-2">
          Open posts are public at{" "}
          <Link href="/opportunities" className="text-content-link underline">
            /opportunities
          </Link>
          .
        </p>
      )}
    </div>
  );
}

function StatusCell({ row, today }: { row: Row; today: string }) {
  const expired = row.status === "open" && !isOpenOn(row, today);
  const label = expired ? "Past deadline" : row.status === "open" ? "Open" : row.status === "draft" ? "Draft" : "Closed";
  const tone = expired
    ? "bg-warning-bg text-warning-fg"
    : row.status === "open"
      ? "bg-success-bg text-success-fg"
      : "bg-surface-sunken text-content-2";
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${tone}`}>{label}</span>;
}
