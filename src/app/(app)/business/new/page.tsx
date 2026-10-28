import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { Panel, Skeleton } from "@/components/business/bits";
import { getCurrentUser } from "@/lib/auth";
import { CreateOrganisationForm } from "./create-form";

export const metadata: Metadata = { title: "Create a business account" };

const NEXT = "/business/new";

/** Signed out visitors from the marketing page sign up first and come back here. */
async function Gate() {
  const user = await getCurrentUser();
  if (!user) redirect(`/signup?next=${encodeURIComponent(NEXT)}`);
  if (!user.hasAgeAndConsent) redirect(`/welcome?next=${encodeURIComponent(NEXT)}`);
  return <CreateOrganisationForm />;
}

const STEPS = [
  { title: "Create your account", body: "Tell us who you are. You become the owner and can add colleagues." },
  { title: "Ask to be verified", body: "Our team checks that the organisation is real. This keeps learners safe." },
  { title: "Post and find talent", body: "Once verified, post opportunities and browse certified learners who chose to be found." },
];

export default function NewBusinessPage() {
  return (
    // Phones: the form, then the steps. From lg the steps sit in a rail beside a form kept to a readable width.
    <MainWithRail
      railLabel="How business accounts work"
      rail={
        <Panel title="How it works" tone="sunken">
          <ol className="flex flex-col gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span aria-hidden="true" className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface font-semibold text-content-2 ring-1 ring-line">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-content">{s.title}</h3>
                  <p className="text-sm text-content-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm text-content-2">
            SydCrest never holds money. Any pay is agreed and settled directly between you and the person you hire.
          </p>
        </Panel>
      }
    >
      <div className="flex max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-title text-content">Create a business account</h1>
          <p className="text-lead text-content-2">
            For businesses, nonprofits, schools and public bodies hiring Ghanaian talent. Business accounts are for adults.
          </p>
          <p className="text-sm text-content-2">
            Already a member of one?{" "}
            <Link href="/org" className="font-semibold text-content-link underline">
              See your organisations
            </Link>
          </p>
        </div>
        <Suspense fallback={<Skeleton className="h-[36rem]" />}>
          <Gate />
        </Suspense>
      </div>
    </MainWithRail>
  );
}
