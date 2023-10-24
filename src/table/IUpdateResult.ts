/**
 * An implementation of this interface contains the update result for a table.
 */
export interface IUpdateResult {
  /**
   * Returns the number of records which match the where clause of an update and must potentially be updated.
   */
  numberFindings: number;

  /**
   * Returns the number of records which were changed. If an record was already up to date, it is considered as not changed.
   */
  numberChanges: number;
}
