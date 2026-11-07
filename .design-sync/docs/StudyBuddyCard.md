---
category: Learn
---

# StudyBuddyCard

The Study Buddy card frame: icon, heading, an optional aside and the card body. Server safe.

## When to use

Use as the shell for every Study Buddy state (the chat, the signed out prompt, the loading fallback) so the card keeps its height. Exported from the code as PanelShell.

## Props

children: ReactNode; aside?: ReactNode.

## Where it is used

Topic pages and /study-buddy (via TopicStudyBuddy and StudyBuddy)

## Source

`src/components/study-buddy/panel-shell.tsx` (exported there as `PanelShell`). Exported as `StudyBuddyCard`.
