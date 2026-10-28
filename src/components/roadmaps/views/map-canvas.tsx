"use client";

import { Maximize, Minus, Plus, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { REVEAL_EVENT } from "./roadmap-ui";

/*
 * Pan and zoom for the map on wide screens (issue #244), with no library:
 * the server rendered map sits in a viewport and moves with one CSS
 * transform, so its links, islands and tree keys are untouched.
 *
 * - Drag with a mouse or pen to pan (touch keeps native scrolling); a drag
 *   never also opens the topic under the pointer.
 * - The wheel pans; with Ctrl or Cmd it zooms around the pointer.
 * - Keys inside the map: + and - zoom, 0 resets to 100%.
 * - Buttons: zoom in, zoom out, fit to screen, reset.
 * - A minimap shows every section and the visible area; select it to jump.
 * - Moving focus (tree keys, search) pans the focused item into view.
 * - Animated moves use transform only and stop under reduced motion.
 *
 * Below md the map is the plain transit line, so none of this applies.
 */

const MIN = 0.3;
const MAX = 2;
const STEP = 1.2;
const WIDE = "(min-width: 48rem)";

type Transform = { x: number; y: number; scale: number };

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useWide() {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => false,
  );
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

type MiniRect = { top: number; height: number; left: number; width: number; section: boolean };

export function MapCanvas({ children }: { children: ReactNode }) {
  const wide = useWide();
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [t, setT] = useState<Transform>({ x: 0, y: 0, scale: 1 });
  const [animate, setAnimate] = useState(false);
  const [mini, setMini] = useState<{ w: number; h: number; sections: MiniRect[] }>({ w: 1, h: 1, sections: [] });
  const [view, setView] = useState({ w: 1, h: 1 });
  const drag = useRef<{ id: number; x: number; y: number; moved: boolean; start: Transform } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const tRef = useRef(t);
  useLayoutEffect(() => {
    tRef.current = t;
  });

  /** Keeps at least a margin of the map on screen. */
  const bound = useCallback((next: Transform): Transform => {
    const v = viewport.current;
    const c = content.current;
    if (!v || !c) return next;
    const margin = 120;
    const w = c.offsetWidth * next.scale;
    const h = c.offsetHeight * next.scale;
    return {
      scale: next.scale,
      x: clamp(next.x, Math.min(0, v.clientWidth - w) - margin, Math.max(0, v.clientWidth - w) + margin),
      y: clamp(next.y, Math.min(0, v.clientHeight - h) - margin, margin),
    };
  }, []);

  const apply = useCallback(
    (next: Transform, animated = false) => {
      const b = bound(next);
      tRef.current = b;
      setAnimate(animated);
      setT(b);
    },
    [bound],
  );

  const zoomAt = useCallback(
    (factor: number, cx?: number, cy?: number, animated = true) => {
      const v = viewport.current;
      if (!v) return;
      const cur = tRef.current;
      const scale = clamp(cur.scale * factor, MIN, MAX);
      const px = cx ?? v.clientWidth / 2;
      const py = cy ?? v.clientHeight / 2;
      const k = scale / cur.scale;
      apply({ scale, x: px - (px - cur.x) * k, y: py - (py - cur.y) * k }, animated);
    },
    [apply],
  );

  const fit = useCallback(() => {
    const v = viewport.current;
    const c = content.current;
    if (!v || !c) return;
    const scale = clamp(Math.min(v.clientWidth / c.offsetWidth, v.clientHeight / c.offsetHeight), MIN, 1);
    apply({ scale, x: (v.clientWidth - c.offsetWidth * scale) / 2, y: (v.clientHeight - c.offsetHeight * scale) / 2 }, true);
  }, [apply]);

  const reset = useCallback(() => apply({ x: 0, y: 0, scale: 1 }, true), [apply]);

  /** Pans so `el` is inside the viewport (centred when it was out of view). */
  const bringIntoView = useCallback(
    (el: Element, animated: boolean) => {
      const v = viewport.current;
      if (!v || !v.contains(el)) return;
      const vr = v.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const pad = 24;
      if (r.left >= vr.left + pad && r.right <= vr.right - pad && r.top >= vr.top + pad && r.bottom <= vr.bottom - pad) return;
      const cur = tRef.current;
      apply(
        {
          scale: cur.scale,
          x: cur.x + (vr.left + vr.width / 2 - (r.left + r.width / 2)),
          y: cur.y + (vr.top + vr.height / 2 - (r.top + r.height / 2)),
        },
        animated,
      );
    },
    [apply],
  );

  // Measure the map for the minimap; again when it changes size (collapse, fonts, islands).
  useLayoutEffect(() => {
    const v = viewport.current;
    const c = content.current;
    if (!wide || !v || !c) return;
    const measure = () => {
      const scale = tRef.current.scale;
      const cr = c.getBoundingClientRect();
      const sections = [...c.querySelectorAll<HTMLElement>("[data-minimap]")]
        .filter((el) => el.getClientRects().length > 0)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            top: (r.top - cr.top) / scale,
            height: r.height / scale,
            left: (r.left - cr.left) / scale,
            width: r.width / scale,
            section: el.dataset.minimap === "section",
          };
        });
      setMini({ w: c.offsetWidth, h: c.offsetHeight, sections });
      setView({ w: v.clientWidth, h: v.clientHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(c);
    observer.observe(v);
    return () => observer.disconnect();
  }, [wide]);

  // Ctrl or Cmd with the wheel zooms; the wheel alone pans until the map's edge, then the page scrolls.
  useEffect(() => {
    const v = viewport.current;
    if (!wide || !v) return;
    const onWheel = (event: WheelEvent) => {
      const rect = v.getBoundingClientRect();
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        zoomAt(Math.exp(-event.deltaY * 0.0025), event.clientX - rect.left, event.clientY - rect.top, false);
        return;
      }
      const cur = tRef.current;
      const next = bound({ ...cur, x: cur.x - event.deltaX, y: cur.y - event.deltaY });
      if (next.x === cur.x && next.y === cur.y) return;
      event.preventDefault();
      tRef.current = next;
      setAnimate(false);
      setT(next);
    };
    v.addEventListener("wheel", onWheel, { passive: false });
    return () => v.removeEventListener("wheel", onWheel);
  }, [wide, zoomAt, bound]);

  // Search and the continue bar reveal a node: pan to it once its section is open.
  useEffect(() => {
    if (!wide) return;
    const onReveal = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      requestAnimationFrame(() => {
        const el = id ? content.current?.querySelector(`[data-node-id="${CSS.escape(id)}"]`) : null;
        if (el) bringIntoView(el, true);
      });
    };
    window.addEventListener(REVEAL_EVENT, onReveal);
    return () => window.removeEventListener(REVEAL_EVENT, onReveal);
  }, [wide, bringIntoView]);

  if (!wide) return <div data-map-canvas="off">{children}</div>;

  const button =
    "inline-flex size-11 items-center justify-center rounded-md border border-line-strong bg-surface text-content hover:bg-surface-sunken";
  const miniScale = Math.min(160 / mini.w, 220 / mini.h);

  return (
    <div className="relative" data-map-canvas="on">
      <div
        ref={viewport}
        role="region"
        aria-label="Roadmap map, pan and zoom"
        aria-describedby="map-canvas-help"
        className="relative h-[min(78dvh,56rem)] touch-pan-y overflow-hidden rounded-lg border border-line bg-roadmap-canvas select-none"
        onKeyDown={(event) => {
          if (event.ctrlKey || event.metaKey || event.altKey) return;
          if (event.key === "+" || event.key === "=") zoomAt(STEP);
          else if (event.key === "-" || event.key === "_") zoomAt(1 / STEP);
          else if (event.key === "0") reset();
          else return;
          event.preventDefault();
        }}
        onFocus={(event) => bringIntoView(event.target, false)}
        onPointerDown={(event) => {
          if (event.pointerType === "touch" || event.button !== 0) return;
          drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, start: tRef.current };
        }}
        onPointerMove={(event) => {
          const d = drag.current;
          if (!d || d.id !== event.pointerId) return;
          const dx = event.clientX - d.x;
          const dy = event.clientY - d.y;
          if (!d.moved && Math.hypot(dx, dy) < 5) return;
          if (!d.moved) {
            d.moved = true;
            setDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          setAnimate(false);
          setT(bound({ ...d.start, x: d.start.x + dx, y: d.start.y + dy }));
        }}
        onPointerUp={(event) => {
          const d = drag.current;
          drag.current = null;
          setDragging(false);
          if (d?.moved) {
            suppressClick.current = true;
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
        }}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          suppressClick.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div
          ref={content}
          className={`w-full origin-top-left px-6 py-6 will-change-transform ${animate ? "transition-transform duration-medium ease-standard motion-reduce:transition-none" : ""} ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})` }}
        >
          {children}
        </div>
      </div>
      <p id="map-canvas-help" className="sr-only">
        Drag or use the wheel to move around. Press plus or minus to zoom, and 0 to reset.
      </p>

      <div className="absolute top-3 right-3 flex flex-col gap-2" role="group" aria-label="Map controls">
        <button type="button" className={button} onClick={() => zoomAt(STEP)} aria-label="Zoom in" disabled={t.scale >= MAX}>
          <Plus aria-hidden className="size-4" />
        </button>
        <button type="button" className={button} onClick={() => zoomAt(1 / STEP)} aria-label="Zoom out" disabled={t.scale <= MIN}>
          <Minus aria-hidden className="size-4" />
        </button>
        <button type="button" className={button} onClick={fit} aria-label="Fit to screen">
          <Maximize aria-hidden className="size-4" />
        </button>
        <button type="button" className={button} onClick={reset} aria-label="Reset zoom">
          <RotateCcw aria-hidden className="size-4" />
        </button>
        <span className="rounded-md bg-surface px-1 py-0.5 text-center text-xs text-content-2 tabular-nums" aria-live="polite">
          <span className="sr-only">Zoom </span>
          {Math.round(t.scale * 100)}%
        </span>
      </div>

      {/* The minimap: a pointer shortcut. Keyboard users have the tree keys and search. */}
      <div
        aria-hidden="true"
        data-testid="roadmap-minimap"
        className="absolute right-3 bottom-3 hidden cursor-pointer overflow-hidden rounded-md border border-line bg-surface/90 p-1.5 shadow-sm lg:block"
        style={{ width: mini.w * miniScale + 12, height: mini.h * miniScale + 12 }}
        onPointerDown={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const mx = (event.clientX - rect.left - 6) / miniScale;
          const my = (event.clientY - rect.top - 6) / miniScale;
          const cur = tRef.current;
          apply({ scale: cur.scale, x: view.w / 2 - mx * cur.scale, y: view.h / 2 - my * cur.scale }, true);
        }}
      >
        <div className="relative" style={{ width: mini.w * miniScale, height: mini.h * miniScale }}>
          {mini.sections.map((s, i) => (
            <span
              key={i}
              className={`absolute rounded-xs bg-roadmap-minimap ${s.section ? "" : "opacity-50"}`}
              style={{ top: s.top * miniScale, left: s.left * miniScale, width: Math.max(2, s.width * miniScale), height: Math.max(2, s.height * miniScale) }}
            />
          ))}
          <span
            className="absolute rounded-xs border-2 border-roadmap-minimap-view"
            style={{
              left: (-t.x / t.scale) * miniScale,
              top: (-t.y / t.scale) * miniScale,
              width: (view.w / t.scale) * miniScale,
              height: (view.h / t.scale) * miniScale,
            }}
          />
        </div>
      </div>
    </div>
  );
}
