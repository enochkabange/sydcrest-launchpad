import { describe, expect, it } from "vitest";
import { BeaconQueue } from "./queue";

function setup(options: { maxWaiting?: number; delayMs?: number } = {}) {
  const sent: string[] = [];
  const timers: { fn: () => void; ms: number; cleared: boolean }[] = [];
  const queue = new BeaconQueue({
    transport: (body) => sent.push(body),
    sessionId: () => "5b2b1f0a-1111-4222-8333-944455556666",
    setTimer: (fn, ms) => {
      const t = { fn, ms, cleared: false };
      timers.push(t);
      return t;
    },
    clearTimer: (t) => {
      (t as { cleared: boolean }).cleared = true;
    },
    ...options,
  });
  const events = () => sent.flatMap((b) => JSON.parse(b).events.map((e: { n: string }) => e.n));
  return { queue, sent, timers, events };
}

describe("BeaconQueue", () => {
  it("waits, then sends one batch when the timer fires", () => {
    const { queue, sent, timers, events } = setup();
    queue.push({ n: "page_view" });
    queue.push({ n: "web_vital" });
    expect(sent).toHaveLength(0);
    expect(timers).toHaveLength(1);
    expect(timers[0].ms).toBe(5000);
    timers[0].fn();
    expect(sent).toHaveLength(1);
    expect(events()).toEqual(["page_view", "web_vital"]);
    expect(queue.size).toBe(0);
  });

  it("sends at once when enough are waiting, and cancels the timer", () => {
    const { queue, sent, timers } = setup({ maxWaiting: 3 });
    queue.push({ n: "page_view" });
    queue.push({ n: "page_view" });
    queue.push({ n: "page_view" });
    expect(sent).toHaveLength(1);
    expect(timers[0].cleared).toBe(true);
  });

  it("flushes on demand (page hidden) and does nothing when empty", () => {
    const { queue, sent } = setup();
    queue.flush();
    expect(sent).toHaveLength(0);
    queue.push({ n: "form_started", p: { form: "sign_up" } });
    queue.flush();
    expect(sent).toHaveLength(1);
    expect(JSON.parse(sent[0]).sid).toBe("5b2b1f0a-1111-4222-8333-944455556666");
  });

  it("never throws when the transport fails, and caps what waits", () => {
    const queue = new BeaconQueue({
      transport: () => {
        throw new Error("offline");
      },
      sessionId: () => null,
      maxWaiting: 1000,
      setTimer: () => 1,
      clearTimer: () => {},
    });
    for (let i = 0; i < 500; i++) queue.push({ n: "page_view" });
    expect(queue.size).toBe(200);
    expect(() => queue.flush()).not.toThrow();
  });
});
