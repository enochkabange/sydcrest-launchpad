import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";

/**
 * The way into reporting an outcome from a learner's own screens. Static, so
 * it needs no Suspense: the list and form behind it read the session.
 */
export function ReportOutcomeCard() {
  return (
    <section
      aria-labelledby="report-outcome-heading"
      className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
    >
      <div className="flex flex-col gap-1">
        <h2 id="report-outcome-heading" className="text-h3 text-content">
          Landed something?
        </h2>
        <p className="text-sm text-content-2">
          Report a job, internship, freelance contract, scholarship or grant. Once our team verifies it, it counts toward what
          SydCrest learners achieve.
        </p>
      </div>
      <Link href="/outcomes" className={buttonClasses("secondary", "shrink-0")}>
        Your outcomes
      </Link>
    </section>
  );
}
