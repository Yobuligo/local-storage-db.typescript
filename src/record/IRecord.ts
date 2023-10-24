import { IdType } from "../types/IdType";

/**
 * An implementation of this interface represents a row in a table.
 * Each table record must contain an {@link id} and it can contain a timestamp for {@link createdAt} and {@link changedAt}.
 */
export interface IRecord<TId extends IdType> {
  changedAt?: Date;
  createdAt?: Date;
  id: TId;
}
