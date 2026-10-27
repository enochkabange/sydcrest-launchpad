import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { PanelShell } from "./panel-shell";

/**
 * What signed out visitors see in place of the chat. Static (no auth read),
 * so it is safe on cached, prerendered public pages. `next` is where sign up
 * or sign in should return the learner, usually the topic's lesson page.
 */
export function StudyBuddyPrompt({ nodeTitle, next }: { nodeTitle: string; next?: string }) {
  const query = next ? `?next=${encodeURIComponent(next)}` : "";
  return (
    <PanelShell>
      <p className="text-content-2">
        Stuck on {nodeTitle}? Study Buddy is an AI tutor that helps you think it through, one question at a time. It
        is free for signed in learners.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href={`/signup${query}`} className={buttonClasses("primary")}>
          Sign up to use Study Buddy
        </Link>
        <Link href={`/login${query}`} className={buttonClasses("secondary")}>
          Sign in
        </Link>
      </div>
    </PanelShell>
  );
}
