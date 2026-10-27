import type { Metadata } from "next";
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
import { submitSkillQuiz } from "../../actions";
import { SkillQuiz } from "./skill-quiz";

export const metadata: Metadata = { title: "Skill assessment", robots: { index: false } };

// The app shell's nav reads usePathname() outside a Suspense boundary, which a
// dynamic segment cannot prerender (as on /learn/[slug]/[node]). Allow this
// route to block until the shell wraps the nav in Suspense.
export const instant = false;

export default function SkillQuizPage({ params }: PageProps<"/skills/[slug]/quiz">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <QuizScreen params={params} />
    </Suspense>
  );
}

async function QuizScreen({ params }: Pick<PageProps<"/skills/[slug]/quiz">, "params">) {
  const { slug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/skills/${slug}/quiz`)}`);
  if (!user.hasAgeAndConsent) redirect(`/welcome?next=${encodeURIComponent(`/skills/${slug}/quiz`)}`);

  const skill = await getPublishedSkill(slug);
  const quiz = skill?.assessments.find((a) => a.kind === "quiz");
  if (!skill || !quiz) notFound();

  const [held, attempts] = await Promise.all([getMyVerifiedSkills(), getMyAttempts(skill.id)]);
  const holds = held.some((s) => s.slug === skill.slug);
  const gate = attemptGate(attempts, quiz);

  let body: React.ReactNode;
  if (holds) {
    body = (
      <div role="status" className="flex flex-col gap-3 rounded-lg border border-success-fg/30 bg-success-bg p-5">
        <p className="flex items-center gap-2 font-semibold text-success-fg">
          <BadgeCheck aria-hidden className="size-6" />
          You already hold the {skill.name} skill
        </p>
        <p className="text-content">There is nothing more to prove here. It shows on your profile.</p>
        <Link href="/profile" className={buttonClasses("secondary", "self-start")}>
          Go to your profile
        </Link>
      </div>
    );
  } else if (gate.state === "wait") {
    body = (
      <div role="status" className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
        <p className="flex items-center gap-2 font-semibold text-content">
          <Clock aria-hidden className="size-5" />
          You can try again from {formatWhen(gate.until)}
        </p>
        <p className="text-content-2">
          Your last score was {gate.last.score}%. The wait gives you time to practise, and stops anyone finding the answers by
          guessing.
        </p>
        {skill.paths.length > 0 && (
          <p className="text-content-2">
            Meanwhile, the matching path covers the same ground:{" "}
            <Link href={`/roadmaps/${skill.paths[0].slug}`} className="font-semibold text-content-link underline">
              {skill.paths[0].title}
            </Link>
            .
          </p>
        )}
      </div>
    );
  } else {
    body = (
      <SkillQuiz
        questions={quiz.questions}
        passThreshold={quiz.pass_threshold}
        skillName={skill.name}
        skillSlug={skill.slug}
        action={submitSkillQuiz.bind(null, quiz.id)}
      />
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
        railLabel="About this assessment"
        rail={
          <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">
            <h2 className="text-h3 text-content">About this assessment</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                {quiz.questions.length} {quiz.questions.length === 1 ? "question" : "questions"}, pass mark {quiz.pass_threshold}%.
              </li>
              <li>You see your score, not which answers were right.</li>
              <li>
                {quiz.retry_after_hours > 0
                  ? `If you do not pass, you can try again after ${describeWait(quiz.retry_after_hours)}.`
                  : "If you do not pass, you can try again straight away."}
              </li>
              <li>Pass and the verified badge is added to your profile at once.</li>
            </ul>
          </div>
        }
      >
        <header className="flex max-w-reading flex-col gap-2">
          <h1 className="text-title text-content">{quiz.title}</h1>
          {quiz.instructions && <p className="whitespace-pre-line text-lead text-content-2">{quiz.instructions}</p>}
        </header>
        {body}
      </MainWithRail>
    </div>
  );
}
