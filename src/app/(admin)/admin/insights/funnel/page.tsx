import type { Metadata } from "next";
import { DataTable, type Column } from "@/components/ui/layout";
import { BarList, NothingYet } from "@/components/insights/charts";
import type { RowOf } from "@/lib/insights/dashboards";
import { loadTable } from "@/lib/insights/data";
import { DEVICES } from "@/lib/insights/filters";
import { formatCount, formatRate } from "@/lib/insights/metrics";
import { Definitions, InsightsPage, Section, type InsightsContext } from "../shell";

export const metadata: Metadata = { title: "Acquisition and funnel", robots: { index: false } };

const STEPS = [
  ["visited", "Visited"],
  ["signed_up", "Signed up"],
  ["saved_path", "Saved a path"],
  ["first_topic", "Opened a first topic"],
  ["first_pass", "Passed a first quiz"],
] as const;

type FunnelRow = RowOf<"admin_insights_funnel">;
type FormRow = RowOf<"admin_insights_forms">;
type AcquisitionRow = RowOf<"admin_insights_acquisition">;
type LandingRow = RowOf<"admin_insights_landing">;
type SourceRow = { key: string; source: string; medium: string; campaign: string | null; visits: number; signups: number };

const SOURCE_LABELS: Record<string, string> = {
  direct: "Typed or bookmarked",
  search: "Search engines",
  whatsapp: "WhatsApp",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X",
  tiktok: "TikTok",
  youtube: "YouTube",
  telegram: "Telegram",
  email: "Email",
  other: "Other sites",
  share: "Share sheet",
  copy: "Copied link",
  unknown: "Not known",
};
const MEDIUM_LABELS: Record<string, string> = { none: "None", referral: "Link", search: "Search", unknown: "Not known" };

function sourceLabel(value: string) {
  return SOURCE_LABELS[value] ?? value;
}

function mediumLabel(value: string) {
  return MEDIUM_LABELS[value] ?? value;
}

/** Adds up report rows that share a key (the report splits by source, medium and campaign). */
function sumBy(rows: AcquisitionRow[], key: (r: AcquisitionRow) => string, withCampaign: boolean): SourceRow[] {
  const map = new Map<string, SourceRow>();
  for (const r of rows) {
    const k = key(r);
    const row = map.get(k) ?? { key: k, source: r.source, medium: r.medium, campaign: withCampaign ? r.campaign : null, visits: 0, signups: 0 };
    row.visits += r.visits;
    row.signups += r.signups;
    map.set(k, row);
  }
  return [...map.values()].sort((a, b) => b.visits - a.visits || b.signups - a.signups || a.key.localeCompare(b.key));
}

function deviceLabel(value: string) {
  return DEVICES.find((d) => d.value === value)?.label ?? (value === "unknown" ? "Not known" : value.charAt(0).toUpperCase() + value.slice(1));
}

