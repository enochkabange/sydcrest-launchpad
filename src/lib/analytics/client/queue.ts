/**
 * The browser side queue for the analytics beacon. Events wait here and go in
 * batches: when 10 are waiting, every 5 seconds, and when the page is hidden
 * or closed (navigator.sendBeacon survives the page going away). Sending
 * never throws and never blocks the page. The transport and timer are
 * injected so the batching is unit tested.
 */
import { batchBodies, type WireEvent } from "../beacon";

export type Transport = (body: string) => void;

export type QueueOptions = {
  transport: Transport;
  sessionId: () => string | null;
  /** Flush when this many are waiting. */
  maxWaiting?: number;
  /** Flush this long after the first event waits. */
  delayMs?: number;
  setTimer?: (fn: () => void, ms: number) => unknown;
  clearTimer?: (handle: unknown) => void;
};

export class BeaconQueue {
  private waiting: WireEvent[] = [];
  private timer: unknown = null;
  private readonly maxWaiting: number;
  private readonly delayMs: number;
  private readonly setTimer: (fn: () => void, ms: number) => unknown;
  private readonly clearTimer: (handle: unknown) => void;

  constructor(private readonly options: QueueOptions) {
    this.maxWaiting = options.maxWaiting ?? 10;
    this.delayMs = options.delayMs ?? 5000;
    this.setTimer = options.setTimer ?? ((fn, ms) => setTimeout(fn, ms));
    this.clearTimer = options.clearTimer ?? ((handle) => clearTimeout(handle as ReturnType<typeof setTimeout>));
  }

  get size() {
    return this.waiting.length;
  }

  push(event: WireEvent) {
    // A runaway loop must not grow memory without bound.
    if (this.waiting.length >= 200) return;
    this.waiting.push(event);
    if (this.waiting.length >= this.maxWaiting) this.flush();
    else if (this.timer === null) this.timer = this.setTimer(() => this.flush(), this.delayMs);
  }

  flush() {
    if (this.timer !== null) {
      this.clearTimer(this.timer);
      this.timer = null;
    }
    if (!this.waiting.length) return;
    const events = this.waiting;
    this.waiting = [];
    for (const body of batchBodies(this.options.sessionId(), events)) {
      try {
        this.options.transport(body);
      } catch {
        // Analytics never breaks the page.
      }
    }
  }
}

/** sendBeacon where it exists, else a keepalive fetch. Same origin, text/plain (no preflight). */
export function beaconTransport(path: string): Transport {
  return (body) => {
    const sent = typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function" && navigator.sendBeacon(path, body);
    if (!sent) {
      fetch(path, { method: "POST", body, keepalive: true, credentials: "same-origin", headers: { "Content-Type": "text/plain" } }).catch(
        () => {},
      );
    }
  };
}
