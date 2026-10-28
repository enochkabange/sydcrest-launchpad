import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { formatDay } from "@/lib/programme-apply/data";
import { regionLabel } from "@/lib/regions";
import {
  answeredQuestions,
  isOpen,
  parseScreeningQuestions,
  parseSpecializations,
  statusCopy,
} from "@/lib/programme-apply/screening";
import { DecisionForm } from "./decision-form";

export const metadata: Metadata = { title: "Applications", robots: { index: false } };

const FILTERS = [
  { slug: "submitted", label: "New" },
  { slug: "waitlisted", label: "Waitlisted" },
  { slug: "accepted", label: "Accepted" },
  { slug: "declined", label: "Declined" },
  { slug: "withdrawn", label: "Withdrawn" },
  { slug: "all", label: "All" },
] as const;

type Filter = (typeof FILTERS)[number]["slug"];

export default function ApplicationsPage({ searchParams }: PageProps<"/admin/applications">) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-title text-content">Applications</h1>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Queue searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Queue({ searchParams }: Pick<PageProps<"/admin/applications">, "searchParams">) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const raw = Array.isArray(params.status) ? params.status[0] : params.status;
  const filter: Filter = FILTERS.find((f) => f.slug === raw)?.slug ?? "submitted";

  let query = supabase
    .from("application_queue")
    .select("*")
    .order("created_at", { ascending: filter === "submitted" || filter === "waitlisted" });
  if (filter !== "all") query = query.eq("status", filter);

  const [{ data: rows, error }, { data: programmes }, { data: cohorts }] = await Promise.all([
    query.limit(200),
    supabase.from("programs").select("id, title, specializations, screening_questions"),
    supabase.from("cohorts").select("id, program_id, name, starts_on, max_size, status").order("starts_on"),
  ]);
  if (error) throw new Error(`Could not load applications: ${error.message}`);

  const cohortIds = (cohorts ?? []).map((c) => c.id);
  const { data: members } = cohortIds.length
    ? await supabase
        .from("cohort_members")
        .select("cohort_id")
        .in("cohort_id", cohortIds)
        .eq("role", "learner")
        .eq("status", "active")
    : { data: [] as { cohort_id: string }[] };
  const taken = new Map<string, number>();
  for (const m of members ?? []) taken.set(m.cohort_id, (taken.get(m.cohort_id) ?? 0) + 1);

  const programmeById = new Map(
    (programmes ?? []).map((p) => [
      p.id,
      {
        title: p.title,
        questions: parseScreeningQuestions(p.screening_questions),
        specializations: parseSpecializations(p.specializations),
      },
    ]),
  );
  const cohortById = new Map((cohorts ?? []).map((c) => [c.id, c]));
  const openCohorts = (cohorts ?? []).filter((c) => c.status !== "completed" && c.status !== "cancelled");
  const seatsLabel = (c: { id: string; max_size: number }) => {
    const left = c.max_size - (taken.get(c.id) ?? 0);
    return left > 0 ? `${left} of ${c.max_size} seats left` : "full";
  };
  const applications = rows ?? [];
  const showProgramme = programmeById.size > 1;

  const rail = (
    <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
      <h2 className="text-h3 text-content">Open cohorts</h2>
      {openCohorts.length === 0 ? (
        <p className="text-sm text-content-2">
          No cohort is planned, enrolling or running yet. Create a cohort before accepting applicants; until then you
          can waitlist them.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-line">
          {openCohorts.map((c) => {
            const used = taken.get(c.id) ?? 0;
            const pct = Math.min(100, Math.round((used / c.max_size) * 100));
            return (
              <li key={c.id} className="flex flex-col gap-1.5 py-3 first:pt-0 last:pb-0">
                <p className="font-semibold text-content">{c.name}</p>
                <p className="text-sm text-content-2">
                  Starts {formatDay(c.starts_on)} · {c.status}
                  {showProgramme && ` · ${programmeById.get(c.program_id)?.title ?? ""}`}
                </p>
                <div
                  className="h-2 overflow-hidden rounded-full bg-surface"
                  role="meter"
                  aria-label={`${c.name} seats taken`}
                  aria-valuemin={0}
                  aria-valuemax={c.max_size}
                  aria-valuenow={used}
                >
                  <div className="h-full rounded-full bg-action" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-sm text-content-3">
                  {used} of {c.max_size} learners · {seatsLabel(c)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );

  return (
    <MainWithRail railLabel="Cohorts" rail={rail}>
      <nav aria-label="Application status" className="flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <Link
            key={f.slug}
            href={`/admin/applications?status=${f.slug}`}
            aria-current={f.slug === filter ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              f.slug === filter ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {applications.length === 0 ? (
        <section className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 lg:p-8">
          <h2 className="text-h3 text-content">No applications here</h2>
          <p className="max-w-reading text-content-2">
            {filter === "submitted"
              ? "New applications from the programme page land here for review."
              : "Nothing has this status yet. Try another filter."}
          </p>
        </section>
      ) : (
        <ul className="flex flex-col gap-4">
          {applications.map((a) => {
            const programme = a.program_id ? programmeById.get(a.program_id) : undefined;
            const answers = answeredQuestions(programme?.questions ?? [], a.screening_answers);
            const specialization =
              programme?.specializations.find((s) => s.slug === a.specialization)?.label ?? a.specialization;
            const preferred = a.preferred_cohort_id ? cohortById.get(a.preferred_cohort_id) : undefined;
            const placed = a.cohort_id ? cohortById.get(a.cohort_id) : undefined;
            const name = a.display_name ?? "Unnamed applicant";
            const choices = openCohorts
              .filter((c) => c.program_id === a.program_id)
              .map((c) => ({ id: c.id, label: `${c.name}, ${seatsLabel(c)}` }));
            const region = regionLabel(a.region);

            return (
              <li
                key={a.application_id}
                data-testid="application"
                className="grid gap-5 rounded-lg border border-line p-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-8 lg:p-6"
              >
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-h3 text-content">
                      {a.public_slug ? (
                        <Link href={`/u/${a.public_slug}`} className="text-content-link underline">
                          {name}
                        </Link>
                      ) : (
                        name
                      )}
                    </h2>
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-sm text-content-2">
                      {statusCopy(a.status ?? "").label}
                    </span>
                  </div>
                  <p className="text-sm text-content-3">
                    {[
                      region,
                      showProgramme ? programme?.title : null,
                      a.created_at ? `Applied ${formatDay(a.created_at)}` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <dl className="flex flex-col gap-3">
                    {answers.map(({ prompt, answer }) => (
                      <div key={prompt} className="flex flex-col gap-0.5">
                        <dt className="text-sm text-content-3">{prompt}</dt>
                        <dd className="whitespace-pre-line text-content">{answer}</dd>
                      </div>
                    ))}
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-sm text-content-3">Specialisation</dt>
                      <dd className="text-content">{specialization ?? "Not sure yet"}</dd>
                    </div>
                    {preferred && (
                      <div className="flex flex-col gap-0.5">
                        <dt className="text-sm text-content-3">Preferred cohort</dt>
                        <dd className="text-content">{preferred.name}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="flex flex-col gap-3 lg:border-l lg:border-line lg:pl-8">
                  {isOpen(a.status ?? "") && a.application_id ? (
                    <DecisionForm
                      applicationId={a.application_id}
                      applicantName={name}
                      cohorts={choices}
                      defaultCohortId={choices.some((c) => c.id === a.preferred_cohort_id) ? a.preferred_cohort_id! : undefined}
                    />
                  ) : (
                    <div className="flex flex-col gap-2 text-sm text-content-2">
                      {placed && (
                        <p>
                          In <strong className="text-content">{placed.name}</strong>
                        </p>
                      )}
                      {a.decided_at && <p>Decided {formatDay(a.decided_at)}</p>}
                      {a.decision_note && (
                        <p className="whitespace-pre-line rounded-md bg-surface-sunken px-3 py-2">{a.decision_note}</p>
                      )}
                      {a.status === "withdrawn" && <p>The applicant withdrew.</p>}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </MainWithRail>
  );
}
