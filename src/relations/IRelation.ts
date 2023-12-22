import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";

/**
 * An implementation of this interface represents a relation between two entities.
 */
export interface IRelation<
  TSource extends IRecord<IdType>,
  TTarget extends IRecord<IdType>
> {
  source: TSource;
  target: TTarget;
}
