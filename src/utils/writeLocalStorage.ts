/**
 * This function is responsible for writing data with the given {@link key} to the local storage.
 */
export const writeLocalStorage = <T>(key: string, value: T): T => {
  const item = JSON.stringify(value);
  localStorage.setItem(key, item);
  return value;
};
