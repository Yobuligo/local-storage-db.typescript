/**
 * An implementation of this interface provides information on how to configure a table, when it is defined.
 */
export interface ITableConfig {
  /**
   * Defines if timestamps for createdAt and changedAt are handled by the api.
   * This means whenever an entry is added or updated the corresponding timestamp is set or updated.
   * If {@link timestamps} is undefined created and changedAt are also handled automatically.
   */
  timestamps?: boolean;
}
