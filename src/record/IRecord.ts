import { IdType } from "../types/IdType";

/**
 * An implementation of this interface represents a row in a table.
 * Each table record must contain an {@link id} and it can contain a timestamp for {@link createdAt} and {@link changedAt}.
 */
export interface IRecord<TId extends IdType> {
  /**
   * Returns the timestamp when this record was changed last or undefined if the timestamp function is disabled.
   */
  changedAt?: Date;

  /**
   * Returns the timestamp when this record was created or undefined if the timestamp function is disabled.
   */
  createdAt?: Date;

  /**
   * Returns the id of this record.
   */
  id: TId;
}
