export interface IStorage<T> {
  append(item: T): void;
  append(items: T[]): void;
  read(): T[];
  write(items: T[]): void;
}
