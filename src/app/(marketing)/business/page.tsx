import Link from "@/components/ui/link";
import { Card, PageHeader, Section } from "@/components/marketing/section";
import { buttonClasses } from "@/components/ui/button";
import { SectionGrid } from "@/components/ui/layout";
import { CONTACT_EMAIL, PILOT } from "@/content/marketing";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  og: "business",
  title: "For business",
  description:
    "Create a business account, get verified and meet certified Ghanaian tech talent. Post opportunities and ask learners to talk through SydCrest.",
  path: "/business",
});

const OFFER = [
  {
    title: "Talent you can verify",
    body: "The talent directory lists learners with a SydCrest programme certificate, earned through weekly assignments, peer review and a capstone project.",
  },
  {
    title: "Opportunities and job briefs",
    body: "Post jobs, internships, gigs, scholarships and grants under your own name. Any pay is settled directly with the person doing the work; SydCrest never holds funds.",
  },
  {
    title: "Talent from the north",
    body: "Our learners start in the northern regional capitals, places most hiring pipelines never reach.",
  },
];

const STEPS = [
  { title: "Create your account", body: "Sign up as yourself (adults only), then add your organisation. You become its owner and can invite colleagues." },
  { title: "Get verified", body: "Ask our team to verify you. We check that the organisation is real before it can reach learners." },
  { title: "Post and find talent", body: "Post opportunities and browse learners who chose to be found. They see your message and decide whether to share how to reach them." },
];

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="For business"
        title="Hire verified Ghanaian talent"
        lead={
          <>
            <p>
              Create a business account, get verified, and meet learners whose skills are backed by real coursework.
              Our first cohort starts in {PILOT.starts}, so the directory grows as each cohort earns its certificates.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/business/new" className={buttonClasses("primary")}>
                Create a business account
              </Link>
              <Link href="/login?next=/business/new" className={buttonClasses("secondary")}>
                I already have an account
              </Link>
            </div>
          </>
        }
      />

      <Section tone="sunken" title="What you get">
        <SectionGrid cols={3}>
          {OFFER.map((c) => (
            <Card key={c.title} title={c.title}>
              <p>{c.body}</p>
            </Card>
          ))}
        </SectionGrid>
      </Section>

      <Section title="How it works">
        <SectionGrid cols={3} as="ol">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex">
              <Card title={s.title} eyebrow={<span className="text-xs font-bold tracking-widest text-content-3 uppercase">Step {i + 1}</span>}>
                <p>{s.body}</p>
              </Card>
            </li>
          ))}
        </SectionGrid>
      </Section>

      <Section
        tone="sunken"
        layout="split"
        title="Learners stay in control"
        intro={
          <p>
            The directory is opt in and only verified organisations browse it. Contact goes through SydCrest: a learner
            reads your request and chooses what, if anything, to share. We never hand over an email or phone number.
          </p>
        }
      >
        <div className="flex max-w-xl flex-col gap-4 rounded-lg border border-line bg-surface p-5 xl:p-8">
          <h3 className="text-h3 text-content">Ready when you are</h3>
          <p className="text-body text-content-2">
            You can also sponsor seats in a cohort or offer your time as a mentor. <Link href="/partners">See sponsorship</Link>.
            Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <Link href="/business/new" className={buttonClasses("primary", "self-start")}>
            Create a business account
          </Link>
        </div>
      </Section>
    </>
  );
}
