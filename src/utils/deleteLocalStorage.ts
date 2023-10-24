/**
 * This function is responsible for deleting data with the given {@link key} from the local storage.
 */
export const deleteLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
