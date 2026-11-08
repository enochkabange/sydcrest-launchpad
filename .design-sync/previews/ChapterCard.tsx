// ChapterCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var person = function (n, o) { return Object.assign({ profile_id: n, display_name: n, avatar_url: null, public_slug: null, role: 'member', joined_at: '2026-09-01T10:00:00Z' }, o); };
var chapter = { id: 'c1', slug: 'tamale', name: 'Tamale chapter', region: 'northern', city: 'Tamale', status: 'launching', summary: 'Monthly skillshops at the library and a WhatsApp group for questions between sessions.', whatsapp_url: null };

const states: Array<[string, React.ReactNode]> = [
  ["Launching, two leads", h('ul', null, h(S.ChapterCard, { chapter: chapter, leads: [person('Wumpini Alhassan', { role: 'lead' }), person('Hawa Iddrisu', { role: 'lead' })] }))],
  ["Active, no lead yet", h('ul', null, h(S.ChapterCard, { chapter: Object.assign({}, chapter, { slug: 'bolga', name: 'Bolgatanga chapter', city: 'Bolgatanga', region: 'upper_east', status: 'active', summary: null }), leads: [] }))],
];

/** Launching, two leads */
export const LaunchingTwoLeads = () => <>{states[0][1]}</>;
/** Active, no lead yet */
export const ActiveNoLeadYet = () => <>{states[1][1]}</>;
