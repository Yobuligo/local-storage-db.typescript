import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { IManyToMany } from "./IManyToMany";
import { IOneToMany } from "./IOneToMany";
import { IOneToOne } from "./IOneToOne";
import { IRelationMeta } from "./IRelationMeta";

export class RelationMeta<TRecord extends IRecord<IdType>>
  implements IRelationMeta<TRecord>
{
  manyToMany: IManyToMany<TRecord, any>[] = [];
  oneToMany: IOneToMany<TRecord, any>[] = [];
  oneToOne: IOneToOne<TRecord, any>[] = [];
}
