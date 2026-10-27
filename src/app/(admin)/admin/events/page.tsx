import type { Metadata } from "next";
import { Suspense } from "react";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { DataTable, rowLinkClass } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { kindLabel, statusLabel } from "@/lib/events/labels";
import { formatEventDayShort } from "@/lib/events/time";
import { Badge } from "../roadmaps/fields";

export const metadata: Metadata = { title: "Events" };

const STATUS_TONE = { draft: "neutral", published: "success", cancelled: "danger", completed: "info" } as const;

async function EventList() {
  const { supabase } = await requireAdmin();
  const [{ data, error }, attendance] = await Promise.all([
    supabase
      .from("community_events")
      .select("id, slug, title, kind, status, starts_at, chapter:chapters(name)")
      .order("starts_at", { ascending: false })
      .limit(300),
    supabase.from("event_attendance").select("event_id, going_count, waitlist_count"),
  ]);
  if (error) throw new Error(`Could not load events: ${error.message}`);
  const counts = new Map((attendance.data ?? []).map((a) => [a.event_id, a]));

  if (!data.length) {
    return (
      <div className="rounded-lg border border-line bg-surface-sunken p-6 text-content-2">
        <p className="font-semibold text-content">No events yet.</p>
        <p className="mt-1">Create the first one. It starts as a draft that only hosts can see.</p>
      </div>
    );
  }
  return (
    <DataTable
      caption="Events, latest first"
      rows={data}
      rowKey={(e) => e.id}
      columns={[
        {
          header: "Event",
          className: "min-w-0 flex-1",
          cell: (e) => (
            <span className="flex min-w-0 flex-col gap-1">
              <Link href={`/admin/events/${e.id}`} className={`font-semibold text-content no-underline ${rowLinkClass}`}>
                {e.title}
              </Link>
              <span className="text-sm text-content-3">
                {kindLabel(e.kind)}
                {e.chapter ? `, ${e.chapter.name}` : ""}
                <span className="md:hidden">, {formatEventDayShort(e.starts_at)}</span>
              </span>
            </span>
          ),
        },
        { header: "Date", phone: "hide", className: "text-sm whitespace-nowrap text-content-2", cell: (e) => formatEventDayShort(e.starts_at) },
        {
          header: "Going",
          phone: "hide",
          align: "end",
          className: "tabular-nums text-content-2",
          cell: (e) => {
            const c = counts.get(e.id);
            return c ? `${c.going_count}${c.waitlist_count ? ` (+${c.waitlist_count} waiting)` : ""}` : 0;
          },
        },
        {
          header: "Status",
          className: "shrink-0",
          cell: (e) => <Badge tone={STATUS_TONE[e.status as keyof typeof STATUS_TONE] ?? "neutral"}>{statusLabel(e.status)}</Badge>,
        },
      ]}
    />
  );
}

export default function AdminEventsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-title text-content">Events</h1>
          <p className="mt-1 text-content-2">Skillshops, webinars, flagship events and activations. Chapter leads host their chapter&rsquo;s events.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/events" className={buttonClasses("secondary")}>
            Public page
          </Link>
          <Link href="/admin/events/new" className={buttonClasses("primary")}>
            New event
          </Link>
        </div>
      </div>
      <Suspense fallback={<div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <EventList />
      </Suspense>
    </div>
  );
}
