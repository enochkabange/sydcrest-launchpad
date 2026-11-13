import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "@/components/ui/link";
import { requireAdmin } from "@/lib/admin";
import { eventLabel } from "@/lib/insights/metrics";
import { daysAgo, deviceLabel, hourBandLabel, percent, stageLabel, turnUpRate } from "@/lib/learners/attributes";
import { MULTI, SINGLE, fromRow, type MultiKey, type SingleKey } from "@/lib/learner-profile";
import { bandLabel, biggestGap, PARTS, WEIGHTS } from "@/lib/readiness/score";
import { regionLabel } from "@/lib/regions";

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

async function Learner({ params }: Pick<PageProps<"/admin/learners/[id]">, "params">) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const { supabase } = await requireAdmin();
  const [head, attrs, about, touch, progress, timeline, readiness] = await Promise.all([
    supabase.rpc("admin_learner", { p_profile_id: id }),
    supabase.from("learner_attributes").select("*").eq("profile_id", id).maybeSingle(),
    supabase.from("learner_profiles").select("*").eq("profile_id", id).maybeSingle(),
    supabase.from("profile_first_touch").select("*").eq("profile_id", id).maybeSingle(),
    supabase.rpc("admin_learner_progress", { p_profile_id: id }),
    supabase.from("events").select("id, name, route, props, created_at").eq("profile_id", id).order("created_at", { ascending: false }).limit(60),
    supabase.rpc("admin_learner_readiness", { p_profile_id: id }),
  ]);
  const person = head.data?.[0];
  if (!person) notFound();
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

      <section aria-labelledby="readiness-heading" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 id="readiness-heading" className="text-h2 text-content">
            Readiness
          </h2>
          <p className="max-w-reading text-sm text-content-2">
            Per track, from verified skills, progress, approved work, recent learning and profile. Staff only; the weights are a
            proposal. <Link href="/admin/readiness" className="text-content-link underline">How it works and the fairness check</Link>
          </p>
        </div>
        {readiness.data?.length ? (
          <ul className="grid gap-3 lg:grid-cols-2">
            {readiness.data.map((r) => {
              const gap = biggestGap(r);
              return (
                <li key={r.roadmap_slug} data-testid="readiness-row" className="flex flex-col gap-2 rounded-lg border border-line bg-surface p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-content">{r.roadmap_title}</span>
                    <span className="text-content tabular-nums">
                      <strong>{bandLabel(r.band)}</strong> · {r.score} of 100
                    </span>
                  </div>
                  <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 text-sm">
                    {PARTS.map((part) => {
                      const off = (part.key === "skills" && r.skills_total === 0) || (part.key === "progress" && r.topics_total === 0);
                      const detail =
                        part.key === "skills"
                          ? `${r.skills_verified} of ${r.skills_total} skills`
                          : part.key === "progress"
                            ? `${r.topics_done} of ${r.topics_total} topics`
                            : part.key === "portfolio"
                              ? `${r.portfolio_pieces} approved`
                              : part.key === "activity"
                                ? `${r.active_days_30} days`
                                : [r.about_complete && "About you", r.profile_public && "public"].filter(Boolean).join(", ") || "not yet";
                      return (
                        <div key={part.key} className="contents">
                          <dt className="text-content-2">
                            {part.label} <span className="text-content-3">({detail})</span>
                          </dt>
                          <dd className="text-end font-semibold text-content tabular-nums">
                            {off ? "Not counted" : `${Number(r[`${part.key}_points`])} / ${WEIGHTS[part.key]}`}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                  <p className="text-sm text-content-2">
                    {gap ? `Biggest gain: ${PARTS.find((p) => p.key === gap)?.label.toLowerCase()}.` : "Every part is complete."}
                    {r.points_available < 100 && ` Scored out of ${r.points_available} points this track can give.`} Worked out{" "}
                    {r.computed_at.slice(0, 10)}.
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-content-2">No readiness yet: it is worked out daily once a learner starts or chooses a track.</p>
        )}
      </section>

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

/** Admin: one learner's computed attributes, answers, first touch, progress and recent activity (epic #320 step 4). */
export default function LearnerPage({ params }: PageProps<"/admin/learners/[id]">) {
  return (
    <Suspense fallback={<div className="h-[40rem] animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Learner params={params} />
    </Suspense>
  );
}
