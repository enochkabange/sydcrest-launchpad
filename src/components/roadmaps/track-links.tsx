import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "@/components/ui/link";
import type { CrossLinks, TrackLink } from "@/lib/roadmaps/links";
import { roadmapPath } from "@/lib/roadmaps/seo";

/**
 * "Builds on" and "Leads to" (issue #244): where this roadmap sits among the
 * others. Prerendered from cached content. Nothing when there are no links.
 */
export function TrackLinks({ links, title }: { links: CrossLinks; title: string }) {
  if (!links.buildsOn.length && !links.leadsTo.length) return null;
  return (
    <section aria-labelledby="track-links-heading" className="mt-12 xl:mt-16">
      <h2 id="track-links-heading" className="text-h2 text-content lg:text-subtitle">
        Where {title} fits
      </h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2 xl:gap-10">
        <LinkList heading="Builds on" lead="Roadmaps that lead here, if you want a gentler start." links={links.buildsOn} icon="back" />
        <LinkList heading="Leads to" lead="Where you can go once you finish this one." links={links.leadsTo} icon="next" />
      </div>
    </section>
  );
}

function LinkList({ heading, lead, links, icon }: { heading: string; lead: string; links: TrackLink[]; icon: "back" | "next" }) {
  if (!links.length) return <div className="hidden md:block" />;
  const Icon = icon === "back" ? ArrowLeft : ArrowRight;
  return (
    <div>
      <h3 className="text-h3 text-content">{heading}</h3>
      <p className="mt-1 text-sm text-content-2">{lead}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.slug}>
            <Link
              href={roadmapPath(l.slug)}
              className="flex min-h-11 items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-content hover:bg-surface-sunken"
            >
              <Icon aria-hidden className="size-4 shrink-0 text-content-3" />
              <span className="flex-1 font-semibold">{l.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
