import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { IRelation } from "./IRelation";

/**
 * An implementation of this interface represents a one to many relation
 * between an entity of type {@link TSource} and entities of type {@link TTarget}.
 */
export interface IOneToMany<
  TSource extends IRecord<IdType>,
  TTarget extends IRecord<IdType>
> extends IRelation<TSource, TTarget> {
  add(source: TSource, target: TTarget): void;
  remove(source: TSource, target: TTarget): void;
  find(): TTarget[]
}
