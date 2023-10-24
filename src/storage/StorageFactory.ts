import { IStorage } from "./IStorage";
import { IStorageFactory } from "./IStorageFactory";
import { MemoryStorage } from "./MemoryStorage";

class StorageFactoryDefault implements IStorageFactory {
  create<T>(key: string): IStorage<T> {
    // return new LocalStorage(key);
    return new MemoryStorage();
  }
}

/**
 * This service is responsible for creating instances of type {@link IStorage}.
 */
export const StorageFactory = new StorageFactoryDefault();
