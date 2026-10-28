// Alert: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Success", h(S.Alert, { tone: 'success' }, 'Your pitch was sent to Fuseini. You will get a notification when he replies.')],
  ["Info", h(S.Alert, { tone: 'info' }, 'You scored 50%. You need 75% to pass. Read the explanation again and have another go.')],
  ["Danger", h(S.Alert, { tone: 'danger' }, 'We could not save your post. Check your connection and try again.')],
];

/** Success */
export const Success = () => <>{states[0][1]}</>;
/** Info */
export const Info = () => <>{states[1][1]}</>;
/** Danger */
export const Danger = () => <>{states[2][1]}</>;
