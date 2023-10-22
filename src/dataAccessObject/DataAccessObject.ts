import { IAutoIncrement } from "../autoIncrement/IAutoIncrement";
import { IDataObject } from "../dataObject/IDataObject";
import { IDataObjectDetails } from "../dataObject/IDataObjectDetails";
import { IFilter } from "../filter/IFilter";
import {
  deleteItems,
  doesMatchFilter,
  filterItems,
  reduceItems,
  updateItem,
} from "../filter/filterItems";
import { IStorage } from "../storage/IStorage";
import { Todo } from "../utils/Todo";
import { error } from "../utils/error";
import { IDataAccessObject } from "./IDataAccessObject";
import { IDataAccessObjectConfig } from "./IDataAccessObjectConfig";

export class DataAccessObject<T extends IDataObject>
  implements IDataAccessObject<T>
{
  constructor(
    readonly name: string,
    private storage: IStorage<T>,
    private autoIncrement: IAutoIncrement,
    private config?: IDataAccessObjectConfig
  ) {}

  contains(dataObject: T): boolean {
    return this.findById(dataObject.id) !== undefined;
  }

  containsNot(dataObject: T): boolean {
    return !this.contains(dataObject);
  }

  count(): number {
    const items = this.findAll();
    return items.length;
  }

  delete(dataObject: T): boolean;
  delete(dataObjects: T[]): boolean;
  delete(dataObjects: unknown): boolean {
    if (Array.isArray(dataObjects)) {
      let items = this.findAll();
      const length = items.length;
      items = deleteItems(items, dataObjects);
      this.storage.write(items);
      return items.length !== length;
    } else {
      const dataObject = dataObjects as T;
      return this.deleteById(dataObject.id);
    }
  }

  deleteAll(filter?: IFilter<T> | undefined): boolean {
    if (!filter) {
      this.storage.write([]);
      return true;
    }

    let items = this.findAll();
    const length = items.length;
    if (length > 0) {
      items = reduceItems(items, filter);
      this.storage.write(items);
      return items.length !== length;
    }

    return false;
  }

  deleteById(id: number): boolean {
    const items = this.findAll();
    if (items.length === 0) {
      return false;
    }

    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }

    items.splice(index, 1);
    this.storage.write(items);
    return true;
  }

  findAll(filter?: IFilter<T>): T[] {
    let items = this.storage.read();
    if (filter) {
      items = filterItems(items, filter);
    }
    return items;
  }

  findById(id: number): T | undefined {
    const items = this.findAll();
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
    }
  }

  first(filter?: IFilter<T> | undefined): T {
    return (
      this.firstOrNull(filter) ??
      error(`Error while finding first item. No item available.`)
    );
  }

  firstOrNull(filter?: IFilter<T> | undefined): T | undefined {
    return this.findAll(filter)[0];
  }

  insert(dataObject: IDataObjectDetails<T>): T;
  insert(dataObjects: IDataObjectDetails<T>[]): T[];
  insert(dataObjects: unknown): T | T[] {
    if (Array.isArray(dataObjects)) {
      const newItems: T[] = [];
      dataObjects as IDataObjectDetails<T>[];
      dataObjects.forEach((dataObject) => {
        const insertProps = this.createInsertProps();
        newItems.push({ ...dataObject, ...insertProps } as T);
      });
      this.storage.append(newItems);
      return newItems;
    } else {
      const dataObject = dataObjects as IDataObjectDetails<T>;
      const insertProps = this.createInsertProps();
      const newItem = { ...dataObject, ...insertProps } as T;
      this.storage.append(newItem);
      return newItem;
    }
  }

  isEmpty(): boolean {
    return this.count() === 0;
  }

  isNotEmpty(): boolean {
    return this.count() > 0;
  }

  last(): T {
    return (
      this.lastOrNull() ??
      error(`Error while finding last item. No item available.`)
    );
  }

  lastOrNull(): T | undefined {
    const items = this.findAll();
    return items[items.length - 1];
  }

  update(dataObject: T): boolean;
  update(dataObjects: T[]): boolean;
  update(dataObjects: unknown): boolean {
    if (Array.isArray(dataObjects)) {
      return Todo();
    } else {
      const dataObject = dataObjects as T;
      const items = this.findAll();
      const index = items.findIndex((item) => item.id === dataObject.id);
      if (index === -1) {
        return false;
      }

      if (this.needsTimestamps) {
        dataObject.changedAt = new Date();
      }

      items.splice(index, 1, dataObject);
      this.storage.write(items);
      return true;
    }
  }

  updateAll(
    dataObject: Partial<IDataObjectDetails<T>>,
    filter?: IFilter<T> | undefined
  ): number {
    let count = 0;
    const items = this.findAll();
    items.forEach((item) => {
      if (!filter || doesMatchFilter(item, filter)) {
        if (updateItem(item, dataObject, this.needsTimestamps)) {
          count++;
        }
      }
    });
    this.storage.write(items);
    return count;
  }

  private createInsertProps(): IDataObject {
    const id = this.autoIncrement.next();
    if (this.needsTimestamps) {
      return { id, createdAt: new Date(), changedAt: new Date() };
    } else {
      return { id };
    }
  }

  private get needsTimestamps() {
    return (
      !this.config ||
      this.config.timestamps === undefined ||
      this.config.timestamps === true
    );
  }
}
