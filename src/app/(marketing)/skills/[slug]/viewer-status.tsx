import { BadgeCheck, Clock } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { getCurrentUser } from "@/lib/auth";
import { attemptGate, formatWhen } from "@/lib/skills/assessment";
import type { PublishedSkill } from "@/lib/skills/public";
import { getMyAttempts, getMyVerifiedSkills } from "@/lib/skills/queries";
import { sourceLabel, formatIssued } from "@/lib/skills/verified";

/**
 * The viewer's own standing on a skill, beside the cached skill page. Reads
 * the session, so it renders inside <Suspense>; the rest of the page stays
 * prerendered for everyone.
 */
export async function SkillViewerStatus({ skill }: { skill: PublishedSkill }) {
  const user = await getCurrentUser();
  const next = encodeURIComponent(`/skills/${skill.slug}`);

  if (!user) {
    return (
      <Card title="Earn this skill">
        <p>Create a free account to take the assessment, send your work or follow a path. Your badge then shows on your profile.</p>
        <div className="flex flex-wrap gap-2">
          <Link href={`/signup?next=${next}`} className={buttonClasses("primary")}>
            Create an account
          </Link>
          <Link href={`/login?next=${next}`} className={buttonClasses("secondary")}>
            Sign in
          </Link>
        </div>
      </Card>
    );
  }
  if (!user.hasAgeAndConsent) {
    return (
      <Card title="Finish setting up">
        <p>Confirm your age and agree to the terms to earn verified skills.</p>
        <Link href={`/welcome?next=${next}`} className={buttonClasses("primary", "self-start")}>
          Continue
        </Link>
      </Card>
    );
  }

  const [held, attempts] = await Promise.all([getMyVerifiedSkills(), getMyAttempts(skill.id)]);
  const mine = held.find((s) => s.slug === skill.slug);
  if (mine) {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-lg border border-success-fg/30 bg-success-bg p-5">
        <p className="flex items-center gap-2 font-semibold text-success-fg">
          <BadgeCheck aria-hidden className="size-6" />
          You hold this skill
        </p>
        <p className="text-sm text-content">
          {sourceLabel(mine.source)}, {formatIssued(mine.issuedAt)}. It shows on your profile when your profile is public.
        </p>
        <Link href="/profile" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link underline">
          See it on your profile
        </Link>
      </div>
    );
  }

  const lines: React.ReactNode[] = [];
  for (const assessment of skill.assessments) {
    const gate = attemptGate(attempts, assessment);
    const last = gate.last;
    if (assessment.kind === "quiz" && last) {
      if (gate.state === "wait") {
        lines.push(
          <Line key={assessment.id} icon="wait">
            You scored {last.score}% on the assessment. You can try again from {formatWhen(gate.until)}.
          </Line>,
        );
      } else if (last.status === "failed") {
        lines.push(
          <Line key={assessment.id}>
            Your last score was {last.score}%. You can take the assessment again now.
          </Line>,
        );
      }
    }
    if (assessment.kind === "portfolio" && last) {
      if (gate.state === "pending") {
        lines.push(
          <Line key={assessment.id} icon="wait">
            Your work is waiting for review. You sent it on {formatWhen(last.submitted_at)}.
          </Line>,
        );
      } else if (last.status === "rejected") {
        lines.push(
          <Line key={assessment.id}>
            A reviewer sent your work back{last.review_note ? `: "${last.review_note}"` : "."}{" "}
            {gate.state === "wait" ? `You can send new work from ${formatWhen(gate.until)}.` : "You can send new work now."}
          </Line>,
        );
      }
    }
  }

  return (
    <Card title="Your progress">
      {lines.length ? (
        <ul className="flex flex-col gap-3">{lines}</ul>
      ) : (
        <p>You have not earned this skill yet. Choose any of the ways on this page. One is enough.</p>
      )}
      {skill.paths.length > 0 && (
        <p className="text-sm">Finished a matching path before this skill opened? Claim it from your profile.</p>
      )}
    </Card>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
      <h2 className="text-h3 text-content">{title}</h2>
      {children}
    </div>
  );
}

function Line({ children, icon }: { children: React.ReactNode; icon?: "wait" }) {
  return (
    <li className="flex gap-2 text-content">
      {icon === "wait" && <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-content-3" />}
      <span>{children}</span>
    </li>
  );
}
