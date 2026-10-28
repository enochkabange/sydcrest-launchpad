// PublicPortfolio: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var items = [{ submission_id: 's1', program_title: 'Digital Marketing Programme', week_number: 3, theme: 'content-calendar', is_capstone: false, link_url: 'https://example.org/calendar', body_excerpt: 'A four week content calendar for a shea butter cooperative in Nalerigu, planned around market days.', body_is_excerpt: true, has_file: false, graded_at: '2026-09-20T10:00:00Z' }, { submission_id: 's2', program_title: 'Digital Marketing Programme', week_number: 12, theme: 'capstone', is_capstone: true, link_url: null, body_excerpt: 'Campaign plan for a Tamale tailoring shop.', body_is_excerpt: false, has_file: true, graded_at: '2026-10-25T10:00:00Z' }];

const states: Array<[string, React.ReactNode]> = [
  ["Two pieces", h(S.PublicPortfolio, { items: items })],
];

/** Two pieces */
export const TwoPieces = () => <>{states[0][1]}</>;
