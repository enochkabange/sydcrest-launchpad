import Link from "@/components/ui/link";
import { HeroGraphic, StepGraphic } from "@/components/brand/illustrations";
import { Card, Section, Stat } from "@/components/marketing/section";
import { buttonClasses } from "@/components/ui/button";
import { BOLGATANGA, COMMUNITY_SIZE, PILOT } from "@/content/marketing";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "home",
  title: "SydCrest Launchpad · Find your path into tech",
  absoluteTitle: true,
  description:
    "Start from zero, learn with people beside you, and earn from your skills, all in one place. Free roadmaps, mentors and a free 12 week cohort, built in Northern Ghana.",
  path: "/",
});

const LANES = [
  {
    title: "Learn",
    status: `First cohort ${PILOT.starts}`,
    body: `Free roadmaps written for the Ghanaian job market, and the Delta Mentoring Program: ${PILOT.weeks} guided weeks with a cohort that learns together.`,
  },
  {
    title: "Get mentored",
    status: "Opening in 2027",
    body: "Mentors who have done it before, and Study Buddy, an AI companion for the questions that come up between sessions.",
  },
  {
    title: "Earn",
    status: "On our roadmap",
    body: "Gigs, job briefs and placements, so skills you can prove turn into income. Payments go straight to you. SydCrest never holds your money.",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:px-8 md:py-20">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-bold tracking-widest text-content-accent uppercase">Built in Northern Ghana</p>
          <h1 className="text-4xl text-content md:text-6xl">Find your path into tech.</h1>
          <p className="max-w-prose text-lg text-content-2">
            Start from zero, learn with people beside you, and earn from your skills, all in one
            place. SydCrest takes young Ghanaians from &ldquo;where do I start&rdquo; to employable
            and earning, beginning in the regions everyone else skips.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className={buttonClasses("primary")}>
              Create a free account
            </Link>
            <Link href="/login" className={buttonClasses("secondary")}>
              Sign in
            </Link>
          </div>
          <Link href="/programme" className="flex min-h-11 items-center self-start font-semibold">
            {PILOT.seats} free seats in the January cohort. See the programme
          </Link>
        </div>
        <HeroGraphic className="mx-auto w-56 shrink-0 md:w-96" />
      </section>

      <Section
        tone="sunken"
        title="One path, three stages"
        intro="Most programmes own one slice. We are building the whole journey, so you are never left at a handoff wondering what comes next."
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {LANES.map((lane, i) => (
            <li key={lane.title} className="flex">
              <Card
                title={lane.title}
                eyebrow={
                  <div className="flex items-center justify-between gap-3">
                    <StepGraphic index={i} />
                    <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-semibold text-content-2">
                      {lane.status}
                    </span>
                  </div>
                }
              >
                {lane.body}
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        title="We start where others skip"
        intro="Most tech programmes in Ghana begin in Accra. We begin in the northern regional capitals, with a volunteer led chapter in each one, starting in Tamale. Digital skills are a national conversation, and the north belongs in it."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat value={String(BOLGATANGA.participants)} label="people at our Bolgatanga Skillshop, December 2025" />
          <Stat value={BOLGATANGA.wouldRecommend} label="of them said they would recommend it" />
          <Stat value={COMMUNITY_SIZE} label="members in our WhatsApp community" />
        </div>
        <p className="mt-4 text-sm text-content-3">
          Skillshop figures come from the attendee feedback form. <Link href="/about">Read our story</Link>
        </p>
      </Section>

      <Section tone="sunken">
        <div className="flex flex-col gap-6 rounded-xl border border-line bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-xs font-bold tracking-widest text-content-accent uppercase">Delta Mentoring Program</p>
            <h2 className="text-2xl text-content md:text-3xl">
              {PILOT.seats} free seats. Starting {PILOT.starts}.
            </h2>
            <p className="text-content-2">
              {PILOT.weeks} weeks from computer basics to a portfolio of real digital marketing work, with a
              mentor and a cohort beside you. The pilot cohort is free.
            </p>
          </div>
          <Link href="/programme#waitlist" className={buttonClasses("primary", "shrink-0")}>
            Join the waitlist
          </Link>
        </div>
      </Section>

      <Section title="Hiring, funding or partnering?">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="For business">
            <p>Hiring vetted Ghanaian talent is coming. Register your interest and meet our first graduates early.</p>
            <Link href="/business" className="mt-2 flex min-h-11 items-center font-semibold">
              Hire through SydCrest
            </Link>
          </Card>
          <Card title="Partners and sponsors">
            <p>One sponsor conversation can fund many learners. See how backing SydCrest works.</p>
            <Link href="/partners" className="mt-2 flex min-h-11 items-center font-semibold">
              Partner with us
            </Link>
          </Card>
        </div>
      </Section>
    </>
  );
}
