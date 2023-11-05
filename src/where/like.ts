import { IPredicate } from "./IPredicate";

/**
 * This function is responsible for returning a predicate function,
 * which compares if the parameter {@link operand} of the returned function is like {@link value}.
 */
export function like<T>(value: T): IPredicate<T> {
  const regex = new RegExp(`/${String(value)}/`);
  return (operand: T) => {
    if (String(operand).match(regex)) {
      return true;
    } else {
      return false;
    }
  };
}
