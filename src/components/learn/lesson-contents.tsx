"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { tocIds, type TocEntry } from "./lesson-toc";

/**
 * The lesson's table of contents (issue #255). `rail` is the sticky list
 * beside the lesson from lg; `inline` is the collapsible "On this page" at the
 * top of the lesson below lg. Both highlight the section being read (an
 * IntersectionObserver over the section and heading ids) and show reading
 * progress through the lesson. Server rendered with nothing highlighted, so
 * the first paint matches and nothing shifts when the script arrives.
 */
export function LessonContents({ toc, bodyId, variant }: { toc: TocEntry[]; bodyId: string; variant: "rail" | "inline" }) {
  const active = useActiveId(toc);
  const progress = useReadingProgress(bodyId);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const activeLabel = findLabel(toc, active);

  const list = (
    <TocList
      entries={toc}
      active={active}
      onNavigate={(e) => {
        if (variant === "inline" && detailsRef.current) detailsRef.current.open = false;
        focusTarget(e);
      }}
    />
  );

  if (variant === "rail") {
    return (
      <nav aria-label="On this page" className="flex flex-col gap-3 rounded-lg border border-line p-4" data-testid="lesson-toc">
        <p className="text-sm font-semibold text-content-3">On this page</p>
        <ProgressLine value={progress} />
        <div className="-mx-2 max-h-[calc(100dvh-20rem)] overflow-y-auto">{list}</div>
      </nav>
    );
  }

  return (
    <details ref={detailsRef} className="group rounded-lg border border-line" data-testid="lesson-toc-inline">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-4 py-2 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-semibold text-content">On this page</span>
          <span className="truncate text-sm text-content-3" aria-hidden="true">
            {activeLabel ?? `${toc.length} parts`}
          </span>
        </span>
        <ChevronDown aria-hidden className="size-5 shrink-0 text-content-3 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4">
        <ProgressLine value={progress} />
      </div>
      <nav aria-label="On this page" className="px-2 pt-2 pb-3">
        {list}
      </nav>
    </details>
  );
}

function TocList({
  entries,
  active,
  onNavigate,
  nested = false,
}: {
  entries: TocEntry[];
  active: string | null;
  onNavigate: (e: MouseEvent<HTMLAnchorElement>) => void;
  nested?: boolean;
}) {
  return (
    <ol className={`flex flex-col ${nested ? "border-l border-line ml-4" : ""}`}>
      {entries.map((e) => {
        const current = e.id === active;
        return (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              onClick={onNavigate}
              aria-current={current ? "location" : undefined}
              className={`flex min-h-11 items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-sunken ${
                nested ? "pl-3" : ""
              } ${current ? "bg-info-bg font-semibold text-info-fg" : nested ? "text-content-2" : "text-content"}`}
            >
              {e.label}
            </a>
            {e.children.length > 0 && <TocList entries={e.children} active={active} onNavigate={onNavigate} nested />}
          </li>
        );
      })}
    </ol>
  );
}

/** A thin bar for how far through the lesson the reader is. Visual only: the highlighted entry says where they are. */
function ProgressLine({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--progress-track)" }} aria-hidden="true">
      <div
        className="h-full origin-left rounded-full motion-safe:transition-transform"
        data-testid="reading-progress"
        data-value={Math.round(value * 100)}
        style={{ background: "var(--progress-active)", transform: `scaleX(${value})` }}
      />
    </div>
  );
}

/** Move focus to the section a link jumps to, so keyboard and screen reader users land there too. */
function focusTarget(e: MouseEvent<HTMLAnchorElement>) {
  const id = e.currentTarget.getAttribute("href")?.slice(1);
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  requestAnimationFrame(() => target.focus({ preventScroll: true }));
}

function findLabel(entries: TocEntry[], id: string | null): string | null {
  if (!id) return null;
  for (const e of entries) {
    if (e.id === id) return e.label;
    const inner = findLabel(e.children, id);
    if (inner) return inner;
  }
  return null;
}

/**
 * The entry being read: the last section or heading whose top has passed the
 * upper part of the viewport. The observer fires when a target crosses that
 * line, so this does no work on every scroll frame.
 */
function useActiveId(toc: TocEntry[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const ids = tocIds(toc);
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!targets.length || typeof IntersectionObserver === "undefined") return;
    const pick = () => {
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const el of targets) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current ?? targets[0].id);
    };
    const observer = new IntersectionObserver(pick, { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] });
    targets.forEach((el) => observer.observe(el));
    pick();
    return () => observer.disconnect();
  }, [toc]);
  return active;
}

/** 0 to 1: how much of the lesson body has scrolled past the bottom of the viewport. */
function useReadingProgress(bodyId: string): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const body = document.getElementById(bodyId);
    if (!body) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = body.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const value = total <= 0 ? (rect.bottom <= window.innerHeight ? 1 : 0) : Math.min(1, Math.max(0, -rect.top / total));
      setProgress(value);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [bodyId]);
  return progress;
}
