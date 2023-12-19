import { SortOrder } from "./../types/SortOrder";

/**
 * This type represents a sort order by for the given type {@link T}.
 */
export type ISortOrder<T> = { [P in keyof T]?: SortOrder };
