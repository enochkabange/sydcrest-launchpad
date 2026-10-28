"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV, matchesPath } from "@/lib/nav/config";

/** Always visible, never behind a hamburger: one scrollable row on phones, inline on desktop. */
export function MarketingNavLinks() {
  return <NavList pathname={usePathname()} />;
}

/**
 * The same links with nothing marked active. The header renders this as the
 * Suspense fallback so routes with dynamic params (roadmap pages) can
 * prerender an App Shell before the pathname is known.
 */
export function MarketingNavLinksFallback() {
  return <NavList pathname={null} />;
}

/** Width of the fade that hints more links sit past the edge of the row. */
const FADE = "1.5rem";

function NavList({ pathname }: { pathname: string | null }) {
  const { ref, more } = useScrollHint<HTMLUListElement>();
  const mask =
    more.start || more.end
      ? `linear-gradient(to right, ${more.start ? `transparent, black ${FADE}` : "black"}, ${
          more.end ? `black calc(100% - ${FADE}), transparent` : "black"
        })`
      : undefined;
  return (
    <ul
      ref={ref}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      className="-mx-4 flex gap-1 overflow-x-auto overscroll-x-contain px-4 md:-mx-8 md:px-8 lg:mx-0 lg:px-0"
    >
      {PUBLIC_NAV.map(({ href, label }) => {
        const active = pathname !== null && matchesPath(pathname, href);
        return (
          <li key={href} className="shrink-0">
            {/* Nine links on every visitor page: prefetching them all would spend a visitor's
                prepaid data on pages they may never open, so these fetch on tap. */}
            <Link
              href={href}
              prefetch={false}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-md px-3 text-sm font-semibold no-underline ${
                active ? "bg-info-bg text-info-fg" : "text-content-2 hover:bg-surface-sunken hover:text-content"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Which ends of a horizontal scroll box have more content past them. Off until
 * mounted, so the server render and a row that fits show no fade.
 */
function useScrollHint<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [more, setMore] = useState({ start: false, end: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const start = el.scrollLeft > 1;
      const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      setMore((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  return { ref, more };
}
