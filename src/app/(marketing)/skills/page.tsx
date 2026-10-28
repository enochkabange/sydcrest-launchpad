import type { Metadata } from "next";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { PageHeader } from "@/components/marketing/section";
import { EarnWays } from "@/components/skills/earn-ways";
import Link from "@/components/ui/link";
import { AutoGrid, Container } from "@/components/ui/layout";
import { getPublishedSkills, type SkillSummary } from "@/lib/skills/public";

export const metadata: Metadata = {
  title: "Verified skills",
  description:
    "Skills SydCrest verifies. Earn a badge by completing the matching learning path, passing an assessment, or having your work reviewed by a mentor. Badges are earned, never bought.",
  alternates: { canonical: "/skills" },
};

/** Prerendered from the cached catalogue; admin edits refresh it (revalidateSkills). */
export default async function SkillsPage() {
  const skills = await getPublishedSkills();

  return (
    <>
      <PageHeader
        eyebrow="Verified skills"
        title="Skills you can prove"
        lead={
          <p>
            A verified skill shows on your profile, your expert page and in the talent directory. You earn it by
            showing you can do the work. Nobody can buy one.
          </p>
        }
        aside={<EarnWays />}
      />

      <Container className="pb-16 xl:pb-24">
        <h2 className="text-h2 text-content">The skill catalogue</h2>
        {skills.length === 0 ? (
          <div className="mt-6 flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 xl:p-8">
            <p className="font-semibold text-content">The first skills are being set up.</p>
            <p className="max-w-reading text-content-2">
              Each skill is matched to a learning path and given an assessment before it opens. Until then, every topic
              you pass on a roadmap still counts towards the path.
            </p>
            <Link href="/roadmaps" className="mt-2 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-content-link underline">
              Browse the roadmaps
            </Link>
          </div>
        ) : (
          <AutoGrid as="ul" className="mt-6">
            {skills.map((skill) => (
              <li key={skill.id}>
                <SkillCard skill={skill} />
              </li>
            ))}
          </AutoGrid>
        )}
      </Container>
    </>
  );
}

function SkillCard({ skill }: { skill: SkillSummary }) {
  const ways = [
    skill.paths.length > 0 && (skill.paths.length === 1 ? "A learning path" : `${skill.paths.length} learning paths`),
    skill.assessments.includes("quiz") && "An assessment",
    skill.assessments.includes("portfolio") && "A portfolio review",
  ].filter((w): w is string => Boolean(w));

  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="flex h-full flex-col gap-2 rounded-lg border border-line bg-surface p-5 transition-colors xl:p-6 hover:border-line-strong hover:bg-surface-sunken"
    >
      <span className="flex items-center gap-2">
        <BadgeCheck aria-hidden className="size-5 shrink-0 text-success-fg" />
        <h3 className="text-h3 text-content">{skill.name}</h3>
      </span>
      {skill.summary && <p className="line-clamp-3 text-content-2">{skill.summary}</p>}
      <span className="mt-auto flex items-center justify-between gap-3 pt-2 text-sm text-content-2">
        {ways.length ? `Earn it through: ${ways.join(", ").toLowerCase()}` : "Ways to earn it are being set up"}
        <ArrowRight aria-hidden className="size-4 shrink-0 text-content-3" />
      </span>
    </Link>
  );
}
