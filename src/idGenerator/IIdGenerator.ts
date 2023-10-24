import { IdType } from "../types/IdType";

/**
 * An implementation of this interface is responsible for creating ids.
 * The id type is of the given type {@link T}.
 */
export interface IIdGenerator<T extends IdType> {
  /**
   * Generates the next id.
   */
  next(): T;
}
