// LessonMarkdown: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var md = '## Why it matters\n\nA shop in Tamale that tracks its stock in a spreadsheet knows what to reorder **before** it runs out.\n\n- Put one item on each row\n- Use `=SUM(C2:C20)` for the total\n\n> Save a copy before you sort.';

const states: Array<[string, React.ReactNode]> = [
  ["Lesson content", h('div', { className: 'prose' }, h(S.LessonMarkdown, { source: md }))],
];

/** Lesson content */
export const LessonContent = () => <>{states[0][1]}</>;
