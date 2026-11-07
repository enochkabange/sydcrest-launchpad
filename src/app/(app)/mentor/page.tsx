import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { DataTable, MainWithRail, rowLinkClass } from "@/components/ui/layout";
import { Card, CELL_STYLE, EmptyState, Pill } from "@/components/mentor/fields";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { loadCohort, nameOf, pickCohort, requireStaff, shortDate, type ConsoleCohort, type RosterRow } from "@/lib/mentor/data";
import {
  CELL_LABEL,
  COHORT_STATUS_LABEL,
  MEMBER_STATUS_LABEL,
  ROLE_LABEL,
  cellState,
  learnerPath,
  todayInAccra,
  weekNumbers,
  type CellState,
  type CohortStatus,
} from "@/lib/mentor/progress";

export const metadata: Metadata = { title: "Mentor console", robots: { index: false } };

export default function MentorPage({ searchParams }: PageProps<"/mentor">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Console searchParams={searchParams} />
    </Suspense>
  );
}

async function Console({ searchParams }: Pick<PageProps<"/mentor">, "searchParams">) {
  const { cohorts } = await requireStaff();
  const cohort = pickCohort(cohorts, (await searchParams).cohort);

  if (!cohort) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-title text-content">Mentor console</h1>
        <EmptyState title="No cohorts yet">
          Create a cohort in{" "}
          <Link href="/admin/cohorts" className="text-content-link underline">
            Admin, Cohorts
          </Link>{" "}
          and add its mentors. It appears here once it exists.
        </EmptyState>
      </div>
    );
  }

  const data = await loadCohort(cohort);
  const names = new Map(data.members.map((m) => [m.profile_id, m]));
  const weekById = new Map(data.weeks.map((w) => [w.id, w]));
  const activeLearners = data.learners.filter((l) => l.status === "active");
  const today = todayInAccra();

  // Per learner: their path and the state of each week number.
  const subByLearnerWeek = new Map(data.submissions.map((s) => [`${s.profile_id}:${s.program_week_id}`, s]));
  const numbers = weekNumbers(data.weeks);
  const grid = data.learners.map((l) => {
    const path = new Map(learnerPath(data.weeks, l.specialization).map((w) => [w.week_number, w]));
    const cells = numbers.map((n) => {
      const week = path.get(n);
      if (!week) return { n, week: null, sub: null, state: null as CellState | null };
      const sub = subByLearnerWeek.get(`${l.profile_id}:${week.id}`) ?? null;
      const state = cellState({
        status: sub?.status ?? null,
        finalScore: sub?.final_score ?? null,
        passScore: cohort.program.pass_score,
        startsOn: cohort.starts_on,
        weekNumber: n,
        graceDays: cohort.program.grace_days,
        today,
      });
      return { n, week, sub, state };
    });
    return { learner: l, cells, passed: cells.filter((c) => c.state === "passed").length, late: cells.filter((c) => c.state === "late").length };
  });
  const gridByMember = new Map(grid.map((g) => [g.learner.member_id, g]));

  const capstoneSubs = data.submissions.filter((s) => weekById.get(s.program_week_id)?.is_capstone);
  const reviewsGiven = new Map<string, number>();
  for (const r of data.reviews) if (r.status === "submitted") reviewsGiven.set(r.reviewer_id, (reviewsGiven.get(r.reviewer_id) ?? 0) + 1);
  const unassignedCapstones = capstoneSubs.filter((s) => !data.reviews.some((r) => r.submission_id === s.id));
  const specLabel = new Map(cohort.program.specializations.map((s) => [s.slug, s.label]));

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-content-2">Mentor console</p>
        <h1 className="text-title text-content">{cohort.name}</h1>
        <p className="text-lead text-content-2">
          {cohort.program.title}. Starts {shortDate(cohort.starts_on)}.
        </p>
        <CohortSwitcher cohorts={cohorts} current={cohort} />
      </header>

      <MainWithRail
        railLabel="Cohort"
        rail={
          <>
            <Card title="This cohort">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <Fact label="Status" value={COHORT_STATUS_LABEL[cohort.status as CohortStatus] ?? cohort.status} />
                <Fact label="Your role" value={cohort.myRole ? ROLE_LABEL[cohort.myRole] : "Admin"} />
                <Fact label="Active learners" value={`${activeLearners.length} of ${cohort.max_size}`} />
                <Fact label="Waiting for review" value={String(data.queue.length)} />
                <Fact label="Pass mark" value={String(cohort.program.pass_score)} />
                <Fact label="Grace days" value={String(cohort.program.grace_days)} />
              </dl>
            </Card>
            <Card title="Capstone peer review">
              <p className="text-sm text-content-2">
                Every learner gives at least {cohort.program.min_peer_reviews} capstone peer{" "}
                {cohort.program.min_peer_reviews === 1 ? "review" : "reviews"} before certification. There is no waiver.
              </p>
              {capstoneSubs.length === 0 ? (
                <p className="text-sm text-content-2">No capstone work has been sent yet.</p>
              ) : (
                <ul className="flex flex-col gap-1 text-sm">
                  <li>
                    {capstoneSubs.length} capstone {capstoneSubs.length === 1 ? "submission" : "submissions"} sent
                  </li>
                  <li>{unassignedCapstones.length} without a reviewer</li>
                  <li>{data.reviews.filter((r) => r.status === "submitted").length} reviews submitted</li>
                </ul>
              )}
              {unassignedCapstones[0] && (
                <Link href={`/mentor/submissions/${unassignedCapstones[0].id}`} className={buttonClasses("secondary", "self-start")}>
                  Assign a reviewer
                </Link>
              )}
            </Card>
            <Card title="Certificates">
              <p className="text-sm text-content-2">
                Your final review: issue a certificate once a learner has passed every week and reviewed a classmate&apos;s capstone.
              </p>
              <Link href={`/certificates/issue?cohort=${cohort.id}`} className={buttonClasses("secondary", "self-start")}>
                Issue certificates
              </Link>
            </Card>
          </>
        }
      >
        <section aria-labelledby="queue-heading" className="flex flex-col gap-3">
          <h2 id="queue-heading" className="text-subtitle text-content">
            Review queue
          </h2>
          {data.queue.length === 0 ? (
            <EmptyState title="Nothing waiting for review">
              Work sent in this cohort appears here, oldest first, with the AI review once it is ready.
            </EmptyState>
          ) : (
            <DataTable
              caption="Work waiting for a mentor, oldest first"
              rowKey={(s) => s.id}
              rows={data.queue}
              columns={[
                {
                  header: "Learner",
                  cell: (s) => (
                    <Link href={`/mentor/submissions/${s.id}`} className={`font-semibold text-content ${rowLinkClass}`}>
                      {nameOf(names.get(s.profile_id))}
                    </Link>
                  ),
                },
                {
                  header: "Week",
                  cell: (s) => {
                    const w = weekById.get(s.program_week_id);
                    return (
                      <span className="text-sm text-content-2">
                        Week {w?.week_number}
                        <span className="hidden md:inline">: {w ? displayTheme(w.theme) : ""}</span>
                        {w?.is_capstone ? " (capstone)" : ""}
                      </span>
                    );
                  },
                },
                { header: "Sent", phone: "hide", cell: (s) => <span className="text-sm text-content-2">{s.submitted_at ? shortDate(s.submitted_at) : ""}</span> },
                {
                  header: "AI review",
                  phone: "hide",
                  align: "end",
                  cell: (s) => (s.status === "ai_reviewed" ? <Pill tone="info">Score {s.ai_score ?? "none"}</Pill> : <Pill>Pending</Pill>),
                },
                { header: "Attempt", phone: "hide", align: "end", cell: (s) => <span className="text-sm text-content-2">{s.attempt}</span> },
              ]}
            />
          )}
        </section>

      </MainWithRail>

      <section aria-labelledby="roster-heading" className="flex flex-col gap-3">
        <h2 id="roster-heading" className="text-subtitle text-content">
          Roster
        </h2>
        {data.members.length === 0 ? (
          <EmptyState title="No one in this cohort yet">Learners join when their application is accepted into this cohort.</EmptyState>
        ) : (
          <DataTable<RosterRow>
            caption={`Members of ${cohort.name}`}
            rowKey={(m) => m.member_id}
            rows={[...data.learners, ...data.staff]}
            columns={[
              {
                header: "Name",
                className: "md:whitespace-nowrap",
                cell: (m) =>
                  m.role === "learner" ? (
                    <Link href={`/mentor/learners/${m.member_id}`} className={`font-semibold text-content ${rowLinkClass}`}>
                      {nameOf(m)}
                    </Link>
                  ) : (
                    <span className="font-semibold text-content">{nameOf(m)}</span>
                  ),
              },
              { header: "Role", cell: (m) => <span className="text-sm text-content-2">{ROLE_LABEL[m.role] ?? m.role}</span> },
              {
                header: "Specialization",
                phone: "hide",
                cell: (m) => (
                  <span className="text-sm text-content-2">{m.specialization ? (specLabel.get(m.specialization) ?? m.specialization) : m.role === "learner" ? "Not chosen" : ""}</span>
                ),
              },
              {
                header: "Status",
                cell: (m) => (
                  <Pill tone={m.status === "deferred" ? "warning" : m.status === "completed" ? "success" : "neutral"}>
                    {MEMBER_STATUS_LABEL[m.status] ?? m.status}
                  </Pill>
                ),
              },
              {
                header: "Weeks passed",
                phone: "hide",
                align: "end",
                cell: (m) => {
                  const g = gridByMember.get(m.member_id);
                  return g ? <span className="text-sm text-content">{g.passed} of {g.cells.filter((c) => c.week).length}</span> : null;
                },
              },
              {
                header: "Late",
                phone: "hide",
                align: "end",
                cell: (m) => {
                  const g = gridByMember.get(m.member_id);
                  return g ? <span className={`text-sm ${g.late ? "font-semibold text-danger-fg" : "text-content-2"}`}>{g.late}</span> : null;
                },
              },
              {
                header: "Reviews given",
                phone: "hide",
                align: "end",
                cell: (m) => (m.role === "learner" ? <span className="text-sm text-content-2">{reviewsGiven.get(m.profile_id) ?? 0}</span> : null),
              },
            ]}
          />
        )}
      </section>

      <section aria-labelledby="grid-heading" className="flex flex-col gap-3">
        <h2 id="grid-heading" className="text-subtitle text-content">
          Progress
        </h2>
        <ul aria-label="Grid key" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {(Object.keys(CELL_LABEL) as CellState[]).map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`inline-flex h-6 min-w-10 items-center justify-center rounded px-1 text-xs font-semibold ${CELL_STYLE[s].className} ${s === "upcoming" ? "border border-line" : ""}`}
              >
                {s === "passed" ? cohort.program.pass_score : s === "below" ? cohort.program.pass_score - 1 : CELL_STYLE[s].mark || "·"}
              </span>
              <span className="text-content-2">{CELL_LABEL[s]}</span>
            </li>
          ))}
        </ul>
        {grid.length === 0 ? (
          <EmptyState title="No learners to track yet">Each learner gets a row of twelve weeks here once they join.</EmptyState>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-line" tabIndex={0} role="region" aria-label="Progress grid, scrolls sideways">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">Each learner&apos;s weeks: score when graded, otherwise the state of the week</caption>
              <thead className="bg-surface-sunken text-content-2">
                <tr>
                  <th scope="col" className="sticky left-0 z-10 bg-surface-sunken px-3 py-2 text-left font-semibold">
                    Learner
                  </th>
                  {numbers.map((n) => (
                    <th key={n} scope="col" className="px-1 py-2 text-center font-semibold">
                      <abbr title={`Week ${n}`} className="no-underline">
                        W{n}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {grid.map(({ learner, cells }) => (
                  <tr key={learner.member_id}>
                    <th scope="row" className="sticky left-0 z-10 max-w-40 truncate bg-surface px-3 py-1.5 text-left font-semibold text-content">
                      <Link href={`/mentor/learners/${learner.member_id}`} className="inline-flex min-h-11 items-center hover:underline">
                        {nameOf(learner)}
                      </Link>
                    </th>
                    {cells.map((c) => {
                      if (!c.week || !c.state) {
                        return (
                          <td key={c.n} className="px-1 py-1.5 text-center text-content-3">
                            <span className="sr-only">No week chosen yet</span>
                            <span aria-hidden="true">·</span>
                          </td>
                        );
                      }
                      const style = CELL_STYLE[c.state];
                      const text = c.state === "passed" || c.state === "below" ? String(c.sub?.final_score) : style.mark;
                      const label = `Week ${c.n}: ${CELL_LABEL[c.state]}${c.sub?.final_score != null ? `, ${c.sub.final_score}` : ""}`;
                      const box = `inline-flex min-h-11 min-w-11 items-center justify-center rounded px-1 text-xs font-semibold ${style.className}`;
                      return (
                        <td key={c.n} className="px-1 py-1 text-center">
                          {c.sub ? (
                            <Link href={`/mentor/submissions/${c.sub.id}`} aria-label={label} title={label} className={`${box} hover:ring-2 hover:ring-line-strong`}>
                              {text || "·"}
                            </Link>
                          ) : (
                            <span title={label} className={box}>
                              <span className="sr-only">{label}</span>
                              <span aria-hidden="true">{text || "·"}</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-content-3">{label}</dt>
      <dd className="font-semibold text-content">{value}</dd>
    </div>
  );
}

/** A plain GET form, so switching cohorts works without client code. */
function CohortSwitcher({ cohorts, current }: { cohorts: ConsoleCohort[]; current: ConsoleCohort }) {
  if (cohorts.length < 2) return null;
  return (
    <form action="/mentor" method="get" className="mt-2 flex max-w-xl flex-col gap-2">
      <label htmlFor="cohort" className="text-sm font-semibold text-content">
        Cohort
      </label>
      <div className="flex gap-2">
        <select
          id="cohort"
          name="cohort"
          defaultValue={current.id}
          className="min-h-11 w-full min-w-0 rounded-md border border-line-strong bg-surface px-3 text-base text-content"
        >
          {cohorts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({COHORT_STATUS_LABEL[c.status as CohortStatus] ?? c.status})
            </option>
          ))}
        </select>
        <button type="submit" className={buttonClasses("secondary")}>
          Open
        </button>
      </div>
    </form>
  );
}
