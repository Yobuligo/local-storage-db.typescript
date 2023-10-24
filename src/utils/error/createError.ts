import { ErrorReason } from "../../types/ErrorReason";

/**
 * This function is responsible for creating an error. There are the following possibilities:
 *  1. If no {@link reason} was provided a reason is generated.
 *  2. If {@link reason} is of type string, it is wrapped by an instance of {@link Error}.
 *  3. If {@link reason} is of type {@link Error}, it is returned directly.
 */
export const createError = (reason?: ErrorReason): Error => {
  if (!reason) {
    return new Error(`An unexpected error occurred.`);
  }

  if (typeof reason === "string") {
    return new Error(reason);
  }

  return reason;
};
