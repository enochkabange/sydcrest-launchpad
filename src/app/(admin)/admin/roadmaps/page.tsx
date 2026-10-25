import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { Badge } from "./fields";
import { ImportForm } from "./import-form";

export const metadata: Metadata = { title: "Roadmaps" };

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
    <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
      {data.map((r) => (
        <li key={r.id}>
          <Link href={`/admin/roadmaps/${r.id}`} className="flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 hover:bg-surface-sunken">
            <span className="font-semibold text-content">{r.title}</span>
            <Badge tone={r.is_published ? "success" : "neutral"}>{r.is_published ? "Published" : "Draft"}</Badge>
            <span className="w-full text-sm text-content-3">
              {r.slug} · {r.roadmap_nodes[0]?.count ?? 0} nodes
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function RoadmapsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl text-content">Roadmaps</h1>
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
        <h2 className="text-lg text-content">Draft outlines</h2>
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
