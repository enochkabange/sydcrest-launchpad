/**
 * Sampling decided once per tab session, so one visit is either fully in a
 * sample or fully out of it (never half its page loads). Storage and the
 * random source are injected for tests; without storage it decides per call.
 */
export type SessionStore = Pick<Storage, "getItem" | "setItem">;

/** Core Web Vitals: a quarter of sessions. */
export const VITALS_SAMPLE_RATE = 0.25;
/** Browser errors: half of sessions, deduped and capped per page. Raise or lower with traffic. */
export const ERROR_SAMPLE_RATE = 0.5;

export function inSample(key: string, rate: number, store: SessionStore | null, random: () => number = Math.random): boolean {
  if (rate >= 1) return true;
  if (rate <= 0) return false;
  const storageKey = `sc_sample_${key}`;
  try {
    const saved = store?.getItem(storageKey);
    if (saved === "1" || saved === "0") return saved === "1";
    const chosen = random() < rate;
    store?.setItem(storageKey, chosen ? "1" : "0");
    return chosen;
  } catch {
    return random() < rate;
  }
}

/**
 * Remembers which errors were reported on this page so a loop reports once,
 * and stops after `cap` distinct errors.
 */
export class Deduper {
  private readonly seen = new Set<string>();
  constructor(private readonly cap = 10) {}

  /** True the first time a key is seen, while under the cap. */
  first(key: string): boolean {
    if (this.seen.has(key) || this.seen.size >= this.cap) return false;
    this.seen.add(key);
    return true;
  }
}
