import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { PanelShell } from "./panel-shell";

/**
 * The card's action row. Stacked on phones and in the narrow lg rail, side by
 * side in between. Shared by every state (and the loading fallback) so the
 * card keeps its height when the signed in check resolves.
 */
export const ACTIONS_CLASS = "flex flex-col gap-2 sm:flex-row lg:flex-col";

export function StudyBuddyIntro({ nodeTitle }: { nodeTitle: string }) {
  return (
    <p className="text-content-2">
      Stuck on {nodeTitle}? Study Buddy is an AI tutor that helps you think it through, one question at a time. It is
      free for signed in learners.
    </p>
  );
}

/** Sign up and sign in links that return to `next` (usually the topic's lesson). */
export function StudyBuddySignUpActions({ next }: { next?: string }) {
  const query = next ? `?next=${encodeURIComponent(next)}` : "";
  return (
    <div className={ACTIONS_CLASS}>
      <Link href={`/signup${query}`} className={buttonClasses("primary")}>
        Sign up to use Study Buddy
      </Link>
      <Link href={`/login${query}`} className={buttonClasses("secondary")}>
        Sign in
      </Link>
    </div>
  );
}

/**
 * What signed out visitors see in place of the chat. Static (no auth read).
 * On a prerendered public page, use TopicStudyBuddy instead, which checks the
 * session in a request time island.
 */
export function StudyBuddyPrompt({ nodeTitle, next }: { nodeTitle: string; next?: string }) {
  return (
    <PanelShell>
      <StudyBuddyIntro nodeTitle={nodeTitle} />
      <StudyBuddySignUpActions next={next} />
    </PanelShell>
  );
}
