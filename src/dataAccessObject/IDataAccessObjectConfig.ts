export interface IDataAccessObjectConfig {
  /**
   * Defines if createdAt and changedAt timestamps are set.
   * If {@link timestamps} is undefined, it automatically sets created and changedAt.
   */
  timestamps?: boolean;
}
