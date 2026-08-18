/**
 * Study Buddy — chat UI over POST /api/learning/chat's SSE stream.
 *
 * `EventSource` can't send a POST body or an Authorization header, so this
 * hand-rolls stream parsing over `fetch` + `ReadableStream` instead — the
 * first SSE consumer in this frontend. The route's own `data: [DONE]`
 * sentinel closes the stream; a raw `res.end()` on error is handled by the
 * reader simply finishing with no `[DONE]` seen.
 *
 * Visual anchor: a gradient icon badge stands in for an avatar on both the
 * empty state and every assistant bubble — `--gradient-launch`, the same
 * brand gradient LessonCard uses for its thumbnail strip, so Study Buddy
 * reads as a designed feature rather than a bare textarea in a box.
 */
import { useEffect, useRef, useState } from "react";
import { tokenStore } from "../lib/api.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Page, Card, Button, Alert, Icon, Avatar } from "../components/ui/index.js";

const API_URL = import.meta.env.VITE_API_URL;

const PROMPTS = [
  "Explain closures like I'm new to JS",
  "Why does my JSX loop key warning show up?",
  "What should I focus on this week?",
];

function BuddyBadge({ size = "md" }) {
  const dim = size === "lg" ? "size-14" : "size-8";
  const icon = size === "lg" ? "lg" : "sm";
  return (
    <span
      className={`${dim} shrink-0 rounded-full inline-flex items-center justify-center bg-[image:var(--gradient-launch)] text-content`}
    >
      <Icon name="studyBuddy" size={icon} />
    </span>
  );
}

export default function StudyBuddy() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unconfigured, setUnconfigured] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e, presetText) => {
    e?.preventDefault();
    const text = (presetText ?? input).trim();
    if (!text || busy) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/learning/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenStore.get()}`,
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (res.status === 503) {
        setUnconfigured(true);
        setMessages(nextMessages);
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") continue;
          const { text: delta } = JSON.parse(payload);
          setMessages((ms) => {
            const copy = [...ms];
            copy[copy.length - 1] = { role: "assistant", content: copy[copy.length - 1].content + delta };
            return copy;
          });
        }
      }
    } catch (err) {
      setError(err.message || "Study Buddy couldn't respond.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Page eyebrow="Delta Mentoring Program" title="Study Buddy" description="Ask anything about your curriculum — it'll guide you, not just hand you the answer.">
      {unconfigured ? (
        <Alert tone="info" title="Study Buddy isn't set up yet">
          This platform hasn't turned on AI chat. Reach out to a mentor in Community instead.
        </Alert>
      ) : (
        <Card className="flex flex-col overflow-hidden" style={{ height: "min(70vh, 640px)" }}>
          <div className="flex items-center gap-3 border-b border-line bg-surface-sunken px-5 py-3">
            <BuddyBadge />
            <div className="min-w-0">
              <p className="text-sm font-bold text-content">Study Buddy</p>
              <p className="text-xs text-content-3">Powered by Claude · guides, doesn't just answer</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {error && <Alert tone="danger" className="mb-4" onDismiss={() => setError("")}>{error}</Alert>}

            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <BuddyBadge size="lg" />
                <div>
                  <p className="text-sm font-semibold text-content">What are you working on?</p>
                  <p className="mt-1 text-sm text-content-3">Ask a concept question or paste an error — I'll walk you through it.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={(e) => send(e, p)}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-content-2 transition-colors hover:border-blue-500 hover:text-content"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "assistant" && <BuddyBadge />}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                        m.role === "user"
                          ? "rounded-br-sm bg-[image:var(--gradient-depth)] text-white"
                          : "rounded-bl-sm bg-surface-sunken text-content"
                      }`}
                    >
                      {m.content || (busy && i === messages.length - 1 ? "…" : "")}
                    </div>
                    {m.role === "user" && <Avatar name={profile?.full_name} size="xs" />}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <form onSubmit={send} className="flex items-end gap-2 border-t border-line bg-surface-sunken p-3">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e); }
              }}
              className="flex-1 resize-none rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-content placeholder:text-content-3 focus:border-blue-500 focus:outline-none"
            />
            <Button type="submit" icon="submit" loading={busy} className="rounded-full" aria-label="Send">
              Send
            </Button>
          </form>
        </Card>
      )}
    </Page>
  );
}
