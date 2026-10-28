import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { ReplyComposer } from "@/components/community/composer";
import { FeedSkeleton } from "@/components/community/feed";
import { PostCard, ReplyCard } from "@/components/community/post-card";
import { CommunityRail, RailSkeleton } from "@/components/community/rail";
import { feedAccess, getMyCommunity, loadThread } from "@/lib/community/data";
import { feedHref, isUuid, type FeedRef } from "@/lib/community/model";

export const metadata: Metadata = { title: "Post", robots: { index: false } };

// The app shell's nav reads usePathname() outside a Suspense boundary, which
// a dynamic segment cannot prerender (same as /cohort/week/[n]).
export const instant = false;

type Params = Pick<PageProps<"/community/post/[id]">, "params">;

function refOf(post: { scope: string; chapterId: string | null; cohortId: string | null }): FeedRef {
  if (post.scope === "chapter" && post.chapterId) return { scope: "chapter", scopeId: post.chapterId };
  if (post.scope === "cohort" && post.cohortId) return { scope: "cohort", scopeId: post.cohortId };
  return { scope: "everyone", scopeId: null };
}

async function load(params: Params["params"]) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const thread = await loadThread(id);
  if (!thread) notFound();
  return thread;
}

async function Thread({ params }: Params) {
  const [{ post, replies }, me] = await Promise.all([load(params), getMyCommunity()]);
  const ref = refOf(post);
  const access = feedAccess(me, ref);
  const viewer = { userId: me.userId, canInteract: access.canPost, canModerate: access.canModerate };
  const visibleReplies = replies.filter((r) => !r.hidden).length;

  return (
    <>
      <Link
        href={feedHref(ref)}
        className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-content-2 no-underline hover:text-content"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to {access.label}
      </Link>
      <h1 className="sr-only">Post by {post.author.name}</h1>
      <PostCard post={post} viewer={viewer} inThread />
      <section aria-labelledby="replies-heading" className="flex flex-col gap-4">
        <h2 id="replies-heading" className="text-subtitle text-content">
          {visibleReplies === 0 ? "Replies" : `${visibleReplies} ${visibleReplies === 1 ? "reply" : "replies"}`}
        </h2>
        {replies.length === 0 && (
          <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
            No replies yet. {access.canPost && !post.hidden ? "Be the first to answer." : ""}
          </p>
        )}
        {replies.length > 0 && (
          <ol className="flex flex-col gap-3">
            {replies.map((r) => (
              <li key={r.id}>
                <ReplyCard reply={r} viewer={viewer} postOpen={!post.hidden} />
              </li>
            ))}
          </ol>
        )}
        {access.canPost && !post.hidden && <ReplyComposer postId={post.id} />}
        {post.hidden && <p className="text-sm text-content-3">Replies are closed while this post is hidden.</p>}
      </section>
    </>
  );
}

async function Rail({ params }: Params) {
  const { post } = await load(params);
  return <CommunityRail current={refOf(post)} />;
}

/** A post with its replies and reactions (#162). Readers only: RLS and the definer functions decide. */
export default function PostPage({ params }: PageProps<"/community/post/[id]">) {
  return (
    <MainWithRail
      railLabel="Community"
      railFrom="lg"
      rail={
        <Suspense fallback={<RailSkeleton />}>
          <Rail params={params} />
        </Suspense>
      }
    >
      <Suspense fallback={<FeedSkeleton />}>
        <Thread params={params} />
      </Suspense>
    </MainWithRail>
  );
}
