/**
 * Labels and guards for the lesson structure metadata (issue #255):
 * difficulty and complexity per topic, career level per section. Shared by
 * the lesson page, the topic page and the roadmap's Jobs at this level panel.
 */
import type { CareerLevel, Complexity, Difficulty } from "@/content/roadmaps/types";

export type { CareerLevel, Complexity, Difficulty };

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const satisfies readonly Difficulty[];
export const CAREER_LEVELS = ["foundation", "junior", "mid", "specialist"] as const satisfies readonly CareerLevel[];

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const CAREER_LEVEL_LABEL: Record<CareerLevel, string> = {
  foundation: "Foundation",
  junior: "Junior",
  mid: "Mid level",
  specialist: "Specialist",
};

/** One line under each level in the Jobs at this level panel. */
export const CAREER_LEVEL_HINT: Record<CareerLevel, string> = {
  foundation: "The groundwork before your first role.",
  junior: "Skills for a first role, internship or national service post.",
  mid: "Skills you grow into once you are working.",
  specialist: "A focus you can build a career around.",
};

export function asDifficulty(value: unknown): Difficulty | null {
  return DIFFICULTIES.includes(value as Difficulty) ? (value as Difficulty) : null;
}

export function asComplexity(value: unknown): Complexity | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5 ? (value as Complexity) : null;
}

export function asCareerLevel(value: unknown): CareerLevel | null {
  return CAREER_LEVELS.includes(value as CareerLevel) ? (value as CareerLevel) : null;
}

/** Job titles from a text[] column: trimmed, non empty, no repeats. */
export function asJobs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  for (const v of value) if (typeof v === "string" && v.trim()) seen.add(v.trim());
  return [...seen];
}

/** Screen reader and visible text for a complexity rating. */
export function complexityText(value: Complexity): string {
  return `Complexity ${value} of 5`;
}
