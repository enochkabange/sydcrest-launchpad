import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { OfferForm } from "@/components/experts/offer-form";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { isOfferKind, type Cadence, type OfferValues } from "@/lib/market-apply/offers";
import { updateOffer } from "../../actions";
import { OfferEditorFrame } from "../offer-editor";

export const metadata: Metadata = { title: "Edit offer" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function EditOffer({ params }: { params: PageProps<"/expert/offers/[id]">["params"] }) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const user = await requireUser();
  const supabase = await createClient();
  const { data: offer } = await supabase.from("offers").select("*").eq("id", id).eq("expert_id", user.id).maybeSingle();
  if (!offer || !isOfferKind(offer.kind)) notFound();
  const initial: OfferValues = { ...offer, kind: offer.kind, cadence: offer.cadence as Cadence | null };
  return <OfferForm action={updateOffer.bind(null, offer.id)} initial={initial} submitLabel="Save offer" />;
}

export default function EditOfferPage({ params }: PageProps<"/expert/offers/[id]">) {
  return (
    <OfferEditorFrame title="Edit offer">
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <EditOffer params={params} />
      </Suspense>
    </OfferEditorFrame>
  );
}
