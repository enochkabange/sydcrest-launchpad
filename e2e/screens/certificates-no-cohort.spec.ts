import { test } from "@playwright/test";
import { admin, insert } from "../supabase-admin";
import { createLearner } from "../learners";
import { signIn } from "../certificates-fixtures";
import { screensSetup, shoot } from "./shoot";

/** /certificates outside any cohort (issue #238): with a certificate, and with none. */
test("certificates without a cohort at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const holder = await createLearner("Fuseini Mahama");
  const [program] = await admin<{ id: string; title: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id,title");
  await insert("certificates", [
    { profile_id: holder.id, program_id: program.id, recipient_name: holder.name, program_title: program.title },
  ]);
  await signIn(page, holder.email);
  await shoot(page, testInfo, "certificates-no-cohort", "/certificates");

  const newcomer = await createLearner("Abdul-Rahman Issah");
  await signIn(page, newcomer.email);
  await shoot(page, testInfo, "certificates-none", "/certificates");
});
