import { OUTCOME_TYPES } from "@/lib/outcomes/labels";

/** What each type means, beside the form from lg and after it on phones. */
export function OutcomeTypesGuide() {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
      <h2 className="text-h3 text-content">What counts</h2>
      <dl className="flex flex-col gap-3 text-sm">
        {OUTCOME_TYPES.map((t) => (
          <div key={t.value}>
            <dt className="font-semibold text-content">{t.label}</dt>
            <dd className="text-content-2">{t.definition}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm text-content-2">
        Report outcomes you landed while learning with SydCrest or after. Only our team sees your evidence.
      </p>
    </section>
  );
}
