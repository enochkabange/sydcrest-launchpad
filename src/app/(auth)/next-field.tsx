"use client";

import { Suspense, type ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import Link from "@/components/ui/link";

function NextInput() {
  const next = useSearchParams().get("next");
  return next ? <input type="hidden" name="next" value={next} /> : null;
}

/**
 * Carries `?next=` from the page URL into an auth form, so people return to
 * where they started (for example the path quiz result). The server action
 * still runs it through safeNextPath. Inside Suspense so the page shell
 * stays prerendered.
 */
export function NextField() {
  return (
    <Suspense fallback={null}>
      <NextInput />
    </Suspense>
  );
}

function KeepNext({ href, ...props }: { href: string } & Omit<ComponentProps<typeof Link>, "href">) {
  const next = useSearchParams().get("next");
  return <Link href={next ? `${href}?next=${encodeURIComponent(next)}` : href} {...props} />;
}

/** A link between sign in and sign up that keeps `?next=`. */
export function KeepNextLink({ href, ...props }: { href: string } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Suspense fallback={<Link href={href} {...props} />}>
      <KeepNext href={href} {...props} />
    </Suspense>
  );
}
