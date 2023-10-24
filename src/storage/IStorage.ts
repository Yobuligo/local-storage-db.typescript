/**
 * An implementation of this interface is responsible for deleting, reading and writing to a specific storage, like the local storage.
 */
export interface IStorage<T> {
  append(item: T): void;
  append(items: T[]): void;
  delete(): void;
  read(): T[];
  write(items: T[]): void;
}
