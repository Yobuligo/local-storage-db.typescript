import { deleteLocalStorage } from "../utils/deleteLocalStorage";
import { readLocalStorage } from "../utils/readLocalStorage";
import { writeLocalStorage } from "../utils/writeLocalStorage";
import { IStorage } from "./IStorage";

export class LocalStorage<T> implements IStorage<T> {
  constructor(private readonly key: string) {}

  append(item: T): void;
  append(items: T[]): void;
  append(items: unknown): void {
    let persistedItems;
    if (Array.isArray(items)) {
      if (items.length === 0) {
        return;
      }
      persistedItems = this.read();
      persistedItems.push(...(items as T[]));
    } else {
      persistedItems = this.read();
      persistedItems.push(items as T);
    }
    this.write(persistedItems);
  }

  delete(): void {
    deleteLocalStorage(this.key);
  }

  read(): T[] {
    return readLocalStorage(this.key) ?? [];
  }

  write(items: T[]): void {
    writeLocalStorage(this.key, items);
  }
}
