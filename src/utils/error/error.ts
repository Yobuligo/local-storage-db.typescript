import { ErrorReason } from "../../../types/ErrorReason";
import { createError } from "./createError";

/**
 * This function is responsible for throwing an error.
 */
export const error = (reason?: ErrorReason): never => {
  throw createError(reason);
};
