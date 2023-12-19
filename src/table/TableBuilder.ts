import { IDatabase } from "../database/IDatabase";
import { IIdGenerator } from "../idGenerator/IIdGenerator";
import { UUIDGenerator } from "../idGenerator/UUIDGenerator";
import { IRecord } from "../record/IRecord";
import { IStorage } from "../storage/IStorage";
import { IdType } from "../types/IdType";
import { ITable } from "./ITable";
import { ITableBuilder } from "./ITableBuilder";
import { ITableConfig } from "./ITableConfig";
import { Table } from "./Table";

export class TableBuilder<TRecord extends IRecord<IdType>>
  implements ITableBuilder<TRecord>
{
  constructor(
    private readonly tableName: string,
    private readonly database: IDatabase,
    private readonly tableStorage: IStorage<TRecord>,
    private readonly idGenerator: IIdGenerator<IdType>
  ) {}

  build(config?: ITableConfig | undefined): ITable<TRecord> {
    let idGenerator = this.idGenerator;
    if (config && config.uuid) {
      idGenerator = UUIDGenerator;
    }

    return new Table(
      this.tableName,
      this.database,
      this.tableStorage,
      idGenerator,
      config
    );
  }
}
