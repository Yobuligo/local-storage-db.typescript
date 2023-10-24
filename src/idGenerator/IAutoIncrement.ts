import { IIdGenerator } from "./IIdGenerator";

/**
 * An implementation of this interface represents an {@link IIdGenerator} which provides ids of type number.
 * The id are auto incremented.
 */
export interface IAutoIncrement extends IIdGenerator<number> {}
