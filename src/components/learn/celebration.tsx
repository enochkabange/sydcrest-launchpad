import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";

export type NextNode = { href: string; title: string } | null;

/** Shown after a node is completed: what was earned, then the way forward. */
export function Celebration({
  heading,
  roadmapTitle,
  unlocked,
  note,
  next,
}: {
  heading: string;
  roadmapTitle: string;
  unlocked?: { node: boolean; roadmap: boolean };
  /** Shown when nothing was unlocked, for example after a topic is marked done by hand. */
  note?: string;
  next: NextNode;
}) {
  return (
    <div
      role="status"
      className="flex animate-panel-in flex-col gap-3 rounded-lg border border-success-fg/30 bg-success-bg p-5"
    >
      <p className="flex items-center gap-2 text-lg font-semibold text-success-fg">
        <PartyPopper className="size-6 shrink-0" aria-hidden="true" />
        {heading}
      </p>
      {unlocked?.roadmap ? (
        <p className="text-content">
          You have completed every required topic in {roadmapTitle}. That milestone is now in your achievements.
        </p>
      ) : unlocked?.node ? (
        <p className="text-content">This topic is now in your achievements.</p>
      ) : note ? (
        <p className="text-content">{note}</p>
      ) : null}
      {next ? (
        <Link href={next.href} className={buttonClasses("primary", "self-start")}>
          Next topic: {next.title}
        </Link>
      ) : (
        <Link href="/dashboard" className={buttonClasses("secondary", "self-start")}>
          Back to your dashboard
        </Link>
      )}
    </div>
  );
}
