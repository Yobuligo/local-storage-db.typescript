/**
 * This function is responsible for escaping regular expression characters in {@link value}.
 */
export const regExpEscape = (value: string): string => {
  return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};
