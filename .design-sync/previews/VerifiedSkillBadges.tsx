// VerifiedSkillBadges: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var vs = [{ slug: 'spreadsheets', name: 'Spreadsheets', source: 'path_completion', issuedAt: '2026-09-12T10:00:00Z' }, { slug: 'data-cleaning', name: 'Data cleaning', source: 'assessment', issuedAt: '2026-10-02T10:00:00Z' }, { slug: 'canva', name: 'Canva design', source: 'portfolio_review', issuedAt: '2026-10-20T10:00:00Z' }];

const states: Array<[string, React.ReactNode]> = [
  ["Full", h(S.VerifiedSkillBadges, { skills: vs })],
  ["Compact", h(S.VerifiedSkillBadges, { skills: vs, variant: 'compact' })],
];

/** Full */
export const Full = () => <>{states[0][1]}</>;
/** Compact */
export const Compact = () => <>{states[1][1]}</>;
