"use client";

import type { ReactNode } from "react";
import Link from "@/components/ui/link";
import { ExternalLink, MessageCircle, Pin } from "lucide-react";
import { Markdown } from "@/components/learn/markdown";
import { Initials } from "@/components/social/profile-bits";
import { timeAgo, type Author, type PostView, type ReplyView } from "@/lib/community/model";
import { ReactionBar } from "./reactions";
import { DeleteContent, HideContent, PinPost, ReportContent } from "./content-tools";

/** What the viewer may do in this feed, decided on the server. */
export type Viewer = {
  userId: string;
  /** Member of the group: may react and reply. */
  canInteract: boolean;
  canModerate: boolean;
};

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "info" | "warning" }) {
  const tones = {
    neutral: "bg-surface-sunken text-content-2",
    info: "bg-info-bg text-info-fg",
    warning: "bg-warning-bg text-warning-fg",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function Byline({ author, createdAt, edited, isMe }: { author: Author; createdAt: string; edited: boolean; isMe: boolean }) {
  const name = (
    <span className="font-semibold text-content">
      {author.name}
      {isMe ? " (you)" : ""}
    </span>
  );
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Initials name={author.name} />
      <div className="flex min-w-0 flex-col">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {author.slug ? (
            <Link href={`/u/${author.slug}`} className="no-underline hover:underline">
              {name}
            </Link>
          ) : (
            name
          )}
          {author.isLead && <Badge tone="info">Chapter lead</Badge>}
        </span>
        <span className="text-xs text-content-3">
          <time dateTime={createdAt} suppressHydrationWarning>
            {timeAgo(createdAt)}
          </time>
          {edited ? " · edited" : ""}
        </span>
      </div>
    </div>
  );
}

function HiddenNote({ what }: { what: string }) {
  return (
    <p className="rounded-md border border-warning-fg/30 bg-warning-bg px-3 py-2 text-sm text-warning-fg">
      A moderator hid this {what}. Only its author and the moderators can see it.
    </p>
  );
}

/** One feed post: author, body (safe markdown, no raw HTML), link, reactions and tools. */
export function PostCard({ post, viewer, inThread = false }: { post: PostView; viewer: Viewer; inThread?: boolean }) {
  const isMine = post.author.id === viewer.userId;
  const threadHref = `/community/post/${post.id}`;
  const canTouch = viewer.canInteract && !post.hidden;
  return (
    <article
      aria-labelledby={`post-${post.id}-by`}
      className={`flex flex-col gap-4 rounded-lg border p-4 xl:p-5 ${post.pinned ? "border-info-fg/40 bg-surface-raised" : "border-line bg-surface"}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div id={`post-${post.id}-by`}>
          <Byline author={post.author} createdAt={post.createdAt} edited={post.edited} isMe={isMine} />
        </div>
        <div className="flex flex-wrap gap-1">
          {post.pinned && (
            <Badge tone="info">
              <Pin className="size-3" aria-hidden="true" /> Pinned
            </Badge>
          )}
          {post.hidden && <Badge tone="warning">Hidden</Badge>}
        </div>
      </div>

      {post.hidden && <HiddenNote what="post" />}

      <div className="max-w-reading break-words">
        <Markdown source={post.body} />
      </div>

      {post.linkUrl && (
        <a
          href={post.linkUrl}
          target="_blank"
          rel="noopener noreferrer nofollow ugc"
          className="inline-flex min-h-11 max-w-full items-center gap-2 self-start rounded-md border border-line px-3 text-sm text-content-link hover:bg-surface-sunken"
        >
          <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{post.linkUrl.replace(/^https?:\/\//, "")}</span>
        </a>
      )}

      <div className="flex flex-wrap items-start justify-between gap-2 border-t border-line pt-3">
        <ReactionBar target="post" id={post.id} reactions={post.reactions} mine={post.mine} readOnly={!canTouch} />
        <div className="flex flex-wrap items-start justify-end gap-1">
          {!inThread && (
            <Link
              href={threadHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-content-2 no-underline hover:bg-surface-sunken hover:text-content"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {post.replyCount === 0 ? "Reply" : `${post.replyCount} ${post.replyCount === 1 ? "reply" : "replies"}`}
            </Link>
          )}
          {!isMine && <ReportContent target="post" id={post.id} />}
          {viewer.canModerate && <PinPost id={post.id} pinned={post.pinned} />}
          {viewer.canModerate && <HideContent target="post" id={post.id} hidden={post.hidden} />}
          {(isMine || viewer.canModerate) && <DeleteContent target="post" id={post.id} />}
        </div>
      </div>
    </article>
  );
}

/** One reply in a thread. */
export function ReplyCard({ reply, viewer, postOpen }: { reply: ReplyView; viewer: Viewer; postOpen: boolean }) {
  const isMine = reply.author.id === viewer.userId;
  const canTouch = viewer.canInteract && postOpen && !reply.hidden;
  return (
    <article aria-label={`Reply from ${reply.author.name}`} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <Byline author={reply.author} createdAt={reply.createdAt} edited={reply.edited} isMe={isMine} />
        {reply.hidden && <Badge tone="warning">Hidden</Badge>}
      </div>
      {reply.hidden && <HiddenNote what="reply" />}
      <div className="max-w-reading break-words">
        <Markdown source={reply.body} />
      </div>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <ReactionBar target="reply" id={reply.id} reactions={reply.reactions} mine={reply.mine} readOnly={!canTouch} />
        <div className="flex flex-wrap items-start gap-1">
          {!isMine && <ReportContent target="reply" id={reply.id} />}
          {viewer.canModerate && <HideContent target="reply" id={reply.id} hidden={reply.hidden} />}
          {(isMine || viewer.canModerate) && <DeleteContent target="reply" id={reply.id} />}
        </div>
      </div>
    </article>
  );
}
