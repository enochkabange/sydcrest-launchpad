---
category: Community
---

# RecordingCard

One recording: kind, title, the event it came from, a summary, duration and a Watch link out.

## When to use

Use on /events/recordings and an event page. It links to where the video is hosted rather than embedding, so nothing streams until someone chooses to spend data.

## Props

recording: PublicRecording; showEvent?: boolean (default true).

## Where it is used

/events/recordings, /events/[slug]

## Source

`src/components/events/recording-card.tsx`. Exported as `RecordingCard`.
