/**
 * Display and accessibility preferences (issue #204). Pure data and pure
 * functions, safe on the server, in the client and in tests.
 *
 * Saved per device in localStorage under STORAGE_KEY and, for signed in
 * users, on profiles.display_prefs (the database check mirrors parse below).
 * The inline script in script.ts reads the same key before the first paint
 * and turns it into data attributes on <html>; tokens.css does the rest.
 */

export const STORAGE_KEY = "sydcrest.display";

export const THEMES = ["system", "light", "dark"] as const;
export const TEXT_SIZES = [100, 112, 125, 150] as const;
export const MOTIONS = ["system", "reduce"] as const;
export const CONTRASTS = ["normal", "more"] as const;
export const SPACINGS = ["normal", "wide"] as const;
export const FONTS = ["brand", "system"] as const;

export type Theme = (typeof THEMES)[number];
export type TextSize = (typeof TEXT_SIZES)[number];

export type DisplayPrefs = {
  theme: Theme;
  textSize: TextSize;
  motion: (typeof MOTIONS)[number];
  contrast: (typeof CONTRASTS)[number];
  underlineLinks: boolean;
  spacing: (typeof SPACINGS)[number];
  font: (typeof FONTS)[number];
  /** When these were last changed (ms since epoch); 0 means never. The newer copy wins on sync. */
  updatedAt: number;
};

export const DEFAULT_PREFS: DisplayPrefs = {
  theme: "system",
  textSize: 100,
  motion: "system",
  contrast: "normal",
  underlineLinks: false,
  spacing: "normal",
  font: "brand",
  updatedAt: 0,
};

/** Theme colours for the browser's status bar, matching --color-surface. */
export const THEME_COLOR = { light: "#ffffff", dark: "#14171c" } as const;

function oneOf<T>(list: readonly T[], value: unknown, fallback: T): T {
  return list.includes(value as T) ? (value as T) : fallback;
}

/**
 * Anything (localStorage text already JSON parsed, a profile column, a
 * Server Action argument) into valid prefs. Unknown keys and bad values fall
 * back to the default, so a damaged copy can never break the page.
 */
export function parseDisplayPrefs(input: unknown): DisplayPrefs {
  const o = input && typeof input === "object" && !Array.isArray(input) ? (input as Record<string, unknown>) : {};
  const d = DEFAULT_PREFS;
  const at = typeof o.updatedAt === "number" && Number.isFinite(o.updatedAt) && o.updatedAt > 0 ? Math.floor(o.updatedAt) : 0;
  return {
    theme: oneOf(THEMES, o.theme, d.theme),
    textSize: oneOf(TEXT_SIZES, o.textSize, d.textSize),
    motion: oneOf(MOTIONS, o.motion, d.motion),
    contrast: oneOf(CONTRASTS, o.contrast, d.contrast),
    underlineLinks: typeof o.underlineLinks === "boolean" ? o.underlineLinks : d.underlineLinks,
    spacing: oneOf(SPACINGS, o.spacing, d.spacing),
    font: oneOf(FONTS, o.font, d.font),
    updatedAt: at,
  };
}

/** Reads the raw localStorage text; null, bad JSON and bad values all give the defaults. */
export function parseStoredPrefs(raw: string | null): DisplayPrefs {
  if (!raw) return DEFAULT_PREFS;
  try {
    return parseDisplayPrefs(JSON.parse(raw));
  } catch {
    return DEFAULT_PREFS;
  }
}

/**
 * The attributes these prefs put on <html> (null removes one). The inline
 * script does the same mapping in plain JavaScript; script.test.ts checks the
 * two agree for every value.
 */
export function rootAttributes(p: DisplayPrefs): Record<string, string | null> {
  return {
    "data-theme": p.theme === "system" ? null : p.theme,
    "data-text-size": p.textSize === 100 ? null : String(p.textSize),
    "data-motion": p.motion === "reduce" ? "reduce" : null,
    "data-contrast": p.contrast === "more" ? "more" : null,
    "data-underline-links": p.underlineLinks ? "on" : null,
    "data-spacing": p.spacing === "wide" ? "wide" : null,
    "data-font": p.font === "system" ? "system" : null,
  };
}

/**
 * Which copy to keep when the device and the profile disagree: the newer
 * one. A profile that was never set (updatedAt 0) never overrides a device.
 */
export function newerPrefs(local: DisplayPrefs, remote: DisplayPrefs | null): "local" | "remote" | "same" {
  if (!remote || remote.updatedAt === 0) return local.updatedAt === 0 ? "same" : "local";
  if (remote.updatedAt > local.updatedAt) return "remote";
  if (remote.updatedAt < local.updatedAt) return "local";
  return "same";
}
