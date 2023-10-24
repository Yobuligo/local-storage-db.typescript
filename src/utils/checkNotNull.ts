import { ErrorReason } from "../../types/ErrorReason";
import { createError } from "./error/createError";

/**
 * This function is responsible for checking if the given {@link value} is not null.
 */
export const checkNotNull = <T>(
  value: T,
  reason?: ErrorReason
): NonNullable<T> => {
  if (value !== undefined && value !== null) {
    return value;
  }
  throw createError(
    reason ?? `Error while checking value. Value must not be null.`
  );
};
