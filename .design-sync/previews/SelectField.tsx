// SelectField: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var opts = [h('option', { key: 0, value: '' }, 'Choose a region'), h('option', { key: 1, value: 'northern' }, 'Northern'), h('option', { key: 2, value: 'upper_east' }, 'Upper East'), h('option', { key: 3, value: 'upper_west' }, 'Upper West'), h('option', { key: 4, value: 'savannah' }, 'Savannah')];

const states: Array<[string, React.ReactNode]> = [
  ["Empty", h(S.SelectField, { id: 'region', label: 'Region', hint: 'Used to suggest your chapter.' }, opts)],
  ["Chosen", h(S.SelectField, { id: 'region2', label: 'Region', defaultValue: 'upper_east' }, opts)],
  ["Error", h(S.SelectField, { id: 'region3', label: 'Region', error: 'Choose your region.' }, opts)],
];

/** Empty */
export const Empty = () => <>{states[0][1]}</>;
/** Chosen */
export const Chosen = () => <>{states[1][1]}</>;
/** Error */
export const Error = () => <>{states[2][1]}</>;
