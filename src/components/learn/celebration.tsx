import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { ShareCard } from "@/components/share/share-card";
import { PartyPopper } from "lucide-react";
import type { Unlocked } from "./quiz-data";

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
  unlocked?: Unlocked;
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
      ) : unlocked?.section ? (
        <p className="text-content">You have finished every topic in this section. That milestone is now in your achievements.</p>
      ) : unlocked?.node ? (
        <p className="text-content">This topic is now in your achievements.</p>
      ) : note ? (
        <p className="text-content">{note}</p>
      ) : null}
      {unlocked?.share &&
        (unlocked.isPublic ? (
          <ShareCard {...unlocked.share} />
        ) : (
          <p className="text-sm text-content-2">
            Want to share a card of this milestone?{" "}
            <Link href="/profile#public-profile-heading" className="font-semibold text-content-link underline">
              Make your profile public
            </Link>{" "}
            first. Cards show only what your public profile shows.
          </p>
        ))}
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
