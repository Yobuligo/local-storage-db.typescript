import { AutoIncrement } from "../idGenerator/AutoIncrement";
import { IRecord } from "../record/IRecord";
import { StorageFactory } from "../storage/StorageFactory";
import { ITableBuilder } from "../table/ITableBuilder";
import { ITableMeta } from "../table/ITableMeta";
import { MetaTable } from "../table/MetaTable";
import { IdType } from "../types/IdType";
import { TableBuilder } from "./../table/TableBuilder";
import { IDatabase } from "./IDatabase";

export class Database implements IDatabase {
  private readonly databaseFileName: string;
  private readonly metaTable: MetaTable;

  constructor(readonly databaseName: string) {
    this.databaseFileName = `db.${databaseName}`;
    const databaseStorage = StorageFactory.create<ITableMeta>(
      this.databaseFileName
    );

    // This meta table handles or tables which are added to that database
    this.metaTable = new MetaTable(databaseName, this, databaseStorage);
  }

  define<TRecord extends IRecord<IdType>>(
    tableName: string
  ): ITableBuilder<TRecord> {
    const tableFileName = this.createTableFileName(tableName);
    const tableStorage = StorageFactory.create<TRecord>(tableFileName);
    const idGenerator = new AutoIncrement(this.metaTable, tableFileName);
    return new TableBuilder(tableName, this, tableStorage, idGenerator);
  }

  drop(tableName: string): boolean {
    this.dropTable(tableName);
    this.deleteTableDefinition(tableName);
    return true;
  }

  /**
   * Creates a file name for the given {@link tableName}.
   */
  private createTableFileName(tableName: string): string {
    return `${this.databaseFileName}.${tableName}`;
  }

  /**
   * Drops the table with the given {@link tableName}.
   */
  private dropTable(tableName: string) {
    const tableFileName = this.createTableFileName(tableName);
    const tableStorage = StorageFactory.create<any>(tableFileName);
    tableStorage.delete();
  }

  /**
   * Deletes the table definition for the given {@link tableName}.
   */
  private deleteTableDefinition(tableName: string) {
    this.metaTable.delete({ tableName: tableName });
  }
}
