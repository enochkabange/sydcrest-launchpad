"use client";

import { useEffect, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import { answersKey } from "@/lib/path/quiz";
import { clearLocalAnswers, readLocalAnswers } from "@/lib/path/storage";
import { savePendingPath, type SaveState } from "./actions";
import { PathResultView, SavingPath } from "./path-result";

/**
 * Saves quiz answers carried through sign up, then refreshes the page so the
 * server renders the saved result. Answers come from the signed cookie (the
 * server reads it) or, failing that, this browser's storage.
 */
export function PathSync({
  savedKey,
  hasPendingCookie,
  children,
}: {
  savedKey: string | null;
  hasPendingCookie: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [unsaved, setUnsaved] = useState<Extract<SaveState, { status: "unsaved" }> | null>(null);

  useEffect(() => {
    const local = readLocalAnswers();
    const localIsNew = local !== null && answersKey(local) !== savedKey;
    if (!hasPendingCookie && !localIsNew) {
      if (local) clearLocalAnswers();
      return;
    }
    startTransition(async () => {
      const state = await savePendingPath(local).catch(() => null);
      if (state?.status === "unsaved") {
        setUnsaved(state);
        return;
      }
      if (state?.status === "saved") clearLocalAnswers();
      router.refresh();
    });
  }, [savedKey, hasPendingCookie, router]);

  if (unsaved) {
    return (
      <div className="flex flex-col gap-4">
        <Alert tone="info">
          We could not save your path to your account just now, so it is shown from this device. Open
          this page again later and we will try to save it.
        </Alert>
        <PathResultView result={unsaved.result} />
      </div>
    );
  }
  if (pending || hasPendingCookie) return <SavingPath />;
  return <>{children}</>;
}
