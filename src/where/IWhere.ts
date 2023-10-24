import { IPredicate } from "./IPredicate";

/**
 * This type represents a where condition for the given type {@link T}.
 */
export type IWhere<T> = { [P in keyof T]?: IPredicate<T[P]> | T[P] };
