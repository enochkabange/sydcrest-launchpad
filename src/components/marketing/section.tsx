import type { ReactNode } from "react";
import { SectionAccent } from "@/components/brand/illustrations";

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-8 md:px-8 md:pt-16">
      <SectionAccent />
      <p className="mt-3 text-xs font-bold tracking-widest text-content-3 uppercase">{eyebrow}</p>
      <h1 className="mt-1 max-w-3xl text-4xl text-content md:text-5xl">{title}</h1>
      <div className="mt-4 max-w-2xl text-lg text-content-2">{lead}</div>
    </div>
  );
}

export function Section({
  title,
  intro,
  children,
  tone = "plain",
  id,
}: {
  title?: string;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: "plain" | "sunken";
  id?: string;
}) {
  return (
    <section id={id} className={tone === "sunken" ? "bg-surface-sunken" : undefined}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">
        {title && <h2 className="max-w-3xl text-2xl text-content md:text-3xl">{title}</h2>}
        {intro && <div className="mt-3 max-w-2xl text-content-2">{intro}</div>}
        {children && <div className={title || intro ? "mt-8" : undefined}>{children}</div>}
      </div>
    </section>
  );
}

export function Card({ title, children, eyebrow }: { title: string; children: ReactNode; eyebrow?: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-line bg-surface p-5">
      {eyebrow}
      <h3 className="text-lg text-content">{title}</h3>
      <div className="text-content-2">{children}</div>
    </div>
  );
}

/** A real, sourced number. Never use this for a target or a guess. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-4">
      <span className="text-3xl font-bold text-content">{value}</span>
      <span className="text-sm text-content-2">{label}</span>
    </div>
  );
}
