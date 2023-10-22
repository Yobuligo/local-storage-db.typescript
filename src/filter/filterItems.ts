import { error } from "../../utils/error/error";
import { IDataObject } from "../dataObject/IDataObject";
import { IFilter } from "./IFilter";

export const filterItems = <T extends IDataObject>(
  items: T[],
  filter: IFilter<T>
): T[] => {
  return items.filter((item) => doesMatchFilter(item, filter));
};

/**
 * This function is responsible for reducing the given {@link items} by all entries,
 * which are matching the given {@link filter} and returning the result list.
 *
 * @example
 * const result = reduceItems(
 *   [
 *     { id: 1, name: "Stacey" },
 *     { id: 2, name: "Alex" },
 *   ],
 *   { name: eq("Stacey") }
 * );
 *
 * // result would be
 * [{ id: 2, name: "Alex" }];
 */
export const reduceItems = <T extends IDataObject>(
  items: T[],
  filter: IFilter<T>
): T[] => {
  return items.filter((item) => !doesMatchFilter(item, filter));
};

export const deleteItems = <T extends IDataObject>(
  items: T[],
  deleteItems: T[]
) => {
  return items.filter(
    (item) => !deleteItems.find((deleteItem) => deleteItem.id === item.id)
  );
};

export const updateItem = <T>(
  item: T,
  origin: T,
  needsTimestamps: boolean
): boolean => {
  let updated = false;
  for (const prop in origin) {
    if (item[prop] !== origin[prop]) {
      item[prop] = origin[prop];
      updated = true;
    }
  }

  if (needsTimestamps) {
    (item as any).changedAt = new Date();
  }

  return updated;
};

export const doesMatchFilter = <T extends IDataObject>(
  item: T,
  filter: IFilter<T>
): boolean => {
  for (const key in filter) {
    const predicate = filter[key] ?? error();
    if (!predicate(item[key])) {
      return false;
    }
  }
  return true;
};
