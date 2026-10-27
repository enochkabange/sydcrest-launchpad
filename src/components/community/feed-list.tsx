"use client";

import { useState, useTransition } from "react";
import { fetchFeedPage } from "@/lib/community/actions";
import { appendPage, type PostView } from "@/lib/community/model";
import { Button } from "@/components/ui/button";
import { PostCard, type Viewer } from "./post-card";

/**
 * The posts of one feed with cursor pagination. The first page comes from
 * the server; "Load more" asks for the page before the cursor and appends
 * it. When the server re renders (after a post or a moderation step) the
 * first page is replaced and the loaded pages start again.
 */
export function FeedList({
  scope,
  scopeId,
  initial,
  cursor: initialCursor,
  viewer,
}: {
  scope: string;
  scopeId: string | null;
  initial: PostView[];
  cursor: string | null;
  viewer: Viewer;
}) {
  const [posts, setPosts] = useState(initial);
  const [cursor, setCursor] = useState(initialCursor);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  // A fresh first page from the server (refresh after a mutation) resets the list.
  const [shownInitial, setShownInitial] = useState(initial);
  if (initial !== shownInitial) {
    setShownInitial(initial);
    setPosts(initial);
    setCursor(initialCursor);
  }

  function loadMore() {
    if (!cursor) return;
    setError(null);
    start(async () => {
      const res = await fetchFeedPage(scope, scopeId, cursor);
      if ("error" in res) {
        setError(res.error);
        return;
      }
      setPosts((shown) => appendPage(shown, res.posts));
      setCursor(res.cursor);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-4" aria-label="Posts">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} viewer={viewer} />
          </li>
        ))}
      </ol>
      {error && (
        <p role="alert" className="text-sm text-danger-fg">
          {error}
        </p>
      )}
      {cursor ? (
        <Button variant="secondary" onClick={loadMore} disabled={pending} className="self-center">
          {pending ? "Loading…" : "Load more"}
        </Button>
      ) : (
        posts.length > 0 && <p className="text-center text-sm text-content-3">You have reached the first post.</p>
      )}
    </div>
  );
}
