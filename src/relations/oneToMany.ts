import { IRecord } from "../record/IRecord";
import { ITable } from "../table/ITable";
import { IdType } from "../types/IdType";
import { Todo } from "../utils/Todo";
import { IOneToMany } from "./IOneToMany";

/**
 * This function is responsible for creating a one to many relation
 * between the type {@link TSource} and entities of type {@link TTarget}.
 */
export const oneToMany = <
  TSource extends IRecord<IdType>,
  TTarget extends IRecord<IdType>
>(
  target: ITable<TTarget>
): IOneToMany<TSource, TTarget> => {
  return Todo();
};
