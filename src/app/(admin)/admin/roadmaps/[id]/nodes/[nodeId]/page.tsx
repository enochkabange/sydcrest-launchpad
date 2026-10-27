import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { descendantIds, flattenTree, sortSiblings } from "@/lib/roadmap-admin";
import { deleteNode, deleteResource } from "../../../actions";
import { Badge } from "../../../fields";
import { NodeForm } from "../../../node-form";
import { ResourceForm } from "../../../resource-form";

export const metadata: Metadata = { title: "Edit node" };

async function NodeEditor({ params }: { params: Promise<{ id: string; nodeId: string }> }) {
  const { id: roadmapId, nodeId } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: roadmap }, { data: nodes, error }, { data: resources, error: resError }] = await Promise.all([
    supabase.from("roadmaps").select("id, title").eq("id", roadmapId).maybeSingle(),
    supabase.from("roadmap_nodes").select("id, slug, title, summary, parent_id, position, is_optional, kind, choice_group, created_at").eq("roadmap_id", roadmapId),
    supabase.from("node_resources").select("id, label, url, kind, is_active, position, created_at, parent_id:node_id").eq("node_id", nodeId),
  ]);
  if (error || resError) throw new Error("Could not load the node.");
  const node = nodes.find((n) => n.id === nodeId);
  if (!roadmap || !node) notFound();

  // A node cannot move under itself or its own children.
  const blocked = descendantIds(nodes, node.id);
  const parents = flattenTree(nodes)
    .filter(({ node: n }) => !blocked.has(n.id))
    .map(({ node: n, depth }) => ({ id: n.id, title: n.title, depth }));

  return (
    <>
      <Link href={`/admin/roadmaps/${roadmap.id}`} className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to {roadmap.title}
      </Link>
      <h1 className="text-title text-content">{node.title}</h1>
      {/* One column on phones. From lg the node's fields sit beside its links. */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-12">
      <div className="flex flex-col gap-6">
      <NodeForm roadmapId={roadmap.id} parents={parents} node={node} />
      </div>

      <section className="flex flex-col gap-4 border-t border-line pt-6 lg:border-t-0 lg:pt-0">
        <h2 className="text-subtitle text-content">Links</h2>
        {resources.length === 0 && <p className="text-content-2">No links on this node yet.</p>}
        <ul className="flex flex-col gap-4">
          {sortSiblings(resources).map((r) => (
            <li key={r.id} className="flex flex-col gap-3 rounded-lg border border-line p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-content">{r.label}</span>
                <Badge tone={r.is_active ? "success" : "danger"}>{r.is_active ? "Working" : "Broken"}</Badge>
              </div>
              <ResourceForm nodeId={node.id} resource={r} />
              <form action={deleteResource}>
                <input type="hidden" name="id" value={r.id} />
                <Button type="submit" variant="ghost" className="text-danger-fg">
                  Delete link
                </Button>
              </form>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 rounded-lg border border-line p-4">
          <h3 className="text-h3 text-content">Add a link</h3>
          <ResourceForm nodeId={node.id} />
        </div>
      </section>
      </div>

      <section className="flex flex-col gap-3 border-t border-line pt-6">
        <h2 className="text-subtitle text-content">Delete node</h2>
        <p className="text-content-2">Deleting removes this node, every node under it, their links and learner progress on them.</p>
        <form action={deleteNode}>
          <input type="hidden" name="id" value={node.id} />
          <input type="hidden" name="roadmap_id" value={roadmap.id} />
          <Button type="submit" variant="secondary" className="text-danger-fg">
            Delete node
          </Button>
        </form>
      </section>
    </>
  );
}

export default function NodePage({ params }: PageProps<"/admin/roadmaps/[id]/nodes/[nodeId]">) {
  return (
    <div className="flex max-w-xl flex-col gap-6 lg:max-w-none">
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <NodeEditor params={params} />
      </Suspense>
    </div>
  );
}
