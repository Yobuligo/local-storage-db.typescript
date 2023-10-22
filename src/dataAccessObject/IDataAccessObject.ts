import { IDataObject } from "../dataObject/IDataObject";
import { IDataObjectDetails } from "../dataObject/IDataObjectDetails";
import { IFilter } from "../filter/IFilter";

export interface IDataAccessObject<T extends IDataObject> {
  readonly name: string;
  contains(dataObject: T): boolean;
  containsNot(dataObject: T): boolean;
  count(): number;
  delete(dataObject: T): boolean;
  delete(dataObjects: T[]): boolean;
  deleteAll(filter?: IFilter<T>): boolean;
  deleteById(id: number): boolean;
  findAll(filter?: IFilter<T>): T[];
  findById(id: number): T | undefined;
  first(filter?: IFilter<T>): T;
  firstOrNull(filter?: IFilter<T>): T | undefined;
  insert(dataObject: IDataObjectDetails<T>): T;
  insert(dataObjects: IDataObjectDetails<T>[]): T[];
  isEmpty(): boolean;
  isNotEmpty(): boolean;
  last(): T;
  lastOrNull(): T | undefined;
  update(dataObject: T): boolean;
  update(dataObjects: T[]): boolean;
  updateAll(
    dataObject: Partial<IDataObjectDetails<T>>,
    filter?: IFilter<T>
  ): number;
}
