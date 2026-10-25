import type { Metadata } from "next";
import { KeepNextLink } from "../next-field";
import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { GoogleButton, OrDivider } from "../google-button";
import { Alert } from "@/components/ui/alert";
import { UNDER_AGE_MESSAGE } from "@/lib/legal";

export const metadata: Metadata = { title: "Sign in" };

const CALLBACK_ERRORS: Record<string, string> = {
  link: "That link has expired or was already used. Sign in, or request a new one by signing up again.",
  google: "Google sign in didn't go through. Try again.",
  age: `${UNDER_AGE_MESSAGE} We have signed you out and have not saved your date of birth.`,
};

async function CallbackError({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const { error } = await searchParams;
  const message = typeof error === "string" ? CALLBACK_ERRORS[error] : undefined;
  return message ? <Alert tone="danger">{message}</Alert> : null;
}

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-content">Welcome back</h1>
        <p className="text-content-2">Pick up where you left off.</p>
      </div>
      <Suspense>
        <CallbackError searchParams={searchParams} />
      </Suspense>
      <GoogleButton />
      <OrDivider />
      <LoginForm />
      <p className="text-sm text-content-2">
        New to SydCrest?{" "}
        <KeepNextLink href="/signup" className="font-semibold">
          Create an account
        </KeepNextLink>
      </p>
    </div>
  );
}
