// ReactionBar: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var z = { like: 0, celebrate: 0, helpful: 0, support: 0 }, some = { like: 12, celebrate: 3, helpful: 5, support: 0 };

const states: Array<[string, React.ReactNode]> = [
  ["None yet", h(S.ReactionBar, { target: 'post', id: 'a', reactions: z, mine: [] })],
  ["Some, one of them yours", h(S.ReactionBar, { target: 'post', id: 'b', reactions: some, mine: ['like'] })],
  ["Read only", h(S.ReactionBar, { target: 'post', id: 'c', reactions: some, mine: [], readOnly: true })],
];

/** None yet */
export const NoneYet = () => <>{states[0][1]}</>;
/** Some, one of them yours */
export const SomeOneOfThemYours = () => <>{states[1][1]}</>;
/** Read only */
export const ReadOnly = () => <>{states[2][1]}</>;
