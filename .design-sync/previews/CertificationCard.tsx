// CertificationCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var st = function (o) { return Object.assign({ eligible: false, specialization: null, weeksRequired: 10, weeksPassed: 0, missingWeeks: [], capstonePassed: false, peerReviewsGiven: 0, peerReviewsRequired: 3, passScore: 70 }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["Just started", h(S.CertificationCard, { programTitle: 'Digital Marketing Programme', programSlug: 'dmp', status: st({ weeksPassed: 1, missingWeeks: [2, 3] }), certificate: null })],
  ["Eligible, awaiting the mentor", h(S.CertificationCard, { programTitle: 'Digital Marketing Programme', programSlug: 'dmp', status: st({ eligible: true, weeksPassed: 10, capstonePassed: true, peerReviewsGiven: 3 }), certificate: null })],
  ["Could not load", h(S.CertificationCard, { programTitle: 'Digital Marketing Programme', programSlug: 'dmp', status: null, certificate: null })],
];

/** Just started */
export const JustStarted = () => <>{states[0][1]}</>;
/** Eligible, awaiting the mentor */
export const EligibleAwaitingTheMentor = () => <>{states[1][1]}</>;
/** Could not load */
export const CouldNotLoad = () => <>{states[2][1]}</>;
