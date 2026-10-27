import Link from "@/components/ui/link";
import { Initials } from "@/components/social/profile-bits";
import type { RosterMember } from "@/lib/cohort/data";

const ROLE_LABEL: Record<string, string> = { mentor: "Mentor", coordinator: "Coordinator", learner: "Learner" };

function Person({ m }: { m: RosterMember }) {
  const body = (
    <>
      <Initials name={m.name} />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold text-content">
          {m.name}
          {m.isMe ? " (you)" : ""}
        </span>
        {m.role !== "learner" && <span className="text-xs text-content-3">{ROLE_LABEL[m.role] ?? m.role}</span>}
      </span>
    </>
  );
  const cls = "flex min-h-11 items-center gap-3 rounded-md px-2 py-1.5";
  return m.publicSlug ? (
    <Link href={`/u/${m.publicSlug}`} className={`${cls} no-underline transition-colors hover:bg-surface-sunken`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Mentor and coordinator first, then the learners. Names come from the cohort_roster view only. */
export function CohortPeople({ roster }: { roster: RosterMember[] }) {
  const staff = roster.filter((m) => m.role !== "learner");
  const learners = roster.filter((m) => m.role === "learner").sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section aria-labelledby="people-heading" className="flex flex-col gap-4">
      <h2 id="people-heading" className="text-subtitle text-content">
        Your cohort
      </h2>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-6">
        <div className="flex flex-col gap-2 rounded-lg border border-line p-4">
          <h3 className="text-sm font-semibold text-content-3">{staff.length === 1 ? "Mentor" : "Mentors"}</h3>
          {staff.length ? (
            <ul className="flex flex-col">
              {staff.map((m) => (
                <li key={m.memberId}>
                  <Person m={m} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-content-2">Your mentor will be introduced here before the cohort starts.</p>
          )}
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-line p-4">
          <h3 className="text-sm font-semibold text-content-3">
            {learners.length} {learners.length === 1 ? "learner" : "learners"}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {learners.map((m) => (
              <li key={m.memberId}>
                <Person m={m} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
