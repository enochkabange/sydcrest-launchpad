"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import { nodePath } from "@/lib/roadmaps/seo";
import { searchTopics, type SearchItem } from "@/lib/roadmaps/search";
import { revealNode, useRoadmapUi } from "./roadmap-ui";

/**
 * Above every view: search and jump to a topic, the hide optional topics
 * switch, and open or close every section. All client side; the topics come
 * from the prerendered view, so search needs no network.
 */
export function RoadmapToolbar({ slug, items, hasOptional, collapsible }: { slug: string; items: SearchItem[]; hasOptional: boolean; collapsible: boolean }) {
  const { hideOptional, setHideOptional, anyCollapsed, setAllCollapsed } = useRoadmapUi();
  const button =
    "inline-flex min-h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-semibold text-content-2 hover:bg-surface-sunken hover:text-content";
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <TopicSearch slug={slug} items={items} />
      <div className="flex flex-wrap items-center gap-2">
        {hasOptional && (
          <button type="button" role="switch" aria-checked={hideOptional} onClick={() => setHideOptional(!hideOptional)} className={button}>
            <span
              aria-hidden
              className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-fast ${hideOptional ? "bg-roadmap-fill" : "bg-roadmap-track"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-surface shadow-sm transition-transform duration-fast motion-reduce:transition-none ${hideOptional ? "translate-x-4" : ""}`}
              />
            </span>
            Hide optional topics
          </button>
        )}
        {collapsible && (
          <button type="button" onClick={() => setAllCollapsed(!anyCollapsed)} className={button}>
            {anyCollapsed ? "Open all sections" : "Close all sections"}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The ARIA combobox pattern: type to filter, Up and Down to move, Enter to
 * open the topic (in the topic panel), Escape to clear. Matching is pure
 * (src/lib/roadmaps/search.ts).
 */
function TopicSearch({ slug, items }: { slug: string; items: SearchItem[] }) {
  const router = useRouter();
  const id = useId();
  const listId = `${id}-results`;
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchTopics(items, query), [items, query]);
  const showList = open && query.trim().length > 0;

  const go = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    revealNode(item.id);
    router.push(nodePath(slug, item.slug));
  };

  return (
    <div className="relative w-full md:max-w-sm">
      <label htmlFor={`${id}-input`} className="sr-only">
        Search this roadmap
      </label>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-content-3" />
      <input
        ref={input}
        id={`${id}-input`}
        type="search"
        role="combobox"
        autoComplete="off"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && results[active] ? `${id}-option-${active}` : undefined}
        placeholder="Search this roadmap"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && results.length) {
            event.preventDefault();
            setOpen(true);
            setActive((a) => (a + 1) % results.length);
          } else if (event.key === "ArrowUp" && results.length) {
            event.preventDefault();
            setActive((a) => (a - 1 + results.length) % results.length);
          } else if (event.key === "Enter" && showList && results[active]) {
            event.preventDefault();
            go(results[active]);
          } else if (event.key === "Escape") {
            if (query) event.preventDefault();
            setQuery("");
            setOpen(false);
          }
        }}
        className="min-h-11 w-full rounded-md border border-line-strong bg-surface py-2 pr-3 pl-9 text-content placeholder:text-content-3"
      />
      <ul
        id={listId}
        role="listbox"
        aria-label="Matching topics"
        hidden={!showList || results.length === 0}
        className="absolute inset-x-0 top-full z-30 mt-1 max-h-80 overflow-y-auto rounded-md border border-line bg-surface-raised py-1 shadow-lg"
      >
        {results.map((item, i) => (
          <li
            key={item.id}
            id={`${id}-option-${i}`}
            role="option"
            aria-selected={i === active}
            // Keep focus in the input so the combobox keys keep working.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => go(item)}
            onMouseMove={() => setActive(i)}
            className={`flex min-h-11 cursor-pointer flex-col justify-center px-3 py-1.5 ${i === active ? "bg-surface-sunken" : ""}`}
          >
            <span className="text-content">
              <span className="mr-2 text-sm text-content-3 tabular-nums">{item.number}</span>
              {item.title}
            </span>
            <span className="text-xs text-content-3">{item.sectionTitle}</span>
          </li>
        ))}
      </ul>
      {showList && results.length === 0 && (
        <p className="absolute inset-x-0 top-full z-30 mt-1 rounded-md border border-line bg-surface-raised px-3 py-2 text-sm text-content-2 shadow-lg">
          No topics match. Try another word.
        </p>
      )}
      <p className="sr-only" aria-live="polite">
        {showList ? (results.length === 1 ? "1 topic found" : `${results.length} topics found`) : ""}
      </p>
    </div>
  );
}
