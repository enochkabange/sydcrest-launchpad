"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DAILY_MESSAGE_LIMIT, MAX_MESSAGE_CHARS } from "@/lib/study-buddy/config";
import type { ChatMessage } from "@/lib/study-buddy/request";
import { PanelShell } from "./panel-shell";
import { ReplyMarkdown } from "./reply-markdown";
import { StudyBuddyPrompt } from "./study-buddy-prompt";

type Status = "idle" | "streaming" | "limit" | "error";

type Props = {
  /** roadmap_nodes.id of the topic on screen, or null for the companion chat outside a lesson. */
  nodeId: string | null;
  /** The topic's title; ignored in the companion chat. */
  nodeTitle?: string;
  /** False shows the sign up prompt instead of the chat. */
  signedIn: boolean;
  /** False when the server has no model key: a friendly notice instead of the chat. */
  available?: boolean;
  /** Messages left today, from getStudyBuddyAllowance(). Unknown until the first reply if omitted. */
  remainingToday?: number | null;
  limit?: number;
};

const STARTERS = ["Can you explain this topic simply?", "Give me a question to check my understanding"];

/** Companion chat starters: each one leads to a tool over the learner's own data. */
export const COMPANION_STARTERS = [
  "What should I do next?",
  "Who could mentor me?",
  "Any opportunities for me?",
  "What events are coming up?",
];

export function StudyBuddy({
  nodeId,
  nodeTitle,
  signedIn,
  available = true,
  remainingToday = null,
  limit = DAILY_MESSAGE_LIMIT,
}: Props) {
  if (!signedIn) return <StudyBuddyPrompt nodeTitle={nodeTitle ?? "your next step"} />;
  if (!available) return <Unavailable companion={nodeId === null} />;
  return <ChatPanel nodeId={nodeId} nodeTitle={nodeTitle ?? ""} initialRemaining={remainingToday} limit={limit} />;
}

function Unavailable({ companion }: { companion: boolean }) {
  return (
    <PanelShell>
      <Alert tone="info">
        {companion
          ? "Study Buddy is resting right now, so chat is switched off for the moment. Your path, lessons and the rest of SydCrest work as usual. Please check back later."
          : "Study Buddy is resting right now, so chat is switched off for the moment. The lesson, practice task and checkpoint all work as usual. Please check back later."}
      </Alert>
    </PanelShell>
  );
}

async function readError(res: Response): Promise<{ error?: string; message?: string }> {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function ChatPanel({
  nodeId,
  nodeTitle,
  initialRemaining,
  limit,
}: {
  nodeId: string | null;
  nodeTitle: string;
  initialRemaining: number | null;
  limit: number;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<Status>(initialRemaining === 0 ? "limit" : "idle");
  const [notice, setNotice] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(initialRemaining);
  const logRef = useRef<HTMLDivElement>(null);
  const inputId = `study-buddy-input-${nodeId ?? "companion"}`;
  const companion = nodeId === null;
  const starters = companion ? COMPANION_STARTERS : STARTERS;

  const busy = status === "streaming";
  const blocked = status === "limit";

  function scrollToEnd() {
    requestAnimationFrame(() => {
      const el = logRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  function appendToReply(text: string) {
    setMessages((prev) => {
      const next = prev.slice();
      const last = next.at(-1);
      if (last?.role === "assistant") next[next.length - 1] = { ...last, content: last.content + text };
      return next;
    });
    scrollToEnd();
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy || blocked) return;

    const history: ChatMessage[] = [...messages.filter((m) => m.content), { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setDraft("");
    setNotice(null);
    setStatus("streaming");
    scrollToEnd();

    let res: Response;
    try {
      res = await fetch("/api/study-buddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodeId, messages: history }),
      });
    } catch {
      setMessages(history);
      setNotice("We could not reach Study Buddy. Check your connection and try again.");
      setStatus("error");
      return;
    }

    if (!res.ok) {
      const body = await readError(res);
      setMessages(history);
      if (res.status === 429) {
        setRemaining(0);
        setNotice(body.message ?? "You have used all of today's messages. They refresh at midnight, Ghana time.");
        setStatus("limit");
      } else if (res.status === 503) {
        setNotice("Study Buddy is resting right now. Please try again later.");
        setStatus("error");
      } else {
        setNotice(body.message ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
      return;
    }

    const left = Number(res.headers.get("X-Study-Buddy-Remaining"));
    if (Number.isFinite(left)) setRemaining(Math.max(0, left));

    const reader = res.body?.getReader();
    if (!reader) {
      setNotice("Something went wrong. Please try again.");
      setStatus("error");
      return;
    }
    const decoder = new TextDecoder();
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        appendToReply(decoder.decode(value, { stream: true }));
      }
      appendToReply(decoder.decode());
      setStatus(Number.isFinite(left) && left <= 0 ? "limit" : "idle");
      if (Number.isFinite(left) && left <= 0) {
        setNotice("That was your last message for today. Your messages refresh at midnight, Ghana time.");
      }
    } catch {
      setNotice("The reply was cut off. Please try again.");
      setStatus("error");
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends on a keyboard; on phones the send button is the way.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void send(draft);
    }
  }

  const counter =
    remaining === null ? null : (
      <p className="shrink-0 text-sm text-content-3" aria-live="polite">
        {remaining} of {limit} left today
      </p>
    );

  return (
    <PanelShell aside={counter}>
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-busy={busy}
        className="flex max-h-[28rem] min-h-32 flex-col gap-3 overflow-y-auto"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-content-2">
              {companion
                ? "Ask me what to learn next, who could mentor you, or which opportunities and events suit your path. I look at your own progress on SydCrest to answer."
                : `Ask anything about ${nodeTitle}. I will help you work it out step by step rather than just give you the answer.`}
            </p>
            {!blocked && (
              <div className="flex flex-wrap gap-2">
                {starters.map((starter) => (
                  <Button key={starter} variant="secondary" onClick={() => void send(starter)} disabled={busy}>
                    {starter}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-8 self-end rounded-lg bg-surface-sunken px-3 py-2 text-content"
                  : "mr-8 self-start text-content"
              }
            >
              <span className="sr-only">{m.role === "user" ? "You said:" : "Study Buddy said:"}</span>
              {m.role === "assistant" && m.content ? (
                <ReplyMarkdown source={m.content} />
              ) : (
                <p className="whitespace-pre-wrap break-words">
                  {m.content ||
                    (busy && i === messages.length - 1 ? <span className="text-content-3">Thinking…</span> : null)}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {notice && <Alert tone={status === "limit" ? "info" : "danger"}>{notice}</Alert>}

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <label htmlFor={inputId} className="sr-only">
          Your message to Study Buddy
        </label>
        <div className="flex items-end gap-2">
          <textarea
            id={inputId}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            maxLength={MAX_MESSAGE_CHARS}
            disabled={blocked}
            placeholder={blocked ? "Back tomorrow with more messages" : "Type your question"}
            className="min-h-11 w-full resize-none rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content placeholder:text-content-3 disabled:opacity-60"
          />
          <Button type="submit" disabled={busy || blocked || !draft.trim()} aria-label="Send message" className="shrink-0">
            <Send aria-hidden className="size-4" />
          </Button>
        </div>
        <p className="text-xs text-content-3">Study Buddy is an AI tutor and can make mistakes. Check important things.</p>
      </form>
    </PanelShell>
  );
}
