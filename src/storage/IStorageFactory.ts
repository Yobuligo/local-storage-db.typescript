import { IStorage } from "./IStorage";

/**
 * An implementation of this interface is responsible for creating instances of {@link IStorage}.
 */
export interface IStorageFactory {
  /**
   * Creates an instance of {@link IStorage}. Added data to that storage are stored in a file with name {@link key}.
   */
  create<T>(key: string): IStorage<T>;
}
