import { IDatabase } from "../database/IDatabase";
import { IIdGenerator } from "../idGenerator/IIdGenerator";
import { IRecord } from "../record/IRecord";
import { IStorage } from "../storage/IStorage";
import { IdType } from "../types/IdType";
import { ITable } from "./ITable";

export type TableConstructor<
  TRecord extends IRecord<IdType>,
  TTable extends ITable<TRecord>
> = new (
  name: string,
  database: IDatabase,
  storage: IStorage<TRecord>,
  idGenerator: IIdGenerator<IdType>
) => TTable;
