/**
 * Messages — PLATFORM_SPEC.md §11 (chat only; video is a separate PR).
 * Single-column mobile-first, matching the rest of the app: the list at
 * /messages, a thread at /messages/:conversationId, not a two-pane
 * desktop layout.
 *
 * Delivery is short polling, not WebSockets/Realtime — see
 * backend/src/routes/chat.js's header comment for why. The thread polls
 * only while mounted (cleared on navigate-away): no background polling
 * for a closed conversation, deliberate given the low-end-Android,
 * metered-data framing the rest of this platform is built around.
 */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { api, ApiError } from "../lib/api.js";
import { Page, Card, CardBody, Avatar, Badge, Button, Input, Icon, EmptyState, Alert, PageLoader } from "../components/ui/index.js";

const POLL_MS = 4000;

function ConversationList({ onOpen }) {
  const [conversations, setConversations] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/chat/conversations")
      .then(({ conversations }) => setConversations(conversations))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your messages."));
  }, []);

  if (error) return <Alert tone="danger" title="Something went wrong">{error}</Alert>;
  if (conversations === null) return <PageLoader message="Loading messages…" />;
  if (conversations.length === 0) {
    return (
      <EmptyState
        icon="chat"
        title="No conversations yet"
        description="Message a mentor from the Mentors page, or wait for your cohort's group chat to fill up."
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {conversations.map((c) => (
        <Card key={c.id} interactive onClick={() => onOpen(c.id)} className="cursor-pointer">
          <CardBody className="flex items-center gap-3">
            <Avatar name={c.display_name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-content truncate">{c.display_name}</p>
                {c.type === "cohort" && <Badge tone="info">Group</Badge>}
              </div>
              <p className="text-sm text-content-2 truncate">{c.last_message?.content ?? "No messages yet"}</p>
            </div>
            {c.unread_count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-700 px-1.5 text-xs font-bold text-white tabular-nums">
                {c.unread_count > 9 ? "9+" : c.unread_count}
              </span>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

function Thread({ conversationId, onBack }) {
  const { profile } = useAuth();
  const [messages, setMessages] = useState(null);
  const [conversationMeta, setConversationMeta] = useState(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const sinceRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    sinceRef.current = null;
    setMessages(null);

    api.get("/api/chat/conversations").then(({ conversations }) => {
      if (!cancelled) setConversationMeta(conversations.find((c) => c.id === conversationId) ?? null);
    }).catch(() => {});

    const poll = () => {
      const isFirstLoad = !sinceRef.current;
      const qs = sinceRef.current ? `?since=${encodeURIComponent(sinceRef.current)}` : "";
      api.get(`/api/chat/conversations/${conversationId}/messages${qs}`)
        .then(({ messages: incoming }) => {
          if (cancelled) return;
          // The first load must clear the loading state even when the
          // conversation is empty; later polls only touch state when
          // there's something new, so an idle thread isn't re-rendering
          // every tick.
          if (incoming.length === 0) {
            // Advance the cursor even on an empty first load, or every
            // subsequent poll would keep re-requesting "latest 50" instead
            // of the cheaper "anything since X" once the thread is idle.
            if (isFirstLoad) { setMessages([]); sinceRef.current = new Date().toISOString(); }
            return;
          }
          setMessages((prev) => (isFirstLoad ? incoming : [...(prev ?? []), ...incoming]));
          sinceRef.current = incoming[incoming.length - 1].created_at;
        })
        .catch((err) => { if (!cancelled) setError(err instanceof ApiError ? err.message : "Couldn't load messages."); });
    };

    poll();
    api.post(`/api/chat/conversations/${conversationId}/read`).catch(() => {});
    const interval = setInterval(poll, POLL_MS);
    return () => { cancelled = true; clearInterval(interval); };
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    const content = draft.trim();
    if (!content) return;
    setDraft("");
    try {
      const { message } = await api.post(`/api/chat/conversations/${conversationId}/messages`, { content });
      setMessages((prev) => [...(prev ?? []), message]);
      sinceRef.current = message.created_at;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't send that.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-content-2 hover:text-content self-start">
        <Icon name="chevronLeft" size="sm" /> Back to messages
      </button>

      {error && <Alert tone="danger" onDismiss={() => setError("")}>{error}</Alert>}

      <div className="flex items-center gap-3 mb-1">
        <Avatar name={conversationMeta?.display_name} />
        <div>
          <p className="font-bold text-content">{conversationMeta?.display_name ?? "Conversation"}</p>
          {conversationMeta?.type === "cohort" && <Badge tone="info">Group chat</Badge>}
        </div>
      </div>

      <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto rounded-lg border border-line bg-surface-sunken p-3">
        {messages === null ? (
          <PageLoader message="Loading…" />
        ) : messages.length === 0 ? (
          <p className="text-sm text-content-2 text-center py-6">No messages yet — say hello.</p>
        ) : (
          messages.map((m) => {
            const mine = m.sender_id === profile?.id;
            return (
              <div key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                {!mine && conversationMeta?.type === "cohort" && (
                  <span className="text-xs text-content-3 mb-0.5 px-1">{m.profiles?.full_name}</span>
                )}
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${mine ? "bg-blue-500 text-white" : "bg-surface border border-line text-content"}`}>
                  {m.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="flex gap-2">
        <Input className="flex-1" placeholder="Type a message…" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <Button type="submit" disabled={!draft.trim()}>Send</Button>
      </form>
    </div>
  );
}

export default function Messages() {
  const { conversationId } = useParams();
  const navigate = useNavigate();

  return (
    <Page eyebrow="Messages" title={conversationId ? "Conversation" : "Messages"} titleHidden={!!conversationId}>
      {conversationId ? (
        <Thread conversationId={conversationId} onBack={() => navigate("/messages")} />
      ) : (
        <ConversationList onOpen={(id) => navigate(`/messages/${id}`)} />
      )}
    </Page>
  );
}
