import type { ReactNode } from "react";
import { SectionAccent } from "@/components/brand/illustrations";
import { Container, SplitHero } from "@/components/ui/layout";

/**
 * The top of a marketing page. With `aside`, the header becomes a split
 * hero from lg: words on the left, the aside (facts, a visual) on the right.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  aside?: ReactNode;
}) {
  const words = (
    <div>
      <SectionAccent />
      <p className="mt-3 text-xs font-bold tracking-widest text-content-3 uppercase">{eyebrow}</p>
      <h1 className="mt-1 max-w-4xl text-h1 text-content">{title}</h1>
      <div className="mt-4 max-w-reading text-lead text-content-2">{lead}</div>
    </div>
  );
  return (
    <Container className="pt-10 pb-8 md:pt-16 lg:pb-12 xl:pt-20 xl:pb-16">
      {aside ? <SplitHero visual={aside}>{words}</SplitHero> : words}
    </Container>
  );
}

/**
 * A full width band with a heading. `layout="split"` puts the heading and
 * intro in a left column beside the content from lg, which suits a section
 * of prose or a short list better than a wide stack.
 */
export function Section({
  title,
  intro,
  children,
  tone = "plain",
  id,
  layout = "stacked",
}: {
  title?: string;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: "plain" | "sunken";
  id?: string;
  layout?: "stacked" | "split";
}) {
  const split = layout === "split" && Boolean(children);
  return (
    <section id={id} className={tone === "sunken" ? "bg-surface-sunken" : undefined}>
      <Container
        className={`py-12 md:py-16 xl:py-24 ${split ? "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16" : ""}`}
      >
        {(title || intro) && (
          <div className={split ? "lg:sticky lg:top-8" : undefined}>
            {title && <h2 className="max-w-4xl text-h2 text-content">{title}</h2>}
            {intro && <div className="mt-3 max-w-reading text-body text-content-2">{intro}</div>}
          </div>
        )}
        {children && (
          <div className={title || intro ? (split ? "mt-8 lg:mt-0" : "mt-8 xl:mt-12") : undefined}>{children}</div>
        )}
      </Container>
    </section>
  );
}

export function Card({ title, children, eyebrow }: { title: string; children: ReactNode; eyebrow?: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-line bg-surface p-5 xl:p-6">
      {eyebrow}
      <h3 className="text-h3 text-content">{title}</h3>
      <div className="text-body text-content-2">{children}</div>
    </div>
  );
}

/** A real, sourced number. Never use this for a target or a guess. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-4 xl:p-6">
      <span className="text-3xl font-bold text-content xl:text-4xl">{value}</span>
      <span className="text-sm text-content-2">{label}</span>
    </div>
  );
}
