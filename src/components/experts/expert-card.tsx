import { ArrowRight } from "lucide-react";
import Link from "@/components/ui/link";
import type { DirectoryExpert } from "@/lib/experts/directory";
import { expertPath, offerKindLabel } from "@/lib/experts/offers";
import { VerifiedSkillBadges } from "@/components/skills/verified-skill-badges";
import { ExpertAvatar, FeaturedBadge, SkillChips, TrustFacts, VerifiedBadge } from "./expert-bits";

/** A card in the directory. The whole card is one link to the expert's page. */
export function ExpertCard({ expert, featured = false }: { expert: DirectoryExpert; featured?: boolean }) {
  return (
    <Link
      href={expertPath(expert.slug)}
      className="group flex h-full flex-col gap-4 rounded-lg border border-line bg-surface p-5 transition-colors xl:p-6 hover:border-line-strong hover:bg-surface-sunken"
    >
      <div className="flex items-start gap-4">
        <ExpertAvatar expert={expert} size="sm" />
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-h3 text-content">{expert.name}</h3>
          <p className="line-clamp-2 text-sm text-content-2">{expert.headline}</p>
        </div>
      </div>

      {(expert.isVerified || featured || expert.offersFreeIntro || !expert.acceptingRequests) && (
        <div className="flex flex-wrap gap-1.5">
          {featured && <FeaturedBadge />}
          {expert.isVerified && <VerifiedBadge />}
          {expert.offersFreeIntro && expert.acceptingRequests && (
            <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-xs font-semibold text-success-fg">Free intro call</span>
          )}
          {!expert.acceptingRequests && (
            <span className="rounded-full bg-surface-sunken px-2.5 py-0.5 text-xs font-semibold text-content-2 ring-1 ring-line">
              Not taking requests
            </span>
          )}
        </div>
      )}

      <VerifiedSkillBadges skills={expert.verifiedSkillBadges} variant="compact" label={`Verified skills of ${expert.name}`} />
      <SkillChips skills={expert.skills.filter((s) => !expert.verifiedSkills.includes(s))} max={4} />
      <TrustFacts expert={expert} />

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3 text-sm text-content-2">
        <span className="line-clamp-1">
          {expert.offerKinds.length > 0 ? expert.offerKinds.map(offerKindLabel).join(", ") : "No offers listed yet"}
        </span>
        <ArrowRight aria-hidden className="size-4 shrink-0 text-content-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
