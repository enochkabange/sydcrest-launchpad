import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { setResourceActive } from "../actions";
import { Badge } from "../fields";

export const metadata: Metadata = { title: "Link health" };

async function LinkList({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const brokenOnly = (await searchParams).show === "broken";
  const { supabase } = await requireAdmin();
  let query = supabase
    .from("node_resources")
    .select("id, label, url, kind, is_active, roadmap_nodes(id, title, roadmap_id, roadmaps(title))")
    .order("updated_at", { ascending: false })
    .limit(500);
  if (brokenOnly) query = query.eq("is_active", false);
  const { data, error } = await query;
  if (error) throw new Error(`Could not load links: ${error.message}`);

  const tab = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${active ? "bg-info-bg text-info-fg" : "text-content-2 hover:bg-surface-sunken"}`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav aria-label="Filter links" className="flex flex-wrap gap-1">
        {tab("/admin/roadmaps/links", "All links", !brokenOnly)}
        {tab("/admin/roadmaps/links?show=broken", "Broken only", brokenOnly)}
      </nav>
      {data.length === 0 ? (
        <p className="text-content-2">{brokenOnly ? "No links are marked broken." : "No links yet."}</p>
      ) : (
        <DataTable
          caption={brokenOnly ? "Links marked broken" : "All links, most recently changed first"}
          rows={data}
          rowKey={(r) => r.id}
          columns={[
            {
              header: "Link",
              className: "min-w-0 flex-1",
              cell: (r) => (
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-content">{r.label}</span>
                    <Badge tone={r.is_active ? "success" : "danger"}>{r.is_active ? "Working" : "Broken"}</Badge>
                  </span>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="break-all text-sm text-content-link">
                    {r.url}
                  </a>
                </span>
              ),
            },
            {
              header: "Node",
              phone: "hide",
              cell: (r) =>
                r.roadmap_nodes && (
                  <Link
                    href={`/admin/roadmaps/${r.roadmap_nodes.roadmap_id}/nodes/${r.roadmap_nodes.id}`}
                    className="inline-flex min-h-11 items-center text-sm text-content-2 underline"
                  >
                    {r.roadmap_nodes.roadmaps?.title} · {r.roadmap_nodes.title}
                  </Link>
                ),
            },
            {
              header: "Status",
              align: "end",
              className: "shrink-0",
              cell: (r) => (
                <form action={setResourceActive}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="active" value={r.is_active ? "false" : "true"} />
                  <Button type="submit" variant="secondary" className="whitespace-nowrap">
                    {r.is_active ? "Mark broken" : "Mark working"}
                  </Button>
                </form>
              ),
            },
          ]}
        />
      )}
    </>
  );
}

export default function LinksPage({ searchParams }: PageProps<"/admin/roadmaps/links">) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/roadmaps" className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to roadmaps
      </Link>
      <h1 className="text-title text-content">Link health</h1>
      <p className="text-content-2">Broken links are hidden from learners. Mark a link working again once it is fixed.</p>
      <Suspense fallback={<div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <LinkList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
