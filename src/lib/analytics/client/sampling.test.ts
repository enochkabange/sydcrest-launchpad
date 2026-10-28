import { describe, expect, it } from "vitest";
import { Deduper, VITALS_SAMPLE_RATE, inSample } from "./sampling";

function memory() {
  const data = new Map<string, string>();
  return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, v) };
}

describe("inSample", () => {
  it("decides once per session and remembers", () => {
    const store = memory();
    expect(inSample("vitals", 0.25, store, () => 0.1)).toBe(true);
    // Later calls keep the first decision whatever the dice say.
    expect(inSample("vitals", 0.25, store, () => 0.9)).toBe(true);
    const other = memory();
    expect(inSample("vitals", 0.25, other, () => 0.9)).toBe(false);
    expect(inSample("vitals", 0.25, other, () => 0.1)).toBe(false);
  });

  it("samples about a quarter of sessions for vitals", () => {
    let seed = 1;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const chosen = Array.from({ length: 4000 }, () => inSample("vitals", VITALS_SAMPLE_RATE, memory(), random)).filter(Boolean).length;
    expect(chosen / 4000).toBeGreaterThan(0.22);
    expect(chosen / 4000).toBeLessThan(0.28);
  });

  it("handles the edges and missing storage", () => {
    expect(inSample("x", 1, null, () => 0.99)).toBe(true);
    expect(inSample("x", 0, null, () => 0)).toBe(false);
    expect(inSample("x", 0.5, null, () => 0.4)).toBe(true);
    const broken = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {},
    };
    expect(inSample("x", 0.5, broken, () => 0.6)).toBe(false);
  });
});

describe("Deduper", () => {
  it("reports each error once, up to a cap", () => {
    const d = new Deduper(2);
    expect(d.first("a")).toBe(true);
    expect(d.first("a")).toBe(false);
    expect(d.first("b")).toBe(true);
    expect(d.first("c")).toBe(false);
  });
});
