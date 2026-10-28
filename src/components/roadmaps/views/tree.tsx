"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import Link from "@/components/ui/link";
import { treeKeyTarget } from "@/lib/roadmaps/tree-nav";
import { useRoadmapUi } from "./roadmap-ui";

/*
 * The WAI-ARIA tree view pattern for the roadmap map and list (issue #244).
 *
 * Markup, rendered on the server by each view:
 *   <RoadmapTree label>                       role="tree"
 *     <li role="none">
 *       <SectionTreeItem>                     <a role="treeitem" aria-expanded aria-owns>
 *       <TreeGroup>                           <ol role="group" id> hidden when collapsed
 *         <li role="none"><a role="treeitem" aria-level="2" tabIndex={-1}>
 *
 * Every item is a real link (Enter follows it, so the topic panel opens).
 * Roving tabindex: one item is in the tab order at a time; the arrow keys,
 * Home, End and type ahead move between visible items (treeKeyTarget).
 * Collapsing hides the group, so its items drop out of the order for free,
 * as do optional topics hidden by the switch.
 */

const ITEM = '[role="treeitem"]';
/** Keys the map canvas uses for zoom; never type ahead. */
const RESERVED = new Set(["+", "-", "=", "0", "_"]);

function visibleItems(tree: HTMLElement): HTMLElement[] {
  return [...tree.querySelectorAll<HTMLElement>(ITEM)].filter((el) => el.getClientRects().length > 0);
}

function makeActive(tree: HTMLElement, item: HTMLElement) {
  for (const el of tree.querySelectorAll<HTMLElement>(ITEM)) el.tabIndex = el === item ? 0 : -1;
}

export function RoadmapTree({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const { setCollapsed } = useRoadmapUi();

  // Keep exactly one item tabbable, even after the active one is hidden.
  const ensureTabbable = useCallback(() => {
    const tree = ref.current;
    if (!tree) return;
    const items = visibleItems(tree);
    if (!items.length || items.some((el) => el.tabIndex === 0)) return;
    makeActive(tree, items[0]);
  }, []);

  useEffect(() => {
    const tree = ref.current;
    if (!tree) return;
    ensureTabbable();
    const observer = new MutationObserver(ensureTabbable);
    observer.observe(tree, { attributes: true, subtree: true, attributeFilter: ["hidden", "data-hide-optional"] });
    const root = tree.closest("[data-hide-optional], .group\\/roadmap");
    if (root) observer.observe(root, { attributes: true, attributeFilter: ["data-hide-optional"] });
    return () => observer.disconnect();
  }, [ensureTabbable]);

  const onKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    const tree = ref.current;
    const target = (event.target as HTMLElement).closest<HTMLElement>(ITEM);
    if (!tree || !target || event.altKey || event.ctrlKey || event.metaKey) return;
    if (RESERVED.has(event.key)) return;
    const items = visibleItems(tree);
    const at = items.indexOf(target);
    const result = treeKeyTarget(
      items.map((el) => ({
        level: Number(el.getAttribute("aria-level") ?? 1),
        expanded: el.hasAttribute("aria-expanded") ? el.getAttribute("aria-expanded") === "true" : null,
        label: el.dataset.label ?? el.textContent ?? "",
      })),
      at,
      event.key,
    );
    if (!result) return;
    event.preventDefault();
    if ("focus" in result) {
      const next = items[result.focus];
      makeActive(tree, next);
      next.focus();
    } else {
      const section = items[result.toggle].dataset.sectionId;
      if (section) setCollapsed(section, !result.expand);
    }
  };

  return (
    <ol
      ref={ref}
      role="tree"
      aria-label={label}
      className={className}
      onKeyDown={onKeyDown}
      onFocus={(event) => {
        const item = (event.target as HTMLElement).closest<HTMLElement>(ITEM);
        if (item && ref.current) makeActive(ref.current, item);
      }}
    >
      {children}
    </ol>
  );
}

/** A section: a link that is also the tree item owning its group of topics. */
export function SectionTreeItem({
  id,
  href,
  groupId,
  label,
  first = false,
  className,
  children,
}: {
  id: string;
  href: string;
  /** Id of the section's group; omit when the section has no topics. */
  groupId?: string;
  label: string;
  first?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { isCollapsed } = useRoadmapUi();
  const expandable = !!groupId;
  return (
    <Link
      href={href}
      role="treeitem"
      aria-level={1}
      aria-expanded={expandable ? !isCollapsed(id) : undefined}
      aria-owns={groupId}
      data-section-id={id}
      data-label={label}
      tabIndex={first ? 0 : -1}
      className={className}
    >
      {children}
    </Link>
  );
}

/**
 * The open and close control beside a section, for pointers. Keyboard and
 * screen reader users use the arrow keys on the item itself, so it is hidden
 * from assistive technology and out of the tab order.
 */
export function SectionToggle({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  const { isCollapsed, setCollapsed } = useRoadmapUi();
  const collapsed = isCollapsed(id);
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      title={collapsed ? `Show the topics in ${title}` : `Hide the topics in ${title}`}
      onClick={() => setCollapsed(id, !collapsed)}
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md text-content-2 hover:bg-surface-sunken hover:text-content ${className}`}
    >
      <ChevronDown
        aria-hidden
        className={`size-5 transition-transform duration-fast motion-reduce:transition-none ${collapsed ? "-rotate-90" : ""}`}
      />
    </button>
  );
}

/** A section's topics. Hidden while the section is collapsed. */
export function TreeGroup({
  sectionId,
  id,
  label,
  className,
  children,
}: {
  sectionId: string;
  id: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const { isCollapsed } = useRoadmapUi();
  return (
    <ol role="group" id={id} aria-label={label} hidden={isCollapsed(sectionId)} className={className}>
      {children}
    </ol>
  );
}
