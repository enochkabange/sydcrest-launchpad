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

function deviceLabel(value: string) {
  return DEVICES.find((d) => d.value === value)?.label ?? (value === "unknown" ? "Not known" : value.charAt(0).toUpperCase() + value.slice(1));
}

async function Funnel({ supabase, filters }: InsightsContext) {
  const [rows, methods, forms] = await Promise.all([
    loadTable(supabase, "funnel", filters),
    loadTable(supabase, "signup_methods", filters),
    loadTable(supabase, "forms", filters),
  ]);
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
          lead="Where visitors come from (a referrer or campaign) is not recorded yet, so this shows how people signed up."
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
