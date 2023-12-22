import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { IRelation } from "./IRelation";

/**
 * An implementation of this interface represents a one to one relation
 * between an entity of type {@link TSource} and one of type {@link TTarget}.
 */
export interface IOneToOne<
  TSource extends IRecord<IdType>,
  TTarget extends IRecord<IdType>
> extends IRelation<TSource, TTarget> {
  get(source: TSource): TTarget;
  remove(source: TSource): void;
  set(source: TSource, target: TTarget): void;
}
