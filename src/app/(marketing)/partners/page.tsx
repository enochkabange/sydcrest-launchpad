import { Card, PageHeader, Section, Stat } from "@/components/marketing/section";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { buttonClasses } from "@/components/ui/button";
import { SectionGrid } from "@/components/ui/layout";
import { ACCRA_EVENT, BOLGATANGA, COMMUNITY_SIZE, CONTACT_EMAIL, PILOT, SPONSOR_TIERS } from "@/content/marketing";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "partners",
  title: "Partners and donors",
  description:
    "Back SydCrest: we turn underserved northern youth into employable, earning tech talent. Sponsorship tiers, donor programmes and how to reach us.",
  path: "/partners",
});

const VALUE_ADDS = [
  "Insights from registration and audience data",
  "A dedicated social feature post or reel",
  "Booth or table presence at our events",
  "A post event impact report",
];

const SPONSOR_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Sponsoring SydCrest")}`;

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners and donors"
        title="Help turn northern talent into earning talent"
        lead={
          <p>
            We turn underserved northern youth into employable, earning tech talent, and we hold ourselves
            to one number: learners who land a verifiable opportunity within six months of finishing a
            cohort. One sponsor conversation can fund many learners.
          </p>
        }
      />

      <Section
        tone="sunken"
        layout="split"
        title="What we have delivered"
        intro={
          <p>
            Our first in person Skillshop ran in Bolgatanga on {BOLGATANGA.date}. On {ACCRA_EVENT.date} we
            hosted &ldquo;{ACCRA_EVENT.title}&rdquo; at {ACCRA_EVENT.venue}. Our free pilot cohort of{" "}
            {PILOT.seats} starts in {PILOT.starts}.
          </p>
        }
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
          <Stat value={String(BOLGATANGA.participants)} label="Bolgatanga Skillshop participants" />
          <Stat value={BOLGATANGA.wouldRecommend} label="would recommend it" />
          <Stat value={BOLGATANGA.wouldReturn} label="would attend again" />
          <Stat value={COMMUNITY_SIZE} label="WhatsApp community members" />
        </div>
        <p className="mt-4 text-sm text-content-3">Skillshop percentages come from the attendee feedback form.</p>
      </Section>

      <Section
        title="Donor programmes"
        intro="SydCrest is a social enterprise that reinvests everything it earns. In kind support from technology donors goes straight to learners."
      >
        <SectionGrid cols={2}>
          <Card title="DataCamp Donates">
            <p>
              We are preparing an application to DataCamp Donates so learners in our cohorts can study data
              and digital skills on DataCamp for free, alongside the programme. If you work at DataCamp, we
              would love to talk.
            </p>
          </Card>
          <Card title="Tools for a lean team">
            <p>
              We are also preparing applications to nonprofit programmes from Google, Microsoft, GitHub and
              others, so every donated cedi goes to learners rather than software bills.
            </p>
          </Card>
        </SectionGrid>
      </Section>

      <Section
        tone="sunken"
        title="Sponsorship tiers"
        intro="Sponsorship funds Skillshops, flagship events and free cohort seats. We shape each package with you."
      >
        <SectionGrid as="ul" cols={3}>
          {SPONSOR_TIERS.map((tier) => (
            <li key={tier.name} className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-5">
              <span className="text-sm font-semibold text-content-2">{tier.name}</span>
              <span className="text-3xl font-bold text-content">{tier.amount}</span>
            </li>
          ))}
        </SectionGrid>
        <div className="mt-6 rounded-lg border border-line bg-surface p-5">
          <h3 className="text-h3 text-content">What sponsors receive</h3>
          <p className="mt-1 text-sm text-content-2">Packages draw on these, weighted by tier:</p>
          <ul className="mt-3 grid list-disc gap-1 pl-5 text-content-2 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-10">
            {VALUE_ADDS.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        layout="split"
        title="Talk to us"
        intro="Email is the fastest way to reach us about sponsorship, donations or a delivery partnership."
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-start lg:flex-col">
          <div className="flex flex-col gap-3 md:w-1/2 lg:w-auto">
            <a href={SPONSOR_MAILTO} className={buttonClasses("primary", "self-start")}>
              Email {CONTACT_EMAIL}
            </a>
          </div>
          <div className="max-w-lg rounded-lg border border-line bg-surface p-5 md:w-1/2 lg:w-full lg:max-w-xl xl:p-8">
            <h3 className="mb-4 text-h3 text-content">Or register your interest</h3>
            <WaitlistForm defaultInterest="sponsor" submitLabel="Register interest" />
          </div>
        </div>
      </Section>
    </>
  );
}
