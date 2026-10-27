"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/*
 * Focus return across panels: stepping to the previous or next topic swaps
 * one panel for another (unmount, then mount). Only when no panel remains do
 * we unlock the page and hand focus back to what opened the first one.
 */
let openPanels = 0;
let openedFrom: string | null = null;

/** The visible link on the roadmap that opened `path`, to return focus to. */
function roadmapLinkTo(path: string): HTMLElement | null {
  const links = document.querySelectorAll<HTMLAnchorElement>(`main a[href="${CSS.escape(path)}"]`);
  return [...links].find((a) => !a.closest("dialog") && a.getClientRects().length > 0) ?? null;
}

/**
 * The topic panel shell over the roadmap: a modal <dialog>, so focus stays
 * inside it, the page behind is inert and Escape closes it. A side panel from
 * lg, a bottom sheet below. Closing goes back in history, which returns to
 * the roadmap URL (the slot's page renders nothing there).
 */
export function TopicPanel({ labelledBy, children }: { labelledBy: string; children: ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // The panel belongs over the roadmap. A client navigation from anywhere
    // else under /roadmaps/[slug] is intercepted too; show the full page then.
    if (!document.querySelector("[data-roadmap-view]")) {
      window.location.replace(window.location.href);
      return;
    }
    if (openPanels === 0) {
      // The first panel's URL is the topic the learner picked on the roadmap.
      openedFrom = window.location.pathname;
      document.documentElement.style.overflow = "hidden";
    }
    openPanels += 1;
    if (!dialog.open) dialog.showModal();

    return () => {
      openPanels -= 1;
      // Let a replacing panel mount first; then, if none did, clean up.
      setTimeout(() => {
        if (openPanels > 0) return;
        document.documentElement.style.overflow = "";
        const target = openedFrom ? roadmapLinkTo(openedFrom) : null;
        openedFrom = null;
        target?.focus();
      }, 0);
    };
  }, []);

  const close = () => router.back();

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        // Escape: leave the dialog open until the route change unmounts it.
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-x-0 top-auto bottom-0 m-0 mx-auto max-h-[88dvh] w-full max-w-2xl animate-panel-in overflow-y-auto overscroll-contain rounded-t-xl border-t border-line bg-surface-raised p-0 text-content shadow-lg backdrop:bg-roadmap-scrim lg:inset-y-0 lg:right-0 lg:left-auto lg:mx-0 lg:h-dvh lg:max-h-none lg:w-[28rem] lg:max-w-none lg:rounded-none lg:border-t-0 lg:border-l"
    >
      <div className="flex flex-col gap-6 px-5 pt-2 pb-8 lg:px-7 lg:pt-6">
        <div aria-hidden className="mx-auto h-1 w-10 rounded-full bg-line-strong lg:hidden" />
        <div className="-mb-4 flex justify-end">
          <button
            type="button"
            onClick={close}
            aria-label="Close topic"
            className="inline-flex size-11 items-center justify-center rounded-md border border-line-strong text-content hover:bg-surface-sunken"
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
