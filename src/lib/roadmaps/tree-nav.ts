/**
 * Keyboard rules for the roadmap tree (WAI-ARIA tree view pattern), issue
 * #244. Pure: the client wrapper (src/components/roadmaps/views/tree-keys.tsx)
 * lists the visible tree items in DOM order and applies the result.
 *
 * Down and Up move between visible items; Home and End go to the first and
 * last; Right opens a closed item or moves into an open one; Left closes an
 * open item or moves to its parent; a printable character moves to the next
 * item whose label starts with it.
 */

export type TreeNavItem = {
  level: number;
  /** null: not expandable. */
  expanded: boolean | null;
  label: string;
};

export type TreeNavResult = { focus: number } | { toggle: number; expand: boolean } | null;

export function treeKeyTarget(items: readonly TreeNavItem[], current: number, key: string): TreeNavResult {
  if (!items.length) return null;
  const at = Math.min(Math.max(current, 0), items.length - 1);
  const item = items[at];

  switch (key) {
    case "ArrowDown":
      return at < items.length - 1 ? { focus: at + 1 } : null;
    case "ArrowUp":
      return at > 0 ? { focus: at - 1 } : null;
    case "Home":
      return { focus: 0 };
    case "End":
      return { focus: items.length - 1 };
    case "ArrowRight":
      if (item.expanded === false) return { toggle: at, expand: true };
      if (item.expanded === true && items[at + 1]?.level > item.level) return { focus: at + 1 };
      return null;
    case "ArrowLeft": {
      if (item.expanded === true) return { toggle: at, expand: false };
      for (let i = at - 1; i >= 0; i--) if (items[i].level < item.level) return { focus: i };
      return null;
    }
  }

  if (key.length === 1 && /\S/.test(key)) {
    const ch = key.toLowerCase();
    for (let step = 1; step <= items.length; step++) {
      const i = (at + step) % items.length;
      if (items[i].label.trim().toLowerCase().startsWith(ch)) return { focus: i };
    }
  }
  return null;
}
