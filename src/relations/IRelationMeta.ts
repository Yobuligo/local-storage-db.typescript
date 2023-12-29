import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { IManyToMany } from "./IManyToMany";
import { IOneToMany } from "./IOneToMany";
import { IOneToOne } from "./IOneToOne";

/**
 * An implementation of this interface provides the relation meta information of a table
 */
export interface IRelationMeta<TRecord extends IRecord<IdType>> {
  readonly manyToMany: IManyToMany<TRecord, any>[];
  readonly oneToMany: IOneToMany<TRecord, any>[];
  readonly oneToOne: IOneToOne<TRecord, any>[];
}
