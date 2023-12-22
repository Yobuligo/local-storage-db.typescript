import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { IRelation } from "./IRelation";

/**
 * This type represents all relations of an entity of type {@link TSource}.
 */
export type IRelationConfig<TSource extends IRecord<IdType>> = {
  [key: string]: IRelation<TSource, any>;
};
