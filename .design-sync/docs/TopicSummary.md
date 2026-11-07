---
category: Learn
---

# TopicSummary

Where a topic sits, its title, the learner's status and its summary; the h1 on the topic page and the h2 in the panel.

## When to use

Shared by the full topic page and the topic panel so both say the same thing. Status is read only.

## Props

node: ViewNode; section: ViewSection; sectionCount: number; headingLevel: 1 | 2; headingId?: string.

## Where it is used

/roadmaps/[slug]/[node] and its panel

## Source

`src/components/roadmaps/topic.tsx`. Exported as `TopicSummary`.
