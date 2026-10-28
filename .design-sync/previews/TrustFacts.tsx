// TrustFacts: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var vs = [{ slug: 'spreadsheets', name: 'Spreadsheets', source: 'path_completion', issuedAt: '2026-09-12T10:00:00Z' }, { slug: 'data-cleaning', name: 'Data cleaning', source: 'assessment', issuedAt: '2026-10-02T10:00:00Z' }, { slug: 'canva', name: 'Canva design', source: 'portfolio_review', issuedAt: '2026-10-20T10:00:00Z' }];
var ex = function (o) { return Object.assign({ profileId: 'p1', slug: 'fuseini-abdulai', name: 'Fuseini Abdulai', avatarUrl: null, headline: 'Data analyst at an NGO in Tamale. I help people move from spreadsheets to dashboards.', bio: null, skills: ['Excel', 'Google Sheets', 'Power BI', 'Survey design', 'KoboToolbox', 'SQL'], categories: [], links: [], languages: ['English', 'Dagbani'], region: 'northern', availabilityNote: null, acceptingRequests: true, offersFreeIntro: true, isVerified: true, isFeatured: false, approvedAt: null, completedBookings: 0, reviewCount: 0, averageRating: null, medianResponseHours: null, offerKinds: ['one_to_one', 'async_review'], verifiedSkills: [], verifiedSkillBadges: [] }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["New expert", h(S.TrustFacts, { expert: ex() })],
  ["Sessions and response time", h(S.TrustFacts, { expert: ex({ completedBookings: 3, medianResponseHours: 20 }) })],
  ["Stacked", h(S.TrustFacts, { expert: ex({ completedBookings: 1, medianResponseHours: 2 }), layout: 'stacked' })],
];

/** New expert */
export const NewExpert = () => <>{states[0][1]}</>;
/** Sessions and response time */
export const SessionsAndResponseTime = () => <>{states[1][1]}</>;
/** Stacked */
export const Stacked = () => <>{states[2][1]}</>;
