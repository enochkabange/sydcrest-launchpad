import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { getCurrentUser } from "@/lib/auth";
import { PanelShell } from "./panel-shell";
import { ACTIONS_CLASS, StudyBuddyIntro, StudyBuddySignUpActions } from "./study-buddy-prompt";

/**
 * The Study Buddy card on the public topic page (#230). The frame and intro
 * are part of the prerendered page; only the action row reads the session, in
 * its own <Suspense>, so the topic stays cached for everyone. Signed in
 * learners get the way into the chat on the lesson, visitors get sign up.
 * The chat itself stays on /learn, so its bundle never loads here.
 */
export function TopicStudyBuddy({ nodeTitle, lessonPath }: { nodeTitle: string; lessonPath: string }) {
  return (
    <PanelShell>
      <StudyBuddyIntro nodeTitle={nodeTitle} />
      <Suspense fallback={<ActionsSkeleton />}>
        <TopicStudyBuddyActions lessonPath={lessonPath} />
      </Suspense>
    </PanelShell>
  );
}

async function TopicStudyBuddyActions({ lessonPath }: { lessonPath: string }) {
  const user = await getCurrentUser();
  if (!user) return <StudyBuddySignUpActions next={lessonPath} />;
  return (
    <div className={ACTIONS_CLASS}>
      <Link href={`${lessonPath}#study-buddy-heading`} className={buttonClasses("primary")}>
        Chat about this topic
        <ArrowRight aria-hidden className="size-4" />
      </Link>
      <Link href="/study-buddy" className={buttonClasses("secondary")}>
        Open Study Buddy
      </Link>
    </div>
  );
}

/** Two button sized placeholders in the same row, so nothing moves when the actions arrive. */
function ActionsSkeleton() {
  return (
    <div className={ACTIONS_CLASS} aria-hidden="true">
      <div className="h-11 animate-skeleton rounded-md bg-surface-sunken sm:w-52 lg:w-auto" />
      <div className="h-11 animate-skeleton rounded-md bg-surface-sunken sm:w-24 lg:w-auto" />
    </div>
  );
}
