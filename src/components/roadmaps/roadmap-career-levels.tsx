import { Briefcase } from "lucide-react";
import { CAREER_LEVEL_HINT, CAREER_LEVEL_LABEL, CAREER_LEVELS, type CareerLevel } from "@/lib/roadmaps/levels";
import type { ViewSection } from "@/lib/roadmaps/view-model";

type Level = { level: CareerLevel; sections: { number: number; title: string }[]; jobs: string[] };

/** Sections grouped by career level, in level order; levels with no section are left out. */
export function careerLevels(sections: readonly ViewSection[]): Level[] {
  return CAREER_LEVELS.flatMap((level) => {
    const at = sections.filter((s) => s.node.careerLevel === level);
    if (!at.length) return [];
    const jobs = [...new Set(at.flatMap((s) => s.node.jobs ?? []))];
    return [{ level, sections: at.map((s) => ({ number: s.number, title: s.node.title })), jobs }];
  });
}

/**
 * Jobs at this level (issue #255): one card per career level with the
 * sections that build it and job titles seen in Ghana adverts for it. A slot
 * for any roadmap view or page; draws from the view's sections only, so it
 * stays in the prerendered shell. Renders nothing for an unrated roadmap.
 */
export function RoadmapCareerLevels({ sections, trackTitle }: { sections: readonly ViewSection[]; trackTitle: string }) {
  const levels = careerLevels(sections);
  if (!levels.length) return null;
  return (
    <section className="mt-12 xl:mt-16" aria-labelledby="levels-heading" data-testid="career-levels">
      <h2 id="levels-heading" className="text-h2 text-content lg:text-subtitle">
        Jobs at each level
      </h2>
      <p className="mt-1 max-w-reading text-content-2">
        Job titles from {trackTitle} adverts in Ghana that we read when planning this roadmap. Titles only: pay and
        requirements vary by employer.
      </p>
      <ol className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {levels.map(({ level, sections: at, jobs }) => (
          <li key={level} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 md:p-5">
            <div>
              <h3 className="text-h3 text-content">{CAREER_LEVEL_LABEL[level]}</h3>
              <p className="mt-1 text-sm text-content-2">{CAREER_LEVEL_HINT[level]}</p>
            </div>
            <p className="text-sm text-content-3">
              {at.length === 1 ? "Section" : "Sections"} {at.map((s) => s.number).join(", ")}
            </p>
            <div className="mt-auto border-t border-line pt-3">
              <h4 className="text-sm font-semibold text-content">Jobs at this level</h4>
              {jobs.length ? (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {jobs.map((job) => (
                    <li key={job} className="flex items-start gap-2 text-content-2">
                      <Briefcase aria-hidden className="mt-1 size-4 shrink-0 text-content-3" />
                      <span>{job}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-content-2">
                  {level === "foundation"
                    ? "This level prepares you for the roles in the next one."
                    : "None of the adverts we read named a role at this level yet."}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
