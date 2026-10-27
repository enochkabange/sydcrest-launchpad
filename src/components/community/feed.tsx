import { Suspense } from "react";
import { feedAccess, getMyCommunity, loadFeedPage } from "@/lib/community/data";
import { isUuid, type FeedPage, type FeedRef, type Scope } from "@/lib/community/model";
import { PostComposer } from "./composer";
import { FeedList } from "./feed-list";

function toRef(scope: Scope, scopeId: string | null | undefined): FeedRef | null {
  if (scope === "everyone") return { scope, scopeId: null };
  return isUuid(scopeId) ? { scope, scopeId: scopeId.toLowerCase() } : null;
}

const panel = "flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6";

function MembersOnly({ scope }: { scope: Scope }) {
  const what = scope === "cohort" ? "cohort" : "chapter";
  return (
    <div className={panel}>
      <h2 className="text-h3 text-content">This feed is for {what} members</h2>
      <p className="text-content-2">
        {scope === "cohort"
          ? "Only learners and staff of this cohort can read and post here."
          : "Join the chapter to read its posts, share your own and get its WhatsApp group link."}
      </p>
    </div>
  );
}

function EmptyFeed({ canPost }: { canPost: boolean }) {
  return (
    <div className={panel}>
      <h2 className="text-h3 text-content">No posts yet</h2>
      <p className="text-content-2">
        {canPost
          ? "Start the conversation. Share something you learned this week, a question you are stuck on or a useful link."
          : "Posts from members will show here."}
      </p>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      <div className="h-44 animate-skeleton rounded-lg bg-surface-sunken" />
      <div className="h-40 animate-skeleton rounded-lg bg-surface-sunken" />
      <div className="h-40 animate-skeleton rounded-lg bg-surface-sunken" />
    </div>
  );
}

async function FeedBody({ feed: ref }: { feed: FeedRef }) {
  const me = await getMyCommunity();
  const access = feedAccess(me, ref);
  if (!access.canRead) return <MembersOnly scope={ref.scope} />;

  let page: FeedPage;
  try {
    page = await loadFeedPage(ref);
  } catch (e) {
    if ((e as { code?: string }).code === "42501") return <MembersOnly scope={ref.scope} />;
    throw e;
  }

  return (
    <div className="flex flex-col gap-6">
      {access.canPost ? (
        <PostComposer scope={ref.scope} scopeId={ref.scopeId} groupLabel={access.label} />
      ) : (
        <p className="rounded-lg border border-line p-4 text-sm text-content-2">
          You can read and moderate this feed as an admin. Only its members can post.
        </p>
      )}
      {page.posts.length === 0 ? (
        <EmptyFeed canPost={access.canPost} />
      ) : (
        <FeedList
          scope={ref.scope}
          scopeId={ref.scopeId}
          initial={page.posts}
          cursor={page.cursor}
          viewer={{ userId: me.userId, canInteract: access.canPost, canModerate: access.canModerate }}
        />
      )}
    </div>
  );
}

/**
 * A community feed (#162): composer for members, posts (pinned first) with
 * reactions, replies, reporting and moderation, and "Load more" paging.
 * Reads the session inside its own Suspense boundary, so any page can mount
 * it, for example a chapter page: `<CommunityFeed scope="chapter" scopeId={chapter.id} />`.
 * Non members see an honest members only panel.
 */
export function CommunityFeed({ scope, scopeId = null }: { scope: Scope; scopeId?: string | null }) {
  const ref = toRef(scope, scopeId);
  if (!ref) return null;
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <FeedBody feed={ref} />
    </Suspense>
  );
}
