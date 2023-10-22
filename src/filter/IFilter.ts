import { IPredicate } from "./IPredicate";

export type IFilter<T> = { [P in keyof T]?: IPredicate<T[P]> };
