import { readLocalStorage } from "../utils/readLocalStorage";
import { writeLocalStorage } from "../utils/writeLocalStorage";
import { IStorage } from "./IStorage";

export class LocalStorage<T> implements IStorage<T> {
  constructor(private readonly key: string) {}

  append(item: T): void;
  append(items: T[]): void;
  append(items: unknown): void {
    const persistedItems = this.read();
    if (Array.isArray(items)) {
      if (items.length === 0) {
        return;
      }
      persistedItems.push(...(items as T[]));
    } else {
      persistedItems.push(items as T);
    }
    this.write(persistedItems);
  }

  read(): T[] {
    return readLocalStorage<T[]>(this.key) ?? [];
  }

  write(items: T[]): void {
    writeLocalStorage(this.key, items);
  }
}
