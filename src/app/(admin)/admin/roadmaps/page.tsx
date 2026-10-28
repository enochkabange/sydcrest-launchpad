import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, rowLinkClass } from "@/components/ui/layout";
import { buttonClasses } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { Badge } from "./fields";
import { ImportForm } from "./import-form";

export const metadata: Metadata = { title: "Roadmaps" };

/** The import action runs from this page; importing every track takes a few minutes. */
export const maxDuration = 300;

async function RoadmapList() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("roadmaps")
    .select("id, slug, title, is_published, display_order, roadmap_nodes(count)")
    .order("display_order")
    .order("title");
  if (error) throw new Error(`Could not load roadmaps: ${error.message}`);

  if (!data.length) {
    return <p className="text-content-2">No roadmaps yet. Create one, or import the drafts below.</p>;
  }
  return (
    <DataTable
      caption="Roadmaps in display order"
      rows={data}
      rowKey={(r) => r.id}
      columns={[
        {
          header: "Roadmap",
          className: "min-w-0 flex-1",
          cell: (r) => (
            <span className="flex min-w-0 flex-col gap-1">
              <Link href={`/admin/roadmaps/${r.id}`} className={`font-semibold text-content no-underline ${rowLinkClass}`}>
                {r.title}
              </Link>
              <span className="text-sm text-content-3 md:hidden">
                {r.slug} · {r.roadmap_nodes[0]?.count ?? 0} nodes
              </span>
            </span>
          ),
        },
        { header: "Slug", phone: "hide", className: "text-sm text-content-3", cell: (r) => r.slug },
        {
          header: "Nodes",
          phone: "hide",
          align: "end",
          className: "tabular-nums text-content-2",
          cell: (r) => r.roadmap_nodes[0]?.count ?? 0,
        },
        {
          header: "Status",
          className: "shrink-0",
          cell: (r) => <Badge tone={r.is_published ? "success" : "neutral"}>{r.is_published ? "Published" : "Draft"}</Badge>,
        },
      ]}
    />
  );
}

export default function RoadmapsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-title text-content">Roadmaps</h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/roadmaps/links" className={buttonClasses("secondary")}>
            Link health
          </Link>
          <Link href="/admin/roadmaps/new" className={buttonClasses("primary")}>
            New roadmap
          </Link>
        </div>
      </div>
      <Suspense fallback={<div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <RoadmapList />
      </Suspense>
      <section className="flex flex-col gap-3 border-t border-line pt-6">
        <h2 className="text-h3 text-content">Draft outlines</h2>
        <p className="text-content-2">
          Brings in the outlines written in the codebase as unpublished roadmaps with their nodes and links. Running it
          again updates them from the files and never makes copies. Publish state, display order and anything added here
          by hand stay as they are.
        </p>
        <ImportForm />
      </section>
    </div>
  );
}
