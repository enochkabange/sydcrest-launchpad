/**
 * Pure helpers for the admin roadmap editor: form parsing, slugs, tree
 * ordering and the draft import plan. No database access here so it can be
 * unit tested; the Server Actions in src/app/(admin)/admin/roadmaps call it.
 */
import type { FieldErrors } from "./validation";
import type { NodeDraft, ResourceDraft } from "@/content/roadmaps/types";

/** Same rule as the slug check constraints on roadmaps and roadmap_nodes. */
export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,78}[a-z0-9]$/;

export const TRACKS = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "data", label: "Data" },
  { value: "digital-marketing", label: "Digital marketing" },
  { value: "ui-ux", label: "UI and UX design" },
  { value: "product", label: "Product" },
  { value: "digital-skills-bridge", label: "Digital skills bridge" },
] as const;

export const FIELD_CATEGORIES = [
  { value: "software", label: "Software" },
  { value: "data", label: "Data" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "foundations", label: "Foundations" },
] as const;

export const LOCALES = [{ value: "en-GH", label: "English (Ghana)" }] as const;

export const RESOURCE_KINDS = [
  { value: "article", label: "Article" },
  { value: "video", label: "Video" },
  { value: "practice", label: "Practice" },
] as const;

export type ResourceKind = (typeof RESOURCE_KINDS)[number]["value"];

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function oneOf<T extends string>(value: string, options: readonly { value: T }[]): T | null {
  return options.find((o) => o.value === value)?.value ?? null;
}

/** "Mobile Money APIs!" becomes "mobile-money-apis". May return "" for symbol only input. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

/** A slug for `title` that is not in `taken`, adding -2, -3 and so on. */
export function uniqueSlug(title: string, taken: Iterable<string>) {
  const used = new Set(taken);
  let base = slugify(title);
  if (base.length < 2) base = `node-${base || "1"}`.replace(/-$/, "");
  if (!used.has(base)) return base;
  for (let n = 2; ; n++) {
    const suffix = `-${n}`;
    const candidate = `${base.slice(0, 80 - suffix.length).replace(/-+$/, "")}${suffix}`;
    if (!used.has(candidate)) return candidate;
  }
}

function parseInteger(value: string) {
  if (!/^-?\d{1,7}$/.test(value)) return null;
  return Number(value);
}

export type RoadmapFields = {
  slug: string;
  title: string;
  description: string | null;
  track: string | null;
  field_category: string | null;
  locale: string;
  display_order: number;
};

export function parseRoadmapForm(form: FormData) {
  const errors: FieldErrors<keyof RoadmapFields> = {};
  const title = text(form, "title");
  const slug = text(form, "slug") || slugify(title);
  const description = text(form, "description");
  const track = text(form, "track");
  const field = text(form, "field_category");
  const locale = text(form, "locale") || "en-GH";
  const order = text(form, "display_order") || "0";

  if (!title) errors.title = "Enter a title.";
  else if (title.length > 120) errors.title = "Keep the title to 120 characters.";
  if (!SLUG_PATTERN.test(slug)) {
    errors.slug = "Use lowercase letters, numbers and hyphens, at least two characters.";
  }
  if (description.length > 2000) errors.description = "Keep the description to 2000 characters.";
  if (track && !oneOf(track, TRACKS)) errors.track = "Choose a track from the list.";
  if (field && !oneOf(field, FIELD_CATEGORIES)) errors.field_category = "Choose a field from the list.";
  if (!oneOf(locale, LOCALES)) errors.locale = "Choose a locale from the list.";
  const displayOrder = parseInteger(order);
  if (displayOrder === null) errors.display_order = "Enter a whole number.";

  const data: RoadmapFields = {
    slug,
    title,
    description: description || null,
    track: track || null,
    field_category: field || null,
    locale,
    display_order: displayOrder ?? 0,
  };
  return { data, errors };
}

export type NodeFields = {
  title: string;
  summary: string | null;
  parent_id: string | null;
  is_optional: boolean;
};

/** Fields shared by the add and edit node forms. `slug` and `position` are edit only. */
export function parseNodeForm(form: FormData) {
  const errors: FieldErrors<"title" | "summary" | "slug" | "position" | "parent_id"> = {};
  const title = text(form, "title");
  const summary = text(form, "summary");
  const parent = text(form, "parent_id");
  const slug = text(form, "slug");
  const position = text(form, "position");

  if (!title) errors.title = "Enter a title.";
  else if (title.length > 120) errors.title = "Keep the title to 120 characters.";
  if (summary.length > 1000) errors.summary = "Keep the summary to 1000 characters.";
  if (slug && !SLUG_PATTERN.test(slug)) {
    errors.slug = "Use lowercase letters, numbers and hyphens, at least two characters.";
  }
  const positionValue = position ? parseInteger(position) : null;
  if (position && positionValue === null) errors.position = "Enter a whole number.";

  const data: NodeFields = {
    title,
    summary: summary || null,
    parent_id: parent || null,
    is_optional: form.get("is_optional") === "on",
  };
  return { data, slug: slug || null, position: positionValue, errors };
}

export type ResourceFields = { label: string; url: string; kind: ResourceKind; is_active: boolean };

