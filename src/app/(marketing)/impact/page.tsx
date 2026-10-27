import { Card, PageHeader, Section } from "@/components/marketing/section";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { AutoGrid, SectionGrid } from "@/components/ui/layout";
import { PILOT } from "@/content/marketing";
import { getImpactSummary } from "@/lib/outcomes/public";
import { getPublishedRoadmaps } from "@/lib/roadmaps/public";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "impact",
  title: "Impact",
  description:
    "What SydCrest learners go on to do, counted honestly: only outcomes our team has verified, each number with a plain definition, and nothing estimated.",
  path: "/impact",
});

const EMPTY_HEADLINE = "We will publish outcomes once our first cohort finishes";

function Figure({ value, label, definition }: { value: number; label: string; definition: string }) {
  return (
    <div className="flex h-full flex-col gap-2 rounded-lg border border-line bg-surface p-5 xl:p-6">
      <span className="text-4xl font-bold text-content tabular-nums xl:text-5xl">{value.toLocaleString("en-GB")}</span>
      <span className="text-h3 text-content">{label}</span>
      <span className="text-sm text-content-2">{definition}</span>
    </div>
  );
}

/**
 * The public impact page. Every number is read from the database at build
 * and refreshed when an admin verifies an outcome (revalidateOutcomeStats) or
 * publishes a roadmap: verified outcomes from public_outcome_stats (counts
 * only) and published roadmaps. No estimates, no projections, no names.
 */
export default async function ImpactPage() {
  const [impact, roadmaps] = await Promise.all([getImpactSummary(), getPublishedRoadmaps()]);
  const topics = roadmaps.reduce((sum, r) => sum + r.node_count, 0);
  const hasOutcomes = impact.total > 0;

  return (
    <>
      <PageHeader
        eyebrow="Impact"
        title="Our impact, counted honestly"
        lead={
          <p>
            We measure one thing above all: learners who complete a cohort and land a verifiable opportunity (a job, internship,
            freelance contract or scholarship) within six months. Every number on this page is a real count with a plain
            definition. If we have not verified it, it is not here.
          </p>
        }
        aside={
          hasOutcomes ? (
            <Figure
              value={impact.total}
              label={impact.total === 1 ? "Verified outcome" : "Verified outcomes"}
              definition="Jobs, internships, freelance contracts, scholarships and grants that SydCrest learners reported and our team checked against evidence."
            />
          ) : (
            <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
              <p className="text-h3 text-content">{EMPTY_HEADLINE}</p>
              <p className="text-body text-content-2">
                Our first cohort starts in {PILOT.starts} and runs for {PILOT.weeks} weeks. Outcomes take time to land and to
                verify, so this page starts at zero and grows only with real results.
              </p>
            </div>
          )
        }
      />

      <Section
        tone="sunken"
        title="Verified outcomes"
        intro={
          <p>
            A verified outcome is one a learner reported with evidence, such as an offer letter, a contract or an award email, and
            our team confirmed. We publish counts only, never names or employers.
          </p>
        }
      >
        {hasOutcomes ? (
          <AutoGrid as="ul" min="sm">
            {impact.byType.map((t) => (
              <li key={t.value}>
                <Figure
                  value={t.count}
                  label={t.count === 1 ? t.label : t.plural}
                  definition={`${t.definition} Held by ${t.people} ${t.people === 1 ? "learner" : "learners"}.`}
                />
              </li>
            ))}
          </AutoGrid>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:p-6">
            <div className="flex max-w-reading flex-col gap-2">
              <h3 className="text-h3 text-content">Nothing verified yet</h3>
              <p className="text-body text-content-2">
                {EMPTY_HEADLINE}. Until then this stays empty: we would rather show an empty space than a number we cannot stand
                behind.
              </p>
            </div>
            <Link href="/programme" className={buttonClasses("primary", "shrink-0")}>
              About the first cohort
            </Link>
          </div>
        )}
      </Section>

      <Section
        title="What is live today"
        intro={<p>Counted from what is published on the platform right now. Anyone can open and follow these for free.</p>}
      >
        <SectionGrid cols={2}>
          <Figure
            value={roadmaps.length}
            label={roadmaps.length === 1 ? "Published roadmap" : "Published roadmaps"}
            definition="Free career roadmaps written for the Ghanaian job market and open to everyone on the roadmaps page."
          />
          <Figure
            value={topics}
            label={topics === 1 ? "Roadmap step" : "Roadmap steps"}
            definition="Sections and topics across those roadmaps, the same steps you see when you open one."
          />
        </SectionGrid>
      </Section>

      <Section tone="sunken" title="How we count">
        <SectionGrid cols={3}>
          <Card title="Only verified">
            <p>
              A learner reports an outcome and attaches evidence. It counts here only after someone on our team has checked it.
              Unchecked or rejected reports never count.
            </p>
          </Card>
          <Card title="Within six months">
            <p>
              For our North Star, an outcome counts toward a cohort when it started between the cohort start and six months after
              the cohort ended. Outcomes outside that window still appear in the totals above.
            </p>
          </Card>
          <Card title="Counts, not people">
            <p>
              One learner can land more than one outcome, such as a scholarship and then a job, so each outcome is counted once and
              we say how many learners hold each kind.
            </p>
          </Card>
        </SectionGrid>
      </Section>
    </>
  );
}
