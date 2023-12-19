import { IDatabase } from "../database/IDatabase";
import { UUIDGenerator } from "../idGenerator/UUIDGenerator";
import { IStorage } from "../storage/IStorage";
import { ITableMeta } from "./ITableMeta";
import { Table } from "./Table";

/**
 * This class represents a table which handles meta information of tables.
 */
export class MetaTable extends Table<ITableMeta> {
  constructor(
    tableName: string,
    database: IDatabase,
    storage: IStorage<ITableMeta>
  ) {
    super(tableName, database, storage, UUIDGenerator);
  }
}
