---
category: Learn
---

# Quiz

The checkpoint quiz: questions with native radios, graded on the server; a wrong answer is never a dead end.

## When to use

Use on the lesson page. Only questions and options reach the browser; the server returns the score, the pass flag and which answers were right, never the correct options. Choices persist across a failed attempt.

## Props

nodeId: string; questions: { id: string; prompt: string; options: string[] }[]; passThreshold: number; passedBefore: boolean; bestScore: number | null; roadmapTitle: string; next: { href: string; title: string } | null; action: (prev: CompletionState, form: FormData) => Promise<CompletionState>.

## Where it is used

/learn/[slug]/[node]

## Source

`src/components/learn/quiz.tsx`. Exported as `Quiz`.

## Notes

- Grading is a server action; in this preview submitting does nothing.
