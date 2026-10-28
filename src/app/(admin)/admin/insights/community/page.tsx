import type { Metadata } from "next";
import { DataTable, SectionGrid, type Column } from "@/components/ui/layout";
import { ColumnChart, NothingYet, StatTile } from "@/components/insights/charts";
import type { RowOf } from "@/lib/insights/dashboards";
import { loadRow, loadTable } from "@/lib/insights/data";
import { formatCount, formatRate } from "@/lib/insights/metrics";
import { regionLabel } from "@/lib/regions";
import { Definitions, ExportLink, InsightsPage, Section, type InsightsContext } from "../shell";

export const metadata: Metadata = { title: "Community", robots: { index: false } };

type ChapterRow = RowOf<"admin_insights_chapters">;

const STATUS: Record<string, string> = { draft: "Draft", launching: "Launching", active: "Active", paused: "Paused", closed: "Closed" };

async function Community({ supabase, filters }: InsightsContext) {
  const [head, daily, chapters] = await Promise.all([
    loadRow(supabase, "admin_insights_community", filters),
    loadTable(supabase, "community_daily", filters),
    loadTable(supabase, "chapters", filters),
  ]);
  const c = head!;
  const csv = <ExportLink table="community_daily" filters={filters} />;

  const columns: Column<ChapterRow>[] = [
    {
      header: "Chapter",
      cell: (r) => (
        <span className="flex flex-col">
          <span className="font-semibold text-content">{r.chapter_name}</span>
          <span className="text-sm text-content-3">
            {regionLabel(r.region) ?? r.region}, {STATUS[r.status] ?? r.status}
          </span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Members", cell: (r) => formatCount(r.members), align: "end" },
    { header: "New members", cell: (r) => formatCount(r.new_members), align: "end", phone: "hide" },
    { header: "Posts", cell: (r) => formatCount(r.posts), align: "end", phone: "hide" },
    { header: "Events", cell: (r) => formatCount(r.events), align: "end", phone: "hide" },
    { header: "RSVPs", cell: (r) => formatCount(r.rsvps), align: "end", phone: "hide" },
    { header: "Check ins", cell: (r) => formatCount(r.checkins), align: "end", phone: "hide" },
  ];

  return (
    <>
      <SectionGrid cols={4} as="dl">
        <StatTile value={formatCount(c.posts)} label="Posts" detail={`${formatCount(c.posters)} people posted or replied`} />
        <StatTile value={formatCount(c.replies)} label="Replies" detail={`${formatCount(c.reactions)} reactions`} />
        <StatTile value={formatCount(c.rsvps_going)} label="RSVPs" detail={`${formatCount(c.events_held)} events in the range`} />
        <StatTile value={formatCount(c.checkins)} label="Check ins" detail={`${formatRate(c.checkins, c.rsvps_going)} of RSVPs`} />
      </SectionGrid>

      <div className="grid gap-4 lg:grid-cols-2 xl:gap-6">
        <ColumnChart title="Posts" valueLabel="Posts" points={daily.map((d) => ({ x: d.day, y: d.posts }))} actions={csv} />
        <ColumnChart title="Replies" valueLabel="Replies" points={daily.map((d) => ({ x: d.day, y: d.replies }))} actions={csv} />
        <ColumnChart title="RSVPs" valueLabel="RSVPs" points={daily.map((d) => ({ x: d.day, y: d.rsvps }))} actions={csv} />
        <ColumnChart title="Check ins" valueLabel="Check ins" points={daily.map((d) => ({ x: d.day, y: d.checkins }))} actions={csv} />
      </div>

      <Section id="chapters" title="Chapters" lead={`${formatCount(c.chapter_joins)} people joined a chapter in the range. ${formatCount(c.hidden)} posts and replies were hidden by moderators.`} table="chapters" filters={filters}>
        {chapters.length === 0 ? (
          <NothingYet>No chapters yet. They appear here once an admin creates one.</NothingYet>
        ) : (
          <DataTable caption="Chapters" columns={columns} rows={chapters} rowKey={(r) => r.chapter_id} />
        )}
      </Section>

      <Definitions
        items={[
          ["Posts and replies", "Written in the range, including any later hidden by a moderator."],
          ["RSVPs", "People who said they are going, by when they answered."],
          ["Check ins", "People checked in at an event in the range, by themselves or by the host."],
          ["Of RSVPs", "Check ins over RSVPs in the range. Shown from five RSVPs."],
          ["Events", "Published or completed events starting in the range."],
          ["Filters", "Chapter keeps that chapter's posts, events and members. Region keeps people from that region, and on the chapter table, chapters in it."],
        ]}
      />
    </>
  );
}

/** Admin insights: community, events and chapters. */
export default function CommunityInsightsPage({ searchParams }: PageProps<"/admin/insights/community">) {
  return <InsightsPage slug="community" searchParams={searchParams} render={Community} />;
}
