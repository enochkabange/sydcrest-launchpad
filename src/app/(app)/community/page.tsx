import type { Metadata } from "next";
import { Suspense } from "react";
import { MainWithRail } from "@/components/ui/layout";
import { CommunityFeed, FeedSkeleton } from "@/components/community/feed";
import { CommunityRail, Guidelines, RailSkeleton, ScopeSwitcher, WhatsAppCard } from "@/components/community/rail";
import { feedAccess, getMyCommunity } from "@/lib/community/data";
import { parseFeedRef, type FeedRef } from "@/lib/community/model";

export const metadata: Metadata = { title: "Community" };

type Params = Pick<PageProps<"/community">, "searchParams">;

async function feedFrom(searchParams: Params["searchParams"]): Promise<FeedRef> {
  const params = await searchParams;
  return parseFeedRef(params.scope, params.id);
}

/** Phones: the feed switcher and the WhatsApp group sit above the feed (the rail is hidden below lg). */
async function Main({ searchParams }: Params) {
  const [current, me] = await Promise.all([feedFrom(searchParams), getMyCommunity()]);
  const access = feedAccess(me, current);
  return (
    <>
      <div className="flex flex-col gap-4 lg:hidden">
        <ScopeSwitcher me={me} current={current} variant="pills" />
        <WhatsAppCard me={me} current={current} compact />
      </div>
      {current.scope !== "everyone" && (
        <h2 className="text-subtitle text-content">{access.canRead ? access.label : "Members only feed"}</h2>
      )}
      <CommunityFeed scope={current.scope} scopeId={current.scopeId} />
      <div className="lg:hidden">
        <Guidelines />
      </div>
    </>
  );
}

async function Rail({ searchParams }: Params) {
  return <CommunityRail current={await feedFrom(searchParams)} />;
}

/**
 * The in app community feed (#162). Everyone, plus the viewer's chapter and
 * cohort feeds (members only). WhatsApp stays the main place to chat; each
 * chapter and cohort feed links its group. Desktop: the feed with a rail for
 * the switcher, the WhatsApp group and the guidelines.
 */
export default function CommunityPage({ searchParams }: PageProps<"/community">) {
  return (
    <MainWithRail
      railLabel="Community"
      railFrom="lg"
      rail={
        <Suspense fallback={<RailSkeleton />}>
          <Rail searchParams={searchParams} />
        </Suspense>
      }
    >
      <header className="flex flex-col gap-2">
        <h1 className="text-title text-content">Community</h1>
        <p className="max-w-reading text-lead text-content-2">
          Share wins, ask questions and help each other. Day to day chat happens in your WhatsApp groups; posts here stay
          easy to find.
        </p>
      </header>
      <Suspense fallback={<FeedSkeleton />}>
        <Main searchParams={searchParams} />
      </Suspense>
    </MainWithRail>
  );
}
