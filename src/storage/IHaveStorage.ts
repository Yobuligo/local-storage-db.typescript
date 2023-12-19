import { IStorage } from "./IStorage";

/**
 * An implementation of this interface has a {@link IStorage}.
 */
export interface IHaveStorage<T> {
  readonly storage: IStorage<T>;
}
