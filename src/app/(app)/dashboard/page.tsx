import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { Suspense } from "react";
import { getMyProfile } from "@/lib/auth";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = { title: "Home" };

async function Greeting() {
  const profile = await getMyProfile();
  const firstName = profile.display_name?.split(" ")[0];
  return (
    <>
      <h1 className="text-3xl text-content">{firstName ? `Welcome, ${firstName}` : "Welcome"}</h1>
      {!profile.region && (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-line p-5">
          <p className="text-content-2">
            Add your region so we can connect you with your local chapter and events near you.
          </p>
          <Link href="/profile" className={buttonClasses("secondary")}>
            Add your region
          </Link>
        </div>
      )}
    </>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<div className="h-9 w-48 animate-skeleton rounded-md bg-surface-sunken" />}>
        <Greeting />
      </Suspense>
      <section className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 className="text-lg text-content">Roadmaps are on the way</h2>
        <p className="text-content-2">
          We are writing free roadmaps for the Ghanaian job market. When the first ones open, your
          progress will show up here.
        </p>
      </section>
    </div>
  );
}
