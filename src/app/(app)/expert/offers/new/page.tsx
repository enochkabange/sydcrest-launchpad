import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { OfferForm } from "@/components/experts/offer-form";
import { getMyExpertState } from "@/lib/market-apply/data";
import { EMPTY_OFFER } from "@/lib/market-apply/offers";
import { createOffer } from "../../actions";
import { OfferEditorFrame } from "../offer-editor";

export const metadata: Metadata = { title: "Add an offer" };

async function NewOffer() {
  const { expert } = await getMyExpertState();
  // Offers need an expert profile that is not delisted (the database checks this too).
  if (!expert || expert.status === "delisted") redirect("/expert");
  return <OfferForm action={createOffer} initial={EMPTY_OFFER} submitLabel="Add offer" />;
}

export default function NewOfferPage() {
  return (
    <OfferEditorFrame title="Add an offer">
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <NewOffer />
      </Suspense>
    </OfferEditorFrame>
  );
}
