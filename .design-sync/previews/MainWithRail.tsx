// MainWithRail: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var box = function (t, cls) { return h('div', { className: 'rounded-lg border border-line bg-surface-sunken p-4 text-sm text-content-2 ' + (cls || '') }, t); };

const states: Array<[string, React.ReactNode]> = [
  ["Dashboard composition", h(S.MainWithRail, { railLabel: 'Your community', rail: [h(S.CommunityGuidelines, { key: 'g' }), h(S.ReportOutcomeCard, { key: 'r' })] }, h('h1', { className: 'text-title text-content' }, 'Good morning, Abdul-Rahman'), box('The next topic to pass sits here, with the weekly goal below it.', 'h-48'))],
];

/** Dashboard composition */
export const DashboardComposition = () => <>{states[0][1]}</>;
