/**
 * An implementation of this interface is responsible for providing the next
 * auto incremented value.
 */
export interface IAutoIncrement {
  next(): number;
}
