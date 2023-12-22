import { IRecord } from "../record/IRecord";
import { ITable } from "../table/ITable";
import { IdType } from "../types/IdType";
import { Todo } from "../utils/Todo";
import { IOneToOne } from "./IOneToOne";

/**
 * This function is responsible for creating a one to one relation
 * between the type {@link TSource} and the target type {@link TTarget}.
 */
export const oneToOne = <
  TSource extends IRecord<IdType>,
  TTarget extends IRecord<IdType>
>(
  target: ITable<TTarget>
): IOneToOne<TSource, TTarget> => {
  return Todo();
};
