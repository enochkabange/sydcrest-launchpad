import { getMyProfile } from "@/lib/auth";
import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

/** Streams in behind Suspense: it reads the session. Redirects to /login when signed out. */
export async function UserChip() {
  const profile = await getMyProfile();
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-content">{profile.display_name ?? "Your account"}</p>
        {profile.email && <p className="truncate text-xs text-content-3">{profile.email}</p>}
      </div>
      <form action={signOut}>
        <Button type="submit" variant="ghost" className="w-full justify-start px-0">
          Sign out
        </Button>
      </form>
    </div>
  );
}
