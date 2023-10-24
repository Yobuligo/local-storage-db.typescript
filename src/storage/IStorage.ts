/**
 * An implementation of this interface is responsible for deleting, reading and writing to a specific storage, like the local storage.
 */
export interface IStorage<T> {
  /**
   * Appends an {@link item} at the end of this storage.
   */
  append(item: T): void;

  /**
   * Appends all {@link items} at the end of this storage.
   */
  append(items: T[]): void;

  /**
   * Removes all items from this storage.
   */
  delete(): void;

  /**
   * Returns all items of this storage.
   */
  read(): T[];

  /**
   * Stores all {@link items} to this storage while all existing items will be replaced by the new once.
   */
  write(items: T[]): void;
}
