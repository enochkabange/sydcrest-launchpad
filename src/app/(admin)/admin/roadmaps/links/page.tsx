import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
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
        <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
          {data.map((r) => {
            const node = r.roadmap_nodes;
            return (
              <li key={r.id} className="flex flex-col gap-2 px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-content">{r.label}</span>
                  <Badge tone={r.is_active ? "success" : "danger"}>{r.is_active ? "Working" : "Broken"}</Badge>
                </div>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="break-all text-sm text-content-link">
                  {r.url}
                </a>
                {node && (
                  <Link href={`/admin/roadmaps/${node.roadmap_id}/nodes/${node.id}`} className="inline-flex min-h-11 items-center self-start text-sm text-content-2 underline">
                    {node.roadmaps?.title} · {node.title}
                  </Link>
                )}
                <form action={setResourceActive}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="active" value={r.is_active ? "false" : "true"} />
                  <Button type="submit" variant="secondary">
                    {r.is_active ? "Mark broken" : "Mark working"}
                  </Button>
                </form>
              </li>
            );
          })}
        </ul>
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
      <h1 className="text-3xl text-content">Link health</h1>
      <p className="text-content-2">Broken links are hidden from learners. Mark a link working again once it is fixed.</p>
      <Suspense fallback={<div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <LinkList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
