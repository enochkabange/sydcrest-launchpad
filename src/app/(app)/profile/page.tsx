import type { Metadata } from "next";
import { Suspense } from "react";
import { getMyProfile } from "@/lib/auth";
import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "./profile-form";
import { PublicProfileSection } from "./public-profile-section";

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
    <div className="flex max-w-md flex-col gap-6">
      <h1 className="text-3xl text-content">Profile</h1>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <ProfileDetails />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <PublicProfileSection />
      </Suspense>
      {/* Phones have no sidebar, so sign out lives here too. */}
      <form action={signOut} className="border-t border-line pt-6 md:hidden">
        <Button type="submit" variant="secondary">
          Sign out
        </Button>
      </form>
    </div>
  );
}
