import { IRecord } from "../record/IRecord";
import { ITableBuilder } from "../table/ITableBuilder";
import { MetaTable } from "../table/MetaTable";
import { IdType } from "../types/IdType";
import { ITable } from "./../table/ITable";

/**
 * An implementation of this interface represents a database.
 */
export interface IDatabase {
  /**
   * Defines a new table with the given name {@link tableName}.
   * Returns a builder to configure the table details.
   * The builder method build returns in instance of {@link ITable}.
   *
   * @example
   * interface IPerson extends IRecord<number> {
   *   firstname: string;
   *   lastname: string;
   * }
   *
   * const db = new Database("demo");
   *
   * // creates a table 'persons' which contains fields of 'IPerson'.
   * const Person = db.define<IPerson>("persons").build();
   *
   * // creates a table 'persons' which contains fields of 'IPerson',
   * // while createdAt and changedAt timestamps are not handled by the api.
   * const Person = db.define<IPerson>("persons").build({ timestamps: false });
   */
  define<TRecord extends IRecord<IdType>>(
    tableName: string
  ): ITableBuilder<TRecord>;

  /**
   * Drops the database with all its tables.
   */
  drop(): boolean;

  /**
   * Drops the given {@link table}.
   */
  dropTable(table: ITable<any>): boolean;

  /**
   * Returns the name of the database.
   */
  readonly databaseName: string;

  /**
   * Returns the meta table of the current database.
   * The meta table contains information of all tables of the database.
   */
  readonly metaTable: MetaTable;
}
