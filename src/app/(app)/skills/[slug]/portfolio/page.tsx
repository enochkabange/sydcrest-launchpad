import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { BadgeCheck, Clock } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { getCurrentUser } from "@/lib/auth";
import { attemptGate, describeWait, formatWhen } from "@/lib/skills/assessment";
import { getPublishedSkill } from "@/lib/skills/public";
import { getMyAttempts, getMyVerifiedSkills } from "@/lib/skills/queries";
import { submitSkillPortfolio } from "../../actions";
import { PortfolioForm } from "./portfolio-form";

export const metadata: Metadata = { title: "Send your work for review", robots: { index: false } };

export default function PortfolioPage({ params }: PageProps<"/skills/[slug]/portfolio">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <PortfolioScreen params={params} />
    </Suspense>
  );
}

async function PortfolioScreen({ params }: Pick<PageProps<"/skills/[slug]/portfolio">, "params">) {
  const { slug } = await params;
  const here = encodeURIComponent(`/skills/${slug}/portfolio`);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${here}`);
  if (!user.hasAgeAndConsent) redirect(`/welcome?next=${here}`);

  const skill = await getPublishedSkill(slug);
  const portfolio = skill?.assessments.find((a) => a.kind === "portfolio");
  if (!skill || !portfolio) notFound();

  const [held, attempts] = await Promise.all([getMyVerifiedSkills(), getMyAttempts(skill.id)]);
  const holds = held.some((s) => s.slug === skill.slug);
  const gate = attemptGate(attempts, portfolio);
  const sentBack = gate.last?.status === "rejected" ? gate.last : null;

  let body: ReactNode;
  if (holds) {
    body = (
      <div role="status" className="flex flex-col gap-3 rounded-lg border border-success-fg/30 bg-success-bg p-5">
        <p className="flex items-center gap-2 font-semibold text-success-fg">
          <BadgeCheck aria-hidden className="size-6" />
          You already hold the {skill.name} skill
        </p>
        <Link href="/profile" className={buttonClasses("secondary", "self-start")}>
          Go to your profile
        </Link>
      </div>
    );
  } else if (gate.state === "pending") {
    body = (
      <div role="status" className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5">
        <p className="flex items-center gap-2 font-semibold text-content">
          <Clock aria-hidden className="size-5" />
          Your work is waiting for review
        </p>
        <p className="text-content-2">
          You sent{" "}
          <a href={gate.last.portfolio_url ?? "#"} className="text-content-link underline" target="_blank" rel="noopener noreferrer nofollow">
            your link
          </a>{" "}
          on {formatWhen(gate.last.submitted_at)}. A mentor or admin will review it, and you will be told either way.
        </p>
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col gap-5">
        {sentBack && (
          <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface-sunken p-5">
            <p className="font-semibold text-content">Your last submission was sent back</p>
            {sentBack.review_note && <p className="whitespace-pre-line text-content-2">What to improve: {sentBack.review_note}</p>}
            {gate.state === "wait" && (
              <p className="text-content-2">You can send new work from {formatWhen(gate.until)}.</p>
            )}
          </div>
        )}
        {gate.state === "wait" ? null : (
          <PortfolioForm action={submitSkillPortfolio.bind(null, portfolio.id)} skillName={skill.name} />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href={`/skills/${skill.slug}`} className="underline underline-offset-2 hover:text-content">
          {skill.name}
        </Link>
      </nav>
      <MainWithRail
        railLabel="How the review works"
        rail={
          <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">
            <h2 className="text-h3 text-content">How the review works</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>A SydCrest mentor or admin opens your link and checks the work against the skill.</li>
              <li>Nobody reviews their own work.</li>
              <li>If it is approved, the verified badge is added to your profile.</li>
              <li>
                If it is sent back, you get a note on what to improve
                {portfolio.retry_after_hours > 0 ? ` and can send new work after ${describeWait(portfolio.retry_after_hours)}` : ""}.
              </li>
              <li>Make sure the link opens without signing in, so the reviewer can see it.</li>
            </ul>
          </div>
        }
      >
        <header className="flex max-w-reading flex-col gap-2">
          <h1 className="text-title text-content">{portfolio.title}</h1>
          {portfolio.instructions && <p className="whitespace-pre-line text-lead text-content-2">{portfolio.instructions}</p>}
        </header>
        {body}
      </MainWithRail>
    </div>
  );
}
