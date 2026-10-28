// AutoGrid: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var c = function (t) { return h(S.Card, { key: t, title: t }, 'Track card'); };

const states: Array<[string, React.ReactNode]> = [
  ["min md", h(S.AutoGrid, null, ['Frontend', 'Data', 'Digital marketing', 'UI and UX design', 'IT support and networking'].map(c))],
  ["min lg", h(S.AutoGrid, { min: 'lg' }, ['Virtual assistant and remote work', 'AI tools for work', 'Graphic design'].map(c))],
];

/** min md */
export const MinMd = () => <>{states[0][1]}</>;
/** min lg */
export const MinLg = () => <>{states[1][1]}</>;