export function parseResourceForm(form: FormData) {
  const errors: FieldErrors<"label" | "url" | "kind"> = {};
  const label = text(form, "label");
  const url = text(form, "url");
  const kind = oneOf(text(form, "kind"), RESOURCE_KINDS);

  if (!label) errors.label = "Enter a label.";
  else if (label.length > 200) errors.label = "Keep the label to 200 characters.";
  let validUrl = false;
  try {
    const parsed = new URL(url);
    validUrl = parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    validUrl = false;
  }
  if (!validUrl) errors.url = "Enter a full link starting with https://";
  if (!kind) errors.kind = "Choose a kind.";

  const data: ResourceFields = {
    label,
    url,
    kind: kind ?? "article",
    is_active: form.get("is_active") === "on",
  };
  return { data, errors };
}

// Tree helpers ---------------------------------------------------------------

export type TreeNode = { id: string; parent_id: string | null; position: number; created_at?: string };

/** Siblings in display order: position, then creation time as a tie breaker. */
export function sortSiblings<T extends TreeNode>(nodes: T[]) {
  return [...nodes].sort(
    (a, b) => a.position - b.position || (a.created_at ?? "").localeCompare(b.created_at ?? "") || a.id.localeCompare(b.id),
  );
}

/** Children lists keyed by parent id ("" for top level), each sorted. */
export function childrenByParent<T extends TreeNode>(nodes: T[]) {
  const map = new Map<string, T[]>();
  for (const node of nodes) {
    const key = node.parent_id ?? "";
    map.set(key, [...(map.get(key) ?? []), node]);
  }
  for (const [key, list] of map) map.set(key, sortSiblings(list));
  return map;
}

/** Depth first order with depth, for the tree view and the parent picker. */
export function flattenTree<T extends TreeNode>(nodes: T[]) {
  const children = childrenByParent(nodes);
  const out: { node: T; depth: number }[] = [];
  const seen = new Set<string>();
  const walk = (parent: string, depth: number) => {
    for (const node of children.get(parent) ?? []) {
      if (seen.has(node.id)) continue;
      seen.add(node.id);
      out.push({ node, depth });
      walk(node.id, depth + 1);
    }
  };
  walk("", 0);
  return out;
}

/** The node and everything under it, which cannot become its parent. */
export function descendantIds(nodes: TreeNode[], rootId: string) {
  const children = childrenByParent(nodes);
  const out = new Set<string>([rootId]);
  const stack = [rootId];
  while (stack.length) {
    for (const child of children.get(stack.pop()!) ?? []) {
      if (!out.has(child.id)) {
        out.add(child.id);
        stack.push(child.id);
      }
    }
  }
  return out;
}

/**
 * Moves one node up or down among its siblings and renumbers them 0..n.
 * Returns only the position changes to write (empty if it is already at the edge).
 */
export function moveAmongSiblings<T extends TreeNode>(siblings: T[], id: string, direction: "up" | "down") {
  const ordered = sortSiblings(siblings);
  const index = ordered.findIndex((n) => n.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= ordered.length) return [];
  [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
  return ordered
    .map((node, position) => ({ id: node.id, position }))
    .filter(({ id: nodeId, position }) => siblings.find((n) => n.id === nodeId)!.position !== position);
}

// Draft import plan ----------------------------------------------------------

/** Node rows for one draft roadmap; array order becomes position. Parents are linked in a second pass. */
export function draftNodeRows(roadmapId: string, nodes: NodeDraft[]) {
  return nodes.map((node, position) => ({
    roadmap_id: roadmapId,
    slug: node.slug,
    title: node.title,
    summary: node.summary,
    position,
    is_optional: node.optional,
  }));
}

/** The same rows with ids and parent ids once every node exists. */
export function draftNodeRowsWithParents(roadmapId: string, nodes: NodeDraft[], idBySlug: Map<string, string>) {
  return draftNodeRows(roadmapId, nodes).map((row, i) => {
    const id = idBySlug.get(row.slug);
    const parentSlug = nodes[i].parent;
    const parentId = parentSlug ? idBySlug.get(parentSlug) : null;
    if (!id) throw new Error(`Node ${row.slug} was not saved`);
    if (parentSlug && !parentId) throw new Error(`Parent ${parentSlug} of ${row.slug} is missing`);
    return { ...row, id, parent_id: parentId ?? null };
  });
}

type ExistingResource = { id: string; node_id: string; url: string };

/**
 * Resources to insert and update so the draft's links exist exactly once per
 * node, matched by URL. Existing rows keep their is_active flag (an admin may
 * have marked a link broken) and links an admin added by hand are left alone.
 */
export function planResources(
  nodes: NodeDraft[],
  idBySlug: Map<string, string>,
  existing: ExistingResource[],
) {
  const byKey = new Map(existing.map((r) => [`${r.node_id} ${r.url}`, r.id]));
  const inserts: { node_id: string; label: string; url: string; kind: ResourceDraft["kind"]; position: number; source: string }[] = [];
  const updates: { id: string; node_id: string; label: string; url: string; kind: ResourceDraft["kind"]; position: number }[] = [];
  for (const node of nodes) {
    const nodeId = idBySlug.get(node.slug);
    if (!nodeId) continue;
    const seen = new Set<string>();
    node.resources.forEach((resource, position) => {
      if (seen.has(resource.url)) return;
      seen.add(resource.url);
      const row = { node_id: nodeId, label: resource.label, url: resource.url, kind: resource.kind, position };
      const id = byKey.get(`${nodeId} ${resource.url}`);
      if (id) updates.push({ id, ...row });
      else inserts.push({ ...row, source: "draft import" });
    });
  }
  return { inserts, updates };
}
