import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { TABLES, dashboard, isTableKey } from "@/lib/insights/dashboards";
import { loadTable } from "@/lib/insights/data";
import { parseFilters } from "@/lib/insights/filters";
import { csvFileName, toCsv } from "@/lib/insights/csv";
import { todayInAccra } from "@/lib/mentor/progress";

const notFound = () => new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });

/**
 * CSV export of one insights table: GET /admin/insights/export?table=<key>
 * plus the page's filters. Admins only (404 for everyone else, like the
 * pages); the report function checks again in the database. The file holds
 * exactly the columns the page shows, nothing more.
 */
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return notFound();
  const supabase = await createClient();
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (me?.role !== "admin") return notFound();

  const sp = Object.fromEntries(request.nextUrl.searchParams.entries());
  const key = sp.table ?? null;
  if (!isTableKey(key)) return new Response("Unknown table", { status: 400 });
  const spec = TABLES[key];
  const filters = parseFilters(sp, todayInAccra(), dashboard(spec.dashboard).filters);

  let rows: Record<string, unknown>[];
  try {
    rows = (await loadTable(supabase, key, filters)) as Record<string, unknown>[];
  } catch (error) {
    console.error("insights export failed", { table: key, message: (error as Error).message });
    return new Response("Could not build the export. Try again in a moment.", { status: 500 });
  }

  return new Response(toCsv(spec.columns, rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${csvFileName(key, filters.from, filters.to)}"`,
      "Cache-Control": "no-store",
    },
  });
}
