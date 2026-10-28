// CheckboxGroup: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var opts = [{ value: 'en', label: 'English' }, { value: 'dag', label: 'Dagbani' }, { value: 'tw', label: 'Twi' }, { value: 'gur', label: 'Gurene' }, { value: 'ha', label: 'Hausa' }, { value: 'wa', label: 'Waali' }];

const states: Array<[string, React.ReactNode]> = [
  ["None ticked", h(S.CheckboxGroup, { name: 'lang', legend: 'Languages you can teach in', hint: 'Learners filter experts by language.', options: opts, checked: [] })],
  ["Some ticked, field legend", h(S.CheckboxGroup, { name: 'lang2', legend: 'Languages', legendStyle: 'field', options: opts, checked: ['en', 'dag'] })],
  ["Error", h(S.CheckboxGroup, { name: 'lang3', legend: 'Languages you can teach in', options: opts, checked: [], error: 'Choose at least one language.' })],
];

/** None ticked */
export const NoneTicked = () => <>{states[0][1]}</>;
/** Some ticked, field legend */
export const SomeTickedFieldLegend = () => <>{states[1][1]}</>;
/** Error */
export const Error = () => <>{states[2][1]}</>;
