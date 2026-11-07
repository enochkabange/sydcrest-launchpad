// Initials: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["sm and lg", h('div', { className: 'flex items-end gap-4' }, h(S.Initials, { name: 'Abdul-Rahman Mahama' }), h(S.Initials, { name: 'Hawa Iddrisu', size: 'lg' }), h(S.Initials, { name: 'Fuseini' }))],
];

/** sm and lg */
export const SmAndLg = () => <>{states[0][1]}</>;
