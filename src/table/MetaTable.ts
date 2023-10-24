import { UUIDGenerator } from "../idGenerator/UUIDGenerator";
import { IStorage } from "../storage/IStorage";
import { ITableMeta } from "./ITableMeta";
import { Table } from "./Table";

/**
 * This class represents a table which handles meta information of tables.
 */
export class MetaTable extends Table<ITableMeta> {
  constructor(tableName: string, storage: IStorage<ITableMeta>) {
    super(tableName, storage, new UUIDGenerator());
  }
}
