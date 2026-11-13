import Link from "@/components/ui/link";
import { DataTable, rowLinkClass, type Column } from "@/components/ui/layout";
import { NothingYet, StatGrid, StatTile } from "@/components/insights/charts";
import { Pill } from "@/components/mentor/fields";
import type { RowOf } from "@/lib/insights/dashboards";
import { loadTable } from "@/lib/insights/data";
import { formatDay } from "@/lib/insights/filters";
import { formatCount, formatHours, formatRate } from "@/lib/insights/metrics";
import { LEVEL_LABEL, LEVEL_TONE, isRiskLevel, reasonText } from "@/lib/early-warning/rules";
import { Section, type InsightsContext } from "../shell";

type MentorRow = RowOf<"admin_insights_mentors">;
type FlaggedRow = RowOf<"admin_insights_risk_learners">;

const ROUTE_LABEL: Record<string, string> = { mentor: "Cohort mentors", chapter_lead: "Chapter leads", admin: "Admins" };

/**
 * Mentor quality and early warning (issues #325 and #330) on the cohorts
 * dashboard: per mentor numbers, whether flagged learners came back, and
 * everyone flagged now with who should act.
 */
export async function MentorsAndEarlyWarning({ supabase, filters }: InsightsContext) {
  const [mentors, outcomes, flagged] = await Promise.all([
    loadTable(supabase, "mentors", filters),
    loadTable(supabase, "early_warning", filters),
    loadTable(supabase, "risk_learners", filters),
  ]);
  const t = outcomes.reduce(
    (s, r) => ({
      raised: s.raised + r.raised,
      settled: s.settled + r.settled,
      back: s.back + r.came_back,
      contacted: s.contacted + r.contacted,
      contactedBack: s.contactedBack + r.contacted_came_back,
    }),
    { raised: 0, settled: 0, back: 0, contacted: 0, contactedBack: 0 },
  );
  const notContacted = t.settled - t.contacted;
  const notContactedBack = t.back - t.contactedBack;

  const mentorColumns: Column<MentorRow>[] = [
    { header: "Mentor", cell: (m) => <span className="font-semibold text-content">{m.mentor_name}</span>, className: "min-w-0 flex-1" },
    { header: "Learners", cell: (m) => formatCount(m.learners), align: "end", phone: "hide" },
    { header: "Active in 7 days", cell: (m) => `${formatCount(m.active_7d)} of ${formatCount(m.learners)}`, align: "end", phone: "hide" },
    { header: "At risk now", cell: (m) => formatCount(m.at_risk), align: "end" },
    { header: "Contacts logged", cell: (m) => `${formatCount(m.contacts)} (${formatCount(m.learners_contacted)} learners)`, align: "end" },
    { header: "Median time to grade", cell: (m) => formatHours(m.grading_hours_median, m.graded), align: "end", phone: "hide" },
    { header: "Weeks passed", cell: (m) => formatRate(m.weeks_passed, m.weeks_graded), align: "end", phone: "hide" },
  ];
  const flaggedColumns: Column<FlaggedRow>[] = [
    {
      header: "Learner",
      cell: (r) => (
        <span className="flex flex-col gap-1">
          <Link href={`/admin/learners/${r.profile_id}`} className={`font-semibold text-content hover:underline ${rowLinkClass}`}>
            {r.learner_name}
          </Link>
          <span className="text-sm text-content-3">{r.reasons.map((x) => reasonText(x)).join(" ")}</span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    {
      header: "Level",
      cell: (r) => {
        const level = isRiskLevel(r.level) ? r.level : "none";
        return <Pill tone={LEVEL_TONE[level]}>{LEVEL_LABEL[level]}</Pill>;
      },
    },
    { header: "Who acts", cell: (r) => (r.route === "admin" ? "Admins" : r.routed_to), phone: "hide" },
    { header: "Flagged since", cell: (r) => (r.flagged_since ? formatDay(r.flagged_since) : ""), align: "end", phone: "hide" },
    { header: "Last contact", cell: (r) => (r.last_contact_at ? formatDay(r.last_contact_at.slice(0, 10)) : "None yet"), align: "end", phone: "hide" },
  ];

  return (
    <>
      <Section
        id="early-warning"
        title="Early warning"
        lead="Did learners flagged for going quiet come back within 14 days? Alerts raised in the range, at least 14 days ago. Not an experiment: contacted learners may differ from the rest."
        table="early_warning"
        filters={filters}
      >
        {t.raised === 0 ? (
          <NothingYet>No learner was flagged in this range. Alerts start with the first daily check.</NothingYet>
        ) : (
          <StatGrid>
            <StatTile value={formatCount(t.raised)} label="Alerts raised" detail={outcomes.map((r) => `${ROUTE_LABEL[r.route] ?? r.route}: ${formatCount(r.raised)}`).join(", ")} />
            <StatTile value={formatRate(t.back, t.settled)} label="Came back within 14 days" detail={`${formatCount(t.back)} of ${formatCount(t.settled)} quiet alerts`} />
            <StatTile value={formatRate(t.contactedBack, t.contacted)} label="Came back after a contact" detail={`${formatCount(t.contactedBack)} of ${formatCount(t.contacted)} contacted`} />
            <StatTile value={formatRate(notContactedBack, notContacted)} label="Came back with no contact" detail={`${formatCount(notContactedBack)} of ${formatCount(notContacted)} not contacted`} />
          </StatGrid>
        )}
      </Section>

      <Section
        id="mentors"
        title="Mentors"
        lead="Per mentor or coordinator of the cohorts in range. Learners are shared with co mentors of the same cohort, so compare with care."
        table="mentors"
        filters={filters}
      >
        {mentors.length === 0 ? (
          <NothingYet>No cohort in this range has a mentor yet.</NothingYet>
        ) : (
          <DataTable caption="Mentors" columns={mentorColumns} rows={mentors} rowKey={(m) => m.mentor_id} />
        )}
      </Section>

      <Section
        id="flagged"
        title="Learners flagged now"
        lead="Everyone the daily check flags today, with who should act. Learners not in a cohort or chapter come to admins."
        table="risk_learners"
        filters={filters}
      >
        {flagged.length === 0 ? (
          <NothingYet>Nobody is flagged today.</NothingYet>
        ) : (
          <DataTable caption="Learners flagged now" columns={flaggedColumns} rows={flagged} rowKey={(r) => r.profile_id} />
        )}
      </Section>
    </>
  );
}

export const EARLY_WARNING_DEFINITIONS: [string, string][] = [
  ["Early warning", "Once a day each learner is checked for going quiet against their own rhythm, a broken streak, a slower pace, failing one quiz again and again, a saved path with no first topic, missed cohort deadlines, and slipping or dormant. One reason is Keep an eye; a strong reason or two reasons is Check in now."],
  ["Who acts", "The learner's cohort mentors when they are in an enrolling or running cohort, else the lead of their chapter, else admins."],
  ["Came back within 14 days", "Of alerts for going quiet raised at least 14 days ago, the share where the learner was active again within 14 days."],
  ["Contacted", "Someone logged a message, call or session with the learner within 14 days of the alert and no later than the day they came back."],
  ["Mentor contacts", "Contacts the mentor logged in the range, and how many different learners."],
  ["Weeks passed", "Of their learners' work graded in the range, the share at or above the pass mark."],
];
