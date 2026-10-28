import type { Metadata } from "next";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { KindLabel, WhereAndWhen } from "@/components/opportunities/meta";
import { opportunitiesPath, opportunityPath } from "@/components/opportunities/paths";
import { ReportOpportunity } from "@/components/opportunities/report-form";
import { SaveControls } from "@/components/opportunities/save-controls";
import { buttonClasses } from "@/components/ui/button";
import { Container, MainWithRail } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { getMySaveMap, getViewer } from "@/lib/opportunities/learner";
import {
  fieldLabel,
  isJobPosting,
  jobPostingJsonLd,
  jsonLdScript,
  kindLabel,
  trackLabel,
  type Opportunity,
} from "@/lib/opportunities/model";
import { getAccraToday, getOpenOpportunities, getOpenOpportunity } from "@/lib/opportunities/public";
import { pageMetadata } from "@/lib/page-metadata";
import { PLACEHOLDER_SLUG, truncate } from "@/lib/roadmaps/seo";
import { SITE_URL } from "@/lib/site";

/**
 * One opportunity, public and indexable while it is open and before its
 * deadline (Accra date); otherwise a 404. Open posts are prerendered at
 * build, later ones on first visit, and the cache expires at Accra midnight
 * so expired posts drop out. Jobs and internships carry JobPosting
 * structured data. Saving is a signed in island.
 */
export async function generateStaticParams() {
  const open = await getOpenOpportunities();
  return open.length ? open.map(({ slug }) => ({ slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: PageProps<"/opportunities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const o = await getOpenOpportunity(slug);
  if (!o) return { title: "Opportunity not found", robots: { index: false } };
  return pageMetadata({
    title: `${o.title} at ${o.organisation_name}`,
    description: truncate(o.summary ?? o.description, 160),
    path: opportunityPath(o.slug),
    og: "opportunities",
  });
}

export default function OpportunityPage({ params }: PageProps<"/opportunities/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <Detail params={params} />
    </Suspense>
  );
}

async function Detail({ params }: Pick<PageProps<"/opportunities/[slug]">, "params">) {
  const { slug } = await params;
  const o = await getOpenOpportunity(slug);
  if (!o) notFound();
  const today = await getAccraToday();
  const path = opportunityPath(o.slug);
  const jsonLd = jobPostingJsonLd(o, new URL(path, SITE_URL).toString());
  const fields = o.fields.map(fieldLabel).filter((f): f is string => !!f);
  const tracks = o.tracks.map(trackLabel).filter((t): t is string => !!t);

  return (
    <Container className="pt-6 pb-16 md:pt-10 xl:pt-14 xl:pb-24">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />}
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href={opportunitiesPath} className="underline underline-offset-2 hover:text-content">
          Opportunities
        </Link>
      </nav>

      <header className="mt-4 flex max-w-4xl flex-col gap-3">
        <div>
          <KindLabel kind={o.kind} />
        </div>
        <h1 className="text-title text-content">{o.title}</h1>
        <p className="text-lead text-content-2">{o.organisation_name}</p>
      </header>

      <MainWithRail className="mt-8 xl:mt-12" railLabel="How to apply" sticky rail={<ApplyCard o={o} today={today} path={path} />}>
        {o.summary && <p className="max-w-reading text-lead text-content">{o.summary}</p>}
        <Block title={`About this ${kindLabel(o.kind).toLowerCase()}`}>
          <Paragraphs text={o.description} />
        </Block>
        {o.eligibility && (
          <Block title="Who can apply">
            <Paragraphs text={o.eligibility} />
          </Block>
        )}
        {(o.skills.length > 0 || fields.length > 0 || tracks.length > 0) && (
          <Block title="Skills and fields">
            <dl className="flex flex-col gap-4">
              {o.skills.length > 0 && <Tags label="Skills" items={o.skills} />}
              {fields.length > 0 && <Tags label="Fields" items={fields} />}
              {tracks.length > 0 && <Tags label="Suits these SydCrest tracks" items={tracks} />}
            </dl>
          </Block>
        )}
      </MainWithRail>
    </Container>
  );
}

function ApplyCard({ o, today, path }: { o: Opportunity; today: string; path: string }) {
  return (
    <>
      <section aria-labelledby="apply-heading" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 xl:p-6">
        <h2 id="apply-heading" className="text-h3 text-content">
          How to apply
        </h2>
        <WhereAndWhen o={o} today={today} />
        {o.compensation_note && <p className="text-sm font-semibold text-content">{o.compensation_note}</p>}
        {o.apply_url && (
          <a href={o.apply_url} target="_blank" rel="noopener noreferrer nofollow" className={buttonClasses("primary", "w-full")}>
            Apply with {truncate(o.organisation_name, 40)}
            <ExternalLink aria-hidden className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {o.apply_instructions && (
          <div className="text-sm text-content-2">
            <Paragraphs text={o.apply_instructions} />
          </div>
        )}
        <div className="border-t border-line pt-4">
          <Suspense fallback={<div className="h-11" />}>
            <ViewerSave o={o} path={path} />
          </Suspense>
        </div>
      </section>
      <p className="flex gap-2 text-sm text-content-2">
        <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-content-3" />
        <span>
          {isJobPosting(o.kind) || o.kind === "gig"
            ? "Real employers never ask for money to apply or to start. If anyone does, stop and report the post."
            : "Real scholarships and grants never charge an application fee. If anyone asks for money, stop and report the post."}
        </span>
      </p>
    </>
  );
}

async function ViewerSave({ o, path }: { o: Opportunity; path: string }) {
  const viewer = await getViewer();
  if (!viewer) {
    return (
      <Link href={`/login?next=${encodeURIComponent(path)}`} className={buttonClasses("secondary", "w-full")}>
        Sign in to save this
      </Link>
    );
  }
  const status = (await getMySaveMap()).get(o.id) ?? null;
  return (
    <div className="flex flex-col gap-2">
      <SaveControls opportunityId={o.id} title={o.title} status={status} back={path} />
      <ReportOpportunity opportunityId={o.id} back={path} />
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex max-w-reading flex-col gap-3">
      <h2 className="text-h2 text-content lg:text-subtitle">{title}</h2>
      {children}
    </section>
  );
}

/** Plain text with blank lines as paragraph breaks. Never parsed as HTML. */
function Paragraphs({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-3 text-content-2">
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="whitespace-pre-line">
            {p}
          </p>
        ))}
    </div>
  );
}

function Tags({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="text-sm font-semibold text-content">{label}</dt>
      <dd>
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item} className="rounded-full border border-line px-3 py-1 text-sm text-content-2">
              {item}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div aria-busy="true" className="mx-auto w-full max-w-page animate-pulse px-4 pt-6 pb-16 md:px-8 md:pt-10">
      <div className="h-4 w-28 rounded bg-surface-sunken" />
      <div className="mt-6 h-10 w-2/3 rounded bg-surface-sunken" />
      <div className="mt-3 h-6 w-1/3 rounded bg-surface-sunken" />
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="h-64 rounded-lg bg-surface-sunken" />
        <div className="h-64 rounded-lg bg-surface-sunken" />
      </div>
    </div>
  );
}
