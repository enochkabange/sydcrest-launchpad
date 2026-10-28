import { Suspense, type ReactNode } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

type Props = {
  /** What signed out visitors see: also the prerendered fallback, so it reserves the height. */
  signedOut: ReactNode;
  /** The button a signed in learner sees instead, leading to the dashboard. */
  signedInLabel: string;
};

/**
 * Sign up buttons on a prerendered public page, swapped for a way back in
 * when the visitor is already signed in. The session is read in a request
 * time island, so the rest of the page stays prerendered for everyone.
 */
export function AccountCta(props: Props) {
  return (
    <Suspense fallback={props.signedOut}>
      <AccountCtaForViewer {...props} />
    </Suspense>
  );
}

async function AccountCtaForViewer({ signedOut, signedInLabel }: Props) {
  const user = await getCurrentUser();
  if (!user) return signedOut;
  // Google sign ups confirm their age and the terms on /welcome first.
  const [href, label] = user.hasAgeAndConsent ? ["/dashboard", signedInLabel] : ["/welcome", "Finish setting up"];
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={href} className={buttonClasses("primary")}>
        {label}
      </Link>
    </div>
  );
}
