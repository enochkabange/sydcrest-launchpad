"use client";

import { useCallback, useSyncExternalStore, type ReactNode } from "react";

/*
 * The learner's chosen roadmap view, remembered on this device. Until they
 * choose, the "auto" state shows the wide view from md and the narrow view
 * below it with CSS alone, so the server, the first client render and the
 * final page all agree and nothing shifts (the map on a laptop, the journey
 * on a phone). A stored choice replaces that straight after hydration;
 * useSyncExternalStore makes the switch without a hydration mismatch, the
 * same way as useDataSaver in src/components/pwa/data-saver.tsx.
 */

const STORAGE_KEY = "sydcrest:roadmap-view";
const CHANGE_EVENT = "sydcrest:roadmap-view";
const WIDE = "(min-width: 48rem)";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
    query.removeEventListener("change", onChange);
  };
}

function read(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked (private modes, some in app browsers); use auto.
    return null;
  }
}

type SwitcherView = { id: string; label: string; auto?: "wide" | "narrow" };

/** The stored view id, or null for auto. */
function useStoredView(ids: readonly string[]): [string | null, (id: string) => void] {
  const stored = useSyncExternalStore(subscribe, read, () => null);
  const active = stored && ids.includes(stored) ? stored : null;
  const choose = useCallback((id: string) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Not remembered, but still switch for this visit.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);
  return [active, choose];
}

/** Which view auto shows at the current width; null on the server. */
function useAutoView(views: readonly SwitcherView[]): string | null {
  const wide = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(WIDE).matches,
    () => null,
  );
  if (wide === null) return null;
  return views.find((v) => v.auto === (wide ? "wide" : "narrow"))?.id ?? views[0].id;
}

/** Map / List / Journey buttons. Pressing one switches every ActiveRoadmapView on the page. */
export function RoadmapViewSwitcher({ views }: { views: readonly SwitcherView[] }) {
  const [stored, choose] = useStoredView(views.map((v) => v.id));
  const auto = useAutoView(views);
  const on = "border-content bg-content text-content-inv";
  const off = "border-line-strong text-content-2 hover:bg-surface-sunken hover:text-content";
  return (
    <div role="group" aria-label="Roadmap view" className="flex gap-2">
      {views.map((v) => {
        const pressed = stored ? v.id === stored : auto === v.id;
        // Before hydration (auto), the pressed look follows the width in CSS, like the views.
        const look = stored
          ? pressed
            ? on
            : off
          : v.auto === "wide"
            ? `${off} md:border-content md:bg-content md:text-content-inv`
            : v.auto === "narrow"
              ? `${on} md:border-line-strong md:bg-transparent md:text-content-2`
              : off;
        return (
          <button
            key={v.id}
            type="button"
            aria-pressed={pressed}
            onClick={() => choose(v.id)}
            className={`inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-semibold transition-colors duration-150 ${look}`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Mounts the chosen view, or in auto both width views with CSS deciding, so
 * only their request time islands run. Every view arrives already rendered
 * on the server as `content`.
 */
export function ActiveRoadmapView({ views }: { views: readonly (SwitcherView & { content: ReactNode })[] }) {
  const [stored] = useStoredView(views.map((v) => v.id));
  const chosen = stored ? views.find((v) => v.id === stored) : null;
  if (chosen) return <div data-roadmap-view={chosen.id}>{chosen.content}</div>;
  const wide = views.find((v) => v.auto === "wide") ?? views[0];
  const narrow = views.find((v) => v.auto === "narrow");
  return (
    <>
      <div data-roadmap-view={wide.id} className={narrow ? "max-md:hidden" : ""}>
        {wide.content}
      </div>
      {narrow && (
        <div data-roadmap-view={narrow.id} className="md:hidden">
          {narrow.content}
        </div>
      )}
    </>
  );
}
