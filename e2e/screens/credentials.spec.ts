import { test } from "@playwright/test";
import { certify, deleteUser, signIn } from "../earn-business";
import { createLearner } from "../learners";
import { makePublic } from "../sharing-seed";
import { admin, insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

/** Credentials wallet screens (issue #253) at 390, 1440 and 1920: the public wallet, an empty one, and the profile section. */
test("credentials wallet screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const learner = await createLearner("Wumpini Alhassan");
  const empty = await createLearner("Issahaku Yakubu");
  try {
    await makePublic(learner);
    await makePublic(empty);
    await certify(learner);
    await insert("external_credentials", [
      {
        profile_id: learner.id,
        title: "Google Data Analytics",
        issuer_name: "Google",
        issued_on: "2026-05-14",
        credential_id: "GDA-2026-0042",
        verification_url: "https://www.coursera.org/account/accomplishments/verify/GDA0042",
        visibility: "public",
      },
      {
        profile_id: learner.id,
        title: "CCNA: Introduction to Networks",
        issuer_name: "Cisco Networking Academy",
        issued_on: "2025-11-02",
        expires_on: "2026-03-01",
        visibility: "public",
      },
      { profile_id: learner.id, title: "Excel for Business", issuer_name: "Ashesi University", visibility: "private" },
    ]);
    const [{ public_slug: slug }] = await admin<{ public_slug: string }[]>(`/rest/v1/profiles?select=public_slug&id=eq.${learner.id}`);
    const [{ public_slug: emptySlug }] = await admin<{ public_slug: string }[]>(`/rest/v1/profiles?select=public_slug&id=eq.${empty.id}`);

    await shoot(page, testInfo, "credentials-wallet", `/u/${slug}/credentials`);
    await shoot(page, testInfo, "credentials-wallet-empty", `/u/${emptySlug}/credentials`);
    await signIn(page, learner);
    await shoot(page, testInfo, "credentials-profile", "/profile#credentials");
  } finally {
    await deleteUser(learner.id).catch(() => {});
    await deleteUser(empty.id).catch(() => {});
  }
});
