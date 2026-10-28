// CertificateChecklist: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var st = function (o) { return Object.assign({ eligible: false, specialization: null, weeksRequired: 10, weeksPassed: 0, missingWeeks: [], capstonePassed: false, peerReviewsGiven: 0, peerReviewsRequired: 3, passScore: 70 }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["None done", h(S.CertificateChecklist, { status: st({}) })],
  ["Partway", h(S.CertificateChecklist, { status: st({ weeksPassed: 7, missingWeeks: [3], peerReviewsGiven: 2 }) })],
  ["All done, compact, staff", h(S.CertificateChecklist, { status: st({ eligible: true, weeksPassed: 10, capstonePassed: true, peerReviewsGiven: 3 }), compact: true, audience: 'staff' })],
];

/** Weeks passed, the rest to go */
export const WeeksPassedRestToGo = () => <>{states[0][1]}</>;
/** Partway */
export const Partway = () => <>{states[1][1]}</>;
/** All done, compact, staff */
export const AllDoneCompactStaff = () => <>{states[2][1]}</>;
