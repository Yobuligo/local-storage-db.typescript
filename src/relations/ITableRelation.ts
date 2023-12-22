import { IRecord } from "../record/IRecord";
import { ITable } from "../table/ITable";
import { IdType } from "../types/IdType";
import { IRelationConfig } from "./IRelationConfig";

/**
 * This type represents a table and its relations
 */
export type ITableRelation<
  TRecord extends IRecord<IdType>,
  TRelationConfig extends IRelationConfig<TRecord>
> = ITable<TRecord> & TRelationConfig;
