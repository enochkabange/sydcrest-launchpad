/**
 * Table of contents for a lesson (issue #255): the lesson's own sections in
 * a fixed order, with the explanation's headings nested under it. Pure, so
 * the ids here and the ids `<Markdown idPrefix>` puts on headings come from
 * the same function and every link resolves.
 */
import { parseMarkdown, type Inline } from "./markdown-parse";

export type TocEntry = { id: string; label: string; children: TocEntry[] };

export function inlineText(nodes: Inline[]): string {
  return nodes
    .map((n) => (n.type === "text" || n.type === "code" ? n.text : inlineText(n.children)))
    .join("");
}

/** "Saving data while you learn" to "saving-data-while-you-learn". */
export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/, "") || "section"
  );
}

/** Ids for headings in order: prefixed, and made unique with -2, -3. */
export function headingIds(texts: string[], prefix: string): string[] {
  const used = new Map<string, number>();
  return texts.map((text) => {
    const base = `${prefix}-${slugifyHeading(text)}`;
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  });
}

/** The headings of a markdown source, as they will render, with their ids. */
export function markdownHeadings(source: string | null | undefined, prefix: string): TocEntry[] {
  const texts = parseMarkdown(source)
    .filter((b) => b.type === "heading")
    .map((b) => inlineText(b.children).trim());
  const ids = headingIds(texts, prefix);
  return texts.map((label, i) => ({ id: ids[i], label, children: [] }));
}

export type LessonParts = {
  outcomes?: readonly string[] | null;
  explanation_md?: string | null;
  workedExample_md?: string | null;
  keyTerms?: readonly unknown[] | null;
  commonMistakes?: readonly string[] | null;
  practice_task_md?: string | null;
  hasResources?: boolean;
  selfCheck?: readonly string[] | null;
};

/** Section ids on the lesson page, in reading order. */
export const LESSON_SECTIONS = {
  outcomes: { id: "outcomes", label: "You will be able to" },
  explanation: { id: "explanation", label: "Explanation" },
  workedExample: { id: "worked-example", label: "Worked example" },
  keyTerms: { id: "key-terms", label: "Key terms" },
  commonMistakes: { id: "common-mistakes", label: "Common mistakes" },
  practice: { id: "practice", label: "Practice task" },
  resources: { id: "resources", label: "Resources" },
  selfCheck: { id: "self-check", label: "Check yourself" },
  checkpoint: { id: "checkpoint", label: "Checkpoint" },
} as const;

/**
 * The lesson's contents: each part that is present, in the lesson anatomy
 * order, with the explanation's own headings nested. The checkpoint (quiz or
 * mark complete) is always last.
 */
export function lessonToc(parts: LessonParts): TocEntry[] {
  const S = LESSON_SECTIONS;
  const entry = (s: { id: string; label: string }, children: TocEntry[] = []): TocEntry => ({ ...s, children });
  const toc: TocEntry[] = [];
  if (parts.outcomes?.length) toc.push(entry(S.outcomes));
  toc.push(entry(S.explanation, markdownHeadings(parts.explanation_md, S.explanation.id)));
  if (parts.workedExample_md?.trim()) toc.push(entry(S.workedExample));
  if (parts.keyTerms?.length) toc.push(entry(S.keyTerms));
  if (parts.commonMistakes?.length) toc.push(entry(S.commonMistakes));
  if (parts.practice_task_md?.trim()) toc.push(entry(S.practice));
  if (parts.hasResources) toc.push(entry(S.resources));
  if (parts.selfCheck?.length) toc.push(entry(S.selfCheck));
  toc.push(entry(S.checkpoint));
  return toc;
}

/** Every id in reading order, for the scroll spy. */
export function tocIds(toc: TocEntry[]): string[] {
  return toc.flatMap((e) => [e.id, ...tocIds(e.children)]);
}
