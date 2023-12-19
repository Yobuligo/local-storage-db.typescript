/**
 * An implementation of this interface can be dropped.
 */
export interface IDroppable {
  /**
   * Drops the object
   */
  drop(): boolean;

  /**
   * Returns if the object is dropped, which means function {@link drop} was called.
   */
  readonly isDropped: boolean;
}
