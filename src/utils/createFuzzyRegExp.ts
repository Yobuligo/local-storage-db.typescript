import { regExpEscape } from "./regExpEscape";

/**
 * This function is responsible for creating a regular expression from {@link value},
 * which replaces * by the corresponding reg exp characters
 * to use the result string for String.match(regExp)
 *
 * @example
 * const regExp = createFuzzyRegExp("*ello");
 * if (`Hello World`.match(regExp)) {
 *   // regExp does match Hello World
 * } else {
 *   // regExp doesn't match Hello World
 * }
 */
export const createFuzzyRegExp = (value: string): RegExp => {
  let regExp = "";

  const values = value.split("*");
  if (values.length === 1) {
    regExp = regExpEscape(value);
  } else {
    values.forEach((value, index) => {
      let handled = false;

      // starts with *? e.g. *ello
      if (index === 0 && value === "") {
        regExp += `^`;
        handled = true;
      }

      // if it is not first and not last element e.g. l in h*l*o
      if (!handled && index < values.length - 1) {
        regExp += `${regExpEscape(value)}.*`;
        handled = true;
      }

      // ends with *? e.g. hell*
      if (!handled && index === values.length - 1 && value === "") {
        regExp += `$`;
        handled = true;
      }

      // not handled yet? e.g. a in *a
      if (!handled) {
        regExp += `${regExpEscape(value)}`;
      }
    });
  }

  return new RegExp(regExp);
};
