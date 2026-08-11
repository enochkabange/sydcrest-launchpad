/**
 * Loader — the signature motion of the system.
 *
 * Rather than a generic spinner, the logo's own four bars rise along the axis
 * they already point down, staggered. It is the one place stagger is used;
 * scattering the effect elsewhere would spend the idea and cheapen it.
 *
 * Motion is pure `transform` + `opacity`, so it composites on the GPU and
 * stays smooth on a low-end phone. `prefers-reduced-motion` is handled
 * globally in tokens.css — the bars simply hold still, and the accessible
 * label still announces the loading state.
 */

const bars = [
  { d: "M162 239 775 0 843 174 229 413Z",      fill: "url(#ld-cool)",    delay: "0ms" },
  { d: "M589 589 1055 122 1186 255 721 720Z",  fill: "url(#ld-warm)",    delay: "110ms" },
  { d: "M0 763 496 330 619 470 123 903Z",      fill: "url(#ld-warmRev)", delay: "220ms" },
  { d: "M385 900 980 620 1061 788 465 1069Z",  fill: "url(#ld-coolRev)", delay: "330ms" },
];

export function LaunchLoader({ size = 48, label = "Loading", className = "", ...props }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-3 ${className}`}
      {...props}
    >
      <svg
        viewBox="-80 -60 1346 1189"
        width={size}
        height={(size * 1189) / 1346}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ld-cool" gradientUnits="userSpaceOnUse" x1="195.5" y1="326" x2="809" y2="87">
            <stop offset="0" stopColor="#3872BD" /><stop offset="1" stopColor="#11100F" />
          </linearGradient>
          <linearGradient id="ld-coolRev" gradientUnits="userSpaceOnUse" x1="425" y1="984.5" x2="1020.5" y2="704">
            <stop offset="0" stopColor="#11100F" /><stop offset="1" stopColor="#3872BD" />
          </linearGradient>
          <linearGradient id="ld-warm" gradientUnits="userSpaceOnUse" x1="655" y1="654.5" x2="1120.5" y2="188.5">
            <stop offset="0" stopColor="#F1EF1E" /><stop offset="1" stopColor="#F79020" />
          </linearGradient>
          <linearGradient id="ld-warmRev" gradientUnits="userSpaceOnUse" x1="61.5" y1="833" x2="557.5" y2="400">
            <stop offset="0" stopColor="#F79020" /><stop offset="1" stopColor="#F1EF1E" />
          </linearGradient>
        </defs>
        {bars.map((b) => (
          <path
            key={b.d}
            d={b.d}
            fill={b.fill}
            className="syd-launch-bar"
            style={{ animationDelay: b.delay }}
          />
        ))}
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** Inline spinner for buttons and tight spaces, where the mark would be illegible. */
export function Spinner({ size = 16, label = "Loading", className = "", ...props }) {
  return (
    <span role="status" aria-live="polite" className={`inline-flex ${className}`} {...props}>
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className="rounded-full border-2 border-current border-r-transparent animate-spin"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** Full-page loading state — route transitions, first paint after auth. */
export function PageLoader({ message = "Loading…" }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <LaunchLoader size={64} label={message} />
      <p className="text-sm text-content-2">{message}</p>
    </div>
  );
}

export default LaunchLoader;
