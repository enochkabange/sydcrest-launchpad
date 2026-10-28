import { describe, expect, it } from "vitest";
import { DISPLAY_SCRIPT } from "./script";
import { DEFAULT_PREFS, rootAttributes, STORAGE_KEY, type DisplayPrefs } from "./prefs";

/** Runs the inline script against a fake <html>, storage and two theme-color metas. */
function run(stored: string | null, start: Record<string, string> = {}) {
  const attrs: Record<string, string> = { ...start };
  const metas = ["(prefers-color-scheme: light)", "(prefers-color-scheme: dark)"].map((media) => {
    const meta = { media, content: "", setAttribute: (_: string, v: string) => (meta.content = v) };
    return meta;
  });
  const documentElement = {
    setAttribute: (n: string, v: string) => (attrs[n] = v),
    removeAttribute: (n: string) => delete attrs[n],
  };
  const document = { documentElement, querySelectorAll: () => metas };
  const localStorage = { getItem: (k: string) => (k === STORAGE_KEY ? stored : null) };
  const window: Record<string, unknown> = {};
  new Function("document", "localStorage", "window", DISPLAY_SCRIPT)(document, localStorage, window);
  return { attrs, metas: metas.map((m) => m.content), window };
}

function expected(p: DisplayPrefs) {
  return Object.fromEntries(Object.entries(rootAttributes(p)).filter(([, v]) => v !== null));
}

describe("display inline script", () => {
  it("does nothing visible with no saved prefs", () => {
    const { attrs, metas, window } = run(null);
    expect(attrs).toEqual({});
    expect(metas).toEqual(["#ffffff", "#14171c"]);
    expect(typeof window.__sydDisplay).toBe("function");
  });

  it("survives broken storage", () => {
    expect(run("{not json").attrs).toEqual({});
    expect(run('"text"').attrs).toEqual({});
  });

  it("matches rootAttributes for every choice", () => {
    const cases: DisplayPrefs[] = [
      { ...DEFAULT_PREFS, theme: "dark", textSize: 150, motion: "reduce", contrast: "more", underlineLinks: true, spacing: "wide", font: "system" },
      { ...DEFAULT_PREFS, theme: "light", textSize: 112 },
      { ...DEFAULT_PREFS, textSize: 125 },
      DEFAULT_PREFS,
    ];
    for (const p of cases) expect(run(JSON.stringify(p)).attrs).toEqual(expected(p));
  });

  it("clears attributes a previous choice left behind", () => {
    const { attrs } = run(JSON.stringify(DEFAULT_PREFS), { "data-theme": "dark", "data-text-size": "150", "data-contrast": "more" });
    expect(attrs).toEqual({});
  });

  it("ignores values it does not know", () => {
    expect(run(JSON.stringify({ theme: "purple", textSize: 300, underlineLinks: "yes" })).attrs).toEqual({});
  });

  it("points both status bar colours at an explicit theme", () => {
    expect(run(JSON.stringify({ theme: "dark" })).metas).toEqual(["#14171c", "#14171c"]);
    expect(run(JSON.stringify({ theme: "light" })).metas).toEqual(["#ffffff", "#ffffff"]);
  });
});
