import { Clock } from "lucide-react";
import { VerifiedSkillBadges } from "@/components/skills/verified-skill-badges";
import Link from "@/components/ui/link";
import { formatWhen } from "@/lib/skills/assessment";
import { getMyPendingPortfolios, getMyVerifiedSkills } from "@/lib/skills/queries";
import { ClaimPathSkills } from "./claim-path-skills";

/**
 * The learner's verified skills (issue #165): what they hold, what is
 * waiting for review, and a claim button for skills mapped to a path after
 * they finished it. Reads the session, so it renders inside <Suspense>.
 */
export async function VerifiedSkillsSection() {
  const [skills, pending] = await Promise.all([getMyVerifiedSkills(), getMyPendingPortfolios()]);

  return (
    <section aria-labelledby="verified-skills-heading" className="flex flex-col gap-4 border-t border-line pt-6">
      <div className="flex flex-col gap-1">
        <h2 id="verified-skills-heading" className="text-subtitle text-content">
          Verified skills
        </h2>
        <p className="text-sm text-content-2">
          Earned by completing a path, passing an assessment or a reviewed portfolio. They show on your public profile, your
          expert page and in the talent directory.
        </p>
      </div>

      {skills.length > 0 ? (
        <VerifiedSkillBadges skills={skills} label="Your verified skills" />
      ) : (
        <div className="rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2">
          <p className="font-semibold text-content">No verified skills yet.</p>
          <p className="mt-1">
            See which skills you can earn and how in the{" "}
            <Link href="/skills" className="font-semibold text-content-link underline">
              skill catalogue
            </Link>
            .
          </p>
        </div>
      )}

      {pending.length > 0 && (
        <ul aria-label="Waiting for review" className="flex flex-col gap-2">
          {pending.map((p) => (
            <li key={p.id} className="flex items-start gap-2 text-sm text-content-2">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-content-3" />
              <span>
                Your{" "}
                <Link href={`/skills/${p.skill.slug}`} className="font-semibold text-content-link underline">
                  {p.skill.name}
                </Link>{" "}
                work is waiting for review (sent {formatWhen(p.submittedAt)}).
              </span>
            </li>
          ))}
        </ul>
      )}

      <ClaimPathSkills />
    </section>
  );
}
