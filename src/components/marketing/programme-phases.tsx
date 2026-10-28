import { ArrowRight, Check } from "lucide-react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { SectionGrid } from "@/components/ui/layout";
import { TRACK_LABELS, type DmpTrack } from "@/content/dmp/curriculum";

/**
 * The twelve weeks as three phases (issue #239): a short overview for
 * /programme. The full week by week outline lives on /programme/curriculum.
 */

type Phase = { weeks: string; bar: string; title: string; summary: string; outcomes: string[] };

const PHASES: Phase[] = [
  {
    weeks: "Weeks 1 to 6",
    bar: "col-span-6 bg-info-fg",
    title: "Foundation",
    summary: "Everyone starts together, from using a computer and the internet safely to reading a marketing report.",
    outcomes: [
      "Work in Gmail, Google Drive, Docs, Slides and Sheets",
      "Run a business Facebook Page and plan two weeks of posts",
      "Read a Google Analytics report and suggest next steps",
    ],
  },
  {
    weeks: "Weeks 7 to 9",
    bar: "col-span-3 bg-warning-fg",
    title: "Specialise",
    summary: "Choose one specialisation and go deeper for three weeks.",
    outcomes: [],
  },
  {
    weeks: "Weeks 10 to 12",
    bar: "col-span-3 bg-success-fg",
    title: "Portfolio and capstone",
    summary: "Bring it together in a campaign, a portfolio and a capstone your mentor reviews.",
    outcomes: [
      "Plan a campaign across channels with goals and a timeline",
      "Build a portfolio site with at least three pieces of your work",
      "Pass the capstone and a peer review to earn your certificate",
    ],
  },
];

const SPECIALISATIONS: Record<DmpTrack, string> = {
  seo: "Keyword research, local listings and a content plan",
  social_media: "Targeted ads, short video and working with local creators",
  google_ads: "A search campaign with keywords, ads and a budget",
};

function Outcomes({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((o) => (
        <li key={o} className="flex gap-2 text-body text-content-2">
          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-success-fg" />
          <span>{o}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProgrammePhases() {
  return (
    <div className="flex flex-col gap-6 xl:gap-8">
      {/* Twelve weeks drawn to scale from md, so the shape of the programme reads at a glance. */}
      <div aria-hidden="true" className="hidden grid-cols-12 gap-1 md:grid">
        {PHASES.map((p) => (
          <div key={p.title} className={`h-2 rounded-full ${p.bar}`} />
        ))}
      </div>
      <SectionGrid as="ol" cols={3} className="gap-4 xl:gap-6">
        {PHASES.map((p, i) => (
          <li key={p.title} className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 xl:p-8">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold tracking-widest text-content-3 uppercase">
                <span className="sr-only">Phase {i + 1}: </span>
                {p.weeks}
              </p>
              <h3 className="text-h3 text-content">{p.title}</h3>
            </div>
            <p className="text-body text-content">{p.summary}</p>
            {p.outcomes.length > 0 ? (
              <Outcomes items={p.outcomes} />
            ) : (
              <ul className="flex flex-col gap-3">
                {(Object.keys(SPECIALISATIONS) as DmpTrack[]).map((t) => (
                  <li key={t} className="rounded-md border border-line bg-surface-sunken p-3">
                    <p className="text-sm font-semibold text-content">{TRACK_LABELS[t]}</p>
                    <p className="text-sm text-content-2">{SPECIALISATIONS[t]}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </SectionGrid>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-reading text-sm text-content-2">
          Every week has its objectives, SydCrest lessons, an assignment and links for extra practice.
        </p>
        <Link href="/programme/curriculum" className={buttonClasses("secondary", "shrink-0 gap-2")}>
          See the full week by week outline
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </div>
  );
}
