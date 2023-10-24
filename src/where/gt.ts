import { IPredicate } from "./IPredicate";

/**
 * This function is responsible for returning a predicate function, 
 * which compares if the parameter {@link operand} of the returned function is greater than {@link value}.
 */
export function gt<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand > value;
  };
}
