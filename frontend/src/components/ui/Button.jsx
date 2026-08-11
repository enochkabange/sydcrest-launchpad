/**
 * Button — the one interactive control everything else borrows from.
 *
 * Accent note: `accent` fills with brand orange and uses INK text, not white.
 * White on orange-500 is 2.34:1 and fails AA; ink on orange-500 is 7.13:1.
 * Never invert that pairing.
 */
import Icon from "./Icon.jsx";
import { Spinner } from "./Loader.jsx";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "transition-colors duration-150 select-none " +
  "disabled:opacity-45 disabled:pointer-events-none";

const variants = {
  primary:   "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
  secondary: "bg-surface text-content border border-line-strong hover:bg-surface-sunken active:bg-surface-sunken",
  ghost:     "bg-transparent text-blue-700 hover:bg-blue-50 active:bg-blue-100",
  accent:    "bg-orange-500 text-content hover:bg-orange-600 active:bg-orange-700",
  danger:    "bg-danger-700 text-white hover:bg-danger-500 active:bg-danger-700",
  /* Inverse must actually invert: ink-on-white in light, white-on-ink in dark.
     A hardcoded dark fill would vanish into a dark page. */
  inverse:   "bg-content text-surface hover:opacity-90 active:opacity-80",
};

/* Heights hold a 44px minimum on md and up — thumb targets on low-end
   Android, which is the majority device for this cohort. */
const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-base",
  lg: "h-13 px-6 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={[
        base,
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        fullWidth ? "w-full" : "",
        className,
      ].filter(Boolean).join(" ")}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner size={16} label="" />}
      {icon && !loading && <Icon name={icon} size={size === "lg" ? "lg" : "sm"} />}
      {children}
    </button>
  );
}
