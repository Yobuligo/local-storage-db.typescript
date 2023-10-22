import { IDataAccessObject } from "../dataAccessObject/IDataAccessObject";
import { IDataAccessObjectConfig } from "../dataAccessObject/IDataAccessObjectConfig";
import { IDataObject } from "../dataObject/IDataObject";
import { IHaveFileName } from "../types/IHaveFileName";

export interface IDatabase extends IHaveFileName {
  define<T extends IDataObject>(
    name: string,
    config?: IDataAccessObjectConfig
  ): IDataAccessObject<T>;
  delete(name: string): boolean;
  readonly name: string;
  readonly tables: IDataAccessObject<any>[];
}
