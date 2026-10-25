import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { SignupForm } from "./signup-form";
import { GoogleButton, OrDivider } from "../google-button";

export const metadata: Metadata = { title: "Create your account" };

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl text-content">Start your path into tech</h1>
        <p className="text-content-2">Free to join. One account for roadmaps, cohorts and mentors as each one opens.</p>
      </div>
      <GoogleButton />
      <OrDivider />
      <SignupForm />
      <p className="text-sm text-content-2">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
