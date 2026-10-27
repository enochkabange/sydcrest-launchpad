import type { ReactNode } from "react";
import {
  OFFER_KIND_LABELS,
  SOFT_LAUNCH_NOTE,
  formatIndicativePrice,
  offerFacts,
  type OfferInput,
} from "@/lib/market-apply/offers";

/**
 * One offer as learners will see it: kind, title, facts, and always the soft
 * launch note. A price, when the expert gave one, is labelled as indicative.
 * Server safe; `actions` holds the expert's own buttons on the dashboard.
 */
export function OfferSummary({
  offer,
  status,
  actions,
  headingLevel = 3,
}: {
  offer: Pick<
    OfferInput,
    | "kind"
    | "title"
    | "description"
    | "scope"
    | "duration_minutes"
    | "delivery_days"
    | "max_participants"
    | "cadence"
    | "revisions_included"
    | "indicative_price_ghs"
  >;
  status?: ReactNode;
  actions?: ReactNode;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const facts = offerFacts(offer);
  const price = formatIndicativePrice(offer.indicative_price_ghs);
  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-line bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-content-2">{OFFER_KIND_LABELS[offer.kind]}</p>
        {status}
      </div>
      <Heading className="text-h3 font-semibold text-content">{offer.title}</Heading>
      <p className="line-clamp-4 whitespace-pre-line text-content-2">{offer.description}</p>
      {offer.scope && (
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-content">What you get</p>
          <p className="line-clamp-4 whitespace-pre-line text-sm text-content-2">{offer.scope}</p>
        </div>
      )}
      {facts.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Details">
          {facts.map((f) => (
            <li key={f} className="rounded-full border border-line px-2.5 py-0.5 text-sm text-content-2">
              {f}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-col gap-0.5 border-t border-line pt-3">
        <p className="text-sm font-semibold text-success-fg">{SOFT_LAUNCH_NOTE}</p>
        {price && <p className="text-sm text-content-3">{price}, not charged</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </article>
  );
}
