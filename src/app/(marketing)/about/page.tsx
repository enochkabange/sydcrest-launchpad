import { Card, PageHeader, Section, Stat } from "@/components/marketing/section";
import {
  ACCRA_EVENT,
  BOLGATANGA,
  CHAPTERS,
  COMMUNITY_SIZE,
  CONTACT_EMAIL,
  MISSION,
  PILOT,
} from "@/content/marketing";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "about",
  title: "About",
  description:
    "Why SydCrest exists: a social enterprise taking young Ghanaians, starting in the underserved north, from beginner to employable tech talent and on to earning.",
  path: "/about",
});

const CHAPTER_NOTES: Record<string, string> = {
  Tamale: "First chapter, being set up now",
  Bolgatanga: "Our first Skillshop ran here in December 2025",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Why SydCrest exists"
        lead={
          <p>
            Too many young Ghanaians start an online course and never finish it. Not for lack of ability,
            but for lack of structure, accountability and someone to ask when they are stuck. SydCrest is
            built to fix that, starting in the north.
          </p>
        }
      />

      <Section tone="sunken" title="Our mission">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="What we do">
            <p>{MISSION}</p>
          </Card>
          <Card title="How we measure it">
            <p>
              One number, not vanity metrics: learners who complete a cohort and land a verifiable
              opportunity (a job, internship, freelance contract or scholarship) within six months. A
              certificate that leads nowhere is not success by our own definition.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        title="Our story so far"
        intro={
          <div className="flex flex-col gap-4">
            <p>
              SydCrest grew out of a community before it was a platform. Our WhatsApp community has more
              than 500 members who share lessons, ask questions and show up for each other.
            </p>
            <p>
              On {BOLGATANGA.date} we ran our first in person Skillshop in Bolgatanga: {BOLGATANGA.participants}{" "}
              people, {BOLGATANGA.hours} hours, hands on. Their feedback taught us two things. People want
              to see how skills turn into income first, then be walked back through the learning. They also told us plainly that we
              need to start on time, so that is the first thing we are fixing.
            </p>
            <p>
              On {ACCRA_EVENT.date} we hosted &ldquo;{ACCRA_EVENT.title}&rdquo; at {ACCRA_EVENT.venue}, with
              a keynote, three expert speakers and a panel on turning skills into income.
            </p>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat value={String(BOLGATANGA.participants)} label="Bolgatanga Skillshop participants" />
          <Stat value={BOLGATANGA.moreConfident} label="felt more confident afterwards" />
          <Stat value={BOLGATANGA.wouldRecommend} label="would recommend it" />
          <Stat value={COMMUNITY_SIZE} label="WhatsApp community members" />
        </div>
        <p className="mt-4 text-sm text-content-3">Skillshop percentages come from the attendee feedback form.</p>
      </Section>

      <Section
        tone="sunken"
        title="Where we are today"
        intro={
          <p>
            SydCrest is founder led and volunteer powered, building toward its first cohort in{" "}
            {PILOT.starts}. What exists today is real: a {PILOT.weeks} week curriculum, a community, two
            delivered events and this platform, built in the open. We would rather show you that than a
            polished page standing in for a team that does not exist yet.
          </p>
        }
      />

      <Section
        title="Every cedi goes back in"
        intro={
          <p>
            SydCrest is a social enterprise being registered as a Company Limited by Guarantee in Ghana.
            There are no shareholders and no one takes a profit out. Whatever we earn, from sponsors,
            events or the marketplace, is reinvested in free seats, the platform and the community.
          </p>
        }
      />

      <Section
        tone="sunken"
        title="Regional chapters, starting in Tamale"
        intro={
          <p>
            We grow as regional chapters, not one central team. Each chapter has a local volunteer lead
            who runs the community, events and partnerships in that city. We start in the five northern
            regional capitals.
          </p>
        }
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CHAPTERS.map((c, i) => (
            <li key={c.city} className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-4">
              <span className="text-xs font-semibold text-content-3">{i === 0 ? "First" : "Planned"}</span>
              <span className="text-lg font-bold text-content">{c.city}</span>
              <span className="text-sm text-content-2">{c.region} Region</span>
              {CHAPTER_NOTES[c.city] && <span className="text-sm text-content-2">{CHAPTER_NOTES[c.city]}</span>}
            </li>
          ))}
        </ol>
      </Section>

      <Section
        title="Get involved"
        intro={
          <p>
            Want to lead a chapter, mentor, or build the thing you wish existed when you started? Questions,
            press, or just want to say hello? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        }
      />
    </>
  );
}
