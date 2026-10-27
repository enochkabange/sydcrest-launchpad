import type { Metadata } from "next";
import { Suspense } from "react";
import { getMyProfile } from "@/lib/auth";
import { signOut } from "@/app/(auth)/actions";
import { ReportOutcomeCard } from "@/components/outcomes/report-outcome-card";
import { Button } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { ProfileForm } from "./profile-form";
import { PublicProfilePreview } from "./public-profile-preview";
import { PublicProfileSection } from "./public-profile-section";
import { WhatsAppConsent } from "./whatsapp-consent";

export const metadata: Metadata = { title: "Profile" };

async function ProfileDetails() {
  const profile = await getMyProfile();
  return (
    <>
      {profile.email && <p className="text-content-2">Signed in as {profile.email}</p>}
      <ProfileForm displayName={profile.display_name} region={profile.region} phone={profile.phone} />
    </>
  );
}

export default function ProfilePage() {
  return (
    // Phones and tablets get the single settings column. From lg a preview of the public profile sits in a
    // sticky rail beside the settings, so a change can be checked against what others will see.
    <MainWithRail
      railFrom="lg"
      sticky
      railLabel="Public profile preview"
      rail={
        <Suspense fallback={<div className="h-72 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <PublicProfilePreview />
        </Suspense>
      }
    >
      <div className="flex max-w-md flex-col gap-6 lg:max-w-2xl">
        <h1 className="text-title text-content">Profile</h1>
        <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <ProfileDetails />
        </Suspense>
        <Suspense fallback={<div className="h-32 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <WhatsAppConsent />
        </Suspense>
        <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <PublicProfileSection />
        </Suspense>
        <ReportOutcomeCard />
        {/* Phones have no sidebar, so sign out lives here too. */}
        <form action={signOut} className="border-t border-line pt-6 md:hidden">
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </div>
    </MainWithRail>
  );
}
