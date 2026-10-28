// CertificateList: preview stories with realistic sample data (Northern Ghanaian names, no fake ratings or photos).
// @ts-nocheck: sample data is plain objects shaped like the component props.
import * as React from "react";
import * as S from "sydcrest-launchpad";

const h = React.createElement;
var certs = [{ verification_id: 'SC-7K2Q', program_title: 'Digital Marketing Programme', specialization_label: 'Social media', issued_at: '2026-09-30T10:00:00Z' }, { verification_id: 'SC-9P4M', program_title: 'Data analysis path', specialization_label: null, issued_at: '2026-10-18T10:00:00Z' }];

const states: Array<[string, React.ReactNode]> = [
  ["Two certificates", h(S.CertificateList, { certificates: certs })],
];

/** Two certificates */
export const TwoCertificates = () => <>{states[0][1]}</>;
