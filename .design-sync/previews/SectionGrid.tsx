// SectionGrid: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var c = function (t, b) { return h(S.Card, { key: t, title: t }, b); };

const states: Array<[string, React.ReactNode]> = [
  ["cols 3", h(S.SectionGrid, { cols: 3 }, c('Learn', 'Roadmaps written for Ghana, topic by topic.'), c('Practise', 'Small tasks you can do on any device with little data.'), c('Prove it', 'Verified skills and certificates employers can check.'))],
  ["cols 4", h(S.SectionGrid, { cols: 4 }, c('Tamale', 'Starting first.'), c('Bolgatanga', 'Planned.'), c('Wa', 'Planned.'), c('Damongo', 'Planned.'))],
];

/** cols 3 */
export const Cols3 = () => <>{states[0][1]}</>;
/** cols 4 */
export const Cols4 = () => <>{states[1][1]}</>;
