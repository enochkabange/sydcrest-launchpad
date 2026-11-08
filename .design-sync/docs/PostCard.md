---
category: Community
---

# PostCard

One feed post: byline with initials, safe markdown body, optional link, reactions, replies and moderation tools.

## When to use

Use in the community feed and at the top of a thread (`inThread`). Pinned posts lift onto surface-raised with an info border; hidden posts carry a warning note for their author and moderators.

## Props

post: PostView; viewer: { userId: string; canInteract: boolean; canModerate: boolean }; inThread?: boolean.

## Where it is used

/community, /community/post/[id]

## Source

`src/components/community/post-card.tsx`. Exported as `PostCard`.

## Notes

- Reactions and moderation post to server actions, stubbed in the bundle: toggles move optimistically and then roll back.
