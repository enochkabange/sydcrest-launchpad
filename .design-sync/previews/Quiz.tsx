// Quiz: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var qs = [{ id: 'q1', prompt: 'Which formula adds the values in cells B2 to B9?', options: ['=ADD(B2:B9)', '=SUM(B2:B9)', '=TOTAL(B2,B9)', '=B2+B9'] }, { id: 'q2', prompt: 'Hawa wants the total sales for each day of the week. What should she use?', options: ['A pivot table', 'A chart title', 'Bold text', 'A new tab'] }];
var act = function () { return Promise.resolve({}); };

const states: Array<[string, React.ReactNode]> = [
  ["First attempt", h(S.Quiz, { nodeId: 'n1', questions: qs, passThreshold: 75, passedBefore: false, bestScore: null, roadmapTitle: 'Data analysis', next: null, action: act })],
  ["Passed before", h(S.Quiz, { nodeId: 'n1', questions: qs.slice(0, 1), passThreshold: 75, passedBefore: true, bestScore: 100, roadmapTitle: 'Data analysis', next: null, action: act })],
];

/** First attempt */
export const FirstAttempt = () => <>{states[0][1]}</>;
/** Passed before */
export const PassedBefore = () => <>{states[1][1]}</>;
