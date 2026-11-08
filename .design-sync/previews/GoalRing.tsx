// GoalRing: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Empty", h(S.GoalRing, { done: 0, target: 3 })],
  ["Partial", h(S.GoalRing, { done: 2, target: 3 })],
  ["Met", h(S.GoalRing, { done: 4, target: 3 })],
];

/** Empty */
export const Empty = () => <>{states[0][1]}</>;
/** Partial */
export const Partial = () => <>{states[1][1]}</>;
/** Met */
export const Met = () => <>{states[2][1]}</>;
