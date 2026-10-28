import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = { title: "Reset your password" };

/** /auth/confirm (and /auth/callback, for old emails) sends a reset link that no longer works back here. */
async function LinkError({ searchParams }: { searchParams: PageProps<"/forgot-password">["searchParams"] }) {
  const { error } = await searchParams;
  return error === "link" ? (
    <Alert tone="danger">That reset link has expired or was already used. Ask for a new one below.</Alert>
  ) : null;
}

export default function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Reset your password</h1>
        <p className="text-content-2">
          Enter the email you use for SydCrest and we will send you a link to choose a new password.
        </p>
      </div>
      <Suspense>
        <LinkError searchParams={searchParams} />
      </Suspense>
      <ForgotPasswordForm />
      <p className="text-sm text-content-2">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
