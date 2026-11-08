// SkipLink: hidden until focused. The Focused story focuses it on mount to show the visible state.
import * as React from "react";
import { SkipLink } from "sydcrest-launchpad";

function FocusFirstLink({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    ref.current?.querySelector<HTMLAnchorElement>('a[href="#main"]')?.focus();
  }, []);
  return <div ref={ref} className="relative h-24">{children}</div>;
}

/** Focused (first Tab on the page) */
export const Focused = () => (
  <FocusFirstLink>
    <SkipLink />
  </FocusFirstLink>
);
