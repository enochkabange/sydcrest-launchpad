/** Small pieces shared by public profiles, leaderboards and achievement pages. */

export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "")).toUpperCase() || "?";
}

const SIZES = { sm: "size-10 text-sm", lg: "size-16 text-xl" } as const;

/** A letter avatar. We do not invent photos. */
export function Initials({ name, size = "sm" }: { name: string; size?: keyof typeof SIZES }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-surface-sunken font-semibold text-content-2 ring-1 ring-line ${SIZES[size]}`}
    >
      {initialsOf(name)}
    </span>
  );
}

export function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line p-4">
      <dt className="text-sm text-content-3">{label}</dt>
      <dd className="text-2xl font-semibold text-content">{value}</dd>
    </div>
  );
}
