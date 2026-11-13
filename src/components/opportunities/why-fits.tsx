import { ArrowRight, Check } from "lucide-react";
import Link from "@/components/ui/link";
import { improveFit, whyItFits, type Match } from "@/lib/matching/match";
import { trackLabel } from "@/lib/opportunities/model";

/**
 * "Why this fits you" and "What would improve your fit" for one opportunity
 * (#336): matching verified skills and the readiness band for the track, in
 * plain words, never a number. `compact` is one short block for a card (no
 * links, because the whole card is a link).
 */
export function WhyThisFits({ match, compact = false }: { match: Match; compact?: boolean }) {
  const why = whyItFits(match, trackLabel);
  const improve = improveFit(match, trackLabel);
  if (!why.length && !improve) return null;

  if (compact) {
    return (
      <div className="flex flex-col gap-1 rounded-md bg-surface-sunken px-3 py-2 text-sm">
        {why.length > 0 && (
          <p className="text-content">
            <span className="font-semibold">Why this fits you:</span> {why.join(" ")}
          </p>
        )}
        {improve && (
          <p className="text-content-2">
            <span className="font-semibold">To improve your fit:</span> {improve.text}
          </p>
        )}
      </div>
    );
  }

  return (
    <section aria-labelledby="fit-heading" className="flex max-w-reading flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
      {why.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 id="fit-heading" className="text-h3 text-content">
            Why this fits you
          </h2>
          <ul className="flex flex-col gap-1.5">
            {why.map((line) => (
              <li key={line} className="flex gap-2 text-content-2">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-success-fg" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {improve && (
        <div className="flex flex-col gap-2">
          <h2 id={why.length ? undefined : "fit-heading"} className="text-h3 text-content">
            What would improve your fit
          </h2>
          <p className="text-content-2">{improve.text}</p>
          <Link href={improve.href} className="inline-flex min-h-11 items-center gap-1 self-start font-semibold text-content-link underline">
            {improve.href.startsWith("/skills/") ? "See the skill" : improve.href === "/roadmaps" ? "Browse the roadmaps" : "Go to the roadmap"}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      )}
      <p className="text-sm text-content-3">
        This only changes the order we suggest opportunities in. Every open opportunity stays on the board for you.
      </p>
    </section>
  );
}
