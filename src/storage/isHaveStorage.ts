import { IHaveStorage } from "./../../dist/storage/IHaveStorage.d";

/**
 * Returns if the given {@link instance} is of type {@link IHaveStorage}.
 */
export const isHaveStorage = (
  instance: object
): instance is IHaveStorage<any> => {
  return "storage" in instance;
};
