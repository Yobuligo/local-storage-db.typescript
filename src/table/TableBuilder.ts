import { IIdGenerator } from "../idGenerator/IIdGenerator";
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
    private readonly tableStorage: IStorage<TRecord>,
    private readonly idGenerator: IIdGenerator<IdType>
  ) {}

  build(config?: ITableConfig | undefined): ITable<TRecord> {
    return new Table(
      this.tableName,
      this.tableStorage,
      this.idGenerator,
      config
    );
  }
}
