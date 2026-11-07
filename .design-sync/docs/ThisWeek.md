---
category: Learn
---

# ThisWeek

Home's learning loop card: the weekly goal ring, the learning streak and the way into a 5 minute review.

## When to use

Rendered on /dashboard inside Suspense. Phones stack goal, streak and review; from lg the goal and streak sit side by side with the review as a band across the bottom.

## Props

No props in the app (it loads the signed in learner's loop). In this bundle its data comes from window.SydCrestPreview.learningLoop: { daily: { days, activeToday, restDaysLeft }, weekly: { target: number | null, done, met, weeksInARow }, reviewedToday: boolean, reviewQuestions: number }.

## Where it is used

/dashboard

## Source

`src/components/learning-loop/this-week.tsx`. Exported as `ThisWeek`.

## Notes

- Live: the async loader is stubbed; each instance reads the data set just before it renders.
- The goal picker posts to a server action, stubbed in the bundle.
