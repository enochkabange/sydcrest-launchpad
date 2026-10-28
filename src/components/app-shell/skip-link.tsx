/**
 * The first tab stop on every layout with navigation before the content:
 * jumps past the header to `<main id="main">` (WCAG 2.4.1).
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-content focus:shadow-md"
    >
      Skip to content
    </a>
  );
}
