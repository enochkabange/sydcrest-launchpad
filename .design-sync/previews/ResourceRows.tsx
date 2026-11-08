// ResourceRows: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var res = [{ id: 'r1', label: 'Formulas and functions, an introduction', url: '#', kind: 'article', source: 'MDN' }, { id: 'r2', label: 'Spreadsheet sums in ten minutes', url: '#', kind: 'video', source: 'freeCodeCamp' }, { id: 'r3', label: 'Total a week of chop bar sales', url: '#', kind: 'practice', source: null }];

const states: Array<[string, React.ReactNode]> = [
  ["Three kinds", h(S.ResourceRows, { resources: res })],
];

/** Three kinds */
export const ThreeKinds = () => <>{states[0][1]}</>;
