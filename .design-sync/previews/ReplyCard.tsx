// ReplyCard: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var ago = function (h) { return new Date(Date.now() - h * 3600e3).toISOString(); }; var inDays = function (d, hr) { var x = new Date(); x.setDate(x.getDate() + d); x.setHours(hr || 10, 0, 0, 0); return x.toISOString(); }; var today = new Date().toISOString().slice(0, 10);
var viewer = { userId: 'me', canInteract: true, canModerate: false };
var au = function (n, o) { return Object.assign({ id: 'a-' + n, name: n, slug: null, isLead: false }, o); };
var post = function (o) { return Object.assign({ id: 'p1', scope: 'everyone', chapterId: null, cohortId: null, author: au('Mariama Seidu'), body: 'Passed the Formulas and functions checkpoint this morning. The trick for me was writing out what each cell should hold before touching the formula.', linkUrl: null, pinned: false, hidden: false, edited: false, createdAt: ago(2), replyCount: 0, reactions: { like: 0, celebrate: 0, helpful: 0, support: 0 }, mine: [] }, o); };
var rep = function (o) { return Object.assign({ id: 'r1', postId: 'p1', author: au('Issahaku Bawa'), body: 'Same here. Writing it out on paper first saved me a lot of errors.', hidden: false, edited: false, createdAt: ago(1), reactions: { like: 2, celebrate: 0, helpful: 1, support: 0 }, mine: [] }, o); };

const states: Array<[string, React.ReactNode]> = [
  ["Reply with reactions", h(S.ReplyCard, { reply: rep(), viewer: viewer, postOpen: true })],
  ["Closed thread, no reactions", h(S.ReplyCard, { reply: rep({ reactions: { like: 0, celebrate: 0, helpful: 0, support: 0 }, body: 'Thanks, Mariama.' }), viewer: viewer, postOpen: false })],
];

/** Reply with reactions */
export const ReplyWithReactions = () => <>{states[0][1]}</>;
/** Closed thread, no reactions */
export const ClosedThreadNoReactions = () => <>{states[1][1]}</>;
