"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import {
  descendantIds,
  moveAmongSiblings,
  parseNodeForm,
  parseResourceForm,
  parseRoadmapForm,
  uniqueSlug,
} from "@/lib/roadmap-admin";
import { importRoadmapDrafts } from "@/lib/roadmap-import";
import { ROADMAP_DRAFTS } from "@/content/roadmaps";

/**
 * Every action re-checks the admin role (requireAdmin) before touching the
 * database, and RLS (private.is_admin) checks it again. Ids come from hidden
 * fields, so they are treated as untrusted and only ever used as filters.
 */

export type FormState = {
  errors?: Record<string, string | undefined>;
  message?: string;
  /** Timestamp of the last successful save, used to show "Saved" and reset add forms. */
  saved?: number;
};

const UNIQUE_VIOLATION = "23505";

function id(form: FormData, key = "id") {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

// Roadmaps -------------------------------------------------------------------

export async function createRoadmap(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseRoadmapForm(form);
  if (Object.keys(errors).length) return { errors };

  const { data: row, error } = await supabase.from("roadmaps").insert(data).select("id").single();
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another roadmap already uses this slug." } };
  if (error) return { message: "We couldn't create the roadmap. Try again." };
  redirect(`/admin/roadmaps/${row.id}`);
}

export async function updateRoadmap(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseRoadmapForm(form);
  if (Object.keys(errors).length) return { errors };

  const { error } = await supabase.from("roadmaps").update(data).eq("id", id(form));
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another roadmap already uses this slug." } };
  if (error) return { message: "We couldn't save the roadmap. Try again." };
  refresh();
  return { saved: Date.now() };
}

export async function setRoadmapPublished(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("roadmaps")
    .update({ is_published: form.get("publish") === "true" })
    .eq("id", id(form));
  if (error) throw new Error(`Could not change publish state: ${error.message}`);
  refresh();
}

export async function importDrafts(): Promise<FormState> {
  const { supabase } = await requireAdmin();
  try {
    const summary = await importRoadmapDrafts(supabase, ROADMAP_DRAFTS);
    refresh();
    return {
      saved: Date.now(),
      message: `Imported ${ROADMAP_DRAFTS.length} drafts: ${summary.created} new, ${summary.updated} updated, ${summary.nodes} nodes, ${summary.resourcesAdded} new links.`,
    };
  } catch (error) {
    console.error("importDrafts failed", error);
    return { message: "The import stopped part way. Nothing is duplicated, so it is safe to run again." };
  }
}

// Nodes ----------------------------------------------------------------------

async function roadmapNodes(roadmapId: string) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("roadmap_nodes")
    .select("id, slug, parent_id, position, created_at")
    .eq("roadmap_id", roadmapId);
  if (error) throw new Error(`Could not read nodes: ${error.message}`);
  return data;
}

export async function addNode(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const roadmapId = id(form, "roadmap_id");
  const { data, errors } = parseNodeForm(form);
  if (Object.keys(errors).length) return { errors };

  const nodes = await roadmapNodes(roadmapId);
  if (data.parent_id && !nodes.some((n) => n.id === data.parent_id)) {
    return { errors: { parent_id: "Choose a parent from this roadmap." } };
  }
  const siblings = nodes.filter((n) => n.parent_id === data.parent_id);
  const position = siblings.reduce((max, n) => Math.max(max, n.position + 1), 0);
  const slug = uniqueSlug(data.title, nodes.map((n) => n.slug));

  const { error } = await supabase.from("roadmap_nodes").insert({ ...data, roadmap_id: roadmapId, slug, position });
  if (error) return { message: "We couldn't add the node. Try again." };
  refresh();
  return { saved: Date.now() };
}

export async function updateNode(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const nodeId = id(form);
  const roadmapId = id(form, "roadmap_id");
  const { data, slug, position, errors } = parseNodeForm(form);
  if (Object.keys(errors).length) return { errors };

  const nodes = await roadmapNodes(roadmapId);
  if (data.parent_id) {
    if (!nodes.some((n) => n.id === data.parent_id)) return { errors: { parent_id: "Choose a parent from this roadmap." } };
    if (descendantIds(nodes, nodeId).has(data.parent_id)) {
      return { errors: { parent_id: "A node cannot sit under itself or one of its own children." } };
    }
  }

  const { error } = await supabase
    .from("roadmap_nodes")
    .update({ ...data, ...(slug ? { slug } : {}), ...(position !== null ? { position } : {}) })
    .eq("id", nodeId)
    .eq("roadmap_id", roadmapId);
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another node in this roadmap uses this slug." } };
  if (error) return { message: "We couldn't save the node. Try again." };
  refresh();
  return { saved: Date.now() };
}

export async function moveNode(form: FormData) {
  const { supabase } = await requireAdmin();
  const nodeId = id(form);
  const direction = form.get("direction") === "up" ? "up" : "down";
  const nodes = await roadmapNodes(id(form, "roadmap_id"));
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return;

  const changes = moveAmongSiblings(nodes.filter((n) => n.parent_id === node.parent_id), nodeId, direction);
  const results = await Promise.all(
    changes.map(({ id: changeId, position }) => supabase.from("roadmap_nodes").update({ position }).eq("id", changeId)),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw new Error(`Could not reorder: ${failed.error.message}`);
  refresh();
}

export async function deleteNode(form: FormData) {
  const { supabase } = await requireAdmin();
  const roadmapId = id(form, "roadmap_id");
  const { error } = await supabase.from("roadmap_nodes").delete().eq("id", id(form)).eq("roadmap_id", roadmapId);
  if (error) throw new Error(`Could not delete node: ${error.message}`);
  redirect(`/admin/roadmaps/${roadmapId}`);
}

// Resources ------------------------------------------------------------------

export async function addResource(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const nodeId = id(form, "node_id");
  const { data, errors } = parseResourceForm(form);
  if (Object.keys(errors).length) return { errors };

  const { data: last } = await supabase
    .from("node_resources")
    .select("position")
    .eq("node_id", nodeId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();
  const { error } = await supabase
    .from("node_resources")
    .insert({ ...data, is_active: true, node_id: nodeId, position: (last?.position ?? -1) + 1 });
  if (error) return { message: "We couldn't add the link. Try again." };
  refresh();
  return { saved: Date.now() };
}

export async function updateResource(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseResourceForm(form);
  if (Object.keys(errors).length) return { errors };

  const { error } = await supabase.from("node_resources").update(data).eq("id", id(form));
  if (error) return { message: "We couldn't save the link. Try again." };
  refresh();
  return { saved: Date.now() };
}

export async function setResourceActive(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("node_resources")
    .update({ is_active: form.get("active") === "true" })
    .eq("id", id(form));
  if (error) throw new Error(`Could not change link health: ${error.message}`);
  refresh();
}

export async function deleteResource(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("node_resources").delete().eq("id", id(form));
  if (error) throw new Error(`Could not delete link: ${error.message}`);
  refresh();
}
