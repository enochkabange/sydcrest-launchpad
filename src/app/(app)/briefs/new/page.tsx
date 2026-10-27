import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PageHeading, Skeleton } from "@/components/briefs/brief-bits";
import { MainWithRail } from "@/components/ui/layout";
import { getCurrentUser } from "@/lib/auth";
import { getViewer } from "@/lib/briefs/queries";
import { EXPERT_CATEGORIES } from "@/lib/experts/categories";
import { SOFT_LAUNCH_PRICE } from "@/lib/experts/offers";
import { BriefForm } from "./brief-form";

export const metadata: Metadata = { title: "Post a brief", robots: { index: false } };

export default function NewBriefPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading
        eyebrow="Briefs"
        title="Post a brief"
        lead={<p>Say what you need and which skills it takes. Experts with those skills are told and reply with a pitch.</p>}
      />
      <MainWithRail railLabel="Tips for a good brief" rail={<Tips />}>
        <Suspense fallback={<Skeleton className="h-[40rem]" />}>
          <FormArea />
        </Suspense>
      </MainWithRail>
    </div>
  );
}

async function FormArea() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/briefs/new")}`);
  if (!user.hasAgeAndConsent) redirect(`/welcome?next=${encodeURIComponent("/briefs/new")}`);
  const viewer = await getViewer(user.id);
  return (
    <section aria-label="Brief form" className="rounded-lg border border-line bg-surface p-5 lg:p-8">
      <BriefForm
        orgs={viewer.postableOrgs}
        unverifiedOrgs={viewer.unverifiedOrgs}
        categories={EXPERT_CATEGORIES.map((c) => ({ slug: c.slug, label: c.label }))}
      />
    </section>
  );
}

function Tips() {
  return (
    <>
      <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 className="text-h3 text-content">Tips for a good brief</h2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-content-2">
          <li>Start the title with what you want done, like &ldquo;Review my shop&rsquo;s Facebook page&rdquo;.</li>
          <li>Say what you have already tried and what a good result looks like.</li>
          <li>List the skills it takes. That is how we find the right experts.</li>
          <li>Never share passwords, phone numbers or MoMo details in a brief.</li>
        </ul>
      </section>
      <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
        <h2 className="text-h3 text-content">What happens next</h2>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-content-2">
          <li>Approved experts whose skills match get a notification.</li>
          <li>They pitch with a short message and an indicative price.</li>
          <li>You accept one pitch. A booking opens where you agree the details.</li>
        </ol>
        <p className="text-sm text-content-2">{SOFT_LAUNCH_PRICE}. Budgets are only a guide and nobody pays through SydCrest.</p>
      </section>
    </>
  );
}
