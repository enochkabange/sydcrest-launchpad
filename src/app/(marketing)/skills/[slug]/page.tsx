import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, ClipboardCheck, FolderCheck, Route } from "lucide-react";
import { SectionAccent } from "@/components/brand/illustrations";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { Container, MainWithRail } from "@/components/ui/layout";
import { describeWait } from "@/lib/skills/assessment";
import { getPublishedSkill, getPublishedSkills, type PublicAssessment } from "@/lib/skills/public";
import { SkillViewerStatus } from "./viewer-status";

const PLACEHOLDER_SLUG = "__none__";

/** Published skills are prerendered; one published later renders on first visit, then is cached. */
export async function generateStaticParams() {
  const skills = await getPublishedSkills();
  return skills.length ? skills.map(({ slug }) => ({ slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: PageProps<"/skills/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const skill = await getPublishedSkill(slug);
  if (!skill) return { title: "Skill not found", robots: { index: false } };
  return {
    title: `${skill.name}, a verified skill`,
    description:
      skill.summary ??
      `How to earn the verified ${skill.name} badge on SydCrest Launchpad: complete the matching path, pass the assessment or have your work reviewed.`,
    alternates: { canonical: `/skills/${skill.slug}` },
  };
}

export default function SkillPage({ params }: PageProps<"/skills/[slug]">) {
  return (
    <Suspense fallback={<Container className="pt-10 pb-16"><div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" /></Container>}>
      <Skill params={params} />
    </Suspense>
  );
}

async function Skill({ params }: Pick<PageProps<"/skills/[slug]">, "params">) {
  const { slug } = await params;
  const skill = await getPublishedSkill(slug);
  if (!skill) notFound();
  const quiz = skill.assessments.find((a) => a.kind === "quiz");
  const portfolio = skill.assessments.find((a) => a.kind === "portfolio");
  const nothingYet = skill.paths.length === 0 && !quiz && !portfolio;

  return (
    <Container className="pt-6 pb-16 md:pt-10 xl:pt-14 xl:pb-24">
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href="/skills" className="underline underline-offset-2 hover:text-content">
          Verified skills
        </Link>
      </nav>

      <header className="mt-4 mb-8 max-w-4xl xl:mb-12">
        <SectionAccent />
        <p className="mt-3 text-xs font-bold tracking-widest text-content-3 uppercase">Verified skill</p>
        <h1 className="mt-1 text-title text-content">{skill.name}</h1>
        {skill.summary && <p className="mt-3 max-w-reading text-lead text-content-2">{skill.summary}</p>}
      </header>

      <MainWithRail
        sticky
        railLabel="Your progress on this skill"
        rail={
          <Suspense fallback={<div className="h-40 animate-skeleton rounded-lg bg-surface-sunken" />}>
            <SkillViewerStatus skill={skill} />
          </Suspense>
        }
      >
        <section aria-labelledby="ways-heading" className="flex flex-col gap-4">
          <h2 id="ways-heading" className="text-h2 lg:text-subtitle text-content">
            Ways to earn it
          </h2>
          {nothingYet ? (
            <div className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
              <p className="font-semibold text-content">Ways to earn this skill are being set up.</p>
              <p className="mt-1">A learning path, an assessment or a portfolio review will open here soon.</p>
            </div>
          ) : (
            <ol className="flex flex-col gap-4">
              {skill.paths.length > 0 && (
                <WayCard icon={<Route aria-hidden className="size-5" />} title="Complete a learning path">
                  <p>
                    Pass every required topic quiz on {skill.paths.length === 1 ? "this roadmap" : "any of these roadmaps"}.
                    The badge is added to your profile as soon as you finish.
                  </p>
                  <ul className="flex flex-col gap-1">
                    {skill.paths.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/roadmaps/${p.slug}`}
                          className="inline-flex min-h-11 items-center gap-2 font-semibold text-content-link underline underline-offset-2"
                        >
                          {p.title}
                          <ArrowRight aria-hidden className="size-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </WayCard>
              )}
              {quiz && (
                <WayCard icon={<ClipboardCheck aria-hidden className="size-5" />} title={quiz.title}>
                  <Instructions assessment={quiz} />
                  <p>
                    {quiz.questions.length} {quiz.questions.length === 1 ? "question" : "questions"}. Score{" "}
                    {quiz.pass_threshold}% or more to pass.{" "}
                    {quiz.retry_after_hours > 0
                      ? `If you do not pass, you can try again after ${describeWait(quiz.retry_after_hours)}.`
                      : "If you do not pass, you can try again straight away."}{" "}
                    Your score is shown, but not which answers were right.
                  </p>
                  <Link href={`/skills/${skill.slug}/quiz`} className={buttonClasses("primary", "self-start")}>
                    Take the assessment
                  </Link>
                </WayCard>
              )}
              {portfolio && (
                <WayCard icon={<FolderCheck aria-hidden className="size-5" />} title={portfolio.title}>
                  <Instructions assessment={portfolio} />
                  <p>
                    Share a link to your work. A SydCrest mentor or admin reviews it, and nobody reviews their own work.
                    {portfolio.retry_after_hours > 0 &&
                      ` If it is sent back, you can send new work after ${describeWait(portfolio.retry_after_hours)}.`}
                  </p>
                  <Link href={`/skills/${skill.slug}/portfolio`} className={buttonClasses("secondary", "self-start")}>
                    Send your work for review
                  </Link>
                </WayCard>
              )}
            </ol>
          )}
        </section>

        <section aria-labelledby="meaning-heading" className="flex flex-col gap-2 border-t border-line pt-6">
          <h2 id="meaning-heading" className="text-h3 text-content">
            What the badge means
          </h2>
          <p className="max-w-reading text-content-2">
            SydCrest checked the skill in one of the ways above. The badge shows how it was earned and when, and appears
            on public profiles, expert pages and in the talent directory. It is never sold, and an admin can withdraw it
            if it was given in error.
          </p>
        </section>
      </MainWithRail>
    </Container>
  );
}

function WayCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5 text-content-2 xl:p-6">
      <h3 className="flex items-center gap-2 text-h3 text-content">
        <span className="text-content-2">{icon}</span>
        {title}
      </h3>
      {children}
    </li>
  );
}

function Instructions({ assessment }: { assessment: PublicAssessment }) {
  if (!assessment.instructions) return null;
  return <p className="whitespace-pre-line text-content">{assessment.instructions}</p>;
}
