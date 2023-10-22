import { IPredicate } from "./IPredicate";

export function eq<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand === value;
  };
}

export function gt<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand > value;
  };
}

export function ge<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand >= value;
  };
}

export function lt<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand < value;
  };
}

export function le<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand <= value;
  };
}

export function not<T>(value: T): IPredicate<T> {
  return (operand: T) => {
    return operand !== value;
  };
}
