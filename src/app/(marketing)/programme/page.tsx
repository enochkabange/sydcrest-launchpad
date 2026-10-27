import { CurriculumWeeks } from "@/components/marketing/curriculum-weeks";
import { Card, PageHeader, Section } from "@/components/marketing/section";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { PILOT } from "@/content/marketing";
import { TRACK_LABELS, TRACKS } from "@/content/dmp/curriculum";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "programme",
  title: "The Delta Mentoring Program",
  description: `A free ${PILOT.weeks} week cohort in digital skills and digital marketing, with a mentor and a cohort beside you. ${PILOT.seats} pilot seats, starting ${PILOT.starts}. Join the waitlist.`,
  path: "/programme",
});

const FACTS = [
  { value: `${PILOT.weeks} weeks`, label: "guided, with weekly assignments" },
  { value: `${PILOT.seats} seats`, label: "in the pilot cohort" },
  { value: "Free", label: "for the pilot cohort" },
  { value: PILOT.starts, label: "first cohort starts" },
];

export default function ProgrammePage() {
  return (
    <>
      <PageHeader
        eyebrow="Programme"
        title="The Delta Mentoring Program"
        lead={
          <p>
            {PILOT.weeks} weeks from computer basics to a portfolio of real digital marketing work, with a
            mentor and a cohort beside you. The pilot cohort is free: {PILOT.seats} seats, starting{" "}
            {PILOT.starts}.
          </p>
        }
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-4 pb-12 md:grid-cols-4 md:px-8">
        {FACTS.map((f) => (
          <div key={f.label} className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-4">
            <span className="text-xl font-bold text-content">{f.value}</span>
            <span className="text-sm text-content-2">{f.label}</span>
          </div>
        ))}
      </div>

      <Section tone="sunken" title="Who it is for">
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Beginners welcome">
            <p>Week 1 starts with computer and internet basics. You do not need any tech background to join.</p>
          </Card>
          <Card title="Three specialisations">
            <p>After the shared foundation you choose one: {TRACKS.map((t) => TRACK_LABELS[t]).join(", ")}.</p>
          </Card>
          <Card title="Work you can show">
            <p>Every week ends with an assignment, and by week 11 you have a portfolio with at least three pieces of work.</p>
          </Card>
        </div>
      </Section>

      <Section
        title="The curriculum, week by week"
        intro="Built on free, trusted resources like Google Skillshop, Meta Blueprint and GCFGlobal, so nothing stops when the cohort ends."
      >
        <CurriculumWeeks />
      </Section>

      <Section
        id="waitlist"
        tone="sunken"
        title={`Join the waitlist for ${PILOT.starts}`}
        intro={`There are ${PILOT.seats} free seats in the pilot cohort. Join the waitlist and tell us where you are and what you want.`}
      >
        <div className="max-w-lg rounded-lg border border-line bg-surface p-5">
          <WaitlistForm />
        </div>
      </Section>
    </>
  );
}
