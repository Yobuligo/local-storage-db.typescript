import { IHaveStorage } from "./IHaveStorage";

/**
 * Returns if the given {@link instance} is of type {@link IHaveStorage}.
 */
export const isHaveStorage = <T>(
  instance: object
): instance is IHaveStorage<T> => {
  return "storage" in instance;
};
