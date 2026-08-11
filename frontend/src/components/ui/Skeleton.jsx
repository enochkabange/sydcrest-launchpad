/**
 * Skeleton — placeholder while content loads.
 *
 * Opacity pulse, not a sweeping shimmer. A shimmer needs a full-width layer
 * moving under every block on the screen; on a list of twenty lesson cards
 * that is real work per frame on a cheap phone. Opacity alone reads the same
 * and costs almost nothing.
 */

export default function Skeleton({ className = "", rounded = "md", ...props }) {
  const radius = { sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", full: "rounded-full" }[rounded];
  return (
    <span
      aria-hidden="true"
      className={`block bg-line animate-skeleton ${radius} ${className}`}
      {...props}
    />
  );
}

/** Text placeholder. The last line is short, the way real paragraphs end. */
export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <span className={`flex flex-col gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={`h-3.5 ${i === lines - 1 ? "w-3/5" : "w-full"}`} />
      ))}
    </span>
  );
}

/**
 * Card placeholder shaped like the real lesson card, so the layout doesn't
 * jump when content arrives. Wrap a loading region in role="status" and give
 * it an accessible label — a screen reader gets "Loading lessons", not silence.
 */
export function SkeletonCard({ className = "" }) {
  return (
    <div className={`rounded-lg border border-line p-5 ${className}`}>
      <div className="flex items-center gap-3">
        <Skeleton className="size-10" rounded="full" />
        <span className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/4" />
        </span>
      </div>
      <SkeletonText lines={2} className="mt-4" />
    </div>
  );
}
