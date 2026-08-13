/**
 * Button — the one interactive control everything else borrows from.
 *
 * Accent note: `accent` fills with the brand gradient and uses INK text, not
 * white. White on orange-500 is 2.34:1 and fails AA; ink on orange-500 is
 * 7.13:1. Never invert that pairing — the gradient's lightest stop (yellow)
 * is even further from AA with white text.
 *
 * primary/accent carry a shadow + a 1px lift on hover, dropping back to
 * baseline on press — the only two variants pushed enough to read as the
 * "confirm this" action. Only `transform` and `box-shadow` move, both
 * compositor-only, so this stays cheap on low-end Android per the motion
 * rule in tokens.css.
 */
import Icon from "./Icon.jsx";
import { Spinner } from "./Loader.jsx";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "transition-[background-color,box-shadow,transform] duration-150 select-none " +
  "disabled:opacity-45 disabled:pointer-events-none disabled:shadow-none disabled:translate-y-0";

const variants = {
  primary:
    "bg-blue-500 text-white shadow-sm hover:bg-blue-600 hover:shadow-md hover:-translate-y-px " +
    "active:bg-blue-700 active:shadow-xs active:translate-y-0",
  secondary: "bg-surface text-content border border-line-strong hover:bg-surface-sunken active:bg-surface-sunken",
  ghost:     "bg-transparent text-blue-700 hover:bg-blue-50 active:bg-blue-100",
  accent:
    "text-content shadow-sm hover:shadow-md hover:-translate-y-px active:shadow-xs active:translate-y-0 " +
    "bg-[linear-gradient(135deg,var(--color-orange-400)_0%,var(--color-orange-600)_100%)] " +
    "hover:bg-[linear-gradient(135deg,var(--color-orange-500)_0%,var(--color-orange-700)_100%)]",
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
