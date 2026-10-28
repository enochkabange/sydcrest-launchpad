/**
 * SLOT: the chapter feed (issue #162).
 *
 * The scoped community feed is being built in parallel as `CommunityFeed`
 * under src/components/community/. It was not on main when chapters shipped,
 * so this slot holds its place. When it lands, replace the body below with:
 *
 *   <CommunityFeed scope="chapter" scopeId={chapterId} />
 *
 * (data contract: `community_feed('chapter', chapter_id)`, members of the
 * chapter and admins only; this slot already renders only for them).
 */
export function ChapterFeedSlot({ chapterId }: { chapterId: string }) {
  return (
    <section aria-labelledby="chapter-posts-heading" data-slot="chapter-feed" data-chapter-id={chapterId} className="flex flex-col gap-3">
      <h2 id="chapter-posts-heading" className="text-subtitle text-content">
        Chapter posts
      </h2>
      <div className="rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">
        Posts for members are coming soon: wins, questions and announcements from your lead. Until then, the chapter
        WhatsApp group is the place to talk.
      </div>
    </section>
  );
}
