import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "@/components/ui/link";
import { requireAdmin } from "@/lib/admin";
import { getCurrentUser } from "@/lib/auth";
import { eventLabel } from "@/lib/insights/metrics";
import { daysAgo, deviceLabel, hourBandLabel, percent, stageLabel, turnUpRate } from "@/lib/learners/attributes";
import { MULTI, SINGLE, fromRow, type MultiKey, type SingleKey } from "@/lib/learner-profile";
import { regionLabel } from "@/lib/regions";
import { ActionNotice, PeoplePanel } from "./people-panel";

export const metadata: Metadata = { title: "Learner", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ABOUT_LABELS: Record<SingleKey | MultiKey | "willing_to_relocate", string> = {
  main_goal: "Goal",
  career_stage: "Career stage",
  employment_status: "Now",
  experience: "Experience",
  education: "Education",
  field_of_study: "Studied",
  main_device: "Studies on",
  internet: "Internet",
  study_hours: "Hours a week",
  study_times: "Best times",
  tracks: "Tracks of interest",
  industries: "Industries",
  heard_from: "Heard from",
  languages: "Languages",
  work_styles: "Work styles",
  available_from: "Can start",
  willing_to_relocate: "Would move",
  min_pay_band: "Lowest pay (filter only)",
  work_regions: "Would work in",
  learning_styles: "Learns by",
};

function optionLabel(key: string, value: string): string {
  const options = (SINGLE as Record<string, { value: string; label: string }[]>)[key] ?? (MULTI as Record<string, { value: string; label: string }[]>)[key];
  return options?.find((o) => o.value === value)?.label ?? value;
}

function Facts({ title, items }: { title: string; items: [string, React.ReactNode][] }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 xl:p-5">
      <h2 className="text-h3 text-content">{title}</h2>
      <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 text-sm">
        {items.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-content-2">{k}</dt>
            <dd className="text-end font-semibold text-content tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

async function Learner({ params, searchParams }: PageProps<"/admin/learners/[id]">) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const { supabase } = await requireAdmin();
  // The account panel writes the learner_viewed audit row, so it runs first
  // and the audit trail below includes this visit.
  const account = await supabase.rpc("admin_learner_account", { p_profile_id: id });
  if (account.error) throw new Error(`Could not load the account: ${account.error.message}`);
  const [me, audit, query, head, attrs, about, touch, progress, timeline] = await Promise.all([
    getCurrentUser(),
    supabase.rpc("admin_audit_entries", { p_profile_id: id, p_limit: 50 }),
    searchParams,
    supabase.rpc("admin_learner", { p_profile_id: id }),
    supabase.from("learner_attributes").select("*").eq("profile_id", id).maybeSingle(),
    supabase.from("learner_profiles").select("*").eq("profile_id", id).maybeSingle(),
    supabase.from("profile_first_touch").select("*").eq("profile_id", id).maybeSingle(),
    supabase.rpc("admin_learner_progress", { p_profile_id: id }),
    supabase.from("events").select("id, name, route, props, created_at").eq("profile_id", id).order("created_at", { ascending: false }).limit(60),
  ]);
  const person = head.data?.[0];
  const acct = account.data?.[0];
  if (!person || !acct) notFound();
  const notice = typeof query.error === "string" ? query.error : typeof query.done === "string" ? query.done : undefined;
  const a = attrs.data;
  const today = new Date().toISOString().slice(0, 10);
  const answers = fromRow(about.data);
  const answered = (Object.keys(ABOUT_LABELS) as (keyof typeof ABOUT_LABELS)[])
    .map((key) => {
      const v = answers[key];
      if (v === null || (Array.isArray(v) && v.length === 0)) return null;
      const shown = typeof v === "boolean" ? (v ? "Yes" : "No") : Array.isArray(v) ? v.map((x) => optionLabel(key, x)).join(", ") : optionLabel(key, v);
      return [ABOUT_LABELS[key], shown] as [string, string];
    })
    .filter((x): x is [string, string] => x !== null);
  const turnUp = a ? turnUpRate(a.events_attended, a.event_no_shows) : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link href="/admin/learners" className="text-sm text-content-2">
          All learners
        </Link>
        <h1 className="text-title text-content">{person.display_name || "No name yet"}</h1>
        <p className="text-content-2">
          {stageLabel(a?.stage)} · {regionLabel(person.region) || "No region"} · {person.role} · joined{" "}
          {person.created_at.slice(0, 10)}
          {a && <> · attributes from {a.computed_at.slice(0, 10)}</>}
        </p>
      </div>

      <ActionNotice code={notice} />
      <PeoplePanel account={acct} entries={audit.data ?? []} isSelf={me?.id === id} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Facts
          title="Activity"
          items={[
            ["Last active", daysAgo(a?.last_active_on, today)],
            ["Active days, last 30", a?.active_days_30 ?? "–"],
            ["Active weeks, last 8", a?.active_weeks_8 ?? "–"],
            ["Usually studies", hourBandLabel(a?.usual_hour_band)],
            ["Usual device", deviceLabel(a?.usual_device)],
          ]}
        />
        <Facts
          title="Learning"
          items={[
            ["Topics started", a?.topics_started ?? "–"],
            ["Topics done", a?.topics_completed ?? "–"],
            ["Quizzes passed", a?.quizzes_passed ?? "–"],
            ["Average quiz score", a?.avg_quiz_score ?? "–"],
            ["Days to first topic", a?.days_to_first_topic ?? "–"],
            ["Quiz retries, last 90 days", a?.quiz_retries_90 ?? "–"],
          ]}
        />
        <Facts
          title="Reliability and work"
          items={[
            ["Cohort work on time", a ? `${percent(a.on_time_rate)} (${a.deadlines_met} of ${a.deadlines_met + a.deadlines_missed})` : "–"],
            ["Resubmissions", a?.resubmissions ?? "–"],
            ["Events: going, attended, missed", a ? `${a.events_going}, ${a.events_attended}, ${a.event_no_shows}` : "–"],
            ["Turn up rate", percent(turnUp)],
            ["Opportunities viewed, last 90 days", a?.opportunities_viewed_90 ?? "–"],
            ["Applications", a?.opportunities_applied ?? "–"],
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Facts
          title="About you"
          items={answered.length ? answered : [["Answers", "None yet"]]}
        />
        <Facts
          title="First came from"
          items={
            touch.data
              ? [
                  ["Source", touch.data.utm_source ?? touch.data.referrer ?? "–"],
                  ["Medium", touch.data.utm_medium ?? "–"],
                  ["Campaign", touch.data.utm_campaign ?? "–"],
                  ["Landed on", touch.data.landing_route ?? "–"],
                  ["First seen", touch.data.first_seen_at.slice(0, 10)],
                ]
              : [["Source", "Not known"]]
          }
        />
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-h2 text-content">Roadmaps</h2>
        {progress.data?.length ? (
          <ul className="flex flex-col gap-2">
            {progress.data.map((r) => (
              <li key={r.roadmap_slug} className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-line p-3 text-sm">
                <span className="font-semibold text-content">{r.roadmap_title}</span>
                <span className="text-content-2 tabular-nums">
                  {r.completed} of {r.total} done, {r.passed} quizzes passed, last {r.last_at.slice(0, 10)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-content-2">No topics opened yet.</p>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-h2 text-content">Recent activity</h2>
        <p className="text-sm text-content-2">The last 60 recorded events while signed in, newest first. Nothing is recorded when analytics is off.</p>
        {timeline.data?.length ? (
          <ol className="flex flex-col divide-y divide-line rounded-lg border border-line">
            {timeline.data.map((e) => (
              <li key={e.id} className="flex flex-col gap-0.5 p-3 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="font-semibold text-content">{eventLabel(e.name)}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-xs text-content-2">
                  {e.route ?? ""} {Object.keys(e.props ?? {}).length ? JSON.stringify(e.props) : ""}
                </span>
                <time dateTime={e.created_at} className="shrink-0 text-content-3 tabular-nums">
                  {e.created_at.slice(0, 16).replace("T", " ")}
                </time>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-content-2">No recorded activity.</p>
        )}
      </section>
    </div>
  );
}

/**
 * Admin: one learner's account, consents, programmes, safe actions and audit
 * trail (people console, #332), then computed attributes, answers, first
 * touch, progress and recent activity (epic #320 step 4).
 */
export default function LearnerPage({ params, searchParams }: PageProps<"/admin/learners/[id]">) {
  return (
    <Suspense fallback={<div className="h-[40rem] animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Learner params={params} searchParams={searchParams} />
    </Suspense>
  );
}
