// ExpertCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var vs = [{ slug: 'spreadsheets', name: 'Spreadsheets', source: 'path_completion', issuedAt: '2026-09-12T10:00:00Z' }, { slug: 'data-cleaning', name: 'Data cleaning', source: 'assessment', issuedAt: '2026-10-02T10:00:00Z' }, { slug: 'canva', name: 'Canva design', source: 'portfolio_review', issuedAt: '2026-10-20T10:00:00Z' }];
var ex = function (o) { return Object.assign({ profileId: 'p1', slug: 'fuseini-abdulai', name: 'Fuseini Abdulai', avatarUrl: null, headline: 'Data analyst at an NGO in Tamale. I help people move from spreadsheets to dashboards.', bio: null, skills: ['Excel', 'Google Sheets', 'Power BI', 'Survey design', 'KoboToolbox', 'SQL'], categories: [], links: [], languages: ['English', 'Dagbani'], region: 'northern', availabilityNote: null, acceptingRequests: true, offersFreeIntro: true, isVerified: true, isFeatured: false, approvedAt: null, completedBookings: 0, reviewCount: 0, averageRating: null, medianResponseHours: null, offerKinds: ['one_to_one', 'async_review'], verifiedSkills: [], verifiedSkillBadges: [] }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["New expert, free intro", h(S.ExpertCard, { expert: ex() })],
  ["Established (sessions and response time come from real bookings)", h(S.ExpertCard, { expert: ex({ slug: 'amina-yakubu', name: 'Amina Yakubu', headline: 'Brand designer in Bolgatanga. Logos and social graphics for small businesses.', skills: ['Canva', 'Figma', 'Branding', 'Photography'], offersFreeIntro: false, isVerified: false, completedBookings: 6, medianResponseHours: 5, offerKinds: ['one_to_one'], verifiedSkills: ['Canva design'], verifiedSkillBadges: vs.slice(2) }), featured: true })],
  ["Not taking requests, no offers", h(S.ExpertCard, { expert: ex({ name: 'Sumaila Haruna', headline: 'Network technician, Wa.', skills: [], isVerified: false, acceptingRequests: false, offerKinds: [] }) })],
];

/** New expert, free intro */
export const NewExpertFreeIntro = () => <>{states[0][1]}</>;
/** Established (sessions and response time come from real bookings) */
export const EstablishedSessionsAndResponseTimeComeFromRealBookings = () => <>{states[1][1]}</>;
/** Not taking requests, no offers */
export const NotTakingRequestsNoOffers = () => <>{states[2][1]}</>;
