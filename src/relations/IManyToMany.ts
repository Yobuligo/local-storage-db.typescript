import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { IRelation } from "./IRelation";

/**
 * An implementation of this interface represents a many to many relation
 * between an entity of type {@link TSource} and entities of type {@link TTarget}.
 */
export interface IManyToMany<
  TSource extends IRecord<IdType>,
  TTarget extends IRecord<IdType>
> extends IRelation<TSource, TTarget> {
  delete(source: TSource, target: TTarget): void;
  delete(source: TSource, target: TTarget[]): void;
  insert(source: TSource, target: TTarget): void;
  insert(source: TSource, target: TTarget[]): void;
  select(source: TSource): TTarget[];
}
