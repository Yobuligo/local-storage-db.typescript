import { AutoIncrement } from "../idGenerator/AutoIncrement";
import { IRecord } from "../record/IRecord";
import { IStorage } from "../storage/IStorage";
import { StorageFactory } from "../storage/StorageFactory";
import { ITable } from "../table/ITable";
import { ITableBuilder } from "../table/ITableBuilder";
import { ITableConfig } from "../table/ITableConfig";
import { ITableMeta } from "../table/ITableMeta";
import { Table } from "../table/Table";
import { TableConstructor } from "../table/TableConstructor";
import { IdType } from "../types/IdType";
import { error } from "../utils/error/error";
import { MetaTable } from "./../table/MetaTable";
import { TableBuilder } from "./../table/TableBuilder";
import { IDatabase } from "./IDatabase";

export class Database implements IDatabase {
  private readonly databaseFileName: string;
  private _isDropped = false;

  /**
   * Contains the defined tables for this database.
   */
  private readonly tables: Map<
    string,
    { table: ITable<any>; tableStorage: IStorage<any> }
  > = new Map();
  readonly metaTable: MetaTable;

  constructor(readonly name: string) {
    this.databaseFileName = `db.${name}`;
    const databaseStorage = StorageFactory.create<ITableMeta>(
      this.databaseFileName
    );

    // This meta table handles or tables which are added to that database
    this.metaTable = new MetaTable(name, this, databaseStorage);
  }

  define<TRecord extends IRecord<IdType>>(
    tableName: string
  ): ITableBuilder<TRecord> {
    const tableFileName = this.toTableFileName(tableName);
    const tableStorage = StorageFactory.create<TRecord>(tableFileName);
    const idGenerator = new AutoIncrement(this.metaTable, tableFileName);
    const tableBuilder = new TableBuilder(
      tableName,
      this,
      tableStorage,
      idGenerator
    );

    tableBuilder.onBuild((table) =>
      this.tables.set(table.name, { table, tableStorage })
    );
    return tableBuilder;
  }

  define2<TRecord extends IRecord<IdType>>(tableConfig: ITableConfig<TRecord>): ITable<TRecord>{

  }

  // define2<TRecord extends IRecord<IdType>, TTable extends ITable<TRecord>>(
  //   type: TableConstructor<TRecord, TTable>
  // ): TTable {
  //   const tableName = type.name;
  //   const tableFileName = this.toTableFileName(tableName);
  //   const tableStorage = StorageFactory.create<TRecord>(tableFileName);
  //   let idGenerator = new AutoIncrement(this.metaTable, tableFileName);
  //   if (config && config.uuid) {
  //     idGenerator = UUIDGenerator;
  //   }

  //   return new Table<TRecord>(
  //     tableName,
  //     this,
  //     tableStorage,
  //     idGenerator
  //   ) as unknown as TTable;
  // }

  drop(): boolean {
    this.dropTables();
    this.metaTable.delete();
    this._isDropped = true;
    return true;
  }

  dropTable<TRecord extends IRecord<IdType>>(table: ITable<TRecord>): boolean {
    const item = this.tables.get(table.name);
    if (!item) {
      throw new Error(
        `Error while dropping table. Table is not valid. Unable to delete table data from storage.`
      );
    }
    item.tableStorage.delete();
    this.deleteTableDefinition(table);
    this.tables.delete(table.name);
    return true;
  }

  get isDropped(): boolean {
    return this._isDropped;
  }

  /**
   * Converts a {@link tableName} to a table file name.
   *
   * @example
   * persons -> db.demo.persons
   */
  private toTableFileName(tableName: string): string {
    return `${this.databaseFileName}.${tableName}`;
  }

  /**
   * Converts a {@link tableFileName} to a table name.
   *
   * @example
   * db.demo.persons -> persons
   */
  private toTableName(tableFileName: string): string {
    return (
      tableFileName.split(/[. ]+/).pop() ??
      error(
        `Error while getting table file name from table name. Invalid table file name.`
      )
    );
  }

  /**
   * Deletes the table definition for the given {@link tableFileName}.
   */
  private deleteTableDefinition<TRecord extends IRecord<IdType>>(
    table: ITable<TRecord>
  ) {
    const tableFileName = this.toTableFileName(table.name);
    this.metaTable.delete({ tableFileName });
  }

  /**
   * Drops all tables of the database.
   */
  private dropTables() {
    const tableMetas = this.metaTable.select();
    tableMetas.forEach((tableMeta) => {
      // check if table is already loaded, otherwise load it
      const tableName = this.toTableName(tableMeta.tableFileName);
      const item = this.tables.get(tableName);
      if (item) {
        item.table.drop();
      } else {
        const table = this.define(tableName).build();
        table.drop();
      }
    });
  }
}
