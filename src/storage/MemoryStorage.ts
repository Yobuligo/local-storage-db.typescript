import { IStorage } from "./IStorage";

export class MemoryStorage<T> implements IStorage<T> {
  private data: T[] = [];

  // constructor(private key: string){}

  append(item: T): void;
  append(items: T[]): void;
  append(items: unknown): void {
    if (Array.isArray(items)) {
      if (items.length === 0) {
        return;
      }
      this.data.push(...items);
    } else {
      this.data.push(items as T);
    }
  }

  delete(): void {
    this.data = [];
  }

  read(): T[] {
    return this.data;
  }

  write(items: T[]): void {
    this.data = items;
  }
}
