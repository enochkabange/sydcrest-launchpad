"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_PREFS, parseStoredPrefs, STORAGE_KEY, type DisplayPrefs } from "./prefs";

/**
 * The device copy of the display prefs, for client components. localStorage
 * is the source of truth; the inline script (script.ts) applies it before the
 * first paint and these helpers re-apply it through that same function after
 * a change. Other tabs follow through the storage event.
 */

const EVENT = "sydcrest:display";
const DARK_QUERY = "(prefers-color-scheme: dark)";

declare global {
  interface Window {
    __sydDisplay?: () => void;
  }
}

let cachedRaw: string | null | undefined;
let cachedPrefs: DisplayPrefs = DEFAULT_PREFS;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Current device prefs. Stable identity until the stored text changes, as useSyncExternalStore needs. */
export function readDisplayPrefs(): DisplayPrefs {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedPrefs = parseStoredPrefs(raw);
  }
  return cachedPrefs;
}

/** Puts the stored prefs on <html> again (after a change, or after React resets the element in development). */
export function applyDisplayPrefs() {
  window.__sydDisplay?.();
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      applyDisplayPrefs();
      onChange();
    }
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useDisplayPrefs(): DisplayPrefs {
  return useSyncExternalStore(subscribe, readDisplayPrefs, () => DEFAULT_PREFS);
}

/** Signed in users register a saver here (DisplayPrefsSync) so a change also reaches their profile. */
let profileSaver: ((p: DisplayPrefs) => void) | null = null;
export function setProfileSaver(saver: ((p: DisplayPrefs) => void) | null) {
  profileSaver = saver;
}

/** Writes prefs to the device, applies them, and tells every subscriber. */
export function writeDisplayPrefs(prefs: DisplayPrefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Private mode or storage full: the change still applies for this page.
  }
  applyDisplayPrefs();
  window.dispatchEvent(new Event(EVENT));
}

/** A change made by the person: stamped, saved on the device and, when signed in, on the profile. */
export function updateDisplayPrefs(change: Partial<Omit<DisplayPrefs, "updatedAt">>) {
  const next = { ...readDisplayPrefs(), ...change, updatedAt: Date.now() };
  writeDisplayPrefs(next);
  profileSaver?.(next);
}

function subscribeDark(onChange: () => void) {
  const m = window.matchMedia(DARK_QUERY);
  m.addEventListener("change", onChange);
  const off = subscribe(onChange);
  return () => {
    m.removeEventListener("change", onChange);
    off();
  };
}

function isDarkNow(): boolean {
  const t = readDisplayPrefs().theme;
  return t === "dark" || (t === "system" && window.matchMedia(DARK_QUERY).matches);
}

/** Whether the page is dark right now, whichever way that was decided. Null while rendering on the server. */
export function useIsDark(): boolean | null {
  return useSyncExternalStore(subscribeDark, isDarkNow, () => null);
}
