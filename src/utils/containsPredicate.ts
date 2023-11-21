/**
 * Returns if the given {@link value} contains a property with a predicate function.
 */
export const containsPredicate = <T>(value: T): boolean => {
  for (const propName in value) {
    if (typeof value[propName] === "function") {
      return true;
    }
  }
  return false;
};
