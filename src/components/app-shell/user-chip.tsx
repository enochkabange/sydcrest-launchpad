import { getNavViewer } from "@/lib/nav/viewer";
import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

/**
 * Name, email and Sign out at the foot of the sidebar. Streams in behind
 * Suspense (it reads the session); renders nothing for a visitor. Admin and
 * the rest of the You group are in the sidebar list (src/lib/nav/config.ts).
 */
export async function UserChip() {
  const viewer = await getNavViewer();
  if (!viewer) return null;
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-content">{viewer.name ?? "Your account"}</p>
        {viewer.email && <p className="truncate text-xs text-content-3">{viewer.email}</p>}
      </div>
      <form action={signOut}>
        <Button type="submit" variant="ghost" className="w-full justify-start px-0">
          Sign out
        </Button>
      </form>
    </div>
  );
}
