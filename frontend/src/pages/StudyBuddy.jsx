/**
 * Study Buddy — chat UI over POST /api/learning/chat's SSE stream.
 *
 * `EventSource` can't send a POST body or an Authorization header, so this
 * hand-rolls stream parsing over `fetch` + `ReadableStream` instead — the
 * first SSE consumer in this frontend. The route's own `data: [DONE]`
 * sentinel closes the stream; a raw `res.end()` on error is handled by the
 * reader simply finishing with no `[DONE]` seen.
 */
import { useEffect, useRef, useState } from "react";
import { tokenStore } from "../lib/api.js";
import { Page, PageSection, Card, CardBody, Button, Textarea, Alert, Icon } from "../components/ui/index.js";

const API_URL = import.meta.env.VITE_API_URL;

export default function StudyBuddy() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unconfigured, setUnconfigured] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
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
        <PageSection>
          <Card>
            <CardBody className="flex flex-col gap-4">
              {error && <Alert tone="danger" onDismiss={() => setError("")}>{error}</Alert>}

              <div className="flex flex-col gap-3 max-h-[60vh] min-h-[200px] overflow-y-auto">
                {messages.length === 0 && (
                  <p className="text-sm text-content-2">Ask something like "explain closures" or "why does my JSX loop key warning show up?"</p>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-md px-3 py-2 text-sm whitespace-pre-wrap ${
                        m.role === "user" ? "bg-[var(--color-brand)] text-white" : "bg-surface-sunken text-content"
                      }`}
                    >
                      {m.content || (busy && i === messages.length - 1 ? "…" : "")}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={send} className="flex items-end gap-2">
                <Textarea
                  className="flex-1"
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e); }
                  }}
                />
                <Button type="submit" icon="submit" loading={busy}>Send</Button>
              </form>
            </CardBody>
          </Card>
        </PageSection>
      )}
    </Page>
  );
}
