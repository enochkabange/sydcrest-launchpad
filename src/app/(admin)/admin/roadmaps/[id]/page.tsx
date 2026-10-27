import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { childrenByParent, flattenTree } from "@/lib/roadmap-admin";
import { moveNode, setRoadmapPublished } from "../actions";
import { Badge } from "../fields";
import { NodeForm } from "../node-form";
import { RoadmapForm } from "../roadmap-form";

export const metadata: Metadata = { title: "Edit roadmap" };

type NodeRow = {
  id: string;
  slug: string;
  title: string;
  parent_id: string | null;
  position: number;
  is_optional: boolean;
  created_at: string;
  node_resources: { count: number }[];
};

function NodeTree({ roadmapId, nodes, parent }: { roadmapId: string; nodes: Map<string, NodeRow[]>; parent: string }) {
  const list = nodes.get(parent) ?? [];
  if (!list.length) return null;
  return (
    <ol className={parent ? "ml-4 flex flex-col border-l border-line pl-3" : "flex flex-col"}>
      {list.map((node, index) => (
        <li key={node.id} className="flex flex-col">
          <div className="flex items-center gap-1 py-1">
            <Link
              href={`/admin/roadmaps/${roadmapId}/nodes/${node.id}`}
              className="flex min-h-11 min-w-0 flex-1 flex-wrap items-center gap-x-2 rounded-md px-2 hover:bg-surface-sunken"
            >
              <span className="font-semibold text-content">{node.title}</span>
              {node.is_optional && <Badge tone="info">Optional</Badge>}
              <span className="text-xs text-content-3">{node.node_resources[0]?.count ?? 0} links</span>
            </Link>
            <form action={moveNode}>
              <input type="hidden" name="id" value={node.id} />
              <input type="hidden" name="roadmap_id" value={roadmapId} />
              <input type="hidden" name="direction" value="up" />
              <Button type="submit" variant="ghost" className="min-w-11 px-0" disabled={index === 0} aria-label={`Move ${node.title} up`}>
                <ChevronUp className="size-5" aria-hidden="true" />
              </Button>
            </form>
            <form action={moveNode}>
              <input type="hidden" name="id" value={node.id} />
              <input type="hidden" name="roadmap_id" value={roadmapId} />
              <input type="hidden" name="direction" value="down" />
              <Button type="submit" variant="ghost" className="min-w-11 px-0" disabled={index === list.length - 1} aria-label={`Move ${node.title} down`}>
                <ChevronDown className="size-5" aria-hidden="true" />
              </Button>
            </form>
          </div>
          <NodeTree roadmapId={roadmapId} nodes={nodes} parent={node.id} />
        </li>
      ))}
    </ol>
  );
}

async function RoadmapEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: roadmap }, { data: nodes, error }] = await Promise.all([
    supabase.from("roadmaps").select("id, slug, title, description, track, field_category, locale, display_order, is_published").eq("id", id).maybeSingle(),
    supabase.from("roadmap_nodes").select("id, slug, title, parent_id, position, is_optional, created_at, node_resources(count)").eq("roadmap_id", id),
  ]);
  if (!roadmap) notFound();
  if (error) throw new Error(`Could not load nodes: ${error.message}`);

  const parents = flattenTree(nodes).map(({ node, depth }) => ({ id: node.id, title: node.title, depth }));

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-title text-content">{roadmap.title}</h1>
          <Badge tone={roadmap.is_published ? "success" : "neutral"}>{roadmap.is_published ? "Published" : "Draft"}</Badge>
        </div>
        <p className="text-content-2">
          {roadmap.is_published
            ? "Learners can see this roadmap and every node in it."
            : "Only admins can see this roadmap until you publish it."}
        </p>
        <form action={setRoadmapPublished}>
          <input type="hidden" name="id" value={roadmap.id} />
          <input type="hidden" name="publish" value={roadmap.is_published ? "false" : "true"} />
          <Button type="submit" variant={roadmap.is_published ? "secondary" : "primary"}>
            {roadmap.is_published ? "Unpublish" : "Publish"}
          </Button>
        </form>
      </div>

      {/* One column on phones. From lg the node tree and the roadmap details sit side by side. */}
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-10 xl:gap-12">
        <section className="flex flex-col gap-4 border-t border-line pt-6">
          <h2 className="text-subtitle text-content">Nodes</h2>
          {nodes.length ? (
            <NodeTree roadmapId={roadmap.id} nodes={childrenByParent(nodes)} parent="" />
          ) : (
            <p className="text-content-2">No nodes yet. Add the first section below.</p>
          )}
          <div className="flex flex-col gap-4 rounded-lg border border-line p-4">
            <h3 className="text-h3 text-content">Add a node</h3>
            <NodeForm roadmapId={roadmap.id} parents={parents} />
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-line pt-6">
          <h2 className="text-subtitle text-content">Details</h2>
          <RoadmapForm roadmap={roadmap} />
        </section>
      </div>
    </>
  );
}

export default function RoadmapPage({ params }: PageProps<"/admin/roadmaps/[id]">) {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/admin/roadmaps" className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to roadmaps
      </Link>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <RoadmapEditor params={params} />
      </Suspense>
    </div>
  );
}
