import { ClipboardCheck, FolderCheck, Route } from "lucide-react";

const WAYS = [
  {
    icon: Route,
    title: "Complete the matching path",
    body: "Pass every required topic quiz on a roadmap mapped to the skill. The badge is added the moment you finish.",
  },
  {
    icon: ClipboardCheck,
    title: "Pass the assessment",
    body: "Already have the skill? Take the skill's assessment. If you do not pass, you can try again after a short wait.",
  },
  {
    icon: FolderCheck,
    title: "Have your work reviewed",
    body: "Share a link to work you have done. A SydCrest mentor reviews it and either approves it or says what to improve.",
  },
] as const;

/** The three ways to earn a verified skill (Product Enrichment §7.5). Used as the hero aside on /skills. */
export function EarnWays() {
  return (
    <ol className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6" aria-label="Three ways to earn a verified skill">
      {WAYS.map(({ icon: Icon, title, body }) => (
        <li key={title} className="flex gap-3">
          <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-content-2" />
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-content">{title}</p>
            <p className="text-sm text-content-2">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
