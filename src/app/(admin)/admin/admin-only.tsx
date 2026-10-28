import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin";

/**
 * Renders its children only for admins (404 for everyone else). Next renders a
 * layout and its page in parallel, so the layout's gate alone still sends a
 * page's markup to whoever asked (issue #240). Pages with nothing else to
 * load wrap their content in this, inside <Suspense>.
 */
export async function AdminOnly({ children }: { children: ReactNode }) {
  await requireAdmin();
  return children;
}
