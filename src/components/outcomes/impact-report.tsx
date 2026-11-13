import { responseRate, type OutcomeReport } from "@/lib/outcomes/checkins";
import { impactCount } from "@/lib/sponsorships";

/**
 * One outcome check in report (#329): who was asked, who answered, what they
 * were doing before (About you) and now (the check in), earnings bands and
 * stories learners chose to share. Shared by the admin page, the sponsor's
 * Impact tab and the print page. For sponsors the database has already held
 * back every count under five; those show as "Fewer than 5".
 */
export function ImpactReport({
  report,
  months,
  stories,
  idPrefix,
  showStories = true,
}: {
  report: OutcomeReport;
  months: number;
  stories: { display_name: string | null; story: string }[];
  idPrefix: string;
  /** Off where the page already lists the stories. */
  showStories?: boolean;
}) {
  const nobodyShared = report.shared === 0;
  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Learners covered", impactCount(report.learners)],
          [`${months} month check ins sent`, impactCount(report.sent)],
          ["Answered", responseRate(report.answered, report.sent)],
          ["Agreed to be counted", impactCount(report.shared)],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1 rounded-md bg-surface-sunken p-3 print:border print:border-line">
            <dt className="text-sm text-content-2">{label}</dt>
            <dd className="text-h3 font-bold text-content tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="max-w-reading text-sm text-content-2">
        The response rate counts every answer. Everything below counts only the answers of learners who agreed to be counted,
        without their names. Before is what they told us in About you; now is their check in answer.
      </p>

      {nobodyShared ? (
        <p className="text-content-2">No learner has agreed to be counted yet, so there is no before and after to show.</p>
      ) : (
        <>
          <section aria-labelledby={`${idPrefix}-work`} className="flex flex-col gap-3">
            <h3 id={`${idPrefix}-work`} className="text-h3 text-content">
              Before and after
            </h3>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["In work before", impactCount(report.workingBefore)],
                ["In work now", impactCount(report.workingAfter)],
                ["Moved into work", impactCount(report.intoWork)],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 rounded-md border border-line p-3">
                  <dt className="text-sm text-content-2">{label}</dt>
                  <dd className="text-h3 font-bold text-content tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-content-3">In work means employed, running their own business or, now, freelancing.</p>
          </section>

          <div className="grid gap-6 lg:grid-cols-3">
            <Breakdown id={`${idPrefix}-before`} title="Before (About you)" rows={report.before} />
            <Breakdown id={`${idPrefix}-after`} title="Now" rows={report.after} />
            <Breakdown id={`${idPrefix}-earnings`} title="Monthly earnings now" rows={report.earnings} />
          </div>
        </>
      )}

      {showStories && (
      <section aria-labelledby={`${idPrefix}-stories`} className="flex flex-col gap-3">
        <h3 id={`${idPrefix}-stories`} className="text-h3 text-content">
          Stories
        </h3>
        {stories.length === 0 ? (
          <p className="text-content-2">No learner has shared a story yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {stories.map((st, i) => (
              <li key={i} className="flex flex-col gap-1 rounded-md border border-line p-4 print:break-inside-avoid">
                <p className="whitespace-pre-line text-content">{st.story}</p>
                <p className="text-sm text-content-3">{st.display_name ?? "A learner"}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      )}
    </div>
  );
}

function Breakdown({ id, title, rows }: { id: string; title: string; rows: OutcomeReport["after"] }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-2 print:break-inside-avoid">
      <h4 id={id} className="font-semibold text-content">
        {title}
      </h4>
      {rows.length === 0 ? (
        <p className="text-sm text-content-2">No answers yet.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{title}</caption>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.bucket}>
                <th scope="row" className="py-2 pr-3 font-normal text-content-2">
                  {r.label}
                </th>
                <td className="py-2 text-right font-semibold text-content tabular-nums">{impactCount(r.people)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
