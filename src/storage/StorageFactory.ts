import { IStorage } from "./IStorage";
import { IStorageFactory } from "./IStorageFactory";
import { LocalStorage } from "./LocalStorage";

class StorageFactoryDefault implements IStorageFactory {
  storageType: new (key: string) => IStorage<any> = LocalStorage;

  create<T>(key: string): IStorage<T> {
    return new this.storageType(key);
  }
}

/**
 * This service is responsible for creating instances of type {@link IStorage}.
 */
export const StorageFactory = new StorageFactoryDefault();
