import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";

/** No reset session: the link expired, was used already, or was opened in another browser. */
export function LinkExpired() {
  return (
    <div className="flex flex-col gap-4">
      <Alert tone="danger">
        This reset link has expired or was already used. Each link works once, and only in the browser where you asked
        for it.
      </Alert>
      <Link href="/forgot-password" className={buttonClasses("primary", "w-full")}>
        Ask for a new link
      </Link>
    </div>
  );
}
