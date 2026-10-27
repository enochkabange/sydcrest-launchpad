import type { ReactNode } from "react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { OFFER_KIND_HINTS, OFFER_KIND_LABELS, OFFER_KINDS, SOFT_LAUNCH_NOTE } from "@/lib/market-apply/offers";

/** The frame shared by the new and edit offer pages: the form in a column, a guide to offer kinds beside it from lg. */
export function OfferEditorFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <MainWithRail
      railLabel="Kinds of offer"
      sticky
      rail={
        <div className="flex flex-col gap-4 rounded-lg border border-line p-5">
          <h2 className="text-h3 font-semibold text-content">Kinds of offer</h2>
          <dl className="flex flex-col gap-3">
            {OFFER_KINDS.map((k) => (
              <div key={k} className="flex flex-col gap-0.5">
                <dt className="font-semibold text-content">{OFFER_KIND_LABELS[k]}</dt>
                <dd className="text-sm text-content-2">{OFFER_KIND_HINTS[k]}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-line pt-4 text-sm text-content-2">
            <span className="font-semibold text-content">{SOFT_LAUNCH_NOTE}.</span> Learners do not pay yet. A price you
            add is shown as indicative and is never charged.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-6 lg:max-w-2xl">
        <Link href="/expert" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link hover:underline">
          Back to your expert dashboard
        </Link>
        <h1 className="text-title text-content">{title}</h1>
        {children}
      </div>
    </MainWithRail>
  );
}
