// DataTable: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var rows = [{ id: 1, name: 'Wumpini Alhassan', chapter: 'Tamale', topics: 14 }, { id: 2, name: 'Mariama Seidu', chapter: 'Tamale', topics: 9 }, { id: 3, name: 'Issahaku Bawa', chapter: 'Bolgatanga', topics: 3 }];
var cols = [{ header: 'Learner', cell: function (r) { return h('a', { href: '#', className: 'font-semibold text-content ' + S.rowLinkClass }, r.name); }, className: 'min-w-0 flex-1' },
 { header: 'Chapter', cell: function (r) { return r.chapter; }, phone: 'hide', className: 'text-sm text-content-2' },
 { header: 'Topics passed', cell: function (r) { return r.topics; }, align: 'end', className: 'tabular-nums' }];

const states: Array<[string, React.ReactNode]> = [
  ["Rows", h(S.DataTable, { caption: 'Learners in the cohort', columns: cols, rows: rows, rowKey: function (r) { return String(r.id); } })],
  ["Empty list (the screen shows an empty state instead)", h(S.DataTable, { caption: 'No learners yet', columns: cols, rows: [], rowKey: function (r) { return String(r.id); } })],
];

/** Rows */
export const Rows = () => <>{states[0][1]}</>;
/** Empty list (the screen shows an empty state instead) */
export const EmptyListTheScreenShowsAnEmptyStateInstead = () => <>{states[1][1]}</>;
