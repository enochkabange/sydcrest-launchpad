"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

/*
 * Roadmap UI state shared by every view on a roadmap page (issue #244):
 * which sections are collapsed (per roadmap) and whether optional topics are
 * hidden (per device). Both are remembered in localStorage and read with
 * useSyncExternalStore, so the server and the first client render show
 * everything expanded and visible, and the stored choice applies straight
 * after hydration with no mismatch. Storage can be blocked or hold anything,
 * so every read is guarded and validated.
 */

const CHANGE_EVENT = "sydcrest:roadmap-ui";
/** Fired by search and the continue bar to expand a node's section and bring it into view. */
export const REVEAL_EVENT = "sydcrest:roadmap-reveal";
const HIDE_OPTIONAL_KEY = "sydcrest:roadmap-hide-optional";
const collapsedKey = (slug: string) => `sydcrest:roadmap-collapsed:${slug}`;

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Not remembered, but still applied for this visit through the event below.
    memory.set(key, value);
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Fallback when storage throws, so the controls still work for this visit. */
const memory = new Map<string, string | null>();
function read(key: string): string | null {
  return memory.has(key) ? memory.get(key)! : readRaw(key);
}

/** The stored collapsed list as a stable string ("" when none), validated to known ids. */
export function parseCollapsed(raw: string | null, known: ReadonlySet<string>): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((v): v is string => typeof v === "string" && known.has(v)))];
  } catch {
    return [];
  }
}

type RoadmapUiValue = {
  isCollapsed: (sectionId: string) => boolean;
  setCollapsed: (sectionId: string, collapsed: boolean) => void;
  setAllCollapsed: (collapsed: boolean) => void;
  anyCollapsed: boolean;
  hideOptional: boolean;
  setHideOptional: (hide: boolean) => void;
};

const RoadmapUiContext = createContext<RoadmapUiValue | null>(null);

export function useRoadmapUi(): RoadmapUiValue {
  const value = useContext(RoadmapUiContext);
  if (!value) throw new Error("useRoadmapUi must be used inside <RoadmapUi>");
  return value;
}

/**
 * Wraps the toolbar and every view. `sectionIds` are the roadmap's sections;
 * `sectionOf` maps any node id to its section, for revealing a node.
 */
export function RoadmapUi({
  slug,
  sectionIds,
  sectionOf,
  children,
}: {
  slug: string;
  sectionIds: readonly string[];
  sectionOf: Readonly<Record<string, string>>;
  children: ReactNode;
}) {
  const key = collapsedKey(slug);
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key) ?? "",
    () => "",
  );
  const hideRaw = useSyncExternalStore(
    subscribe,
    () => read(HIDE_OPTIONAL_KEY) ?? "",
    () => "",
  );
  const known = useMemo(() => new Set(sectionIds), [sectionIds]);
  const collapsed = useMemo(() => new Set(parseCollapsed(raw, known)), [raw, known]);

  const save = useCallback(
    (next: Set<string>) => write(key, next.size ? JSON.stringify([...next]) : null),
    [key],
  );
  const setCollapsed = useCallback(
    (id: string, value: boolean) => {
      const next = new Set(parseCollapsed(read(key), known));
      if (value) next.add(id);
      else next.delete(id);
      save(next);
    },
    [key, known, save],
  );
  const setAllCollapsed = useCallback((value: boolean) => save(new Set(value ? sectionIds : [])), [save, sectionIds]);
  const hideOptional = hideRaw === "1";
  const setHideOptional = useCallback((hide: boolean) => write(HIDE_OPTIONAL_KEY, hide ? "1" : null), []);

  // Search and the continue bar ask for a node: open its section first.
  useEffect(() => {
    const onReveal = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      const section = id ? sectionOf[id] : undefined;
      if (section && collapsed.has(section)) setCollapsed(section, false);
    };
    window.addEventListener(REVEAL_EVENT, onReveal);
    return () => window.removeEventListener(REVEAL_EVENT, onReveal);
  }, [collapsed, sectionOf, setCollapsed]);

  const value = useMemo<RoadmapUiValue>(
    () => ({
      isCollapsed: (id) => collapsed.has(id),
      setCollapsed,
      setAllCollapsed,
      anyCollapsed: collapsed.size > 0,
      hideOptional,
      setHideOptional,
    }),
    [collapsed, setCollapsed, setAllCollapsed, hideOptional, setHideOptional],
  );

  return (
    <RoadmapUiContext.Provider value={value}>
      <div data-hide-optional={hideOptional || undefined} className="group/roadmap">
        {children}
      </div>
    </RoadmapUiContext.Provider>
  );
}

/** Asks the page to open a node's section and bring the node into view. */
export function revealNode(id: string) {
  window.dispatchEvent(new CustomEvent(REVEAL_EVENT, { detail: { id } }));
}
