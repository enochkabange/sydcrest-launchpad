/**
 * Logo — mark, lockup and mono variants.
 *
 * Geometry is measured from the vector paths in the Beet Agency brand
 * guideline (four bars, gradients sampled at the bar centrelines), so this is
 * the real mark, not a trace.
 *
 * The wordmark is SET IN TYPE (Urbanist), not vectorised, because no Gilroy
 * web licence is held. It is very close but not metrically identical to the
 * agency artwork — for print and social, keep using the supplied files. See
 * docs/design-system.md §1 for the one-line fix (ask Beet for the .ai/.svg).
 */
import { useId } from "react";

/**
 * variant:
 *   "color"  — full gradients. Light surfaces ONLY. On a dark ground the two
 *              cool bars fade into the background and the mark loses half its
 *              geometry.
 *   "onDark" — the brand book's own treatment on Sea Blue and charcoal (see the
 *              app icons in the guideline): cool bars become solid white, warm
 *              bars keep their gradient.
 *   "mono"   — single colour, inherits `currentColor`.
 */
export function LogoMark({ size = 40, variant = "color", className = "", ...props }) {
  const mono = variant === "mono";
  const onDark = variant === "onDark";
  /* Unique per instance — a header lockup and a nav mark on the same page
     would otherwise emit duplicate gradient IDs. */
  const id = useId().replace(/:/g, "");
  const cool = mono ? undefined : onDark ? "#FFFFFF" : `url(#${id}-cool)`;
  const coolRev = mono ? undefined : onDark ? "#FFFFFF" : `url(#${id}-coolRev)`;
  const warm = mono ? undefined : `url(#${id}-warm)`;
  const warmRev = mono ? undefined : `url(#${id}-warmRev)`;

  return (
    <svg
      viewBox="0 0 1186 1069"
      width={size}
      height={(size * 1069) / 1186}
      role="img"
      aria-label="SydCrest Launchpad"
      className={className}
      fill={mono ? "currentColor" : undefined}
      {...props}
    >
      <title>SydCrest Launchpad</title>
      {!mono && (
        <defs>
          <linearGradient id={`${id}-cool`} gradientUnits="userSpaceOnUse" x1="195.5" y1="326" x2="809" y2="87">
            <stop offset="0" stopColor="#3872BD" /><stop offset="1" stopColor="#11100F" />
          </linearGradient>
          <linearGradient id={`${id}-coolRev`} gradientUnits="userSpaceOnUse" x1="425" y1="984.5" x2="1020.5" y2="704">
            <stop offset="0" stopColor="#11100F" /><stop offset="1" stopColor="#3872BD" />
          </linearGradient>
          <linearGradient id={`${id}-warm`} gradientUnits="userSpaceOnUse" x1="655" y1="654.5" x2="1120.5" y2="188.5">
            <stop offset="0" stopColor="#F1EF1E" /><stop offset="1" stopColor="#F79020" />
          </linearGradient>
          <linearGradient id={`${id}-warmRev`} gradientUnits="userSpaceOnUse" x1="61.5" y1="833" x2="557.5" y2="400">
            <stop offset="0" stopColor="#F79020" /><stop offset="1" stopColor="#F1EF1E" />
          </linearGradient>
        </defs>
      )}
      <path fill={cool}    d="M162 239 775 0 843 174 229 413Z" />
      <path fill={warm}    d="M589 589 1055 122 1186 255 721 720Z" />
      <path fill={warmRev} d="M0 763 496 330 619 470 123 903Z" />
      <path fill={coolRev} d="M385 900 980 620 1061 788 465 1069Z" />
    </svg>
  );
}

/**
 * Full lockup. `tone` controls the wordmark only:
 *   ink     — on white and light surfaces (16.69:1)
 *   inverse — on Sea Blue, charcoal or photography
 */
export default function Logo({ size = 40, tone = "ink", variant, className = "", ...props }) {
  const inverse = tone === "inverse";
  const text = inverse ? "text-white" : "text-content";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} {...props}>
      <LogoMark size={size} variant={variant ?? (inverse ? "onDark" : "color")} />
      <span
        className={`flex flex-col leading-[0.92] ${text}`}
        style={{ fontSize: size * 0.42 }}
      >
        <span className="font-bold tracking-[-0.01em]">SydCrest</span>
        <span className="font-light tracking-[-0.01em]">Launchpad</span>
      </span>
    </span>
  );
}
