/**
 * The impact snapshot from event_feedback_summary, as rows for hosts. Real
 * averages only: a measure nobody answered is left out, never shown as zero.
 * Pure, so it is unit tested.
 */

export type FeedbackSummary = {
  rsvps_going: number;
  checked_in: number;
  responses: number;
  avg_confidence: number | null;
  avg_usefulness: number | null;
  avg_clarity: number | null;
  avg_logistics: number | null;
  avg_recommend: number | null;
  attend_again_rate: number | null;
};

function oneDecimal(value: number) {
  return (Math.round(value * 10) / 10).toFixed(1);
}

export function snapshotRows(summary: FeedbackSummary): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const scale = (label: string, value: number | null, max: number) => {
    if (value === null || value === undefined) return;
    rows.push({ label, value: `${oneDecimal(Number(value))} out of ${max}` });
  };
  scale("Confidence", summary.avg_confidence, 5);
  scale("Usefulness", summary.avg_usefulness, 5);
  scale("Clarity", summary.avg_clarity, 5);
  scale("Logistics", summary.avg_logistics, 5);
  scale("Would recommend", summary.avg_recommend, 10);
  if (summary.attend_again_rate !== null && summary.attend_again_rate !== undefined) {
    rows.push({ label: "Would come again", value: `${Math.round(Number(summary.attend_again_rate) * 100)} percent` });
  }
  if (summary.checked_in > 0) {
    rows.push({ label: "Response rate", value: `${summary.responses} of ${summary.checked_in} checked in` });
  }
  return rows;
}
