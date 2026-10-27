import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { getMyProfile } from "@/lib/auth";
import { siteOrigin } from "@/lib/site-url";
import { applicationStage, suggestSlug } from "@/lib/market-apply/expert";
import { getMyExpertState } from "@/lib/market-apply/data";
import { ApplyForm } from "./apply-form";
import { withdrawApplication, type ApplyValues } from "./actions";

export const metadata: Metadata = {
  title: "Become an expert",
  description: "Apply to offer sessions, reviews and gigs to learners on SydCrest Launchpad.",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Africa/Accra" });

function StatusCard({ title, tone = "plain", children }: { title: string; tone?: "plain" | "info"; children: React.ReactNode }) {
  return (
    <section
      aria-labelledby="application-status"
      className={`flex flex-col gap-4 rounded-lg border p-5 xl:p-6 ${tone === "info" ? "border-info-fg/30 bg-info-bg" : "border-line bg-surface-sunken"}`}
    >
      <h2 id="application-status" className="text-subtitle text-content">
        {title}
      </h2>
      {children}
    </section>
  );
}

async function Application({ searchParams }: { searchParams: PageProps<"/experts/apply">["searchParams"] }) {
  const [{ expert, application }, profile, origin, params] = await Promise.all([
    getMyExpertState(),
    getMyProfile(),
    siteOrigin(),
    searchParams,
  ]);
  const { stage, canApply } = applicationStage(expert?.status ?? null, application?.status ?? null);
  const justSent = params.sent === "1" && stage === "submitted";

  const initial: ApplyValues = {
    slug: expert?.slug ?? suggestSlug(profile.display_name),
    headline: expert?.headline ?? "",
    skills: expert?.skills.join(", ") ?? "",
    links: expert?.links.join("\n") ?? "",
    evidence_links: application?.evidence_links.join("\n") ?? "",
    experience: application?.experience ?? "",
    motivation: application?.motivation ?? "",
  };

  return (
    <div className="flex flex-col gap-6">
      {justSent && <Alert tone="success">Application sent. We will let you know here when an admin has reviewed it.</Alert>}

      {stage === "approved" && (
        <StatusCard title="You are an approved expert" tone="info">
          <p className="max-w-reading text-content-2">
            Your expert page is live. Keep your profile current and add offers from your expert dashboard.
          </p>
          <Link href="/expert" className={buttonClasses("primary", "self-start")}>
            Go to your expert dashboard
          </Link>
        </StatusCard>
      )}

      {stage === "submitted" && application && (
        <StatusCard title="Your application is in review">
          <p className="max-w-reading text-content-2">
            Sent on {dateFormat.format(new Date(application.created_at))}. An admin reads every application and checks
            your sample work.{" "}
            {application.fast_track
              ? "As a SydCrest mentor, your application is reviewed first."
              : "We will show the decision here."}
          </p>
          <p className="max-w-reading text-content-2">
            While you wait, you can set up your expert profile and draft offers. Nobody sees them until you are approved.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/expert" className={buttonClasses("primary")}>
              Set up your expert profile
            </Link>
            <form action={withdrawApplication.bind(null, application.id)}>
              <Button type="submit" variant="secondary">
                Withdraw application
              </Button>
            </form>
          </div>
        </StatusCard>
      )}

      {stage === "rejected" && (
        <StatusCard title="Your last application was not approved">
          {application?.decision_note ? (
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-content">Note from the reviewer</p>
              <p className="max-w-reading whitespace-pre-line text-content-2">{application.decision_note}</p>
            </div>
          ) : (
            <p className="max-w-reading text-content-2">The reviewer did not leave a note.</p>
          )}
          <p className="max-w-reading text-content-2">You can update your details and apply again below.</p>
        </StatusCard>
      )}

      {stage === "withdrawn" && (
        <StatusCard title="You withdrew your application">
          <p className="max-w-reading text-content-2">Your details are saved. Apply again whenever you are ready.</p>
        </StatusCard>
      )}

      {stage === "delisted" && (
        <StatusCard title="Your expert page is not listed">
          {expert?.status_reason && (
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-content">Reason</p>
              <p className="max-w-reading whitespace-pre-line text-content-2">{expert.status_reason}</p>
            </div>
          )}
          <p className="max-w-reading text-content-2">
            If you have fixed what led to this, you can apply again and an admin will review it.
          </p>
        </StatusCard>
      )}

      {canApply && <ApplyForm initial={initial} origin={origin} />}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Apply", body: "Tell us what you are good at and share some of your work." },
    { title: "Review", body: "An admin checks your application. SydCrest mentors are reviewed first." },
    { title: "Get listed", body: "Your expert page goes live and learners can request your offers." },
  ];
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line p-5">
      <h2 className="text-h3 font-semibold text-content">How it works</h2>
      <ol className="flex flex-col gap-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-info-bg text-sm font-semibold text-info-fg"
            >
              {i + 1}
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-content">{s.title}</p>
              <p className="text-sm text-content-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-col gap-2 border-t border-line pt-4 text-sm text-content-2">
        <p>
          <span className="font-semibold text-content">Free during the soft launch.</span> Learners do not pay for
          offers yet, and SydCrest takes nothing.
        </p>
        <p>Experts must be 18 or over.</p>
      </div>
    </div>
  );
}

export default function ApplyPage({ searchParams }: PageProps<"/experts/apply">) {
  return (
    <MainWithRail railLabel="How becoming an expert works" rail={<HowItWorks />} sticky>
      <div className="flex flex-col gap-6 lg:max-w-2xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-title text-content">Become an expert</h1>
          <p className="max-w-reading text-lead text-content-2">
            Share what you know with learners across Ghana through sessions, reviews, projects and gigs.
          </p>
        </div>
        <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <Application searchParams={searchParams} />
        </Suspense>
      </div>
    </MainWithRail>
  );
}
