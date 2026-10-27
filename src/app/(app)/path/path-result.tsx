import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import type { GapStatus, PathResult } from "@/lib/path/recommend";

const GAP_LABEL: Record<GapStatus, string> = { review: "Quick review", start: "Start here", learn: "To learn" };
const GAP_CLASS: Record<GapStatus, string> = {
  review: "bg-surface-sunken text-content-2",
  start: "bg-info-bg text-info-fg",
  learn: "border border-line text-content-2",
};

export function SavingPath({ label = "Saving your path" }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col gap-4">
      <p className="text-content-2">{label}…</p>
      <div className="h-9 w-64 animate-skeleton rounded-md bg-surface-sunken" />
      <div className="h-32 animate-skeleton rounded-lg bg-surface-sunken" />
      <div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" />
    </div>
  );
}

/** The structured result. No hooks, so server and client can both render it. */
export function PathResultView({ result }: { result: PathResult }) {
  const { nextAction, plan } = result;
  return (
    <article className="flex flex-col gap-8">
      <header className="flex max-w-3xl flex-col gap-3">
        <p className="text-sm font-semibold text-content-2">Your recommended track</p>
        <h1 className="text-3xl text-content">{result.trackTitle}</h1>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-content-2">
          {result.reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </header>

      {!result.roadmap && (
        <p className="max-w-3xl rounded-lg border border-line bg-surface-sunken p-4 text-content-2">
          The {result.trackTitle} roadmap opens soon. Your weekly plan works from today, and your
          starting point will link straight into the roadmap when it opens.
        </p>
      )}

      {/* Stacked on phones; from lg the next step and skill gap sit beside the weekly plan. */}
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-10">
        <div className="flex flex-col gap-8">
          <section aria-labelledby="next-heading" className="flex flex-col items-start gap-3 rounded-lg border border-line p-5">
            <h2 id="next-heading" className="text-lg text-content">
              Your next step
            </h2>
            <p className="font-semibold text-content">{nextAction.label}</p>
            <p className="text-content-2">{nextAction.detail}</p>
            {nextAction.href && (
              <Link href={nextAction.href} className={buttonClasses("primary")}>
                {nextAction.label}
              </Link>
            )}
          </section>

          <section aria-labelledby="gap-heading" className="flex flex-col gap-3">
            <h2 id="gap-heading" className="text-xl text-content">
              Your skill gap
            </h2>
            <p className="text-content-2">
              Start with <strong className="text-content">{result.start.title}</strong>.
              {result.skillGap.some((s) => s.status === "review") &&
                " You told us you have some experience, so skim the earlier sections to check what you know."}
            </p>
            <ol className="flex flex-col gap-2">
              {result.skillGap.map((s, i) => (
                <li key={s.slug} className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-line px-4 py-2">
                  <span className="text-content">
                    <span className="mr-2 text-content-3">{i + 1}.</span>
                    {result.roadmap && s.status === "start" && result.start.href ? (
                      <Link href={result.start.href} className="font-semibold">
                        {s.title}
                      </Link>
                    ) : (
                      s.title
                    )}
                  </span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${GAP_CLASS[s.status]}`}>
                    {GAP_LABEL[s.status]}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="flex flex-col gap-8">
          <section aria-labelledby="plan-heading" className="flex flex-col gap-3">
            <h2 id="plan-heading" className="text-xl text-content">
              Your weekly plan
            </h2>
            <p className="text-content-2">{plan.summary}</p>
            <ol className="flex flex-col gap-2">
              {plan.sessions.map((s) => (
                <li key={s.title} className="flex flex-col gap-1 rounded-md border border-line px-4 py-3">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-content">{s.title}</span>
                    <span className="shrink-0 text-sm text-content-3">{s.minutes} min</span>
                  </span>
                  <span className="text-sm text-content-2">{s.detail}</span>
                </li>
              ))}
            </ol>
            {plan.tips.length > 0 && (
              <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-content-2">
                {plan.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </section>

          <Link href="/start" className={buttonClasses("secondary", "self-start")}>
            Retake the quiz
          </Link>
        </div>
      </div>
    </article>
  );
}
