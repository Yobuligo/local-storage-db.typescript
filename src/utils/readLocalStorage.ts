/**
 * This function is responsible for reading data with the given {@link key} from the local storage.
 */
export const readLocalStorage = <T>(key: string): T | undefined => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return undefined;
};
