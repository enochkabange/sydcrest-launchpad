"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useDataSaver } from "@/components/pwa/data-saver";

/**
 * Drop in replacement for next/link that skips prefetching when the learner
 * is saving data or on a 2G class link. Prefetch downloads routes the learner
 * may never open, which costs real money on prepaid bundles. Navigation still
 * works, it simply fetches on tap instead of ahead of time.
 *
 * Use `import Link from "@/components/ui/link"` instead of `next/link`.
 */
export default function Link({ prefetch, ...props }: ComponentProps<typeof NextLink>) {
  const saveData = useDataSaver();
  return <NextLink prefetch={saveData ? false : prefetch} {...props} />;
}
