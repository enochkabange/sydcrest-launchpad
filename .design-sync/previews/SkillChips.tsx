// SkillChips: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var sk = ['Excel', 'Google Sheets', 'Power BI', 'Survey design', 'KoboToolbox', 'SQL'];

const states: Array<[string, React.ReactNode]> = [
  ["All", h(S.SkillChips, { skills: sk })],
  ["max 3", h(S.SkillChips, { skills: sk, max: 3 })],
];

/** All */
export const All = () => <>{states[0][1]}</>;
/** max 3 */
export const Max3 = () => <>{states[1][1]}</>;
