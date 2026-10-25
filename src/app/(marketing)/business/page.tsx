import Link from "next/link";
import { Card, PageHeader, Section } from "@/components/marketing/section";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { CONTACT_EMAIL, PILOT } from "@/content/marketing";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "business",
  title: "For business",
  description:
    "Hire vetted, verified Ghanaian tech talent. Hiring through SydCrest is coming; register your interest and meet our first graduates early.",
  path: "/business",
});

const COMING = [
  {
    title: "Talent you can verify",
    body: "Profiles backed by real coursework: weekly assignments, a portfolio and a capstone project, not just a certificate.",
  },
  {
    title: "Gigs and job briefs",
    body: "Post a brief or a role and reach learners and graduates directly. Payments settle straight to the person doing the work; SydCrest never holds funds.",
  },
  {
    title: "Talent from the north",
    body: "Our learners start in the northern regional capitals, places most hiring pipelines never reach.",
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="For business"
        title="Hire vetted, verified Ghanaian talent"
        lead={
          <p>
            This is coming, and we would rather tell you that plainly. Our first cohort starts in{" "}
            {PILOT.starts}. When our graduates are ready, we want the businesses who asked first to meet
            them first.
          </p>
        }
      />

      <Section tone="sunken" title="What we are building for you">
        <div className="grid gap-4 md:grid-cols-3">
          {COMING.map((c) => (
            <Card key={c.title} title={c.title}>
              <p>{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Ways to get involved now"
        intro={
          <p>
            You do not have to wait for the marketplace. You can sponsor seats in a cohort or offer your
            time as a mentor. <Link href="/partners">See sponsorship</Link>.
          </p>
        }
      />

      <Section
        tone="sunken"
        title="Register your interest"
        intro={
          <p>
            Sign ups open soon. If you would like to talk sooner, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        }
      >
        <div className="max-w-lg rounded-lg border border-line bg-surface p-5">
          <WaitlistForm defaultInterest="hire" submitLabel="Register interest" />
        </div>
      </Section>
    </>
  );
}
