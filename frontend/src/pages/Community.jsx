/**
 * Community — cohort feed, wired to GET/POST /api/community/posts.
 *
 * Cohort is derived from the caller's own learning path (its cohort_id) —
 * there's no dedicated "my cohort" endpoint yet. A self-directed path with
 * no cohort_id, or no path at all, means an honest "not in a cohort" state,
 * not a fake feed.
 */
import { useEffect, useState } from "react";
import { api, ApiError } from "../lib/api.js";
import { Page, PageSection, Card, CardBody, Avatar, Button, Textarea, Icon, EmptyState, Alert, PageLoader } from "../components/ui/index.js";

export default function Community() {
  const [cohortId, setCohortId] = useState(undefined); // undefined = not resolved yet, null = none
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [posting, setPosting] = useState(false);
  const [replyDrafts, setReplyDrafts] = useState({});

  useEffect(() => {
    api.get("/api/learning/paths")
      .then(({ paths }) => setCohortId(paths.find((p) => p.cohort_id)?.cohort_id ?? null))
      .catch(() => setCohortId(null));
  }, []);

  const loadPosts = (id) =>
    api.get(`/api/community/posts?cohort_id=${id}`)
      .then(({ posts }) => setPosts(posts))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load the feed."));

  useEffect(() => {
    if (cohortId) loadPosts(cohortId);
  }, [cohortId]);

  const submitPost = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setPosting(true);
    try {
      await api.post("/api/community/posts", { cohort_id: cohortId, content: draft });
      setDraft("");
      await loadPosts(cohortId);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't post.");
    } finally {
      setPosting(false);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const { liked, likes_count } = await api.post(`/api/community/posts/${postId}/like`, {});
      setPosts((ps) => ps.map((p) => (p.id === postId ? { ...p, liked_by_me: liked, likes_count } : p)));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't update like.");
    }
  };

  const submitReply = async (postId) => {
    const content = replyDrafts[postId];
    if (!content?.trim()) return;
    try {
      const { reply } = await api.post(`/api/community/posts/${postId}/replies`, { content });
      setPosts((ps) => ps.map((p) => (p.id === postId
        ? { ...p, post_replies: [...p.post_replies, reply], replies_count: p.replies_count + 1 }
        : p)));
      setReplyDrafts((d) => ({ ...d, [postId]: "" }));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't reply.");
    }
  };

  if (cohortId === undefined) return <PageLoader message="Loading…" />;

  if (cohortId === null) {
    return (
      <Page title="Community" titleHidden width="wide">
        <div className="mb-8 overflow-hidden rounded-2xl bg-[image:var(--gradient-launch)] px-6 py-10 sm:px-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5c2e00]/80">Delta Mentoring Program</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#211d1d] sm:text-4xl">Community</h1>
          <p className="mt-2 max-w-xl text-[#211d1d]/80">What your cohort is talking about.</p>
        </div>
        <EmptyState icon="community" title="Not in a cohort yet" description="The community feed is scoped to your cohort — it'll show up once you're placed in one." />
      </Page>
    );
  }

  if (posts === null && !error) return <PageLoader message="Loading the feed…" />;

  return (
    <Page title="Community" titleHidden width="wide">
      <div className="mb-8 overflow-hidden rounded-2xl bg-[image:var(--gradient-launch)] px-6 py-10 sm:px-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#5c2e00]/80">Delta Mentoring Program</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#211d1d] sm:text-4xl">Community</h1>
        <p className="mt-2 max-w-xl text-[#211d1d]/80">What your cohort is talking about.</p>
      </div>

      {error && <Alert tone="danger" className="mb-4" onDismiss={() => setError("")}>{error}</Alert>}

      <PageSection>
        <form onSubmit={submitPost} className="flex flex-col gap-3 mb-6">
          <Textarea placeholder="Share something with your cohort…" value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} />
          <Button type="submit" loading={posting} className="self-end">Post</Button>
        </form>

        {posts?.length === 0 ? (
          <EmptyState icon="community" title="No posts yet" description="Be the first to post in your cohort." />
        ) : (
          <div className="flex flex-col gap-4">
            {posts?.map((post) => (
              <Card key={post.id}>
                <CardBody className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <Avatar name={post.profiles.full_name} src={post.profiles.avatar_url} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-content">{post.profiles.full_name}</p>
                      <p className="text-xs text-content-3">{new Date(post.created_at).toLocaleString()}</p>
                      <p className="mt-2 text-sm text-content whitespace-pre-wrap">{post.content}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-11">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium ${post.liked_by_me ? "text-content-link" : "text-content-2"}`}
                    >
                      <Icon name="like" size="sm" fill={post.liked_by_me ? "currentColor" : "none"} />
                      {post.likes_count}
                    </button>
                    <span className="inline-flex items-center gap-1.5 text-sm text-content-2">
                      <Icon name="community" size="sm" />
                      {post.replies_count}
                    </span>
                  </div>

                  {post.post_replies.length > 0 && (
                    <div className="pl-11 flex flex-col gap-2 border-l-2 border-line ml-3">
                      {post.post_replies.map((r) => (
                        <div key={r.id} className="pl-3">
                          <span className="text-sm font-semibold text-content">{r.profiles.full_name}</span>
                          <span className="text-sm text-content-2"> · {r.content}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pl-11 flex gap-2">
                    <input
                      type="text"
                      placeholder="Reply…"
                      value={replyDrafts[post.id] || ""}
                      onChange={(e) => setReplyDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && submitReply(post.id)}
                      className="flex-1 h-9 rounded-md border border-line-strong bg-surface px-3 text-sm text-content"
                    />
                    <Button size="sm" variant="secondary" onClick={() => submitReply(post.id)}>Reply</Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </PageSection>
    </Page>
  );
}
