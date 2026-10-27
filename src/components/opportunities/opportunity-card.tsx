import { ArrowRight } from "lucide-react";
import Link from "@/components/ui/link";
import type { Opportunity } from "@/lib/opportunities/model";
import { KindLabel, StatusLabel, WhereAndWhen } from "./meta";
import { opportunityPath } from "./paths";

/** One opportunity on the board: the whole card is the link to its page. */
export function OpportunityCard({
  o,
  today,
  status,
  headingLevel = "h2",
}: {
  o: Opportunity;
  today: string;
  status?: "saved" | "applied";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="relative flex h-full flex-col gap-3 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-sunken xl:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <KindLabel kind={o.kind} />
        {status && <StatusLabel status={status} />}
      </div>
      <div className="flex flex-col gap-1">
        <Heading className="text-h3 text-content">
          <Link
            href={opportunityPath(o.slug)}
            className="text-content no-underline after:absolute after:inset-0 after:rounded-lg after:content-['']"
          >
            {o.title}
          </Link>
        </Heading>
        <p className="text-sm font-semibold text-content-2">{o.organisation_name}</p>
      </div>
      {o.summary && <p className="line-clamp-3 text-content-2">{o.summary}</p>}
      <div className="mt-auto flex items-end justify-between gap-3 pt-1">
        <WhereAndWhen o={o} today={today} />
        <ArrowRight aria-hidden className="size-4 shrink-0 text-content-3" />
      </div>
    </article>
  );
}
