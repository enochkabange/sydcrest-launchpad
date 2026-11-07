// PostCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var viewer = { userId: 'me', canInteract: true, canModerate: false };
var au = function (n, o) { return Object.assign({ id: 'a-' + n, name: n, slug: null, isLead: false }, o); };
var post = function (o) { return Object.assign({ id: 'p1', scope: 'everyone', chapterId: null, cohortId: null, author: au('Mariama Seidu'), body: 'Passed the Formulas and functions checkpoint this morning. The trick for me was writing out what each cell should hold before touching the formula.', linkUrl: null, pinned: false, hidden: false, edited: false, createdAt: ago(2), replyCount: 0, reactions: { like: 0, celebrate: 0, helpful: 0, support: 0 }, mine: [] }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["New post, no reactions yet", h(S.PostCard, { post: post(), viewer: viewer })],
  ["Pinned by a chapter lead, with a link and replies", h(S.PostCard, { post: post({ id: 'p2', pinned: true, author: au('Wumpini Alhassan', { isLead: true, slug: 'wumpini' }), body: 'Tamale skillshop this Saturday at the library. Bring your phone or laptop, we will build a budget sheet together.', linkUrl: 'https://example.org/tamale-skillshop', replyCount: 7, reactions: { like: 12, celebrate: 3, helpful: 5, support: 0 }, mine: ['like'] }), viewer: viewer })],
  ["Your own post, hidden by a moderator", h(S.PostCard, { post: post({ id: 'p3', author: au('Me', { id: 'me' }), hidden: true, edited: true, body: 'Selling data bundles, message me.' }), viewer: viewer })],
];

/** New post, no reactions yet */
export const NewPostNoReactionsYet = () => <>{states[0][1]}</>;
/** Pinned by a chapter lead, with a link and replies */
export const PinnedByAChapterLeadWithALinkAndReplies = () => <>{states[1][1]}</>;
/** Your own post, hidden by a moderator */
export const YourOwnPostHiddenByAModerator = () => <>{states[2][1]}</>;
