import { AutoIncrement } from "../idGenerator/AutoIncrement";
import { IRecord } from "../record/IRecord";
import { StorageFactory } from "../storage/StorageFactory";
import { ITable } from "../table/ITable";
import { ITableConfig } from "../table/ITableConfig";
import { ITableMeta } from "../table/ITableMeta";
import { MetaTable } from "../table/MetaTable";
import { Table } from "../table/Table";
import { IdType } from "../types/IdType";
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
    this.metaTable = new MetaTable(databaseName, databaseStorage);
  }

  define<TRecord extends IRecord<IdType>>(
    tableName: string,
    config?: ITableConfig | undefined
  ): ITable<TRecord> {
    const tableFileName = this.createTableFileName(tableName);
    const tableStorage = StorageFactory.create<TRecord>(tableFileName);
    const idGenerator = new AutoIncrement(this.metaTable, tableFileName);
    return new Table(tableName, tableStorage, idGenerator, config);
  }

  drop(tableName: string): boolean {
    throw new Error("Method not implemented.");
  }

  private createTableFileName(tableName: string): string {
    return `${this.databaseFileName}.${tableName}`;
  }
}
