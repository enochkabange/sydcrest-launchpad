import type { ComponentProps, ReactNode } from "react";

/**
 * Layout primitives (issue #154, docs/design-system.md §8). Every screen
 * composes these so it has a real desktop layout at lg (1024) and xl (1280),
 * while phones keep one column in the same reading order. Server safe: no
 * hooks, no client code. Keep the API small; Phase 2 and 3 screens build on it.
 */

const WIDTHS = {
  page: "max-w-page",
  wide: "max-w-wide",
  reading: "max-w-reading",
} as const;

export type ContainerWidth = keyof typeof WIDTHS;

/**
 * Centres content with the standard gutters. `page` (1280px) is the default
 * for every screen; `wide` (1440px) for bands holding a big grid or map;
 * `reading` (about 70ch) ONLY for long text. `data-container` is what the
 * e2e width checks look for.
 */
export function Container({
  width = "page",
  as: Tag = "div",
  className = "",
  children,
  ...props
}: {
  width?: ContainerWidth;
  as?: "div" | "section" | "article" | "header" | "main" | "footer";
  className?: string;
  children?: ReactNode;
} & Omit<ComponentProps<"div">, "className" | "children">) {
  return (
    <Tag data-container={width} className={`mx-auto w-full px-4 md:px-8 ${WIDTHS[width]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

/**
 * Text beside a visual from lg. Phones and tablets stack them, text first.
 * The text column is wider (7:5) so a headline sets in two or three lines.
 */
export function SplitHero({
  children,
  visual,
  className = "",
}: {
  children: ReactNode;
  visual: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16 ${className}`}>
      <div className="flex min-w-0 flex-col gap-6">{children}</div>
      <div className="min-w-0">{visual}</div>
    </div>
  );
}

const GRID_COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * A fixed column grid for a known number of peers (three stages, four
 * facts). One column on phones. Use AutoGrid when the count varies.
 */
export function SectionGrid({
  cols,
  as: Tag = "div",
  className = "",
  children,
}: {
  cols: keyof typeof GRID_COLS;
  as?: "div" | "ul" | "ol" | "dl";
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`grid gap-4 xl:gap-6 ${GRID_COLS[cols]} ${className}`}>{children}</Tag>;
}

const AUTO_MIN = {
  sm: "grid-cols-[repeat(auto-fill,minmax(min(100%,14rem),1fr))]",
  md: "grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))]",
  lg: "grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))]",
} as const;

/**
 * Cards that fill the width: as many columns as fit at the minimum card
 * width, one column on phones. For lists of unknown length (roadmaps).
 */
export function AutoGrid({
  min = "md",
  as: Tag = "div",
  className = "",
  children,
}: {
  min?: keyof typeof AUTO_MIN;
  as?: "div" | "ul" | "ol";
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`grid gap-4 xl:gap-6 ${AUTO_MIN[min]} ${className}`}>{children}</Tag>;
}

/**
 * A main column with a right rail (320px at lg, 360px at xl). Below lg they
 * stack in DOM order. `railFirst` puts the rail above the main column on
 * phones (a filter that belongs above its list); from lg the rail is always
 * on the right. `sticky` keeps the rail in view while the main column scrolls.
 * `spaced={false}` drops the built in gaps (8 between blocks, 6 in the rail)
 * when the children already carry their own margins and the phone spacing
 * must not change. `railFrom="lg"` shows the rail only from lg, for rails that
 * summarise what phones already reach from the tab bar.
 */
export function MainWithRail({
  children,
  rail,
  railLabel,
  railFirst = false,
  sticky = false,
  spaced = true,
  railFrom = "always",
  className = "",
}: {
  children: ReactNode;
  rail: ReactNode;
  railLabel: string;
  railFirst?: boolean;
  sticky?: boolean;
  spaced?: boolean;
  railFrom?: "always" | "lg";
  className?: string;
}) {
  const main = (
    <div key="main" className={`flex min-w-0 flex-col lg:col-start-1 lg:row-start-1 ${spaced ? "gap-8" : ""}`}>
      {children}
    </div>
  );
  const aside = (
    <aside
      key="rail"
      aria-label={railLabel}
      className={`${railFrom === "lg" ? "hidden lg:flex" : "flex"} min-w-0 flex-col lg:col-start-2 lg:row-start-1 ${spaced ? "gap-6" : ""} ${sticky ? "lg:sticky lg:top-8" : ""}`}
    >
      {rail}
    </aside>
  );
  return (
    <div
      className={`flex flex-col lg:grid ${spaced ? "gap-8" : ""} lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22.5rem] xl:gap-12 ${className}`}
    >
      {railFirst ? [aside, main] : [main, aside]}
    </div>
  );
}

const CELL_DISPLAY = {
  show: "block md:table-cell",
  hide: "hidden md:table-cell",
  only: "block md:hidden",
} as const;

export type Column<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  /** Numbers align to the end so they compare down the column. */
  align?: "start" | "end";
  /** `hide`: not on phones, where the row is a compact line. `only`: phones only (a combined cell). */
  phone?: "show" | "hide" | "only";
  /** Extra classes for this column's cells (width, emphasis). */
  className?: string;
};

/**
 * Tabular content as a real table from md, and as one compact line per row
 * on phones (columns marked `phone: "hide"` drop out, and so does the header
 * row, as in a plain list). One element tree for both, so long lists are not
 * rendered twice. Make a row clickable by giving one cell a link with
 * `rowLinkClass`: its hit area stretches over the whole row.
 */
export function DataTable<T>({
  caption,
  columns,
  rows,
  rowKey,
  rowClassName,
}: {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  rowClassName?: (row: T) => string | undefined;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="block w-full text-left md:table">
        <caption className="sr-only">{caption}</caption>
        <thead className="hidden bg-surface-sunken text-sm text-content-2 md:table-header-group">
          <tr>
            {columns.map((c) => (
              <th
                key={c.header}
                scope="col"
                className={`px-4 py-3 font-semibold whitespace-nowrap ${c.align === "end" ? "text-right" : ""} ${c.phone === "only" ? "md:hidden" : ""}`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block divide-y divide-line md:table-row-group">
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className={`relative flex min-h-14 items-center gap-3 px-4 py-2 transition-colors hover:bg-surface-sunken md:table-row md:p-0 ${rowClassName?.(row) ?? ""}`}
            >
              {columns.map((c) => (
                <td
                  key={c.header}
                  className={`md:px-4 md:py-3 md:align-middle ${CELL_DISPLAY[c.phone ?? "show"]} ${
                    c.align === "end" ? "text-right" : ""
                  } ${c.className ?? ""}`}
                >
                  {c.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** For the one link in a DataTable row: stretches its hit area over the row. */
export const rowLinkClass = "after:absolute after:inset-0 after:content-['']";
