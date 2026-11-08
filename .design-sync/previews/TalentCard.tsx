// TalentCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var vs = [{ slug: 'spreadsheets', name: 'Spreadsheets', source: 'path_completion', issuedAt: '2026-09-12T10:00:00Z' }, { slug: 'data-cleaning', name: 'Data cleaning', source: 'assessment', issuedAt: '2026-10-02T10:00:00Z' }, { slug: 'canva', name: 'Canva design', source: 'portfolio_review', issuedAt: '2026-10-20T10:00:00Z' }];
var tr = function (o) { return Object.assign({ profile_id: 't1', display_name: 'Abdul-Rahman Mahama', public_slug: 'abdul-rahman', headline: 'Junior data analyst. Cleans survey data and builds simple dashboards.', summary: 'I finished the Data analysis path and helped a farmers group in Savelugu track their harvests.', skills: ['Excel', 'Google Sheets', 'KoboToolbox', 'Power BI', 'Survey design'], tracks: ['data'], region: 'northern', availability: 'open_to_internships', open_to_remote: true, portfolio_url: 'https://example.org/portfolio', certificates: [], verified_skills: [] }, o); };
var vsRows = vs.map(function (s) { return { slug: s.slug, name: s.name, source: s.source, issued_at: s.issuedAt }; });

const states: Array<[string, React.ReactNode]> = [
  ["Directory card, new learner", h(S.TalentCard, { row: tr({ skills: ['Excel'], verified_skills: [] }), href: '#' })],
  ["Full, certified with verified skills", h(S.TalentCard, { row: tr({ certificates: [{ program_title: 'Data analysis path', specialization_label: null, issued_at: '2026-10-18T10:00:00Z' }], verified_skills: vsRows.slice(0, 2) }), full: true, action: h(S.Button, null, 'Get in touch') })],
];

/** Directory card, new learner */
export const DirectoryCardNewLearner = () => <>{states[0][1]}</>;
/** Full, certified with verified skills */
export const FullCertifiedWithVerifiedSkills = () => <>{states[1][1]}</>;
