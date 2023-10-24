import { IPredicate } from "./IPredicate";

/**
 * This function is responsible for returning a predicate function,
 * which compares if the parameter {@link operand} of the returned function is equal to {@link value}.
 */
export function eq<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand === value;
  };
}
