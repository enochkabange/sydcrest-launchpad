// Link: the drop in replacement for next/link (skips prefetch when the learner is saving data).
import * as React from "react";
import { Link, buttonClasses } from "sydcrest-launchpad";

/** Inline text link inside body copy */
export const InlineInBodyCopy = () => (
  <p className="text-body text-content-2 max-w-reading">
    New here? Start with the{" "}
    <Link href="/roadmaps/data-analyst" className="font-semibold text-content-link underline underline-offset-4">
      Data analyst roadmap
    </Link>{" "}
    and pass one topic this week.
  </p>
);

/** Link styled as a button with buttonClasses */
export const AsAButton = () => (
  <div className="flex flex-wrap gap-3">
    <Link href="/roadmaps" className={buttonClasses("primary")}>Find your path</Link>
    <Link href="/experts" className={buttonClasses("secondary")}>Meet the experts</Link>
  </div>
);
