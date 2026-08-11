/**
 * Tabs — for the learner dashboard (Lessons / Projects / Sessions).
 *
 * Implements the ARIA tabs pattern: one tab in the page tab order at a time,
 * arrow keys move between them, Home/End jump to the ends. The active
 * indicator animates on transform so it slides rather than repaints.
 */
import { useId, useRef } from "react";
import Icon from "./Icon.jsx";

export default function Tabs({ tabs = [], value, onChange, className = "" }) {
  const base = useId();
  const refs = useRef([]);

  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === value);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    onChange?.(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      onKeyDown={onKeyDown}
      className={`flex gap-1 border-b border-line overflow-x-auto ${className}`}
    >
      {tabs.map((t, i) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            id={`${base}-tab-${t.id}`}
            aria-selected={active}
            aria-controls={`${base}-panel-${t.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange?.(t.id)}
            className={[
              "relative flex items-center gap-2 whitespace-nowrap px-4 py-2.5",
              "text-sm font-semibold transition-colors duration-150",
              active
                ? "text-blue-700"
                : "text-content-2 hover:text-content",
            ].join(" ")}
          >
            {t.icon && <Icon name={t.icon} size="sm" />}
            {t.label}
            {t.count !== undefined && (
              <span className="rounded-full bg-surface-sunken px-1.5 text-xs font-bold text-content-2 tabular-nums">
                {t.count}
              </span>
            )}
            <span
              aria-hidden="true"
              className={[
                "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-blue-500",
                "transition-transform duration-150 ease-out",
                active ? "scale-x-100" : "scale-x-0",
              ].join(" ")}
            />
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ id, value, baseId, className = "", children }) {
  if (id !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
      tabIndex={0}
      className={`animate-fade-in pt-4 ${className}`}
    >
      {children}
    </div>
  );
}
