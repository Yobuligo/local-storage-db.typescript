import { IRecord } from "../record/IRecord";
import { ITableBuilder } from "../table/ITableBuilder";
import { IdType } from "../types/IdType";

/**
 * An implementation of this interface represents a database.
 */
export interface IDatabase {
  define<TRecord extends IRecord<IdType>>(
    tableName: string
  ): ITableBuilder<TRecord>;

  /**
   * Drops the table with the given {@link tableName}
   */
  drop(tableName: string): boolean;
  readonly databaseName: string;
}
