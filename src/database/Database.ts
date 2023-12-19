import { AutoIncrement } from "../idGenerator/AutoIncrement";
import { IRecord } from "../record/IRecord";
import { StorageFactory } from "../storage/StorageFactory";
import { isHaveStorage } from "../storage/isHaveStorage";
import { ITable } from "../table/ITable";
import { ITableBuilder } from "../table/ITableBuilder";
import { ITableMeta } from "../table/ITableMeta";
import { IdType } from "../types/IdType";
import { MetaTable } from "./../table/MetaTable";
import { TableBuilder } from "./../table/TableBuilder";
import { IDatabase } from "./IDatabase";

export class Database implements IDatabase {
  private readonly databaseFileName: string;
  private readonly tables: ITable<any>[] = [];
  readonly metaTable: MetaTable;

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
    const tableBuilder = new TableBuilder(
      tableName,
      this,
      tableStorage,
      idGenerator
    );

    tableBuilder.onBuild((table) => this.tables.push(table));
    return tableBuilder;
  }

  drop(): boolean {
    this.dropTables();
    this.metaTable.delete();
    return true;
  }

  dropTable<TRecord extends IRecord<IdType>>(table: ITable<TRecord>): boolean {
    if (isHaveStorage(table)) {
      table.storage.delete();
      this.deleteTableDefinition(table);
      return true;
    } else {
      throw new Error(
        `Error while dropping table. Table is not valid. Unable to delete table data from storage.`
      );
    }
  }

  /**
   * Creates a file name for the given {@link tableName}.
   */
  private createTableFileName(tableName: string): string {
    return `${this.databaseFileName}.${tableName}`;
  }

  /**
   * Deletes the table definition for the given {@link tableName}.
   */
  private deleteTableDefinition<TRecord extends IRecord<IdType>>(
    table: ITable<TRecord>
  ) {
    const tableName = this.createTableFileName(table.name);
    this.metaTable.delete({ tableName });
  }

  /**
   * Drops all tables of the database.
   */
  private dropTables() {
    const tableMetas = this.metaTable.select();
    tableMetas.forEach((tableMeta) => {
      const table = this.define(tableMeta.tableName).build();
      table.drop();
    });
  }
}
