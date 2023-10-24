import { IPredicate } from "./IPredicate";

/**
 * This function is responsible for returning a predicate function,
 * which compares if the parameter {@link operand} of the returned function is not equal to {@link value}.
 */
export function not<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand !== value;
  };
}
