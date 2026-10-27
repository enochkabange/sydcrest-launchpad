import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { DataTable, MainWithRail, rowLinkClass } from "@/components/ui/layout";
import { Card, CELL_STYLE, Pill } from "@/components/mentor/fields";
import { DeferForm, NoteForm } from "@/components/mentor/forms";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { nameOf, requireStaff, shortDate, type ConsoleSubmission, type ConsoleWeek, type RosterRow } from "@/lib/mentor/data";
import { CELL_LABEL, MEMBER_STATUS_LABEL, cellState, dueOn, learnerPath, todayInAccra } from "@/lib/mentor/progress";
import { addNote, deferLearner, deleteNote } from "../../actions";

export const metadata: Metadata = { title: "Learner", robots: { index: false } };

// The app shell's nav reads usePathname() outside Suspense, which a dynamic
// segment cannot prerender (same as /learn/[slug]/[node]).
export const instant = false;

export default function LearnerPage({ params }: PageProps<"/mentor/learners/[memberId]">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Learner params={params} />
    </Suspense>
  );
}

async function Learner({ params }: { params: Promise<{ memberId: string }> }) {
  const { memberId } = await params;
  const { cohorts, supabase, userId } = await requireStaff();
  if (!/^[0-9a-f-]{36}$/i.test(memberId)) notFound();

  const { data: rows } = await supabase.from("cohort_roster").select("*").eq("member_id", memberId);
  const member = (rows ?? [])[0] as RosterRow | undefined;
  const cohort = member && cohorts.find((c) => c.id === member.cohort_id);
  if (!member || !cohort || member.role !== "learner") notFound();

  const [{ data: weeks }, { data: subs }, { data: staff }, { data: memberships }, { data: later }, { count: given }] = await Promise.all([
    supabase
      .from("program_weeks")
      .select("id, week_number, specialization, theme, is_capstone, assignment")
      .eq("program_id", cohort.program.id)
      .order("week_number"),
    supabase
      .from("submissions")
      .select("id, profile_id, program_week_id, cohort_id, status, attempt, final_score, ai_score, submitted_at")
      .eq("program_id", cohort.program.id)
      .eq("profile_id", member.profile_id)
      .neq("status", "draft"),
    supabase.from("cohort_roster").select("profile_id, display_name").neq("role", "learner"),
    supabase.from("cohort_roster").select("member_id, cohort_id, status").eq("profile_id", member.profile_id),
    supabase
      .from("cohorts")
      .select("id, name, starts_on, status")
      .eq("program_id", cohort.program.id)
      .gt("starts_on", cohort.starts_on)
      .in("status", ["planned", "enrolling", "running"])
      .order("starts_on"),
    supabase.from("peer_reviews").select("id", { count: "exact", head: true }).eq("reviewer_id", member.profile_id).eq("status", "submitted"),
  ]);

  // Notes on every membership of this learner the caller can see (RLS: staff of that cohort).
  const memberIds = (memberships ?? []).map((m) => m.member_id).filter((x): x is string => !!x);
  const { data: notes } = await supabase
    .from("cohort_notes")
    .select("id, author_id, body, created_at")
    .in("cohort_member_id", memberIds.length ? memberIds : [memberId])
    .order("created_at", { ascending: false });

  const staffNames = new Map((staff ?? []).map((s) => [s.profile_id, s.display_name?.trim() || "A staff member"]));
  const path = learnerPath((weeks ?? []) as ConsoleWeek[], member.specialization);
  const subByWeek = new Map(((subs ?? []) as ConsoleSubmission[]).map((s) => [s.program_week_id, s]));
  const today = todayInAccra();
  const rowsForTable = path.map((w) => {
    const sub = subByWeek.get(w.id) ?? null;
    const state = cellState({
      status: sub?.status ?? null,
      finalScore: sub?.final_score ?? null,
      passScore: cohort.program.pass_score,
      startsOn: cohort.starts_on,
      weekNumber: w.week_number,
      graceDays: cohort.program.grace_days,
      today,
    });
    return { week: w, sub, state };
  });
  const passed = rowsForTable.filter((r) => r.state === "passed").length;
  const spec = cohort.program.specializations.find((s) => s.slug === member.specialization)?.label;
  const canDefer = member.status === "active" || (member.status === "deferred" && !member.deferred_to);
  const movedTo = member.deferred_to
    ? (cohorts.find((c) => c.id === member.deferred_to) ?? (later ?? []).find((c) => c.id === member.deferred_to))
    : null;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <Link
          href={`/mentor?cohort=${cohort.id}`}
          className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-semibold text-content-2 hover:text-content"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          {cohort.name}
        </Link>
        <h1 className="text-title text-content">{nameOf(member)}</h1>
        <div className="flex flex-wrap gap-2">
          <Pill tone={member.status === "deferred" ? "warning" : member.status === "completed" ? "success" : "neutral"}>
            {MEMBER_STATUS_LABEL[member.status] ?? member.status}
          </Pill>
          <Pill>{spec ?? "No specialization yet"}</Pill>
          <Pill>
            {passed} of {path.length} weeks passed
          </Pill>
          <Pill>
            {given ?? 0} peer {given === 1 ? "review" : "reviews"} given
          </Pill>
        </div>
        {member.status === "deferred" && (
          <p className="text-content-2">
            {movedTo ? `Moved to ${movedTo.name}.` : member.deferred_to ? "Moved to a later cohort." : "Waiting for a later cohort."}
          </p>
        )}
      </header>

      <MainWithRail
        railLabel="Notes and deferral"
        rail={
          <>
            <Card title="Private notes">
              <NoteForm action={addNote.bind(null, memberId)} />
              {(notes ?? []).length === 0 ? (
                <p className="text-sm text-content-2">No notes yet.</p>
              ) : (
                <ul className="flex flex-col divide-y divide-line">
                  {(notes ?? []).map((n) => (
                    <li key={n.id} className="flex flex-col gap-1 py-3">
                      <p className="whitespace-pre-line text-sm text-content">{n.body}</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-content-3">
                          {staffNames.get(n.author_id) ?? "A staff member"}, {shortDate(n.created_at)}
                        </p>
                        {n.author_id === userId && (
                          <form action={deleteNote.bind(null, n.id)}>
                            <Button type="submit" variant="ghost" className="min-h-11 px-2 text-xs">
                              Delete<span className="sr-only"> this note</span>
                            </Button>
                          </form>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
            {canDefer && (
              <Card title="Defer to a later cohort">
                <p className="text-sm text-content-2">
                  For a learner who has fallen behind past the grace days. Their work so far is kept and their new mentors can see it.
                </p>
                <DeferForm
                  action={deferLearner.bind(null, memberId)}
                  targets={(later ?? []).map((c) => ({ id: c.id, label: `${c.name}, starts ${shortDate(c.starts_on)}` }))}
                />
              </Card>
            )}
          </>
        }
      >
        <section aria-labelledby="weeks-heading" className="flex flex-col gap-3">
          <h2 id="weeks-heading" className="text-subtitle text-content">
            Weeks
          </h2>
          <DataTable
            caption={`${nameOf(member)}'s weeks`}
            rowKey={(r) => r.week.id}
            rows={rowsForTable}
            columns={[
              { header: "Week", className: "w-16", cell: (r) => <span className="font-semibold text-content">{r.week.week_number}</span> },
              {
                header: "Theme",
                cell: (r) =>
                  r.sub ? (
                    <Link href={`/mentor/submissions/${r.sub.id}`} className={`text-content ${rowLinkClass}`}>
                      {displayTheme(r.week.theme)}
                    </Link>
                  ) : (
                    <span className="text-content">{displayTheme(r.week.theme)}</span>
                  ),
              },
              { header: "Due", phone: "hide", cell: (r) => <span className="text-sm text-content-2">{shortDate(dueOn(cohort.starts_on, r.week.week_number))}</span> },
              {
                header: "State",
                cell: (r) => (
                  <span className={`inline-flex rounded px-2 py-0.5 text-sm ${CELL_STYLE[r.state].className}`}>{CELL_LABEL[r.state]}</span>
                ),
              },
              {
                header: "Score",
                align: "end",
                phone: "hide",
                cell: (r) => <span className="text-sm text-content">{r.sub?.final_score ?? ""}</span>,
              },
            ]}
          />
        </section>
      </MainWithRail>
    </div>
  );
}
