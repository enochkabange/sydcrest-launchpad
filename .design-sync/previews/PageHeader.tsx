// PageHeader: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;


const states: Array<[string, React.ReactNode]> = [
  ["Plain", h(S.PageHeader, { eyebrow: 'Events', title: 'Meetups, workshops and recordings', lead: 'Skillshops in chapter cities and webinars you can join from anywhere.' })],
  ["With aside", h(S.PageHeader, { eyebrow: 'Skills', title: 'Verified skills employers can check', lead: 'Earn a badge by finishing a path, passing an assessment or having your work reviewed.', aside: h(S.EarnWays) })],
];

/** Plain */
export const Plain = () => <>{states[0][1]}</>;
/** With aside */
export const WithAside = () => <>{states[1][1]}</>;
