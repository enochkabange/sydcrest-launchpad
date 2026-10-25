/**
 * Low bandwidth detection, shared by the data saver provider and its tests.
 *
 * `navigator.connection` (Network Information API) exists on Chrome for
 * Android, which is what most of our learners use. Safari and Firefox do not
 * ship it, so absence means "assume normal", never "assume slow".
 */
export type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
};

const SLOW_TYPES = new Set(["slow-2g", "2g"]);

/** True when the learner asked to save data or the link is 2G class. */
export function isConstrainedConnection(connection: NetworkInformationLike | undefined | null): boolean {
  if (!connection) return false;
  if (connection.saveData === true) return true;
  return connection.effectiveType !== undefined && SLOW_TYPES.has(connection.effectiveType);
}
