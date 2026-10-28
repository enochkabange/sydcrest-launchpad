import { HubStrip } from "@/components/app-shell/hub";

/**
 * The Community tab opens the feed (/community, from #182), so the feed is
 * the Community hub: the row of Community destinations (Feed, Events,
 * Chapters, Leaderboards) sits above it and above every feed page, keeping
 * each one two taps from anywhere (issue #190).
 */
export default function CommunityLayout({ children }: LayoutProps<"/community">) {
  return (
    <div className="flex flex-col gap-6">
      <HubStrip id="community" current="/community" />
      {children}
    </div>
  );
}