async function Funnel({ supabase, filters }: InsightsContext) {
  const [rows, methods, forms, acquisition, landing] = await Promise.all([
    loadTable(supabase, "funnel", filters),
    loadTable(supabase, "signup_methods", filters),
    loadTable(supabase, "forms", filters),
    loadTable(supabase, "acquisition", filters),
    loadTable(supabase, "landing", filters),
  ]);
  const sources = sumBy(acquisition, (r) => `${r.source}|${r.medium}`, false);
  const campaigns = sumBy(acquisition.filter((r) => r.campaign), (r) => `${r.campaign}|${r.source}|${r.medium}`, true);

  const sourceColumns: Column<SourceRow>[] = [
    {
      header: "Source",
      cell: (r) => (
        <span className="flex min-w-0 flex-col">
          <span className="font-semibold text-content">{r.campaign ?? sourceLabel(r.source)}</span>
          <span className="text-sm text-content-2">{r.campaign ? `${sourceLabel(r.source)}, ${mediumLabel(r.medium)}` : mediumLabel(r.medium)}</span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Visits", cell: (r) => formatCount(r.visits), align: "end", phone: "hide" },
    { header: "Sign ups", cell: (r) => formatCount(r.signups), align: "end", phone: "hide" },
    { header: "Visit to sign up", cell: (r) => (r.visits ? formatRate(r.signups, r.visits) : "–"), align: "end", phone: "hide", className: "text-content-2" },
    {
      header: "Summary",
      cell: (r) => (
        <span className="text-sm text-content-2 tabular-nums">
          {formatCount(r.visits)} visits, {formatCount(r.signups)} sign ups
        </span>
      ),
      align: "end",
      phone: "only",
    },
  ];

  const landingColumns: Column<LandingRow>[] = [
    { header: "Page", cell: (r) => <span className="font-mono text-sm text-content">{r.route === "unknown" ? "Not known" : r.route}</span>, className: "min-w-0 flex-1 break-all" },
    { header: "Visits", cell: (r) => formatCount(r.visits), align: "end" },
    { header: "Visitors", cell: (r) => formatCount(r.visitors), align: "end", phone: "hide" },
    { header: "Sign ups", cell: (r) => formatCount(r.signups), align: "end", phone: "hide" },
  ];
  const all = rows.find((r) => r.device_class === "all");
  const devices = rows.filter((r) => r.device_class !== "all");

  const deviceColumns: Column<FunnelRow>[] = [
    { header: "Device", cell: (r) => <span className="font-semibold text-content">{deviceLabel(r.device_class)}</span>, className: "min-w-0 flex-1" },
    ...STEPS.map(([key, label]) => ({ header: label, cell: (r: FunnelRow) => formatCount(r[key]), align: "end" as const, phone: "hide" as const })),
    { header: "Visit to sign up", cell: (r) => formatRate(r.signed_up, r.visited), align: "end", phone: "hide", className: "text-content-2" },
    {
      header: "Summary",
      cell: (r) => (
        <span className="text-sm text-content-2 tabular-nums">
          {formatCount(r.visited)} visited, {formatCount(r.signed_up)} signed up
        </span>
      ),
      align: "end",
      phone: "only",
    },
  ];

  const formColumns: Column<FormRow>[] = [
    { header: "Form", cell: (r) => <span className="font-semibold text-content">{r.form.replace(/_/g, " ")}</span>, className: "min-w-0 flex-1" },
    { header: "Started", cell: (r) => formatCount(r.started), align: "end", phone: "hide" },
    { header: "Submitted", cell: (r) => formatCount(r.finished), align: "end", phone: "hide" },
    { header: "Completion", cell: (r) => formatRate(r.finished, r.started), align: "end" },
  ];

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
        <Section id="steps" title="Steps" lead="People who did each step within the range." table="funnel" filters={filters}>
          {!all || all.visited + all.signed_up === 0 ? (
            <NothingYet>No visits or sign ups recorded in this range yet.</NothingYet>
          ) : (
            <div className="rounded-lg border border-line bg-surface p-4 xl:p-5">
              <BarList
                label="Funnel steps"
                bars={STEPS.map(([key, label], i) => ({
                  label,
                  value: all[key],
                  detail: i === 0 ? undefined : `${formatRate(all[key], all[STEPS[i - 1][0]])} of the step before`,
                }))}
              />
            </div>
          )}
        </Section>
        <Section
          id="methods"
          title="Sign ups by method"
          lead="How people signed up: with an email address or with Google."
          table="signup_methods"
          filters={filters}
        >
          {methods.length === 0 ? (
            <NothingYet>No sign ups in this range yet.</NothingYet>
          ) : (
            <div className="rounded-lg border border-line bg-surface p-4 xl:p-5">
              <BarList label="Sign ups by method" bars={methods.map((m) => ({ label: m.method === "google" ? "Google" : m.method === "email" ? "Email" : "Not known", value: m.signups }))} />
            </div>
          )}
        </Section>
      </div>

      <Section
        id="sources"
        title="Where visits come from"
        lead="Visits from outside SydCrest by campaign source, or by the kind of site that linked here. A sign up counts under the first visit of the browser it was made in."
        table="acquisition"
        filters={filters}
      >
        {sources.length === 0 ? (
          <NothingYet>No visits recorded in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Visits and sign ups by source" columns={sourceColumns} rows={sources} rowKey={(r) => r.key} />
        )}
      </Section>

      <Section
        id="campaigns"
        title="Campaigns"
        lead="Links tagged with utm_campaign, such as chapter WhatsApp groups, posters and shared pages."
        table="acquisition"
        filters={filters}
      >
        {campaigns.length === 0 ? (
          <NothingYet>No visits from a tagged campaign link in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Visits and sign ups by campaign" columns={sourceColumns} rows={campaigns} rowKey={(r) => r.key} />
        )}
      </Section>

      <Section
        id="landing"
        title="Landing pages"
        lead="The page each visit from outside opened first. Any page other than the home page is a deep link."
        table="landing"
        filters={filters}
      >
        {landing.length === 0 ? (
          <NothingYet>No visits recorded in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Landing pages" columns={landingColumns} rows={landing} rowKey={(r) => r.route} />
        )}
      </Section>

      <Section id="devices" title="By device" table="funnel" filters={filters}>
        {devices.length === 0 ? (
          <NothingYet>No activity on any device in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Funnel steps by device" columns={deviceColumns} rows={devices} rowKey={(r) => r.device_class} />
        )}
      </Section>

      <Section id="forms" title="Form completion" lead="Tab sessions that started each tagged form and how many submitted it. Not affected by the filters other than dates." table="forms" filters={filters}>
        {forms.length === 0 ? (
          <NothingYet>No tagged form was started in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Form completion" columns={formColumns} rows={forms} rowKey={(r) => r.form} />
        )}
      </Section>

      <Definitions
        items={[
          ["Visited", "Distinct browsers (signed in or not) that viewed a page in the range."],
          ["Visit", "A browser tab session that arrived from outside SydCrest. Tabs opened from another SydCrest page are left out."],
          ["Source", "The link's utm_source tag; without one, the kind of site that linked here (search engine, WhatsApp, Facebook and so on), or typed or bookmarked when no site did."],
          ["Medium", "The link's utm_medium tag; without one, search, email, link (another site) or none."],
          ["Sign ups by source", "Each sign up counts under its browser's first visit in the 30 days before: the first one with campaign tags or from another site, else the first typed visit. Not known when the browser recorded no visit, such as a visit before 13 November 2026 or a browser that clears its cookies."],
          ["Signed up", "Accounts created in the range."],
          ["Saved a path", "People who saved a personalised path in the range."],
          ["Opened a first topic", "People who opened a topic in the range and had never started one before it."],
          ["Passed a first quiz", "People who passed a topic quiz in the range and had never passed one before it."],
          ["Of the step before", "Each step's count over the previous step's. Steps are counted separately within the range, so a person can pass a step without the one before it in the same range."],
          ["Device", "Phone, tablet or computer, from the browser that sent the event. Bots are left out."],
        ]}
      />
    </>
  );
}

/** Admin insights: acquisition and funnel. */
export default function FunnelInsightsPage({ searchParams }: PageProps<"/admin/insights/funnel">) {
  return <InsightsPage slug="funnel" searchParams={searchParams} render={Funnel} />;
}
