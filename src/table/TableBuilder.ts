import { IDatabase } from "../database/IDatabase";
import { IIdGenerator } from "../idGenerator/IIdGenerator";
import { UUIDGenerator } from "../idGenerator/UUIDGenerator";
import { IRecord } from "../record/IRecord";
import { IStorage } from "../storage/IStorage";
import { IdType } from "../types/IdType";
import { ITable } from "./ITable";
import { ITableBuilder } from "./ITableBuilder";
import { ITableConfig } from "./ITableConfig";
import { OnTableBuildHandler } from "./OnTableBuildHandler";
import { Table } from "./Table";

export class TableBuilder<TRecord extends IRecord<IdType>>
  implements ITableBuilder<TRecord>
{
  private onTableBuildHandlers: OnTableBuildHandler[] = [];

  constructor(
    private readonly tableName: string,
    private readonly database: IDatabase,
    private readonly tableStorage: IStorage<TRecord>,
    private readonly idGenerator: IIdGenerator<IdType>
  ) {}

  build<TTable extends ITable<TRecord>>(
    tableConfig?: ITableConfig<TRecord, TTable> | undefined
  ): TTable {
    let idGenerator = this.idGenerator;
    if (tableConfig && tableConfig.uuid) {
      idGenerator = UUIDGenerator;
    }

    const table = new Table(
      this.tableName,
      this.database,
      this.tableStorage,
      idGenerator,
      tableConfig
    );

    this.notifyOnTableBuild(table);
    return table as unknown as TTable;
  }

  onBuild(handler: OnTableBuildHandler): void {
    this.onTableBuildHandlers.push(handler);
  }

  private notifyOnTableBuild(table: ITable<any>) {
    this.onTableBuildHandlers.forEach((onTableBuildHandler) =>
      onTableBuildHandler(table)
    );
  }
}
