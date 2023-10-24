import { IRecord } from "../record/IRecord";
import { ITable } from "../table/ITable";
import { ITableConfig } from "../table/ITableConfig";
import { IdType } from "../types/IdType";

/**
 * An implementation of this interface represents a database.
 */
export interface IDatabase {
  define<TRecord extends IRecord<IdType>>(
    tableName: string,
    config?: ITableConfig
  ): ITable<TRecord>;

  /**
   * Drops the table with the given {@link tableName}
   */
  drop(tableName: string): boolean;
  readonly databaseName: string;
}
