import "server-only";
import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { REGIONS } from "@/lib/regions";
import { TABLES, type RowOf, type TableKey } from "./dashboards";
import { toRpcArgs, type InsightFilters } from "./filters";

type Client = SupabaseClient<Database>;
type Rpc = (fn: string, args?: object) => PromiseLike<{ data: unknown; error: { code?: string; message: string } | null }>;

/**
 * Rows of one insights table. Calls the table's admin_insights_* function
 * with the page's filters; the function itself refuses non admins. Cached
 * for this request only (admin data must be fresh), so the page and a chart
 * reading the same table make one call.
 */
export const loadTable = cache(async function loadTable<K extends TableKey>(
  supabase: Client,
  key: K,
  filters: InsightFilters,
): Promise<RowOf<(typeof TABLES)[K]["rpc"]>[]> {
  const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;
  const { data, error } = await rpc(TABLES[key].rpc, toRpcArgs(filters));
  if (error) throw new Error(`Could not load ${TABLES[key].rpc}: ${error.code ?? ""} ${error.message}`);
  return (data ?? []) as RowOf<(typeof TABLES)[K]["rpc"]>[];
});

/** A single row function (overview, earn, community headlines). */
export async function loadRow<R extends "admin_insights_overview" | "admin_insights_earn" | "admin_insights_community">(
  supabase: Client,
  rpcName: R,
  filters: InsightFilters,
): Promise<RowOf<R> | null> {
  const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;
  const { data, error } = await rpc(rpcName, toRpcArgs(filters));
  if (error) throw new Error(`Could not load ${rpcName}: ${error.code ?? ""} ${error.message}`);
  return ((data as RowOf<R>[] | null) ?? [])[0] ?? null;
}

/** The last day the daily rollups hold, or null before the first rebuild. */
export const loadRollupsTo = cache(async (supabase: Client): Promise<string | null> => {
  const { data, error } = await supabase.rpc("admin_insights_rollups_to");
  if (error) throw new Error(`Could not load rollup freshness: ${error.message}`);
  return data ?? null;
});

export type Option = { value: string; label: string };
export type FilterOptions = { tracks: Option[]; regions: Option[]; chapters: Option[]; cohorts: Option[] };

/** Choices for the filter selects: roadmaps and DMP specialisations, regions, chapters, cohorts. */
export const loadFilterOptions = cache(async (supabase: Client): Promise<FilterOptions> => {
  const [roadmaps, programs, chapters, cohorts] = await Promise.all([
    supabase.from("roadmaps").select("slug, title").eq("is_published", true).order("title"),
    supabase.from("programs").select("specializations"),
    supabase.from("chapters").select("id, name").order("name"),
    supabase.from("cohorts").select("id, name, starts_on").order("starts_on", { ascending: false }),
  ]);
  const tracks = new Map<string, string>();
  for (const r of roadmaps.data ?? []) tracks.set(r.slug, r.title);
  for (const p of programs.data ?? []) {
    for (const s of Array.isArray(p.specializations) ? p.specializations : []) {
      const spec = s as { slug?: unknown; label?: unknown };
      if (typeof spec.slug === "string" && !tracks.has(spec.slug)) {
        tracks.set(spec.slug, `${typeof spec.label === "string" ? spec.label : spec.slug} (DMP)`);
      }
    }
  }
  return {
    tracks: [...tracks.entries()].map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label)),
    regions: REGIONS.map((r) => ({ value: r.slug, label: r.label })),
    chapters: (chapters.data ?? []).map((c) => ({ value: c.id, label: c.name })),
    cohorts: (cohorts.data ?? []).map((c) => ({ value: c.id, label: c.name })),
  };
});
