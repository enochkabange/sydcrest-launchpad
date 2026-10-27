"use client";

import { useCallback, useSyncExternalStore, type ReactNode } from "react";

/*
 * The learner's chosen roadmap view, remembered on this device. The server
 * (and the prerendered shell) always renders the default view; straight after
 * hydration the client switches to the stored choice. useSyncExternalStore
 * makes that switch without a hydration mismatch, the same way as
 * useDataSaver in src/components/pwa/data-saver.tsx.
 */

const STORAGE_KEY = "sydcrest:roadmap-view";
const CHANGE_EVENT = "sydcrest:roadmap-view";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function read(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked (private modes, some in app browsers); use the default.
    return null;
  }
}

function useStoredView(ids: readonly string[]): [string, (id: string) => void] {
  const stored = useSyncExternalStore(subscribe, read, () => null);
  const active = stored && ids.includes(stored) ? stored : ids[0];
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

/** Map / List buttons. Pressing one switches every ActiveRoadmapView on the page. */
export function RoadmapViewSwitcher({ views }: { views: readonly { id: string; label: string }[] }) {
  const [active, choose] = useStoredView(views.map((v) => v.id));
  return (
    <div role="group" aria-label="Roadmap view" className="flex gap-2">
      {views.map((v) => {
        const on = v.id === active;
        return (
          <button
            key={v.id}
            type="button"
            aria-pressed={on}
            onClick={() => choose(v.id)}
            className={`inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-semibold transition-colors duration-150 ${
              on ? "border-content bg-content text-content-inv" : "border-line-strong text-content-2 hover:bg-surface-sunken hover:text-content"
            }`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Mounts only the active view, so its request time islands are the only ones
 * on the page. Every view arrives already rendered on the server as `content`.
 */
export function ActiveRoadmapView({ views }: { views: readonly { id: string; content: ReactNode }[] }) {
  const [active] = useStoredView(views.map((v) => v.id));
  const view = views.find((v) => v.id === active) ?? views[0];
  return <div data-roadmap-view={view.id}>{view.content}</div>;
}
