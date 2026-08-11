/**
 * Page — the container inside AppShell's <main>.
 *
 * Holds the one-per-screen h1, an optional eyebrow for context (which week,
 * which cohort), and a slot for page-level actions. Having this in one place
 * is what stops every screen inventing its own header spacing.
 *
 * `width="reading"` narrows the column for lesson and article screens;
 * everything else gets the full container.
 */

const widths = {
  default: "max-w-5xl",
  reading: "max-w-3xl",
  wide: "max-w-7xl",
};

export default function Page({
  title,
  titleHidden = false,
  eyebrow,
  description,
  actions,
  width = "default",
  className = "",
  children,
  ...props
}) {
  /* `titleHidden` keeps the h1 in the accessibility tree while another element
     shows the name visually — a lesson's sticky progress bar, for instance.
     A screen with no h1 leaves the heading outline headless. */
  if (titleHidden) {
    return (
      <div className={`mx-auto w-full ${widths[width] ?? widths.default} px-4 py-6 sm:px-6 sm:py-8 ${className}`} {...props}>
        <h1 className="sr-only">{title}</h1>
        {children}
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full ${widths[width] ?? widths.default} px-4 py-6 sm:px-6 sm:py-8 ${className}`} {...props}>
      {(title || actions) && (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            {eyebrow && (
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-content-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="text-2xl font-extrabold tracking-tight text-content text-balance sm:text-3xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-2 max-w-2xl text-content-2 text-pretty">{description}</p>
            )}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/** Groups a run of cards or rows under a subheading within a page. */
export function PageSection({ title, action, className = "", children, ...props }) {
  return (
    <section className={`mb-8 ${className}`} {...props}>
      {(title || action) && (
        <div className="mb-3 flex items-baseline justify-between gap-3">
          {title && <h2 className="text-lg font-bold text-content">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
