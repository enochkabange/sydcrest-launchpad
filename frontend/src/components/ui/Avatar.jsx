/**
 * Avatar — initials fallback when there is no photo, which will be the common
 * case for a first cohort. Background is picked deterministically from the
 * name so the same learner always gets the same colour; all five options take
 * white text at ≥4.8:1.
 */
import { pickAvatarColor } from "../../lib/colorHash.js";

const sizes = {
  xs: "size-6  text-xs",
  sm: "size-8  text-sm",
  md: "size-10 text-base",
  lg: "size-14 text-lg",
  xl: "size-20 text-2xl",
};

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export default function Avatar({ name = "", src, size = "md", className = "", ...props }) {
  const dim = sizes[size] ?? sizes.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name ? `${name}'s profile photo` : ""}
        className={`${dim} rounded-full object-cover bg-line ${className}`}
        {...props}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name ? `${name}'s avatar` : "Avatar"}
      className={[
        dim, pickAvatarColor(name),
        "rounded-full inline-flex items-center justify-center",
        "font-bold text-white leading-none",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {initials(name)}
    </span>
  );
}
