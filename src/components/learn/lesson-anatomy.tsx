import { AlertTriangle, HelpCircle } from "lucide-react";
import type { KeyTerm } from "@/lib/content-generation/schema";

/**
 * The optional parts of a lesson (issue #255), rendered only when a lesson
 * has them. The lesson page wraps each in its own titled section.
 */

export function KeyTerms({ terms }: { terms: readonly KeyTerm[] }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 rounded-lg border border-line p-4 md:grid-cols-[minmax(8rem,auto)_1fr]">
      {terms.map((t) => (
        <div key={t.term} className="contents">
          <dt className="font-semibold text-content">{t.term}</dt>
          <dd className="text-content-2 md:pb-0 [&:not(:last-child)]:pb-2">{t.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CommonMistakes({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((m) => (
        <li key={m} className="flex gap-2.5 text-content-2">
          <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0 text-content-3" />
          <span>{m}</span>
        </li>
      ))}
    </ul>
  );
}

export function SelfCheck({ items }: { items: readonly string[] }) {
  return (
    <ol className="flex flex-col gap-2">
      {items.map((q) => (
        <li key={q} className="flex gap-2.5 text-content-2">
          <HelpCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-content-3" />
          <span>{q}</span>
        </li>
      ))}
    </ol>
  );
}

/** Key terms from the jsonb column, keeping only well formed pairs. */
export function asKeyTerms(value: unknown): KeyTerm[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((v) => {
    const t = v as { term?: unknown; definition?: unknown } | null;
    return t && typeof t.term === "string" && typeof t.definition === "string" && t.term.trim() && t.definition.trim()
      ? [{ term: t.term.trim(), definition: t.definition.trim() }]
      : [];
  });
}

/** A text[] column as a clean list. */
export function asStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && !!v.trim()) : [];
}
